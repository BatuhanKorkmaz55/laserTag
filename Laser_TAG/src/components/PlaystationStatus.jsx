import React from 'react';
import { useSelector } from 'react-redux';
import '../css/PlaystationStatus.css';

const PlaystationStatus = () => {
    const statuses = useSelector(state => state.playstation.statuses || [true, true, true, true]);

    if (!statuses || statuses.length === 0) {
        return <div>PlayStation verileri yüklenemedi veya yeterli veri yok.</div>;
    }

    return (
        <div className="overlay">
            <section id="status" className="status-container">
                <h2 className="status-title">PlayStation Durumu</h2>
                <div className="status-board">
                    {statuses.map((status, index) => (
                        <div key={index} className={`playstation ${status ? 'available' : 'occupied'}`}>
                            PlayStation {index + 1} - {status ? 'Boş' : 'Dolu'}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PlaystationStatus;
