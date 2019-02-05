import ReactTooltip from 'react-tooltip'

const Busqueda = (props) => (
	<div className="busqueda">
		<ReactTooltip effect='solid' />
		<div className="busqueda__logo">
			<img src={"/static/img/logos-labos/"+props.logo} />
		</div>
		<div className="busqueda__content">
			<button className={"bn--reset busqueda__favStar"+(props.favorites ? ' fav' : '')}></button>
			<div className="busqueda__data">
				<div className="main_data">
					<p className="busqueda__type">Doctorado</p>
					<h3 className="busqueda__title">Impacto del cambio climático en sistemas naturales y recursos hídricos de superficie</h3>
				</div>
				<div className="middle_data">
					<p>Insituto Leloir</p>
					<p>Ciudad Autónoma de Buenos Aires</p>
				</div>
				<div className="button_data">
					<div className="iconData --persona">Dra. Jeanette Acosta</div>
				</div>
				<div className="busqueda__details">
					<div className="iconData --estipendo"	data-tip="Estipendo">$18.900</div>
					<div className="iconData --tiempo"		data-tip="Duración">4 años</div>
					<div className="iconData --limite --urgente" data-tip="Finaliza en">2 días</div>
				</div>
			</div>
		</div>
	</div>
);

export default Busqueda;