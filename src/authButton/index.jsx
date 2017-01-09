import { oauth2, apiKey, scopes } from "../../config.json";
import { h, render, Component } from 'preact';

class AuthButton extends Component {
  componentDidMount() {
    this.handleClientLoad(this.props.gapiLoaded);
  }

  handleClientLoad(gapiLoaded) {
    console.log(gapiLoaded);
    if (gapiLoaded) gapi.load('client:auth2', this.initClient.bind(this));
  }

  initClient() {
    gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        clientId: oauth2.client_id,
        scope: scopes.join(" ")
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this));

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  updateSigninStatus(isSignedIn) {
    this.props.handleSignInChange(isSignedIn);
  }

  handleSignIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  render() {
    return this.props.isSignedIn ? (
      <button id="signout-button" onClick={this.handleSignOut}>Sign Out</button>
    ) : (
      <button id="authorize-button" onClick={this.handleSignIn}>Authorize</button>
    );
  }
}

export default AuthButton;
