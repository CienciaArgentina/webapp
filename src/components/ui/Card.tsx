import styled, { css } from "styled-components"
import { MarignSpacerInterface, PaddingSpacerInterface, spacerMargin, spacerPadding } from "./Spacer"

export interface CardStyleProps {
	rounded?: boolean
	outline?: boolean
	padding?: boolean
}

export const CardStyle = ({rounded, outline, padding=true}:CardStyleProps) => css<{}>`
	${padding && `padding: 3rem;`}
	box-sizing: border-box;
	background-color: white;
	box-shadow: ${({theme}) => theme.shadows[0]};
	${rounded && `border-radius: 1rem;`}
	${outline && css`
		border: solid .1rem ${({theme}) => theme.colors["gray-400"]};
	`}
`
interface CardComponentProps extends CardStyleProps, MarignSpacerInterface, PaddingSpacerInterface {}
export const Card = styled.div<CardComponentProps>`
	${CardStyle}
	${spacerPadding}
	${spacerMargin}
`