import { Component } from 'react'
import { OrganizationsApi } from '@api'
import Page from '../layouts/main/main';
import Link from 'next/link'; 
import {
	Tabs,
	Tab,
	TabDisplay,
	LabList,
	InstituteHeader,
	InstituteName,
	JobPost,
	DesktopTabs
} from '../components/Science';

export default class laboratory extends Component {
	static async getInitialProps(context) {
		const department = await OrganizationsApi.getDepartment(context.query.id)
		const tab_view = context.query.tab_view
		if(!department){
			return {
				error: {
					statusCode: 404,
					title: 'Instituto no encontrado.'
				}
			}
		}
		return {
			department,
			tab_view
		}
	}
	constructor(props) {
		super(props)
		this.state = {
			selected: props.tab_view | 0
		}
	}
	handleChange = selected => {
		this.setState(() => ({
			selected
		}));
	}

	render() {
		const department = this.props.department
		const organization = department.organization
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
								onChange={this.handleChange}
							>
								<Tab>Laboratorio</Tab>
								<Tab>Proyectos</Tab>
							</Tabs>
						}
					/>
					<DesktopTabs
						selected={this.state.selected}
						onChange={this.handleChange}
					>
						<Tab><i className="fas fa-home"></i>Laboratorio</Tab>
						<Tab><i className="fas fa-flask"></i>Proyectos</Tab>
					</DesktopTabs>
					<TabDisplay className="contentDisplay" selected={this.state.selected}>
						<div className="textCont container aboutInstitute">
							<div className="mainAbout">
								<h3>Sobre el laboratorio</h3>
								{department.description.split('\r').map((o,k)=><p key={k} className="text">{o}</p>)}
								<InstituteName
									logo={organization.logo}
									instituteId={organization.id}
									name={organization.name}
									// city = {organization.city}
									// country = {organization.country}
								/>
							</div>
						</div>
						<div className="proyectos container">
							{department.projects.map((o,k)=>(
								<LabList //list of projects
									title={o.name}
									description={o.description}
									researcher={o.project_head}
									// activeJobs={labJobs.filter(i=>(i.organization.id==o.id)).length}
									key={k}
									href={`/project?id=${o.id}`}
									as={`/project/${o.id}`}
								/>
							))}
						</div>
						{/* <div className="container instituteJobs">
							{labJobs && labJobs.map( (o,k)=>(
								<JobPost key={k}
									title={o.title}
									data={o}
								/>
							) )}
						</div> */}
					</TabDisplay>
				</div>
			</Page>
		)
	}
}