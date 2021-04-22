import { getDepartment, DepartmentInterface } from '@utils/api/departments';
import { NextPage, NextPageContext } from 'next'
import { DepartmentHeader } from '../components/DepartmentHeader';
import { DepartmentBody } from '../components/DepartmentBody';
import { DepartmentMain } from '../components/DepartmentMain';

interface Context extends NextPageContext {
	query: {
		id: string
	}
}

interface PageProps {
	department: DepartmentInterface
}

const DepartmentPage:NextPage<PageProps> = ({department}) => {
	//TODO: que se pueda navegar a /laboratories o /jobs, ver como hacer
	// console.log(department);
	return (
		<div>
			<DepartmentHeader department={department} />
			<DepartmentBody department={department} selected='home'>
				<DepartmentMain department={department} />
			</DepartmentBody>
		</div>
	)
}

DepartmentPage.getInitialProps = async (ctx:Context) => {
	const id:number = parseInt(ctx.query.id)
	const department = await getDepartment(id)
	return {
		department
	}
}

export default DepartmentPage