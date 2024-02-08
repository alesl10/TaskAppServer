import Task from '../models/task.js'

// crear nota
export const create = async (req, res) => {
    const user = req.user
    
    try {
        const { task, title } = req.body
        const newTask = {
            title: title,
            task: task,
            user: user.id
        }
    
        await Task.create(newTask)
    
        res.send(newTask)
        
    } catch (error) {
        console.log(error)
    }
}

// pbtener notas
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id })
    
        res.send(tasks)
        
    } catch (error) {
        console.log(error)
    }
}

// obtener nota
export const getTask = async (req, res) => {
    const id = req.params.id
try {
    const task = await Task.findOne({_id:id})

    res.send(task)
    
} catch (error) {
    console.log(error)
}
}

// borrar nota
export const deleteTask = async (req, res) => {
    const id = req.params.id

    try {
        const task = await Task.deleteOne({_id:id})
    
        res.send({status:'success', message:'su tarea fue borrada'})
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteTasks = async (req, res) => {
try {
    await Task.deleteMany({ user: req.user.id })

    res.send({status:'success', message:'sus tareas fueron borradas'})
    
} catch (error) {
 console.log(error)   
}
}

// actualizar nota
export const updateTask = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndUpdate({_id:id}, req.body, {new: true})
    
        res.send(task)
        
    } catch (error) {
        console.log(error)
    }
}


