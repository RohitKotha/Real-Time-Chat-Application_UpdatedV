export const updateUserLanguage = async (req, res) => {
  try {
	const userId = req.user._id;
	const { language } = req.body;
	if (!language) return res.status(400).json({ error: "Language is required" });
	const user = await User.findByIdAndUpdate(userId, { language }, { new: true });
	res.status(200).json({ language: user.language });
  } catch (error) {
	console.error("Error in updateUserLanguage: ", error.message);
	res.status(500).json({ error: "Internal server error" });
  }
};
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		// Get all users except the logged-in user
		const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
		
		// Separate AI users from regular users
		const aiUsers = allUsers.filter(user => user.isAI === true);
		const regularUsers = allUsers.filter(user => user.isAI !== true);
		
		// Add a special flag to AI users for frontend display
		const enhancedAiUsers = aiUsers.map(user => ({
			...user.toObject(),
			isAI: true,
			aiIcon: true  // Flag to display AI icon in the frontend
		}));
		
		// Put AI users at the top of the list
		const sortedUsers = [...enhancedAiUsers, ...regularUsers];
		
		res.status(200).json(sortedUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
