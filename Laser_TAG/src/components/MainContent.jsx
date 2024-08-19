import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotos, selectPhotos } from '../js/playstationSlice';
import { fetchPhotoNamesFromFirestore, fetchPhotoURLsFromStorage } from '../js/firebaseUtils.js';
import '../css/MainContent.css';

const MainContent = () => {
    const dispatch = useDispatch();
    const photos = useSelector(selectPhotos); // Redux store'dan fotoğrafları alın
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Aktif fotoğrafın indeksi

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const photoNames = await fetchPhotoNamesFromFirestore();
                if (photoNames.length === 0) {
                    console.warn('No photos found in Firestore.');
                    setLoading(false);
                    return;
                }

                const photoURLs = await fetchPhotoURLsFromStorage(photoNames);
                if (photoURLs.length === 0) {
                    console.warn('No photo URLs found.');
                } else {
                    dispatch(setPhotos(photoURLs)); // Fotoğrafları Redux store'a ekle
                }
            } catch (error) {
                console.error('Error fetching photos:', error);
                setError('Failed to load photos.');
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [dispatch]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className='overlay'>
            <main>
                <section>
                    <h2 className='maincontentword'>İşletmemizin Fotoğrafları</h2>
                    <div className="photo-slider">
                        <button className="gallery-button left" onClick={handlePrev}>&lt;</button>
                        <div className="slider-container">
                            <div className="photo-item prev">
                                <img src={photos[(currentIndex - 1 + photos.length) % photos.length]} alt="Previous" />
                            </div>
                            <div className="photo-item focused">
                                <img src={photos[currentIndex]} alt="Current" />
                            </div>
                            <div className="photo-item next">
                                <img src={photos[(currentIndex + 1) % photos.length]} alt="Next" />
                            </div>
                        </div>
                        <button className="gallery-button right" onClick={handleNext}>&gt;</button>
                    </div>
                </section>
                <section>
                    <h2 className='maincontentword'>Müşterilerimiz</h2>
                    {/* İçerik ekleme alanı */}
                </section>
            </main>
        </div>
    );
};

export default MainContent;
