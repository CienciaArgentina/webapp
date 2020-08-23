import Link from 'next/link';
import { connect } from 'react-redux'

import { logOut } from '../../../src/actions'
import ProfileImage from '../../../components//profile/ProfileImage'

const MobileUser = (props) => (
	<Link href='/profile'>
		<div className="MobileMenuUser">
			<ProfileImage
				name = {props.name}
				img = {props.img}
				size = '6'
			/>
			{/* <div className={`MobileProfilePic`+(props.img ? ' --hasImage':' --noImage')}>
				{props.img ?
					<img src={props.img} />
					:
					<span>{props.name[0]}</span>
				}
			</div> */}
			<div className="MobileMenuName">
				<span className="__name">{props.name} {props.lastName}</span>
				<span className="__email">@{props.userName}</span>
			</div>
		</div>	
	</Link>
)
const MobileOption = (props) => (
	<Link href={props.href} as={props.as ? props.as : props.href}>
		<div onClick={props.hideMenu} className="mobile-option">
			<i className={props.icon}></i>
			<span>{props.label}</span>
		</div>
	</Link>
)

const MobileMenu = props => (
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
				{props.isLogged &&
					<MobileUser
						img={props.userData.personalData.profileImage}
						name={props.userData.personalData.fname}
						lastName={props.userData.personalData.lname}
						id={props.userData.id}
						email={props.userData.personalData.email}
						userName={props.userData.username}
					/>
				}
				{(!props.isLogged && !props.isCreatingProfile) &&
					<Link href='/login'>
						<button onClick={props.hideMenu} className="bn--green ml-3 bn--w2 bn--icon-signIn">
							Ingresar
						</button>
					</Link>
				}
			</div>
			<div className="mobile-menu__options">
				<div className="mobile-options__list">
					<MobileOption
						hideMenu={props.hideMenu}
						href='/search'
						icon="fas fa-search"
						label="Explorar"
					/>
					{props.isLogged && [
						<MobileOption key='profile'
							hideMenu={props.hideMenu}
							href='/profile'
							icon="fas fa-user"
							label="Perfil"
						/>,
						<MobileOption key='fav'
							hideMenu={props.hideMenu}
							href='/myJobs?section=favorites'
							as='/myJobs/favorites'
							icon="far fa-star"
							label="Favoritos"
						/>,
						<MobileOption key='misPostulaciones'
							hideMenu={props.hideMenu}
							href='/myJobs?section=applications'
							as='/myJobs/applications'
							icon="fas fa-edit"
							label="Mis postulaciones"
						/>
					]}
				</div>
				<div className="mobile-options__list">
					<MobileOption
						hideMenu={props.hideMenu}
						href='/'
						icon="fas fa-question-circle"
						label="Ayuda"
					/>
					{props.isLogged ? [
						<MobileOption key='recruit'
							hideMenu={props.hideMenu}
							href='/newJobOffer'
							icon="fas fa-handshake"
							label="Reclutá"
						/>,
						<div
							key='logout'
							onClick={()=>{
								props.hideMenu()
								logOut(props.dispatch)
							}}
							className="mobile-option"
						>
							<i className='fas fa-sign-out-alt'></i>
							<span>Cerrar sesión</span>
						</div>
					]
					:
						<MobileOption
							hideMenu={props.hideMenu}
							href='/search'
							icon="fas fa-share-alt"
							label="Sumá a tu instituto"
						/>
					}
					{props.isCreatingProfile &&
						<div
							key='logout'
							onClick={()=>{
								props.hideMenu()
								logOut(props.dispatch)
							}}
							className="mobile-option"
						>
							<i className='fas fa-sign-out-alt'></i>
							<span>Cerrar sesión</span>
						</div>
					}
				</div>
			</div>
		</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		isLogged: state.user.isLogged,
		userData: state.user.userData,
		isCreatingProfile: state.user.isCreatingProfile
	}
}

export default connect(mapStateToProps)(MobileMenu);