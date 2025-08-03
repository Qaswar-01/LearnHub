# 🔒 HTTPS Setup for PWA Development

The PWA install button only appears when your app is served over HTTPS. Here are several ways to enable HTTPS for local development:

## 🚀 Quick Solutions

### Option 1: Using ngrok (Recommended)
```bash
# Install ngrok from https://ngrok.com/
# Then run your dev server and tunnel it:
npm run dev
# In another terminal:
ngrok http 5191
# Use the https://xxx.ngrok.io URL
```

### Option 2: Vite with HTTPS
```bash
# Install mkcert for local certificates
npm install -g mkcert
mkcert -install
mkcert localhost

# Run Vite with HTTPS
npm run dev -- --https --cert localhost.pem --key localhost-key.pem
```

### Option 3: Local SSL Proxy
```bash
# Install and run local-ssl-proxy
npx local-ssl-proxy --source 9001 --target 5191
# Access via https://localhost:9001
```

### Option 4: Update Vite Config
Add to `vite.config.js`:
```javascript
export default {
  server: {
    https: true,
    host: true
  }
}
```

## 🧪 Testing PWA Installation

1. **Open the test page**: Navigate to `/pwa-test.html` in your browser
2. **Check requirements**: Ensure all PWA requirements are met
3. **Look for install button**: Should appear in address bar or as a prompt
4. **Manual installation**: Use browser-specific methods if automatic prompt doesn't appear

## 🌐 Browser-Specific Instructions

### Chrome/Edge (Desktop)
- Look for install icon (⊕) in address bar
- Or: Menu → Install LearnHub
- Or: DevTools → Application → Manifest → Install

### Chrome (Mobile)
- Menu (⋮) → Add to Home screen
- Or wait for install banner

### Safari (iOS)
- Share button (□↗) → Add to Home Screen

### Firefox
- Install icon in address bar
- Or: Menu → Install this site as an app

## 🔧 Troubleshooting

### Install Button Not Appearing?
1. **Check HTTPS**: Must be served over HTTPS or localhost
2. **Check Service Worker**: Must be registered successfully
3. **Check Manifest**: Must be valid and accessible
4. **Check Icons**: Must have required icon sizes (192x192, 512x512)
5. **Wait**: Sometimes takes a few seconds to appear

### Common Issues
- **Mixed Content**: Ensure all resources are served over HTTPS
- **Service Worker Errors**: Check browser console for errors
- **Manifest Validation**: Use Chrome DevTools → Application → Manifest
- **Cache Issues**: Clear browser cache and reload

## 📱 Production Deployment

For production, ensure your hosting platform serves over HTTPS:
- **Vercel**: HTTPS by default
- **Netlify**: HTTPS by default  
- **GitHub Pages**: HTTPS available
- **Firebase Hosting**: HTTPS by default

## ✅ Verification Checklist

- [ ] App served over HTTPS or localhost
- [ ] Service Worker registered successfully
- [ ] Manifest.json accessible and valid
- [ ] Required icons present (192x192, 512x512)
- [ ] No console errors
- [ ] Install prompt appears or manual installation works
