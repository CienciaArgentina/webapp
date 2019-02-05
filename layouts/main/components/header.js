import Link from 'next/link';
import MobileMenu from './mobileMenu'

const MobileNav = (props) => (
	<div className="mobile-nav">
		<div onClick={props.showMenu} className="menu-mobile"></div>
		<div className="logo-mobile">
			<Link href="/">
				<img src="/static/img/logos/icon-color.svg" />
			</Link>
		</div>
		<div className="search-mobile"></div>
	</div>
);


const Header = (props) => (
	<header>
		<Link href="/">
			<img className="logo" src="/static/img/logos/logo-color.svg" />
		</Link>
		<nav>
			<Link href="/">
				<a>Inicio</a>
			</Link>
			<Link href="/about">
				<a>Buscar</a>
			</Link>
			<Link href="/equipo">
				<a>Equipo</a>
			</Link>
			<Link href="/publicar">
				<a>Publicar</a>
			</Link>
			<Link href="/login">
				<button className="login">Ingresar</button>
			</Link>
		</nav>
		<MobileNav
			showMenu={props.showMenu}
		/>
		<MobileMenu
			hideMenu={props.hideMenu}
			mobile_menu_display={props.mobile_menu_display}
			mobile_menu_show={props.mobile_menu_show}
		/>
	</header>
);
export default Header;