# Deployment Guide for Chat App

## 🚀 Quick Deployment Steps

### 1. MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com/
2. Create a free cluster
3. Create a database user (Database Access)
4. Whitelist all IPs (Network Access): Add `0.0.0.0/0`
5. Get your connection string from "Connect" → "Connect your application"

### 2. Render Deployment
1. Go to https://render.com/ and sign up/login
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `RohitKotha/Chat-app-languageTranslation`
4. Configure:
   - Name: `chat-app-translation`
   - Environment: `Node`
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Auto-Deploy: `Yes`

### 3. Environment Variables in Render
Add these in Render Dashboard → Environment:

**Required:**
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Any random 32+ character string (e.g., `jwt_super_secret_key_12345_abcdef`)
- `NODE_ENV`: `production`

**Optional (for translation):**
- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `AWS_REGION`: `us-east-1`

### 4. Deploy
1. Push any changes to GitHub main branch
2. Render will automatically deploy
3. Monitor build logs in Render dashboard
4. Once deployed, test your app!

## 🔗 URLs After Deployment
- Your app will be available at: `https://your-app-name.onrender.com`
- Render provides HTTPS automatically

## 🐛 Troubleshooting
- If build fails: Check logs in Render dashboard
- If MongoDB connection fails: Verify connection string and IP whitelist
- If app doesn't load: Check that all environment variables are set correctly

## 📝 Sample MongoDB URI Format
```
mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority
```

Replace:
- `username`: Your MongoDB user
- `password`: Your MongoDB password  
- `cluster`: Your cluster name
- `chatapp`: Your database name
