import ReactTooltip from 'react-tooltip'
import Link from 'next/link'
import InstituteNameCard from '../institutes/InstituteName'

const JobPost = (props) => (
	<div className={`jobPost${!!props.noPadding?' noPadding':''}`}>
		<ReactTooltip effect='solid' />
		<div className="jobPost__logo">
			<img src={"/static/img/logos-labos/"+props.logo} />
		</div>
		<div className="jobPost__content">
			<button className={"bn--reset jobPost__favStar"+(props.favorite ? ' fav' : '')}></button>
			<div className="jobPost__data">
				<InstituteNameCard
					img={props.logo}
					id="asd"
					name={props.instituteName}
					location={props.place}
				/>
				<div className="main_data">
					<p className="jobPost__type">{props.type}</p>
					<Link href="/job" prefetch={props.prefetch?true:false}>
						<a>
							<h3 className="jobPost__title">{props.title}</h3>
						</a>
					</Link>
				</div>
				<div className="middle_data">
					<p>{props.instituteName}</p>
					<p>{props.place}</p>
				</div>
				<div className="button_data">
					<div className="iconData --persona --left">{props.boss}</div>
				</div>
				<div className="jobPost__details">
					{!!props.earn &&
						<div className="iconData --estipendo"	data-tip="Estipendo">{props.earn}</div>
					}
					{!!props.duration &&
						<div className="iconData --tiempo"		data-tip="Duración">{props.duration}</div>
					}
					{!!props.deadline &&
						<div className={`iconData --limite`+(!!props.closeDeadline ?' --urgente':'')} data-tip={"Deadline"}>{props.deadline}</div>
					}
				</div>
			</div>
		</div>
	</div>
);

export default JobPost;