import Link from 'next/link';

const Footer = (props) => (
	<footer>
		<div className="footer__logo">
			<img src="/static/img/logos/icon-white.svg" />
			Ciencia Argentina
		</div>
		<div className="footer__link">
			<Link href="/faq">
				<a>FAQs</a>
			</Link>
			<Link href="/team">
				<a>Equipo</a>
			</Link>
		</div>
	</footer>
);

export default Footer;