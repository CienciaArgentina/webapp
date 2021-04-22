import { getColor, colorKey } from "@theme/utils";
import styled, { css } from "styled-components";

interface TextProps {
	color?: colorKey
	weigth?: string
} 

export const Text = styled.p<TextProps>`
	color: ${({color}) => getColor( color || 'gray-800' ) };
	${({weigth}) => weigth&&css`
		font-weight: ${weigth};
	`}
`