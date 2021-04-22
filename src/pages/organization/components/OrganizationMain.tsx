import { FunctionComponent } from "react"
import { Box, Card, Title, Text } from "@components/ui"
import { OrganizationInterface } from "@utils/api/organizations"
import Link from "next/link"

interface OrganizationMainProps {
	organization: OrganizationInterface
}
export const OrganizationMain:FunctionComponent<OrganizationMainProps> = ({organization}) => {
	return (
		<Card>
			{!!(organization.description || organization.summary) && (
				<Box mb={2}>
					<Title mb={1} level={2} >Sobre el instituto</Title>
					<Text>
						{organization.description || organization.summary}
					</Text>
				</Box>
			) }
			{organization.website && <Box>
				<Link href={organization.website}><a target='_blank'>{organization.website}</a></Link>
			</Box>}
		</Card>
	)
}