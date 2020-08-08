<!--
 * @Author: yxh
 * @Date: 2020-08-02 23:15:50
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-08 21:28:16
 * @Description: 
-->
配置别名
```git config --global alias.ci commit``` [commit的别名就为ci]   
克隆远程仓库并自定义本地仓库名字  
```git clone https://github.com/libgit2/libgit2  mylibgit```  
本地项目与远程项目进行关联  
```git remote add origin git@github.com:FrontDream/FrontDream.github.io.git```
## git常用命令
1. 查看工作区与暂存区的状态

    git status -s -s(是--short的简称) 一种更直观简单的输出
```
git status -s
M README            修改过的文件
MM Rakefile         暂存后又做了修改
A lib/git.rb        新添加到暂存区
M lib/simplegit.rb  修改过并已暂存
?? LICENSE.txt      未跟踪的文件
```
2. 查看工作区与暂存区差异  
git diff
3. 跳过暂存区直接提交   
git commit -a -m "message"  或者简写为 git commit -am "message"