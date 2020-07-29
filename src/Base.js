const path = require('path');
const fs = require('fs-extra');
class Base {
    constructor(option) {
        // 每个base对应一个 json文件
        this.path = option.jsonFile;
        this.basePath = option.basePath;
        this.encoding = option.encoding || 'utf-8';
        this.filePath = path.join(this.basePath, this.path);
        this.data = {};
        this.setTimer = null;

        try {
            fs.accessSync(this.filePath, fs.constants.W_OK | fs.constants.R_OK)
            this.readFileData();
        }
        catch(e) {
            this.createData();
        }
    }

    createData() {
        fs.outputFileSync(this.filePath, JSON.stringify({}))
    }

    readFileData() {
        let content = '';
        
        try {
            content = fs.readFileSync(this.filePath, {
                encoding: this.encoding
            })
        }
        catch(e) {
            console.log('READ JSON Error: ', e);
        }

        try {
            let jsonData = null;

            if(content) {
                jsonData = JSON.parse(content);
            }
            else {
                jsonData = {}
            }
            Object.assign(this.data, jsonData);
        }
        catch(e) {
            console.log('PARSE JSON Error ', e);
        }
    }

    delete(key) {
        let result = {success: true};

        if(typeof key === 'string') {
            if(key in this.data) {
                delete this.data[key];
            }
        }
        else if(Object.prototype.toString.call(key) === '[object Array]') {
            key.forEach((delKey) => {
                if(key in this.data) {
                    delete this.data[delKey];
                }
            });
        }
        else {
            this.data = {};
        }

        this.set(this.data);

        return Promise.resolve(result);
    }

    get(key) {
        return new Promise((resolve, reject) => {
            let returnData = {};
            
            if(typeof key === 'string' && key in this.data) {
                returnData = this.data[key];
            }
            else if(Object.prototype.toString.call(key) === '[object Array]') {
                key.forEach((returnKey) => {
                    if(returnKey in this.data) {
                        returnData[returnKey] = this.data[returnKey];
                    }
                });
            }
            else {
                returnData = this.data;
            }

            resolve(returnData);
        });   
    }

    set(obj) {
        Object.keys(obj).forEach((key) => {
            this.data[key] = obj[key]
        });
        return new Promise((resolve, reject) => {
            clearTimeout(this.setTimer);
            this.setTimer = setTimeout(() => {
                this.writeFileData(resolve, reject);
            }, 100);
        });
    }

    writeFileData(resolve, reject) {
        fs.outputFile(this.filePath, JSON.stringify(this.data, null, '\t'), {
            encoding: this.encoding
        }, (err) => {
            if(err) {
                reject(err)
            }
            else {
                resolve(this.data);
            }
        });
    }
}


module.exports = Base;