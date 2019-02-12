import Link from 'next/link';
import MobileMenu from './MobileMenu'
import MobileNav from './MobileNav'


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