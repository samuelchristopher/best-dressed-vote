import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<div class={style.header__mask}></div>
		<p class={style.header__theme}>Moonlight Rendezvous</p>
		<h3 class={style.header__mpp}>MPP 17/18</h3>
		<div class={style.header__seperator}></div>
	</header>
);

export default Header;


// <header class={style.header}>
		// <h1>MPP 17/18 Best Dressed Vote</h1>
		// <nav>
		// 	<Link activeClassName={style.active} href="/">Home</Link>
		// 	<Link activeClassName={style.active} href="/vote">Vote</Link>
		// 	<Link activeClassName={style.active} href="/results">Results</Link>
		// </nav>
	// </header>