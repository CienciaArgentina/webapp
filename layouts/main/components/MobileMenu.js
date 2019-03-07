import Link from 'next/link';
const MobileUser = (props) => (
	<div className="MobileMenuUser">
		<div className={`MobileProfilePic`+(props.img ? ' --hasImage':' --noImage')}>
			{props.img ?
				<img src={props.img} />
				:
				<span>{props.fname[0]}</span>
			}
		</div>
		<div className="MobileMenuName">
			<span className="__name">{props.fname} {props.lname}</span>
			<span className="__email">{props.email}</span>
		</div>
	</div>
);
const MobileOption = (props) => (
	<div className="mobile-option">
		<i className={props.icon}></i>
		<span>{props.label}</span>
	</div>
)

const MobileMenu = (props) => (
	<div className={
			"mobile-menu" +
			(props.mobile_menu_display ? " mobile-menu--display" : '') +
			(props.mobile_menu_show ? " mobile-menu--show" : '')
	}>
		<div onClick={props.hideMenu} className="mobile-menu__background"></div>
		<div className="mobile-menu__content">
			{props.canInstallApp ?
				<div onClick={props.installApp} className="mobile-menu__installApp">
					<i className="fab fa-android"></i>
					<span>Instalar App</span>
				</div>	
			: ''}
			<div className="mobile-menu__back">
				<div onClick={props.hideMenu}></div>
			</div>
			<div className="mobile-menu__userCont">
				<MobileUser
					img={false}
					fname={`Matias Nahuel`}
					lname={`Gonzalez Fernandez`}
					id={`1234`}
					email={`matias@mail.com`}
				/>
			</div>
			<div className="mobile-menu__options">
				<div className="mobile-options__list">
					<MobileOption
						icon="fas fa-search"		label="Explorar"
					/>
					<MobileOption
						icon="far fa-star"			label="Favoritos"
					/>
					<MobileOption
						icon="fas fa-edit"			label="Mis postulaciones"
					/>
				</div>
				<div className="mobile-options__list">
					<MobileOption
						icon="fas fa-question-circle"	label="Ayuda"
					/>
					<MobileOption
						icon="fas fa-cog"				label="Configuración"
					/>
					<MobileOption
						icon="fas fa-sign-out-alt"		label="Cerrar sesión"
					/>
				</div>
			</div>
		</div>
	</div>
);

export default MobileMenu;