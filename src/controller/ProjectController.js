const routes = require('express').Router();
const _ = require('lodash');
const Project = require('../models/Project');
const Task = require('../models/Task');
routes.use('/project', routes);

routes.get('/', async (req, res) => {
    try {
        const projects = await Project.find({user: req.userId}).populate('tasks');

        return res.send({projects})
    } catch (error) {
        console.log('error: ', error)
        return res.status(409).send({ error: 'Error list projects.'})
    }
});

routes.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('tasks');

        return res.send({project})
    } catch (error) {
        console.log('error: ', error)
        return res.status(409).send({ error: 'Error searching project.'})
    }
});

routes.post('/', async (req, res) => {
    const {title, tasks} = req.body;
    try {
        const project = await Project.create({ title, user: req.userId});
        
        await Promise.all(
            tasks && tasks.map(async task => {
                const tempTask = new Task({...task, project: project._id});
                await tempTask.save();
                project.tasks.push(tempTask);
            })
        );
        await project.save();

        return res.send({project})
    } catch (error) {
        console.log('error: ', error)
        return res.status(409).send({ error: 'Error creating new project.'})
    }
});

routes.put('/:projectId', async (req, res) => {
    const {title, tasks, deleteTasks} = req.body;
    console.log(">>>>>>>>> tasks", tasks);
    try {
        const project = await Project.findByIdAndUpdate(req.params.projectId, { 
            title
        }, {new : true});
        
        //project.tasks = [];
        //await Task.remove({project: project._id});
        await Promise.all(
            deleteTasks.map(async delTaskId => {
                await Task.findByIdAndRemove(delTaskId);
                await project.tasks.remove(delTaskId)
            })
        );

        await Promise.all(
            tasks.map(async task => {
                if (task._id){
                    const updatedTask = await Task.findByIdAndUpdate(task._id, {
                        title: task.title,
                        done: task.done,
                        finishedAt: task.done && !task.finishedAt ? 
                                    new Date() : 
                                    task.done ? task.finishedAt : null
                    }, {new : true});
                    await updatedTask.save()
                    const indexTask = _.findIndex(project.tasks, ["_id", task._id]);
                    project.tasks[indexTask] = updatedTask;
                    
                } else {
                    const newTask = new Task({...task, project: project._id});
                    await newTask.save();
                    project.tasks.push(newTask);
                }
            })
        );
        await project.save();

        return res.send({project: await Project.findById(req.params.projectId).populate('tasks')})
    } catch (error) {
        console.log('error: ', error)
        return res.status(409).send({ error: 'Error updating project.'})
    }
});

routes.delete('/:projectId', async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId);
        await Task.remove({project: req.params.projectId});
        return res.send();
    } catch (error) {
        console.log('error: ', error)
        return res.status(409).send({ error: 'Error delete project.'})
    }
});

// routes.delete('/:projectId/:taskId', async (req, res) => {
//     try {
//         await Project.findByIdAndRemove(req.params.projectId);
//         return res.send();
//     } catch (error) {
//         console.log('error: ', error)
//         return res.status(409).send({ error: 'Error delete project.'})
//     }
// });

module.exports = routes;