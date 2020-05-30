```js
const Base = require('../src/base');
const path = require('path');

const data = new Base({
    // 存储数据的json文件
    jsonFile: 'data.json',
    // 存储数据的根目录
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
    name: 'abggg'
});
data.set({
    name: 'abcaa'
});
data.set({
    name: 'abjjjc'
});
```