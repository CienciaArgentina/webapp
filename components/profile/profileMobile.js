import Link from 'next/link'

const ProfileMobile = props => (
	<div id='profileMobile'>
		<div className='__main'>
			<div className='__header'>
				<div className='__profileImg'>
					<div className='__container'>
						<label>M</label>
					</div>
				</div>
				<div className='__data'>
					<h2>
						{props.personalData.name} {props.personalData.lastName}
					</h2>
					<div className='mb-1'>
						<label>@{props.account.userName}</label>
					</div>
					<div>
						<label>{props.account.email}</label>
					</div>
				</div>
			</div>
			<div className='__shortcuts'>
				<div>
					<i className="fas fa-briefcase"></i>
					<label>Tabajos</label>
				</div>
				<div>
					<i className="fas fa-landmark"></i>
					<label>Institutos</label>
				</div>
				<div>
					<i className="fas fa-tasks"></i>
					<label>Mi CV</label>
				</div>
			</div>
			<div className='__options'>
				<Link href='/editprofile'>
					<div>
						Editar perfil
					</div>
				</Link>
				<Link href='/editprofile?section=account' as='/editprofile/account'>
					<div>
						Cuenta
					</div>
				</Link>
				<Link href='/editprofile?section=account' as='/editprofile/account'>
					<div>
						Cambiar contraseña
					</div>
				</Link>
				<div className='--red'>
					Cerrar sesión
				</div>
				<div>
					Reclutar
				</div>
			</div>
		</div>
	</div>
)

export default ProfileMobile