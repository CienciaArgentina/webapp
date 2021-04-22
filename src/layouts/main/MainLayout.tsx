import { ReactChildren } from "react"
import styled from "styled-components"
import { Header } from "./components/Header"
import { MobileHeader } from "./components/MobileHeader"
import NextNprogress from 'nextjs-progressbar';

interface ContainerProps {
	background?: string
}
const Container = styled.div<ContainerProps>`
	min-height: 100vh;
	box-sizing: border-box;
	padding-top: 7rem;
	@media (max-width: 550px) {
		//mobile
		padding-top: 7rem;
	}
	${({theme, background}) => `
		background: ${background || theme.colors["gray-200"]};
	`}
`

export interface LayoutProps {
	background?: string,
}

interface LayoutInterface extends LayoutProps {
	children: ReactChildren
}

const MainLayout = ({children, background}:LayoutInterface) => {
	return (
		<Container background={background} >
			<NextNprogress
				options={{showSpinner: false}}
			/>
			<Header />
			<MobileHeader />
			<div>
				{children}
			</div>
		</Container>
	)
}


export default MainLayout