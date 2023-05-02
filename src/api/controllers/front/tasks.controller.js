const ObjectId = require('mongoose').Types.ObjectId
const Task = require('../../models/tasks.model')

// API to create Task
exports.create = async (req, res, next) => {
    try {
        let payload = req.body

        console.log(req.body)

        if (!payload.name)
            return res.status(400).send({ success: false, message: "Task's name is required!" })

        if (!payload.description)
            return res.status(400).send({ success: false, message: 'Description is required!' })

        const task = await Task.create(payload)

        return res.status(200).send({ success: true, message: 'Task created successfully', task })

    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: 'Task could not be created!', error })
    }
}

// API to edit Task
exports.edit = async (req, res, next) => {
    try {
        let payload = req.body

        if (!payload._id)
            return res.status(400).send({ success: false, message: 'Id is required!' })

        if (!payload.name)
            return res.status(400).send({ success: false, message: 'Name is required!' })

        if (!payload.description)
            return res.status(400).send({ success: false, message: 'Description is required!' })


        const task = await Task.findByIdAndUpdate({ _id: new ObjectId(payload._id) }, { $set: payload }, { new: true })

        return res.status(200).send({ success: true, message: 'Task updated successfully', task })

    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: 'Task could not be edited!', error })
    }
}

// API to delete Task
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params
        if (id) {
            const task = await Task.deleteOne({ _id: new ObjectId(id) })
            if (task)
                return res.status(200).send({ success: true, message: 'Task deleted successfully' })

            else return res.status(400).send({ success: false, message: 'Task not found for given Id' })
        } else
            return res.status(400).send({ success: false, message: 'Task Id is required' })

    } catch (error) {
        return res.status(400).send({ success: false, message: 'Task could not be deleted!', error })
    }
}

// API to get a Task
exports.get = async (req, res, next) => {
    try {
        const { id } = req.params

        if (id) {
            const task = await Task.findOne({ _id: new ObjectId(id) }).lean(true)

            if (task)
                return res.status(200).send({ success: true, message: 'Task retrieved successfully', task })

            return res.status(400).send({ success: false, message: 'Task not found for given Id' })
        } else
            return res.status(400).send({ success: false, message: 'Task Id is required' })
    } catch (error) {
        return res.status(400).send({ success: false, message: 'Task could not be retrieved!', error })
    }
}

// API to get Task list
exports.list = async (req, res, next) => {
    try {
        let { page, limit, name, status } = req.query
        const filter = {}

        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 10

        if (name) {
            filter.name = { $regex: name, $options: 'i' }
        }

        if (status) {
            filter.status = status
        }

        const total = await Task.countDocuments(filter)
        const pages = Math.ceil(total / limit)

        if (page > pages && total > 0)
            page = pages

        const tasks = await Task.find(filter)

        return res.status(200).send({
            success: true, message: 'Tasks Fetched Successfully',
            data: {
                tasks,
                pagination: {
                    page, limit, total,
                    pages: pages <= 0 ? 1 : pages
                }
            }
        })
    } catch (error) {
        return res.status(400).send({ success: false, message: 'Some error occured while fetching tasks!', error })
    }
}