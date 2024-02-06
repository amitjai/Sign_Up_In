import express from "express";
import { User } from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const preUser = await User.findOne({ email: email });
        if (preUser) {
            return res.status(200).send({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const finalUser = new User({ username, email, password: hashPassword });
        await finalUser.save();
        res.status(200).send({ message: "User Successfully registered..", success: true, data: finalUser });
    } catch (error) {
        res.status(500).json({ message: "Server fail", error: error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).send({ message: "Please fill all details." });
    }
    try {
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
            return res.status(401).json({ message: "user not exists", success: false });
        }
        const isMatch = await bcrypt.compare(password, userExists.password);

        if (!isMatch) {
            res.status(422).send({ message: " incurrect passwpord!" });
        } else {
            const result = userExists._doc;
            const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            await userExists.tokens.push({ token: token });
            res.status(200).json({ message: "successfully login", success: true, result, token });
        }


    } catch (error) {
        res.status(500).send({ message: "Fail login page", error: error });
        console.log(error);
    }
});

router.get('/get_user_info', authMiddleware, async (req, res) => {

    try {
        const userExists = await User.findById({ _id: req.body.userId });
        if (!userExists) {
            return res.status(401).json({ message: "user not exist", success: false });
        }
        res.status(200).json({
            success: true,
            data: userExists
        });
    } catch (error) {
        res.status(500).json({ message: "Something wen't wrong", success: false, error });
    }

});

export { router };