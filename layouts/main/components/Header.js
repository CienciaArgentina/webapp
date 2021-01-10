import Link from 'next/link';
import MobileMenu from './MobileMenu'
import MobileNav from './MobileNav'
import { connect } from 'react-redux'
import PorfileImage from '../../../components/profile/ProfileImage'


const Header = props => (
	<header>
		<Link href="/">
			<a aria-label='Logo Ciencia Argentina'>
				<img alt='Logo Ciencia Argentina' className="logo" src="/static/img/logos/logo-color.svg" />
			</a>
		</Link>
		<nav>
			<Link href="/search">
				<a>Trabajos</a>
			</Link>
			<Link href="/">
				<a>Reclutar</a>
			</Link>
			{props.isLogged ?
				<div className='__userOptions'>
					<Link href='/profile'>
						<a>
							<PorfileImage
								name = {'props.user_data.personalData.fname'}
								img = {false}
								size = '4'
							/>
						</a>
					</Link>
					<div className='__options'>
						{[
							[
								['Laboratorios', '/profile'],
								['Aplicaciones', '/myJobs?section=applications', '/myJobs/applications'],
								['Favoritos', '/myJobs?section=favorites', '/myJobs/favorites'],
							]
						].map((group,kGroup) => (group.map((item,k) => (
							// 
							<Link key={`${kGroup}-${k}`} href={item[1]} as={item[2]?item[2]:item[1]}>
								<div className='__option'>
									{item[0]}
								</div>
							</Link>
						))))}
					</div>
				</div>
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
		isLogged: state.user.isLogged,
		user_data: state.user.user_data
	}
}

export default connect(mapStateToProps)(Header);
