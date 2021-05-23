import { Box, Button, Card, Form, TextField, Title } from '@components/ui'
import { SelectField } from '@components/ui/Input/SelectFiled'
import { StoreState } from "@store/index"
import { useState } from 'react'
import { useSelector } from "react-redux"

interface EditProfileState {
	"name": string,
	"last_name": string,
	"birthdate": string,
	"sex": number,
}

const EditProfile = () => {
	const user = useSelector((state:StoreState) => state.user)
	if(!user.profile){
		return false
	}
	const [formState, setFormState] = useState()

	const sex_options = [
		{value:0, label:'Femenino'},
		{value:1, label:'Masculino'},
		{value:2, label:'Otro'},
		{value:3, label:'Prefieron no informar'},
	]

	return (
		<Box justify='center' flex pt={4}>
			<Card pt={0}>
				<Box flex justify='center' py={3}>
					<Title>
						{user.profile.completed_profile ? 'Editar perfil' : 'Completá tu perfil' }
					</Title>
				</Box>
				<Form>
					<Box cols={2}>
						<TextField name='name' label='Nombre' />
						<TextField name='last_name' label='Apellido' />
						<TextField name='birthdate' label='Fecha de nacimiento' />
						<SelectField name='sex' label='Sexo' options={sex_options} />
					</Box>
					<Box mt={3} flex justify='center'>
						<Button type='submit' text='Guardar' green />
					</Box>
				</Form>
			</Card>
		</Box>
	)
}

export default EditProfile