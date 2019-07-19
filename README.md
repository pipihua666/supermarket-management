> A Vue.js project for Supermarket Management System

> 此作品仅供参考，如果喜欢，请点一下❤❤ Thanks

![Image text](https://github.com/PipiHua/Supermarket_Management_System/blob/master/POS/src/assets/images/login.png)

![Image text](https://github.com/PipiHua/Supermarket_Management_System/blob/master/POS/src/assets/images/loginSuccess.png)

![Image text](https://github.com/PipiHua/Supermarket_Management_System/blob/master/POS/src/assets/images/pos.png)

![Image text](https://github.com/PipiHua/Supermarket_Management_System/blob/master/POS/src/assets/images/goods.png)

# First 

``` 

    ** enter the POS directory
    cd POS

    ** install dependencies
    npm install

    ** serve with hot reload at localhost:8080
    npm run dev


```

# Second

```

    ** enter the Node-API directory
    cd Node-API

    **install the api dependencies
    npm install

    **server will listen to localhost:3001
    node app.js

```

# Finally

```

    ** import SQL into your MySQL database

```


> OKay,here we go!


```

    ** 技术栈为：Vue,Vue-Router,axios,scss,node-express,mysql

    ** 使用到的组件库：Element-ui

    ** 使用到的图标库：阿里的iconfont

    ** 检查本地node接口：Postman

    ** 有时mock数据通过https://www.easy-mock.com/

```

# 开发中学习到的经验:

```

    ** vue:
        1. 打包上线npm run build发现网页404，原因一：config/index.js的build属性下的assetsPublicPath: './'需要设置为相对路径，原因二：@/router/index.js的mode:'history', 配置history模式需要和后端很好的配合才好使用
        2. 使用vue-router的全局导航守卫需要放在vue实例挂载之前才能使用，要小心使用next(),需要使用之后路由才能resolve

    ** mysql：
        1. Client does not support authentication protocol requested by server; conside
        2.. 默认sql不能直接执行多条语句，需要为sql模型添加mutipleStatements:true

    ** node:
        1. axios中get方法传递的params使用express的query才能接收到，data需要body接受，传递:id这样的参数才需要params接收
        2. 解决了axios传递params数组,
        3. Cannot set headers after they are sent to the client（返回多个响应报的错误）
        需求是：结账的时候将pos单里的商品更新其在数据库里的数量，数量等于减去pos单的数量
        解决方案是：
        4. 关于路由有设置sql语句的问题：
          mysql查询是异步的，在执行完任务栈里的任务才会执行异步任务，如果有多个查询出来的结果，将结果放在一个数组里面，然后将响应在最后一个查询返回,不然会返回undefined

    ** element-ui：
        1. 给pos-left栏设置样式！
            1.1：通过在构造器里使用js进行更改
            1.2:通过审查元素的class控制元素的样式，注意不能使用scoped
            1.3：在需要修改样式的顶层容器加上 /deep/
        2. element-ui的table的show-summary求和不会求总和(即总数量*总价格)，解决方法是使用:summary-method方法自定义求和的方法(传入绑定的方法中的参数是params对象，解构{columns,data}=params出来，columns是包含prop列名的数组，data是传入table的数据二维数组)
        3. :summary-method又踩坑了，由于没有判断tableData数组是否存在值才进行求和求积运算，所以报错了，可恶~！官方给出的方法是Number转化每一列单的每一项，然后通过every(isNaN(item))判断是否存在数值，然而我想简单点，直接使用every遍历typeof item==='number'，又报错？？？我发现，如果数组是空数组，every会想当然的觉得自己遍历完了每一项，然后默认返回true，这时就需要some了，some会很努力的去遍历每一项，直到发现符合自己条件的才放弃;
        4. goods页面点击编辑按钮将一行的数据传入dialog：使用作用域slot传递scope.row属性
        5. goods页面点击删除按钮显示el-popover，再确认是否删除数据，但是el-popover只会挂载到一个button上,怎么让多个button挂载一个popover？？？
        6. 向<el-date-picker>传值的时候默认格式为：2017-10-01，中间不能加空格，不然picker不会显示出来哦!
    
    ** webpack:
        1. 如果是本地的数据，也就是前端的静态数据。v-bind='src'可以通过URL来访问图片地址，但是使用绝对路径和相对路径都不能加载出来图片，原因是我们的资源会经过webpack的loader处理，变成处理好的资源，只能通过require引用进来,eg:foodImg:require("@/assets/foodImages/2.jpg")
        2. 在scss配置loader的时候忘记在webpack.base.conf.js配置相应的loader规则，导致使用scss报错（需要学习webpack）

    **updating:

        1.通过设置cookie和session，加上vue-router提供的导航守卫配合路由重定向，实现登陆页面的设置：
            1.1 如果没有登陆则重定向到登陆页面，如果登陆了则可以之间访问网页.
            1.2 相应的文件(/build/utils.js封装自己的cookie函数，@/components/common/login.vue设置登陆组件,@router/login这是导航守卫)


```

# 还需要完善的需求：
```

    1. 完善goods页面添加商品的图片添加和更换图片的功能,

    2.完善user页面系统登录功能，实现如果没有登陆则不能进入goods和pos页面,

    3.完善goods页面分页功能(有些页面会有bug，比如说两条/页或者四条/页出现的bug),

    4.完善help页面客服功能，使用Web Sockets实现聊天功能,

    5.加油！

```
