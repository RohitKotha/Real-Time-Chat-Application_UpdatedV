import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex sm:h-[500px] md:h-[600px] w-full max-w-6xl rounded-lg overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
