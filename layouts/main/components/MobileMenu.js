import Link from 'next/link';

const MobileMenu = (props) => (
	<div className={
			"mobile-menu" +
			(props.mobile_menu_display ? " mobile-menu--display" : '') +
			(props.mobile_menu_show ? " mobile-menu--show" : '')
	}>
		<div onClick={props.hideMenu} className="mobile-menu__background"></div>
		<div className="mobile-menu__content">
			asd
		</div>
	</div>
);

export default MobileMenu;
