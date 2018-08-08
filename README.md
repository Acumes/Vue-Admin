
# About

此项目是 vue + element-ui 构建的后台管理系统，是后台项目[springboot-security-jwt](https://github.com/Acumes/spring-security-jwt) 的管理系统，数据都是从服务器实时获取的真实数据(首页假数据)，具有真实的登陆、管理数据、权限验证（后补）等功能。



>   [后台系统地址](https://github.com/Acumes/spring-security-jwt) 



## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + less + element-ui


## 项目运行


```
git clone https://github.com/bailicangdu/vue2-manage  

cd vue2-manage  

npm install 或 yarn(推荐)

npm run dev (访问线上后台系统)

npm run local (访问本地后台系统，需运行node-elm后台系统)


访问: http://localhost:8002

```

- 打包部署Nginx
<br/>
<img src="https://github.com/Acumes/img/blob/master/8_08/nginx1.png"/>
<img src="https://github.com/Acumes/img/blob/master/8_08/nginx2.png"/>

<br/>
<br/>
```
在项目中运行 ： npm run build


server {
	#监听80端口，80端口是知名端口号，用于HTTP协议
	listen       8083;
	server_name  localhost;
	#反向代理的路径（和upstream绑定），location 后面设置映射的路径
	location / {
		#root   G:/study/vue/vue2-manage-platform/dist;
		root   I:/git/Vue-Admin/dist;
		index  index.html index.htm;
	} 

	#静态文件，nginx自己处理
	location ~ ^/(images|javascript|js|css|flash|media|static|control|doc|img)/ {
		root I:/git/Vue-Admin/dist;
		#过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
		expires 30d;
	}
	
	

	
	#错误处理页面（可选择性配置）
	#error_page   404              /404.html;
	#error_page   500 502 503 504  /50x.html;
	#location = /50x.html {
	#    root   html;
	#}
}

访问: http://localhost:8083

```
<br/>
<br/>
- 配置到后端启动：
<br/>
```
在项目中运行 ： npm run build

将dist目录下的文件放入


访问: http://localhost:8082

```
<br/>
- vue-admin
<img src="https://github.com/Acumes/img/blob/master/8_08/vue-build.png"/>
- springboot 
<img src="https://github.com/Acumes/img/blob/master/8_08/springboot1.png"/>

# 功能列表

- [x] 登陆/注销 -- 完成 
- [x] 管理用户 -- 完成


## 部分截图


<img src="https://github.com/Acumes/img/blob/master/8_08/3.png"/>
- 
<img src="https://github.com/Acumes/img/blob/master/8_08/1.png"/>
- 
<img src="https://github.com/Acumes/img/blob/master/8_08/2.png"/>


- 改自: https://github.com/bailicangdu/vue2-manage
- 具体完整可以参考上方路径补全功能
## License

[GPL](https://github.com/bailicangdu/vue2-manage/blob/master/COPYING)
