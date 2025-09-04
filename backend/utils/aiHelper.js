import User from "../models/user.model.js";
import mongoose from "mongoose";

/**
 * Creates or retrieves the AI assistant user
 * @returns {Promise<Object>} The AI user object
 */
export const getOrCreateAIUser = async () => {
  try {
    // Check if AI user already exists
    let aiUser = await User.findOne({ username: "ai_assistant" });

    if (!aiUser) {
      // Create the AI user if it doesn't exist
      const aiUserId = new mongoose.Types.ObjectId();
      aiUser = new User({
        _id: aiUserId,
        fullName: "AI Assistant",
        username: "ai_assistant",
        password: new mongoose.Types.ObjectId().toString(), // Random secure password
        gender: "AI",
        profilePic: "", // Will use default avatar
        language: "en", // Default language
        isAI: true // Special flag to identify AI users
      });

      await aiUser.save();
      console.log("AI user created successfully");
    }

    return aiUser;
  } catch (error) {
    console.error("Error creating/retrieving AI user:", error);
    throw error;
  }
};
