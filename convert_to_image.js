import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport size to match our diagram
  await page.setViewport({
    width: 840,
    height: 540,
  });

  // Load the HTML file
  const htmlPath = path.join(__dirname, "public", "https_diagram.html");
  await page.goto(`file://${htmlPath}`);

  // Wait for the content to load
  await page.waitForSelector("svg");

  // Take a screenshot of just the SVG diagram
  const element = await page.$(".container");
  await element.screenshot({
    path: path.join(__dirname, "public", "images", "https_encryption.png"),
    omitBackground: true,
  });

  console.log("Screenshot saved to public/images/https_encryption.png");

  await browser.close();
})().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
