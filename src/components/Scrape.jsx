import React, { Component } from 'react';

class Scrape extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      captchaImage: null,
      captcha: null,
      result: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchCaptcha = this.fetchCaptcha.bind(this);
    this.submitCaptcha = this.submitCaptcha.bind(this);
  }

  onChange(event) {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  fetchCaptcha() {
    const { url } = this.state;

    fetch(`http://localhost:8080/?url=${url}`, { method: 'GET', cache: 'no-store' })
      .then(resp => resp.ok ? resp.json() : Promise.reject("API is down"))
      .then(json => {
        this.setState({
          captchaImage: json.image
        });
      })
      .catch(err => {
        console.error("API returned an error: ", err);
      });
  }

  submitCaptcha() {
    const { captcha } = this.state;

    fetch(`http://localhost:8080/?captcha=${captcha}`, { method: 'POST', cache: 'no-store' })
      .then(resp => resp.ok ? resp.json() : Promise.reject("API is down"))
      .then(json => {
        console.log(`result is: ${JSON.stringify(json)}`);
        this.setState({
          result: json
        });
      })
      .catch(err => {
        console.error("API returned an error: ", err);
      });
  }

  onSubmit(event) {
    event.preventDefault();
    const { captchaImage } = this.state;

    if (captchaImage) {
      this.submitCaptcha();
    } else {
      this.fetchCaptcha();
    }
  }

  render() {
    const { captchaImage, result } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            URL

            <input
              type="text"
              name="url"
              onChange={this.onChange}
              placeholder="Please enter a url to scrape"
            />
          </label>

          <img
            src={captchaImage}
          />

          <label>
            Captcha

            <input
              type="text"
              name="captcha"
              onChange={this.onChange}
              placeholder="Please enter the captcha"
            />
          </label>

          <input
            type="submit"
            value="Scrape"
          />

          <pre>
            {JSON.stringify(result)}
          </pre>
        </form>
      </div>
    );
  }
}

export default Scrape;
