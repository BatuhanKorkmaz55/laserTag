// src/js/actions.js
import { updateStatuses, addAnnouncement, removeAnnouncement } from './playstationSlice';

export const updateStatus = (statuses) => ({
    type: 'UPDATE_STATUS',
    payload: statuses
});
export { updateStatuses, addAnnouncement, removeAnnouncement };

