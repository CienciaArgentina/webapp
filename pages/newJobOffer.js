import Page from '../layouts/main/main'
import { Input, Checkbox, CheckboxGroup } from '../components/Science'
import classnames from 'classnames'

const FormStage = props => {
	let sections = []
	for(let i=0; i<props.total; i++) {
		sections.push( i <= props.current ? true : false )
	}
	
	return(
		<div className='formStage'>
			<div className='__sectionStageContainer'>
				{sections.map((o,k)=>(
					<div key={k} className='__sectionLineContainer'>
						{k>0 &&
							<div className={classnames('__line', {'--active':o})}></div>
						}
					</div>
				))}
			</div>
			<div className='__sectionStageContainer'>
				{sections.map((o,k)=>(
					<div key={k} className='__sectionDotContainer'>
						<div className={classnames('__dot', {'--active':o})}></div>
					</div>
				))}
			</div>
		</div>
	)
}

export default class newJobOffer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValues: {
				carreras: {
					fisica: false,
					quimica: false,
					biologia: false
				}
			},
			sectionActive: 10
		}
		this.institutes = {
			'id_institute_1': {
				'name': 'Leloir',
				'laboratory': {
					'id_labo_1': {
						'name': 'Biología Celular del RNA',
						'projects': {
							'id_proyect1': 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
							'id_proyect2': 'Deleciones de genes de interés, y complementación de las mismas.',
							'id_proyect3': 'Genes de interés, y complementación de las mismas.'
						}
					},
					'id_labo_2': {
						'name': 'Fisicoquímica de enfermedades infecciosas',
						'projects': {
							'id_proyect4': 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
							'id_proyect5': 'Deleciones de genes de interés, y complementación de las mismas.',
							'id_proyect6': 'Genes de interés, y complementación de las mismas.'
						}
					},
					'id_labo_3': {
						'name': 'Biología Estructural y Celular',
						'projects': {
							'asd': 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
							'asa': 'Deleciones de genes de interés, y complementación de las mismas.',
							'asc': 'Genes de interés, y complementación de las mismas.'
						}
					},
					'id_labo_4': {
						'name': 'Fisiología Molecular de Plantas',
						'projects': {
							'asd': 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
							'asa': 'Deleciones de genes de interés, y complementación de las mismas.',
							'asc': 'Genes de interés, y complementación de las mismas.'
						}
					}
				}
			},
			'asfaa': {
				'name': 'IFIBYNE',
				'laboratory': {
					'asdsa': {
						'name': 'Labo2',
						'projects': {
							'asd': 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
							'asc': 'Genes de interés, y complementación de las mismas.'
						}
					},
				}
			},
		}
		this.inputRefs = [
			{},
			{},
			{},
			{},
		]
	}
	nextSection = () => {
		let valid = true
		for(let i = 0; i<=this.state.sectionActive; i++) {
			Object.values(this.inputRefs[i]).map((o,k)=>{
				valid = o.validate().invalid ? false : valid
			})
		}
		if(valid) {
			this.setState(prevState => ({
				sectionActive: 1 + prevState.sectionActive
			}))
		}
	}
	handleChange = x => {
		const name = x.target.name;
		const value = x.target.value;
		this.setState((prevState)=>{
			let copy = prevState;
			copy.inputValues[name] = value;
			return copy;
		})
	}
	createInput = props => (
		<Input
			{...props}
			ref={ref=>this.inputRefs[props.formSection][props.name]=ref}
			onChange={e => {
				if(props.onChange){
					props.onChange(e)
				}
				this.handleChange(e)
			}}
			value = {this.state.inputValues[props.name]}
		/>
	)
	handleSubmit = e => {
		e.preventDefault()
		let valid = true
		for(let i = 0; i<this.inputRefs.length; i++) {
			Object.values(this.inputRefs[i]).map((o,k)=>{
				valid = o.validate().invalid ? false : valid
			})
		}
		if(valid) {
			alert('Se mando')
			console.log(this.state.inputValues);
			
		}
	}
	render() {
		return (
			<Page contentClass="bg--gray">
				<div id='newJobOffer'>
					<div className='__header'>
						<div className='__background'></div>
						<div className='__content'>
							<h1>Crea una nueva búsqueda</h1>
							<p>Creá una oferta de tesis, doctorado o posdoctorado en minutos.</p>
						</div>
					</div>
					<div className='__formContainer'>
						<form className='container' onSubmit={this.handleSubmit}>
							{this.state.sectionActive >= 0 &&
								<div className='__formPart __section'>
									<h2>Proyecto</h2>
									{this.createInput({
										label:'Título del proyecto',
										helperText:'Ej: Regulación de la N-glicosilación de proteínas eucariotas.',
										name:'title',
										fullWidth:true,
										required:true,
										formSection: 0
									})}
									{this.createInput({
										label:'Responsable del proyecto',
										name:'responsible',
										fullWidth:true,
										required:true,
										formSection: 0
									})}
									{this.createInput({
										label:'Tema de investigación',
										type:'textarea',
										name:'investigation',
										fullWidth:true,
										required:true,
										formSection: 0
									})}
									{this.createInput({
										label:'Técnicas a utilizar y modelo experimental',
										type:'textarea',
										name:'tecnicas',
										fullWidth:true,
										required:true,
										formSection: 0
									})}
								</div>
							}
							{this.state.sectionActive >= 1 && 
								<div className='__formPart __section'>
									<h2>Tipo de búsqueda</h2>
									{this.createInput({
										label:'Tipo de búsqueda',
										name:'type',
										type:'select',
										options:[
											[0,'Pasantía'],
											[1,'Tesina'],
											[2,'Doctorado'],
											[3,'Posdoctorado'],
										].map((o,k)=>( <option key={k} value={o[0]}>{o[1]}</option> )),
										required:true,
										formSection: 1
									})}
									<CheckboxGroup
										label='A qué carrera/s está apuntada esta búsqueda'
										onChange={this.handleChange}
										ref={ref=>this.inputRefs[1].carreras = ref}
										name='carreras'
										value={this.state.inputValues.carreras}
										helperText='Selecciona al menos una.'
										className='mt-4'
										validation={[
											v => Object.values(v).filter(v=>v).length > 0 ? true : 'Debes seleccionar al menos una carrera.'
										]}
									>
										<Checkbox
											label='Biología'
											value='biologia'
										/>
										<Checkbox
											label='Física'
											value='fisica'
										/>
										<Checkbox
											label='Química'
											value='quimica'
										/>
										<Checkbox
											label='Sociología'
											value='sociologia'
										/>
										<Checkbox
											label='Computación'
											value='computacion'
										/>
										<Checkbox
											label='Antropología'
											value='antropologia'
										/>
										<Checkbox
											label='Meteorología'
											value='meteorologia'
										/>
										<Checkbox
											label='Paleontología'
											value='paleontologia'
										/>
									</CheckboxGroup>
								</div>
							}
							{this.state.sectionActive >= 2 && 
								<div className='__formPart __section'>
									<h2>Instituto</h2>
									<p>A que instituto pertenece esta búsqueda.</p>
									{this.createInput({
										helperText: 'Solo aparecen los institutos de los que formas parte.',
										label:'Nombre del instituto',
										name:'instituteName',
										type:'select',
										options:Object.entries(this.institutes).map((o,k)=>(
											<option key={k} value={o[0]}>{o[1].name}</option>
										)),
										required:true,
										formSection: 2,
										fullWidth:true,
										onChange: ()=>{
											this.setState(prevState=>{
												let copy = prevState;
												copy.inputValues.labName = undefined;
												copy.inputValues.project = undefined;
												return copy;
											})
										}
									})}
									<br/>
									{this.createInput({
										label:'Laboratorio',
										name:'labName',
										type:'select',
										options:(
											this.state.inputValues.instituteName&&
											Object.entries(
												this.institutes[this.state.inputValues.instituteName].laboratory
												//for each lab on the selected institute
											).map((o,k)=>(
												<option key={k} value={o[0]}>{o[1].name}</option>
											))
										),
										required:true,
										formSection: 2,
										fullWidth:true,
										onChange: ()=>{
											this.setState(prevState=>{
												let copy = prevState;
												copy.inputValues.project = undefined;
												return copy;
											})
										}
									})}
									<br/>
									{this.createInput({
										label:'Línea de investigación',
										name:'project',
										type:'select',
										// options:[
										// 	[0,'Mutaciones y deleciones de genes de interés, y complementación de las mismas.'],
										// 	[1,'Deleciones de genes de interés, y complementación de las mismas.'],
										// 	[2,'Mutaciones y deleciones de genes de interés, y complementación de las mismas.'],
										// 	[3,'Deleciones de genes de interés, y complementación de las mismas.'],
										// ].map((o,k)=>( <option key={k} value={o[0]}>{o[1]}</option>)),
										options:(
											this.state.inputValues.instituteName&&
											this.state.inputValues.labName&&
											Object.entries(
												this.institutes[this.state.inputValues.instituteName].
												laboratory[this.state.inputValues.labName].projects
											).map((o,k)=>(
												<option key={k} value={o[0]}>{o[1]}</option>
											))
										),
										required:true,
										formSection: 2,
										fullWidth:true
									})}
								</div>
							}
							{this.state.sectionActive >= 3 &&
								<>
								<div className='__formPart __section'>
									<h2>Beca</h2>
									{this.createInput({
										label:'Tipo de beca',
										name:'scholarshipType',
										type:'select',
										options:[
											['no','Sin beca'],
											['conicet','CONICET'],
											['agencia','Agencia'],
										].map((o,k)=>( <option key={k} value={o[0]}>{o[1]}</option> )),
										required:true,
										formSection: 3,
										onChange: e => {
											if(!(e.target.value=='conicet'||e.target.value=='agencia')){
												this.setState(prev=>{
													let copy = prev
													copy.inputValues.salary = undefined
													return copy
												})
											}
										}
									})}
									{this.createInput({
										label:'Estipendo',
										name:'salary',
										type:'number',
										preInput: 'AR$ ',
										required: false,
										formSection: 3,
										inputProps:{
											disabled: !(this.state.inputValues.scholarshipType && (
												this.state.inputValues.scholarshipType=='conicet'||
												this.state.inputValues.scholarshipType=='agencia'
											))
										}
									})}
								</div>
								<div className='__formPart __section'>
									<h2>Requisitos</h2>
									{this.createInput({
										label:'Experiencia en laboratorio',
										name:'experience',
										type:'select',
										options:[
											[0,'No requerida'],
											[1,'Preferente'],
											[2,'Obligatoria'],
										].map((o,k)=>( <option key={k} value={o[0]}>{o[1]}</option> )),
										required:true,
										formSection: 3,
										halfWidth:true
									})}
									{this.createInput({
										label:'Estado de la carrera',
										name:'carreerState',
										type:'select',
										options:[
											[0,'Intermedio (50%)'],
											[1,'Avanzada (70%)'],
											[2,'Finalizada'],
										].map((o,k)=>( <option key={k} value={o[0]}>{o[1]}</option> )),
										required:true,
										formSection: 3,
										halfWidth:true
									})}
								</div>
								</>
							}
							<div className='__formControls mt-6'>
								<div className='__formStageCont'>
									<FormStage current={this.state.sectionActive} total={this.inputRefs.length} />
								</div>
								<div className='__formAction'>
									{this.state.sectionActive < this.inputRefs.length-1 ?
										<button type='button' onClick={this.nextSection}>Siguiente</button>
									:
										<div>
											<button type='submit'>Enviar</button>
										</div>
									}
								</div>
							</div>
							{/*
							<div className='__section'>
							</div>
							*/}
						</form>
					</div>
				</div>
			</Page>
		)
	}
}