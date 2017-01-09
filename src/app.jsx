import { oauth2, apiKey, scopes } from "../config.json";
import { h, render, Component } from 'preact';

import AuthButton from 'authbutton/index.jsx';

class CalendarApp extends Component {
  constructor() {
    super();
    this.state = {
      gapiLoaded: false,
      isSignedIn: false
    }
  }

  componentDidMount() {
    window.addEventListener('gapi-loaded', () => {
      this.setState({
        gapiLoaded: true
      });
    });
  }

  handleSignInChange(isSignedIn) {
    this.setState({
      isSignedIn
    })
  }

  render() {
    return (this.state.gapiLoaded) ? (
      <div>
        <AuthButton gapiLoaded={this.state.gapiLoaded}
                    handleSignInChange={this.handleSignInChange.bind(this)}
                    isSignedIn={this.state.isSignedIn} />
      </div>
    ) : (
      <div>Loading</div>
    );
  }

}

render(<CalendarApp/>, document.getElementById("app"))

module.exports = CalendarApp
