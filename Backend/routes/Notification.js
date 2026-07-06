const express = require("express");
const router = express.Router();
const Notification = require("../model/Notification");
const Task = require("../model/Task");

// GET Notifications
router.get("/:userId", async (req, res) => {

    try {

        const notifications = await Notification.find({
            userId: req.params.userId
        }).sort({ createdAt: -1 });

        res.json(notifications);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// Generate Notifications
router.post("/generate/:userId", async (req, res) => {

    try {

        const userId = req.params.userId;

        // කලින් notification delete කරනවා
        await Notification.deleteMany({ userId });

        const tasks = await Task.find({ userId });

        const notifications = [];

        const today = new Date();

        tasks.forEach(task => {

            if (!task.deadline) return;

            const deadline = new Date(task.deadline);

            const diffDays = Math.ceil(
                (deadline - today) / (1000 * 60 * 60 * 24)
            );

            // Deadline tomorrow
            if (diffDays === 1) {

                notifications.push({

                    userId,
                    type:"warning",
                    message:`${task.taskName} deadline is tomorrow.`

                });

            }

            // Deadline today
            if (diffDays === 0) {

               notifications.push({

                    userId,
                    type:"info",
                    message:`${task.taskName} deadline is today.`

                });

            }

            // Deadline missed
            if (diffDays < 0 && task.status !== "Completed") {

                notifications.push({

                    userId,
                    type:"danger",
                    message:`You missed the deadline for ${task.taskName}.`

                });

            }

        });

        if (notifications.length > 0) {

            await Notification.insertMany(notifications);

        }

        res.json({
            message: "Notifications Generated"
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.put("/read/:userId", async (req, res) => {

    try {

        await Notification.updateMany(

            {
                userId: req.params.userId,
                read: false
            },

            {
                read: true
            }

        );

        res.json({
            message: "Notifications marked as read"
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;