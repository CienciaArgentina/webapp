import styled from "styled-components"

const Container = styled.header`
	@media (min-width: 550px) {
		display: none;
	}
	position: fixed;
`

export const MobileHeader = () => (
	<Container>
		Mobile Header
	</Container>
)