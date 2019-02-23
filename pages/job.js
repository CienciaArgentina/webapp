import Page from '../layouts/main/main'
import Link from 'next/link'
import { Component } from 'react'

import {
	InstituteName,
	Tag,
	Mapbox
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

export default class job extends Component {
	state= {
		isInterest: this.props.isInterest
	};
	switchInterest = () => {
		const isInterest = !this.state.isInterest;
		this.setState( () => ({isInterest}) );
	}
	render(){
		return (
		<Page contentClass="bg--gray">
			<div className="jobPage">
				<div className="job__mobilApply">
					<Link href="/aplicar">
						<a>
							Postularme
						</a>
					</Link>
					{this.state.isInterest ?
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
								<h3>Doctorado</h3>
								<h1>Regulación de la N-glicosilación de proteínas eucariotas</h1>
							</div>
							<div className="job__highlights">
							<Hightlight
								icon="fas fa-clock"
								data="4 años"
								label="Duración"
							/>
							<Hightlight
								icon="fas fa-money-check-alt"
								data="$18.900"
								label="Estipendo"
							/>
							<Hightlight
								icon="fas fa-calendar-alt"
								data="31 Mayo"
								label="Deadline"
							/>
							</div>
							<div className="job__actions">
								<button className="bn--green mr-4 bn--w2">Postularme</button>
								{this.state.isInterest ?
								<button onClick={this.switchInterest} className="bn--blue bn--icon-star-filled">Te interesa</button>
								:
								<button onClick={this.switchInterest} className="bn--blue--outline bn--icon-star">Agregar a mis intereses</button>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="job__tabs container">
					{/* <div className="job__tabMenu">
						<button className="bn--text active">General</button>
						<button className="bn--text">Requisitos</button>
						<button className="bn--text">Detalles</button>
					</div> */}
					<div className="job__details">
						<div className="job__details__data">
							<h3>Proyecto</h3>
							<ul className="job__details__detailsList">
								<li>
									<i className="fas fa-graduation-cap"></i>
									<p>Posibilidad de presentación a tesina</p>
								</li>
								<li>
									<i className="fas fa-dollar-sign"></i>
									<p>Beca CONICET - $18.600</p>
								</li>
								
								<li>
									<i className="fas fa-user"></i>
									<p>Responsable: Dra. Jeanette Acosta</p>
								</li>
								<li>
									<i className="fas fa-at"></i>
									<p>Contacto: giuliano@cienciaargentina.com</p>
								</li>
							</ul>
							<h3>Laboratorio</h3>
							<ul className="job__details__detailsList">
								<li>
									<i className="fas fa-university"></i>
									<p>
										<Link
											href={`/institute?id=asd`}
											as="/institute/ads"
										>
											<a>
												Instituto Leloir
											</a>
											</Link>
										&nbsp;>&nbsp;
										<Link
											href={`/laboratory?id=asd`}
											as="/laboratory/ads"
										>
											<a>
												Biología Celular del RNA
											</a>
										</Link>
									</p>
								</li>
								<li>
									<i className="fas fa-globe-americas"></i>
									<p>Buenos Aires, Argentina</p>
								</li>
								<li>
									<i className="fas fa-flask"></i>
									<p>
											Proyecto:&nbsp;
											<Link
												href={`/laboratory?id=asd&view=project&projectId=asd`}
												as="/laboratory/ads/project/asd"
											>
												<a>
													Mutaciones y deleciones de genes de interés, y complementación de las mismas.
												</a>
											</Link>
									</p>
								</li>
							</ul>
							<h3>Tema de investigación</h3>
							<p>
								These topics all rely on a solid background in mathematics, physics, and chemistry. The program also has a biotechnology dimension with courses on the exploitation of biological systems for developing new technologies and industrial applications. We educate future bioengineers who benefit from interdisciplinary undergraduate courses to build an understanding of engineering concepts and techniques.
							</p>
							<p>
								Students learn to apply engineering principles to the re-conceptualization of of biological phenomena and are trained to acquire skills for developing new materials and processes, including genetic modification of agriculturally important plants and human cells.
							</p>
							<h3>Técnicas a utilizar y modelo experimental</h3>
							<p>
								Most of the graduates of the BIO program continue on with graduate education in Turkey and abroad. All of our graduates are equipped with in depth knowledge of modern molecular biology. Our graduates attain research and management positions in industrial and research institutions operating in various areas of the biological sciences and biotechnology.
							</p>
							<div>
								<Tag 
									text="Biología"
								/>
								<Tag 
									text="Plantas"
								/>
								<Tag>ADN</Tag>
							</div>
							<h3>Requisitos</h3>
							<h4>Obligatorios</h4>
							<ul>
								<li>Tener experiencia en un laboratorio</li>
								<li>Adjuntar carta de presentación</li>
								<li>Adjuntar referentes</li>
								<li>Finalizar carrera antes del 10/5/2018</li>
							</ul>
							<h4>Preferentes</h4>
							<ul>
								<li>Estado de la carrera avanzado (~75% de las materias aprobadas)</li>
								<li>Alemán intermedio</li>
							</ul>
							<h3>Ubicación</h3>
							<p>Callao 86, Ciudad Autónoma de Buenos Aires, Argentina</p>
							<Mapbox
								geoJsonData = {{
									"type": "FeatureCollection",
									"features": [{
										"type": "Feature",
										"geometry": {
											"type": "Point",
											"coordinates": [-58.4330264,-34.6020053]
										},
										"properties": {
											"title": "Instituto Leloir",
											"icon": "LabIcon"
										}
									}]
								}}
								center= {[-58.4330264,-34.6020053]}
							/>
						</div>

						<div className="job__details__institute">
							<InstituteName
								img="leloir_logo.png"
								id="asd"
								name="Instituto Leloir"
								laboratory="Biología Celular del RNA"
								laboratoryId="asd"
								noBackground
							/>
							<p className="text--s mt-3 mb-0 instituteDescription">
								La Fundación Instituto Leloir es un centro de investigación científica dedicada a la investigación básica y a la formación de jóvenes investigadores en bioquímica y biología celular y molecular. La misión del Instituto es fomentar los más altos estándares de excelencia tanto en los proyectos de investigación como en la docencia.
							</p>
							<div className="mt-2 institute__actions">
								<div>
									<Link href="https://www.leloir.org.ar/">
										<a className="bn--text bn--icon-link" target="_blank">
											Sitio web
										</a>
									</Link>
								</div>
								<div>
									<Link href="institute?id=asd" as="institute/asd">
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

job.getInitialProps = async function() {
	return {
		isInterest: false,
		
	}
	const res = await fetch('')
	const data = await res.json()
  
	return data
}