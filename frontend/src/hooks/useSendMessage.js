import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	   const sendMessage = async (message, language) => {
			   setLoading(true);
			   try {
					   const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
							   method: "POST",
							   headers: {
									   "Content-Type": "application/json",
							   },
							   body: JSON.stringify({ message, language }),
					   });
					   const data = await res.json();
					   if (data.error) throw new Error(data.error);

					   // Check if the response contains both user message and AI response
					   if (data.message && data.aiResponse) {
						   // Add both messages to the state
						   setMessages([...messages, data.message, data.aiResponse]);
					   } else {
						   // Just add the user message (standard case)
						   setMessages([...messages, data]);
					   }
			   } catch (error) {
					   toast.error(error.message);
			   } finally {
					   setLoading(false);
			   }
	   };

	return { sendMessage, loading };
};
export default useSendMessage;
