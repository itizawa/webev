# Webev

![White and Black Memphis Style General Twitch Banner](https://user-images.githubusercontent.com/48426654/112742744-362dbe80-8fcc-11eb-914f-6b07b48862ac.png)

[![build-dev](https://github.com/itizaworld/webev/actions/workflows/ci-dev.yml/badge.svg?branch=master)](https://github.com/itizawa/webev-front/actions/workflows/ci-dev.yml)

Webev is OSS of bookmark manager that improves the organization of information.

## Feature

- 🐇 **Fast**: Saved as soon as you enter the url and press the button.
- ✨ **Visualization**: Visually display the information obtained by ogp.
- 🛠 **Organized**: You Can be organized in a hierarchical structure.
- 🤝 **Share and Retrieve**: No longer use searches contaminated with SEO hacks.

## Demo

↓ Click here! (jump to youtube)

<a width="500px" href="https://youtu.be/EmxXCfOtgMU" target="_blank" rel="noopener">
  <img src="https://user-images.githubusercontent.com/48426654/118361581-175ca900-b5c7-11eb-8c61-c5fc69053776.jpg"></img>
</a>

## :rocket: Want to try it right away? Here is SaaS => <https://webev.cloud/> :rocket

From here onward for those who start up by themselves.

## Installation

1. Clone the same versions of [Webev](https://github.com/itizaworld/webev).

1. Prepare environment variables.  
See the [environment variable section](https://github.com/itizawa/webev-front/#--environmental-variables) below

1. Run `docker-compose up`.  

## Environmental variables

- The following environment variables are required for normal operation.
  - Set to [.env.development](https://github.com/itizawa/webev-front/blob/master/.env.development) or .env(at root) in webev-front.
  - Set to [config/dev.env](https://github.com/itizawa/webev-back/blob/master/config/dev.env) in webev-back.

|Key | e.g. | Required | What is this?
|---|---|---|---|
|GOOGLE_CLIENT_ID |  | ✅ | client id for authentication of google |
|GOOGLE_CLIENT_SECRET |  | ✅ | client secret for authentication of google |
|MONGO_URI | mongodb://mongo:27017/webev | ✅  | For storing credentials for using by next-auth  | 

## License

[MIT](LICENSE)
  
