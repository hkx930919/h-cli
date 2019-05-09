const inquirer = require('inquirer')
const fs = require('fs-extra')
const { join } = require('path')
const ora = require('ora')
const { shell } = require('execa')

const { success, err, installDep } = require('../util/tool')
const { GIT_VUE_PAHT } = require('../util/path')
async function getProName() {
  const { _projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: '_projectName',
      message: '你想创建的工程名称：',
      validate(val) {
        if (val === '') {
          return 'Name is required!'
        } else if (fs.pathExistsSync(join(CWD, val))) {
          return `${val} has already existed!`
        } else {
          return true
        }
      }
    }
  ])
  return _projectName
}
module.exports = async function() {
  let projectName = process.argv[3] || ''
  const CWD = process.cwd()
  if (projectName && fs.pathExistsSync(join(CWD, projectName))) {
    err(`${projectName} 已经存在，请输入新的名称`)
    const _projectName = await getProName()
    projectName = _projectName
  } else if (!projectName) {
    const _projectName = await getProName()
    projectName = _projectName
  }

  const spinner = ora('创建工程中...')
  spinner.start()

  try {
    const projectPath = join(CWD, projectName)
    await shell(`git clone -b master ${GIT_VUE_PAHT} ${projectName}`)
    fs.remove(join(projectName, '.git'))
    await installDep(projectName)
    success('\n  创建成功,执行以下命令,启动项目')
    success(`\n  cd ${projectName} && npm run dev`)
    spinner.stop()
  } catch (error) {
    err(error)
    spinner.stop()
  }
}
