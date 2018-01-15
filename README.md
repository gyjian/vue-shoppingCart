# vue-shoppingCart
技术栈： vue2.0+axios+json-server

由于axios没有jsonp,所以数据要放在模拟服务器（这里用的是json-server）上

#请先确保安装了npm#

# 安装 json-server

$ npm install json-server  --save

在package.json里的"scripts"添加：

"server": "json-server cartData.json",

#demo根目录运行json-server#

$ npm run server

浏览器打开cart.html
