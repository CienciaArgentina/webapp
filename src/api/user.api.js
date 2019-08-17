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
}