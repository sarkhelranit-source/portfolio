import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';

// Automatically copy AI generated images to the public directory
const srcDir = '/home/ubuntu/.gemini/antigravity/brain/4d6da65d-3ade-48f6-9fb6-1222bbfc415c';
const destDir = path.resolve(__dirname, 'public');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
try {
  const files = fs.readdirSync(srcDir);
  const mappings = {
    'aws_incident': 'projects/aws.png',
    'discord_ai': 'projects/discord.png',
    'telegram_bot': 'projects/telegram.png',
    'guess_the_number': 'projects/guess.png',
    'ranit_logo_notext': 'logo-v2.png'
  };
  files.forEach(file => {
    for (const [key, finalName] of Object.entries(mappings)) {
      if (file.startsWith(key) && file.endsWith('.png')) {
        const fullDestPath = path.join(destDir, finalName);
        const fullDestDir = path.dirname(fullDestPath);
        if (!fs.existsSync(fullDestDir)) {
          fs.mkdirSync(fullDestDir, { recursive: true });
        }
        fs.copyFileSync(path.join(srcDir, file), fullDestPath);
      }
    }
  });
} catch (e) {
  console.error("Failed to copy generated images", e);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      fs: {
        allow: ['/home/ubuntu']
      }
    },
    build: {
      chunkSizeWarningLimit: 5000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@splinetool')) {
                return 'spline';
              }
              if (id.includes('motion')) {
                return 'motion';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
