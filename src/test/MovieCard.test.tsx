import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MovieCard from "../component/ui/MovieCard";
import { test,expect } from "vitest";
import "@testing-library/jest-dom/vitest";

test("renders movie title", () => {
  const movie = {
    id: 1,
    title: "Interstellar",
    poster_path: "/test.jpg",
    vote_average: 8.6,
    author: "",
    content: "",
  };

  render(
    <MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>
  );

  expect(
    screen.getByText("Interstellar")
  ).toBeInTheDocument();
});