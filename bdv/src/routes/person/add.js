import { h, Component } from 'preact'
import style from './style'
import linkState from 'linkstate'
import * as firebase from 'firebase/app'
import 'firebase/database'

export default class AddPerson extends Component {
    constructor() {
        super()
        this.addPerson = this.addPerson.bind(this)
    }
    state = {
        name: '',
        isMale: false,
        isFemale: false,
        isLecturer: false,
        isStudent: false
    }

    addPerson() {
        let person = this.state
        let allUsersRef = firebase.database().ref('users/').push()
        let maleLecturersRef = firebase.database().ref('mL/')
        let femaleLecturersRef = firebase.database().ref('fL/')
        let maleStudentsRef = firebase.database().ref('mS/')
        let femaleStudentsRef = firebase.database().ref('fS/')

        allUsersRef.then(data => {
            let { key } = data
            if (person.isMale && person.isLecturer) {
                console.log('person is male lecturer')
                maleLecturersRef.child(`${key}`).set({ ...person })
            } else if (person.isFemale && person.isLecturer) {
                console.log('person is female lecturer')
                femaleLecturersRef.child(`${key}`).set({... person })
            } else if (person.isMale && person.isStudent) {
                console.log('person is male student')
                maleStudentsRef.child(`${key}`).set({ ...person })
            } else if (person.isFemale && person.isStudent) {
                console.log ('person is female student')
                femaleStudentsRef.child(`${key}`).set({ ...person })
            } else {
                console.error('unrecogrnized user combination, please check if appropriate male or female and lecturer or student')
            }
        })
        allUsersRef.set({ ...person })
        
        return this.props.showMessage('added person!')
        
    }

    render() {
        return (
            <div class={style.add}>
                <input autofocus type="text" placeholder="Name" onInput={ linkState(this, 'name') } required/>
                <label for="isMale">
                    is Male?
                    <input type="checkbox" id="isMale" name="isMale" onInput={ linkState(this, 'isMale') } required/>
                </label>
                <label for="isFemale">
                    is Female?
                    <input type="checkbox" id="isFemale" name="isFemale" onInput={ linkState(this, 'isFemale') } required/>
                </label>
                <label for="isLecturer">
                    is Lecturer?
                    <input type="checkbox" id="isLecturer" name="isLecturer" onInput={ linkState(this, 'isLecturer') } required/>
                </label>
                <label for="isStudent">
                    is Student?
                    <input type="checkbox" id="isStudent" name="isStudent" onInput={ linkState(this, 'isStudent') } required/>
                </label>
                <button onClick={this.addPerson} type="button">Add Person!</button>
            </div>
        )
    }
}