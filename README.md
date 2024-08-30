Here's a README template for your multiplayer quiz application:

---

# Multiplayer Quiz Application

[![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-brightgreen)](https://multi-player-quiz.vercel.app/)

This is a full-stack multiplayer quiz application where users can create and join rooms, participate in quizzes, and view leaderboards. The app is built using React for the frontend, Node.js and Express for the backend, and MongoDB for the database, all written in TypeScript.

## Features

- **Room Creation:** Users can create rooms where multiple people can join and play a quiz together.
- **Multiplayer Support:** Several users can join a room and compete in real-time.
- **Quiz Creation:** Users can create quizzes by adding questions.
- **Leaderboard:** Track scores and view the top players on the leaderboard.
- **Profile Management:** Users can manage their profiles and view their quiz history.
- **Real-time Updates:** The app provides real-time updates during gameplay using Socket.IO.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Real-time Communication:** Socket.IO
- **Language:** TypeScript

## Deployment

The application is deployed on Vercel. You can access it using the following link: [Multiplayer Quiz App](https://multi-player-quiz.vercel.app/).

## Setup and Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/raghavshulka/multi-player-quiz
   cd multi-player-quiz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGODB_URI=your-mongodb-connection-string
   PORT=your-port-number
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Run the frontend:**
   ```bash
   cd client
   npm start
   ```

## Usage

- **Create a Room:** Navigate to the home page and click on "Create Room." Set a room name and topic, and start inviting friends.
- **Join a Room:** Enter the room name shared by your friend to join and start playing.
- **Create a Quiz:** Head over to the "Create Quiz" section to add questions and customize your quiz.
- **View Leaderboard:** After playing, check the leaderboard to see your ranking.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Feel free to customize the README further based on your specific needs!
