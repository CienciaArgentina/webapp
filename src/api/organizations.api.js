import axiosInstance from './utils/axiosInstance'

export class OrganizationsApi {
	static async getOrganization(id) {
		const response = await axiosInstance.get(`/organizations/${id}`)
		return response.data
	}
	static async getDepartment(id) {
		const response = await axiosInstance.get(`/departments/${id}`)
		return response.data
	}
	static async getProject(id) {
		const response = await axiosInstance.get(`/projects/${id}`)
		return response.data
	}
}