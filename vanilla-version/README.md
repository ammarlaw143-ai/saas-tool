# ToolVerse AI - Vanilla HTML/CSS/JS Version

This is a vanilla HTML, CSS, and JavaScript conversion of the original Next.js/TypeScript application. All functionality has been ported to run without any build tools or frameworks.

## Features

- **Client-side routing** using hash-based navigation
- **Dark/Light theme** toggle with localStorage persistence
- **Responsive design** with mobile menu support
- **All original pages**: Home, Tools, Auth (Login/Signup), Pricing, Blog, Contact, Dashboard
- **Glassmorphism UI** matching the original design
- **Lucide icons** loaded via CDN
- **Search and filtering** for tools
- **FAQ accordion** functionality
- **Newsletter subscription** form

## File Structure

```
vanilla-version/
├── index.html      # Main HTML file with layout structure
├── styles.css      # Complete CSS with dark/light themes
├── main.js         # JavaScript with routing and functionality
└── README.md       # This file
```

## How to Use

1. **Open the application**
   - Simply open `index.html` in a web browser
   - Or use a local server: `python -m http.server` or `npx serve`

2. **Navigation**
   - The app uses hash-based routing (e.g., `#/tools`, `#/auth/login`)
   - Click navigation links to move between pages
   - Browser back/forward buttons work correctly

3. **Features**
   - **Theme Toggle**: Click the sun/moon icon in the navbar
   - **Search**: Use the search bar on the home page to filter tools
   - **Categories**: Click category buttons to filter tools by type
   - **Auth**: Use Login/Signup pages (stores state in localStorage)
   - **Dashboard**: Access after logging in

## Key Differences from Next.js Version

1. **No build step required** - Just open the HTML file
2. **Hash-based routing** instead of file-based routing
3. **Vanilla JavaScript** instead of React
4. **Plain CSS** instead of Tailwind (converted manually)
5. **Lucide icons via CDN** instead of npm package
6. **localStorage** for state persistence (theme, auth)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- CSS custom properties (CSS variables) support required

## Customization

### Adding New Tools

Edit the `ALL_TOOLS` array in `main.js`:

```javascript
const ALL_TOOLS = [
    // Add your tool here
    { 
        name: "Your Tool", 
        slug: "your-tool", 
        desc: "Description here", 
        category: "Category", 
        isPremium: false, 
        rating: 4.5 
    },
];
```

### Modifying Styles

All styles are in `styles.css`. The CSS uses CSS custom properties for theming:

```css
:root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... more variables */
}
```

### Adding New Pages

Add a new route handler in `main.js`:

```javascript
function loadYourPage() {
    mainContent.innerHTML = `your HTML here`;
    lucide.createIcons();
}
```

Then add it to the `handleRoute()` function.

## Deployment

Since this is a static site, you can deploy it anywhere:

- **GitHub Pages**: Push to a repo and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Import the folder
- **Any static hosting**: Upload the files

## Performance

- No JavaScript bundle to download
- CSS is loaded in a single file
- Icons loaded from CDN (cached)
- Fast initial load time
- Client-side only (no server required)

## Limitations

- Tool interfaces are placeholders (actual tool logic would need to be implemented)
- No server-side features
- Auth is simulated (localStorage only)
- No database integration
- No API calls implemented

## Future Enhancements

- Implement actual tool functionality
- Add real authentication
- Connect to backend APIs
- Add more animations
- Implement PWA features
- Add offline support

## Original Next.js Version

The original Next.js version is in the parent directory. This vanilla version maintains the same UI/UX while removing the framework dependencies.
