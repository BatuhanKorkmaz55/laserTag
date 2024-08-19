import React, { useState, useEffect } from 'react';
import '../css/AdminLogin.css';

const ADMIN_USERNAME = 'volkandemirkir';
const ADMIN_PASSWORD = '123456';

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isLoggedIn === 'true') { // 'true' string olarak saklanır
            onLogin(true);
        }
    }, [onLogin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
            localStorage.setItem('isAdminLoggedIn', 'true');
            onLogin(true);
        } else {
            alert('Geçersiz kullanıcı adı veya şifre');
        }
    };

    return (
        <div className="admin-login">
            <form onSubmit={handleSubmit}>
                <h2 className='text'>Admin Girişi</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Kullanıcı Adı"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Şifre"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};

export default AdminLogin;
