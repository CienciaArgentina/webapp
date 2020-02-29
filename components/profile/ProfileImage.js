import classnames from 'classnames'

const PorfileImage = props => (
	<div className={classnames(
		'ProfileImage',
		{
			'--hasIamge': !!props.img,
			'--noImage': !props.img
		},
		`--size-${props.size?props.size:'m'}`
	)}>
		{props.img ?
			<img src={props.img} />
			:
			<span>{props.name[0]}</span>
		}
	</div>
)

export default PorfileImage