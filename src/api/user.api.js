import axiosInstance from './utils/axiosInstance';
import moment from 'moment';

import { userDataExample, mapUserResponse } from './responseExamples'


const USERS = 'users'
const LOGIN = 'login'
const SEND_CONFIRMATION_EMAIL = 'sendconfirmationemail'
const CONFIRM_EMAIL = 'confirmemail'
const FORGOT_USERNAME = 'forgotusername'
const FORGOT_PASSWORD = 'sendpasswordreset'

//API /users
export class UserApi {
	static async logOut() {
		return true
	}

	static async login(username, password) {
		const { data } = await axiosInstance.post(`/${USERS}/${LOGIN}`, {
			username,
			password
		}).catch(e => Promise.reject(e.response))
		return data
	}

	static async register(username, email, password) {
		const { data } = await axiosInstance.post(`/${USERS}`, {
			username,
			email,
			password
		}).catch(e => Promise.reject(e.response))
		return data
	}

	static async sendConfirmationEmail(userId) {
		const { data } = await axiosInstance.get(
			`/${USERS}/${SEND_CONFIRMATION_EMAIL}/${userId}`
		).catch(e => Promise.reject(e.response))
		return data
	}

	static async confirmAccount(email, token) {
		const response = await axiosInstance.get(`/${USERS}/${CONFIRM_EMAIL}`, {
			params: {
				email,
				token
			}
		}).catch(e => Promise.reject(e.response))
		return response;
	}

	static async forgotUsername(email) {
		const { data } = await axiosInstance.get(`/${USERS}/${FORGOT_USERNAME}`, {
			params: {
				email
			}
		}).catch(e => Promise.reject(e.response))
		return data;
	}

	static async sendForgotPassword(email) {
		const { data } = await axiosInstance.get(`/${USERS}/${FORGOT_PASSWORD}`, {
			params: {
				email
			}
		}).catch(e => Promise.reject(e.response))
		return data;
	}
	
	//TODO:
	static async getMyData(userName) {
		// return userDataExample;
		const { data } = await axiosInstance.get(`/Users/${userName}`)
		.catch(e => {
			return Promise.reject(e)
		});

		return data
	}
	//TODO:
	static async editBasicProfile(data) {
		console.log(data);
		return true
	}
	//TODO:
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