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

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
