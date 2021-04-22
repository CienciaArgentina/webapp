import { MenuButton } from '@components/MenuButton';
import { Card } from '@components/ui';
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
			<Link href={`/organization/${id}/departments`}>
				<a>
					<MenuButton
						icon={faFlask}
						label='Laboratorios'
						isSelected={selected==='departments'}
					/>
				</a>
			</Link>
			<Link href={`/organization/${id}/jobs`}>
				<a>
					<MenuButton
						icon={faSearch}
						label='Trabajos'
						isSelected={selected==='jobs'}
					/>
				</a>
			</Link>
		</Card>
	)
}

interface OrganizationBodyProps {
	organization: OrganizationInterface
	selected: 'home'| 'departments'| 'jobs'
}
export const OrganizationBody:FunctionComponent<OrganizationBodyProps> = ({organization, selected, children}) => {
	return (
		<Box container py={5} cols={24}>
			<Box span={5}>
				<OrganizationSideMenu selected={selected} id={organization.id} />
			</Box>
			<Box span={19}>
				{children}
			</Box>
		</Box>
	)
}