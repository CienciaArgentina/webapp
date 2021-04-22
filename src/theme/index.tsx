import { colors } from './colors'
import { shadows } from './shadows'
import { buttons } from './buttons'
import { layout } from './layout'

const themeDefault = {
	colors,
	buttons,
	shadows,
	layout
}

export type ThemeType = typeof themeDefault

export const theme:ThemeType = themeDefault