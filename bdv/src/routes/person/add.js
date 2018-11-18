import { h, Component } from 'preact'
import style from './style'
import linkState from 'linkstate'

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
        console.log(this.state)
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