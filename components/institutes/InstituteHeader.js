const InstituteHeader = (props) => (
	<div className="institute__header">
	<div className="institute__headerData">
		{!!props.img &&
			<div className="institute__logo">
				<img src={props.img} />
			</div>
		}
		{props.title}
	</div>
	{props.tabs}
</div>
);

export default InstituteHeader;