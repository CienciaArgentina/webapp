import { expect } from 'chai'
import { AuthApi } from '../src/api/api'

const userCredentials = {
	userName: 'matiasgf9',
	email: 'matiasngf+9@hotmail.com',
	password: 'Test1234*'
}

const userNotConfirmed = {
	userName: 'matiasgf10',
	email: 'matiasngf+10@hotmail.com',
	password: 'Test1234*'
}

const AsyncTest = props => {
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
			const e = response.data.error
			done(new Error(e))
		}
	} )
}

export const authTest = () => {
	describe('Register test', () => {

		//TEST 26	STORY 6
		it('Invalid password', done => {
			AsyncTest({
				done,
				f: AuthApi.register,
				args: ['matiasgf15', 'matiasngf+15@hotmail.com', 'a'],
				expect: 'catch',
				test: response => {
					expect(response.data.error).to.be.an('array')
					expect(response.data.error.map(x => x.code))
					.to.have.members([
						'PasswordTooShort',
						'PasswordRequiresNonAlphanumeric',
						'PasswordRequiresDigit',
						'PasswordRequiresUpper'
					])
				}
			})
		})

		//TEST 26	STORY 6
		it('Invalid password undercase', done => {
			AsyncTest({
				done,
				f: AuthApi.register,
				args: ['matiasgf15', 'matiasngf+15@hotmail.com', 'A1*1A11A'],
				expect: 'catch',
				test: response => {
					expect(response.data.error).to.be.an('array')
					expect(response.data.error[0].code).to.equal('PasswordRequiresLower')
				}
			})
		})

		//TEST 25	STORY 6
		it('Username taken', done => {
			AsyncTest({
				done,
				f: AuthApi.register,
				args: ['matiasgf10', 'matiasgf+15@hotmail.com', 'A1a1A1*'],
				expect: 'catch',
				test: response => {
					expect(response.data.error).to.be.an('array')
					expect(response.data.error[0].code).to.equal('DuplicateUserName')
				}
			})
		})

		//TEST 3	STORY 6
		it('Email taken', done => {
			AsyncTest({
				done,
				f: AuthApi.register,
				args: ['matiasgf150', 'matiasngf+10@hotmail.com', 'A1a1A1*'],
				expect: 'catch',
				test: response => {
					expect(response.data.error).to.be.an('array')
					expect(response.data.error[0].code).equals('DuplicateEmail')
				}
			})
		})

		//TEST X	STORY X
		// it('Success register', done => {
		// 	AsyncTest({
		// 		done,
		// 		f: AuthApi.register,
		// 		args: ['matiasgf16', 'matiasgf+16@hotmail.com', 'A1a1A1*'],
		// 		expect: 'then',
		// 		test: response => {
		// 			expect(response.success).to.equal(true)
		// 		}
		// 	})
		// })


	})

	describe('Login test', () => {

		//TEST 5	STORY 9
		it('Login successful', done => {
			AsyncTest({
				done,
				f: AuthApi.login,
				args: ['matiasgf9', 'Test1234*'],
				expect: 'then',
				test: response => {
					expect(response.data).to.have.keys(['jwtToken', 'email'])
					expect(response.data.email).is.equal('matiasngf+9@hotmail.com')
				}
			})
		})

		//TEST 6	STORY 9
		it('Email not confirmed', done => {
			AsyncTest({
				done,
				f: AuthApi.login,
				args: [userNotConfirmed.userName, userNotConfirmed.password],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('EmailNotConfirmed')
					expect(response.data.data.email).to.equal('matiasngf+10@hotmail.com')
				}
			})
		})

		//TEST 7	STORY 9
		it('User incorrect', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: ['usuarioFalso', userCredentials.password],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('PasswordOrUserIncorrect')
				}
			})
		})

		//TEST 10	STORY 9
		it('Password incorrect', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: [userCredentials.userName, 'incorrectPassword'],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('PasswordOrUserIncorrect')
				}
			})
		})
		
	})

	describe('Request change', () => {

		//TEST 27	STORY 6
		it('Request resend confirm account', done => {
			AsyncTest({
				done,
				f: AuthApi.sendConfirmationRegisterMail,
				args: [userNotConfirmed.email],
				expect: 'then',
				test: response => {
					expect(response.success).to.equal(true)
				}
			})
		})

		//TEST 28	STORY 6
		it('Request resend confirm account, not found', done => {
			AsyncTest({
				done,
				f: AuthApi.sendConfirmationRegisterMail,
				args: ['aaa'],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('PasswordOrUserIncorrect')
				}
			})
		})

		//TEST 29	STORY 29
		it('Send mail forgot password', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: [userCredentials.email],
				expect: 'then',
				test: response => {
					expect(response.success).equals(true)
				}
			})
		})

		//TEST 30	STORY 29
		it('Send mail forgot password, not found', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: ['aaa'],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('PasswordOrUserIncorrect')
				}
			})
		})

		//TEST 31	STORY 29
		it('Send mail forgot password, not confirmed', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: [userNotConfirmed.email],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('EmailNotConfirmed')
				}
			})
		})

		//TEST 32	STORY 30
		it('Send mail forgot user', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: [userCredentials.email],
				expect: 'then',
				test: response => {
					expect(response.success).equals(true)
				}
			})
		})

		//TEST 33	STORY 30
		it('Send mail forgot user, not found', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: ['aaa'],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('PasswordOrUserIncorrect')
				}
			})
		})

	})
}