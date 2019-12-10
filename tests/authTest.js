import { expect } from 'chai'
import { AuthApi } from '../src/api/api'
import {AsyncTest, user} from './testTools'
import axiosInstance from '../src/api/utils/axiosInstance'

export const authTest = () => {
	describe('Register test', () => {

		//TEST 26	STORY 6
		it('Invalid password', done => {
			AsyncTest({
				done,
				f: AuthApi.register,
				args: ['newUser', 'new@email.com', 'a'],
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
				args: ['newUser', 'new@email.com', 'A1*1A11A'],
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
				args: [user.user.userName, 'new@email.com', user.user.password],
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
				args: ['newUser', user.user.email, user.user.password],
				expect: 'catch',
				test: response => {
					expect(response.data.error).to.be.an('array')
					expect(response.data.error[0].code).equals('DuplicateEmail')
				}
			})
		})

		it('Delete user', done => {
			axiosInstance.delete(`/Accounts/${user.notConfirmed.userName}`).then(response => {
				done()
			}).catch(response => {
				try {
					expect(response.data.error[0].code).to.equal('PasswordOrUserIncorrect')
					done()
				} catch(err) {
					const e = JSON.stringify(err)
					done(new Error(e))
				}
			})
		})

		// TEST X	STORY X
		it('Success register', done => {
			AsyncTest({
				done,
				f: AuthApi.register,
				args: [user.notConfirmed.userName, user.notConfirmed.email, user.notConfirmed.password],
				expect: 'then',
				test: response => {
					expect(response.success).to.equal(true)
				}
			})
		})


	})

	describe('Login test', () => {

		//TEST 5	STORY 9
		it('Login successful', done => {
			AsyncTest({
				done,
				f: AuthApi.login,
				args: [user.user.userName, user.user.password],
				expect: 'then',
				test: response => {
					expect(response.data).to.have.keys(['jwtToken', 'email'])
					expect(response.data.email).is.equal(user.user.email)
				}
			})
		})

		//TEST 6	STORY 9
		it('Email not confirmed', done => {
			AsyncTest({
				done,
				f: AuthApi.login,
				args: [user.notConfirmed.userName, user.notConfirmed.password],
				expect: 'catch',
				test: response => {
					expect(response.data.error[0].code).to.equal('EmailNotConfirmed')
					expect(response.data.data.email).to.equal(user.notConfirmed.email)
				}
			})
		})

		//TEST 7	STORY 9
		it('User incorrect', done => {
			AsyncTest({
				done,
				f: AuthApi.sendForgotPassword,
				args: ['usuarioFalso', user.user.password],
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
				args: [user.user.userName, 'incorrectPassword'],
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
				args: [user.notConfirmed.email],
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
				args: [user.user.email],
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
				args: [user.notConfirmed.email],
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
				args: [user.user.email],
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