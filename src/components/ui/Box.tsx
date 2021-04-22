import React from 'react'
import styled, {css} from 'styled-components'
import {
	spacerMargin,
	spacerPadding,
	MarignSpacerInterface,
	PaddingSpacerInterface,
	useSpacerMargin,
	useSpacerPadding
} from './Spacer'
import {buildContainer} from '@theme/utils'

const buildInnerSpace = (space:any, direction:string) => {
	switch (direction) {
		case 'row':
			return `margin-right: ${space}rem;`
		case 'column':
			return `margin-bottom: ${space}rem;`
		default:
			return `margin-right: ${space}rem;`
	}
}

interface BoxWrapperProps extends MarignSpacerInterface, PaddingSpacerInterface {
	space?: number | string;
	direction?: 'row' | 'column';
	noWrap?: Boolean;
	grow?: Boolean;
	align?: string;
	justify?: string;
	col_count: number|Boolean;
	span?: number;
	flex?: boolean
	container?: boolean
	containerSize?: 'l' | 'm' | 's' | number
}

const addProp = (propName:string, value:any) => value && `
	${propName}: ${value};
`

const flexBox = css<BoxWrapperProps>`
	display: flex;
	flex-wrap: ${({noWrap}) => noWrap?'nowrap':'wrap'};
	flex-direction: ${props=>props.direction || 'row'};
`

const BoxWrapper = styled.div<BoxWrapperProps>`
	${spacerMargin}
	${spacerPadding}
	${({flex}) => flex&&flexBox}
	${({align}) => addProp('align-items', align)}
	${({space, direction='row'}) => space && `
		& > *:not(:last-child) {
			${buildInnerSpace(space, direction)}
		}
	`}
	${({col_count,theme}) => col_count&&`
		display: grid;
		grid-template-columns: repeat(${(col_count!==true&&col_count)||theme.layout.col_count}, 1fr);
		grid-gap: ${theme.layout.col_gap+'rem'};
	`}
	${({span})=>!!span&&`grid-column:span ${span};`}
	${({container, containerSize}) => container&& buildContainer({size: containerSize||'l', padding:true})}
	${({grow}) => (
		(grow!==undefined)&&`
			flex-grow: ${grow ? 1 : 0};
		`
	)}
`

export interface BoxProps extends MarignSpacerInterface, PaddingSpacerInterface {
	direction?: string;
	dir?: string;
	space?: number | string;
	children?: any;
	noWrap?: Boolean;
	grow?: Boolean;
	align?: string;
	justify?: string;
	cols?: Boolean | number;
	span?: number;
	className?: any;
	as?: any;
	flex?: Boolean;
	container?: Boolean
	containerSize?: 'l' | 'm' | 's' | number
}

const mapChilds = (child:React.ReactNode, align:string|undefined) => {
	if (!React.isValidElement(child)) {
		return child
	}
	let elementChild: React.ReactElement = child
	if (elementChild.type === Box) {
		return React.cloneElement(elementChild, {
			align: elementChild.props.align || align
		})
	} else {
		return elementChild
	}
}

export const Box = (props:BoxProps) => {
	const col_count:number|Boolean = ((props.cols===true && props.span) ? props.span : props.cols) || false;
	const Children = React.Children.map(props.children, (child:React.ReactNode) => mapChilds(child, props.align))
	const marginProps = useSpacerMargin(props)
	const paddingProps = useSpacerPadding(props)
	return (
		<BoxWrapper
			as={props.as}
			direction={props.direction || props.dir}
			space={props.space}
			noWrap={props.noWrap}
			grow={props.grow}
			align={props.align}
			justify={props.justify}
			col_count={col_count}
			span={props.span}
			className={props.className}
			flex={props.flex}
			container={props.container}
			containerSize={props.containerSize}
			{...marginProps}
			{...paddingProps}
		>
			{Children}
		</BoxWrapper>
	)
}