import ReactTooltip from 'react-tooltip'
import Link from 'next/link'
import moment from 'moment'

import {
	InstituteName
} from '../Science'

// import moment from 'moment'
moment.locale('es')

const JobPost = (props) => {
	const { data } = props
	const closeDeadline = data.endOffer ? moment.unix(data.endOffer).diff(moment(), 'months') < 2 : false
	return (
		<div className={`jobPost${!!props.noPadding?' noPadding':''}`}>
			<ReactTooltip effect='solid' />
			{props.noLogo ?
				''
			:
				<div className="jobPost__logo">
					<img src={data.organization.logo} />
				</div>
			}
			<div className="jobPost__content">
				<button className={"bn--reset jobPost__favStar"+(data.isFav ? ' fav' : '')}></button>
				<div className="jobPost__data">
					<InstituteName
						logo={data.organization.logo}
						name={data.organization.instituteName}
						instituteId={data.organization.instituteId}
						city={data.organization.city}
						country={data.organization.country}
					/>
					<div className="main_data">
						<p className="jobPost__type">
							{data.typeName}{data.posibleThesis?' / tesina':false}
						</p>
						<Link href={`/job/${data.id}`}>
							<a>
								<h3 className="jobPost__title">{data.title}</h3>
							</a>
						</Link>
					</div>
					<div className="middle_data">
						<p>
							<Link href={`/institute?id=${data.organization.instituteId}`} as={`/institute/${data.organization.instituteId}`}>
								<a>
									{
										data.organization.acronyms ?
										data.organization.acronyms :
										data.organization.instituteName
									}
								</a>
							</Link>&nbsp;-&nbsp;
							<Link href={`/laboratory?id=${data.organization.labId}`} as={`/laboratory/${data.organization.labId}`}>
								<a>{data.organization.labName}</a>
							</Link>
							
						</p>
						<p>{`${data.organization.city}, ${data.organization.country}`}</p>
					</div>
					<div className="button_data">
						<div className="iconData --persona --left">{data.projectManager}</div>
					</div>
					<div className="jobPost__details">
						{!!data.scholarship &&
							<div className="iconData --beca"	data-tip="Tipo de beca">Beca {data.scholarship}</div>
						}
						{!!data.duration &&
							<div className="iconData --tiempo"		data-tip="Duración">{data.duration} meses</div>
						}
						{!!data.endOffer &&
							<div className={`iconData --limite`+(!!closeDeadline ?' --urgente':'')} data-tip={"Deadline"}>Cierra: {moment.unix(data.endOffer).fromNow()}</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
};

export {
	JobPost
};