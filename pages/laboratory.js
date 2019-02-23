import { Component } from 'react';
import React from 'react';
import Page from '../layouts/main/main';
import Link from 'next/link'; 
import Router from 'next/router'

import {
	Tabs,
	Tab,
	TabDisplay,
	LabList,
	InstituteHeader,
	InstituteName,
	JobPost,
	ProjectPage
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
			<Page>
				<div id="laboratory">
					<InstituteHeader
						title={
							<div className="institute__name">
								<label>Laboratorio</label>
								<h1>Biología celular del RNA</h1>
								<div className="pt-1">
									<label>Instituto Leloir</label>
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
					{this.state.projectView ?
						<ProjectPage
							onBack={() => {this.handleChange(1)}}
						/>
					:
					<TabDisplay className="contentDisplay" selected={this.state.selected}>
						<div className="textCont container">
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

					}
				</div>
			</Page>
		)
	}
}

laboratory.getInitialProps = async function (context) {
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
	if(context.query.view=='project'){
		const {id, view, projectId} = context.query;
		return {
			id,
			view,
			projectId,
			projectView:true,
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