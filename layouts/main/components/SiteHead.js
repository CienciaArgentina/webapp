import Head from 'next/head';
import Router from 'next/router';

const SiteHead = (props) => (
<Head>
	<title>{props.title?props.title+' | ':''}Ciencia Argentina</title>
	<meta name="og:title" property="og:title" content={
		props.title?props.title+' | Ciencia Argentina':'Ciencia Argentina'
	} />
	<meta name="description" content={
		props.description ? props.description :
		'Encontrá tu lugar en la ciencia.'
	} />
	<meta name="og:description" property="og:description" content={
		props.description ? props.description :
		'Encontrá tu lugar en la ciencia.'
	} />
	<meta name="og:type" property="og:type" content="website" />
	<meta name="og:image" property="og:image" content={
		props.ogimage ?
		props.ogimage :
		'/static/img/favicon/ogimage.jpg'
	} />
	<meta property="og:site_name" content="Ciencia Argentina" />
	{/* FAVICONS */}
	<link rel="icon" type="image/x-icon" href="/static/img/favicon/favicon.ico" />
	<link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/static/img/favicon/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon/favicon-16x16.png" />
	{/* apple */}
	<link rel="apple-touch-icon" sizes="57x57" href="/static/img/favicon/apple-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="/static/img/favicon/apple-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="/static/img/favicon/apple-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="/static/img/favicon/apple-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="/static/img/favicon/apple-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/static/img/favicon/apple-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="/static/img/favicon/apple-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/static/img/favicon/apple-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicon/apple-icon-180x180.png" />
	{/* android */}
	{/* ms */}
	<meta name="msapplication-TileColor" content="#1b75bb" />
	<meta name="msapplication-TileImage" content="/static/img/favicon/ms-icon-144x144.png" />
	<meta name="msapplication-square70x70logo" content="/static/img/favicon/ms-icon-70x70.png" />
	<meta name="msapplication-square150x150logo" content="/static/img/favicon/ms-icon-150x150.png" />
	<meta name="msapplication-square310x310logo" content="/static/img/favicon/ms-icon-310x310.png" />
	<meta name="msapplication-wide310x150logo" content="/static/img/favicon/ms-icon-wide-310x150.png" />
	{/* theme */}
	<meta name="theme-color" content="#1b75bb" />
	{/* END FAVICONS */}
	<link rel="stylesheet" href="/static/css/nprogress.css" />
	{/* MANIFEST */}
	<link rel="manifest" href="/static/manifest.json" />
</Head>
);

export default SiteHead;