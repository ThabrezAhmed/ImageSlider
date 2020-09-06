export const GET_IMAGES = 'GET_IMAGES';
export const GET_IMAGES_ASYNC = 'GET_IMAGES_ASYNC';
export const CHANGE_IMAGE_STATUS = 'CHANGE_IMAGE_STATUS';
export const FILTER_IMAGES = 'FILTER_IMAGES';

export const getImages = () => {
  return {
    type: GET_IMAGES,
  };
};

export const getImageDetailsAsync = payload => {
  return {
    type: GET_IMAGES_ASYNC,
    payload,
  };
};

export const setImageStatus = payload => {
  return {
    type: CHANGE_IMAGE_STATUS,
    payload,
  };
};

export const filterImages = () => {
  return {
    type: FILTER_IMAGES,
  };
};
