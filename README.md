# N-Queens Visualizer

A web application to visualize and explore solutions to the classic N-Queens problem using backtracking.  
Built with React (frontend) and Node.js/Express (backend).

## Features

- Visualizes the backtracking process for N-Queens (N = 4 to 12)
- Step-by-step simulation of the algorithm
- Displays all found solutions
- Clean, responsive UI

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Clone the repository

```bash
git clone https://github.com/NAYAK-Shivam/nqueens.git
cd nqueens
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:5000`.

### Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`.

> **Note:**  
> Set the backend API URL in `frontend/.env`:
>
> ```
> REACT_APP_API_URL=http://localhost:5000
> ```

## About

This project helps users understand the N-Queens problem by visualizing the backtracking algorithm in real time.  
You can select the board size, generate all possible solutions, and watch how the algorithm explores the solution space.

## Learn More

- [N-Queens Problem (Wikipedia)](https://en.wikipedia.org/wiki/Eight_queens_puzzle)
- [Backtracking Algorithm](https://en.wikipedia.org/wiki/Backtracking)

## Author

- [Your Name](https://www.linkedin.com/in/shivam-nayak-8161961b7/)
- [GitHub](https://github.com/NAYAK-Shivam)
