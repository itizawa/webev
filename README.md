<h1 align="center"> Webev </h1>

![White and Black Memphis Style General Twitch Banner](https://user-images.githubusercontent.com/48426654/111029110-33fd2900-843e-11eb-90a2-f4098a00a5a4.png)

Webev is OSS of bookmark manager that improves the organization of information.

<h2 align="center">
  Feature
</h2>

- 🐇 **Fast**: Saved as soon as you enter the url and press the button.
- ✨ **Visualization**: Visually display the information obtained by ogp.
- 🛠 **Organized**: You Can be organized in a hierarchical structure.(TBD)
- 🤝 **Share and Retrieve**: No longer use searches contaminated with SEO hacks.(TBD)

<h2 align="center">
  :rocket: Want to try it right away? Here is SaaS => https://webev.cloud/ :rocket:
</h2>

From here onward for those who start up by themselves.

<h2 align="center">
  Installation
</h2>

1. Clone the same versions of [webev-front](https://github.com/itizawa/webev-front) and [webev-back](https://github.com/itizawa/webev-back).

2. Prepare with the following folder structure.

- Webev
  - webev-front
  - webev-back

3. Prepare environment variables.  
See the [environment variable section](https://github.com/itizawa/webev-front/master/#--environmental-variables) below

4. Run `docker-compose up` on each folder.  
If you can use the make command, run `make up-front` and `make up-back` in either folder

<h2 align="center">
  Environmental variables
</h2>
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

<h2 align="center">
  License
</h2>

<div align="center">
  
  [MIT](LICENSE)
  
</div>
