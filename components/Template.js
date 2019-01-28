import Header from './Header';

const Page = (props) => (
	<div id="app">
		<Header></Header>
		<div id="content">
			{props.children}
		</div>
		<footer>
			<div>
				<img src="./static/img/logos/icon-white.svg" />
				© 2019 Ciencia Argentina
			</div>
		</footer>
	</div>
);

export default Page;