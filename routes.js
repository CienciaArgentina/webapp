const routes = require('next-routes')

module.exports = routes()
.add('/job','/job/:id', '/job')
.add('a/:id', 'job')