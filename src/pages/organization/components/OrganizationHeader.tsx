import { Card, Title } from '@components/ui';
import { Box } from '@components/ui/Box';
import { OrganizationInterface } from '@utils/api/organizations';
import { FunctionComponent } from 'react';

interface OrganizationHeaderProps {
	organization: OrganizationInterface
}
export const OrganizationHeader:FunctionComponent<OrganizationHeaderProps> = ({organization}) => {
	return (
		<Card padding={false}>
			<Box container py={5}>
				<Title level={1}>
					{organization.name}
				</Title>
				<div>Buenos Aires, Argentina</div>
			</Box>
		</Card>
	)
}