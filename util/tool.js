const chalk = require('chalk')
const fs = require('fs-extra')
const { shell, shellSync } = require('execa')
const { __NODE_MODULE_PATH, __SRC_PATH, __PAGE_PATH } = require('./path')

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
hasYarn()
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
  try {
    await shell(`cd ${projectPath} && ${hasYarn ? 'yarn' : 'npm i'}`)
  } catch (error) {
    await shell(`cd ${projectPath} && npm i`)
  }
}

module.exports = { success, err, info, installDep, normalizeEntry }
