import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatuses, addAnnouncement, removeAnnouncement, addPhoto } from '../js/playstationSlice';
import '../css/AdminPanel.css';
import { uploadFileToStorage, addPhotoToFirestore } from '../js/firebaseUtils';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const statuses = useSelector(state => state.playstation.statuses || [true, true, true, true]);
    const announcements = useSelector(state => state.playstation.announcements || []);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [file, setFile] = useState(null);

    const handleStatusChange = (index) => {
        const updatedStatuses = [...statuses];
        updatedStatuses[index] = !updatedStatuses[index];
        dispatch(updateStatuses(updatedStatuses));
    };

    const handleAnnouncementChange = (e) => {
        setNewAnnouncement(e.target.value);
    };

    const handleAddAnnouncement = () => {
        if (newAnnouncement.trim()) {
            dispatch(addAnnouncement(newAnnouncement));
            setNewAnnouncement('');
        }
    };

    const handleRemoveAnnouncement = (index) => {
        dispatch(removeAnnouncement(index));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            console.error('No file selected');
        }
    };

    const handleUploadPhoto = async () => {
        if (!file) {
            alert('Lütfen bir dosya seçin!');
            return;
        }

        try {
            console.log("Fotoğraf yükleniyor...");
            const photoUrl = await uploadFileToStorage(file);
            await addPhotoToFirestore(photoUrl);
            dispatch(addPhoto(photoUrl));
            alert('Fotoğraf başarıyla yüklendi!');
            setFile(null);
        } catch (error) {
            console.error('Fotoğraf yükleme hatası:', error);
            alert('Fotoğraf yükleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className='body'>
            <div className="admin-panel">
                <h2>Admin Panel</h2>
                {/* PlayStation Status Management */}
                <div className="playstation-status">
                    <h3>PlayStation Durumu</h3>
                    <div className="status-board">
                        {statuses.map((status, index) => (
                            <div
                                key={index}
                                className={`${status ? 'dolu' : 'bos'}`}
                                onClick={() => handleStatusChange(index)}
                            >
                                PlayStation {index + 1} - {status ? 'Boş' : 'Dolu'}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Announcement Management */}
                <div className="announcement-management">
                    <h3>Duyuru Yönetimi</h3>
                    <textarea
                        value={newAnnouncement}
                        onChange={handleAnnouncementChange}
                        placeholder="Yeni duyuru ekle"
                    />
                    <button onClick={handleAddAnnouncement}>Ekle</button>
                    <ul>
                        {announcements.map((announcement, index) => (
                            <li key={index}>
                                {announcement}
                                <button onClick={() => handleRemoveAnnouncement(index)}>Sil</button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Photo Management */}
                <div className="photo-management">
                    <h3>Fotoğraf Yönetimi</h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button onClick={handleUploadPhoto}>Yükle</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
