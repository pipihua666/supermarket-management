# vue-x

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

``` 
    ## 首个vue实战项目:POS管理系统（可以是超市，餐厅等等的Pos系统，O(∩_∩)O哈哈~）
    ## 技术栈为：Vue,Vue-Router,axios,Scss
    ## 使用到的组件库：Element-ui
    ## 目前通过’https://www.easy-mock.com/‘来mock数据，后期还可以完善通过express.js制作简单的API以供本地调用
    > 目前遇到的坑： 
    1. 绑定了的:src可以通过URL来访问图片地址，一开始使用绝对路径和相对路径都不能加载出来图片，由于我们的资源会经过webpack的loader处理，变成处理好的资源，只能通过require引用进来,eg:foodImg:require("@/assets/foodImages/2.jpg")
```