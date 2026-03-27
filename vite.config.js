import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 扫描每个站点目录下的所有 HTML 文件作为构建入口
const sites = ['restaurant', 'beauty', 'tech']
const input = {}

for (const site of sites) {
  const dir = resolve(__dirname, `sites/${site}`)
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'))
    for (const file of files) {
      const name = `${site}/${file.replace('.html', '')}`
      input[name] = resolve(dir, file)
    }
  }
}

export default defineConfig({
  root: __dirname,
  publicDir: 'src/assets',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input,
    },
  },
})
