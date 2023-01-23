
class View {
    static showErr(err) {
        console.log("### ERROR ###")
        console.log(err)
    }

    static list(data) {
        console.log(data)
    }

    static addTodo(data) {
        let { todo:kegiatan } = data

        console.log(`todo baru dengan nama "${kegiatan}" berhasi ditambahkan`)
    }

    static editTodo(dataEdit) {
        let {id, todo} = dataEdit
        console.log("### Edit Sukses ###")
        console.log('todo dengan id '+id +`====> "${todo}" berhasil di edit`)
    }

    static findById(data) {
        console.log(data)
    }

    static deltTodo(data) {
        let { todo, id } = data
        console.log(`Berhasil Delete todo dengan id ${id} ==> "${todo}"`)
    }
}

module.exports = View