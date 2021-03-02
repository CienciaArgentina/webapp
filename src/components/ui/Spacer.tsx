import { css, DefaultTheme } from 'styled-components'

type SpaceUnit = number | 'auto'

export interface MarignSpacerInterface {
	ml?: SpaceUnit,
	mr?: SpaceUnit,
	mt?: SpaceUnit,
	mb?: SpaceUnit,
	mx?: SpaceUnit,
	my?: SpaceUnit,
	m?: SpaceUnit
}
export interface PaddingSpacerInterface {
	pl?: SpaceUnit,
	pr?: SpaceUnit,
	pt?: SpaceUnit,
	pb?: SpaceUnit,
	px?: SpaceUnit,
	py?: SpaceUnit,
	p?: SpaceUnit
}

export const useSpacerMargin = (props:MarignSpacerInterface):MarignSpacerInterface => ({
	ml: props.ml,
	mr: props.mr,
	mt: props.mt,
	mb: props.mb,
	mx: props.mx,
	my: props.my,
	m: props.m,
})
export const useSpacerPadding = (props:PaddingSpacerInterface):PaddingSpacerInterface => ({
	pl: props.pl,
	pr: props.pr,
	pt: props.pt,
	pb: props.pb,
	px: props.px,
	py: props.py,
	p: props.p,
})

interface buildSpacerCssInterface {
	(
		prop: 'margin' | 'padding',
		side: 'all' | 'top' | 'right' | 'bottom' | 'left',
		size: SpaceUnit,
		theme: DefaultTheme
	): string
}

const getSpaceUnit = ( size:SpaceUnit, theme:DefaultTheme ) => size=='auto' ? 'auto' : (theme.layout.spacing * size)+theme.layout.spacing_unit
const buildSpacerCss:buildSpacerCssInterface = (prop, side, size, theme) => `${prop}${side=='all'? '' : `-${side}`}: ${getSpaceUnit(size, theme)};`

export const spacerMargin = css<MarignSpacerInterface>`
	${ ({m , theme}) => m  && buildSpacerCss('margin', 'all', m, theme) }
	${ ({my, theme}) => my && buildSpacerCss('margin', 'top', my, theme) +
							  buildSpacerCss('margin', 'bottom', my, theme) }
	${ ({mx, theme}) => mx && buildSpacerCss('margin', 'right', mx, theme) +
							  buildSpacerCss('margin', 'left', mx, theme) }
	${ ({mt, theme}) => mt && buildSpacerCss('margin', 'top', mt, theme) }
	${ ({mr, theme}) => mr && buildSpacerCss('margin', 'right', mr, theme) }
	${ ({mb, theme}) => mb && buildSpacerCss('margin', 'bottom', mb, theme) }
	${ ({ml, theme}) => ml && buildSpacerCss('margin', 'left', ml, theme) }
`
export const spacerPadding = css<PaddingSpacerInterface>`
	${ ({p , theme}) => p  && buildSpacerCss('padding', 'all', p, theme) }
	${ ({py, theme}) => py && buildSpacerCss('padding', 'top', py, theme) +
							  buildSpacerCss('padding', 'bottom', py, theme) }
	${ ({px, theme}) => px && buildSpacerCss('padding', 'right', px, theme) +
							  buildSpacerCss('padding', 'left', px, theme) }
	${ ({pt, theme}) => pt && buildSpacerCss('padding', 'top', pt, theme) }
	${ ({pr, theme}) => pr && buildSpacerCss('padding', 'right', pr, theme) }
	${ ({pb, theme}) => pb && buildSpacerCss('padding', 'bottom', pb, theme) }
	${ ({pl, theme}) => pl && buildSpacerCss('padding', 'left', pl, theme) }
`