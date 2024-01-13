# gitlab远程仓库地址修改后替换命令
> 1、通过 <code>git remote -v</code> 查看当前拉取远程仓库地址
```js
git remote -v
origin http://xxxxx.git (fetch)
origin http://xxxxx.git (push)
```

> 2、重命名标签
```js
git remote rename origin old-origin
```

> 3、添加新标签
```js
git remote add origin http://xxxxx.git
```

> 4、删除旧标签
```js
git remote remove old-origin
```

> 5、重新查看标签地址
```js
git remote -v 
origin http://xxxxx.git (fetch)
origin http://xxxxx.git (push)
```

> 6、执行拉取命令验证
```js
git pull origin master
```
> 此时会提示登录，使用原有accessToken登录后 可进行正常的拉取提交操作，如原使用SSHKeys鉴权方式的，请重新生成key进行绑定

- 弹出登录的话 
- 账号是 gitlab登录名称或者邮箱
- 密码是access token 申请的那串代码