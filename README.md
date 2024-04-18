![Manifold Server banner](./assets/manifold-header.png)

# *Manifold - P*
This is a fork of the original Manifold server, with the goal of adding more features and improving the overall experience of the server. The original Manifold server is available [here](https://github.com/SneezingCactus/manifold-server).

Why not submit PRs to the original repository? This repository may not be as stable as the original, and the features added here may not align with what the original developer wanted.

## Additional features
- **Host password**: You can set a password that when said in chat, gives that player host permissions.
- **Docker support**: You can run the server in a Docker container for easy use with reverse proxies such as LinuxServer.io's [SWAG container](https://hub.docker.com/r/linuxserver/swag).
- **FakeSay**: You can force a player to say messages in chat.
- **Custom MOTD**: You can set any number of messages to be displayed when a player opens the server list.
- **General command changes**
- **Terminal coloring** 

## Docker setup
```
git clone https://github.com/PixelMelt/manifold-server
cd manifold-server
sudo ./build.sh
```
The server will start on port 3000 by default. You can change this in the `Dockerfile`.

---

This repository contains the Manifold **server**.

You can find the client mod [here](https://github.com/SneezingCactus/manifold-client).

Manifold is an open-source implementation of the bonk.io multiplayer servers made to allow complete freedom over the backend, making certain features possible, such as unlimited max players, unbanning, and ratelimit configuration.

## Community and support

- [SneezingCactus' Mods Discord server](https://discord.gg/dnBM3N6H8a)
- [Bonk.io Modding Discord server](https://discord.gg/PHtG6qN3qj)

## Tutorials

- [Manifold Tutorial #1: Setting up a local server](https://www.youtube.com/watch?v=eWAnlHpnvj4)

## Features

- Unlimited player limit
- Customizable server restrictions
- Chat logs
- Ability to unban people
- Persistent ban list (players banned in one session remain banned in every session after it, unless unbanned)
- Map and game settings persist as long as the server stays up (this is useful for map making because if your client crashes or you suffer an internet outage, as long as your server stays up, you can just join back and no progress will be lost)

---

## Setting up a server

1. Make sure [Node.js](https://nodejs.org/en) v20 or later is installed on your computer. You can check this by opening up a terminal and entering `node --version`. If it shows `v20.0.0` or higher, you're good to go! If not, you may need to update Node.
2. Clone the repository, or download it as a ZIP by clicking the green "Code" button at the top of the page and then clicking the "Download ZIP" button.
   - If you downloaded the repository as a ZIP, make sure to extract it to a folder.
3. Go to the folder containing the repository, open a terminal, enter `npm install` and wait for the process to end.

**You should be able to open the server now!** Some things to get into consideration:

- To open the server, you can either open a terminal and enter `npm run start`, or you can run the start script file (`start.bat` on Windows, `start.sh` on Linux).
- If you host the server on your computer, you'll be able to access it through the URL `http://localhost:{the port you're hosting the server on, 3000 by default}/`.
- If you want people outside your network to be able to join your server, you'll have to forward the port in your router's settings, and they'll have to join with your public IP which you can get from webpages like [whatismyipaddress.com](https://whatismyipaddress.com/).
- You can also host your server in the cloud using hosting services such as [Render](https://render.com/) and [Heroku](https://www.heroku.com/), though this is only recommended for advanced users.
- Server configuration is located in `config.ts`. You can modify it with any text editor.
