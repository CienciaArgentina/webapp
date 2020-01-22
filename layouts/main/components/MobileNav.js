import Link from 'next/link'

const MobileNav = (props) => (
	<div className="mobile-nav">
		<div onClick={props.showMenu} className="menu-mobile"></div>
		<div className="logo-mobile">
			<Link href="/">
				<img alt='Logo Ciencia Argentina' src="/static/img/logos/icon-color.svg" />
			</Link>
		</div>
		<Link href='search'>
			<div className="search-mobile"></div>
		</Link>
	</div>
);

export default MobileNav
