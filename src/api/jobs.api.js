import axiosInstance from './utils/axiosInstance';
import moment from 'moment';

import { jobExample, jobWithCandidates } from './responseExamples'

const paseJobs = job => ({
	...job,
	typeName: {doctorate:'Dotorado', thesis:'Tesis', posdoctorate:'Posdoctorado'}[job.type]
})

export class JobsApi {
	// id: int
	static async getJob(id) {
		return jobExample //fakeReturn
		const { data } = await axiosInstance.get(`/job-offer/${id}`);
		return data;
	}

	static async searchJob(params) {
		return [
			jobExample,
			jobExample,
			jobExample
		]
		const { data } = await axiosInstance.get(`/job-offer/search`, {
			params
		});
		return data;
	}

	static async getRecentJobs() { // jobs para index
		return [
			jobExample,
			jobExample,
			jobExample
		]
		const { data } = await axiosInstance.get(`/jobs/home`, {
			params
		});
		return data;
	}

	// id: jobId
	static async setFav(id) {
		return true;
		try {
			const response = await axiosInstance.post(`/job-offer/fav`, {
				id
			});
			return response
		} catch {
			return false
		}
	}

	//id: instituteId
	static async getFromInstitute(id) {
		return [
			jobExample,
			jobExample,
			jobExample
		]
		const response = await axiosInstance.post(`/jobs/getFromInstitute/${id}`);
		return response
	}

	//id: jobId
	//esto va para /offerDashboard/:id
	static async getAdminJob(id) {
		return jobWithCandidates;
		const response = await axiosInstance.post(`/jobs/getAdminJob/${id}`)
		return response
	}
}