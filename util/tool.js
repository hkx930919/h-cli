const chalk = require('chalk')
const fs = require('fs-extra')
const { join } = require('path')
const { shell, shellSync } = require('execa')
const { __NODE_MODULE_PATH, __SRC_PATH, __PAGE_PATH, __HKX_CONFIG } = require('./path')
const CWD = process.cwd()
const success = (...args) => {
  console.log(chalk.green(...args))
}
const err = (...args) => {
  console.log(chalk.red(...args))
}
const info = (...args) => {
  console.log(chalk.gray(...args))
}
const hasYarn = () => {
  try {
    shellSync(`yarnpkg -v`, { stdio: 'ignore' })
    return true
  } catch (error) {
    shell(`npm i yarn -g`)
  }
}
/**
 * @param {Array||String} entry 页面入口
 * @return pagename
 */
const normalizeEntry = entry => {
  let page
  if (Array.isArray(entry)) {
    page = entry[0]
  } else {
    page = entry
  }
  return page
}

/**
 * 安装依赖
 */
const installDep = async (projectPath, remove = true) => {
  if (typeof projectPath === 'boolean') {
    remove = projectPath
    projectPath = null
  }
  if (remove && fs.pathExists(__NODE_MODULE_PATH)) {
    fs.remove(__NODE_MODULE_PATH)
  }
  /**
   * 移除lock文件，防止报错
   */
  const __packageLock = join(CWD, 'package-lock.json')
  if (fs.pathExistsSync(__packageLock)) {
    await fs.remove(__packageLock)
  }
  const yarnLockPath = join(CWD, 'yarn.lock')
  if (fs.pathExistsSync(yarnLockPath)) {
    await fs.remove(yarnLockPath)
  }

  try {
    await shell(`cd ${projectPath} && ${hasYarn ? 'yarn' : 'npm i'}`)
  } catch (error) {
    await shell(`cd ${projectPath} && npm i`)
  }
}

const writeHkxConfig = pagename => {
  if (!fs.pathExistsSync(__HKX_CONFIG)) {
    try {
      const text = `
            /**
             * 项目配置页
             */
           module.exports = {
             /**entry 可以为string,数组,如果为''，那么读取项目目录
              *   entry: 'example'
              *   entry: ['example1','example2']
              */
             entry: ${pagename}
           }
           `

      fs.writeFileSync(__HKX_CONFIG, text)
    } catch (error) {
      err(error)
    }
  } else {
    let configInfo = fs.readFileSync(__HKX_CONFIG, { encoding: 'utf8' })
    configInfo = configInfo.replace(
      /entry\s*:\s*((\[(.+?)\])|('(.+?)')|("(.+?)"))\s*,?/g,
      `entry:['${pagename}'],`
    )
    fs.writeFileSync(__HKX_CONFIG, configInfo)
  }
}

module.exports = { success, err, info, installDep, normalizeEntry, writeHkxConfig, hasYarn }
