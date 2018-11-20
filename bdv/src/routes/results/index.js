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
        results: {}
    }

    componentDidMount() {
        let allUsersRef = firebase.database().ref('users/')
        allUsersRef.on('value', snap => {
            this.setState({
                users: snap.val()
            })
        })
        let voteCountRef = firebase.database().ref('voteCount/')
        let results = {}
        voteCountRef.on('value', snap => {
           let voteCount = snap.val()
           Object.keys(voteCount).map(category => {
               let votes = voteCount[category]
               let winners = []
               let highestVoteCount = 0
               Object.keys(votes).map(key => {
                   if (votes[key].votes >= highestVoteCount) {
                       highestVoteCount = votes[key].votes
                       winners.push({
                           key,
                           votes: votes[key].votes,
                           category
                       })
                   }
               })
              results = {
                  ...results,
                  [category]: winners
              } 

              this.setState(results)
              console.log(results)
           })
        })
    }    

    render({}, { userInputPasscode, passcode, results }) {
        return (
            <div class={style.results}>
                <div class="results-passcode" hidden={userInputPasscode === passcode}>
                    <input type="password" placeholder="passcode" onInput={ linkState(this, 'userInputPasscode') } />
                </div>
                <div class="actual-results" hidden={userInputPasscode !== passcode}>
                    <div class="results-ml">best dressed male lecturer: </div>
                    <div class="results-fl">best dressed female lecturer: </div>
                    <div class="results-ms">best dressed male student: </div>
                    <div class="results-fs">best dressed female student: </div>
                </div>
            </div>
        )
    }
}