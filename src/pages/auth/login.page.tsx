import { FormError } from "@components/FormError"
import { CardStyle, TextField, Title, Space, Form, SerializedFormEvent } from "@components/ui"
import { Button } from "@components/ui/Button/ButtonComponent"
import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import * as UsersApi from '@api/users'
import { ClientError } from "@utils/httpClient"
import Link from "next/link"
import { setCookie } from "nookies"

const LoginContainer = styled.div`
	${CardStyle({rounded:false, outline: true})}
	max-width: 50rem;
	margin: 5rem auto;
	text-align: center;
`

type FormResult = {
	username: string,
	password: string
}

const resendConfirmEmail = (email:string, setFormError:Function) => () => {
	setFormError('Enviando...')
	UsersApi.sendConfirmationEmail(email).finally(() => {
		setFormError(`Correo enviado a ${email}.`)
	})
}

const LoginPage = () => {
	const [formError, setFormError] = useState<FunctionComponent|string|null>(null)
	const [sending, setSending] = useState<boolean>(false)

	const handleSubmit:SerializedFormEvent<FormResult> = ( {values} ) => {
		setFormError(null)
		setSending(true)
		UsersApi.login({username: values.username, password: values.password}).then(response => {
			const jwt = response.jwt
			console.log(jwt);
			setCookie(null, 'authToken',jwt, {
				maxAge: 2 * 24 * 60 * 60,
				path: '/',
			})
			setSending(false)
			location.replace('/')
			// LOGIN OK
		}).catch((err:ClientError) => {
			if(err.errors?.[0].code == 'email_not_verified') {
				setFormError( () => <>
					{err.message} <Button onClick={resendConfirmEmail(err.errors[0].detail, setFormError)}>Reenviar correo</Button>
				</>)
			} else {
				setFormError(err.message);
			}
			setSending(false)
		})
	}
	
	return (
		<div>
			<LoginContainer>
				<Space>
					<Title level={2}>Ingresá a Ciencia</Title>
					<p>¿No tenés cuenta? <Link href='/auth/register'>Registrate acá.</Link></p>

					<Form serialize onSubmit={handleSubmit}>
						<Space>
							<TextField
								name='username'
								type='text'
								label='Usuario'
								required
							/>
							<TextField
								name='password'
								type='password'
								label='Contraseña'
								required
							/>
							<Button type='submit' isLoading={sending}>Ingresar</Button>
						</Space>
						{formError && <FormError>{formError}</FormError> }
					</Form>

					<div><Link href='/auth/reset_password'>Olvide mi contraseña</Link></div>

					<div><Link href='auth/reset_username'>Olvidé mi usuario</Link></div>

				</Space>
			</LoginContainer>
		</div>
	)
}

LoginPage.LayoutProps = {
	background: 'white'
}

export default LoginPage