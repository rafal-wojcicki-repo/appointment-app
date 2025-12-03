# AppointmentApp


- Add, view, and delete appointments
- Mark appointments as important
- Monthly calendar view
- Store appointments in a SQLite database via Node.js backend
## Requirements
- Node.js (v16+)
- npm
## Installation

1. Clone the repository or download the project.
2. Install frontend dependencies:
   ```sh
AppointmentApp is a meeting management application built with Angular and a Node.js + SQLite backend.## Features
   "npm install" 


   ```
3. Install backend dependencies:
   ```sh
   npm install express cors sqlite3
   ```

## Running the app


### Backend (Node.js + SQLite)
In the project root directory, run:
```sh
node server.js
```
The server will start at http://localhost:3000

### Frontend (Angular)
In a new terminal, run:
```sh
ng serve
```
The app will be available at http://localhost:4200

## Configuration
- The default database file is `appointments.db` in the project root.
- Backend API: `GET/POST/DELETE http://localhost:3000/appointments`

## Testing
To run unit tests:
```sh
ng test
```

## Technologies
- Angular 16
- Node.js + Express
- SQLite

## Author
Rafał Wójcicki
