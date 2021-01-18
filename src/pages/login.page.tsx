import { CardStyle, TextField, Title, Space, Form, SerializedFormEvent } from "@components/ui"
import { Button } from "@components/ui/Button/ButtonComponent"
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

	const handleSubmit:SerializedFormEvent<FormResult> = ( {values} ) => {
		console.log(values);
	}
	
	return (
		<div>
			<LoginContainer>
				<Space>
					<Title level={2}>Ingresá a Ciencia</Title>
					<p>¿No tenés cuenta? <a href='/register'>Registrate acá</a></p>

					<Form serialize onSubmit={handleSubmit}>
						<Space>
							<TextField
								name='username'
								type='text'
								label='Usuario'
								required
								validations = {[
									value => value=='1234' || '¡El valor debe ser 1234!'
								]}
							/>
							<TextField
								name='password'
								type='password'
								label='Contraseña'
								required
							/>
							<Button>Ingresar</Button>
						</Space>
					</Form>

					<div><a href='/reset/password'>Olvide mi contraseña</a></div>

					<div><a href='/reset/username'>Olvidé mi usuario</a></div>

				</Space>
			</LoginContainer>
		</div>
	)
}

LoginPage.LayoutProps = {
	background: 'white'
}

export default LoginPage