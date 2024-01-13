<!--
 * @Author: lijing
 * @Date: 2023-12-12 10:46:53
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 18:43:12
 * @Description: 
-->
# .gitignore文件配置不生效方案
# 一、问题

在上次提交代码的时候，连同node_modules、logs等一些没有必要的文件夹或文件都上传了，在.gitignore文件中都把它们加进去了，没想到不起作用，上网查阅之后才知道自己在第一次提交的时候git被跟踪了，所以再加入.gitignore后是没有作用的

# 二、解决方法

```js
git ls-files
```

> 使用此命令，可以看到被追中的文件

```js
git rm -r --cached 文件名/ -f
```

> 例如：git rm -r --cached node_modules/ -f 可以把追踪的文件去除掉

```js
git ls-files
```

> 去除掉之后，再使用这个命令查看一些，是否还存在，不存在，成功，然后再git add . 再commit 再push。

