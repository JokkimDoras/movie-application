# Movie App

A modern movie discovery application built with React, TypeScript, and Vite. Browse trending movies, search for your favorite titles, view detailed movie information, watch trailers, and manage your favorite movies.

## Features

* Search movies using the TMDB API
* View trending and popular movies
* Detailed movie information page
* Watch movie trailers
* Add and remove favorite movies
* Persistent favorites using Local Storage
* Responsive design for desktop and mobile
* Loading and error states
* Component testing with Vitest and React Testing Library

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS

### Testing

* Vitest
* React Testing Library
* JSDOM

### API

* TMDB (The Movie Database) API

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd movie-app
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file:

```env
VITE_TMDB_API_KEY=your_api_key
```

Start the development server:

```bash
pnpm dev
```

## Running Tests

Run all tests:

```bash
pnpm test
```

## Project Structure

```text
src/
├── component/
├── pages/
├── hooks/
├── api/
├── types/
├── assets/
└── tests/
```

## Key Features Implemented

### Movie Search

Search movies by title and view instant results.

### Movie Details

View detailed information about a movie including ratings, overview, and poster.

### Trailer Support

Watch movie trailers directly from the application.

### Favorites

Save favorite movies and access them later.

### Testing

Includes component tests using Vitest and React Testing Library.

## Future Improvements

* Advanced filtering
* Genre-based recommendations
* Infinite scrolling
* User authentication
* Watchlist support
* Dark/Light theme toggle
* End-to-end testing with Playwright

## Author

@me

```
```
