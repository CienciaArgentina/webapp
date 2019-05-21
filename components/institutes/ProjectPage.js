import {
	JobPost
} from '../Science'

const ProjectPage = (props) => (
	<div id="project" className="contentDisplay textCont">
		<div>
			<div onClick={()=>{props.onBack(1)}} className="projectBack">
				<i className="fas fa-angle-left"></i>
				<span>Lista de proyectos</span>
			</div>
			
			<h2 className="projectName">{props.projectData.projectName}</h2>
			{props.projectData.projectHead &&
				<div className="institute__staff">
					<div className="staff__person">
						<p className="staff__name">{props.projectData.projectHead}</p>
						<label className="staff__position">Responsable del proyecto</label>
						{/* <label className="staff__mail">jeanette@cienciaargentina.com</label> */}
					</div>
				</div>
			}
			{props.projectData.projectDescription.split('\r').map((o,k)=>(<p className="text" key={k}>{o}</p>))}
			{props.projectData.experimentalModel &&
				<>
					<h3>Modelo experimental y técnicas</h3>
					{props.projectData.experimentalModel.split('\r').map((o,k)=>(<p className="text" key={k}>{o}</p>))}
				</>
			}
			<h3 className="pb-2">Búsquedas activas</h3>
			<div>
				{props.jobs && props.jobs.map( (o,k)=>(
					<JobPost key={k}
						data={o}
					/>
				) )}
			</div>
		</div>
</div>
);

export {
	ProjectPage
};