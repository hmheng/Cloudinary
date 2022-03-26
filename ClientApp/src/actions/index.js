import {
    PHOTOS_FETCHED,
    PHOTOS_UPLOADED,
    ALL_PHOTOS_DELETED,
    DELETE_UPLOADED_PHOTO,
    UPDATE_UPLOADED_PHOTO,
} from '../utils/Constants';

export const photosFetched = photos => ({
    type: PHOTOS_FETCHED,
    photos: photos,
});

export const photosUploaded = photos => ({
    type: PHOTOS_UPLOADED,
    photos: photos,
});

export const allPhotosDeleted = result => ({
    type: ALL_PHOTOS_DELETED,
    result: result,
});

export const updateUploadedPhoto = uploadedPhoto => ({
    type: UPDATE_UPLOADED_PHOTO,
    uploadedPhoto: uploadedPhoto,
});

export const deleteUploadedPhoto = publicId => ({
    type: DELETE_UPLOADED_PHOTO,
    publicId: publicId,
});
