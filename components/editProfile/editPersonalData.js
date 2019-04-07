import React from 'react'
import moment from 'moment'

import {
	Input
} from '../Science'

class EditPersonalData extends React.Component {
	state = {
		values: {
			nombre: false,
			apellido: false,
			bday: false,
			sex: false,
			country: false,
			province: false,
			street: false,
			stNumber: false,
			phone: false,
			altMail: false,
			facebook: false,
			twitter: false,
			website: false
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
		this.searchInput.focus(); 
	}
	render() {
		return (
			<div className="formBody">
				<h3>Datos</h3>
				<div className="formSection inputsHalf">
					<Input
						label="Nombre"
						name="nombre"
						value={this.state.values.nombre}
						// helperText="Tu nombre aquí"
						required
						onChange={this.handleChange}
						ref={ (input) => {this.searchInput = input} }
						/>
					<Input
						label="Apellido"
						name='apellido'
						value={this.state.values.apellido}
						required
						onChange={this.handleChange}
					/>
					<Input
						label="Fecha de nacimiento"
						name='bday'
						value={this.state.values.bday}
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
					/>
					<Input
						label="Sexo"
						name='sex'
						value={this.state.values.sex}
						type="select"
						required
						options={(['Femenino','Masculino','Otro'].map((o,k)=>(
							<option key={k} value="a">{o}</option>
						)))}
						onChange={this.handleChange}
					/>
				</div>
				<h3>Dirección</h3>
				<p className="label--s--gray">No compartiremos tu dirección exacta con nadie.</p>
				<div className="formSection inputsHalf">
					<Input
						label='País'
						name='country'
						value={this.state.values.country}
						onChange={this.handleChange}
					/>
					<Input
						label='Provincia'
						name='province'
						value={this.state.values.province}
						onChange={this.handleChange}
					/>
					<Input
						label='Calle'
						name='street'
						value={this.state.values.street}
						onChange={this.handleChange}
					/>
					<Input
						label='Altura'
						name='stNumber'
						value={this.state.values.stNumber}
						onChange={this.handleChange}
					/>
				</div>
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
					/>
					<Input
						label="Correo electrónico de contacto"
						name='altMail'
						value={this.state.values.altMail}
						type="mail"
						placeholder="ejemplo@mail.com"
						validation = {[
							v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v)
							? true : 'Ingresa un correo válido'
						]}
						onChange={this.handleChange}
					/>
					<Input
						label="Facebook"
						name='facebook'
						value={this.state.values.facebook}
						placeholder="tuPerfil"
						preInput="fb.com/"
						onChange={this.handleChange}
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
					/>
					<Input
						label="Sitio web"
						name='website'
						value={this.state.values.website}
						onChange={this.handleChange}
					/>
				</div>
				<button className="bn--green">
					Guardar
				</button>
			</div>
		)
	}
}

export default EditPersonalData;