import axiosInstance from './utils/axiosInstance'
import axios from 'axios';

export class AuthApi {
	static async login(userName, password) {
		// return { //fakeReturn
		// 	'access_token': 'asdkbhadsbjdasbjalbda',
		// 	'refresh_token ': 'ZALALAAAAAA'
		// }

		await axiosInstance.post('/Accounts/Login', {
			userName,
			password
		}).then(res => {
			console.log(res);
			// axiosInstance.defaults.headers['X-Access-Token'] = data.jwt;
			return 200
		}).catch((error) => {
			return Promise.resolve(error.response);
		});
	}
	static async logout() {
		return { //fakeReturn
			success: true
		}
		const refresh_token = localStorage.getItem('refresh_token');
		
		return axiosInstance.delete('/access-tokens', {
			data: { refresh_token }
		});
	}
	static async register(userName, email, password) {
		await axiosInstance.post('/Accounts', {
			userName,
			email,
			password
		}).then(res => {
			console.log(res);
			// axiosInstance.defaults.headers['X-Access-Token'] = data.jwt;
			return 200
		}).catch((error) => {
			console.log(error.response);
			return Promise.reject(error.response.status);
		});
	}
	static async getUserInfo() {
		return { //fakeReturn
			'userId': 566546444654161665,
			'name': 'Matias',
			'middleName': 'Nahuel',
			'lastName': 'Gonzalez Fernandez',
			'identifier': 'ZALALAAAAA',
			'sex': 'm',
			'socialNetwork': [
				{
					'socialNetworkName': 'Facebook',
					'userName': 'matiasngf',
					'url': 'fb.me/matiasngf',
				}
			],
			'account': {
				'userName': 'matiasgf',
				'phoneNumber': '+54 11 6099 8640',
				'email': 'matiasngf@gmail.com',
				'twoFactorEnabled': false,
				'accessFailedCount': 0,
			}
		}
		const { data } = await axiosInstance.get(`/me`);
		return data;
	}
}