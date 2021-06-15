const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const messagesCtrl = require("../controllers/messages");


const router = express.Router();

router.get("/",  auth, multer, messagesCtrl.displayAll);
router.post("/", auth, multer, messagesCtrl.create);
router.delete("/:id", auth, multer, messagesCtrl.deletePost);


module.exports = router;
