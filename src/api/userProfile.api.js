import axiosInstance from "./utils/axiosInstance"

const PROFILE = 'userProfiles'

export class UserProfileApi {
	static async getMyData() {
		const { data } = await axiosInstance.get(`${PROFILE}/me`)
		return data
	}
}