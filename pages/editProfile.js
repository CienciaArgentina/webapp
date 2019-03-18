import React from 'react'
import Page from '../layouts/main/main'

import Link from 'next/link'

import moment from 'moment'
// import 'moment/locale/es'

import {
	Input
} from '../components/Science'


class editProfile extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		nombre: false,
	}
	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		this.setState(()=>({
			[name]: value
		}))
	}
	render() {
		return (
			<Page>
				<div id="editProfile">
					<div className="editProfile__menu">
						<div className="__menuMain">
							{[
								['fas fa-user','Información básica'],
								['fas fa-graduation-cap','Carrera'],
								['fas fa-tasks','Intereses'],
								['fas fa-cog','Cuenta'],
							].map( (o,k) =>(
								<div className="__menuItem" key={k}>
									<Link href={`/editProfile/${k}`}>
										<a>
											<div>
												<i className={o[0]}></i>
												<span>{o[1]}</span>
											</div>
										</a>
									</Link>
								</div>
							))}
						</div>
					</div>
					<div className="mainEdit">
						<form className="profileForm">
							<div className="formSection">
								<Input
									label="Nombre"
									name="nombre"
									// helperText="Tu nombre aquí"
									required
									onChange={this.handleChange}
									/>
								<Input
									label="Apellido"
									required
								/>
								<Input
									label="Fecha de nacimiento"
									required
									formatInput={
										{date: true, datePattern: ['d', 'm', 'Y']}
									}
									validation={
										[
											v => /^\d\d\/\d\d\/\d\d\d\d$/.test(v)
												? true : 'Completa tu fecha de nacimiento.',
											v => moment().diff(moment(v,'DD/MM/YYYY'),'Years') >= 18
												? true : 'Debes ser mayor de 18.',
										]
									}
									placeholder= 'dd/mm/yyyy'
								/>
								<Input
									label="Sexo"
									type="select"
									required
									options={(['Femenino','Masculino','Otro'].map((o,k)=>(
										<option key={k} value="a">{o}</option>
									)))}
								/>
							</div>
							<h3>Dirección</h3>
							<p className="label--m--gray">No compartiremos tu dirección exacta con nadie.</p>
							<div className="formSection">
								<Input
									label='País'
								/>
								<Input
									label='Provincia'
								/>
								<Input
									label='Calle'
								/>
								<Input
									label='Altura'
								/>
							</div>
							<h3>Contacto</h3>
							<div className="formSection">
								<Input
									label="Celular"
									placeholder="+54 11 2222 2222"
									formatInput={
										{phone:true,phoneRegionCode: 'AR'}
									}
								/>
								<Input
									label="Research Gate"
								/>
								<Input
									label="Facebook"
									placeholder="tuPerfil"
									preInput="fb.com/"
								/>
								<Input
									label="Instagram"
									placeholder="tuPerfil"
									validation={[
										v => /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(v)
										? true : 'Ingresa un usuario válido.'
									]}
									preInput="@"
								/>
								<Input
									label="Twitter"
									placeholder="tuPerfil"
									validation={[
										v => /^([a-zA-Z0-9_]{1,20})$/.test(v)
										? true : 'Ingresa un usuario válido.'
									]}
									preInput="@"
								/>
								<Input
									label="Sitio web"
								/>
							</div>
							<button className="bn--green">
								Guardar
							</button>
						</form>
					</div>
				</div>
			</Page>
		)
	}
}
export default editProfile;