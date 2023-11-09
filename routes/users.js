const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

// User login
router.post("/login", async (req, res) => {
    const secret = process.env.JWT_SECRET;
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("User not found");
      }
      const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
      }
      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1d" }
      );
      //const { id,name, accountNumber, role } = user;
      res.status(200).json({
        userId: user.id,
        email: user.email,
        token,
      });
    } catch (error) {
      console.error("Error user login:", error);
      res.status(500).send("Internal server error");
    }
  });

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    
    const user = new User({
      email,
      passwordHash,
    });

    // Save the user to the database
    const savedUser = await user.save();

    res.status(200).json({
      message: 'User registered successfully',
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        // Add other user properties as needed
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
