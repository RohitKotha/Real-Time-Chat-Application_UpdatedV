import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	   const [inputs, setInputs] = useState({
			   fullName: "",
			   username: "",
			   password: "",
			   confirmPassword: "",
			   gender: "",
			   language: "en",
	   });

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	// All Indian languages with their native names
	const languages = [
		{ code: "en", name: "English", native: "English" },
		{ code: "hi", name: "Hindi", native: "हिन्दी" },
		{ code: "bn", name: "Bengali", native: "বাংলা" },
		{ code: "te", name: "Telugu", native: "తెలుగు" },
		{ code: "mr", name: "Marathi", native: "मराठी" },
		{ code: "ta", name: "Tamil", native: "தமிழ்" },
		{ code: "gu", name: "Gujarati", native: "ગુજરાતી" },
		{ code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
		{ code: "ml", name: "Malayalam", native: "മലയാളം" },
		{ code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
		{ code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
		{ code: "as", name: "Assamese", native: "অসমীয়া" },
		{ code: "ks", name: "Kashmiri", native: "کٲشُر" },
		{ code: "sd", name: "Sindhi", native: "سنڌي" },
		{ code: "ur", name: "Urdu", native: "اردو" },
		{ code: "ne", name: "Nepali", native: "नेपाली" },
		{ code: "sa", name: "Sanskrit", native: "संस्कृतम्" },
		{ code: "mai", name: "Maithili", native: "मैथिली" },
		{ code: "bho", name: "Bhojpuri", native: "भोजपुरी" },
		{ code: "kok", name: "Konkani", native: "कोंकणी" },
		{ code: "mni", name: "Manipuri", native: "মৈতৈলোন্" },
		{ code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
		{ code: "doi", name: "Dogri", native: "डोगरी" },
		{ code: "es", name: "Spanish", native: "Español" },
		{ code: "fr", name: "French", native: "Français" },
		{ code: "de", name: "German", native: "Deutsch" },
		{ code: "zh", name: "Chinese", native: "中文" },
		{ code: "ar", name: "Arabic", native: "العربية" },
		{ code: "ru", name: "Russian", native: "Русский" },
		{ code: "pt", name: "Portuguese", native: "Português" },
		{ code: "ja", name: "Japanese", native: "日本語" },
	];

	return (
		<div className='flex flex-col items-center justify-center min-w-[450px] mx-auto'>
			<div className='w-full p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20'>
				<h1 className='text-3xl font-bold text-center text-white mb-6'>
					Sign Up <span className='text-blue-400'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-white/90 mb-1'>
							Full Name
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-white/90 mb-1'>
							Username
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-white/90 mb-1'>
							Password
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-white/90 mb-1'>
							Confirm Password
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<div>
						<label className='block text-sm font-medium text-white/90 mb-1'>
							Preferred Language
						</label>
						<select
							className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300'
							value={inputs.language}
							onChange={(e) => setInputs({ ...inputs, language: e.target.value })}
						>
							{languages.map((lang) => (
								<option key={lang.code} value={lang.code} className='bg-gray-800 text-white'>
									{lang.name} ({lang.native})
								</option>
							))}
						</select>
					</div>

					<div>
						<button 
							className='w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none' 
							disabled={loading}
						>
							{loading ? (
								<div className='flex items-center justify-center gap-2'>
									<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
									Creating account...
								</div>
							) : (
								"Sign Up"
							)}
						</button>
					</div>

					<div className='text-center'>
						<Link
							to={"/login"}
							className='text-sm text-white/80 hover:text-blue-400 transition-colors duration-300'
						>
							Already have an account? <span className='font-semibold'>Login</span>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;

// STARTER CODE FOR THE SIGNUP COMPONENT
// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Sign Up <span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Full Name</span>
// 						</label>
// 						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
// 					</div>

// 					<div>
// 						<label className='label p-2 '>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Confirm Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Confirm Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>

// 					<GenderCheckbox />

// 					<a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
// 						Already have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default SignUp;
