import { FormError } from "@components/FormError"
import { CardStyle, TextField, Title, Space, Form, SerializedFormEvent, Box } from "@components/ui"
import { Button } from "@components/ui/Button/ButtonComponent"
import Link from "next/link"
import { useRef, useState } from "react"
import styled from "styled-components"
import * as UsersApi from '@api/users'
import { ClientError } from "@utils/httpClient"

const LoginContainer = styled.div`
	${CardStyle({rounded:false, outline: true})}
	max-width: 50rem;
	margin: 5rem auto;
	text-align: center;
`

type FormResult = {
	username: string,
	password: string,
	email: string,
	repeat_email: string
}

const RegisterPage = () => {

	const [formError, setFormError] = useState<string|null>(null)
	const [isSending, setSending] = useState<boolean>(false)
	const [registerFinished, setRegisterFinished] = useState<string|false>(false)

	const password_ref = useRef<TextField>(null)

	const handleSubmit:SerializedFormEvent<FormResult> = ( {values} ) => {
		setFormError(null)
		setSending(true)
		const data = {
			username: values.username,
			email: values.email,
			password: values.password
		}
		UsersApi.register(data).then( () => {
			setRegisterFinished(values.email)
			setSending(false)
			
			// LOGIN OK
		}).catch((err:ClientError) => {
			setFormError(err.message)
			setSending(false)
		})
	}

	if(registerFinished) {
		return (
			<Box justify='center' flex>
				<Box flex direction='column' align='center' p={2} pt={15}>
					<Title mb={2} level={2}>¡Gracias por registrarte!</Title>
					<Box>
						Te enviamos un mail de confirmación a <b>{registerFinished}</b>.
					</Box>
				</Box>
			</Box>
		)
	}

	
	return (
		<div>
			<LoginContainer>
				<Space>
					<Title level={2}>Registrate</Title>
					<p>¿Ya tenés cuenta? <Link href='/auth/login'>Ingresá acá.</Link></p>

					<Form serialize onSubmit={handleSubmit}>
						<Space>
							<TextField
								preInputText='@'
								name='username'
								type='text'
								label='Usuario'
								required
								autoComplete={false}
								helperText='Solo letras, números y "_".'
								validations={[
									(v:string) => !!v.match(/^[a-zA-Z0-9]+[a-zA-Z0-9_]*$/) || 'El nombre de usuario posee caracteres inválidos',
									(v:string) => v.length >= 5 || 'El nombre de usuario debe tener 5 caracteres o más',
								]}
							/>
							<TextField
								name='email'
								type='email'
								label='Correo'
								required
								autoComplete={false}
							/>
							<TextField
								name='password'
								type='password'
								label='Contraseña'
								required
								autoComplete={false}
								ref={password_ref}
								validations={[
									(v:string) => (
										(v.toUpperCase() !== v) && (v.toLowerCase() !== v) 
										) || 'Debe tener una minúscula y mayúscula',
									(v:string) => !!v.match(/([0-9])/) || 'Debe contener numeros',
									(v:string) => v.length >= 8 || 'La contraseña debe tener 8 caracteres o más',
								]}
							/>
							<TextField
								name='repeat_password'
								type='password'
								label='Repetir contraseña'
								required
								autoComplete={false}
								validations={[
									v => password_ref.current?.getValue() === v || 'Las contraseñas deben coincidir.'
								]}
							/>
							<Button isLoading={isSending} type='submit'>Registrarme</Button>
						</Space>
						{formError && <FormError>{formError}</FormError>}
					</Form>

				</Space>
			</LoginContainer>
		</div>
	)
}

RegisterPage.LayoutProps = {
	background: 'white'
}

export default RegisterPage