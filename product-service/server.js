const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Cấu hình CORS cho phép frontend truy cập
app.use(cors({ origin: '*' }));
app.use(express.json());

// Kết nối MongoDB với kiểm tra lỗi
mongoose
    .connect('mongodb://mongo:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('🔗 Kết nối MongoDB thành công (Product Service)!'))
    .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Định nghĩa schema & model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

// API lấy danh sách sản phẩm
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu sản phẩm' });
    }
});

// API tạo sản phẩm mới
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo sản phẩm' });
    }
});

// Seed data nếu chưa có sản phẩm nào
const seedProducts = async () => {
    try {
        const existingProducts = await Product.find();
        if (existingProducts.length === 0) {
            const products = [
                { name: 'Product A', price: 100 },
                { name: 'Product B', price: 200 },
                { name: 'Product C', price: 300 }
            ];
            await Product.insertMany(products);
            console.log('✅ Seeded products data');
        }
    } catch (error) {
        console.error('❌ Lỗi khi seed dữ liệu:', error);
    }
};

seedProducts();

// Lắng nghe kết nối
app.listen(PORT, () => {
    console.log(`🚀 Product service running on port ${PORT}`);
});
