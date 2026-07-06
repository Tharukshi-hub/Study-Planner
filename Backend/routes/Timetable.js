const express = require("express");
const router = express.Router();
const Timetable = require("../model/Timetable");


// ADD TIME SLOT
 router.post("/add", async (req,res)=>{
    console.log(req.body);
   const {
      userId,
      date,
      startTime,
      endTime
   } = req.body;

   const newSlot = new Timetable({
      userId,
      date,
      startTime,
      endTime

   });

   await newSlot.save();

   res.status(201).json({
      message:"Time Slot Added Successfully"
   });

});


// GET USER TIMETABLE
router.get("/:userId", async (req,res) => {

    try{

        const timetable = await Timetable.find({
            userId:req.params.userId
        });

        res.json(timetable);

    }

    catch(error){

        res.status(500).json({
            message:"Server Error"
        });

    }

});

module.exports = router;