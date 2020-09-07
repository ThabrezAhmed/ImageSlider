import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  GET_IMAGES,
  getImageDetailsAsync,
  setImageStatus,
  filterImages,
} from '../actions/';
import {getAPI} from '../../api';
import apiConst from '../../constants/apiConst';

// const url = 'https://picsum.photos/list';

function* getImagesAsync(action) {
  try {
    yield put(setImageStatus('STARTED'));
    const imageDetails = yield call(getAPI, apiConst.imageDetails);
    const {status, data} = imageDetails;
    if (status === 200) {
      yield put(getImageDetailsAsync(data));
      const currentState = yield select();
      yield put(filterImages());
      // yield put(setImageStatus('SUCCESS'));
    } else {
      yield put(setImageStatus('FAILURE'));
    }
  } catch (error) {
    yield put(setImageStatus('FAILURE'));
    alert('Error' + error);
  }
}

function* getImageSaga() {
  yield takeLatest(GET_IMAGES, getImagesAsync);
}

export default getImageSaga;
