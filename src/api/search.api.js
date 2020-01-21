import axiosInstance from './utils/axiosInstance'
import { filtersExample } from './responseExamples'

export class SearchApi {
	static async getFilters() {
		return filtersExample
	}
}