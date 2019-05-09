const chalk = require('chalk')

const success = data => {
  console.log(chalk.green(data))
}
const err = data => {
  console.log(chalk.red(data))
}
const info = data => {
  console.log(chalk.gray(data))
}

module.exports = { success, err, info }
