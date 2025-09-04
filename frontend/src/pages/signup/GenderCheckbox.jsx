const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div>
			<label className='block text-sm font-medium text-white/90 mb-2'>
				Gender
			</label>
			<div className='flex gap-4'>
				<div className='form-control'>
					<label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition-all duration-300 ${
						selectedGender === "male" 
							? "bg-blue-500/20 border-blue-400 text-blue-200" 
							: "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
					}`}>
						<input
							type='checkbox'
							className='w-4 h-4 text-blue-600 bg-transparent border-2 border-current rounded focus:ring-blue-500 focus:ring-2'
							checked={selectedGender === "male"}
							onChange={() => onCheckboxChange("male")}
						/>
						<span className='font-medium'>Male</span>
					</label>
				</div>
				<div className='form-control'>
					<label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition-all duration-300 ${
						selectedGender === "female" 
							? "bg-pink-500/20 border-pink-400 text-pink-200" 
							: "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
					}`}>
						<input
							type='checkbox'
							className='w-4 h-4 text-pink-600 bg-transparent border-2 border-current rounded focus:ring-pink-500 focus:ring-2'
							checked={selectedGender === "female"}
							onChange={() => onCheckboxChange("female")}
						/>
						<span className='font-medium'>Female</span>
					</label>
				</div>
			</div>
		</div>
	);
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;
