const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: String, default: '' },
    status: { type: Boolean, default: false }, // false = pending, true = done
}, { timestamps: true }
);

module.exports = mongoose.model('tasks', TasksSchema);