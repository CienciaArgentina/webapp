import React from 'react'
import Page from '../components/Template';


export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
		<Page>
			<div className="errorPage">
				<img src="/static/img/404.svg" />
				<p className="errorCode">Error {this.props.statusCode}</p>
				<p className="errorName">
					{this.props.statusCode == 404 ? 'Page not found' :''}
				</p>
				<p className="errorDesc">
					{this.props.statusCode == 404 ? 'El diccionario lo define como una Página que no se puede encontrar... Que NO se puede encontrar.' :''}
				</p>
			</div>
			{/* <p>
			{this.props.statusCode
				? `An error ${this.props.statusCode} occurred on server`
				: 'An error occurred on client'}
			</p> */}
		</Page>
    )
  }
}