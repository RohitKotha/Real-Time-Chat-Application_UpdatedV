import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { FaRobot } from "react-icons/fa";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	
	// Check if this is a message from the AI
	const isAIMessage = !fromMe && selectedConversation?.isAI === true;
	
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : isAIMessage ? "bg-indigo-600" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 h-10 rounded-full overflow-hidden'>
					{!fromMe && selectedConversation?.isAI ? (
						<div className='w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
							<FaRobot className="text-white text-lg" />
						</div>
					) : (
						profilePic ? (
							<img alt='Chat user avatar' src={profilePic} className="w-full h-full object-cover" />
						) : (
							<div className='w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center'>
								<span className='text-white font-bold text-sm'>
									{fromMe ? authUser.fullName.charAt(0).toUpperCase() : selectedConversation?.fullName.charAt(0).toUpperCase()}
								</span>
							</div>
						)
					)}
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{!fromMe && selectedConversation?.isAI && (
					<FaRobot className="mr-1" />
				)}
				{formattedTime}
			</div>
		</div>
	);
};
export default Message;
