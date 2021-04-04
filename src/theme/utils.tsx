import { css } from 'styled-components'
import {ThemeType} from './index'

export type colorKey = keyof ThemeType['colors']

export const getColor = (color:colorKey) => css`${({theme}) => theme.colors[color]}`


interface ContainerProps {
	size?: 'l' | 'm' | 's' | number	
	padding?:boolean
}

const max_sizes = {
	l: '100',
	m: '70',
	s: '20'
}

export const buildContainer = ({size, padding}:ContainerProps) => css`
	max-width: ${typeof size==='number' ? size : !!size ? max_sizes[size] : max_sizes['l'] }rem;
	${padding && 'padding-left: 1rem; padding-right: 1rem;' }
	margin: 0 auto;
	position: relative;
	box-sizing: border-box;
`