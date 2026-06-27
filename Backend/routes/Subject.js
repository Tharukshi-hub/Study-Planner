const express = require("express");

const router = express.Router();

const Subject = require("../model/Subject");


// GET ALL SUBJECTS

router.get("/:userId", async(req,res)=>{

   const subjects = await Subject.find({

      userId:req.params.userId

   });

   res.json(subjects);

});


// ADD SUBJECT

router.post("/add", async (req, res) => {

    try{

        const {

            userId,
            subjectName,
            difficulty,
            priority
        } = req.body;

        const newSubject = new Subject({

            userId,
            subjectName,
            difficulty,
            priority
        });

        await newSubject.save();

        res.status(201).json({
            message:"Subject Added Successfully"
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

// UPDATE SUBJECT

router.put("/update/:id", async (req, res) => {

    try {

        await Subject.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.json({
            message: "Subject Updated"
        });

    }

    catch(error){

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// DELETE SUBJECT

router.delete("/delete/:id", async (req, res) => {

    try {

        await Subject.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:"Subject Deleted Successfully"
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

module.exports = router;