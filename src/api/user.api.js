import axiosInstance from './utils/axiosInstance';
import moment from 'moment';

import { userDataExample, mapUserResponse } from './responseExamples'


const USERS = 'users'
const LOGIN = 'login'

//API /users
export class UserApi {
	static async logOut() {
		return true
	}
	static async login(username, password) {
		const { data } = await axiosInstance.post(`/${USERS}/${LOGIN}`, {
			username,
			password
		})
	}

	static async getMyData(userName) {
		// return userDataExample;
		const { data } = await axiosInstance.get(`/Users/${userName}`)
		.catch(e => {
			return Promise.reject(e)
		});

		return data
	}

	static async editBasicProfile(data) {
		console.log(data);
		return true
	}

	static async confirmAccount(email, token) {
		const response = await axiosInstance.get('/Accounts/ConfirmationRegisterMail', {
			params: {
				email,
				token
			}
		}).catch((error) => {
			if(error.response) {
				return Promise.reject(error.response);
			} else {
				return Promise.reject(error);
			}
		});
		return response;
	}

	static async getArticleByPMID(pmid) {
		const response = await axiosInstance.get(`/Users/GetArticleByPMID/${pmid}`).catch((error)=>{
			if(error.response) {
				return Promise.reject(error.response);
			} else {
				return Promise.reject(error);
			}
		})
		return response
	}
}