const inquirer = require('inquirer')
const fs = require('fs-extra')
const { join } = require('path')
const ora = require('ora')
const { shell } = require('execa')
const CWD = process.cwd()
const { success, err, installDep, normalizeEntry } = require('../util/tool')
const { GIT_VUE_PAHT, __HKX_CONFIG, __SRC_PATH } = require('../util/path')
const { entry } = require(__HKX_CONFIG)
/**
 * 询问路由名称
 * @param {String} page         页面名称
 * @param {String} routeName    路由名称
 */
async function getRouteName(page, routeName) {
  const { _routeName } = await inquirer.prompt([
    {
      type: 'input',
      name: '_routeName',
      message: routeName ? `${routeName}路由已存在，请输入新的路由` : '你想创建的路由名称：',
      validate(val) {
        if (val === '') {
          return '请输入路由名称！'
        } else if (existRoute(page, routeName)) {
          return `${routeName}路由已存在,请重新输入`
        } else {
          return true
        }
      }
    }
  ])
  return _routeName
}
/**
 * 询问页面
 */
async function getPageName() {
  const { _pageName } = await inquirer.prompt([
    {
      type: 'input',
      name: '_pageName',
      message: '你想为哪个页面创建路由：',
      validate(val) {
        if (val === '') {
          return '页面不能为空！'
        } else if (!fs.pathExistsSync(join(__SRC_PATH, val))) {
          return `${val} 页面不存在！`
        } else {
          return true
        }
      }
    }
  ])
  return _pageName
}
function existRoute(page, route) {
  return !!fs.pathExistsSync(join(__SRC_PATH, page, 'views', route))
}
/**
 * 询问确认在这页面创建路由
 * @param {String} pageName
 */
async function questionAgain(pageName) {
  const { _pageName } = await inquirer.prompt([
    {
      type: 'input',
      name: '_pageName',
      message: `即将为${pageName}创建路由，你可以再次修改`,
      default: pageName,
      validate(val) {
        if (!val) {
          return '页面不能为空！'
        } else if (!fs.pathExistsSync(join(__SRC_PATH, val))) {
          return `${val} 页面不存在！`
        } else {
          return true
        }
      }
    }
  ])
  return _pageName
}
module.exports = async () => {
  let routeName = process.argv[3] || ''
  let pageName = process.argv[4] || normalizeEntry(entry)

  if (!pageName) {
    pageName = await getPageName()
  }
  if (!routeName || existRoute(pageName, routeName)) {
    routeName = await getRouteName(pageName, routeName)
  }

  pageName = await questionAgain(pageName)
  /** 拿到页面名称和路由名称 **/
  const spinner = ora('正在创建路由...')
  spinner.start()
  try {
    const routeRgx = /routes:\s*\[([\s\S]*)\]/
    let routeInfo = fs.readFileSync(join(__SRC_PATH, pageName, 'router', 'index.js'), {
      encoding: 'utf-8'
    })
    routeInfo = routeInfo.replace(routeRgx, (match, $1) => {
      const flag = $1.trim().endsWith(',')
      return `routes: [
    ${$1.trim()}${flag ? '' : ','}
    {
      path: '/${routeName}',
      name: '${routeName}',
      meta: {
        title: '${routeName}'
      },
      component: () => import(/* webpackChunkName: "${pageName}/route.${routeName}" */'../views/${routeName}')
    }
  ]`
    })
    fs.writeFileSync(join(__SRC_PATH, pageName, 'router', 'index.js'), routeInfo)
    fs.copySync(
      join(__dirname, '..', 'example', 'views', 'index'),
      join(__SRC_PATH, pageName, 'views', routeName)
    )
    spinner.stop()
    success('\n 路由创建成功')
  } catch (error) {
    spinner.stop()
    err(error)
  }
}
