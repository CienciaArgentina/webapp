import React from 'react'
import moment from 'moment'

import {
	Input
} from '../Science'

import {
	UserApi
} from '../../src/api/api'

class EditPersonalData extends React.Component {
	constructor(props) {
		super(props);
		this.inputRefs = {}
		this.state = {
			values: {
				firstName: false,
				lastName: false,
				birthday: false,
				sex: false,
				country: false,
				province: false,
				street: false,
				stNumber: false,
				phone: false,
				facebook: false,
				twitter: false,
				website: false
			}
		}
	}
	countries = {
		arg: {
			name: 'Argentina',
			provinces: {
				bue: 'Buenos Aires',
				cor: 'Córdoba'
			}
		},
		chi: {
			name: 'Chile',
			provinces: {
				ciud: 'Ciudad de Chile',
				otr: 'Otra ciudad'
			}
		}
	}
	handleChange = (x) => {
		const name = x.target.name;
		const value = x.target.value;
		this.setState((prevState)=>{
			let copy = prevState;
			copy.values[name] = value;
			return copy;
		})
	}
	componentDidMount() {
		// this.searchInput.focus();
	}
	_submit = e => {
		e.preventDefault();
		let validForm = true;
		Object.keys(this.inputRefs).map( o => {
			if(this.inputRefs[o].validate().valid == false) {
				validForm = false
			}
		})
		if(validForm) {
			const toSend = {
				firstName: this.state.values.firstName,
				lastName: this.state.values.lastName,
				birthday: this.state.values.birthday,
				sex: this.state.values.sex,
				place: {
					country: this.state.values.country,
					province: this.state.values.province,
					street: this.state.values.street,
					stNumber: this.state.values.stNumber,
				},
				contact: {
					phone: this.state.values.phone,
					facebook: this.state.values.facebook,
					twitter: this.state.values.twitter,
					website: this.state.values.website
				},
			}
			UserApi.editBasicProfile(toSend).then(response => {
				if(this.props.afterSend) {
					this.props.afterSend()
				}
			}).catch(e => {
				console.log(e);
			})
		}
	}
	render() {
		return (
			<form className="profileForm" onSubmit={this._submit}>
				<div className="formBody">
					<h3>Datos</h3>
					<div className="formSection inputsHalf">
						<Input
							label="Nombre"
							name="firstName"
							value={this.state.values.firstName}
							// helperText="Tu nombre aquí"
							required
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.firstName = input} }
						/>
						<Input
							label="Apellido"
							name='lastName'
							value={this.state.values.lastName}
							required
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.lastName = input} }
						/>
						<Input
							label="Fecha de nacimiento"
							name='birthday'
							value={this.state.values.birthday}
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
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.birthday = input} }
						/>
						<Input
							label="Sexo"
							name='sex'
							value={this.state.values.sex}
							type="select"
							required
							options={[
									[0,'Femenino'],
									[1,'Masculino'],
									[2,'Otro'],
								].map((o,k)=>(
									<option key={k} value={o[0]}>{o[1]}</option>
								))
							}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.sex = input} }
						/>
					</div>
					<h3>Dirección</h3>
					<p className="label--s--gray">No compartiremos tu dirección exacta con nadie.</p>
					<div className="formSection inputsHalf">
						<Input
							label='País'
							name='country'
							type='select'
							required
							options={
								Object.keys(this.countries).map((o,k)=>(
									<option key={o} value={o}>{this.countries[o].name}</option>
								))
							}
							value={this.state.values.country}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.country = input} }
						/>
						<Input
							label='Provincia'
							name='province'
							type='select'
							required
							options={
								this.state.values.country ?
									Object.keys(this.countries[this.state.values.country].provinces).map((o,k)=>(
										<option key={o} value={o}>
											{this.countries[this.state.values.country].provinces[o]}
										</option>
									))
								: false
							}
							value={this.state.values.province}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.province = input} }
						/>
						<Input
							label='Calle'
							name='street'
							value={this.state.values.street}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.street = input} }
						/>
						<Input
							label='Altura'
							name='stNumber'
							value={this.state.values.stNumber}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.stNumber = input} }
						/>
					</div>
					{!this.props.ignoreContact &&
						<>
							<h3>Contacto</h3>
							<div className="formSection inputsHalf">
								<Input
									label="Celular"
									name='phone'
									value={this.state.values.phone}
									placeholder="+54 11 2222 2222"
									formatInput={
										{phone:true,phoneRegionCode: 'AR'}
									}
									onChange={this.handleChange}
									ref={ (input) => {this.inputRefs.phone = input} }
								/>
								<Input
									label="Facebook"
									name='facebook'
									value={this.state.values.facebook}
									placeholder="tuPerfil"
									preInput="fb.com/"
									onChange={this.handleChange}
									ref={ (input) => {this.inputRefs.facebook = input} }
								/>
								<Input
									label="Instagram"
									name='instagram'
									value={this.state.values.instagram}
									placeholder="tuPerfil"
									validation={[
										v => /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(v)
										? true : 'Ingresa un usuario válido.'
									]}
									preInput="@"
									onChange={this.handleChange}
									ref={ (input) => {this.inputRefs.instagram = input} }
								/>
								<Input
									label="Twitter"
									name='twitter'
									value={this.state.values.twitter}
									placeholder="tuPerfil"
									validation={[
										v => /^([a-zA-Z0-9_]{1,20})$/.test(v)
										? true : 'Ingresa un usuario válido.'
									]}
									preInput="@"
									onChange={this.handleChange}
									ref={ (input) => {this.inputRefs.twitter = input} }
								/>
								<Input
									label="Sitio web"
									name='website'
									value={this.state.values.website}
									onChange={this.handleChange}
									ref={ (input) => {this.inputRefs.website = input} }
								/>
							</div>
						</>
					}
					<button type='submit' className="bn--green">
						Guardar
					</button>
				</div>
			</form>
		)
	}
}

export default EditPersonalData;