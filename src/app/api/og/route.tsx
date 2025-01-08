import { ImageResponse } from "next/og";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { margin: 0; padding: 0; }
          .grid-bg {
            background-color: rgb(16 0 43);
            background-image: 
              radial-gradient(at center, transparent, rgb(16 0 43) 80%),
              linear-gradient(rgb(255 255 255 / 0.1) 1px, transparent 1px),
              linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px);
            background-size: 100% 100%, 80px 80px, 80px 80px;
          }
        </style>
      </head>
      <body>
        <div class="w-[1200px] h-[630px] grid-bg flex flex-col items-center justify-center relative">
          <div class="w-48 h-48 rounded-full bg-white shadow-xl overflow-hidden mb-8 z-10">
            <img 
              src="https://github.com/bossdaily.png" 
              class="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
          <h1 class="text-6xl font-bold text-white z-10">bossdaily.dev</h1>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  
  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 630,
  });

  await page.setContent(html, { waitUntil: "networkidle0" });

  const screenshot = await page.screenshot({ type: "png" });

  await browser.close();

  return new Response(screenshot, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}