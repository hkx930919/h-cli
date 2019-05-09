const inquirer = require('inquirer')
const fs = require('fs-extra')
const { join } = require('path')
const ora = require('ora')
const { success, err, writeHkxConfig } = require('../util/tool')
const { __SRC_PATH, __PAGE_PATH } = require('../util/path')

/**
 * 询问页面
 */
async function getPageName(pageName) {
  const { _pageName } = await inquirer.prompt([
    {
      type: 'input',
      name: '_pageName',
      message: pageName ? `${pageName}已存在，请重新输入：` : `请输入新页面的名称：`,
      validate(val) {
        if (val === '') {
          return '页面不能为空！'
        } else if (existPage(val)) {
          return `${val} 页面已存在！`
        } else {
          return true
        }
      }
    }
  ])
  return _pageName
}
function existPage(pagename) {
  return fs.pathExistsSync(join(__SRC_PATH, pagename))
}
function copyHtml(pagename) {
  try {
    let html = fs.readFileSync(join(__dirname, '../example.html'), 'utf-8')
    html = html.replace(/<title>([\s\S]*)<\/title>/, `<title>${pagename}<\/title>`)
    fs.writeFileSync(join(__PAGE_PATH, `${pagename}.html`), html)
  } catch (error) {}
}
module.exports = async () => {
  let pageName = process.argv[3]
  if (!pageName || existPage(pageName)) {
    pageName = await getPageName(pageName)
  }
  const spinner = ora('正在创建...')
  spinner.start()
  try {
    const src = join(__dirname, '../example')
    const dest = join(__SRC_PATH, pageName)
    // 复制文件
    fs.copySync(src, dest)
    // 修改config
    writeHkxConfig(pageName)
    copyHtml(pageName)
    spinner.stop()
    success(`\n ${pageName}页面创建成功`)
  } catch (error) {
    spinner.stop()
    err(error)
  }
}
