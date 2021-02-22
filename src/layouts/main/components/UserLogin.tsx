import Link from "next/link"
import styled from "styled-components"
import { getColor } from '@theme/utils'

const Container = styled.div`
	height: 100%;
	
`

const Login = styled.div`
	height: 100%;
	padding: 0 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${getColor('lblue')} ;
	color: white;
	cursor: pointer;
`

export const UserLogin = () => {
	return (
		<Container>
			<Link href='/auth/login'>
				<Login>Ingresar</Login>
			</Link>
		</Container>
	)
}