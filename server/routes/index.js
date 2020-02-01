const express = require('express');
const userController = require('./../controllers/users.controller')
const router = express.Router();

module.exports = () => {
    router.post("/addUpdate" ,async  (req, res) => {
        try {
            console.log(req.body);
            const users = await userController.addUpdateUser(req.body);
            return res.status(200).json({
                data: users
            })
        } catch (error) {
            console.error("[AddUpdateUser] Error : ", error);
            return res.status(420).json({
                message: "There was an error, Please try again"
            })
        }
    })

    router.get("/list" , async  (req, res) => {
        try {
            const users = await userController.getUsersList();
            return res.status(200).json({
                data: users
            })
        } catch (error) {
            console.error("[AddUpdateUser] Error : ", error);
            return res.status(420).json({
                message: "There was an error, Please try again"
            })
        }
    })
    return router;
}