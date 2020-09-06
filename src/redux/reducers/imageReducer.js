import {GET_IMAGES_ASYNC, CHANGE_IMAGE_STATUS, FILTER_IMAGES} from '../actions';
import {randNumbers} from '../../utils/helperFunctions';
const initialState = {
  status: 'NOT_STARTED',
  data: {},
  filteredData: {},
};
const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGES_ASYNC:
      // debugger;
      return {...state, data: action.payload};

    case FILTER_IMAGES:
      // debugger;
      let imageData = {};
      try {
        let randomArr = [];
        randomArr.push(randNumbers(state.data.length));
        randomArr.push(randNumbers(state.data.length));
        randomArr.push(randNumbers(state.data.length));
        randomArr.push(randNumbers(state.data.length));
        randomArr.push(randNumbers(state.data.length));

        const filteredData = state.data.filter((value, index) => {
          return randomArr.includes(index);
        });
        let imagesArr = [];
        let authorArr = [];
        filteredData.forEach(element => {
          imagesArr.push(`https://picsum.photos/200/300?image=${element.id}`);
          authorArr.push(element.author);
        });
        imageData = {
          imageUrl: imagesArr,
          authorName: authorArr,
        };
        // debugger;
        return {...state, filteredData: imageData, status: 'SUCCESS'};
      } catch (err) {
        alert('error in filter' + err);
      }

    case CHANGE_IMAGE_STATUS:
      return {...state, status: action.payload};

    default:
      return state;
  }
};

export default imageReducer;
