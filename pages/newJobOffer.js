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
			sectionActive: 0
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
			onChange={this.handleChange}
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
											label='Física'
											value='fisica'
										/>
										<Checkbox
											label='Química'
											value='quimica'
										/>
										<Checkbox
											label='Biología'
											value='biologia'
										/>
									</CheckboxGroup>
								</div>
							}
							{this.state.sectionActive >= 2 && 
								<div className='__formPart __section'>
								</div>
							}
							{this.state.sectionActive >= 3 && 
								<div className='__formPart __section'>
								</div>
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