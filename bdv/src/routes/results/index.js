import { h, Component } from 'preact'
import linkState from 'linkstate'
import * as firebase from 'firebase/app'
import 'firebase/database'
import style from './style'

export default class Results extends Component {
    state = {
        users: {},
        passcode: 'winnersare?',
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
            
            return <h1 class={style.results__winner}>{userName} with {votes} votes</h1>
        })

        let fLWinners = fLVotes.map(obj => {
            let { votes, key } =  obj
            let userName = users[key].name
            
            return <h1 class={style.results__winner}>{userName} with {votes} votes</h1>
        })

        let mSWinners = mSVotes.map(obj => {
            let { votes, key } =  obj
            let userName = users[key].name
            
            return <h1 class={style.results__winner}>{userName} with {votes} votes</h1>
        })

        let fSWinners = fSVotes.map(obj => {
            let { votes, key } =  obj
            let userName = users[key].name
            
            return <h1 class={style.results__winner}>{userName} with {votes} votes</h1>
        })
        return (
            <div class={style.results}>
                <div class="results-passcode" hidden={userInputPasscode === passcode}>
                    <input type="password" placeholder="passcode" onInput={ linkState(this, 'userInputPasscode') } />
                </div>
                <div class="actual-results" hidden={userInputPasscode !== passcode}>
                    <div class="results-ml"><span class={style.results__title}>best dressed male lecturer is</span> {mLWinners}</div>
                    <div class={style.results__seperator}></div>
                    <div class="results-fl"><span class={style.results__title}>best dressed female lecturer is</span> {fLWinners}</div>
                    <div class={style.results__seperator}></div>
                    <div class="results-ms"><span class={style.results__title}>best dressed male student is</span> {mSWinners}</div>
                    <div class={style.results__seperator}></div>
                    <div class="results-fs"><span class={style.results__title}>best dressed female student is</span> {fSWinners}</div>
                </div>
            </div>
        )
    }
}