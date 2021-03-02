import { UserProfile } from '@api/user_profiles'
import styled from 'styled-components'
import { getColor } from '@theme/utils'
import { MarignSpacerInterface, PaddingSpacerInterface, spacerMargin, spacerPadding, useSpacerMargin, useSpacerPadding } from '@components/ui/Spacer'
import { ConditionalLink } from '@components/ui/ConditionalLink'

interface AvatarProps extends MarignSpacerInterface, PaddingSpacerInterface {
	profile: UserProfile
	onClick?: any,
	size?: number,
	href?: string
}

interface ContainerProps extends MarignSpacerInterface, PaddingSpacerInterface {
	size?: number
	hasOnClick?: boolean
}
const Container = styled.div<ContainerProps>`
	${spacerMargin}
	${spacerPadding}
	${({size}) => `
		width:  ${size || 4}rem;
		height: ${size || 4}rem;
	`}
	border-radius: 50%;
	background-color: ${getColor('lblue')};
	color: white;
	font-size: 1.5rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	text-transform: uppercase;
	text-decoration: none !important;
	${({hasOnClick}) => `
		cursor: ${(hasOnClick) ? 'pointer' : 'default'};
	`}
`

export const Avatar = ( { href, profile, onClick, size, ...props }:AvatarProps ) => {
	const marginProps = useSpacerMargin(props)
	const paddingProps = useSpacerPadding(props)
	return(
		<ConditionalLink href={href}>
			<Container
				onClick={onClick}
				hasOnClick={onClick || href}
				size={size}
				{...marginProps}
				{...paddingProps}
			>
				{profile.username.charAt(0)}
			</Container>
		</ConditionalLink>
	)
}