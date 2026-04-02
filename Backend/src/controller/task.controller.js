const Task = require('../model/task.model')

async function createTask (req, res) {
  const { title, description, dueDate } = req.body

  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }
  const task = await Task.create({
    title,
    description,
    dueDate,
    createdBy: req.user.id
  })
  res.status(201).json(task)
}
async function getTasks (req, res) {
  try {
    const userId = req.user.id
    const { status, page = 1, limit = 5, search } = req.query
    let filter = { createdBy: userId }
    if (status) {
      filter.status = status
    }
    const skip = (page - 1) * limit
    if (search) {
      filter.title = { $regex: search, $options: 'i' }
    }
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    const totalTasks = await Task.countDocuments(filter)
    res.status(200).json({
      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
      tasks
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching tasks' })
  }
}
async function updateTaskStatus (req, res) {
  try {
    const { id } = req.params
    const task = await Task.findOne({
      _id: id,
      createdBy: req.user.id
    })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    task.status = task.status === 'pending' ? 'completed' : 'pending'
    await task.save()
    res.status(200).json({
      message: 'Task status updated',
      task
    })
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' })
  }
}
async function deleteTask (req, res) {
  try {
    const { id } = req.params

    const task = await Task.findOneAndDelete({
      _id: id,
      createdBy: req.user.id
    })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' })
  }
}
async function getTodayTask (req, res) {
  try {
    const userId = req.user.id
    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const end = new Date()
    end.setHours(23, 59, 59, 999)
    const tasks = await Task.find({
      createdBy: userId,
      dueDate: { $gte: start, $lte: end }
    })

    res.status(200).json(tasks)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching today tasks' })
  }
}
async function getUpcomingTasks (req, res) {
  try {
    const userId = req.user.id
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const next7days = new Date()
    next7days.setDate(today.getDate() + 7)
    const tasks = await Task.find({
      createdBy: userId,
      dueDate: {
        $gte: today,
        $lte: next7days
      }
    }).sort({ dueDate: 1 })
    res.status(200).json(tasks)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching upcoming tasks' })
  }
}
async function getDashboard (req, res) {
  const userId = req.user.id

  const totalTasks = await Task.countDocuments({
    createdBy: userId
  })
  const completedTasks = await Task.countDocuments({
    createdBy: userId,
    status: 'complete'
  })
  const pendingTasks = await Task.countDocuments({
    createdBy: userId,
    status: 'pending'
  })
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  const end = new Date()
  end.setHours(23, 59, 59, 999)
  const todayTasks = await Task.countDocuments({
    createdBy: userId,
    dueDate: { $gte: start, $lte: end }
  })
  const next7days = new Date()
  next7days.setDate(start.getDate() + 7)

  const upcomingTasks = await Task.countDocuments({
    createdBy: userId,
    dueDate: { $gte: start, $lte: next7days }
  })
  res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      todayTasks,
      upcomingTasks
    });
}
module.exports = {
  getTasks,
  updateTaskStatus,
  createTask,
  deleteTask,
  getTodayTask,
  getUpcomingTasks,
  getDashboard
}
