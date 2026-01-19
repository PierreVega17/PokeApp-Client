import fs from 'fs/promises'
import postcss from 'postcss'
import postcssConfig from '../postcss.config.js'

const input = './src/index.css'
const out = './out.css'

async function run(){
  const css = await fs.readFile(input, 'utf8')
  const plugins = []
  for (const [name, opts] of Object.entries(postcssConfig.plugins || {})){
    // dynamic import of plugin package
    const mod = await import(name).catch(()=>null)
    if (!mod) throw new Error(`Cannot import plugin ${name}`)
    const pluginFn = mod.default || mod
    plugins.push(pluginFn(opts))
  }
  const processor = postcss(plugins)
  const result = await processor.process(css, { from: input })
  await fs.writeFile(out, result.css, 'utf8')
  console.log('Wrote', out)
}

run().catch(err=>{console.error(err); process.exit(1)})
