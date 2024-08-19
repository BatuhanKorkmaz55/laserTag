import { createSlice } from '@reduxjs/toolkit';

const playstationSlice = createSlice({
    name: 'playstation',
    initialState: {
        statuses: [true, true, true, true],
        announcements: [],
        photos: [] // Fotoğrafların URL'leri bir dizi olarak saklanacak
    },
    reducers: {
        updateStatuses: (state, action) => {
            state.statuses = action.payload;
        },
        addAnnouncement: (state, action) => {
            state.announcements.push(action.payload);
        },
        removeAnnouncement: (state, action) => {
            state.announcements.splice(action.payload, 1);
        },
        addPhoto: (state, action) => {
            state.photos.push(action.payload); // Fotoğraf URL'sini doğrudan ekleyin
        },
        setPhotos: (state, action) => {
            state.photos = action.payload; // Fotoğrafların URL'lerini güncelleyin
        }
    }
});

export const { updateStatuses, addAnnouncement, removeAnnouncement, addPhoto, setPhotos } = playstationSlice.actions;
export const selectPhotos = (state) => state.playstation.photos;
export default playstationSlice.reducer;
