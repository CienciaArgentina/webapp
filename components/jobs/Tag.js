import Link from 'next/link'

const Tag = (props) => (
	<div className={'TagC'+(props.delete?' --deletable':'')} onClick={props.delete?props.delete:null}>
		<label className="TagC__text">{props.text ? props.text : props.children}</label>
		{
			!!props.href ?
			<Link href={props.href} as={ props.as ? props.as : '' }>
				<a className="TagC__link" target={props.target?props.target:''}></a>
			</Link>
			: ''
		}
		{
			!!props.delete?
			<div className="TagC__delete">
				<i className="fas fa-times"></i>
			</div>
			: ''
		}
	</div>
)

export {
	Tag
}