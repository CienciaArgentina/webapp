// export const resetCount = () => dispatch => {
//   return dispatch({ type: 'RESET })
// }

import { JobsApi } from '../../api/api'

const indexJobs = (jobs) => ({
	type: 'UPDATE_INDEX_JOBS',
	jobs
})

export const getLastPosted = () => dispatch => {
	JobsApi.getJobList('lastPosted')
}