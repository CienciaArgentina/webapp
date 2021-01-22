import { getColor } from "@theme/utils"
import { FunctionComponent } from "react"
import styled from "styled-components"

const Container = styled.div`
	margin: 2rem 0;
	padding: 1rem;
	text-align: left;
	background-color: ${getColor('red-50')};
	color: ${getColor('red-800')};
`

export const FormError:FunctionComponent = ({children}) => <Container>{children}</Container>