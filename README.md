## 脚手架说明

> 一个 vue 多页面打包应用，默认安装 vue vue-router vuex axios vant element-ui
> vant element-ui 支持按需加载组件
> 支持 less
> 配置 eslint
> 配置按需加载 import()

**四个命令**

- hkx create 【projectname】在指定目录 projectname 创建一个新工程
- hkx init 在文件夹初始化工程
- hkx page 【pagename】 创建一个新页面
- hkx route 【route】创建一个新路由

## 安装

- npm i hkx-cli -g 安装完成后全局使用 hkx 命令
- hkx init 初始化新工程 生成一套 vue 移动端多页面项目
- hkx create [projectname] 创建新工程
- hkx page [pagename] 新建页面

```
# hkx page pagename

```

- hkx route [routename] 新建路由

```
# hkx route routename

```

## 启动项目

- 在项目中使用 npm run dev 命令

## 打包

- 使用 npm run build
- 在 hkx.config.js 中配置入口，如果为空，那么会对所有页面进行打包。如果有配置入口，按照配置入口进行打包
