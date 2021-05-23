import { getColor } from '@theme/utils';
import styled, { css } from 'styled-components'

//General input vars
const transitionCurve = '200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms';
const space_top = 2.3;
const space_bottom = .7;
const space_left = 1.2;
const space_right = 1.2;

export const InputError = styled.div`
	color: ${getColor('red-300')};
	margin-top: .5rem;
	font-size: 1.3rem;
	font-weight: 600;
	text-align: left;
	padding-left: ${space_left}rem;
	padding-right: ${space_right}rem;
`

export const InputHelper = styled.div`
	color: ${getColor('gray-600')};
	margin-top: .5rem;
	font-size: 1.3rem;
	font-weight: 600;
	text-align: left;
	padding-left: ${space_left}rem;
	padding-right: ${space_right}rem;
`

interface InputRootProps {
	readonly?: boolean;
}

export const InputRoot = styled.div<InputRootProps>`
	margin: 0;
	padding: 0;
	border: none;
	display: inline-flex;
	position: relative;
	width: 100%;
	flex-direction: column;
	vertical-align: top;
	${({readonly}) => readonly&&css`
		pointer-events: none;
		user-select: none;
	`}
`

export interface InputLabelProps {
	required?: boolean
}

export const InputLabel = styled.div<InputLabelProps>`
	${({required}) => required&&css`
		&:after {
			content: '*';
		}
	`}
`

interface ExtraInputInterface {
	show: boolean
	pre?: boolean
	post?:boolean
}

export const ExtraInput = styled.div<ExtraInputInterface>`
	display: flex;
	${ ({ show }) => !show && 'visibility: hidden;' }
	align-content: center;
	justify-content: center;
	user-select: none;
	pointer-events: none;
	position: absolute;
	bottom: 0;
	${({pre}) => pre && `
		left: 0;
		padding-left: ${space_left}rem;
	`}
	${({post}) => post && `
		right: 0;
		padding-right: ${space_right}rem;
	`}
`

export interface InputContainerProps {
	hasValue: boolean
	error:boolean
	preInputWidth:number
	postInputWidth:number
}

export const InputContainer = styled.div<InputContainerProps>`
	position: relative;
	background-color: ${getColor('gray-50')};
	color: ${getColor('gray-800')};
	box-shadow: 0 0 0 .1rem ${getColor('gray-400')};
	transition: background-color ${transitionCurve}, box-shadow ${transitionCurve};
	border-radius: .5rem;
	overflow: hidden;
	display: flex;
	align-items: flex-end;
	${ExtraInput} {
		padding-bottom: ${space_bottom}rem;
	}
	input, select, textarea {
		font: inherit;
		color: currentColor;
		width: 100%;
		border: 0;
		margin: 0;
		display: block;
		min-width: 0;
		box-sizing: border-box;
		background: none;
		-webkit-tap-highlight-color: transparent;
		padding-top: ${space_top}rem;
		padding-bottom: ${space_bottom}rem;
		padding-left: ${({preInputWidth}) => !!preInputWidth ? preInputWidth/10 + 0.1 : space_left}rem;
		padding-right: ${({postInputWidth}) => !!postInputWidth ? postInputWidth/10 + 0.1 : space_right}rem;
		font-weight: 500;
		min-width: 20.594rem;
		height: 4.6rem;
		&:focus {
			outline: none
		}
	}
	${InputLabel} {
		position: absolute;
		pointer-events: none;
		transition: color ${transitionCurve},transform ${transitionCurve};
		transform: translate(1.2rem, 1.5rem) scale(1);
		transform-origin: top left;
		color: rgba(0, 0, 0, 0.64);
		font-weight: 500;
		z-index: 10;
		top: 0;
		left: 0;
		${({hasValue}) => hasValue&&`transform: translate(12px, 7px) scale(0.75);`}
	}
	&:focus-within {
		box-shadow: 0 0 0 .1rem ${getColor('lblue')};
		${InputLabel} {
			color: ${getColor('lblue')};
			transform: translate(12px, 7px) scale(0.75);
		}
		${ExtraInput} {
			visibility: visible;
		}
	}
	//ERROR STATE
	${({error}) => error && css`
		background-color: ${getColor('red-50')};
		input, select, textarea {
			&:-webkit-autofill,
			&:-webkit-autofill:hover, 
			&:-webkit-autofill:focus, 
			&:-webkit-autofill:active  {
				-webkit-box-shadow: 0 0 0 30rem ${getColor('red-50')} inset !important;
			}
		}
		${InputLabel} {
			color: ${getColor('red-700')};
		}
	`}
`