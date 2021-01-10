import axiosInstance from "./utils/axiosInstance"

const PROFILE = 'user_profiles'

export class UserProfileApi {
	static async getMyData() {
		const { data } = await axiosInstance.get(`${PROFILE}/me`)
		return data
	}
}