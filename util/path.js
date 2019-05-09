const path = require('path')
const resolve = p => path.resolve(process.cwd(), p)
module.exports = {
  GIT_VUE_PAHT: 'https://github.com/hkx930919/cli-vue-tmp.git',
  __NODE_MODULE_PATH: resolve('node_modules'),
  __SRC_PATH: resolve('src'),
  __PAGE_PATH: resolve('page'),
  __HKX_CONFIG: resolve('hkx.config')
}
