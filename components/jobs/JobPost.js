import ReactTooltip from 'react-tooltip'
import Link from 'next/link'
import InstituteNameCard from '../institutes/InstituteName'
import moment from 'moment'

// import moment from 'moment'
moment.locale('es')

const JobPost = (props) => {
	const { data } = props
	// const jobType = data.jobType
	const jobType = 'Doctorado'
	const closeDeadline = data.endOffer ? moment.unix(data.endOffer).diff(moment(), 'months') < 2 : false
	return (
		<div className={`jobPost${!!props.noPadding?' noPadding':''}`}>
			<ReactTooltip effect='solid' />
			{props.noLogo ?
				''
			:
				<div className="jobPost__logo">
					<img src={"/static/img/logos-labos/"+data.organization.logo} />
				</div>
			}
			<div className="jobPost__content">
				<button className={"bn--reset jobPost__favStar"+(data.isFav ? ' fav' : '')}></button>
				<div className="jobPost__data">
					<InstituteNameCard
						img={data.organization.logo}
						name={data.organization.name}
						location={data.organization.locationName}
					/>
					<div className="main_data">
						<p className="jobPost__type">{jobType}</p>
						<Link href="/job">
							<a>
								<h3 className="jobPost__title">{data.title}</h3>
							</a>
						</Link>
					</div>
					<div className="middle_data">
						<p>
							<Link href={`/institute?id=${data.id}`} as={`/institute/${data.id}`}>
								<a>
									{data.organization.name} - {data.organization.laboratory}
								</a>
							</Link>
						</p>
						<p>{data.organization.locationName}</p>
					</div>
					<div className="button_data">
						<div className="iconData --persona --left">{data.responsible}</div>
					</div>
					<div className="jobPost__details">
						{!!data.salary &&
							<div className="iconData --estipendo"	data-tip="Estipendo">{data.salary}</div>
						}
						{!!data.duration &&
							<div className="iconData --tiempo"		data-tip="Duración">{data.duration} meses</div>
						}
						{!!data.endOffer &&
							<div className={`iconData --limite`+(!!closeDeadline ?' --urgente':'')} data-tip={"Deadline"}>{moment.unix(data.endOffer).fromNow()}</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
};

export default JobPost;