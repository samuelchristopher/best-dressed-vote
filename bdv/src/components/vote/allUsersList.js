import { h, Component } from 'preact'
import * as firebase from 'firebase/app'
import 'firebase/database'

export default class AllUsersList extends Component {
    constructor() {
        super()

        this.updateSelectedUserKey = this.updateSelectedUserKey.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
    }
    state = {
        users: {},
        selectedUserKey: '',
        filteredOptions: []
    }

    componentDidMount() {
        let allUsersRef = firebase.database().ref('users/')
        allUsersRef.on('value', snap => {
            this.setState({users: snap.val()})
        })
    }

    updateSelectedUserKey(e) {
        this.setState({ selectedUserKey: e.target.value})
    }

    updateFilter(e) {
        let updatedItems = Object.keys(this.state.users)
        updatedItems = updatedItems.filter(key => {
            let itemName = this.state.users[key].name
            return itemName.toLowerCase().search(
              e.target.value.toLowerCase()) !== -1;
        })

        console.log(updatedItems)

        this.setState({
            filteredOptions: updatedItems
        })
    }

    render() {
        let options = this.state.filteredOptions
            .map((key) => {
                let currentItem = this.state.users[key]
                return (
                    <div>
                        <input onChange={this.updateSelectedUserKey} checked={ this.state.selectedUserKey === `${key}` } type="radio" id={`${key}`} name="currentUser" value={`${key}`} />
                        <label for={`${key}`}>{currentItem.name}</label>
                    </div>
                )
            })
        return (
            <div>
                <p>{ this.state.selectedUserKey ? `Your name is ${this.state.users[this.state.selectedUserKey].name}` : `Please select your name` }</p>
                <input type="text" onInput={ this.updateFilter } placeholder="Search for your name"/>
                { this.state.filteredOptions.length < 6 ? options : '' }
            </div>
        )
    }
}