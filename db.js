const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId; // importing object id from mongoose


const User = new Schema({
    email: {type: String, unique:true},//i.e you cant insert twice the same entry in database, if you are sending from the nodejs code
    password: String,
    name: String
})

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

//data model

const UserModel = mongoose.model('users',User);
//(which collection i want to put into(here users),Schema for my model )
const TodoModel = mongoose.model('todos', Todo);



//exporting an object
module.exports = {
    UserModel: UserModel, //first key
    TodoModel: TodoModel //second key
}