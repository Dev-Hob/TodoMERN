const mongoose = require("mongoose")

const ToDoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    uid: {type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true, },
    delete: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now() / 1000}
})

const Todo = mongoose.model("ToDo", ToDoSchema);
module.exports = Todo;