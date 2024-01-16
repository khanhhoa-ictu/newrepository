const userController = require("../controllers/userController");
const {
  verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/all-user", verifyToken, userController.getAllUsers);

router.post("/manager/add-user", verifyTokenAndAdmin, userController.addUser);

router.put("/manager/edit-user/:id", verifyTokenAndAdmin, userController.editUser);

router.delete("/manager/user/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

module.exports = router;