import { FormError } from "@components/FormError"
import { CardStyle, TextField, Title, Space, Form, SerializedFormEvent } from "@components/ui"
import { Button } from "@components/ui/Button/ButtonComponent"
import { useState } from "react"
import styled from "styled-components"

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

const LoginPage = () => {
	const [formError, setFormError] = useState<string|null>(null)

	const handleSubmit:SerializedFormEvent<FormResult> = ( {values} ) => {
		console.log(values);
	}
	
	return (
		<div>
			<LoginContainer>
				<Space>
					<Title level={2}>Ingresá a Ciencia</Title>
					<p>¿No tenés cuenta? <a href='/auth/register'>Registrate acá.</a></p>

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
							<Button type='submit'>Ingresar</Button>
						</Space>
						{formError && <FormError>{formError}</FormError> }
					</Form>

					<div><a href='auth//reset_password'>Olvide mi contraseña</a></div>

					<div><a href='auth//reset_username'>Olvidé mi usuario</a></div>

				</Space>
			</LoginContainer>
		</div>
	)
}

LoginPage.LayoutProps = {
	background: 'white'
}

export default LoginPage