import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

export default router;