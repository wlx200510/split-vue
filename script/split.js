/*
 * @Author: kaoshao
 * @Date: 2018-12-15 14:38:36 
 * @Last Modified by: wanglixing
 * @Last Modified time: 2018-12-15 17:45:19
 */

const fs = require('fs')
const inquirer = require('inquirer')

const symbols = require('log-symbols')
const path = require('path')
const dayTime = require('dayjs')
const rimraf = require('rimraf')

const filePath = path.join(__dirname, '../page')
const time = dayTime().format('YYYY/MM/DD HH:mm:ss')

process.on('exit', (code) => {
 console.log(symbols.info, `运行完毕，退出状态: ${code}`);
})

const getBaseInfo = [
  {
    type: 'input',
    name: 'name',
    message: '请输入要拆分的文件名，默认是page目录下',
    validate: val => {
       if (/^[a-zA-Z]+$/.test(val)) { // 校验位数
         return true;
       }
       return "请输入英文（驼峰式）";
    }
  }, {
    type: 'input',
    name: 'email',
    message: '请输入邮箱，用于文件署名使用',
    validate: val => {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (emailReg.test(val)) {
        return true
      }
      return "请输入正确的邮箱格式"
    }
  }
]

function getPrefixStr(type, data) {
 switch(type) {
   case 'js':
     return "/**\n" +
     ` * @file ${data.name}.js\n` +
     ` * @author ${data.email}\n` +
     ` * @since ${time}\n` +
     " */\n" +
     "\n"
   case 'less':
     return "/**\n" +
     `* @file ${data.name}.less\n` +
     `* @author ${data.email}\n` +
     `* @since ${time}\n` +
     " */\n" +
     "\n"
   case 'vue':
    return "<!--\n" +
    `@file ${data.name}.vue\n` +
    `@author ${data.email}\n` +
    `@since ${time}\n` +
    "-->\n" +
    "\n"
 }
}

function main(content) {
  rimraf(`${filePath}/${content.name}`, (err) => {
    fs.mkdir(`${filePath}/${content.name}`, err => {
      if (err) {
        console.log(symbols.success, `page/${content.name} 目录创建失败`)
        process.exit(1)
      }
      console.log(symbols.success, `page/${content.name} 目录创建成功`)
      handleFile(content)
    })
  })
}

function generateJs(text, basic) {
  const jsContent = getPrefixStr('js', basic) + text
  fs.writeFile(`${filePath}/${basic.name}/${basic.name}.js`, jsContent, err => {
    if (err) {
      console.log(symbols.error, 'JS文件拆分失败')
    } else {
      console.log(symbols.success, `JS文件拆分完成`)
    }
  })
}

function generateless(text, basic) {
  const lessContent = getPrefixStr('less', basic) + text
  fs.writeFile(`${filePath}/${basic.name}/${basic.name}.less`, lessContent, err => {
    if (err) {
      console.log(symbols.error, 'Less文件拆分失败')
    } else {
      console.log(symbols.success, `Less文件拆分完成`)
    }
  })
}

function handleFile(result) {
 fs.readFile(`${filePath}/${result.name}.vue`, 'utf-8', (err, data) => {
   if (err) {
     console.log(err)
     console.log(symbols.error, 'Vue文件读取失败');
     return
   }
   var extractTemplate = data.toString().replace(/([\s\S]*)<script>([\s\S]*)<\/script>[\s\S]*?<style lang="less" scoped>([\s\S]*)<\/style>/i, (rs, $1, $2, $3) => {
     generateJs($2, result)
     generateless($3, result)
     return getPrefixStr('vue', result) + `${$1}<script src='./${result.name}.js' type="text/ecmascript-6">\n</script>\n` + 
     `<style lang="less" src='./${result.name}.less' rel="stylesheet/less" scoped>\n</style>\n`
   })
   fs.writeFile(`${filePath}/${result.name}/${result.name}.vue`, extractTemplate, err => {
     if (err) {
      console.log(symbols.error, 'Vue文件拆分失败')
      return false;
     } else {
      console.log(symbols.success, `Vue文件拆分完成`)
      process.exit(0)
     }
   })
 })
}

inquirer.prompt(getBaseInfo).then((answers) => {
 fs.access(`${filePath}/${answers.name}.vue`, err => {
   if (err) {
     console.log(symbols.error, '目标文件不存在')
     process.exit(0)
   } else {
     main(answers)
   }
 })
})