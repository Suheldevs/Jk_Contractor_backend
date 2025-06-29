import express from "express";
import { userSignin ,userLogin} from "../controller/user.controller.js";
import {tokenVerify} from '../middleware/checkToken.js'
const router = express.Router()

router.post('/signin',userSignin)
router.post('/login',userLogin)

export default router