import { Component } from 'react';
import React from 'react';
import Page from '../layouts/main/main';
import Link from 'next/link'; 
import Router from 'next/router'

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
		projectView: !!this.props.projectView,
		jobOffers: this.props.jobOffers
	}
	handleChange = (selected) => {
		this.setState(() => ({
			selected
		}));
		if(this.state.projectView==true) {
			Router.push(`/laboratory?id=asd`, `/laboratory/ads`);
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
		return (
			<Page contentClass="bg--gray">
				<div id="laboratory">
					<InstituteHeader
						img={`/static/img/logos-labos/leloir_logo.png`}
						title={
							<div className="institute__name">
								<label>Laboratorio</label>
								<h1>Biología celular del RNA</h1>
								<div className="pt-1">
									<Link href={`/institute?id=asd`} as={`/institute/asd`}>
										<a>
											<label>Instituto Leloir</label>
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
							onBack={() => {this.handleChange(1)}}
						/>
					:
					<TabDisplay className="contentDisplay" selected={this.state.selected}>
						<div className="textCont container aboutInstitute">
							<div className="mainAbout">
								<h3>Sobre el laboratorio</h3>
								<p className="text">
									Cuando las células se encuentran en condiciones poco favorables o adversas despliegan una respuesta protectiva para ayudar a la supervivencia y evitar la muerte celular.  Esta reacción se da en todos los organismos y es denominada “respuesta al estrés celular”.
								</p>
								<p className="text">
									El estrés celular es importante en diversas patologías humanas, y la intervención del balance muerte-sobrevida es la base racional de numerosas terapias. Empleando modelos in vitro de estrés celular que recapitulan lo que ocurre en condiciones patológicas, estudiamos cómo la célula detiene la generación de las proteínas que normalmente sintetiza para estimular la producción de proteínas protectivas.
								</p>
								<InstituteName
									img="leloir_logo.png"
									id="asd"
									name="Instituto Leloir"
									location= "Ciudad Autónoma de Buenos Aires"
								/>
							</div>
							<div className="asideAbout">
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
							</div>
							
						</div>
						<div className="proyectos container">
							{[0,0,0,0].map((o,k)=>(
								<LabList
									title="Mutaciones y deleciones de genes de interés, y complementación de las mismas."
									description="Cuando las células se encuentran en condiciones poco favorables o adversas despliegan una respuesta protectiva para ayudar a la supervivencia y evitar la muerte celular."
									researcher="Lucas Lopez"
									activeJobs={1}
									key={k}
									href={`/laboratory?id=asd&view=project&projectId=asd`}
									as="/laboratory/ads/project/asd"
								/>
							))}
						</div>
						<div className="container instituteJobs">
							{this.state.jobOffers.map( (o,k)=>(
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
	}
	const jobOffers = await JobsApi.getFromInstitute(context.query.id)
	// console.log(labData);
	if(context.query.view=='project'){
		const {id, view, projectId} = context.query;
		const projectData = labData.proyects.filter(o=>(o.projectId==projectId))
		if(projectData.length == 1){
			projectData = projectData[0]
		}
		return {
			id,
			view,
			projectId,
			projectView:true,
			projectData,
			jobOffers
		};
	} else {
		const {id, view} = context.query;
		return {
			id,
			view,
			jobOffers
		}
	}
}