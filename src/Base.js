const path = require('path');
const fs = require('fs');

let setTimer = null;

class Base {
    constructor(option) {
        // 每个base对应一个 json文件
        this.path = option.jsonFile;
        this.basePath = option.basePath;
        this.readFileData();
        this.data = {};
        this.reading = false;
    }

    readFileData () {
        this.reading = true;
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(this.basePath, this.path), {
                encoding: 'utf8'
            }, (err, content) => {
                this.reading = false;
                if(err) {
                    reject(err);
                }
                else {
                    let jsonData = null;

                    try {
                        if(content) {
                            jsonData = JSON.parse(content);
                        }
                        else {
                            jsonData = {}
                        }
                    }
                    catch(e) {
                        reject('JSON Error', e)
                    }
                    
                    Object.assign(this.data, jsonData);
                    resolve(jsonData);
                }
            });
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            let returnData = this.data;

            if(key in this.data) {
                returnData = this.data[key];
            }
            else {
                returnData = null;
            }

            resolve(returnData);
        });   
    }

    set(obj) {
        Object.keys(obj).forEach((key) => {
            this.data[key] = obj[key]
        });
        return new Promise((resolve, reject) => {
            clearTimeout(setTimer);
            setTimer = setTimeout(() => {
                this.writeFileData(resolve, reject);
            }, 100);
        });
    }

    writeFileData(resolve, reject) {
        if(this.reading) {
            setTimeout(() => {
                this.writeFileData(resolve, reject);
            }, 300);
        }
        else {
            fs.writeFile(path.join(this.basePath, this.path), JSON.stringify(this.data, null, '\t'), (err) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve();
                }
            });
        }
    }
}


module.exports = Base;