import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API bằng tên service trong Docker Compose
                const response = await axios.get('http://product-service:3002/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
