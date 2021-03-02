import { getColor } from "@theme/utils"
import Link from "next/link"
import styled from "styled-components"
import { UserLogin } from "./UserLogin"
import {StoreState} from '@store/index'
import { useSelector } from "react-redux"
import { Avatar } from "@components/user/avatar"

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
				<Avatar href='/profile' profile={user.profile} mr={3}/>
			:
				<UserLogin />
			}
		</Container>
	)
}