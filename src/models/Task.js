const database = require('../config/database');

const TaskSchema = new database.Schema({
    title: {
        type: String,
        required: true
    },
    project:{
        type: database.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    done:{
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    finishedAt: {
        type: Date
    }
  });

const Task = database.model('Task', TaskSchema);
module.exports = Task;