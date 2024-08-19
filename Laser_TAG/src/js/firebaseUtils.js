import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { storage, db } from './firebaseConfig';

// Fotoğraf URL'sini Firestore'a ekler
export const addPhotoToFirestore = async (photoURL) => {
    try {
        // Firestore referansını oluşturun ve fotoğraf URL'sini ekleyin
        await addDoc(collection(db, 'photos'), { url: photoURL });
        console.log('Photo URL added to Firestore');
    } catch (error) {
        console.error('Error adding photo URL to Firestore:', error);
        throw error;
    }
};
// Dosyayı Firebase Storage'a yükler ve indirme URL'sini döner
export const uploadFileToStorage = async (file) => {
    if (!file) {
        throw new Error('No file provided');
    }

    console.log('Uploading file to storage:', file);

    try {
        // Firebase Storage referansını oluşturun
        const storageRef = ref(storage, `photos/${file.name}`);
        console.log('Storage reference created:', storageRef);

        // Dosyayı yükleyin
        const uploadResult = await uploadBytes(storageRef, file);
        console.log('File uploaded successfully:', uploadResult);

        // Dosyanın indirme URL'sini alın
        const photoURL = await getDownloadURL(storageRef);
        console.log('Download URL retrieved:', photoURL);

        // Fotoğraf URL'sini Firestore'a ekle
        await addDoc(collection(db, 'photos'), { name: file.name, url: photoURL });
        console.log('Photo URL added to Firestore');

        return photoURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

// Firestore'dan fotoğraf adlarını çeker
export const fetchPhotoNamesFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'photos'));
        console.log('Firestore query snapshot:', querySnapshot);

        if (querySnapshot.empty) {
            console.log('No photos found in Firestore');
            return [];
        } else {
            const photoNames = querySnapshot.docs.map(doc => {
                const data = doc.data();
                if (data.name) {
                    return data.name;
                } else {
                    console.warn('Missing photo name in document:', doc.id);
                    return null;
                }
            }).filter(name => name !== null);

            console.log('Photo names fetched from Firestore:', photoNames);
            return photoNames;
        }
    } catch (error) {
        console.error('Error fetching photo names from Firestore:', error);
        return [];
    }
};

// Firebase Storage'dan fotoğraf URL'lerini çeker
export const fetchPhotoURLsFromStorage = async (photoNames) => {
    try {
        const promises = photoNames.map(name => {
            const photoRef = ref(storage, `photos/${name}`);
            return getDownloadURL(photoRef);
        });

        const photoURLs = await Promise.all(promises);
        console.log('Photo URLs fetched from Storage:', photoURLs);
        return photoURLs;
    } catch (error) {
        console.error('Error fetching photo URLs from Storage:', error);
        return [];
    }
};

// Firestore'dan fotoğrafların URL'lerini çeker
export const fetchPhotosFromFirestore = async () => {
    try {
        // Önce fotoğraf adlarını al
        const photoNames = await fetchPhotoNamesFromFirestore();

        if (photoNames.length === 0) {
            console.log('No photo names found');
            return [];
        }

        // Fotoğraf adlarından URL'leri al
        const photoURLs = await fetchPhotoURLsFromStorage(photoNames);

        console.log('Photos fetched from Firestore and Storage:', photoURLs);
        return photoURLs;
    } catch (error) {
        console.error('Error fetching photos from Firestore and Storage:', error);
        return [];
    }
};
