interface LayoutInterface {
	spacing: number
	spacing_unit: 'rem'|'px'|'em'
	col_gap: number
	col_count: number
}

export const layout:LayoutInterface = {
	spacing: 1,
	spacing_unit: 'rem',
	col_gap: 2.6,
	col_count: 24
}