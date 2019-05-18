import Link from 'next/link';
import MobileMenu from './MobileMenu'
import MobileNav from './MobileNav'
import { connect } from 'react-redux'


const Header = (props) => (
	<header>
		<Link href="/">
			<a>
				<img className="logo" src="/static/img/logos/logo-color.svg" />
			</a>
		</Link>
		<nav>
			<Link href="/">
				<a>Trabajos</a>
			</Link>
			<Link href="/">
				<a>Reclutar</a>
			</Link>
			{props.isLogged ?
				<Link href="/login">
					<button className="login">Perfil</button>
				</Link>
			:
				<Link href="/login">
					<button className="login">Ingresar</button>
				</Link>
			}
		</nav>
		<MobileNav
			showMenu={props.showMenu}
		/>
		<MobileMenu
			canInstallApp={props.canInstallApp}
			installApp={props.installApp}
			hideMenu={props.hideMenu}
			mobile_menu_display={props.mobile_menu_display}
			mobile_menu_show={props.mobile_menu_show}
		/>
	</header>
);
const mapStateToProps = (state) => {
	return {
		isLogged: state.isLogged,
		userData: state.userData
	}
}

export default connect(mapStateToProps)(Header);
