
//get all todos for user
// get todo using id
// create todo for user
// update todo
// delete todo

const { default: mongoose } = require("mongoose");
const Todo = require("../models/ToDo.models");
const createError = require("../utils/error");
const ObjectId = require("mongoose").Types.ObjectId;


const getAllTodo = async(req, res, next) => {
    console.log("Get all todo called")
    const {uid} = req.user;
    Todo.find({uid, delete: false}, {uid: 0}).then( todos => {
        res.status(200).json({todos, success: true})})        
        .catch(err => {
           return next(err)
    })
}

const getAllTodoDone = async(req, res, next) => {
    const {uid} = req.user;
    Todo.find({uid, delete: true}, {uid: 0}).then( async todos => {
        res.status(200).json({todos, success: true})})        
        .catch(err => {
           return next(err)
    })
}



const getTodo = async (req, res, next) => {
    const { uid } = req.user;
    const { _id: id } = req.params;
    if (!id) return next(createError(400, "Required Fields Missing!"))
    const _id = new ObjectId(id);
    console.log(_id)
    try {
        const todo = await Todo.findOne({_id, uid, delete: false}, {uid: 0})
        console.log(todo)
        res.status(200).json({success:true, todo})
    } catch (err) {
        next(err)
    }
}

const createTodo = async(req, res, next) => {
    const { uid } = req.user;
    const {name, description} = req.body;
    if(!name || !description) return next(createError(400, "Required Fields Missing!"))
    try {
        const todo = new Todo({name, description, uid})
        await todo.save()
        const {uid: todo_uid, ...todoData} = todo._doc;
        res.status(200).json({success: true, todo: todoData})        
    } catch (err) {
        next(err)
    }
}

const updateTodo = async (req, res, next) => {
    const { _id: id, ...updatedData } = req.body;
    const { uid } = req.user;
    if (!id) return next(createError(400, "Required fields are Missing!")) 
    const _id = new ObjectId(id);
    try {
        const todo = await Todo.findOneAndUpdate({uid, _id}, updatedData, {new: true})
        console.log(todo)
        res.status(200).json({success: true, message: `${todo.name} Successfully updated!`})
    } catch (err) {
        next(err)
    }

}

const updateMultipleTodo = async (req, res, next) => {
    const { todos } = req.body;
    const {uid} = req.user;
    const todosFieldCheck = todos.every( todo => {
        const { _id, ...otherData } = todo;
        if( !_id || !otherData ) return false;
        return true;
    })
    if(!todosFieldCheck) return next(createError(400, "Some Todos Are Missing Requried Fields!"))
    try {
        await todos.map( async todo => {
            const { _id: id, ...updateData } = todo;
            const _id = new ObjectId(id)
            await Todo.findOneAndUpdate({uid, _id}, updateData)
        })
        res.status(200).json({success: true, message: "Updated all Todos!"})
    } catch (err) {
        next(err)
    }
}

const deleteTodo = async (req, res, next) => {
    const {uid} = req.user;
    const {_id: id} = req.params;
    console.log("delte todo params : ", req.params)
    if(typeof id != "string") return next(createError(400,"Id should be string!"))
    const _id = new ObjectId(id);
    if(!_id || !uid) return next(createError(400, "Required fields are missing!"))
    try {
        await Todo.findOneAndUpdate({uid, _id}, {delete: true}, {new: true})
        res.status(200).json({success:true, message: "Successfully Deleted!"})
    } catch (err) {
        next(err)
    } 
}

module.exports = { getTodo, getAllTodo, updateMultipleTodo, updateTodo, deleteTodo, createTodo, getAllTodoDone };