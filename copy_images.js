const fs = require('fs');
const path = require('path');

const srcDir = '/home/ubuntu/.gemini/antigravity/brain/4d6da65d-3ade-48f6-9fb6-1222bbfc415c';
const destDir = path.join(__dirname, 'public', 'projects');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const mappings = {
  'aws_incident': 'aws.png',
  'discord_ai': 'discord.png',
  'telegram_bot': 'telegram.png',
  'guess_the_number': 'guess.png'
};

files.forEach(file => {
  for (const [key, finalName] of Object.entries(mappings)) {
    if (file.startsWith(key) && file.endsWith('.png')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, finalName));
      console.log(`Copied ${file} to ${finalName}`);
    }
  }
});
