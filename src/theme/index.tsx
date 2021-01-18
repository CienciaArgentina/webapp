import { colors } from './colors'
import { shadows } from './shadows'
import { buttons } from './buttons'

const themeDefault = {
	colors,
	buttons,
	shadows
}

export type ThemeType = typeof themeDefault

export const theme:ThemeType = themeDefault