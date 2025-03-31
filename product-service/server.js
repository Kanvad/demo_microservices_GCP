const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors()); // Sử dụng middleware cors
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

const seedProducts = async () => {
    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
        const products = [
            { name: 'Product A', price: 100 },
            { name: 'Product B', price: 200 },
            { name: 'Product C', price: 300 }
        ];
        await Product.insertMany(products);
        console.log('Seeded products data');
    }
};

seedProducts();

app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
});