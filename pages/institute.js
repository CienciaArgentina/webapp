import { Component } from 'react';
import React from 'react';
import Page from '../layouts/main/main';
import Link from 'next/link'; 

import Error from './_error'

import {
	Tabs,
	Tab,
	TabDisplay,
	LabList,
	InstituteHeader,
	JobPost,
	DesktopTabs,
	LabMap
} from '../components/Science';

import { JobsApi, InstituteApi } from '../src/api/api'

export default class institute extends Component {
	static async getInitialProps(context) {
		const data = await InstituteApi.getInstitute(context.query.id);
		if(!data){
			return {
				error: {
					statusCode: 404,
					title: 'Instituto no encontrado.'
				}
			}
		}
		const jobOffers = await JobsApi.getFromInstitute(context.query.id)
		return {
			data,
			jobOffers
		}
	}
	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			jobOffers: this.props.jobOffers
		}
	}
	instituteName = 'Leloir'
	location = 'Buenos Aires, Argentina'
	description = 'La Fundación Instituto Leloir es un centro de investigación científica dedicada a la investigación básica y a la formación de jóvenes investigadores en bioquímica y biología celular y molecular. La misión del Instituto es fomentar los más altos estándares de excelencia tanto en los proyectos de investigación como en la docencia.'
	staff = [
		{name: 'Jeanette Acosta', position: 'Directora', email: 'jean@cienciaargentina.com'},
		{name: 'Lucas Lopez', position: 'Tesorero', email: 'jean@cienciaargentina.com'},
		{name: 'Matias Gonzalez', position: 'Comunicación', email: 'jean@cienciaargentina.com'},
	]
	website = 'http://leloir.org.ar'
	logo = `/static/img/logos-labos/leloir_logo.png`
	handleChange = (selected) => {
		this.setState({selected})
	}
	render() {
		const data = this.props.data
		return (
			<Page contentClass= 'bg--gray' customMeta={{
				title:`${data.instituteName}`,
				description: data.instituteDescription,
				ogimage: data.logo
			}}>
				<div id="institute">
					<InstituteHeader
						img={data.logo}
						title={
							<div className="institute__name">
								<h1>{data.instituteName}</h1>
								<label>{`${data.city}, ${data.country}`}</label>
							</div>
						}
						tabs={
							<Tabs
								selected={this.state.selected}
								onChange={this.handleChange}
							>
								<Tab>Instituto</Tab>
								<Tab>Laboratorios</Tab>
								<Tab>Búsquedas</Tab>
							</Tabs>
						}
					/>
					<DesktopTabs
						selected={this.state.selected}
						onChange={this.handleChange}
					>
						<Tab><i className="fas fa-home"></i>Instituto</Tab>
						<Tab><i className="fas fa-flask"></i>Laboratorios</Tab>
						<Tab><i className="fas fa-search"></i>Búsquedas</Tab>
					</DesktopTabs>
					<TabDisplay className="contentDisplay" selected={this.state.selected}>
						<div className="container textCont aboutInstitute">
							<div className="mainAbout">
								{data.instituteDescription &&
									<>
										<h3>Sobre el instituto</h3>
										<p className="text">
											{data.instituteDescription}
										</p>
									</>
								}
								{data.instituteUrl&&
									<Link href={data.instituteUrl}>
										<a target="_blank" className="bn--text bn--icon-link">Sitio web</a>
									</Link>
								}
								<button className="bn--text bn--icon-world">{data.country}</button>
								{data.coordinates &&
									<div className='mt-2'>
										<LabMap
											coordinates = {data.coordinates}
											instituteName = {data.instituteName}
										/>
									</div>
								}
							</div>
							{/* <div className="asideAbout">
								<h3>Staff</h3>
								<div className="institute__staff">
									{this.staff.map((o,k) => (
										<div key={k} className="staff__person">
											<p className="staff__name">{o.name}</p>
											<label className="staff__position">{o.position}</label>
											<label className="staff__mail">{o.email}</label>
										</div>
									))}
								</div>
							</div> */}
						</div>
						<div className="container labListCont">
							{this.props.data.labs.map((o,k)=>(
								<LabList
									title={o.labName}
									description={o.labDescription}
									researcher={o.labHead}
									activeJobs={this.state.jobOffers.filter(i=>(i.organization.labId==o.labId)).length}
									key={o.labId}
									href={`/laboratory?id=${o.labId}`}
									as={`/laboratory/${o.labId}`}
								/>
							))}
						</div>
						{this.state.jobOffers &&
							<div className="container instituteJobs">
								{this.state.jobOffers.map( (o,k)=>(
									<JobPost key={k}
										data={o}
									/>
								) )}
							</div>
						}
					</TabDisplay>
				</div>
			</Page>
		);
	}
}