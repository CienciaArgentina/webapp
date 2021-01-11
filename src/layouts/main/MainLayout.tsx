import { ReactChildren } from "react"
import styled from "styled-components"
import { Header } from "./components/Header"
import { MobileHeader } from "./components/MobileHeader"

const Container = styled.div`
	background-color: gray;
	min-height: 100vh;
`

interface LayoutProps {
	children: ReactChildren
}

const MainLayout = ({children}:LayoutProps) => {
	return (
		<Container>
			<Header />
			<MobileHeader />
			<div>
				{children}
			</div>
		</Container>
	)
}


export default MainLayout