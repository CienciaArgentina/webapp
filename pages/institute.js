import { Component } from 'react';
import React from 'react';
import Page from '../layouts/main/main';
import Link from 'next/link'; 

import {
	Tabs,
	Tab,
	TabDisplay,
	LabList,
	InstituteHeader,
	JobPost,
	DesktopTabs
} from '../components/Science';

export default class institute extends Component {
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

	state = {
		selected: 0,
		jobOffers: this.props.jobOffers
	}
	handleChange = (selected) => {
		this.setState({selected})
	}
	render() {
		return (
			<Page contentClass= 'bg--gray' customMeta={{
				title:`Instituto ${this.instituteName}`,
				description: this.description,
				img: this.logo
			}}>
				<div id="institute">
					<InstituteHeader
						img={this.logo}
						title={
							<div className="institute__name">
								<h1>Instituto {this.instituteName}</h1>
								<label>{this.location}</label>
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
								<h3>Sobre el instituto</h3>
								<p className="text">
									{this.description}
								</p>
								<Link href={`http://leloir.org.ar`}>
									<a target="_blank" className="bn--text bn--icon-link">Sitio web</a>
								</Link>
								<button className="bn--text bn--icon-world">Argentina</button>
							</div>
							<div className="asideAbout">
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
							</div>
						</div>
						<div className="container labListCont">
							{[0,0,0,0].map((o,k)=>(
								<LabList
									title="Biología Celular del RNA"
									description="Cuando las células se encuentran en condiciones poco favorables o adversas despliegan una respuesta protectiva para ayudar a la supervivencia y evitar la muerte celular."
									researcher="Graciela L. Boccaccio"
									activeJobs={5}
									key={k}
									href="/laboratory?id=asd"
									as="/laboratory/ads"
								/>
							))}
						</div>
						<div className="container instituteJobs">
							{this.state.jobOffers.map( (o,k)=>(
								<JobPost key={k}
									title={o.title}
									type={o.type}
									instituteName={o.instituteName}
									place={o.place}
									boss={o.boss}
									logo={o.logo}
									earn={o.earn}
									duration={o.duration}
									deadline={o.deadline}
									closeDeadline={o.closeDeadline}
									favorite={o.favorite}
								/>
							) )}
						</div>
					</TabDisplay>
				</div>
			</Page>
		);
	}
}

institute.getInitialProps = (context) => {
	const jobOffers = [
		{
			title: "Regulación de la N-glicosilación de proteínas eucariotas",
			type: "Doctorado",
			instituteName: "Insituto Leloir",
			place: "Ciudad Autónoma de Buenos Aires",
			boss: "Dra. Jeanette Acosta",
			logo: "leloir_logo.png",
			earn: "$18.900",
			duration: "4 años",
			deadline: "10 Ago.",
			closeDeadline: false,
			favorite: true
		},
		{
			title: "Inmunoterapia en la tuberculosis de la humana",
			type: "Doctorado",
			instituteName: "Insituto Leloir",
			place: "Ciudad Autónoma de Buenos Aires",
			boss: "Dra. Jeanette Acosta",
			logo: "leloir_logo.png",
			earn: "$18.900",
			duration: "4 años",
			deadline: "en 2 días",
			closeDeadline: true,
			favorite: false
		},
		{
			title: "Nuevos genes de expresión asimétrica temprana y su rol en el establecimineto de ejes corporales",
			type: "Doctorado",
			instituteName: "Insituto Leloir",
			place: "Ciudad Autónoma de Buenos Aires",
			boss: "Dra. Jeanette Acosta",
			logo: "leloir_logo.png",
			earn: "$18.900",
			duration: "4 años",
			deadline: "6 Oct.",
			closeDeadline: false,
			favorite: false
		},
	]
	return {
		jobOffers
	}
}