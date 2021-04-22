import { css, DefaultTheme } from 'styled-components'
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

export const getGap = ( {theme}:{theme:DefaultTheme}) => css`${theme.layout.col_gap}${theme.layout.spacing_unit}`

export const buildContainer = ({size, padding}:ContainerProps) => css`
	max-width: ${typeof size==='number' ? size : !!size ? max_sizes[size] : max_sizes['l'] }rem;
	${padding && css`padding-left: ${getGap}; padding-right: ${getGap};` }
	margin: 0 auto;
	position: relative;
	box-sizing: border-box;
`