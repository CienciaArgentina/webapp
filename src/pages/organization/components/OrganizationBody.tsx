import { MenuButton } from '@components/MenuButton';
import { Card, Title } from '@components/ui';
import { Box } from '@components/ui/Box';
import { faFlask, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { OrganizationInterface } from '@utils/api/organizations';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface OrganizationSideMenuProps {
	selected: string
	id: number
}
export const OrganizationSideMenu:FunctionComponent<OrganizationSideMenuProps> = ({selected, id}) => {
	return (
		<Card padding={true} px={0}>
			<Link href={`/organization/${id}`}>
				<a>
					<MenuButton
						icon={faHome}
						label='Instituto'
						isSelected={selected==='home'}
					/>
				</a>
			</Link>
			<Link href={`/organization/${id}/laboratories`}>
				<a>
					<MenuButton
						icon={faFlask}
						label='Laboratorios'
						isSelected={selected==='laboratories'}
					/>
				</a>
			</Link>
			<Link href={`/organization/${id}/jobs`}>
				<a>
					<MenuButton
						icon={faSearch}
						label='Ofertas'
						isSelected={selected==='jobs'}
					/>
				</a>
			</Link>
		</Card>
	)
}

interface OrganizationBodyProps {
	organization: OrganizationInterface
}
const OrganizationMain:FunctionComponent<OrganizationBodyProps> = ({organization}) => {
	return (
		<>
			{!!(organization.description || organization.summary) && (
				<Box mb={2}>
					<Title mb={1} level={2} >Sobre el instituto</Title>
					<p>
						{organization.description || organization.summary}
					</p>
				</Box>
			) }
			{organization.website && <Box>
				<Link href={organization.website}><a target='_blank'>{organization.website}</a></Link>
			</Box>}
			{organization.website && <Box>
				<Link href={'/search/CABA'}>Calle falsea 123, Buenos Aires, Argentina</Link>
			</Box>}
		</>
	)
}
export const OrganizationBody:FunctionComponent<OrganizationBodyProps> = ({organization}) => {
	return (
		<Box container py={5} cols={24}>
			<Box span={5}>
				<OrganizationSideMenu selected={'home'} id={organization.id} />
			</Box>
			<Box span={19}>
				<Card>
					<OrganizationMain organization={organization} />
				</Card>
			</Box>
		</Box>
	)
}