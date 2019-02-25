import { clientConfig, config } from 'config'
import express from 'express'
import path from 'path'
import { rootDir } from '../../webpack/tools'

const app = express()

app.use(express.static(path.join(rootDir, './dist/static')))

app.set('views', path.join(rootDir, 'views'))
app.set('view engine', 'ejs')

app.get('*', (_, res) => {
  res.render('index', { ...clientConfig })
})

app.listen(config.port, config.host, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening at http://${config.host}:${config.port}\n`)
})

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
})
