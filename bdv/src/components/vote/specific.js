import { h, Component } from 'preact'
import AllUsersList from './allUsersList'
import MaleDropdown from './maleDropdown'
import FemaleDropdown from './femaleDropdown'
import style from './style'

export default class Specific extends Component {
    state = {
        selectedMaleKey: '',
        selectedFemaleKey: '',
        selectedUserKey: ''
    }

    render({ category }, { person }) {
        return (
            <div class={style.specific}>
                <a href="/vote">go back pls</a>
                <h1>vote for {category}</h1>
                <MaleDropdown category={category} />
                <FemaleDropdown category={category} />
                <AllUsersList />  
            </div>
        )
    }
}