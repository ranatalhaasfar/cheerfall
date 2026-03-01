import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const screenshotDir = join(__dirname, 'temporary screenshots');

await mkdir(screenshotDir, { recursive: true });

const existing = await readdir(screenshotDir).catch(() => []);
const numbers = existing
  .map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] ?? '0'))
  .filter(n => !isNaN(n) && n > 0);
const nextNum = numbers.length ? Math.max(...numbers) + 1 : 1;

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const filename = `screenshot-${nextNum}${label}.png`;
const filepath = join(screenshotDir, filename);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/RTA/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

// Let animations settle
await new Promise(r => setTimeout(r, 800));

await page.screenshot({ path: filepath, fullPage: true });

console.log(`Screenshot saved: ${filepath}`);
await browser.close();
