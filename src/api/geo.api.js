import axiosInstance from './utils/axiosInstance'

export class GeoApi {
	static async getCountries() {
		const { data } = await axiosInstance.get('/Geo/getCountries')
		return data.data
	}
	static async getProvinces(country) {
		// TODO que haya mas de un pais
		const { data } = await axiosInstance.get('/Geo/getArgentinianStates')
		return data.data
	}
	static async getCities(province) {
		const { data } = await axiosInstance.get(`/Geo/getCitiesByStateId/${province}`)
		return data.data
	}
	static async getLocalities(city) {
		const { data } = await axiosInstance.get(`/Geo/getLocalitiesByCityId/${city}`)
		return data.data
	}
}