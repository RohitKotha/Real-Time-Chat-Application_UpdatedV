import { getOrCreateAIUser } from "../utils/aiHelper.js";

/**
 * Initializes the AI assistant user when the server starts
 */
const setupAIAssistant = async () => {
  try {
    console.log("Setting up AI assistant...");
    const aiUser = await getOrCreateAIUser();
    console.log("AI assistant setup complete:", aiUser.username);
  } catch (error) {
    console.error("Failed to setup AI assistant:", error);
  }
};

export default setupAIAssistant;
