// AWS Translate utility for backend
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

const client = new TranslateClient({ region: process.env.AWS_REGION || 'us-east-1' });

export const awsTranslateText = async (text, sourceLang, targetLang) => {
  if (!text || !sourceLang || !targetLang) return text;
  try {
    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang,
    });
    const response = await client.send(command);
    return response.TranslatedText;
  } catch (err) {
    console.error('AWS Translation error:', err);
    return text;
  }
};
