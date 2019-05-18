import Link from 'next/link';

const InstituteName = (props) => (
	<div className="InstituteName">
		<div className={`__profilePick`+(props.noBackground?' __noBackground':'')}>
			<Link href={`/institute?id=${props.instituteId}`} as={`/institute/${props.instituteId}`}>
				<a>
					<div>
						<img alt={props.name} src={props.logo} />
					</div>
				</a>
			</Link>
		</div>
		<div className="__profileData">
			<Link href={`/institute?id=${props.instituteId}`} as={`/institute/${props.instituteId}`}>
				<a className="__name">
					<h4>{props.name}</h4>
				</a>
			</Link>
			<div className="__detail">
				{!!props.city && 
					<p className="__location">{props.city} - {props.country}</p>
				}
				{!!(props.labName&&props.labId) &&
					<Link href={`/laboratory/${props.labId}`}>
						<a>
							<p className="__laboratory">{props.labName}</p>
						</a>
					</Link>
				}
			</div>
		</div>
	</div>
);

export default InstituteName;