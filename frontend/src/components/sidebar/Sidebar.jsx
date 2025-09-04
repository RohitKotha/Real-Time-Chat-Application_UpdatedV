import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import LanguageSelector from "./LanguageSelector";

const Sidebar = () => {
	   return (
			   <div className='border-r border-white/20 p-5 flex flex-col min-w-[270px] bg-white/5 backdrop-blur-sm'>
					   <LanguageSelector />
					   <SearchInput />
					   <div className='divider px-3 border-white/20'></div>
					   <Conversations />
					   <LogoutButton />
			   </div>
	   );
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
