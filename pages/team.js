import Page from '../layouts/main/main'

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
		photo: "giuliano.jpg",
		nombre: "Giuliano Tomás",
		apellido: "Antelo",
		social: {
			researchGate: "Giuliano_Antelo",
			twitter: "Giuliano_Tomas",
			instagram: "giuliano.antelo",
			facebook: "giuliano.antelo"
		}
	},
	{
		photo: "lucas.jpg",
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
		photo: "jean.jpg",
		nombre: "Jeanette",
		apellido: "Acosta",
		social: {
			linkedin: "jeaneacosta",
			instagram: "acosta.s.jeanette"
		}
	},
	{
		photo: "santi.jpg",
		nombre: "Santiago",
		apellido: "Cosco",
		social: {
			linkedin: "santiago-cosco",
			instagram: "santiago_cosco"
		}
	},
	{
		photo: "nico.jpg",
		nombre: "Nicolas",
		apellido: "García Camilo",
		social: {
			github: "nicolascamilo",
			linkedin: "nicolas-ezequiel-garcia-camilo",
		}
	},
	{
		photo: "aldanois.jpg",
		nombre: "Aldano",
		apellido: "Pelusso",
		social: {
			github: "aldanois",
			linkedin: "aldanois",
			twitter: "aldanois",
			instagram: "aldanois",
			facebook: "aldanois",
		}
	},
	{
		photo: "debo.jpg",
		nombre: "Débora",
		apellido: "Villalobo",
		social: {
			linkedin: "debora-villalobo",
			twitter: "debora537",
			instagram: "deborav.12",
			facebook: "debora.villalobo"
		}
	},
	{
		photo: "ale.jpg",
		nombre: "Alejandro",
		apellido: "Banzas",
		social: {
			github: "AleBanzas",
			linkedin: "alebanzas"
		}
	}
];
const socialIcons = {
	researchGate: {
		baseLink: "https://www.researchgate.net/profile/",
		icon: <i className="fab fa-researchgate"></i>
	},
	github: {
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
	},
	facebook: {
		baseLink: "https://www.facebook.com/",
		icon: <i className="fab fa-facebook"></i>
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

const teamPage = (props) => (
	<Page contentClass="bg--gray pt-7 pb-7">
		<div id="equipo" className="container--m">
			<h1 className="grayTitle">Quiénes somos</h1>
			<div className="equipo__description">
				<p className="text--l">Somos un grupo de nerds que busca facilitar la comunicación en el campo de la ciencia. Nos dedicamos a buscar ofertas de pasantías, doctorados y posdoctorados y publicarlas para que los estudiantes y científicos puedan encontrar fácilmente un lugar para continuar con su carrera. Esta plataforma es de código abierto y fue creada de manera voluntaria, podés ver el código y contribuir a la plataforma en <a href="https://github.com/CienciaArgentina" target="_blank">Github.</a></p>
				{/* <p className="text--l">¿Tenés dudas? Tenemos una página de preguntas frecuentes donde respondemos algunas preguntas útiles.</p> */}
				<div className="equipo__lista">
					{equipoLista.map( (o,key)=>(
						<EquipoProfile key={key} data={o} />
					) )}
				</div>
			</div>
		</div>
	</Page>
);

export default teamPage;