
# Project Game_time
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Description
This project is for people like me who like to play games but are terrible at remembering or keeping track of games they want to play. This app allows for users to add a game and its details to a running library (database) of games. Additionally, they can search that database by either game title or genre or a combination of the two. During this search process, the user can click on a card to get the details for that game, where they can add the game from that screen or from the search screen. Adding a game puts that game into the user's queue. 

This queue is accessible from the profile page, which shows a "preview" of the first three items in that user's queue, or from the queue page itself. At both of these pages, the user can drag a game card to update its order in the queue, there is also a button to move that specific game to the very end of the queue. On the queue page, the user can update the status of a game by either marking it as complete, adding a note (which then changes to a button to see the note added), or remove the game from the queue by "deleting" it. This does not remove the game from the database, just from that specific user's queue. 

Additional features for the next version will be the ability to search by more than just genre or title, a button to add a random game to the queue, and additional genre classifications for games. 

## Demo
Short demonstration of the project:
![Alt Text](https://github.com/Lambert347/game-queue-app/blob/master/Filmage%202021-06-23_123712.gif)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `game_db` and create the tables in the database.sql file.

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install` to install the dependencies
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Technologies
This project was built using react, react-redux, node.js, express, react-beautiful-dnd, javascript, passport, and material-ui.

## Contact
I can be reached at lambe347@umn.edu for suggestions or issues that need to resolved. Thanks. 
