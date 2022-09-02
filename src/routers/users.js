const express = require("express");
const {
    createUser,
    updateUser,
    deleteUser,
    createPost
} = require('../model/users');

const router = express.Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:id/posts", createPost);

module.exports = router;