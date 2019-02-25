import * as path from 'path'

export const isDev = !process.argv.some(v => v.includes('--mode=production'))
export const isHot = process.argv.some(v => v.includes('webpack-dev-server'))
export const rootDir = path.join(__dirname, '../')
