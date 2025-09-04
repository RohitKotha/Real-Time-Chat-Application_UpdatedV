import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { awsTranslateText } from "../utils/awsTranslate.js";
import { getAIResponse } from "../utils/groqAI.js";

export const sendMessage = async (req, res) => {
	   try {
			   const { message, language } = req.body;
			   const { id: receiverId } = req.params;
			   const senderId = req.user._id;

			   // Check if receiver is an AI user
			   const receiver = await User.findById(receiverId);
			   const isAIReceiver = receiver && receiver.isAI === true;

			   let conversation = await Conversation.findOne({
					   participants: { $all: [senderId, receiverId] },
			   });

			   if (!conversation) {
					   conversation = await Conversation.create({
							   participants: [senderId, receiverId],
					   });
			   }

			   const newMessage = new Message({
					   senderId,
					   receiverId,
					   message,
			   });

			   if (newMessage) {
					   conversation.messages.push(newMessage._id);
			   }

			   await Promise.all([conversation.save(), newMessage.save()]);

			   // Translate message using AWS Translate (for human users)
			   let translatedMessage = message;
			   console.log(`Sender language: ${language}, Receiver language: ${receiver?.language}`);
			   if (!isAIReceiver && receiver && receiver.language && language && receiver.language !== language) {
					   translatedMessage = await awsTranslateText(message, language, receiver.language);
					   console.log(`Original: ${message} | Translated: ${translatedMessage}`);
			   } else {
					   console.log('No translation performed.');
			   }

			   // Handle AI response if the receiver is an AI user
			   if (isAIReceiver) {
				   try {
					   // Don't use conversation history - just respond to the current message
					   // This simplifies the interaction and improves reliability
					   
					   // Get AI response using Groq API
					   console.log("Getting AI response for message:", message);
					   let aiResponse;
					   try {
						   // Just send the current message without history
						   aiResponse = await getAIResponse(message, []);
					   } catch (error) {
						   console.error("Error from Groq API:", error.message);
						   aiResponse = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
					   }
					   
					   // Create and save AI response message
					   const aiMessage = new Message({
						   senderId: receiverId,
						   receiverId: senderId,
						   message: aiResponse
					   });
					   
					   // Update conversation with AI message
					   conversation.messages.push(aiMessage._id);
					   await Promise.all([aiMessage.save(), conversation.save()]);
					   
					   // Emit AI response to the sender
					   const senderSocketId = getReceiverSocketId(senderId);
					   if (senderSocketId) {
						   io.to(senderSocketId).emit("newMessage", aiMessage.toObject());
					   }
					   
					   // Return both the user message and AI response
					   res.status(201).json({ 
						   message: newMessage.toObject(), 
						   aiResponse: aiMessage.toObject(),
						   // Indicate this is an AI conversation
						   isAIChat: true
					   });
					   return;
				   } catch (error) {
					   console.error("Error getting AI response:", error);
					   // Continue with normal flow if AI response fails
				   }
			   }

			   // Normal message handling for human users
			   const receiverSocketId = getReceiverSocketId(receiverId);
			   if (receiverSocketId) {
					   io.to(receiverSocketId).emit("newMessage", {
							   ...newMessage.toObject(),
							   message: translatedMessage,
					   });
			   }

			   res.status(201).json({ ...newMessage.toObject(), message: translatedMessage });
	   } catch (error) {
			   console.log("Error in sendMessage controller: ", error.message);
			   res.status(500).json({ error: "Internal server error" });
	   }
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		// Get user's preferred language
		const userLanguage = req.user.language || "en";
		const awsTranslateText = (await import("../utils/awsTranslate.js")).awsTranslateText;

		const translatedMessages = await Promise.all(messages.map(async (msg) => {
			if (userLanguage !== "en" && msg.message) {
				const translated = await awsTranslateText(msg.message, "en", userLanguage);
				return { ...msg._doc, message: translated };
			}
			return msg;
		}));

		res.status(200).json(translatedMessages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
