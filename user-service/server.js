const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Sử dụng middleware cors
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User ', userSchema);

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

const seedUsers = async () => {
    const existingUsers = await User.find();
    if (existingUsers.length === 0) {
        const users = [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Charlie', email: 'charlie@example.com' }
        ];
        await User.insertMany(users);
        console.log('Seeded users data');
    }
};

seedUsers();

app.listen(PORT, () => {
    console.log(`User  service running on port ${PORT}`);
});