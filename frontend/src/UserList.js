import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Lấy IP từ biến môi trường, nếu không có thì fallback về localhost (cho dev)
                const vmIp = process.env.REACT_APP_VM_IP || 'localhost';
                const response = await axios.get(`http://${vmIp}:3001/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu người dùng:', error);
                // Xử lý lỗi, ví dụ hiển thị thông báo cho người dùng
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Danh sách người dùng</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;