import { expect } from 'chai'
import { AuthApi } from '../src/api/api'

const userCredentials = {
	userName: 'matiasgf9',
	password: 'Test1234*'
}

const userNotConfirmed = {
	userName: 'matiasgf10',
	password: 'Test1234*'
}

export const authTest = () => {

	describe('Register test', () => {

		it('Invalid Password', done => {
			//TEST 26 STORY 6
			AuthApi.register('matiasgf15', 'matiasngf+15@hotmail.com', 'a').then( response => {
				done(new Error('Response is 200'))
			}).catch( error =>{
				try {
					expect(error.data.error).to.be.an('array')
					expect(error.data.error.map(x => x.code))
					.to.have.members([
						'PasswordTooShort',
						'PasswordRequiresNonAlphanumeric',
						'PasswordRequiresDigit',
						'PasswordRequiresUpper'
					])
					done()
				} catch (e) {
					done(e)
				}
			})
		})

		it('Invalid password undercase', done => {
			//TEST 26 STORY 6
			AuthApi.register('matiasgf15', 'matiasngf+15@hotmail.com', 'A1*1A11A').then( response => {
				done(new Error('Response is 200'))
			}).catch( error => {
				try {
					expect(error.data.error).to.be.an('array')
					expect(error.data.error[0].code).to.equal('PasswordRequiresLower')
					done()
				} catch (e) {
					done(e)
				}
			})
		})
		
		it('Username taken', done => {
			//TEST 25 STORY 6 
			AuthApi.register('matiasgf10', 'matiasgf+15@hotmail.com', 'A1a1A1*').then( () => {
				done(new Error('Response is 200'))
			}).catch( error => {
				try {
					expect(error.data.error).to.be.an('array')
					expect(error.data.error[0].code).to.equal('DuplicateUserName')
					done()
				} catch (e) {
					done(e)
				}
			})
		})

		it('Email taken', done => {
			//TEST 3	STORY 6
			AuthApi.register('matiasgf150', 'matiasngf+10@hotmail.com', 'A1a1A1*').then( () => {
				done(new Error('Response is 200'))
			}).catch( error => {
				try {
					expect(error.data.error).to.be.an('array')
					expect(error.data.error[0].code).equals('DuplicateEmail')
					done()
				} catch (e) {
					done(e)
				}
			})
		})
		/*
		it('Success register', done => {
			AuthApi.register('matiasgf16', 'matiasgf+16@hotmail.com', 'A1a1A1*').then( response => {
				expect(response.data).to.be.an('array')
				expect(response.data.response.errors[0].code).to.equal('EmailNotConfirmed')
				done()
			}).catch( error => {
				done(new Error(error.data.error))
			})
		})

		*/
	})
	
	describe('Login test', () => {

		it('Email not confirmed', done => {
			//TEST 6	STORY 9
			AuthApi.login(userCredentials.userName, userCredentials.password).then(response => {
				done(new Error("Response is 200"));
			}).catch( error => {
				try {
					expect(error.data.error).to.be.an('array')
					expect(error.data.error[0].code).to.equal('EmailNotConfirmed')
					expect(error.data.data.email).to.equal('matiasngf+10@hotmail.com')
					done()
				} catch (e) {
					done(e)
				}
			})
		})

		it('Request resend confirm account', done => {
			AuthApi.sendConfirmationRegisterMail('matiasngf+10@hotmail.com').then( response => {
				expect(response.success).to.equal(true)
				done()
			}).catch( error => {
				const e = error
				done(e)
			})
		})

		it('Request resend confirm account, not found', done => {
			AuthApi.sendConfirmationRegisterMail('aaaa').then( response => {
				done(new Error('Response is 200'))
			}).catch( error => {
				try {
					expect(error.data.success).to.equal(false)
					expect(error.data.error[0].code).to.equal('PasswordOrUserIncorrect')
					done()
				} catch(e) {
					done(e)
				}
			})
		})

		it('Send mail forgot password', done => {
			AuthApi.sendForgotPassword('lucaslopezf+98@gmail.com').then( response => {
				expect(response.success).equals(true)
				done()
			}).catch( error => {
				done(error)
			})
		})

		it('Send mail forgot password, not found', done => {
			AuthApi.sendForgotPassword('aaaaa').then( response => {
				done(new Error('Response is 200'))
			}).catch(error => {
				try {
					expect(error.data.success).to.equal(false)
					expect(error.data.error[0].code).to.equal('PasswordOrUserIncorrect')
					done()
				} catch(e) {
					done(e)
				}
			})
		})

		it('Send mail forgot password, not confirmed', done => {
			AuthApi.sendForgotPassword('matiasngf+10@hotmail.com').then( response => {
				done(new Error('Response is 200'))
			}).catch(error => {
				try {
					expect(error.data.success).to.equal(false)
					expect(error.data.error[0].code).to.equal('EmailNotConfirmed')
					done()
				} catch(e) {
					done(e)
				}
			})
		})

		it('Send mail forgot user', done => {
			AuthApi.sendForgotUser('matiasngf+10@hotmail.com').then( response => {
				expect(response.success).equals(true)
				done()
			}).catch(error => {
				done(error)
			})
		})

		it('Send mail forgot user, not found', done => {
			AuthApi.sendForgotUser('aaaaa').then( response => {
				done(new Error('Response is 200'))
			}).catch(error => {
				try {
					expect(error.data.success).to.equal(false)
					expect(error.data.error[0].code).to.equal('PasswordOrUserIncorrect')
					done()
				} catch(e) {
					done(e)
				}
			})
		})

		it('User incorrect', done => {
			//TEST 7	STORY 9
			AuthApi.login('UserFalopa', userCredentials.password).then( response => {
				done(new Error("Response is 200"));
			}).catch( error =>{
				try {
					expect(error.data.error).to.be.an('array')
					expect(error.data.error[0].code).to.equal('PasswordOrUserIncorrect');
					done()
				} catch (e) {
					done(e)
				}
			})
		});

		it('Password incorrect', done => {
			//TEST 10	STORY 9
			AuthApi.login(userCredentials.userName, 'passwordFalopa').then( response => {
				done(new Error("Response is 200"));
			}).catch( error =>{
				try {
					expect(error.data.error).to.be.an('array')
					expect(error.data.error[0].code).to.equal('PasswordOrUserIncorrect');
					done()
				} catch (e) {
					done(e)
				}
			})
		});

	});
}
