# Interview Scheduler

Scheduler is a singe-page interview scheduling application built using React.js.

The simple interface allows users to view, book, edit, and cancel interviews with mentors. Booking information is communicated with the backend server using Axios, and other users are immediately shown any changes via WebSockets.

!["Demo of single user experience"](https://github.com/m-wardle/scheduler/blob/master/public/images/Basic%20Use.gif?raw=true)

Using Interview Scheduluer to book, edit, and cancel appointments.

!["Demo of live updates to multiple users"](https://github.com/m-wardle/scheduler/blob/master/public/images/Websocket%20Use.gif?raw=true)

Live updates to multiple users via WebSockets

## Setup

1. Download or clone this repository.
2. Install dependencies with `npm install`.
3. Clone or download the API Server from [this repository](https://github.com/m-wardle/scheduler-api).
4. Run the API server with `npm start` from the api server's directory.
5. Run the client application from the "scheduler" directory using `npm start`.
6. The client should launch in your browser, or alternatively you can navigate to http://localhost:8000.

## Dependencies

- axios v0.19.0 or newer
- classnames v2.2.6 or newer
- normalize.css v8.0.1 or newer
- react v16.12.0 or newer
- react-dom v16.12.0 or newer (must be same version as react)
- react-scripts v3.0.0 or newer