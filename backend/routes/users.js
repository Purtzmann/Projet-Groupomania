const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const usersCtrl = require("../controllers/users");
const multer = require("../middleware/multer-profil");


router.post("/signup", usersCtrl.signin);
router.post("/login", usersCtrl.login);


router.get("/:id", auth, usersCtrl.getUser);
router.put("/", auth, multer, usersCtrl.updateUser)
router.delete("/:id", auth, multer, usersCtrl.deleteUser)


module.exports = router;