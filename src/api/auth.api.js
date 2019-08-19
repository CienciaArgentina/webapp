import axiosInstance from './utils/axiosInstance'
import axios from 'axios';

export class AuthApi {
	static async login(userName, password) {
		const {data} = await axiosInstance.post('/Accounts/Login', {
			userName,
			password
		}).catch((error) => {
			if(error.response) {
				return Promise.reject(error.response);
			} else {
				return Promise.reject(error);
			}
		});
		return data;
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
		let {data} = await axiosInstance.post('/Accounts', {
			userName,
			email,
			password
		}).catch((error) => {
			if(error.response) {
				return Promise.reject(error.response);
			} else {
				return Promise.reject(error);
			}
		});
		return data
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