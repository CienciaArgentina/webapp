import React from 'react'
import Page from '../layouts/main/main'
import Link from 'next/link'

export default class offerProfile extends React.Component {
	render() {
		return (
			<Page contentClass="bg--gray">
				<div id="offerProfile" className="">
					<div className="offerBack backButton">
						<Link href={`/offerDashboard`}>
							<a>
								<span>Volver</span>
							</a>
						</Link>
					</div>
					<div className="offerProfileContent">
						<div className="offerProfileList">
							<div className="__fixedContent">
								{[0,0,0,0,0].map((o,k)=>(
									<div key={k} className={`profileList__item`+(k==0?' profileSelected':'')}>
										<p className="profileName">Antelo Giuliano Tomas</p>
										<p className="profileEmail">antelogt@cienciaargentina.com</p>
									</div>
								))}
							</div>
						</div>
						<div className="offerProfileData">
							<div className="offerHeader">
								<div className="offerHeader__prev"></div>
								<div className="offerHeader__profile">
									<div className="offerHeader__profilePic">
										<img src={`/static/img/equipo/giuliano.jpg`} alt={`Foto de perfil`} />
									</div>
									<div className="offerHeader__name">
										<h1>Giuliano Tomás Antelo</h1>
										<p>Buenos Aires - Argentina</p>
										<p className="mt-1 text mb-0">
											<Link href={`mailto:ejemplo@mail.com`}>
												<a target="_blank">
													ejemplo@mail.com
												</a>
											</Link>
										</p>
									</div>
								</div>
								<div className="offerHeader__next"></div>
							</div>
							<div className="offerProfile__sections">
								<div className="profile__section __estudios">
									<div className="section__header">
										<i className="fas fa-graduation-cap"></i>
										<h2>Estudios</h2>
									</div>
									<div className="section__content">
										<div className="section__dataList">
											<div>
												<h3>Universidad de Buenos Aires - Argentina</h3>
												<label>Fisica</label>
												<label>2015 - Cursando (Avanzado)</label>
											</div>
											<div>
												<h3>Insituto Leloir - Argentina</h3>
												<label>Phd en algo</label>
												<label>2014 - 2018</label>
											</div>
										</div>
									</div>
								</div>
								<div className="profile__section __experiencia">
									<div className="section__header">
										<i className="fas fa-flask"></i>
										<h2>Experiencia</h2>
									</div>
									<div className="section__content">
										<div className="section__dataList">
											<div>
												<h3>Instituto Leloir</h3>
												<label>Laboratorio: Biología celular del RNA</label>
												<label>2015 - Actualidad</label>
												<label>Becario doctoral</label>
												{/* <div className="experience__description">
													<p>
														Cras congue elementum eleifend. Sed scelerisque sapien sed ligula interdum efficitur. In hac habitasse platea dictumst. Curabitur in ultrices ligula. Praesent tincidunt pharetra odio, eget tincidunt nibh convallis et. Donec a risus dictum, consequat magna non, fermentum diam. Suspendisse ut nunc consequat, bibendum lacus sed, varius mi.
													</p>
													<p>
														Sed convallis sagittis urna, id condimentum nisi blandit a. Sed vitae facilisis erat, imperdiet porttitor urna. Phasellus at porta ante. Sed vestibulum tortor vitae eros imperdiet lacinia.
													</p>
												</div> */}
											</div>
											<div>
												<h3>Instituto IFIBYNE</h3>
												<label>Laboratorio: Biología celular del RNA</label>
												<label>2015 - 2017</label>
												<label>Becario doctoral</label>
											</div>
										</div>
									</div>
								</div>
								<div className="profile__section __estudios">
									<div className="section__header">
										<i className="fas fa-file-alt"></i>
										<h2>Publicaciones científicas</h2>
									</div>
									<div className="section__content">
										<div className="section__dataList">
											<div>
												<p>
													Life and Work of Stress Granules and Processing Bodies: New Insights into Their Formation and Function.
												</p>
												<label>2015 - Science</label>
												<label>Antelo GT, et al.</label>
											</div>
											<div>
												<p>
													Life and Work of Stress Granules and Processing Bodies: New Insights into Their Formation and Function.
												</p>
												<label>2015 - Science</label>
												<label>Antelo GT, et al.</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="offerProfileActions">
							<div className="__fixedContent">
								<div className="bn--green px-0 mb-2">Aceptar postulación</div>
								<div className="bn--red px-0">Rechazar postulación</div>
								<button className="mt-4 py-0 bn--icon-download bn--text">Descargar CV</button>
								<div className="action__section">
									<div className="section__header">
										<i className="fas fa-sticky-note"></i>
										<h2>Notas</h2>
									</div>
									<div className="addNote">
										<textarea placeholder="Escribe una nota sobre este perfil."></textarea>
										<p className="label--s--gray mt-1">Las notas no son visibles para los candidatos.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		)
	}
}