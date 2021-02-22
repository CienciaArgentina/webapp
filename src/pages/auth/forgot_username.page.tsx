import { FormError } from "@components/FormError"
import { CardStyle, TextField, Title, Space, Form, SerializedFormEvent } from "@components/ui"
import { Button } from "@components/ui/Button/ButtonComponent"
import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
	${CardStyle({rounded:false, outline: true})}
	max-width: 50rem;
	margin: 5rem auto;
	text-align: center;
`

type FormResult = {
	email: string
}

const ForgorUsernamePage = () => {

	const [formError, setFormError] = useState<string|null>(null)

	const handleSubmit:SerializedFormEvent<FormResult> = ( {values:{email}} ) => {
		console.log(email);
	}
	
	return (
		<div>
			<Container>
				<Space>
					<Title level={2}>Olvidé mi usuario</Title>
					<p>Te enviaremos un correo electrónico con tu nombre de usuario.</p>

					<Form serialize onSubmit={handleSubmit}>
						<Space>
							<TextField
								name='email'
								type='email'
								label='Correo'
								required
							/>
							<Button type='submit'>Enviar</Button>
						</Space>
						{formError && <FormError>{formError}</FormError> }
					</Form>

				</Space>
			</Container>
		</div>
	)
}

ForgorUsernamePage.LayoutProps = {
	background: 'white'
}

export default ForgorUsernamePage