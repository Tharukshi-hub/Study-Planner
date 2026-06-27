const express = require("express");
const router = express.Router();
const Task = require("../model/Task");
const upload = require("../middlware/upload");

// GET ALL TASKS

router.get("/:userId", async(req,res)=>{

   const tasks = await Task.find({
      userId:req.params.userId

   });

   res.json(tasks);

});

// ADD TASK

router.post("/add", upload.single("pdfFile"), async (req, res) => {

    try{

        const {
            userId,
            taskName,
            subject,
            deadline,
            status
        } = req.body;
        const pdfFile = req.file ? req.file.filename : "";

        const newTask = new Task({
            userId,
            taskName,
            subject,
            deadline,
            status,
            pdfFile
        });

        await newTask.save();

        res.status(201).json({
            message:"Task Added Successfully"
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

 // UPDATE TASK

router.put(
    "/update/:id",
    upload.single("pdfFile"),
    async (req, res) => {

        try {

            const updateData = {
                taskName: req.body.taskName,
                subject: req.body.subject,
                deadline: req.body.deadline,
                status: req.body.status
            };

            // PDF එකක් අලුතෙන් upload කළොත් විතරක් update කරන්න
            if (req.file) {
                updateData.pdfFile = req.file.filename;
            }

            await Task.findByIdAndUpdate(
                req.params.id,
                updateData
            );

            res.json({
                message: "Task Updated Successfully"
            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Server Error"
            });

        }

    }
);


// DELETE TASK

router.delete("/delete/:id", async (req, res) => {

    try {

        await Task.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Task Deleted Successfully"
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