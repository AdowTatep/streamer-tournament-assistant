# streamer-tournament-assistant
A stream tournament assistant tool that helps streamers to show overlays on stream based on tournament info.

When I'm streaming a tournament I want to make it as professional as possible, but changing images and overlays that show data on stream are not easy when everything is happenning at the same time. The assistant tool lets me create matches in a database, set teams' scores and with the click of a button I set which teams are active and then the overlay changes automatically.

Everything is written in Typescript 💖 and then converted to Javascript.

## How it's done?
The most common streaming software lets you insert an invisible web page in front of what's being streamed, so I made a React application that is basically the overlay that will be put in front of the game's image on stream. With that React app, I can easily change the data that's being displayed on screen.

## Project hierarchy
- ./server  
  This is an [express.js](https://github.com/expressjs/express) server api, where the data is stored and CRUD happens.

- ./overlay-client  
  This is the React app that is displayed on stream, it is not finished yet, the idea is to make it connect to the _./server_ through [socket.io](https://github.com/socketio/socket.io). I wanted to use RabbitMq since I already know it, but I wanted to learn socket.io so I went with that.
  
 - ./dash-client  
  This is the React app that I open on my browser to set which match is active, create matches and control what will be on the overlay.
  
## Near future
In the near future the objective is to read directly from the game's api to show more metadata about the game that is being streamed.
  
## Game compatibility
- League of Legends - WIP
- Counter strike: Global offensive - Planned
