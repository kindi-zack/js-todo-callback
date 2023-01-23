const Model = require('../models/model')
const View = require('../views/view')

class Controller {
    static list() {
        Model.list((err, data) => {
            if(err) {
                View.showErr(err)
            }else{
                View.list(data)
            }
        })
    }

    static addTodo(todo) {
        Model.addTodo(todo, (err, data) => {
            if(err) {
                View.showErr(err)
            }else {
                View.addTodo(data)
            }
        })
    }

    static editTodo(inputs) {
        Model.editTodo(inputs, (err, dataEdit) => {
            if(err) {
                View.showErr(err)
            }else {
                View.editTodo(dataEdit)
            }
        })
    }

    static findById(id) {
        Model.findById(id, (err, data) => {
            if(err) {
                View.showErr(err)
            }else {
                View.findById(data)
            }
        })
    }

    static deltTodo(id) {
        Model.deltTodo(id, (err, data) => {
            if(err) {
                View.showErr(err)
            }else {
                View.deltTodo(data)
            }
        })
    }
}

module.exports = Controller