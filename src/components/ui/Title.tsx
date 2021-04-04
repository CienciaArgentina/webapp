import { getColor } from "@theme/utils"
import { FunctionComponent } from "react"
import styled, { css, CSSProperties } from "styled-components"
import {
	MarignSpacerInterface,
	PaddingSpacerInterface,
	useSpacerMargin,
	useSpacerPadding,
	spacerMargin,
	spacerPadding
} from "./Spacer"

type HeadingLevel = 1|2|3|4|5|6

interface TitleProps extends MarignSpacerInterface, PaddingSpacerInterface {
	level?: HeadingLevel
	center?: boolean
	align?: 'left' | 'right' | 'center'
	style?: CSSProperties
}

const title_size = {
	1: 3,
	2: 2.2,
	3: 1.8,
	4: 1.5,
	5: 1.5,
	6: 1.0,
}
const title_weight = {
	1: 700,
	2: 700,
	3: 500,
	4: 700,
	5: 200,
	6: 100,
}

const Title4Css = css`
	color: ${getColor('lblue')};
	letter-spacing: .1rem;
	text-transform: uppercase;
`

interface StyleTitleProps extends MarignSpacerInterface, PaddingSpacerInterface {
	level: HeadingLevel
	align?: 'left' | 'right' | 'center'
}

const StyleTitle = styled.div<StyleTitleProps>`
	color: ${({theme}) => theme.colors["gray-800"]};
	${({align}) => align&&`
		text-align: ${align};
	`}
	${({level}) => css`
		font-size: ${title_size[level]}rem;
		font-weight: ${title_weight[level]};
		${level===4 && Title4Css}
	`}
	${spacerMargin}
	${spacerPadding}
`

export const Title: FunctionComponent<TitleProps> = ({ level, children, ...props }) => {
	const LEVEL_MAP: {1: "h1", 2: "h2", 3: "h3", 4: "h4", 5: "h5", 6: "h6"} = {
		1: "h1",
		2: "h2",
		3: "h3",
		4: "h4",
		5: "h5",
		6: "h6",
	}
	const as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = LEVEL_MAP[level||3]

	const align = props.align || (props.center&&'center') || undefined
	const marginProps = useSpacerMargin(props)
	const paddingProps = useSpacerPadding(props)
	
	return <StyleTitle
		{...marginProps}
		{...paddingProps}
		style={props.style}
		as={as}
		level={level||3}
		align={align}
	>
		{children}
	</StyleTitle>
}