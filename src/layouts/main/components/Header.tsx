import styled from "styled-components"
import Link from 'next/link'
import { HeaderMenu } from "./HeaderMenu"

const Container = styled.header`
	@media (max-width: 550px) {
		display: none;
	}
	display: flex;
	position: fixed;
	background-color: white;
	box-sizing: border-box;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 7rem;
	top: 0;
	left: 0;
	box-shadow: ${({theme}) => theme.shadows[1]}
`
const Logo = styled.img`
	height: 50%;
	margin-left: 2rem;
	cursor: pointer;
`

export const Header = () => (
	<Container>
		<Link href='/'>
			<Logo src='/img/logos/logo-color.svg' alt='Ciencia Argentina' />
		</Link>
		<HeaderMenu/>
	</Container>
)