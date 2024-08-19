import React from 'react';
import '../css/Booking.css';

const Booking = () => (
    <booking className='overlay' >
        <section className='section'>
            <h2 className='bookingtitle'>Randevu Al</h2>
            {/* Google Takvim entegrasyonu */}
            <iframe
                src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIMEZONE"
                style={{ borderRadius: 10 }}
                width="1200"
                height="500"
                frameborder="0"
                title="Google Calendar"
            ></iframe>
        </section>
    </booking>
);

export default Booking;
