import React, { FunctionComponent } from 'react'

interface SpaceProps {
	space?: number | 's' | 'm' | 'l'
	direction?: 'vertical' | 'horizontal'
}

export const Space:FunctionComponent<SpaceProps> = ({children, space, direction}) => {
	const length = React.Children.toArray(children).length
	const ch =  React.Children.map(children, (child, index) => {
		if(!React.isValidElement(child)) { return child }
		if(index+1 == length) { return child }

		const props:any = child.props
		let margin:string | number = 2
		if(typeof space == 'number') {
			margin = space
		} else {
			switch (space) {
				case 's': margin = 1; break;
				case 'm': margin = 2; break;
				case 'l': margin = 4; break;
			}
		}
		const spaceProp = direction == 'horizontal' ? 'marginLeft' : 'marginBottom'
		
		return React.cloneElement(child, {
			...props,
			style:{
				[spaceProp]: `${margin}rem`
			}
		})
	})
	return <>{ch}</>
}