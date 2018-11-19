import { h } from 'preact'
import style from './style'
import General from '../.././components/vote/general'
import Specific from '../.././components/vote/specific'

const Vote = ({ category, showMessage }) => (
	<div class={style.vote}>
		{category === 'general' ? <General /> : <Specific showMessage={showMessage} category={category} />}
	</div>
)

export default Vote
