import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	   const [message, setMessage] = useState("");
	   const [lang, setLang] = useState("en");
	   const { loading, sendMessage } = useSendMessage();

	   const handleSubmit = async (e) => {
			   e.preventDefault();
			   if (!message) return;
			   await sendMessage(message, lang);
			   setMessage("");
	   };

	   return (
			   <form className='px-4 my-3' onSubmit={handleSubmit}>
					   <div className='w-full relative flex gap-2'>
							   <select
									   className='border text-sm rounded-lg bg-gray-700 border-gray-600 text-white h-10'
									   value={lang}
									   onChange={e => setLang(e.target.value)}
							   >
									   <option value="en">EN</option>
									   <option value="es">ES</option>
									   <option value="fr">FR</option>
									   <option value="de">DE</option>
									   <option value="zh">ZH</option>
									   <option value="hi">HI</option>
									   <option value="ar">AR</option>
									   <option value="ru">RU</option>
									   <option value="pt">PT</option>
									   <option value="ja">JA</option>
							   </select>
							   <input
									   type='text'
									   className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
									   placeholder='Send a message'
									   value={message}
									   onChange={(e) => setMessage(e.target.value)}
							   />
							   <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
									   {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
							   </button>
					   </div>
			   </form>
	   );
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
