<!--
 * @Author: yxh
 * @Date: 2020-08-02 23:15:50
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-08 22:49:04
 * @Description: 
-->
配置别名
```git config --global alias.ci commit``` [commit的别名就为ci]   
克隆远程仓库并自定义本地仓库名字  
```git clone https://github.com/libgit2/libgit2  mylibgit```  
本地项目与远程项目进行关联  
```git remote add origin git@github.com:FrontDream/FrontDream.github.io.git```  
本地项目与远程项目取消关联  
```git remote remove origin```
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
4. 合并多个commit提交说明日志  
git rebase -i #哈希值   
5. 取消暂存区的文件     
git reset HEAD filename
6. 取消工作区的文件  
git checkout -- filename
7. 回退的某个commit  
git rest --soft #hash 或者 git reset --hard #hash (前者会保留commit信息,后者不会保留中间的commit信息)
8. 查看哪些分支合并到了当前分支  
git branch --merged
9. 将本地分支推送到远程分支  
git push origin local-branch:feature-branch
10. 将远程分支拉取到本地分支        
git checkout -b local-branch origin/feature-branch
11. 修改最近的commit信息        
git commit --amend
12. 本地所有分支推送到远程仓库  
git push --all origin