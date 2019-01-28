const express = require('express');
const next = require('next');

const PORT = process.env.port || 3000;
const dev = process.env.NODE_NEV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then( () =>{
	const server = express();

  // server.get('/post/:id', (req, res) => {
  //   const actualPage = '/index'
  //   const queryParams = { id: req.params.id } 
  //   app.render(req, res, actualPage, queryParams)
  // })

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