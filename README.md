# Webev

![White and Black Memphis Style General Twitch Banner](https://user-images.githubusercontent.com/48426654/111029110-33fd2900-843e-11eb-90a2-f4098a00a5a4.png)

Webev is OSS of bookmark manager that improves the organization of information.

## Feature

- 🐇 **Fast**: Saved as soon as you enter the url and press the button.
- ✨ **Visualization**: Visually display the information obtained by ogp.
- 🛠 **Organized**: You Can be organized in a hierarchical structure.(TBD)
- 🤝 **Share and Retrieve**: No longer use searches contaminated with SEO hacks.(TBD)

## :rocket: Want to try it right away? Here is SaaS => <https://webev.cloud/> :rocket

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

The following environment variables are required for normal operation.
Set to [.env.development](https://github.com/itizawa/webev-front/blob/master/.env.development) or .env(at root) in webev-front.
Set to [config/dev.env](https://github.com/itizawa/webev-back/blob/master/config/dev.env) in webev-back.

|Key | e.g. | Required | Which set? | What is this? | memo |
|---|---|---|---|---|---|
|NEXT_PUBLIC_BACKEND_URL | <http://localhost:8000> | ✅ | webev-front | url of backend ||
|GOOGLE_CLIENT_ID | XXXXXXXXXXXXX-XXXXXXXXXXXX.apps.googleusercontent.com | ✅ | webev-front | client id for authentication of google ||
|GOOGLE_CLIENT_SECRET | XXXXXXXXXXXXX | ✅ | webev-front | client secret for authentication of google ||
|MONGO_URI | mongodb://mongo:27017/webev | ✅ | webev-front and webev-back | For storing credentials for using by next-auth  | |
|PORT | 8000 |  | webev-back | port for server  | Anything other than 3000 is fine |

## License

[MIT](LICENSE)
  