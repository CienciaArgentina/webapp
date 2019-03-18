import Page from '../layouts/main/main'
import {
	Input,
	APIBase
} from '../components/Science'

export default class login extends React.Component {
	constructor(props) {
		super(props)
	}
	sendLogin = (event) => {
		event.preventDefault();
		const user = event.target.elements.user.value;
		const password = event.target.elements.password.value;
		//SEND HERE
		//APIBase es la url de base para las apis
	}
	render() {
		return(
			<Page>
				<div className="container pt-6">
					<form onSubmit={this.sendLogin}>
						<Input
							label="Nombre de usuario"
							name="user"
						/>
						<Input
							label="Contraseña"
							type='password'
							name="password"
						/>
						<div className="mt-4 ml-2">
							<button>Ingresar</button>
						</div>
					</form>
				</div>
			</Page>
		)
	}
}