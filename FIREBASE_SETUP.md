# Firebase Setup Guide for Poetry Vault

This guide will help you set up Firebase Realtime Database for your Poetry Vault application.

## 🔥 Firebase Project Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "poetry-vault")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Realtime Database

1. In your Firebase project dashboard, click "Realtime Database" in the left sidebar
2. Click "Create database"
3. Choose a location for your database (select the closest to your users)
4. Start in **test mode** for development (we'll secure it later)
5. Click "Done"

### 3. Get Your Configuration

1. In the Firebase console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Register your app with a nickname (e.g., "poetry-vault-web")
6. Copy the configuration object

### 4. Update Your Configuration

Replace the configuration in `src/firebase/config.js` with your own:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
```

## 🔒 Security Rules Setup

### Test Mode (Development)
For development, you can use test mode which allows all read/write operations:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Production Rules (Recommended)
For production, use these secure rules:

```json
{
  "rules": {
    "Poems": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## 📊 Database Structure

Your Realtime Database will have this structure:

```
your-project/
└── poems/
    ├── -NcX1234567890/
    │   ├── title: "The Road Not Taken"
    │   ├── author: "Robert Frost"
    │   ├── content: "Two roads diverged..."
    │   ├── category: "Nature"
    │   ├── tags: ["choices", "life", "nature"]
    │   ├── createdAt: 1705123456789
    │   └── updatedAt: 1705123456789
    └── -NcY9876543210/
        ├── title: "Sonnet 18"
        ├── author: "William Shakespeare"
        └── ...
```

## 🚀 Testing Your Setup

1. Start your development server: `npm run dev`
2. Open your app in the browser
3. Check the browser console for Firebase connection messages
4. Try adding a new poem
5. Check your Firebase console to see the data

## 🔍 Monitoring Your Database

1. In Firebase console, go to "Realtime Database"
2. You'll see your data in real-time
3. Use the "Data" tab to view and edit data manually
4. Use the "Rules" tab to manage security rules

## 🛠️ Troubleshooting

### Common Issues:

1. **"Permission denied" errors**
   - Check your security rules
   - Make sure you're in test mode for development

2. **"Database not found" errors**
   - Verify your `databaseURL` in the config
   - Make sure Realtime Database is enabled

3. **"Invalid API key" errors**
   - Check your `apiKey` in the config
   - Make sure your app is properly registered

4. **Data not syncing**
   - Check browser console for errors
   - Verify your database path (`poems`)
   - Check network connectivity

### Debug Mode:
Enable debug logging by adding this to your browser console:
```javascript
localStorage.setItem('debug', 'firebase:*')
```

## 🔐 Authentication (Future Feature)

To enable user authentication later:

1. In Firebase console, go to "Authentication"
2. Click "Get started"
3. Enable email/password authentication
4. Update security rules to require authentication
5. Implement login/signup in your app

## 📱 Mobile App Integration

For mobile apps, you can use the same Firebase project:

- **React Native**: Use `@react-native-firebase/app`
- **Flutter**: Use `firebase_core` package
- **Native iOS**: Use Firebase iOS SDK
- **Native Android**: Use Firebase Android SDK

## 🎯 Best Practices

1. **Security**: Always use proper security rules in production
2. **Backup**: Regularly export your data
3. **Monitoring**: Set up alerts for unusual activity
4. **Performance**: Use indexing for large datasets
5. **Offline**: Test offline functionality

## 📞 Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)

---

Your Poetry Vault is now connected to Firebase Realtime Database! 🌟 