import axios from 'axios';

export function getAPI(url) {
  return axios({
    method: 'get',
    url,
  })
    .then(function(response) {
      return response;
    })
    .catch(err => {
      throw err;
    });
}
