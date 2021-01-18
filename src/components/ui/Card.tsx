import styled, { css } from "styled-components"

export interface CardStyleProps {
	rounded?: boolean
	outline?: boolean
}

export const CardStyle = ({rounded, outline}:CardStyleProps) => css<{}>`
	padding: 3rem;
	box-sizing: border-box;
	background-color: white;
	box-shadow: ${({theme}) => theme.shadows[0]};
	${rounded && `border-radius: 1rem;`}
	${outline && css`
		border: solid .1rem ${({theme}) => theme.colors["gray-400"]};
	`}
`

export const Card = styled.div<CardStyleProps>`
	${CardStyle}
`