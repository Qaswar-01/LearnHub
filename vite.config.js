import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,txt,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: 'index.html',
        navigateFallbackAllowlist: [/^\/$/]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'LearnHub - Interactive Learning Platform',
        short_name: 'LearnHub',
        description: 'Master web development through interactive lessons, quizzes, and hands-on projects. Complete learning platform for frontend and backend development.',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '.',
        icons: [
          {
            src: 'icons/icon-72x72.svg',
            sizes: '72x72',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-96x96.svg',
            sizes: '96x96',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-128x128.svg',
            sizes: '128x128',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-144x144.svg',
            sizes: '144x144',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-152x152.svg',
            sizes: '152x152',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable'
          },
          {
            src: 'icons/icon-384x384.svg',
            sizes: '384x384',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        categories: ['education', 'productivity', 'utilities'],
        lang: 'en',
        dir: 'ltr'
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      }
    })
  ],
  base: './',
  server: {
    port: 5199,
    host: true,
    hmr: {
      port: 5199,
      overlay: true
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
