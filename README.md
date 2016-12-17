# quote-html package

一个简单的 atom 小插件，目的是将 html 代码转换为需要在 js 中拼接的字符串。
这个工具的想法来自 **Sublime Text** 编辑器的 **Quote HTML** 插件，可惜我没有在atom中发现类似的(2016.12.17: 最近发现已经有了)，只好自己动手了。
目前只完成了基本的功能。

v0.3.0: 在这个版本里面加入了简单字符串的单引号和双引号的转换，不过没有考虑嵌套和转义。
*****************
A short tools to quote html code to js string code in multi lines.
The idea is from Sublime Text's **Quote HTML** plugin,and I can't find
it in atom's packages(2016.12.17:Recently,I found one in atom.io).

v0.3.0: in this version I add the feature to toggle single and double quotes, but there are bugs when the string has escaped quotes and nesting quotes.
