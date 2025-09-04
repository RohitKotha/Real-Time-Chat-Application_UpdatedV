import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto pt-3'>
			{!loading ? (
				<button 
					onClick={logout}
					className='w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border border-red-500/30 rounded-lg transition-all duration-300 backdrop-blur-sm'
				>
					<BiLogOut className='w-4 h-4' />
					<span className='font-medium text-sm'>Logout</span>
				</button>
			) : (
				<div className='w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg'>
					<div className='w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin'></div>
					<span className='font-medium text-sm'>Logging out...</span>
				</div>
			)}
		</div>
	);
};
export default LogoutButton;
