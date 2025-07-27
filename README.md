# Poetry Vault - Your Personal Poetry Collection

A beautiful, responsive poetry storage application built with React, featuring a modern design that works seamlessly on both mobile and desktop devices.

## ✨ Features

### Core Functionality
- **Read**: Browse and read your poetry collection with beautiful typography
- **Write**: Add new poems with a comprehensive form
- **Edit**: Update existing poems with full editing capabilities
- **Delete**: Remove poems with confirmation dialogs

### Advanced Features
- **Search**: Find poems by title, author, content, or tags
- **Sort**: Sort by title, author, or date (ascending/descending)
- **Categorize**: Organize poems by categories (Nature, Love, Life, etc.)
- **Tags**: Add custom tags to poems for better organization
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Cloud Storage**: All data persists in Firebase Realtime Database (cloud database)
- **Offline Support**: Falls back to local storage when offline

### User Experience
- **Grid/List View**: Toggle between different viewing modes
- **Beautiful Typography**: Special fonts for poetry display
- **Smooth Animations**: Elegant transitions and hover effects
- **Glass Morphism**: Modern UI with backdrop blur effects
- **Mobile-First**: Optimized for touch interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Set up Firebase** (Required)
   Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md) to configure your Realtime Database

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📱 Mobile & Desktop Compatibility

The app is fully responsive and optimized for:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1200px+)

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple-to-pink gradients
- **Glass Effects**: Backdrop blur with transparency
- **Typography**: Playfair Display for poetry, Inter for UI
- **Color Scheme**: Purple and blue primary colors
- **Animations**: Smooth transitions and hover effects
- **Icons**: Lucide React icons throughout

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── PoetryList.jsx      # Main poem listing
│   ├── PoetryCard.jsx      # Individual poem cards
│   ├── PoetryForm.jsx      # Add/edit poem form
│   ├── PoetryDetail.jsx    # Poem detail view
│   └── SearchFilters.jsx   # Category filters
├── context/
│   └── PoetryContext.jsx   # State management
├── App.jsx                 # Main app component
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date formatting
- **Firebase** - Cloud database and backend services
- **Vite** - Build tool

## 📊 Data Structure

Each poem contains:
```javascript
{
  id: "unique-id",
  title: "Poem Title",
  author: "Author Name",
  content: "Poem content...",
  category: "Nature|Love|Life|...",
  tags: ["tag1", "tag2"],
  createdAt: "2024-01-15T...",
  updatedAt: "2024-01-15T..."
}
```

## 🎯 Usage Guide

### Adding a Poem
1. Click "Add Poem" in the header
2. Fill in title, author, and content
3. Select a category
4. Add optional tags
5. Click "Save Poem"

### Searching & Filtering
1. Use the search bar to find poems
2. Click "Filters" to show category options
3. Use sort buttons to organize by title, author, or date

### Editing a Poem
1. Click the three dots menu on any poem card
2. Select "Edit"
3. Make your changes
4. Click "Update Poem"

### Viewing Details
1. Click on any poem card to view full details
2. Use the detail view to read the complete poem
3. Access edit and delete options from the detail page

## 🔧 Customization

### Adding New Categories
Edit the `categories` array in `PoetryForm.jsx`:
```javascript
const categories = [
  'Nature', 'Love', 'Life', 'Death', 'Spirituality', 
  'Politics', 'Social Issues', 'Personal', 'Philosophy', 
  'Humor', 'Your New Category', 'Other'
]
```

### Changing Colors
Modify the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    // ... other shades
  }
}
```

## 📱 PWA Features

The app is ready for PWA conversion with:
- Responsive design
- Offline capability (with service worker)
- App-like experience
- Touch-friendly interactions

## 🚀 Deployment

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.

---

**Enjoy your poetry collection! 📚✨** 