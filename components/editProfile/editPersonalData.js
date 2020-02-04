import React from 'react'
import moment from 'moment'

import {
	Input
} from '../Science'

import {
	UserApi,
	GeoApi
} from '../../src/api/api'

class EditPersonalData extends React.Component {
	constructor(props) {
		super(props)
		this.inputRefs = {}
		this.state = {
			submitDisabled: true,
			countries: false,
			provinces: false,
			cities: false,
			localities: false,
			nationalityId: false,
			values: {
				firstName: false,
				lastName: false,
				birthday: false,
				sexId: false,
				country: false,
				province: false,
				city: false,
				locality: false,
				street: false,
				stNumber: false,
				phone: false,
				facebook: false,
				twitter: false,
				website: false
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
		}, () => {
			switch(name){
				case 'country':
					this.updateProvinces()
					break;
				case 'province':
					this.updateCities()
					break;
				case 'city':
					this.updateLocalities()
					break;
				case 'firstName':
					if(this.props.editName) {
						this.props.editName(value)
					}
					break;
			}
		})
	}
	countryChanged = () => {
		this.setState(prevState => {
			let { values } = prevState
			values.province = false
			values.city = false
			values.locality = false
			return {
				values, provinces: false, cities: false, localities: false
			}
		}, this.updateProvinces)
	}
	updateProvinces2 = () => {
		GeoApi.getProvinces(this.state.values.country).then(provinces => {
			this.setState(()=>({provinces}))
		})
	}
	updateProvinces = () => {
		GeoApi.getProvinces(this.state.values.country).then(provinces => {
			this.setState( prevState => {
				return {
					provinces,
					values: {
						...prevState.values,
						// Si solo tengo una provincia la selecciono
						province: provinces.length==1 ? provinces[0].id : false,
						city: false, locality: false
					}
				}
			}, () => { provinces.length==1 ? this.inputRefs.province._forceChange() : false })
		})
	}
	updateCities = () => {
		GeoApi.getCities(this.state.values.province).then(cities => {
			this.setState( prevState => {
				return {
					cities,
					values: {
						...prevState.values,
						// Si solo tengo una provincia la selecciono
						city: cities.length==1 ? cities[0].id : false,
						locality: false
					}
				}
			}, () => { cities.length==1 ? this.inputRefs.city._forceChange() : false })
		})
	}
	provinceChanged = () => {
		this.setState(prevState => {
			let { values } = prevState
			values.city = false
			values.locality = false
			return {
				values, cities: false, localities: false
			}
		}, this.updateCities)
	}
	updateCities2 = () => {
		GeoApi.getCities(this.state.values.province).then(cities => {
			this.setState(()=>({cities}))
		})
	}
	updateLocalities = () => {
		GeoApi.getLocalities(this.state.values.city).then(localities => {
			this.setState( prevState => {
				return {
					localities,
					values: {
						...prevState.values,
						locality: localities.length==1 ? localities[0].id : false
					}
				}
			}, () => { localities.length==1 ? this.inputRefs.locality._forceChange() : false })
		})
	}
	componentDidMount() {
		// this.searchInput.focus();
		GeoApi.getCountries().then(countries => {
			this.setState(()=>({
				countries
			}))
		}).finally(()=>{
			this.setSubmitDisabled(false)
		})
	}
	setSubmitDisabled = submitDisabled => {
		this.setState(()=>({
			submitDisabled
		}))
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
				name: this.state.values.firstName,
				lastName: this.state.values.lastName,
				birthday: moment(this.state.values.birthday, 'D/M/YYYY').format('YYYY-M-D'),
				sexId: this.state.values.sexId,
				nationalityId: this.state.values.nationalityId,
				addres: {
					localityId: this.state.values.locality,
					streetName: this.state.values.street,
					streetNumber: this.state.values.stNumber,
					zipCode: null,
					department: null,
					additionals: null
				},
				socialNetwork: [
					{
						socialNetworkName: 'facebook',
						userName: this.state.values.facebook
					},
					{
						socialNetworkName: 'twitter',
						userName: this.state.values.twitter
					},
					{
						socialNetworkName: 'instagram',
						userName: this.state.values.instagram
					},
					{
						socialNetworkName: 'website',
						url: this.state.values.website
					},
				],
				phone: this.state.values.phone,
				// contact: {
				// 	facebook: this.state.values.facebook,
				// 	twitter: this.state.values.twitter,
				// 	website: this.state.values.website
				// },
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
							name='sexId'
							value={this.state.values.sexId}
							type="select"
							required
							options={[
									[1,'Femenino'],
									[2,'Masculino'],
									[3,'Otro'],
								].map((o,k)=>(
									<option key={k} value={o[0]}>{o[1]}</option>
								))
							}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.sexId = input} }
						/>
						<Input
							label='Nacionalidad'
							name='nationalityId'
							value={this.state.values.nationalityId}
							type='select'
							required
							options={
								this.state.countries ?
									this.state.countries.map((o,k)=>(
										<option key={o.id} value={o.id}>{o.name}</option>
									))
								:
									<option disabled>Cargando</option>

							}
							value={this.state.values.nationalityId}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.nationalityId = input} }
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
								this.state.countries ?
									this.state.countries.filter(o=>o.name==='Argentina').map((o,k)=>(
										<option key={o.id} value={o.id}>{o.name}</option>
									))
								:
									<option disabled>Cargando</option>

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
								this.state.provinces ?
									this.state.provinces.map((o,k)=>(
										<option key={o.id} value={o.id}>
											{o.description}
										</option>
									))
								: false
							}
							value={this.state.values.province}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.province = input} }
						/>
						<Input
							label='Ciudad'
							name='city'
							type='select'
							required
							options={
								this.state.cities ?
									this.state.cities.map((o,k)=>(
										<option key={o.id} value={o.id}>
											{o.description}
										</option>
									))
								: false
							}
							value={this.state.values.city}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.city = input} }
						/>
						<Input
							label='Localidad'
							name='locality'
							type='select'
							required
							options={
								this.state.localities ?
									this.state.localities.map((o,k)=>(
										<option key={o.id} value={o.id}>
											{o.description}
										</option>
									))
								: false
							}
							value={this.state.values.locality}
							onChange={this.handleChange}
							ref={ (input) => {this.inputRefs.locality = input} }
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
							type='number'
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
					<button disabled={this.state.submitDisabled} type='submit' className="bn--green">
						Guardar
					</button>
				</div>
			</form>
		)
	}
}

export default EditPersonalData;