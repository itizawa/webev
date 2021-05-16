# Webev

![White and Black Memphis Style General Twitch Banner](https://user-images.githubusercontent.com/48426654/112742744-362dbe80-8fcc-11eb-914f-6b07b48862ac.png)

[![build-dev](https://github.com/itizawa/webev-front/actions/workflows/ci-dev.yml/badge.svg?branch=master)](https://github.com/itizawa/webev-front/actions/workflows/ci-dev.yml)

Webev is OSS of bookmark manager that improves the organization of information.

## Feature

- 🐇 **Fast**: Saved as soon as you enter the url and press the button.
- ✨ **Visualization**: Visually display the information obtained by ogp.
- 🛠 **Organized**: You Can be organized in a hierarchical structure.
- 🤝 **Share and Retrieve**: No longer use searches contaminated with SEO hacks.(TBD)

## Demo

↓ Click here! (jump to youtube) 

<a width="500px" href="https://youtu.be/EmxXCfOtgMU" target="_blank" rel="noopener">
  <img src="https://user-images.githubusercontent.com/48426654/118361581-175ca900-b5c7-11eb-8c61-c5fc69053776.jpg" />
</a>

## :rocket: Want to try it right away? Here is SaaS => <https://webev.cloud/> :rocket:

From here onward for those who start up by themselves.

## Installation

1. Clone the same versions of [webev-front](https://github.com/itizawa/webev-front) and [webev-back](https://github.com/itizawa/webev-back).

1. Prepare with the following folder structure.  

- Webev
  - webev-front
  - webev-back

1. Prepare environment variables.  
See the [environment variable section](https://github.com/itizawa/webev-front/#--environmental-variables) below

1. Run `docker-compose up` on each folder.  
If you can use the make command, run `make up-front` and `make up-back` in either folder

## Environmental variables

- The following environment variables are required for normal operation.
  - Set to [.env.development](https://github.com/itizawa/webev-front/blob/master/.env.development) or .env(at root) in webev-front.
  - Set to [config/dev.env](https://github.com/itizawa/webev-back/blob/master/config/dev.env) in webev-back.

|Key | e.g. | Required | Which set? | What is this? | memo |
|---|---|---|---|---|---|
|NEXT_PUBLIC_BACKEND_URL | <http://localhost:8000> | ✅ | front | url of backend ||
|GOOGLE_CLIENT_ID |  | ✅ | front | client id for authentication of google ||
|GOOGLE_CLIENT_SECRET |  | ✅ | front | client secret for authentication of google ||
|MONGO_URI | mongodb://mongo:27017/webev | ✅ | front and back | For storing credentials for using by next-auth  | |
|PORT | 8000 |  | back | port for server  | Anything other than 3000 is fine |

## License

[MIT](LICENSE)
  
