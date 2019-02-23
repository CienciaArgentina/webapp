import {
	JobPost
} from '../Science'

const ProjectPage = (props) => (
	<div id="project" className="container contentDisplay textCont">
	<div onClick={props.onBack} className="projectBack">
		<i className="fas fa-angle-left"></i>
		<span>Lista de proyectos</span>
	</div>
	
	<h2 className="projectName">Mutaciones y deleciones de genes de interés, y complementación de las mismas.</h2>
	
	<div className="institute__staff">
		<div className="staff__person">
			<p className="staff__name">Jeanette Acosta</p>
			<label className="staff__position">Responsable del proyecto</label>
			<label className="staff__mail">jeanette@cienciaargentina.com</label>
		</div>
	</div>
	<p className="text">
		Cuando las células se encuentran en condiciones poco favorables o adversas despliegan una respuesta protectiva para ayudar a la supervivencia y evitar la muerte celular.  Esta reacción se da en todos los organismos y es denominada “respuesta al estrés celular”. El estrés celular es importante en diversas patologías humanas, y la intervención del balance muerte-sobrevida es la base racional de numerosas terapias.
	</p>
	<h3>Modelo experimental y técnicas</h3>
	<p className="text">
		Cuando las células se encuentran en condiciones poco favorables o adversas despliegan una respuesta protectiva para ayudar a la supervivencia y evitar la muerte celular.  Esta reacción se da en todos los organismos y es denominada “respuesta al estrés celular”. El estrés celular es importante en diversas patologías humanas, y la intervención del balance muerte-sobrevida es la base racional de numerosas terapias.
	</p>
	<h3 className="pb-2">Búsquedas activas</h3>
	<div>
		{[0,0,0].map( (o,k)=>(
			<JobPost key={k}
				title= "Regulación de la N-glicosilación de proteínas eucariotas"
				type= "Doctorado"
				instituteName= "Insituto Leloir"
				place= "Ciudad Autónoma de Buenos Aires"
				boss= "Dra. Jeanette Acosta"
				logo= "leloir_logo.png"
				earn= "$18.900"
				duration= "4 años"
				deadline= "10 Ago."
				closeDeadline={false}
				favorite={false}
				noPadding
			/>
		) )}
	</div>
</div>
);

export default ProjectPage;