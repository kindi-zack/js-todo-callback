const fs = require('fs')

class Todo {
    constructor(id, todo, complete, createdAt) {
        this.id = +id
        this.todo = todo
        this.complete = complete || "❌"
        this.createdAt = createdAt || new Date()
    }
}

class Model {
    static list(cb) {
        fs.readFile('./data.json', 'utf8', (err, data) => {
            if(err) {
                cb(err)
            }else {
                data = JSON.parse(data)
                data = data.map(el => {
                    return new Todo(el.id, el.todo, el.complete, el.createdAt)
                })

                cb(null, data)
            }
        })
    }

    static writeToDb(data, cb) {

        data = JSON.stringify(data, null, 2)
        fs.writeFile('./data.json', data, (err, res) => {
            if(err) {
                cb(err)
            }else {
               cb(null)
            }
        })

    }

    static addTodo(todo, cb) {
        if(!todo) {
            cb('Masukkan Input')
        }else {

            // let instTodo = new Todo(id, todo)

            this.list((err, data) => {
                if(err) {
                    cb(err)
                }else {
                    let id = data.length === 0 ? 1: data[data.length - 1].id + 1 
                    let instTodo = new Todo(id, todo)
                    data.push(instTodo)

                    this.writeToDb(data, (err, res) => {
                        if(err) {
                            cb(err)
                        }else {
                            cb(null, instTodo)
                        }
                    })
                    
                }
            })
        }
    }

    static findById(id, cb) {
        let findingData;

        this.list((err, dataJson) => {
            if(err) {
                cb(err)
            }else {
                dataJson.map(item => {
                    if(item.id == id) findingData = item
                })
                if(!findingData) {
                    cb('Todo dengan id '+id+' tidak ditemukan')
                }else {
                    cb(null, findingData)
                }
            }
        })
    }

    static editTodo(inputs, cb) {
       //ginama kalau id bukan number
        let [id, todo] = inputs
        if(!id || !todo) {
            return cb('Invalid Input : index <id:Number> <todo:String>')
        }
        
        this.list((err, dataJson) => {
            if(err) {
                cb(err)
            }else {
                let newTodo;
                
                this.list((err, dataJson) => {
                    dataJson = dataJson.map(item => {
                                    if(item.id == id) {
                                        newTodo = item
                                        return new Todo(id, todo)
                                    }else {
                                        return item
                                    }
                                })

                    if(!newTodo) return cb(`id ${id} tidak ditemukan`)                
                
                    this.writeToDb(dataJson, (err, res) => {
                        if(err) {
                            cb(err)
                        }
                    })
                    cb(null, newTodo)  
                })         
            }
        })
    }

    static deltTodo(id,cb) {
        this.list((err, data) => {
            if(err) {
                cb(err)
            }else {
                let deltItem;
                let newData = []
                
                data.map(item => {
                    if(item.id != id) {
                        newData.push(item)
                    }else {
                        deltItem = item
                    }
                })

                if(!deltItem) return cb(`id ${id} tidak ditemukan !!`)

                this.writeToDb(newData, (err, res) => {
                    if(err) {
                        cb(err)
                    }else {
                        cb(null, deltItem)
                    }
                })

                // cb(null, newData)
            }
        })
    }
}

module.exports = Model