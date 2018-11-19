import { h, Component } from 'preact'
import * as firebase from 'firebase/app'
import 'firebase/database'

export default class FemaleDropdown extends Component {
    constructor() {
        super()

        this.updateSelectedFemale = this.updateSelectedFemale.bind(this)
    }
    state = {
        optionsToDisplay: [],
        femaleOptions: {},
        selectedFemaleKey: ''
    }

    componentDidMount() {
        let { category } = this.props
        if (category === 'lecturer') {
            let fLRef = firebase.database().ref('fL/')
            fLRef.on('value', snap => {
                this.setState({
                    femaleOptions: snap.val()
                })
                let { femaleOptions } = this.state
                this.setState({
                    optionsToDisplay: Object.keys(femaleOptions)
                })
            })
        } else if (category === 'student') {
            let fSRef = firebase.database().ref('fS/')
            fSRef.on('value', snap => {
                this.setState({
                    femaleOptions: snap.val()
                })
                let { femaleOptions } = this.state
                this.setState({
                    optionsToDisplay: Object.keys(femaleOptions)
                })
            })
        }    
    }

    updateSelectedFemale(e) {
        this.setState({
            selectedFemaleKey: e.target.value
        })

        this.props.updateSelectedFemale(e.target.value)
    }

    render({ category }) {
        let options = this.state.optionsToDisplay.map(key => <option selected={this.state.selectedFemaleKey === `${key}`} value={`${key}`}>{this.state.femaleOptions[key].name}</option>)
        return (
            <div>
                <p>best dressed female {category}</p>
                <select onChange={ this.updateSelectedFemale }>
                    <option selected value={0}>choose female {category}</option>
                    { options }
                </select>
            </div>
        )
    }
}