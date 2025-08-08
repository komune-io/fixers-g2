import getGlobalViteConfig from '../../vite-global.config.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default getGlobalViteConfig(__dirname)
