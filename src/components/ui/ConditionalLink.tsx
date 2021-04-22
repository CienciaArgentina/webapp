import Link from 'next/link'
import React, { FunctionComponent } from 'react'

interface ConditionalLinkProps {
	href?: string | false
	Container?: FunctionComponent
}
export const ConditionalLink:FunctionComponent<ConditionalLinkProps> = ({href, children, Container=React.Fragment}) => {
	if(href) {
		return (
			<Link href={href}>
				<a>
					{children}
				</a>
			</Link>
		)
	} else {
		return (<Container>{children}</Container>)
	}
}