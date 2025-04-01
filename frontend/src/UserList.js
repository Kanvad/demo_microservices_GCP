import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Gọi API bằng tên service trong Docker Compose
                const response = await axios.get('http://user-service:3001/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu người dùng:', error);
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
