import React from 'react';
import UserList from './UserList';
import ProductList from './ProductList';

const App = () => {
    return (
        <div>
            <h1>Demo Microservice</h1>
            <UserList />
            <ProductList />
        </div>
    );
};

export default App;