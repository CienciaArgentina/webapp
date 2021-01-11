import { getColor } from "@theme/utils"
import Link from "next/link"
import styled from "styled-components"
import { UserLogin } from "./UserLogin"

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

export const HeaderMenu = () => (
	<Container>
		<Options>
			<Link href='/buscar'>Buscar</Link>
			<Link href='/reclutar'>Reclutar</Link>
			<Link href='/info'>El proyecto</Link>
		</Options>
		<UserLogin />
	</Container>
)