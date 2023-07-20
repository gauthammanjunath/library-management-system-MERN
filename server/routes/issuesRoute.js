const router = require("express").Router();
const Issue = require("../models/issuesModel");
const Book = require("../models/booksModel");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/issue-new-book", authMiddleware, async (req, res) => {
    try {
      // inventory adjustment (available copies must be decremented by 1)
      await Book.findOneAndUpdate(
        { _id: req.body.book },
        { $inc: { availableCopies: -1 } }
      );
  
      // issue book to patron (create new issue record)
      const newIssue = new Issues(req.body);
      await newIssue.save();
      return res.send({
        success: true,
        message: "Book issued successfully",
        data: newIssue,
      }); 
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  });

module.exports =router;