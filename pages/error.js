import Error from './_error';

export default class error extends React.Component {
	static async getInitialProps(context) {
		const statusCode = context.query.code ? context.query.code : 404;
		return {
			statusCode
		}
	}
	render() {
		return (
			<Error statusCode={this.props.statusCode} />
		)
	}
}