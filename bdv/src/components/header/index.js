import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>MPP 17/18 Best Dressed Vote</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/vote">Vote</Link>
			<Link activeClassName={style.active} href="/results">Results</Link>
		</nav>
	</header>
);

export default Header;
