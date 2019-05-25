> A Vue.js project for pos

# First

``` 

## enter the POS directory
cd POS

## install dependencies
npm install

## serve with hot reload at localhost:8080
npm run dev

```


## 技术栈为：Vue,Vue-Router,axios,scss,node-express

## 使用到的组件库：Element-ui

## 使用到的图标库：阿里的iconfont

## 检查本地node接口：Postman

## 使用到的一个非常好看的动画库是：vue-lottie(官网网址：https://lottiefiles.com/)感觉自己发现新大陆！！！

## mock数据通过https://www.easy-mock.com/（您也可以启动Node-API下的server.js服务，本地mock数据）




# 开发中遇到的坑:

```
    -  给pos-left栏设置样式！因为pos栏使用的是<el-col>是个虚拟DOM，需要通过在构造器里使用js修改VDOM的样式,也可以通过.el-col选择器选择。


    -  如果是本地的数据，也就是前端的静态数据。v-bind='src'可以通过URL来访问图片地址，但是使用绝对路径和相对路径都不能加载出来图片，原因是我们的资源会经过webpack的loader处理，变成处理好的资源，只能通过require引用进来,eg:foodImg:require("@/assets/foodImages/2.jpg")


    -  打包上线npm run build发现网页404，原因一：config/index.js的build属性下的assetsPublicPath: './'需要设置为相对路径，原因二：@/router/index.js的mode:'history', 配置history模式需要和后端很好的配合才好使用。


    -  在scss配置loader的时候忘记在webpack.base.conf.js配置相应的loader规则，导致使用scss报错（需要学习webpack）


    -  element-ui的table的show-summary求和不会求总和(即总数量*总价格)，解决方法是使用:summary-method方法自定义求和的方法(传入绑定的方法中的参数是params对象，解构{columns,data}=params出来，columns是包含prop列名的数组，data是传入table的数据二维数组)


    -  :summary-method又踩坑了，由于没有判断tableData数组是否存在值才进行求和求积运算，所以报错了，可恶~！官方给出的方法是Number转化每一列单的每一项，然后通过every(isNaN(item))判断是否存在数值，然而我想简单点，直接使用every遍历typeof item==='number'，又报错？？？我发现，如果数组是空数组，every会想当然的觉得自己遍历完了每一项，然后默认返回true，这时就需要some了，some会很努力的去遍历每一项，直到发现符合自己条件的才放弃。

```
