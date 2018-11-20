import { h, Component } from 'preact'
import linkState from 'linkstate'
import * as firebase from 'firebase/app'
import 'firebase/database'
import style from './style'

export default class Results extends Component {
    state = {
        users: {},
        passcode: 'whowon?',
        userInputPasscode: '',
        fLVotes: [],
        mLVotes: [],
        fSVotes: [],
        mSVotes: []
    }

    componentDidMount() {
        let allUsersRef = firebase.database().ref('users/')
        allUsersRef.on('value', snap => {
            this.setState({
                users: snap.val()
            })
        })
        let voteCountRef = firebase.database().ref('voteCount/')
        voteCountRef.on('value', snap => {
           let voteCount = snap.val()
           Object.keys(voteCount).map(category => {
               let votes = voteCount[category]
               let winners = []
               let highestVoteCount = 0
               Object.keys(votes).map(key => {
                   if (votes[key].votes > highestVoteCount) {
                       highestVoteCount = votes[key].votes
                       winners = []
                       winners.push({
                           key,
                           votes: votes[key].votes,
                           category
                       })
                   } else if (votes[key].votes == highestVoteCount) {
                        highestVoteCount = votes[key].votes
                        winners.push({
                            key,
                            votes: votes[key].votes,
                            category
                        })
                   }
               })

              this.setState({
                  [category]: winners
              })
           })
        })
    }    

    render({}, { userInputPasscode, passcode, fLVotes, mLVotes, fSVotes, mSVotes, users }) {
        let mLWinners = mLVotes.map(obj => {
            let { votes, key } =  obj
            let userName = users[key].name
            
            return <h1>{userName} with {votes} votes</h1>
        })

        let fLWinners = fLVotes.map(obj => {
            let { votes, key } =  obj
            let userName = users[key].name
            
            return <h1>{userName} with {votes} votes</h1>
        })

        let mSWinners = mSVotes.map(obj => {
            let { votes, key } =  obj
            let userName = users[key].name
            
            return <h1>{userName} with {votes} votes</h1>
        })

        let fSWinners = fSVotes.map(obj => {
            let { votes, key } =  obj
            let userName = users[key].name
            
            return <h1>{userName} with {votes} votes</h1>
        })
        return (
            <div class={style.results}>
                <div class="results-passcode" hidden={userInputPasscode === passcode}>
                    <input type="password" placeholder="passcode" onInput={ linkState(this, 'userInputPasscode') } />
                </div>
                <div class="actual-results" hidden={userInputPasscode !== passcode}>
                    <div class="results-ml">best dressed male lecturer: {mLWinners}</div>
                    <div class="results-fl">best dressed female lecturer: {fLWinners}</div>
                    <div class="results-ms">best dressed male student: {mSWinners}</div>
                    <div class="results-fs">best dressed female student: {fSWinners}</div>
                </div>
            </div>
        )
    }
}