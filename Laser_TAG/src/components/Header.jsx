import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        setIsAdmin(isLoggedIn === 'true');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        setIsAdmin(false);

        setTimeout(() => {
            navigate('/admin');
            window.location.reload();
        }, 100);  // 100 ms gecikme
    };

    const handleLogin = () => {// Sayfayı yeniler
        setTimeout(() => {
            navigate('/admin');
            window.location.reload();
        }, 100);  // 100 ms gecikme
    };

    return (
        <div>
            <header className='header'>
                <h1 className='title'>Laser Tag Oyun Salonu</h1>
                <nav>
                    <ul>
                        <li className='word'><Link to="/">Ana Sayfa</Link></li>
                        <li className='word'><Link to="/about">Hakkımızda</Link></li>
                        <li className='word'><Link to="/booking">Randevu</Link></li>
                        <li className='word'><Link to="/status">PlayStation Durumu</Link></li>
                        {
                            isAdmin ?
                                <li className='word' style={{ color: "white", display: 'block', marginRight: '5px' }}><Link onClick={handleLogout} to="/admin">
                                    Çıkış Yap</Link>
                                </li>
                                :
                                <li className='word' style={{ color: "white", display: 'block', marginRight: '8px' }}><Link onClick={handleLogin} to="/admin">
                                    Giriş Yap</Link>
                                </li>
                        }
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;