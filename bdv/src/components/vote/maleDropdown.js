import { h, Component } from 'preact'
import * as firebase from 'firebase/app'
import 'firebase/database'

export default class MaleDropdown extends Component {
    constructor() {
        super()

        this.updateSelectedMale = this.updateSelectedMale.bind(this)
    }
    state = {
        optionsToDisplay: [],
        maleOptions: {},
        selectedMaleKey: ''
    }

    componentDidMount() {
        let { category } = this.props
        if (category === 'lecturer') {
            let mLRef = firebase.database().ref('mL/')
            mLRef.on('value', snap => {
                this.setState({
                    maleOptions: snap.val()
                })
                let { maleOptions } = this.state
                this.setState({
                    optionsToDisplay: Object.keys(maleOptions)
                })
            })
        } else if (category === 'student') {
            let mSRef = firebase.database().ref('mS/')
            mSRef.on('value', snap => {
                this.setState({
                    maleOptions: snap.val()
                })
                let { maleOptions } = this.state
                this.setState({
                    optionsToDisplay: Object.keys(maleOptions)
                })
            })
        }    
    }

    updateSelectedMale(e) {
        this.setState({
            selectedMaleKey: e.target.value
        })

        this.props.updateSelectedMale(e.target.value)
    }

    render({ category }) {
        let options = this.state.optionsToDisplay.map(key => <option selected={this.state.selectedMaleKey === `${key}`} value={`${key}`}>{this.state.maleOptions[key].name}</option>)
        return (
            <div>
                <p>best dressed male {category}</p>
                <select onChange={ this.updateSelectedMale }>
                    <option selected value={0}>choose male {category}</option>
                    { options }
                </select>
            </div>
        )
    }
}