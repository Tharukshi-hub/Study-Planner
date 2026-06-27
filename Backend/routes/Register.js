const express = require("express");
const router = express.Router();
const User = require("../model/Register");
const bcrypt = require("bcryptjs");
router.put("/change-password/:id", async (req, res) => {

    try {

        const {

            currentPassword,
            newPassword

        } = req.body;

        const user = await User.findById(
            req.params.id
        );

        const isMatch = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if(!isMatch){

            return res.status(400).json({

                message:"Current Password Incorrect"

            });

        }

        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );

        user.password = hashedPassword;

        await user.save();

        res.json({

            message:"Password Updated"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

});
// REGISTER

router.post("/register", async (req, res) => {

    try{

        const { name, email, password } = req.body;

        // Check existing email

        const existingUser = await User.findOne({ email });

        if(existingUser){

            return res.status(400).json({
                message:"Email already exists"
            });
        }

        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user

        const newUser = new User({

            name,
            email,
            password: hashedPassword

        });

        // Save user

        await newUser.save();

        res.status(201).json({
            message:"Account Created Successfully"
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }
});

// LOGIN

 router.post("/login", async (req, res) => {

   try{

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if(!existingUser){

         return res.status(400).json({
            message:"Email not found"
         });
      }

      const isMatch = await bcrypt.compare(
         password,
         existingUser.password
      );

      if(!isMatch){

         return res.status(400).json({
            message:"Incorrect password"
         });
      }

      res.status(200).json({

         message:"Login Successful",
         
         user:{

            _id: existingUser._id,

            name: existingUser.name,

            email: existingUser.email

         }

      });

   }

   catch(error){

      console.log(error);

      res.status(500).json({
         message:"Server Error"
      });

   }

});

//GET USER DETAILS
router.get("/user/:id", async (req, res) => {

    try {

        const user = await User.findById(
            req.params.id
        );

        res.json(user);

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

//UPDATE PROFILE
router.put("/update-profile/:id", async (req, res) => {

    try {

        const { name, email } = req.body;

        await User.findByIdAndUpdate(

            req.params.id,

            {
                name,
                email
            }

        );

        res.json({
            message:"Profile Updated"
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

});

//UPDATE PASSWORD
router.put("/update-password/:id", async (req,res) => {

   try{

      const {

         currentPassword,
         newPassword

      } = req.body;

      const user =
      await User.findById(
         req.params.id
      );

      const isMatch =
      await bcrypt.compare(

         currentPassword,

         user.password

      );

      if(!isMatch){

         return res.status(400).json({

            message:
            "Current Password Incorrect"

         });

      }

      const hashedPassword =
      await bcrypt.hash(
         newPassword,
         10
      );

      user.password =
      hashedPassword;

      await user.save();

      res.json({

         message:
         "Password Updated"

      });

   }

   catch(error){

      res.status(500).json({

         message:
         "Server Error"

      });

   }

});

module.exports = router;