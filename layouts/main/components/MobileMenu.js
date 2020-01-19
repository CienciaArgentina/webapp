import Link from 'next/link';
import { connect } from 'react-redux'

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
				{props.isLogged ?
					<MobileUser
						img={props.userData.personalData.profileImage}
						fname={props.userData.personalData.fname}
						lname={props.userData.personalData.lname}
						id={props.userData.id}
						email={props.userData.personalData.email}
					/>
				:
					<Link href='/login'>
						<button className="bn--green ml-3 bn--w2 bn--icon-signIn">
							Ingresar
						</button>
					</Link>
				}
			</div>
			<div className="mobile-menu__options">
				<div className="mobile-options__list">
					<MobileOption
						icon="fas fa-search"
						label="Explorar"
					/>
					{props.isLogged && [
						<MobileOption key='fav'
							icon="far fa-star"
							label="Favoritos"
						/>,
						<MobileOption key='misPostulaciones'
							icon="fas fa-edit"
							label="Mis postulaciones"
						/>
					]}
				</div>
				<div className="mobile-options__list">
					<MobileOption
						icon="fas fa-question-circle"
						label="Ayuda"
					/>
					{props.isLogged ? [
						<MobileOption key='config'
							icon="fas fa-cog"
							label="Configuración"
						/>,
						<MobileOption key='logout'
							icon="fas fa-sign-out-alt"
							label="Cerrar sesión"
						/>
					]
					:
						<MobileOption
							icon="fas fa-share-alt"
							label="Sumá a tu instituto"
						/>
					}
				</div>
			</div>
		</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		isLogged: state.user.isLogged,
		userData: state.user.userData
	}
}

export default connect(mapStateToProps)(MobileMenu);