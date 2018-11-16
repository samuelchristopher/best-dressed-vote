import { h } from 'preact'
import style from './style'
import General from '../.././components/vote/general'
import Specific from '../.././components/vote/specific'

const Vote = ({ category }) => (
	<div class={style.vote}>
		{category === 'general' ? <General /> : <Specific category={category} />}
	</div>
)

export default Vote
