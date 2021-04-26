import { FormError } from "@components/FormError"
import { CardStyle, TextField, Title, Space, Form, SerializedFormEvent } from "@components/ui"
import { Button } from "@components/ui/Button/ButtonComponent"
import Link from "next/link"
import { useRef, useState } from "react"
import styled from "styled-components"

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

	const password_ref = useRef<TextField>(null)

	const handleSubmit:SerializedFormEvent<FormResult> = ( {values} ) => {
		setFormError(null)
		console.log(values.username);
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
								name='username'
								type='text'
								label='Usuario'
								required
								autoComplete={false}
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
							<Button type='submit'>Registrarme</Button>
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