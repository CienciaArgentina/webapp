import React from 'react';
import Page from '../layouts/main/main';
import Link from 'next/link'
import ReactTooltip from 'react-tooltip'

const OfferCantidates = (props) => (
	<div className="offerCandidates">
		<div className="candidates__header">
			<div className="candiates__actions">
			</div>
			<div className="candidates__titles cellRow">
				<div className="cell profile"></div>
				{
					[
						['name',			'Nombre'],
						['age',				'Edad'],
						['university',		'Universidad'],
						['careerName',		'Carrera'],
						['careerStatus',	'Estado'],
						['labExperience',	'Experiencia'],
						['date',			'Fecha'],
					].map((o,k)=> (
						<div key={o[0]} className={`cell ${o[0]}`} onClick={()=>{props.sortBy(o[0])}}>
							<div>
								<label>{o[1]}</label>
								<i className={`
								fas fa-arrow-down
								${props.sortedBy==o[0]?'sorted':''}
								${props.sortedBy==(o[0]+'Reversed')?'sorted sortedReversed':''}
								`}></i>
							</div>
						</div>
					))
				}
			</div>
		</div>
		<div className="candidates__list">
			{props.candidates.map( (o,k)=> {
				return (
					<div key={k} className={`candidateConainer`+(o.selected?' selected':'')+(o.fav?' fav':'')}>
						<Link href={`/offerProfile`}>
							<a>
								<div className="candidateData cellRow">
									<div className="cell profile">
										<div>
											<img src={o.profile} />
										</div>
									</div>
									<div className="cell name">
										<div>
											{o.lastName}, {o.firstName}
										</div>
									</div>
									<div className="cell age">
										<div>
											{o.age}
										</div>
									</div>
									<div className="cell university">
										<div>
											{o.university}
										</div>
									</div>
									<div className="cell careerName">
										<div>
											{o.careerName}
										</div>
									</div>
									<div className="cell careerStatus">
										<div>
											{o.careerStatus}
										</div>
									</div>
									<div className="cell labExperience">
										<div>
											{o.experience?'Si':'No'}
										</div>
									</div>
									<div className="cell date">
										<div>
											{o.date}
										</div>
									</div>
								</div>
							</a>
						</Link>
					</div>
				);
			})}
		</div>
	</div>
)

export default class offerDashboard extends React.Component {
	constructor(props) {
		super(props);
		let {candidates} = props;
		if(candidates) {
			candidates.sort((a,b) => this.sortAB(
				`${a.lastName} ${a.firstName}`,
				`${b.lastName} ${b.firstName}`,
				false
			));
			candidates.sort((a,b) => this.sortAB(a.date, b.date, false) );
		}
		this.state = {
			candidates,
			sortedBy: 'date'
		}
	}
	jobType = "Doctorado"
	jobTitle = "Actividad neuronal y estimulantes pro-cognitivos"
	handleFav = (k) => {
		const id = this.state.candidates[k].id;
		let candidates = this.state.candidates;
		candidates[k].fav = !candidates[k].fav;
		this.setState(()=>({
			candidates
		}))
	}
	sortBy = (property) => {
		let reverse = this.state.sortedBy == property;
		let candidates = this.state.candidates;
		if(property == 'name'){
			candidates.sort((a,b) => this.sortAB(
				`${a.lastName} ${a.firstName}`,
				`${b.lastName} ${b.firstName}`,
				reverse
			));
		} else {
			candidates.sort((a,b) => this.sortAB(
				`${a.lastName} ${a.firstName}`,
				`${b.lastName} ${b.firstName}`,
				false
			));
		}
		if(property == 'age') {
			candidates.sort((a,b) => this.sortAB(a.age, b.age, reverse) );
		}
		if(property == 'university') {
			candidates.sort((a,b) => this.sortAB(a.university, b.university, reverse) );
		}
		if(property == 'careerName') {
			candidates.sort((a,b) => this.sortAB(a.careerName, b.careerName, reverse) );
		}
		if(property == 'careerStatus') {
			candidates.sort((a,b) => this.sortAB(a.careerStatus, b.careerStatus, reverse) );
		}
		if(property == 'labExperience') {
			candidates.sort((a,b) => this.sortAB(a.experience, b.experience, reverse) );
		}
		if(property == 'date') {
			candidates.sort((a,b) => this.sortAB(a.date, b.date, reverse) );
		}
		this.setState(()=>({candidates, sortedBy:reverse?`${property}Reversed`:property}))
	}
	sortAB = (A,B,reverse) => {
		if(A > B){
			return reverse ? -1 : 1
		} else if (A < B) {
			return reverse ? 1 : -1
		} else {
			return 0
		}
	}
	componentDidMount() {
		// this.sortBy('date');
	}
	render() {
		return (
			<Page contentClass="bg--gray">
				<ReactTooltip effect='solid' />
				<div id="offerDashboard" className="pt-3">
					<div className="offer__header">
						<h1>Postulaciones</h1>
						<div className="offer__details">
							<h3 className="text">
								<Link href={`/job`}>
									<a>
										{this.jobType} - {this.jobTitle}
									</a>
								</Link>
							</h3>
						</div>
						<div className="mb-1">
							<Link href={`/job`}>
								<button className="mr-2 pl-0 bn--gray--text">Ver</button>
							</Link>
							<button className="mr-2 bn--gray--text">Editar</button>
							<button data-tip={"No recibir más candidatos"} className="mr-2 bn--red--text">Cerrar oferta</button>
						</div>
					</div>
					<div className="offer__dataDashboard">
						{this.props.candidates ?
							<OfferCantidates
								candidates = {this.state.candidates}
								handleFav={this.handleFav}
								handleSelect={this.handleSelect}
								sortBy = {this.sortBy}
								sortedBy = {this.state.sortedBy}
							/>
						:
							<div className="noCandidates">
								<p>¡No hay postulaciones aún!</p>
							</div>
						}
						<div className="offer_highlights">
							<div className="highlight__row">
								<div className="highlight__icon">2</div>
								<div className="highlight__text">postulaciones nuevas</div>
							</div>
							<div className="highlight__row">
								<div className="highlight__icon">105</div>
								<div className="highlight__text">personas vieron esta búsqueda</div>
							</div>
							<div className="highlight__row">
								<div className="highlight__icon">3</div>
								<div className="highlight__text">personas interesadas aún no aplicaron</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}

offerDashboard.getInitialProps = async function() {
	return {
		candidates: [
			{
				id: 'asd',
				profile: '/static/img/equipo/mati.jpg',
				firstName: 'Matias Nahuel',
				lastName: 'Gonzalez Fernandez',
				age: 21,
				careerStatus: 'Intermedio',
				careerName: 'Biología',
				university: 'UBA',
				experience: true,
				fav: false,
				selected: false,
				date: '16 feb.'
			},
			{
				id: 'asd',
				profile: '/static/img/equipo/jean.jpg',
				firstName: 'Sabrina Jeanette',
				lastName: 'Acosta',
				age: 30,
				careerStatus: 'Avanzado',
				careerName: 'Química',
				university: 'ITBA',
				experience: true,
				fav: true,
				selected: false,
				date: '16 feb.'
			},
			{
				id: 'asd',
				profile: '/static/img/equipo/giuliano.jpg',
				firstName: 'Giuliano Tomas',
				lastName: 'Antelo',
				age: 25,
				careerStatus: 'Avanzado',
				careerName: 'Biología',
				university: 'UBA',
				experience: true,
				fav: true,
				selected: false,
				date: '2 feb.'
			},
			{
				id: 'asd',
				profile: '',
				firstName: 'Lucas',
				lastName: 'Lopez',
				age: 27,
				careerStatus: 'Avanzado',
				careerName: 'Física',
				university: 'UTN',
				experience: false,
				fav: true,
				selected: false,
				date: '4 ene.'
			}
		]
	}
}