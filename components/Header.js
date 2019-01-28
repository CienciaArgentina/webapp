import Link from 'next/link';

const Header = (props) => (
	<header>
		<Link href="/">
			<img className="logo" src="/static/img/logos/logo-color.svg" />
		</Link>
		<nav>
			<Link href="/">
				<a>Inicio</a>
			</Link>
			<Link href="/buscar">
				<a>Buscar</a>
			</Link>
			<Link href="/nosotros">
				<a>Quienes somos</a>
			</Link>
			<Link href="/contacto">
				<a>Contacto</a>
			</Link>
			<Link href="/login">
				<button className="login">Ingresar</button>
			</Link>
		</nav>
		<div className="mobile-nav">
			<div className="menu-mobile"></div>
			<div className="logo-mobile">
				<Link href="/">
					<img src="/static/img/logos/icon-color.svg" />
				</Link>
			</div>
			<div className="search-mobile"></div>
		</div>
	</header>
);
export default Header;