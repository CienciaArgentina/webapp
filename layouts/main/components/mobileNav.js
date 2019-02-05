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

export default MobileNav