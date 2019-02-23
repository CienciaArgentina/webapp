import Link from 'next/link';

const LabList = (props) => (
	<div className="labList">
		{
			props.href ?
			<Link href={props.href} as={props.as ? props.as : ''}>
				<a onClick={props.onClick ? props.onClick : ''}>
					<h3>{props.title}</h3>
				</a>
			</Link>
			:
			<h3>{props.title}</h3>
		}
		<label className="researcher">{props.researcher}</label>
		<p>{props.description}</p>
		{!!props.activeJobs&&
			<div className="activeSearchs">
				<i className="fas fa-search"></i>
				<label>{props.activeJobs} {props.activeJobs>1?'búsquedas activas':'búsqueda activa'}</label>
			</div>
		}
	</div>
);

export default LabList