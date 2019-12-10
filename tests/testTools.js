export const user = {

	user : {
		userName: 'tesCiencia1',
		email: 'testCienciaArg+1@outlook.com',
		password: 'Test1234*'
	},

	notConfirmed: {
		userName: 'tesCiencia2',
		email: 'testCienciaArg+2@outlook.com',
		password: 'Test1234*'
	},

	admin: {
		userName: 'tesCiencia3',
		email: 'testCienciaArg+3@outlook.com',
		password: 'Test1234*'
	}

}

//TEST ESPECIFICOS
/*
	Obtener token de activacion
	Dar permiso admin a cuenta
*/

export const AsyncTest = props => {
	const done = props.done
	props.f(...props.args)
	.then( response => {
		if(props.expect=='then') {
			try {
				props.test(response)
				done()
			} catch(e) {
				done(new Error(e))
			}
		} else {
			done(new Error('Response is 200'))
		}
	})
	.catch( response => {
		if(props.expect=='catch') {
			try {
				props.test(response)
				done()
			} catch(e) {
				done(new Error(e))
			}
		} else {
			const e = JSON.stringify(response.data.error)
			done(new Error(e))
		}
	} )
}