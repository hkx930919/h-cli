const inquirer = require('inquirer')
const fs = require('fs-extra')
const { join } = require('path')
const { shell } = require('execa')
const ora = require('ora')
const { success, err, writeHkxConfig, hasYarn } = require('../util/tool')
const { __SRC_PATH, __PAGE_PATH, GIT_VUE_PAHT } = require('../util/path')

module.exports = async () => {
  const spinner = ora('正在初始化...')
  spinner.start()
  try {
    await shell(`git clone -b master ${GIT_VUE_PAHT} ${join(__dirname, 'tmp')}`)
    success(1, '  clone')
    await fs.remove(join(__dirname, './tmp/.git'))
    success(2, '  remove .git')
    const CWD = process.cwd()
    await fs.copy(join(__dirname, 'tmp'), CWD)
    success(3, '  copy to cwd')
    await fs.remove(join(__dirname, 'tmp'))
    success(4, '  remove to tmp')
    const __packageLock = join(CWD, 'package-lock.json')
    if (fs.pathExistsSync(__packageLock)) {
      await fs.remove(__packageLock)
    }
    const yarnLockPath = join(CWD, 'yarn.lock')
    if (fs.pathExistsSync(yarnLockPath)) {
      await fs.remove(yarnLockPath)
    }
    await shell(hasYarn() ? `yarn` : `npm i`)
    success(5, '  npm i')
    spinner.stop()
    success('\n 初始化成功')
    success('\n 使用 npm run dev 运行项目')
  } catch (error) {
    spinner.stop()
    err(error)
  }
}
