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