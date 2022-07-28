
  const express = require("express");
  const app = express();
  const cors = require("cors");
  const {Login} = require("./models");
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post("/register", async (req, res) => {
    const { user, password } = req.body;
    const newUser = {
      user,
      password,
    };
  
    try {
        const registerUser = await Login.create(newUser);
        res.status(201).json({
            message: "User created successfully",
            id:registerUser.id,
            user:registerUser.user,
        });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    //   console.log(error);
    }
  });
  
  
  module.exports = app;
  