import { h } from 'preact'
import style from './style'

const Footer = () => (
    <div>
        <div class={style.footer__seperator}></div>
        <div class={style.footer__quicklinks}>
            <a href="/">Vote</a>
            <a href="/">About</a>
            <a href="/results">Results</a>
        </div>
        <div class={style.footer__author}>
            <p class={style.footer__authortext}>
                Made with love by <br />
                <a class={style.footer__authorlink} href="https://github.com/samuelchristopher">Samuel Paul Christopher</a>
            </p>
        </div>
    </div>
)

export default Footer