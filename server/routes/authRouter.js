const express = require('express');
const { registerUserController, loginUserController, logoutController, authMiddleware } = require('../controllers/userController')


const router = express.Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post("/logout", logoutController);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated User',
        user,
    })
})
module.exports = router;