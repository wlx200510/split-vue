## 用于拆分Vue组件的工具

> 自用，便于按照项目要求灵活拆分自己写好的单文件组件，并加上署名，在提交代码时使用，抽离出来作为一个工具自己维护

使用方法：

```shell
npm run split
```

先把要拆分的`Vue`单文件放到`page`目录下，运行`split`命令后按照提示输入内容，就可以在`page`目录下生成一个与文件名相同的文件夹，里面包含拆分好的文件。
`hello.vue`是个文件样例，一定要按照样例写的文件才能顺利拆分。
如果之前引入组件的方式是`import hello from './hello'`，拆分后可保持这个引入方式不变。如果加入了`.vue`后缀，则需要去掉。

喜欢研究的可以看下`script`文件夹下的脚本，写自己顺手的工具。

just enjoy~~