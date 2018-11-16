import { h } from 'preact';
import style from './style';

const Home = () => (
	<div class={style.home}>
		<h1>Moonlight Rendezvous</h1>
		<p>Best dressed vote by MPP 17/18</p>
		<p>Made with love by <a href="https://github.com/samuelchristopher">Samuel Paul Christopher</a></p>
	</div>
);

export default Home;
