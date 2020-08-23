import axiosInstance from "./utils/axiosInstance"
import { userDataExample, mapUserResponse } from './responseExamples'

const PROFILE = 'userProfiles'

export class UserProfileApi {
	static async getMyData() {
		return userDataExample
		const { data } = await axiosInstance.get(`${PROFILE}/me`)
		return data
	}
}