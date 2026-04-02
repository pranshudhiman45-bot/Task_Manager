const express = require('express')

const { authUser } = require('../middlerware/auth.middleware')

const taskController = require('../controller/task.controller')

const router = express.Router()


router.post("/", authUser, taskController.createTask);
router.get("/", authUser, taskController.getTasks);
router.patch("/:id/status", authUser, taskController.updateTaskStatus);
router.delete("/:id", authUser, taskController.deleteTask);
router.get("/today", authUser, taskController.getTodayTask);
router.get("/upcoming", authUser, taskController.getUpcomingTasks);
router.get("/dashboard", authUser, taskController.getDashboard);
module.exports = router