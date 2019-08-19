import React from 'react'
import Page from '../layouts/main/main';


export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : (err ? err.statusCode : 404);
    return { statusCode }
  }

  render() {
	  const statusCode = this.props.statusCode;
    return (
		<Page>
			{(this.props.message||this.props.title) ?
				<div className="errorPage">
					{statusCode && <p className="errorCode">Error {statusCode}</p>}
					<p className="errorName">{this.props.title}</p>
					<p className="errorDesc">{this.props.message}</p>
				</div>
			:
				<div className="errorPage">
					{statusCode==404 && <img src="/static/img/404.svg" />}
					{(statusCode==500) && <img src="/static/img/500.svg" />}
					{statusCode!='undefined' ?
						<p className="errorCode">Error {statusCode}</p>
					:
						<p className="errorCode">Algo salió mal...</p>						
					}
					<p className="errorName">
						{statusCode == 404 && 'Page not found'}
						{statusCode == 500 && 'Internal server error'}
					</p>
					<p className="errorDesc">
						{statusCode == 404 && 'El diccionario lo define como una página que no se puede encontrar... Que NO se puede encontrar.'}
						{statusCode == 500 && 'Se descompone fácilmente.'}
					</p>
				</div>
			}
			{/* <p>
			{this.props.statusCode
				? `An error ${this.props.statusCode} occurred on server`
				: 'An error occurred on client'}
			</p> */}
		</Page>
    )
  }
}