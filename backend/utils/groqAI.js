import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

/**
 * Get a response from Groq AI
 * @param {string} message - The message to send to the AI
 * @param {Array} history - Previous conversation history (not used in this simplified version)
 * @returns {Promise<string>} - The AI's response
 */
export const getAIResponse = async (message, history = []) => {
  try {
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not set in environment variables');
    }

    // Simple message array with system prompt and user message
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful and friendly AI assistant in a chat application. ' +
                 'Be concise, informative, and personable in your responses. ' +
                 'Keep your answers under 3 sentences unless detailed information is requested. ' +
                 'If you don\'t know something, be honest about it.'
      },
      {
        role: 'user',
        content: message
      }
    ];

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with Groq API:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    
    // Provide a fallback response instead of throwing error
    if (error.message.includes('GROQ_API_KEY not set')) {
      return "I can't access my knowledge base due to a configuration issue. Please contact the administrator about the GROQ_API_KEY.";
    } else {
      return "I'm experiencing some technical difficulties at the moment. Please try again later.";
    }
  }
};
