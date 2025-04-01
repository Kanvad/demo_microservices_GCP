const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Cấu hình CORS để cho phép frontend truy cập
app.use(cors({ origin: '*' }));

app.use(express.json());

// Kết nối MongoDB với kiểm tra lỗi
mongoose
    .connect('mongodb://mongo:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('🔗 Kết nối MongoDB thành công!'))
    .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Định nghĩa schema & model
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);

// API lấy danh sách người dùng
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng' });
    }
});

// API tạo người dùng mới
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo người dùng' });
    }
});

// Seed data nếu chưa có người dùng nào
const seedUsers = async () => {
    try {
        const existingUsers = await User.find();
        if (existingUsers.length === 0) {
            const users = [
                { name: 'Alice', email: 'alice@example.com' },
                { name: 'Bob', email: 'bob@example.com' },
                { name: 'Charlie', email: 'charlie@example.com' }
            ];
            await User.insertMany(users);
            console.log('✅ Seeded users data');
        }
    } catch (error) {
        console.error('❌ Lỗi khi seed dữ liệu:', error);
    }
};

seedUsers();

// Lắng nghe kết nối
app.listen(PORT, () => {
    console.log(`🚀 User service running on port ${PORT}`);
});
