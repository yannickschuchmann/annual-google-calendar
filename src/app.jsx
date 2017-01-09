import { oauth2, apiKey, scopes } from "../config.json";
import { h, render, Component } from 'preact';
import moment from 'moment';

import AuthButton from 'authbutton/index.jsx';

class CalendarApp extends Component {
  constructor() {
    super();
    this.state = {
      gapiLoaded: false,
      isSignedIn: false,
      events: []
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
    if (isSignedIn) {
      this.getEvents();
    }

    this.setState({
      isSignedIn
    })
  }

  getEvents() {
    const request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': moment().startOf("year").toISOString(),
      'timeMax': moment().endOf("year").toISOString(),
      'maxResults': 2500,
      'singleEvents': true,
      'orderBy': 'startTime'
    });

    request.execute((resp) => {
      this.setState({
        events: resp.items
      })
    });
  }

  render() {
    var events = [];
    for (var value of this.state.events) {
      const start = moment(value.start.date || value.start.dateTime);
      events.push((
        <div className="Event">
          <div className="Event-start">{start.toISOString()}</div>
          <div className="Event-name">{value.summary}</div>
        </div>
      ))
    }

    return (this.state.gapiLoaded) ? (
      <div>
        <AuthButton gapiLoaded={this.state.gapiLoaded}
                    handleSignInChange={this.handleSignInChange.bind(this)}
                    isSignedIn={this.state.isSignedIn} />
        {events}
      </div>
    ) : (
      <div>Loading</div>
    );
  }

}

render(<CalendarApp/>, document.getElementById("app"))

module.exports = CalendarApp
