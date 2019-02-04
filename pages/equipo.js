import Page from '../components/Template'

const equipoLista = [
	{
		photo: "mati.jpg",
		nombre: "Matías Nahuel",
		apellido: "González Fernández",
		social: {
			github: "matiasngf",
			linkedin: "mgonzalezf",
			twitter: "matiNotFound",
			instagram: "matiasgf_"
		}
	},
	{
		nombre: "Giuliano Tomás",
		apellido: "Antelo"
	},
	{
		nombre: "Lucas Francisco",
		apellido: "Lopez",
		social: {
			github: "lucaslopezf",
			linkedin: "lucaslopezf",
			twitter: "lucaslopezf",
			instagram: "lucaslopezf"
		}
	},
	{
		nombre: "Jeanette",
		apellido: "Acosta",
		social: {
			linkedin: "jeaneacosta",
			instagram: "acosta.s.jeanette"
		}
	},
];
const socialIcons = {
	'github': {
		baseLink: "https://github.com/",
		icon: <i className="fab fa-github"></i>
	},
	linkedin: {
		baseLink: "https://www.linkedin.com/in/",
		icon: <i className="fab fa-linkedin"></i>
	},
	twitter: {
		baseLink: "https://twitter.com/",
		icon: <i className="fab fa-twitter"></i>
	},
	instagram: {
		baseLink: "https://www.instagram.com/",
		icon: <i className="fab fa-instagram"></i>
	}
}
const SocialLink = (props) => (
	<div className="socialIcon">
		<a target="_blank" href={socialIcons[props.red].baseLink+props.url}>
			{socialIcons[props.red].icon}
		</a>
	</div>
)
const EquipoProfile = (props) => (
	<div className="equipo__perfil">
		<div className="profilePhoto" style={props.data.photo ? {backgroundImage: `url(/static/img/equipo/${props.data.photo})`} : {}}></div>
		<div className="equipo__nombre">
			<p>{props.data.nombre} {props.data.apellido}</p>
		</div>
		<div className="socialIcons">
			{props.data.social ? Object.keys(props.data.social).map((key) => (
				<SocialLink key={key} red={key} url={props.data.social[key]} />)
			) : false}
		</div>
	</div>
)

const equipo = (props) => (
	<Page contentClass="bg--gray pt-7 pb-7">
		<div id="equipo" className="container--m">
			<h1 className="grayTitle">Quiénes somos</h1>
			<div className="equipo__description">
				<p className="text--l">Somos un grupo de nerds que busca facilitar la comunicación en el campo de la ciencia. Nos dedicamos a buscar ofertas de pasantías, doctorados y posdoctorados y publicarlas para que los estudiantes y científicos puedan encontrar fácilmente un lugar para continuar con su carrera. Esta plataforma es de código abierto y fue creada de manera voluntaria, podés ver el código en <a href="https://github.com/CienciaArgentina" target="_blank">Github.</a></p>
				<p className="text--l">¿Tenés dudas? Tenemos una página de preguntas frecuentes donde respondemos algunas preguntas útiles.</p>
				<div className="equipo__lista">
					{equipoLista.map( (o,key)=>(
						<EquipoProfile key={key} data={o} />
					) )}
				</div>
			</div>
		</div>
	</Page>
);

export default equipo;