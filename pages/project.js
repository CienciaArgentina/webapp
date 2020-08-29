import { Component } from 'react'
import { OrganizationsApi } from '@api'
import Page from '../layouts/main/main';
import Link from 'next/link'; 
import { withRouter } from 'next/router'
import {
	Tabs,
	Tab,
	TabDisplay,
	LabList,
	InstituteHeader,
	InstituteName,
	JobPost,
	ProjectPage,
	DesktopTabs
} from '../components/Science';

class laboratory extends Component {
	static async getInitialProps(context) {
		const project = await OrganizationsApi.getProject(context.query.id)
		if(!project){
			return {
				error: {
					statusCode: 404,
					title: 'Proyect no encontrado.'
				}
			}
		}
		return {
			project
		}
	}
	constructor(props) {
		super(props)
		this.state = {
			selected: 1
		}
	}
	changeTab = selected => {
		const department = this.props.project.department
		const new_url = selected==0 ? `/laboratory?id=${department.id}` : `/laboratory?id=${department.id}&tab_view=1`
		const new_url_as = selected==0 ? `/laboratory/${department.id}` : `/laboratory/${department.id}`
		this.props.router.push(
			new_url,
			new_url_as
		)
	}

	render () {
		const project = this.props.project
		const department = project.department
		const organization = project.organization
		return (
			<Page contentClass="bg--gray">
				<div id="laboratory">
					<InstituteHeader
						img={organization.logo}
						title={
							<div className="institute__name">
								<label>Laboratorio</label>
								<h1>{department.name}</h1>
								<div className="pt-1">
									<Link href={`/institute?id=${organization.id}`} as={`/institute/${organization.id}`}>
										<a>
											<label>{organization.name}</label>
										</a>
									</Link>
								</div>
							</div>
						}
						tabs={
							<Tabs
								selected={this.state.selected}
								onChange={this.changeTab}
							>
								<Tab>Laboratorio</Tab>
								<Tab>Proyectos</Tab>
							</Tabs>
						}
					/>
					<DesktopTabs
						selected={this.state.selected}
						onChange={this.changeTab}
					>
						<Tab><i className="fas fa-home"></i>Laboratorio</Tab>
						<Tab><i className="fas fa-flask"></i>Proyectos</Tab>
					</DesktopTabs>
					<div className='container_project'>
						<ProjectPage
							onBack={this.changeTab}
							project={project}
						/>
					</div>
				</div>
			</Page>
		)
	}
}

export default withRouter(laboratory)