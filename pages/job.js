import Page from '../layouts/main/main'
import Link from 'next/link'
import { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from 'react-modal'
Modal.setAppElement('#app')

import { JobsApi } from '../src/api/api'

import {
	InstituteName,
	Tag,
	MapBox,
	LabMap,
	JobPost,
} from '../components/Science';

const Hightlight = (props) => (
	<div className="highlight">
		<div className="highlight__icon">
			<i className={props.icon}></i>
		</div>
		<div className="highlight__text">
			<h4>{props.data}</h4>
			<p>{props.label}</p>
		</div>
	</div>
);

class job extends Component {
	static async getInitialProps(context) {
		const job = await JobsApi.getJob(context.query.id);
		return job
	}
	state = {
		isFav: this.props.isFav,
		modalApply: false
	};
	switchInterest = () => {
		const isFav = !this.state.isFav;
		this.setState( () => ({isFav}) );
		JobsApi.setFav(this.props.id).then(response => {}).catch(e=>{})
	}
	apply = () => {
		if(this.props.isLogged) {
			this.setState(()=>({
				modalApply:true
			}))
		} else {
			this.setState(()=>({
				modalApply:true
			}))
		}
	}
	closeModal = () => {
		this.setState(()=>({modalApply:false}))
	}
	render(){
		const job = this.props;
		return (
		<Page contentClass="bg--gray">
			<div className="jobPage">
				<Modal onRequestClose={this.closeModal} isOpen={this.state.modalApply} className='defaultModal --m --adviceModal'>
					<label className='label--s--gray'>
						Aplicar a <b>{{doctorate:'doctorado', posdoctorate:'posdoctorado'}[this.props.type]}</b>
					</label>
					<h2 className='mt-2'>
						{this.props.title}
					</h2>
					<div>
						<div>
							<button className='mt-4'>¡Aplicar!</button>
							<Link href='/editprofile?section=basic' as='/editProfile/basic'>
								<button className='mt-2 ml-2 bn--blue--outline'>Revisar mi perfil</button>
							</Link>
						</div>
						<div className='mt-2'>
							<label className='label--s--gray'>Asegurate de tener tu perfil completo antes de aplicar.</label><br/>
						</div>
					</div>
				</Modal>
				<div className="job__mobilApply">
					<Link href="/aplicar">
						<a>
							Postularme
						</a>
					</Link>
					{this.state.isFav ?
					<div onClick={this.switchInterest} className="markFav --fav"></div>
						:
					<div onClick={this.switchInterest} className="markFav"></div>
					}
				</div>
				<div className="job__header">
					<div className="container">
						<div className="job__header__back"></div>
						<div className="job__header__main">
							<div className="job__header__titles">
								<h3>{job.typeName}</h3>
								<h1>{job.title}</h1>
							</div>
							<div className="job__highlights">
							<Hightlight
								icon="fas fa-clock"
								data="4 años"
								label="Duración"
							/>
							{job.salary &&
								<Hightlight
									icon="fas fa-money-check-alt"
									data={`$${job.salary}`}
									label="Estipendo"
								/>
							}
							{job.endOffer &&
								<Hightlight
									icon="fas fa-calendar-alt"
									data={moment(job.endOffer).format('D MMMM')}
									label="Deadline"
								/>
							}
							</div>
							<div className="job__actions">
								<button onClick={this.apply} className="bn--green mr-4 bn--w2">Postularme</button>
								{this.state.isFav ?
								<button onClick={this.switchInterest} className="bn--blue bn--icon-star-filled">Te interesa</button>
								:
								<button onClick={this.switchInterest} className="bn--blue--outline bn--icon-star">Agregar a mis intereses</button>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="job__tabs container">
					<div className="job__details">
						<div className="job__details__data">
							<h3>Proyecto</h3>
							<ul className="job__details__detailsList">
								{job.posibleThesis &&
									<li>
										<i className="fas fa-graduation-cap"></i>
										<p>Posibilidad de presentación a tesina</p>
									</li>
								}
								{!!job.scholarship &&
									<li>
										<i className="fas fa-dollar-sign"></i>
										<p>Beca {job.scholarship} - ${job.salary}</p>
									</li>
								}
								{!!job.projectManager &&
									<li>
										<i className="fas fa-user"></i>
										<p>Responsable: {job.projectManager}</p>
									</li>
								}
								{!!job.contactEmail &&
									<li>
										<i className="fas fa-at"></i>
										<p>Contacto: {job.contactEmail}</p>
									</li>
								}
							</ul>
							<h3>Laboratorio</h3>
							<ul className="job__details__detailsList">
								<li>
									<i className="fas fa-university"></i>
									<p>
										<Link
											href={`/institute?id=${job.organization.instituteId}`}
											as={`/institute/${job.organization.instituteId}`}
										>
											<a>
												{job.organization.instituteName}
											</a>
											</Link>
										&nbsp;>&nbsp;
										<Link
											href={`/laboratory?id=${job.organization.labId}`}
											as={`/laboratory/${job.organization.labId}`}
										>
											<a>
												{job.organization.labName}
											</a>
										</Link>
									</p>
								</li>
								<li>
									<i className="fas fa-globe-americas"></i>
									<p>{job.organization.city}, {job.organization.country}</p>
								</li>
								<li>
									<i className="fas fa-flask"></i>
									<p>
											Proyecto:&nbsp;
											<Link
												href={`/laboratory?id=${job.organization.labId}&view=project&projectId=${job.organization.projectId}`}
												as={`/laboratory/${job.organization.labId}/project/${job.organization.projectId}`}
											>
												<a>
													{job.organization.projectName}
												</a>
											</Link>
									</p>
								</li>
							</ul>
							{!!job.researchTopics &&
								<div>
									<h3>Tema de investigación</h3>
									{job.researchTopics.split('\n').map((o,k) => (
										<p key={k}>
											{o}
										</p>
	
									))}
								</div>
							}
							{!!job.experimentalModel &&
								<div>
									<h3>Técnicas a utilizar y modelo experimental</h3>
									{job.experimentalModel.split('\n').map((o,k) => (
										<p key={k}>
											{o}
										</p>
	
									))}
								</div>
							}
							{job.tags && 
								<div>
									{job.tags.map((o,k)=>(
										<Tag
											key={k}
											text={o}
										/>
									))}
								</div>
							}
							<h3>Requisitos</h3>
							<h4>Obligatorios</h4>
							<ul>
								{job.labExperience === true &&
									<li>Tener experiencia en un laboratorio</li>
								}
								<li>
									{[
										'Estado de la carrera principiante',
										'Estado de la carrera inicial (~20% de las materias aprobadas)',
										'Estado de la carrera intermedio (~50% de las materias aprobadas)',
										'Estado de la carrera avanzado (~75% de las materias aprobadas)',
									].filter((o,k)=>(k==job.careerState))
									}
								</li>
								{!!job.requirements &&
									<li>{job.requirements}</li>
								}
							</ul>
							<h4>Preferentes</h4>
							<ul>
								{job.labExperience === false &&
									<li>Tener experiencia en un laboratorio</li>
								}
								{!!job.optionalRequirements &&
									<li>{job.optionalRequirements}</li>
								}
							</ul>
							<h3>Ubicación</h3>
							<p>{job.organization.locationName}</p>
							<LabMap
								instituteName={job.organization.instituteName}
								coordinates={job.organization.coordinates}
							/>
						</div>

						<div className="job__details__institute">
							<InstituteName
								logo={job.organization.logo}
								instituteId={job.organization.instituteId}
								name={job.organization.instituteName}
								labName={job.organization.labName}
								labId={job.organization.labId}
								noBackground
							/>
							{!!job.organization.instituteDescription &&
								<p className="text--s mt-3 mb-0 instituteDescription">
									{job.organization.instituteDescription}
								</p>
							}
							<div className="mt-2 institute__actions">
								{!!job.organization.instituteUrl && 
									<div>
										<a href={job.organization.instituteUrl} className="bn--text bn--icon-link" target="_blank">
											Sitio web
										</a>
									</div>
								}
								<div>
									<Link href={`/institute?id=${job.organization.instituteId}`} as={`/institute/${job.organization.instituteId}`}>
										<a className="bn--text mt-0">
											Perfil del instituto
										</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
		);
	}
}

const mapStateToProps = state => ({
	isLogged: state.user.isLogged,
	userData: state.user.userData
})

export default connect(mapStateToProps)(job)