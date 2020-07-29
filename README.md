> 持久化数据，会将set的数据存储在json文件里。当实例化的时候，会根据basePath路径创建jsonFile配置的json文件。
> 数据不会加密也不会格式验证单纯序列化之后就存储了，只比fs.writeFile强一点。文件格式全部采用utf-8。真要改的话在实例话的时候传一个encoding也行。

> 使用场景是，本地开发一些小项目，需要持久化一些数据，但是又没到动用数据库的地步。

```js
const Base = require('../src/base');
const path = require('path');

const data = new Base({
    jsonFile: 'data.json',
    basePath: path.join(__dirname, './persistence')
});

data.set({
    name: 'abc',
    age: '111'
});
data.set({
    name: 'bcd',
    sex: 'jjj'
});
data.set({
    name: 'erf'
});
data.set({
    code: '980000'
});

data.delete(['name']);
data.delete(['name', 'age'])
data.delete('name');

data.set({
    department: 'nnnnnn'
})
    .then((res) => {
        console.log(res, 'set then');
    });

data.get().then((res) => {
    console.log(res, 'read all');
});
data.get(['name', 'department']).then((res) => {
    console.log(res, 'read part');
});
```