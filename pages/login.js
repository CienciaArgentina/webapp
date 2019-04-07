import Page from '../layouts/main/main'
import {
	Input,
	APIBase
} from '../components/Science'

import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default class login extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		name: this.props.name
	}
	static async getInitialProps(ctx) {
		// Parse
		const cookies = parseCookies(ctx);
		return {
			name: cookies.loginName
		}
	}
	sendLogin = (event) => {
		event.preventDefault();
		const user = event.target.elements.user.value;
		const password = event.target.elements.password.value;
		//SEND HERE
		//APIBase es la url de base para las apis
		setCookie(false, 'loginName', user, {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
		  });
	}
	render() {
		return(
			<Page>
				<div className="container pt-6">
					<h2>
						La cookie con tu nombre es {this.state.name}. (SSR papu)
					</h2>
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