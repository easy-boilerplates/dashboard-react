import * as fs from 'fs'
import * as glob from 'glob'
import * as path from 'path'
import * as webpack from 'webpack'

interface Options {
  from: string
  to: string
  transform?: {
    after?: (content: string) => string
  }
  extension?: string
}

export class ResourcesPlugin implements webpack.Plugin {
  private _startTime = Date.now()
  private _prevTimestamps: Map<string, string>

  constructor(private _options: Options) {
  }

  apply(compiler: webpack.Compiler) {
    let fileDependencies: string[]

    compiler.plugin('emit', (compilation, cb) => {
      glob(path.join(compiler.options.context, this._options.from), null, (er, files) => {
        fileDependencies = []

        for (const file of files) {
          fileDependencies.push(path.resolve(compilation.compiler.context, file))
        }

        const changedFiles = []

        if (this._prevTimestamps) {
          compilation.fileTimestamps.forEach((value, key) => {
            if ((this._prevTimestamps.get(key) || this._startTime) < (value || Infinity)) {
              changedFiles.push(key)
            }
          })
        }

        for (const file of fileDependencies) {
          if (changedFiles.indexOf(file) !== -1 || !this._prevTimestamps) {
            this.buildResources(file, compilation)
          }
        }

        this._prevTimestamps = compilation.fileTimestamps

        cb()
      })
    })

    compiler.plugin('after-emit', (compilation, cb) => {
      const compilationFileDependencies = new Set(compilation.fileDependencies)

      for (const file of fileDependencies) {
        if (!compilationFileDependencies.has(file)) {
          compilation.fileDependencies.add(file)
        }
      }

      cb()
    })
  }

  private buildResources(dependency: string, compilation: any) {
    const file = fs.readFileSync(dependency, { encoding: 'utf-8' })
    const extension = path.extname(dependency)
    const fileName = path.basename(dependency, extension)

    const resources: { [id: string]: { [lang: string]: string } } = JSON.parse(file)
    const langs: { [lang: string]: { [id: string]: string } } = {}

    for (const id of Object.keys(resources)) {
      const resource = resources[id]

      for (const lang of Object.keys(resource)) {
        const msg = resource[lang]

        if (!langs[lang])
          langs[lang] = {}

        langs[lang][id] = msg
      }
    }

    const newExtension = this._options && this._options.extension || extension

    for (const lang of Object.keys(langs)) {
      const content = JSON.stringify(langs[lang])

      const data = this._options.transform && this._options.transform.after
        ? this._options.transform.after(content)
        : content

      const outputFilename = path.join(this._options.to, `${lang}.${newExtension}`)

      compilation.assets[outputFilename] = {
        source: () => data,
        size: () => data.length
      }
    }
  }
}