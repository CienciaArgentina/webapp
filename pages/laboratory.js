import { Component } from 'react';
import React from 'react';
import Page from '../layouts/main/main';
import Link from 'next/link'; 
import Router from 'next/router'

import Error from './_error'

import {
	JobsApi, InstituteApi
} from '../src/api/api'

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

export default class laboratory extends Component {
	constructor(props) {
		super(props);
		Router.events.on('routeChangeComplete', this.updateView);
	}
	state = {
		selected: this.props.projectView==true? 1 : !!this.props.view ? parseInt(this.props.view) : 0,
		projectView: !!this.props.projectView
	}
	handleChange = (selected) => {
		if(this.state.projectView==true) {
			Router.push(`/laboratory?id=${this.props.labData.labId}`, `/laboratory/${this.props.labData.labId}`);
			this.setState(() => ({
				projectView: false,
				selected
			}));
		} else {
			this.setState(() => ({
				selected
			}));
		}
	}
	updateView = () => {
		this.setState(() => ({projectView: !!this.props.projectView}));
		if(this.state.projectView == true) {
			this.setState(() => ({selected:1}));
		}
	}
	componentWillUnmount() {
		Router.events.off('routeChangeComplete', this.updateView);
	}
	render() {
		const instituteData = this.props.instituteData
		const labData = this.props.labData
		const labJobs = this.props.jobOffers.length > 0 ? this.props.jobOffers.filter(o=> (o.organization.labId==labData.labId)) : false
		
		// return (<div></div>)
		return (
			<Page contentClass="bg--gray">
				<div id="laboratory">
					<InstituteHeader
						img={instituteData.logo}
						title={
							<div className="institute__name">
								<label>Laboratorio</label>
								<h1>{labData.labName}</h1>
								<div className="pt-1">
									<Link href={`/institute?id=${instituteData.instituteId}`} as={`/institute/${instituteData.instituteId}`}>
										<a>
											<label>{instituteData.instituteName}</label>
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
								<Tab>Búsquedas</Tab>
							</Tabs>
						}
					/>
					<DesktopTabs
						selected={this.state.selected}
						onChange={this.handleChange}
					>
						<Tab><i className="fas fa-home"></i>Laboratorio</Tab>
						<Tab><i className="fas fa-flask"></i>Proyectos</Tab>
						<Tab><i className="fas fa-search"></i>Búsquedas</Tab>
					</DesktopTabs>
					{this.state.projectView ?
						<ProjectPage
							onBack={this.handleChange}
							projectData={this.props.projectData}
							jobs={labJobs.filter(i=>(i.organization.projectId==this.props.projectData.projectId))}
						/>
					:
					<TabDisplay className="contentDisplay" selected={this.state.selected}>
						<div className="textCont container aboutInstitute">
							<div className="mainAbout">
								<h3>Sobre el laboratorio</h3>
								{labData.labDescription.split('\r').map((o,k)=><p key={k} className="text">{o}</p>)}
								<InstituteName
									logo={instituteData.logo}
									id={instituteData.instituteId}
									name={instituteData.instituteName}
									city = {instituteData.city}
									country = {instituteData.country}
								/>
							</div>
							{/* <div className="asideAbout">
								<h3>Staff</h3>
								<div className="institute__staff">
									{[0,0,0,0,0,0].map((o,k) => (
										<div key={k} className="staff__person">
											<p className="staff__name">Jeanette Acosta</p>
											<label className="staff__position">Investigadora Independiente</label>
											<label className="staff__mail">jeanette@cienciaargentina.com</label>
										</div>
									))}
								</div>
							</div> */}
						</div>
						<div className="proyectos container">
							{labData.projects.map((o,k)=>(
								<LabList //list of projects
									title={o.projectName}
									description={o.projectDescription}
									researcher={o.projectHead}
									activeJobs={labJobs.filter(i=>(i.organization.projectId==o.projectId)).length}
									key={k}
									href={`/laboratory?id=${labData.labId}&view=project&projectId=${o.projectId}`}
									as={`/laboratory/${labData.labId}/project/${o.projectId}`}
								/>
							))}
						</div>
						<div className="container instituteJobs">
							{labJobs && labJobs.map( (o,k)=>(
								<JobPost key={k}
									title={o.title}
									data={o}
								/>
							) )}
						</div>
					</TabDisplay>

					}
				</div>
			</Page>
		)
	}
}

laboratory.getInitialProps = async function (context) {
	const instituteData = await InstituteApi.getInstituteFromLab(context.query.id)
	let labData = instituteData.labs.filter((o,k)=>(o.labId==context.query.id));
	if(labData.length == 1){
		labData = labData[0]
	} else {
		return {
			error: {
				statusCode: 404,
				title: 'Laboratorio no encontrado.'
			}
		}
	}
	const jobOffers = await JobsApi.getFromInstitute(context.query.id)
	if(context.query.view=='project'){
		const {id, view, projectId} = context.query;
		let projectData = labData.projects.filter(o=>(o.projectId==projectId))
		if(projectData.length == 1){
			projectData = projectData[0]
		} else {
			return {
				error: {
					statusCode: 404,
					title: 'Proyecto no encontrado.'
				}
			}
		}
		return {
			id,
			view,
			instituteData,
			labData,
			projectId,
			projectView:true,
			projectData,
			jobOffers
		};
	} else {
		const {id, view} = context.query;
		return {
			id,
			instituteData,
			labData,
			view,
			jobOffers
		}
	}
}