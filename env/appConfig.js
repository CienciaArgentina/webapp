const variables = process.env.LOCAL_ENV == 'true' ?
{
	ENVIROMENT: 'LOCAL',
	API_URL: 'https://api.cienciaargentina.dev'//dev api url here
} :
{
	ENVIROMENT: '#{ENVIROMENT}#',
	API_URL: '#{API_URL}#'
}

module.exports = variables