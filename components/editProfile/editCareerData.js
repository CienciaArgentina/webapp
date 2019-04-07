import moment from 'moment'

import {
	Input
} from '../Science'

export default class EditPersonalData extends React.Component {
	constructor(props) {
		super(props);
		this.estudiosCampos = React.createRef()
		this.studyInputs = [];
		this.workInputs = [];
	}
	state = {
		estudios: [],
		works: [],
		formValid: {
			estudios: []
		}
	}
	changeFormStudy = (e, k) => {
		const name = e.target.name;
		let {estudios} = this.state;
		estudios[k][name] = e.target.value;
		this.setState(()=>(
			{estudios}
		));
	}
	changeFormWork = (e, k) => {
		const name = e.target.name;
		let {works} = this.state;
		works[k][name] = e.target.value;
		this.setState(()=>(
			{works}
		));
	}
	onValidChange = (valid, k, name, section) => {
		let validSection = this.state.formValid[section];
		validSection[k][name] = valid
		this.setState(()=>(
			{[section]: validSection}
		))
		
	}
	handleSubmit = () => {
		let isValidForm = true;
		let invalidInputs = []
		for(let i=0; i < this.studyInputs.length; i++) {
			let subSection = this.studyInputs[i];
			for(let k=0; k < Object.keys(subSection).length; k++) {
				const key = Object.keys(subSection)[k]
				const input = subSection[key];
				if(!input.validate()['valid']) {
					isValidForm = false;
					invalidInputs.push(input);
				}
			}
		}
		for(let i=0; i < this.workInputs.length; i++) {
			let subSection = this.workInputs[i];
			for(let k=0; k < Object.keys(subSection).length; k++) {
				const key = Object.keys(subSection)[k]
				const input = subSection[key];
				if(!input.validate()['valid']) {
					isValidForm = false;
					invalidInputs.push(input);
				}
			}
		}
		return {isValidForm, invalidInputs};
	}
	addStudy = () => {
		this.setState((prevState)=>{
			return({
				estudios: prevState.estudios.concat({
					studieType:'grado',
					estado:'inicial',
					carrera: undefined,
					institucion: undefined,
					desde: undefined,
					hasta: undefined
				})
			})
		})
	}
	deleteStudy = (key) => {
		this.setState((prevState)=>({
			estudios: prevState.estudios.filter((o,k)=>k!=key)
		}))
	}
	addWork = () => {
		this.setState((prevState)=> ({
			works: prevState.works.concat({
				workType:'laboratorio',
				institute: undefined,
				rol: undefined,
				description: undefined,
				from: undefined,
				to: undefined
			})
		}));
	}
	deletework = (key) => {
		this.setState((prevState)=>({
			works: prevState.works.filter((o,k)=>k!=key)
		}))
	}
	componentDidMount() {
		this.addStudy()
		this.addWork()
	}
	render() {
		return (
			<div id="formEditCareer" className="formBody">
				<h3>Estudios</h3>
				<div className="formSection">
					<div className="studiesSection" ref={this.estudiosCampos}>
						{this.state.estudios.map((o,k)=>{
							this.studyInputs[k] = {}
							return(
								<div key={k} className="__study">
									<div className="__studyHeader">
										<Input
											label="Nivel de esutdios"
											type="select"
											fullWidth
											required
											options={
												['Primario','Secundario','Grado','Posgrado'].map((o,k)=>(
													<option key={k} value={o.toLowerCase()}>{o}</option>
												))
											}
											onChange={(e) => {this.changeFormStudy(e,k)}}
											name='studieType'
											value={o.studieType}
											ref={(ref)=>this.studyInputs[k].studieType = ref}
										/>
										<i className="fas fa-trash" onClick={()=>{this.deleteStudy(k)}}></i>
									</div>
									<div className="pl-4 inputsHalf mt-4">
										<Input
											label={o.type=='grado'?'Carrera':'Titulo'}
											name='carrera'
											required
											onChange={(e)=>this.changeFormStudy(e,k)}
											value={o.carrera}
											ref={(ref)=>this.studyInputs[k].carrera = ref}
										/>
										<Input
											label="Institución"
											name='institucion'
											required
											onChange={(e)=>this.changeFormStudy(e,k)}
											value={o.institucion}
											ref={(ref)=>this.studyInputs[k].institucion = ref}
										/>
										<Input
											label={o.type=='grado'?'Estado de la carrera':'Estado'}
											name='estado'
											required
											type="select"
											fullWidth
											options={
												['Inicial','Intermedio','Avanzado','Finalizado'].map((o,k)=>(
													<option key={k} value={o.toLowerCase()}>{o}</option>
												))
											}
											onChange={(e) => {this.changeFormStudy(e,k)}}
											value={o.estado}
											ref={(ref)=>this.studyInputs[k].estado = ref}
										/>
										<Input
											label="Desde"
											name='desde'
											required
											formatInput={
												{date: true, datePattern: ['m', 'Y']}
											}
											validation={
												[
													v => /^\d\d\/\d\d\d\d$/.test(v)
														? true : 'Ingresa una fecha válida.',
												]
											}
											placeholder= 'mm/yyyy'
											onChange={(e) => {this.changeFormStudy(e,k)}}
											value={o.desde}
											ref={(ref)=>this.studyInputs[k].desde = ref}
										/>
										<Input
											label="Hasta"
											name='hasta'
											helperText={o.estado!='finalizado'?"Si no finalizaste, podés ingresar una fecha tentativa":false}
											required={o.estado=='finalizado'}
											formatInput={
												{date: true, datePattern: ['m', 'Y']}
											}
											validation={
												[
													v => /^\d\d\/\d\d\d\d$/.test(v)
														? true : 'Ingresa una fecha válida.',
												]
											}
											placeholder= 'mm/yyyy'
											onChange={(e) => {this.changeFormStudy(e,k)}}
											value={o.hasta}
											ref={(ref)=>this.studyInputs[k].hasta = ref}
										/>
									</div>
								</div>
							)
						})}
					</div>
					<button className="bn--text" type="button" onClick={this.addStudy} type='button'>+ Agregar estudio</button>
				</div>
				<h3 className="pt-4">Trabajos</h3>
				<div className="formSection">
					<div>
						{this.state.works.map((o,k) => {
							this.workInputs[k] = {}
							return (
								<div key={k} className=' __work'>
									<div className='__workHeader'>
										<Input
											label="Tipo de trabajo"
											type="select"
											fullWidth
											options={
												['Laboratorio','Doscencia'].map((o,k)=>(
													<option key={k} value={o.toLowerCase()}>{o}</option>
												))
											}
											onChange={(e) => {this.changeFormWork(e,k)}}
											name='workType'
											value={o.workType}
											required
											ref={(ref)=>this.workInputs[k].workType = ref}
										/>
										<i className="fas fa-trash" onClick={()=>{this.deletework(k)}}></i>
									</div>
									<div className='pl-2'>
										<div className='mt-4 inputsHalf'>
											<Input
												required
												label='Nombre del instituto'
												ref={ref => this.workInputs[k].institute = ref}
											/>
											<Input
												required
												label={o.workType=='doscencia'? 'Tu rol cómo doscente' :'Tu rol en el laboratorio'}
												ref={ref => this.workInputs[k].rol = ref}
											/>
										</div>
										<Input
											label='Descripción'
											fullWidth
											name='description'
											ref={ref => this.workInputs[k].description = ref}
										/>
										<div className='mt-4 inputsHalf'>
											<Input
												label="Desde"
												name='desde'
												required
												formatInput={
													{date: true, datePattern: ['m', 'Y']}
												}
												validation={
													[
														v => /^\d\d\/\d\d\d\d$/.test(v)
															? true : 'Ingresa una fecha válida.',
													]
												}
												placeholder= 'mm/yyyy'
												onChange={(e) => {this.changeFormWork(e,k)}}
												value={o.desde}
												ref={ref => this.workInputs[k].desde = ref}
											/>
											<Input
												label="Hasta"
												name='hasta'
												helperText={"Si aún trabajas allí, no completes este campo"}
												required={false}
												formatInput={
													{date: true, datePattern: ['m', 'Y']}
												}
												validation={
													[
														v => /^\d\d\/\d\d\d\d$/.test(v)
															? true : 'Ingresa una fecha válida.',
													]
												}
												placeholder= 'mm/yyyy'
												onChange={(e) => {this.changeFormWork(e,k)}}
												value={o.hasta}
												ref={ref => this.workInputs[k].hasta = ref}
												/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<button className="bn--text" onClick={this.addWork} type='button'>+ Agregar trabajo</button>
				</div>
				<button className="bn--green mt-5" onClick={this.handleSubmit}>
					Guardar
				</button>
			</div>
		)
	}
}