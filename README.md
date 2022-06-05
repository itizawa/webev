# Webev

![White and Black Memphis Style General Twitch Banner](https://user-images.githubusercontent.com/48426654/112742744-362dbe80-8fcc-11eb-914f-6b07b48862ac.png)


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

## :rocket: Want to try it right away? Here is SaaS => <https://webev.cloud/> :rocket:

From here onward for those who start up by themselves.

## Installation

1. Clone the latest version of [webev](https://github.com/itizaworld/webev) and [webev-server](https://github.com/itizaworld/webev-server).

1. Prepare environment variables.  
See the [environment variable section](https://github.com/itizawa/webev-front/#--environmental-variables) below

1. Run `docker-compose up` and `yarn dev` at webev-server.

1. Run `yarn dev` at webev.

## Environmental variables

- The following environment variables are required for normal operation.
  - Set to [.env.development](https://github.com/itizawa/webev-front/blob/main/.env.development) or .env(at root) in webev.

|Key | e.g. | Required | What is this?
|---|---|---|---|
|NEXT_PUBLIC_WEBEV_SERVER_URL |  | ✅ | backend url |

## License

[MIT](LICENSE)
  
