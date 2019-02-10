import Page from '../layouts/main/main';
import InstituteNameCard from '../components/institutes/InstituteName';
import Link from 'next/link';
import { Component } from 'react'

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
				<div className="job__header">
					<div className="container">
						<div className="job__header__back"></div>
						<div className="job__header__main">
							<h3>Doctorado</h3>
							<h1>Regulación de la N-glicosilación de proteínas eucariotas</h1>
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
					<div className="job__tabMenu">
						<button className="bn--text active">General</button>
						<button className="bn--text">Requisitos</button>
						<button className="bn--text">Detalles</button>
					</div>
					<div className="job__details">
						<div className="job__details__data">
							<h3>Proyecto</h3>
							<ul>
								<li>Regulación de la N-glicosilación de proteínas eucariotas</li>
								<li>Supervisor: Dra. Jeanette Acosta</li>
								<li>Laboratorio: Biología Celular del RNA</li>
							</ul>
							<h3>Tema de investigación</h3>
							<p>
								These topics all rely on a solid background in mathematics, physics, and chemistry. The program also has a biotechnology dimension with courses on the exploitation of biological systems for developing new technologies and industrial applications. We educate future bioengineers who benefit from interdisciplinary undergraduate courses to build an understanding of engineering concepts and techniques. Students learn to apply engineering principles to the re-conceptualization of of biological phenomena and are trained to acquire skills for developing new materials and processes, including genetic modification of agriculturally important plants and human cells.
							</p>
							<p>
								Most of the graduates of the BIO program continue on with graduate education in Turkey and abroad. All of our graduates are equipped with in depth knowledge of modern molecular biology. Our graduates attain research and management positions in industrial and research institutions operating in various areas of the biological sciences and biotechnology.
							</p>
							<h3>Técnicas a utilizar y modelo experimental</h3>
							<p>
								Most of the graduates of the BIO program continue on with graduate education in Turkey and abroad. All of our graduates are equipped with in depth knowledge of modern molecular biology. Our graduates attain research and management positions in industrial and research institutions operating in various areas of the biological sciences and biotechnology.
							</p>
						</div>
						<div className="job__details__institute">
							<InstituteNameCard
								img="leloir_logo.png"
								id="asd"
								name="Instituto Leloir"
								laboratory="Biología Celular del RNA"
								laboratoryId="asd"
								noBackground
							/>
							<p className="text--s mt-3 mb-0">
								La Fundación Instituto Leloir es un centro de investigación científica dedicada a la investigación básica y a la formación de jóvenes investigadores en bioquímica y biología celular y molecular. La misión del Instituto es fomentar los más altos estándares de excelencia tanto en los proyectos de investigación como en la docencia.
							</p>
							<div>
								<Link href="https://www.leloir.org.ar/">
									<a className="bn--text bn--icon-link mt-2" target="_blank">
										Sitio web
									</a>
								</Link>
							</div>
							<div>
								<Link href="instituto/asd">
									<a className="bn--text mt-0">
										Perfil del instituto
									</a>
								</Link>
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
		isInterest: false
	}
	const res = await fetch('')
	const data = await res.json()
  
	return data
}