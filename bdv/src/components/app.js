import { h, Component } from 'preact'
import { Router } from 'preact-router'
import * as firebase from 'firebase/app'
import style from './style'

import Header from './header'
import Footer from './footer'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Profile from '../routes/profile'
import Vote from '../routes/vote'
import AddPerson from '../routes/person/add'
import Results from '../routes/results'

export default class App extends Component {

	constructor() {
		super()
		this.showMessage = this.showMessage.bind(this)
	}
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	}

	state = {
		message: ''
	}

	componentDidMount() {
		let config = {
			apiKey: "AIzaSyDPPMtrWkgnakN8_K8ieHFR89HbysL0j2U",
			authDomain: "bdv-app.firebaseapp.com",
			databaseURL: "https://bdv-app.firebaseio.com",
			projectId: "bdv-app",
			storageBucket: "",
			messagingSenderId: "513018580942"
		}
		firebase.initializeApp(config);
	}

	showMessage(messageContent) {
		this.setState({
			message: messageContent
		})
		setTimeout(() => this.setState({ message: '' }), 5000)
	}

	render() {
		return (
			<div id="app">
				<Header />
				<div hidden={this.state.message === ''}class={style.app__message}>{this.state.message}</div>
				<Router onChange={this.handleRoute}>
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Vote path="/" category="general" />
					<Vote showMessage={this.showMessage} path="/vote/:category" />
					<AddPerson showMessage={this.showMessage} path="/add-person" />
					<Results path="/results" />
				</Router>
				
				<Footer />
			</div>
		);
	}
}
