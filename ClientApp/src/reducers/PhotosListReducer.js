import {
    PHOTOS_FETCHED,
    PHOTOS_UPLOADED,
    DELETE_UPLOADED_PHOTO,
    ALL_PHOTOS_DELETED,
} from '../utils/Constants';

const PhotosListReducer = (photos = [], action) => {
    switch (action.type) {
        case PHOTOS_FETCHED:
            return [...action.photos];
        case PHOTOS_UPLOADED: {
            return [...action.photos, ...photos];
        }
        case ALL_PHOTOS_DELETED: {
            return [];
        }
        case DELETE_UPLOADED_PHOTO:
            return photos.filter(
                photo => photo.public_id !== action.publicId
            );
        default:
            return [...photos];
    }
};

export default PhotosListReducer;
