import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Lấy IP từ biến môi trường, nếu không có thì fallback về localhost (cho dev)
                const vmIp = process.env.REACT_APP_VM_IP || 'localhost';
                const response = await axios.get(`http://${vmIp}:3002/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
                // Xử lý lỗi, ví dụ hiển thị thông báo cho người dùng
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