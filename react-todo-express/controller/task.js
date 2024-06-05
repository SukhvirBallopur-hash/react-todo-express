const TaskModel = require('../model/task')
// Create and Save a new task
exports.create = async (req, res) => {
    if (!req.body.taskName) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const task = new TaskModel({
        taskName: req.body.taskName,
        userName: req.body.userName,
        userId: req.body.userId,
        taskDescription: req.body.taskDescription,
        taskStartingTime: req.body.taskStartingTime
    });
    
    await task.save().then(data => {
        res.send({
            message:"Task Added successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating task"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const task = await TaskModel.find();
        res.status(200).json(task);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await TaskModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a task by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await TaskModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Task not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a task with the specified id in the request
exports.destroy = async (req, res) => {
    await TaskModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};