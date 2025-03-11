const express = require("express");
const router=express.Router();
const userController= require('../controllers/userController')

/**Middleware */

router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

/**Test URl */
router.get('/',(req,res)=>{
    return res.send(`<h1>Test URL</h1>`);
})
router.get(`/all_users`,userController.allUser)
router.post(`/register`,userController.register)
router.post(`/login`,userController.login)
router.get(`/auth`,userController.auth)
router.post(`/logout`,userController.logout)

module.exports = router;