import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { FaRobot } from "react-icons/fa";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center rounded-lg p-2 cursor-pointer transition-all duration-300 ${
					isSelected 
						? "bg-blue-500/20 border border-blue-400/50 backdrop-blur-sm" 
						: "hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
				}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className='relative'>
					{conversation.aiIcon ? (
						<div className='w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden'>
							<FaRobot className="text-white text-lg" />
						</div>
					) : (
						<div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden'>
							{conversation.profilePic ? (
								<img src={conversation.profilePic} alt='user avatar' className='w-full h-full object-cover' />
							) : (
								<span className='text-white font-bold text-sm'>
									{conversation.fullName.charAt(0).toUpperCase()}
								</span>
							)}
						</div>
					)}
					{isOnline && !conversation.aiIcon && (
						<div className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full'></div>
					)}
					{conversation.aiIcon && (
						<div className='absolute bottom-0 right-0 w-3 h-3 bg-indigo-400 border-2 border-white rounded-full'></div>
					)}
				</div>

				<div className='flex flex-col flex-1 min-w-0'>
					<div className='flex gap-2 justify-between items-center'>
						<div className="flex items-center">
							{conversation.aiIcon && (
								<FaRobot className={`mr-1 text-sm ${isSelected ? "text-blue-300" : "text-indigo-400"}`} />
							)}
							<p className={`font-semibold truncate text-sm ${isSelected ? "text-blue-200" : "text-white"}`}>
								{conversation.fullName}
							</p>
						</div>
						<span className='text-sm flex-shrink-0'>{emoji}</span>
					</div>
					{conversation.aiIcon ? (
						<p className={`text-xs ${isSelected ? "text-blue-300/80" : "text-indigo-400"}`}>
							AI Assistant
						</p>
					) : isOnline && (
						<p className={`text-xs ${isSelected ? "text-blue-300/80" : "text-green-400"}`}>
							Online
						</p>
					)}
				</div>
			</div>

			{!lastIdx && <div className='my-1 border-t border-white/10' />}
		</>
	);
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
