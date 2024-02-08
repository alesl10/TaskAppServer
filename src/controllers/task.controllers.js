import Task from '../models/task.js'
import User from '../models/user.js'

// crear nota
export const create = async (req, res) => {
    const user = req.user
    // const { username } = await User.findById()
    // console.log(username)
    const { task, title } = req.body
    const newTask = {
        title: title,
        task: task,
        user: user.id
    }

    await Task.create(newTask)

    res.send(newTask)
}

// pbtener notas
export const getTasks = async (req, res) => {
    
    const tasks = await Task.find({ user: req.user.id })

    res.send(tasks)
}

// obtener nota
export const getTask = async (req, res) => {
    const id = req.params.id
    const task = await Task.findOne({_id:id})

    res.send(task)
}

// borrar nota
export const deleteTask = async (req, res) => {
    const id = req.params.id
    const task = await Task.deleteOne({_id:id})

    res.send({status:'success', message:'su tarea fue borrada'})
}

export const deleteTasks = async (req, res) => {

    await Task.deleteMany({ user: req.user.id })

    res.send({status:'success', message:'su tarea fue borrada'})
}

// actualizar nota
export const updateTask = async (req, res) => {
    const id = req.params.id
    const task = await Task.findByIdAndUpdate({_id:id}, req.body, {new: true})

    res.send(task)
}


