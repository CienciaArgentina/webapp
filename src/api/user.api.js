import axiosInstance from './utils/axiosInstance';
import moment from 'moment';

import { userDataExample } from './responseExamples'

export class UserApi {
	static async getMyData() {
		// return userDataExample;
		const { data } = await axiosInstance.get(`/user/me`);
		return data;
	}

	static async editBasicProfile(data) {
		console.log(data);
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