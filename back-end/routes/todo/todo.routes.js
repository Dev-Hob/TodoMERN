const { getAllTodo, getTodo, updateTodo, updateMultipleTodo, createTodo, getAllTodoDone, deleteTodo } = require("../../controllers/todo")
const { verifyToken } = require("../../controllers/user")

const router = require("express").Router()

router.get("/", verifyToken, getAllTodo)
router.get("/done", verifyToken, getAllTodoDone)
router.post("/create", verifyToken, createTodo)
router.patch("/update", verifyToken, updateTodo)
router.patch("/update-all", verifyToken, updateMultipleTodo)
router.delete("/delete/:_id", verifyToken, deleteTodo)
router.get("/:_id", verifyToken, getTodo)

module.exports = router;