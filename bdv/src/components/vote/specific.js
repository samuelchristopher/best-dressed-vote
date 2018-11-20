import { h, Component } from 'preact'
import AllUsersList from './allUsersList'
import MaleDropdown from './maleDropdown'
import FemaleDropdown from './femaleDropdown'
import * as firebase from 'firebase/app'
import 'firebase/database'
import style from './style'

export default class Specific extends Component {
    constructor() {
        super()

        this.updateSelectedMale = this.updateSelectedMale.bind(this)
        this.updateSelectedFemale = this.updateSelectedFemale.bind(this)
        this.updateSelectedUser = this.updateSelectedUser.bind(this)
        this.castVote = this.castVote.bind(this)
        this.castVoteTransaction = this.castVoteTransaction.bind(this)
    }

    state = {
        selectedMaleKey: '',
        selectedFemaleKey: '',
        selectedUserKey: ''
    }

    updateSelectedFemale(key) {
        this.setState({
            selectedFemaleKey: key
        })
    }

    updateSelectedMale(key) {
        this.setState({
            selectedMaleKey: key
        })
    }

    updateSelectedUser(key) {
        this.setState({
            selectedUserKey: key
        })
    }

    updateUserHasVotedTransaction(userRef, userKey) {
        console.log('should updated user has voted ref here')
    }

    castVoteTransaction(voteRef, userKey) {
        voteRef.transaction((vote) => {
            if (vote)  {
                vote.votes++
                let userRef = firebase.database().ref(`users/${userKey}`)
                this.updateUserHasVotedTransaction(userRef, userKey)
            }
            return vote
        })

    }

    castVote() {
        let { selectedFemaleKey, selectedMaleKey, selectedUserKey } = this.state
        let { category, showMessage } = this.props
        let currentUserRef = firebase.database().ref(`users/${selectedUserKey}`)
        currentUserRef.once('value', snap => {
            let userHasVotedL = snap.val().hasVotedL
            let userHasVotedS = snap.val().hasVotedS
            if (category === 'lecturer' && userHasVotedL) {
                return showMessage('sorry, you cannot vote more than once')
            } else if (selectedFemaleKey === selectedUserKey || selectedMaleKey === selectedUserKey) {
                return showMessage('sorry, you cannot vote for yourself')
            } else {
                let maleRef = category === 'lecturer' ? `voteCount/mLVotes/${selectedMaleKey}` : `voteCount/mSVotes/${selectedMaleKey}`
                let maleVoteRef = firebase.database().ref(maleRef)
                this.castVoteTransaction(maleVoteRef, selectedUserKey)
                console.log('cast vote here!')
            }
            
        })
        
    }

    render({ category }, { selectedUserKey }) {
        return (
            <div class={style.specific}>
                <a href="/vote">go back pls</a>
                <h1>vote for {category}</h1>
                <MaleDropdown category={category} updateSelectedMale={ this.updateSelectedMale } />
                <FemaleDropdown category={category} updateSelectedFemale={ this.updateSelectedFemale } />
                <AllUsersList updateSelectedUser={ this.updateSelectedUser } /> 
                <button disabled={selectedUserKey === ''} onClick={ this.castVote }>cast vote!</button>
            </div>
        )
    }
}