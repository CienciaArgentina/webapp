import { colors } from './colors'

type buttonColor = {
	filled: {
		background: string,
		color: string
	},
	outline: {
		outline: string,
		color: string
	}
}

export type buttonColorName = 'blue' | 'green' | 'red' | 'lightblue'

type ButtonsInterface = {
	[colorName in buttonColorName]: buttonColor
}

export const buttons:ButtonsInterface = {
	blue: {
		filled: {
			background: colors.lblue,
			color: 'white',
		},
		outline: {
			outline: colors['gray-400'],
			color: colors.lblue,
		}
	},
	green: {
		filled: {
			background: 'red',
			color: 'white',
		},
		outline: {
			outline: 'color',
			color: 'color',
		}
	},
	red: {
		filled: {
			background: 'red',
			color: 'white',
		},
		outline: {
			outline: 'color',
			color: 'color',
		}
	},
	lightblue: {
		filled: {
			background: 'red',
			color: 'white',
		},
		outline: {
			outline: 'color',
			color: 'color',
		}
	},
}