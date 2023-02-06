# OpenAI_GPT-3_NodeJS

<hr>

# npm install and uninstall packages

```

# install package to devDependencies
npm --registry https://registry.npm.taobao.org install --save-dev XXX

# install package to dependencies
npm --registry https://registry.npm.taobao.org install XXX

# remove package from devDependencies
npm uninstall --save-dev XXX

# remove package to dependencies
npm uninstall XXX

```

<hr>
<hr>

# Add Key

Find `OPENAI_API_KEY` in the file `api-key.ts.example`, add the `api-key` manually generated in your OpenAi account. The approximate format is as follows:

```

export const OPENAI_ API_ KEY: string = "YOUR.OPENAI_API_KEY";

```

Next, copy `api-key.ts.example` to the `src` directory and rename it to `api-key.ts`

<hr>

# Description
Web front-end project based on React+Typescript can call OpenAI's GPT-3 official interface to get its answer.

<hr>

# Initialize
```
#Agent
npm --registry https://registry.npm.taobao.org install

#Agentless
npm install

```
<hr>


# Start Up

```
npm run start

# or
npm start
```

<hr>

# Home page
```
http://localhost:8083/
```
<hr>
# Notice
+ You cannot ask the same question twice, or you may return an error.
+ Try not to ask questions frequently in a short time, or you may return errors.

<hr>
<hr>

# 简介

基于 React + Typescript 的网页前端项目, 可以调用OpenAI的GPT-3官方接口,从而获取它的回答.


<hr>

# 添加密钥

找到`api-key.ts.example`内的`OPENAI_API_KEY`,加入你的OpenAi账户中自己手动生成的`api-key`,大概格式如下:

```
export const OPENAI_API_KEY: string = "YOUR.OPENAI_API_KEY";
```

接下来,把`api-key.ts.example`复制到`src`目录,并且把它重命名为`api-key.ts`.


<hr>


# 初始化

```

# 代理
npm --registry https://registry.npm.taobao.org install

# 无代理
npm install


```

<hr>


# 启动

```
npm run start

# 或者
npm start
```

<hr>

# 首页

```
http://localhost:8083/
```

<hr>

# 须知

+ 同一个问题不能提问两次,不然可能返回错误.

+ 尽量不要在短时间内频繁提问,不然也有可能返回错误.
