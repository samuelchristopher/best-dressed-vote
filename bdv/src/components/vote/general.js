import { h } from 'preact'
import style from './style'

const General = () => (
    <div class={style.general}>
        <div class={style.general__votecatcard}>
            <p class={style.general__votefor}>vote for</p>
            <a class={style.general__catlink} href="/vote/lecturer">best <br/>dressed <br/>lecturers</a>
        </div>
        <div class={style.general__votecatcard}>
            <p class={style.general__votefor}>vote for</p>
            <a class={style.general__catlink} href="/vote/student">best <br/>dressed <br/>students</a>
        </div>
    </div>
)

export default General