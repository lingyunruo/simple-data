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
    name: 'abggg'
});
data.set({
    name: 'abcaa'
});
data.set({
    name: 'abjjjc'
});