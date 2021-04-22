import { buttonColorName } from '@theme/buttons'
import styled, {css} from 'styled-components'

const ButtonBaseCss = css`
	overflow: hidden;
	letter-spacing: .04rem;
	text-align: center;
	cursor: pointer;
	/* border-radius: 2rem; */
	padding: 1rem 2rem;
	font-size: 1.5rem;
	border: none;
	font-weight: 400;
	position: relative;
	user-select: none;
	&:focus {
		outline: none;
	}
`
const ButtonFilledCss = (color:buttonColorName) => css`
	${ButtonBaseCss}
	${({theme})=> {
		const {background, color:button_color} = theme.buttons[color].filled
		return `
			color: ${button_color};
			background: ${background};
		`
	}}
`
const ButtonOutlineCss = (color:buttonColorName) => css`
	${ButtonBaseCss}
	background-color: transparent;
	${({theme})=> {
		const {outline, color:button_color} = theme.buttons[color]?.outline
		
		return `
			color: ${button_color};
			box-shadow: 0 0 0 .1rem ${outline} inset;
		`
	}}
`

interface ButtonMainInterface {
	disabled?: any;
	isLoading?: boolean;
	type?: any;
	onClick?: any;
	variant: string;
	color: buttonColorName;
}

export const ButtonMain = styled.button<ButtonMainInterface>`
	width: 100%;
	${({variant, color}) => {
		switch (variant) {
			case 'filled':
				return ButtonFilledCss(color)
			case 'outline':
				return ButtonOutlineCss(color)
			default:
				return ButtonFilledCss(color)
		}
	}}

	${({disabled}) => disabled&&'opacity:0.8;cursor:default;'}
	${({isLoading}:ButtonMainInterface)=> isLoading && `pointer-events: none;`}
`

interface ButtonContainerInteface {
	variant: String;
	color: String;
	isLoading?: Boolean;
	fullWidth?: Boolean;
	grow?: Boolean;
}

export const ButtonContainer = styled.div<ButtonContainerInteface>`
	display: inline-flex;
	position: relative;
	${({grow})=> grow && `flex-grow: 1;`}
	${({fullWidth})=> fullWidth && `width: 100%;`}
	${({isLoading}) => isLoading && 'cursor:progress;'}
`

export const ButtonLoading = styled.div`
	position: absolute;
	left: .4rem;
	top: 50%;
	transform: translateY(-50%);
`