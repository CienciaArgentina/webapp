// TODO: Import store
// https://github.com/functionalStoic/my-idea-pool-client/blob/master/src/api/utils/axiosInstance.js

import axios from 'axios';

const API_DOMAIN = process.env.API_URL

const axiosInstance = axios.create({
		baseURL: API_DOMAIN,
		timeout: 10000,
		headers: {
			contentType: 'application/json',
			accept: 'application/json',
			// TODO: Add JWT
			'Authorizarion': 'JWT',
			'Access-Control-Allow-Origin': "*",
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
		},
		crossDomain: true
});

// axiosInstance.interceptors.response.use(function (response) {
// 	// Do something with response data
// 	return response;
// }, function (error) {
// 	// Do something with response error
// 	console.log(error);
// 	return Promise.reject(error);
// });

	// axiosInstance.interceptors.response.use(
	//   response => response,
	//   error => {
	//     const originalRequest = error.config;
	//     console.log('ERR', error);
	//     console.log('RES', response);

	//     // TODO: Implement refreshToken?
	//     if (error.response.status === 401) {
	//       const refresh_token = localStorage.getItem('refresh_token');
	
	//       store.dispatch({
	//         type: TOKEN_REFRESH_REQUEST,
	//         isFetching: true
	//       });
	
	//       return axiosInstance
	//         .post('/access-tokens/refresh', { refresh_token })
	//         .then(({ data }) => {
	//           store.dispatch({
	//             type: TOKEN_REFRESH_SUCCESS,
	//             isFetching: false,
	//             isAuthenticated: true,
	//             access_token: data.jwt
	//           });
	
	//           localStorage.setItem('access_token', data.jwt);
	
	//           axiosInstance.defaults.headers['X-Access-Token'] = data.jwt;
	//           originalRequest.headers['X-Access-Token'] = data.jwt;
	
	//           return axios(originalRequest);
	//         })
	//         .catch(err => {
	//           store.dispatch({
	//             type: TOKEN_REFRESH_FAILURE,
	//             isFetching: false,
	//             isAuthenticated: false,
	//             access_token: undefined,
	//             refresh_token: undefined,
	//             errorMessage: err
	//           });
	//         });
	//     }
	
	//     return Promise.reject(error);
	//   }
	// );
	
	export default axiosInstance;