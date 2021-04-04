import { getOrganization, OrganizationInterface } from '@utils/api/organizations';
import { NextPage, NextPageContext } from 'next'
import { OrganizationHeader } from './components/OrganizationHeader';
import { OrganizationBody } from './components/OrganizationBody';

interface Context extends NextPageContext {
	query: {
		id: string
	}
}

interface PageProps {
	organization: OrganizationInterface
}

const OrganizationPage:NextPage<PageProps> = ({organization}) => {
	console.log(organization);
	return (
		<div>
			<OrganizationHeader organization={organization} />
			<OrganizationBody organization={organization} />
		</div>
	)
}

OrganizationPage.getInitialProps = async (ctx:Context) => {
	const id:number = parseInt(ctx.query.id)
	const organization = await getOrganization(id)
	return {
		organization
	}
}

export default OrganizationPage