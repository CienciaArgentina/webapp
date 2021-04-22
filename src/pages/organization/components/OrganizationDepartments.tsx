import { FunctionComponent } from "react"
import { DepartmentsRequest } from '@api/departments'
import { Box, Card, Text, Title } from "@components/ui/index"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { getColor } from "@theme/utils"

const DepartmentCardContainer = styled(Card)`
	cursor: pointer;
	& > div {
		width: 100%;
	}
	svg {
		width: 1rem;
		color: ${getColor('gray-600')}
	}
`

interface OrganizationDepartmentsProps {
	departments: DepartmentsRequest[]
}

export const OrganizationDepartments:FunctionComponent<OrganizationDepartmentsProps> = ({departments}) => (
	<Box>
		{departments.map( department => (
			<Link href={`/department/${department.id}`}>
				<a>
					<DepartmentCardContainer key={department.id} mb={3}>
						<Box flex align='center'>
							<Box grow>
								<Title level={3}>{department.name}</Title>
								<Text>
									{department.department_head}
								</Text>
							</Box>
							<Box>
								<FontAwesomeIcon icon={faChevronRight} />
							</Box>
						</Box>
					</DepartmentCardContainer>
				</a>
			</Link>
		) )}
	</Box>
)