import { getColor } from "@theme/utils"
import Link from "next/link"
import styled from "styled-components"
import { UserLogin } from "./UserLogin"
import {StoreState} from '@store/index'
import { useSelector } from "react-redux"
import { Avatar } from "@components/user/Avatar"
import { UserProfile } from "@utils/api/user_profiles"
import { FunctionComponent } from "react"

const Container = styled.div`
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	height: 100%;
	align-items: center;
`
const Options = styled.div`
	position: relative;
	display: flex;
	height: 100%;
	align-items: center;
	a {
		margin-right: 3rem;
		color: ${getColor('gray-800')};
		height: 100%;
		display: flex;
		align-items: center;
		text-decoration: none;
		cursor: pointer;
	}
`

const Option = styled.div`
	position: relative;
	padding: 1rem;
	flex-shrink: 0;
	box-sizing: border-box;
	cursor: pointer;
	width: 15rem;
	background-color: white;
	&:hover {
		background-color: ${getColor('gray-50')};
	}
`

const HeaderAvatarOptions = styled.div`
	display: none;
	flex-direction: column;
	position: absolute;
	background-color: white;
	right: 0;
	box-sizing: border-box;
	margin-top: 3.2rem;
	top: 50%;
	box-shadow: ${({theme}) => theme.shadows[4]};
	&:after {
		content: '';
		position: absolute;
		background-color: none;
		width: 4rem;
		height: 3rem;
		right: 0;
		transform: translateY(-100%);
	}
	&:before {
		box-shadow: ${({theme}) => theme.shadows[4]};
		content: '';
		position: absolute;
		background-color: white;
		width: 1.5rem;
		height: 1.5rem;
		top: 0;
		right: 1.3333rem;
		transform: translateY(-48%) rotate(45deg);
		pointer-events: none;
	}
`

const HeaderAvatarContainer = styled.div`
	position: relative;
	margin-right: 3rem;
	&:hover {
		${HeaderAvatarOptions} {
			display: flex;
		}
	}
`

const HeaderAvatar:FunctionComponent<{profile:UserProfile}> = ({profile}) => (
	<HeaderAvatarContainer>
		<HeaderAvatarOptions>
			<Link href='/profile/institutes'>
				<Option>Mis Institutos</Option>
			</Link>
			<Link href='/profile/postulations'>
				<Option>Mis postulaciones</Option>
			</Link>
			<Link href='/profile/offers'>
				<Option>Mis ofertas</Option>
			</Link>
			<Option><b>Cerrar sesión</b></Option>
		</HeaderAvatarOptions>
		<Avatar href='/profile' name={profile.username}/>
	</HeaderAvatarContainer>
)

export const HeaderMenu = () => {
	const user = useSelector((state:StoreState) => state.user)
	return (
		<Container>
			<Options>
				<Link href='/buscar'>Buscar</Link>
				<Link href='/reclutar'>Reclutar</Link>
				<Link href='/info'>El proyecto</Link>
			</Options>
			{user.is_logged?
				<HeaderAvatar profile={user.profile}/>
			:
				<UserLogin />
			}
		</Container>
	)
}