const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const { title, category, dueDate } = req.body;

    const task = await Task.create({
      title,
      category,
      dueDate,
    });

    

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;