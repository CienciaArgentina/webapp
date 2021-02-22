import React, { useContext } from 'react'
import { ButtonContainer, ButtonMain, ButtonLoading } from './ButtonStyles'
import { ThemeContext } from 'styled-components';
import { buttonColorName } from '@theme/buttons';
import { Spinner } from '../Spinner'

interface ButtonProps {
	children?: any;
	text?: string | Number; //alternative to children
	type?: string; //button | submit
	onClick?: any;
	size?: 'l'|'m'|'s'; //l m s
	disabled?: Boolean;
	isLoading?: Boolean;
	grow?: Boolean; //flex-grow
	//Variant
	variant?: 'filled' | 'outline';
	outline?: Boolean;
	filled?: Boolean;
	// Color
	color?: buttonColorName;
	blue?: Boolean;
	green?: Boolean;
	red?: Boolean;
	lightblue?: Boolean;
}

export const Button = ({
	// size,
	children,
	grow,
	text,
	disabled,
	isLoading,
	type,
	onClick,
	variant, outline, filled,
	color, blue, green, red, lightblue
}:ButtonProps) => {

	const selected_variant:'filled' | 'outline' = variant || (filled&&'filled') || (outline&&'outline') || 'filled'
	const selected_color:buttonColorName = color || (blue&&'blue') || (green&&'green') || (red&&'red') || (lightblue&&'lightblue') || 'blue'
	
	const theme = useContext(ThemeContext)
	const buttonFontColor = theme.buttons[selected_color][selected_variant].color

	return (
		<ButtonContainer
			variant={selected_variant}
			color={selected_color}
			isLoading={isLoading}
			grow={grow}
		>
			<ButtonMain
				disabled={disabled || isLoading}
				isLoading={!!isLoading}
				type={type||'button'}
				onClick={onClick}
				variant={selected_variant}
				color={selected_color}
			>
			{isLoading&&
				<ButtonLoading>
					<Spinner size={12} fill={buttonFontColor}/>
				</ButtonLoading>}
				{children||text}
			</ButtonMain>
		</ButtonContainer>
	)
}