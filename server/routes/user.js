import express from 'express';
import * as dotenv from 'dotenv';
import User from '../mongodb/models/user.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

dotenv.config();

const router = express.Router();

// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
