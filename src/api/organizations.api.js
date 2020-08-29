import axiosInstance from './utils/axiosInstance'

export class OrganizationsApi {
	static async getOrganization(id) {
		const response = await axiosInstance.get(`/organizations/${id}`).catch(e=>{})
		return response?.data
	}
	static async getDepartment(id) {
		const response = await axiosInstance.get(`/departments/${id}`).catch(e=>{})
		return response?.data
	}
	static async getProject(id) {
		const response = await axiosInstance.get(`/projects/${id}`).catch(e=>{})
		return response?.data
	}
}