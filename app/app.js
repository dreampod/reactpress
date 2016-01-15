import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { browserHistory } from 'react-router'

require('./assets/css/app.min.css');

const App = React.createClass({
	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1>Hello World</h1>
					<p>Welcome to the homepage</p>
					<Link to="/about">Go to About Page</Link>
				</div>
			</div>
		)
	}
})

const About = React.createClass({
	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1>About</h1>
					<p>This is a simple About Page</p>
					<Link to="/">Back to Homepage</Link>
				</div>
			</div>
		)
	}
})

render((
<Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
</Router>
), document.getElementById('content'));