import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getColor } from "@theme/utils"
import { FunctionComponent } from "react"
import styled, { css } from "styled-components"


const MenuButtonContainer = styled.div<{isSelected:boolean}>`
	width: 100%;
	padding: 1.5rem 1rem;
	box-sizing: border-box;
	display: flex;
	cursor: pointer;
	color: ${getColor('gray-800')};
	align-items: center;
	${({isSelected}) => (isSelected) && css`color: ${getColor('lblue')};`}
	transition: background-color .2s ease;
	&:hover {
		background-color: ${getColor('gray-100')};
	}
`
const MenuIcon = styled.div`
	width: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	svg {
		width: 1.6rem;
	}
`
const MenuLabel = styled.div`
	flex-grow: 1;
	font-weight: 500;
	flex-grow: 1;
`

interface MenuButtonProps {
	isSelected: boolean
	icon: IconProp
	label?: string
}
export const MenuButton:FunctionComponent<MenuButtonProps> = ({isSelected,icon,children,label}) => {
	return (
		<MenuButtonContainer isSelected={isSelected}>
			{!!icon&&
				<MenuIcon>
					<FontAwesomeIcon icon={icon} />
				</MenuIcon>
			}
			<MenuLabel>
				{label || children}
			</MenuLabel>
		</MenuButtonContainer>
		
	)
}