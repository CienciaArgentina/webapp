import Page from '../layouts/main/main'
import { Input, Checkbox } from '../components/Science'

export default class newJobOffer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValues: {

			}
		}
		this.inputRefs = {}
	}
	handleChange = (x) => {
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
			ref={ref=>this.inputRefs[props.name]=ref}
			onChange={this.handleChange}
			value = {this.state.inputValues[props.name]}
		/>
	)
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
						<form className='container'>
							<div className='__section'>
								<h2>Proyecto</h2>
								{this.createInput({
									label:'Titulo del proyecto',
									helperText:'Ej: Regulación de la N-glicosilación de proteínas eucariotas.',
									name:'title',
									fullWidth:true,
									required:true
								})}
								{this.createInput({
									label:'Responsable del proyecto',
									name:'responsible',
									fullWidth:true,
									required:true
								})}
								{this.createInput({
									label:'Tema de investigación',
									type:'textarea',
									name:'investigation',
									fullWidth:true,
									required:true
								})}
							</div>
							<div className='__section'>
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
									required:true
								})}
								<p className='mt-4'>A qué carrera/s está apuntada esta búsqueda</p>
								<Checkbox
									label='Física'
								/>
								<Checkbox
									label='Química'
									// checked={false}
								/>
								<Checkbox
									label='Biología'
									// required
								/>
							</div>
						</form>
					</div>
				</div>
			</Page>
		)
	}
}