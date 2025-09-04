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

	   // All Indian languages for message translation
	   const languages = [
		   { code: "en", name: "EN", native: "English" },
		   { code: "hi", name: "HI", native: "हिन्दी" },
		   { code: "bn", name: "BN", native: "বাংলা" },
		   { code: "te", name: "TE", native: "తెలుగు" },
		   { code: "mr", name: "MR", native: "मराठी" },
		   { code: "ta", name: "TA", native: "தமிழ்" },
		   { code: "gu", name: "GU", native: "ગુજરાતી" },
		   { code: "kn", name: "KN", native: "ಕನ್ನಡ" },
		   { code: "ml", name: "ML", native: "മലയാളം" },
		   { code: "or", name: "OR", native: "ଓଡ଼ିଆ" },
		   { code: "pa", name: "PA", native: "ਪੰਜਾਬੀ" },
		   { code: "as", name: "AS", native: "অসমীয়া" },
		   { code: "ur", name: "UR", native: "اردو" },
		   { code: "ne", name: "NE", native: "नेपाली" },
		   { code: "sa", name: "SA", native: "संस्कृतम्" },
		   { code: "es", name: "ES", native: "Español" },
		   { code: "fr", name: "FR", native: "Français" },
		   { code: "de", name: "DE", native: "Deutsch" },
		   { code: "zh", name: "ZH", native: "中文" },
		   { code: "ar", name: "AR", native: "العربية" },
		   { code: "ru", name: "RU", native: "Русский" },
		   { code: "pt", name: "PT", native: "Português" },
		   { code: "ja", name: "JA", native: "日本語" },
	   ];

	   return (
			   <form className='px-4 py-3 bg-white/5 backdrop-blur-sm border-t border-white/20' onSubmit={handleSubmit}>
					   <div className='flex gap-2 items-end'>
							   <div className='flex-shrink-0'>
									   <label className='block text-xs text-white/70 mb-1'>Lang</label>
									   <select
											   className='px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300'
											   value={lang}
											   onChange={e => setLang(e.target.value)}
									   >
											   {languages.map((language) => (
													   <option key={language.code} value={language.code} className='bg-gray-800 text-white'>
															   {language.name}
													   </option>
											   ))}
									   </select>
							   </div>
							   <div className='flex-1 relative'>
									   <input
											   type='text'
											   className='w-full px-3 py-2 pr-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300'
											   placeholder='Type your message...'
											   value={message}
											   onChange={(e) => setMessage(e.target.value)}
									   />
									   <button 
											   type='submit' 
											   disabled={loading || !message.trim()}
											   className='absolute right-1 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-md transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed'
									   >
											   {loading ? (
													   <div className='w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
											   ) : (
													   <BsSend className='w-3 h-3' />
											   )}
									   </button>
							   </div>
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
