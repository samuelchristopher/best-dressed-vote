import { h, Component } from 'preact'
import AllUsersList from './allUsersList'
import style from './style'

export default class Specific extends Component {
    state = {
        allUsers: {},
        maleVoteOptions: {},
        femaleVoteOptions: {},
        person: 'Sam'
    }

    render({ category }, { person }) {
        return (
            <div class={style.specific}>
                <a href="/vote">go back pls</a>
                <h1>vote for {category}</h1>
                <h3>hi {person}!</h3>
                <AllUsersList />  
            </div>
        )
    }
}