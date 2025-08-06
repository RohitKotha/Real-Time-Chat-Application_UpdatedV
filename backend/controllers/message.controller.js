import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { awsTranslateText } from "../utils/awsTranslate.js";

export const sendMessage = async (req, res) => {
	   try {
			   const { message, language } = req.body;
			   const { id: receiverId } = req.params;
			   const senderId = req.user._id;

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

			   // Translate message using AWS Translate
			   const receiver = await User.findById(receiverId);
			   let translatedMessage = message;
			   console.log(`Sender language: ${language}, Receiver language: ${receiver?.language}`);
			   if (receiver && receiver.language && language && receiver.language !== language) {
					   translatedMessage = await awsTranslateText(message, language, receiver.language);
					   console.log(`Original: ${message} | Translated: ${translatedMessage}`);
			   } else {
					   console.log('No translation performed.');
			   }

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

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
