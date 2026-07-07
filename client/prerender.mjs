import { launch } from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, extname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const DIST = join(__dirname, 'dist')
const PORT = 4173

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
}

if (!existsSync(DIST)) {
  console.error('❌ dist/ not found. Run `vite build` first.')
  process.exit(1)
}

const server = createServer((req, res) => {
  let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url.split('?')[0])
  if (!existsSync(filePath)) filePath = join(DIST, 'index.html')

  const ext = extname(filePath)
  const contentType = MIME[ext] || 'application/octet-stream'

  try {
    const content = readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
})

server.listen(PORT, async () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`)

  try {
    const browser = await launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })

    // Increase timeout for SPA rendering
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // Wait for fonts and animations to settle
    await page.evaluate(() => Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(r => setTimeout(r, 2500)),
    ]))

    // Get the fully rendered HTML
    let html = await page.content()

    // Clean up any overflow styles set by React that aren't needed in static version
    html = html.replace(/style="overflow:\s*unset;?"/gi, '')
    html = html.replace(/style="overflow:\s*hidden;?"/gi, '')

    // Write the prerendered HTML to dist/index.html
    const outPath = join(DIST, 'index.html')
    writeFileSync(outPath, html, 'utf-8')
    console.log(`✅ Prerendered HTML saved to ${outPath}`)
    console.log(`📄 Size: ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`)

    await browser.close()
    server.close()
    console.log('🚀 Prerender complete!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Prerender failed:', err)
    server.close()
    process.exit(1)
  }
})
