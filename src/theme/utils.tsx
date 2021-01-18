import { css } from 'styled-components'
import {ThemeType} from './index'

export type colorKey = keyof ThemeType['colors']

export const getColor = (color:colorKey) => css`${({theme}) => theme.colors[color]}`