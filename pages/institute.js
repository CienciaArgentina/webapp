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

import { JobsApi, InstituteApi, OrganizationsApi } from '@api'

export default class institute extends Component {
	static async getInitialProps(context) {
		const data = await OrganizationsApi.getOrganization(context.query.id)
		if(!data){
			return {
				error: {
					statusCode: 404,
					title: 'Instituto no encontrado.'
				}
			}
		}
		// const jobOffers = await JobsApi.getFromInstitute(context.query.id)
		const jobOffers = []
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
	handleChange = (selected) => {
		this.setState({selected})
	}
	render() {
		const data = this.props.data
		return (
			<Page contentClass= 'bg--gray' customMeta={{
				title:`${data.name}`,
				description: data.description,
				ogimage: data.logo
			}}>
				<div id="institute">
					<InstituteHeader
						img={data.logo}
						title={
							<div className="institute__name">
								<h1>{data.name}</h1>
								{/* <label>{`${data.city}, ${data.country}`}</label> */}
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
								{data.description &&
									<>
										<h3>Sobre el instituto</h3>
										<p className="text">
											{data.description}
										</p>
									</>
								}
								{data.website&&
									<a href={data.website} target="_blank" className="bn--text bn--icon-link">Sitio web</a>
								}
								<button className="bn--text bn--icon-world">ARGENTINA</button>
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
							{this.props.data.departments.map((o,k)=>(
								<LabList
									title={o.name}
									description={o.description}
									researcher={o.department_head}
									// activeJobs={this.state.jobOffers.filter(i=>(i.organization.labId==o.labId)).length}
									key={o.id}
									href={`/laboratory?id=${o.id}`}
									as={`/laboratory/${o.id}`}
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