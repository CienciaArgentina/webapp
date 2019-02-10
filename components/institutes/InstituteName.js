import Link from 'next/link';

const InstituteName = (props) => (
	<div className="InstituteName">
		<div className={`__profilePick`+(props.noBackground?' __noBackground':'')}>
			<Link href={`/institute/${props.id}`}>
				<a>
					<div>
						<img alt={props.name} src={`/static/img/logos-labos/${props.img}`} />
					</div>
				</a>
			</Link>
		</div>
		<div className="__profileData">
			<Link href={`/institute/${props.id}`}>
				<a className="__name">
					<h4>{props.name}</h4>
				</a>
			</Link>
			<div className="__detail">
				{!!props.location && 
					<p className="__location">{props.location}</p>
				}
				{!!(props.laboratory&&props.laboratoryId) &&
					<Link href={`/laboratory/${props.laboratoryId}`}>
						<a>
							<p className="__laboratory">{props.laboratory}</p>
						</a>
					</Link>
				}
			</div>
		</div>
	</div>
);

export default InstituteName;