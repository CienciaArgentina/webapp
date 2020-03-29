const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000;
const dev = process.env.LOCAL_ENV == 'true';
const app = next({ dev });
const handle = app.getRequestHandler();

const { parse } = require('url')
const { join } = require('path')


// https://github.com/fridays/next-routes
app
.prepare()
.then( () =>{
	const server = express();
	server.use(cookieParser());

	server.get('/service-worker.js', (req, res) => {
		res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
		res.set("Content-Type", "application/javascript");
		const path = join(__dirname, '.next', '/service-worker.js');
		app.serveStatic(req, res, path);
	});
	server.get('/manifest.json', (req, res) => {
		const path = join(__dirname, 'static', '/manifest.json')
		app.serveStatic(req, res, path);
	});
	server.get('/job/:id', (req, res) => {
		const actualPage = '/job'
		const queryParams = {
			id: req.params.id
		}
		app.render(req, res, actualPage, queryParams)
	})
	server.get('/institute/:id', (req, res) => {
		const actualPage = '/institute'
		const queryParams = { id: req.params.id } 
		app.render(req, res, actualPage, queryParams)
	})
	server.get('/laboratory/:id/:view/:projectId', (req, res) => {
		const actualPage = '/laboratory';
		if(req.params.view==='project'){
			const queryParams = {
				id: req.params.id,
				view: 'project',
				projectId: req.params.projectId
			}
			app.render(req, res, actualPage, queryParams)
		} else {
			app.render(req, res, '404');
		}
	});
	server.get('/laboratory/:id/:view', (req, res) => {
		const actualPage = '/laboratory'
		const queryParams = {
			id: req.params.id,
			view: req.params.view
		} 
		app.render(req, res, actualPage, queryParams)
	});
	server.get('/laboratory/:id', (req, res) => {
		const actualPage = '/laboratory'
		const queryParams = { id: req.params.id } 
		app.render(req, res, actualPage, queryParams)
	});
	server.get(['/editprofile/:section', '/editprofile/', '/editprofile'],(req,res) => {
		const actualPage = '/editprofile'
		const queryParams = { section: req.params.section } 
		app.render(req, res, actualPage, queryParams)
	})
	server.get('/offerDashboard/:id', (req,res) => {
		const actualPage = '/offerDashboard'
		const queryParams = { id: req.params.id } 
		app.render(req, res, actualPage, queryParams)
	});
	server.get('/', (req,res) => {
		res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
		const actualPage = '/index'
		app.render(req, res, actualPage)
	})
	server.get('/myJobs/:section', (req,res) => {
		const actualPage = '/myJobs'
		const queryParams = { section: req.params.section } 
		app.render(req, res, actualPage, queryParams)
	})
	server.get('*', (req, res) => {
		return handle(req, res);
	});
	server.listen(PORT, (err)=>{
		if (err) throw err
		console.log(`> Ready on http://localhost:${PORT}`)
	})
})
.catch( ex => {
	console.error(ex.stack);
	process.exit(1);
})
