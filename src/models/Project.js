const database = require('../config/database');

const ProjectSchema = new database.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: database.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tasks: [{
        type: database.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdAt: { 
        type: Date,
        default: Date.now
    }
  });

  
  const Project = database.model('Project', ProjectSchema);
  module.exports = Project;