import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import WatchList from "../pages/WatchList";
import { GenreContext } from "../context/GenreContext";
import "@testing-library/jest-dom/vitest";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWatchList(favouriteMovie: any[]) {
  return render(
    <MemoryRouter>
      <GenreContext.Provider
        value={{
          favouriteMovie,
        } as any}
      >
        <WatchList />
      </GenreContext.Provider>
    </MemoryRouter>
  );
}

describe("WatchList", () => {
  it("shows empty watchlist message when there are no favourite movies", () => {
    renderWatchList([]);

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(
      screen.getByText("Look Like you Never add WatchList")
    ).toBeInTheDocument();
    expect(
      screen.getByText("No movies were found for this WatchList.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /browse movies/i })
    ).toBeInTheDocument();
  });

  it("renders movie cards when favourite movies exist", () => {
    renderWatchList([
      {
        id: 1,
        title: "Interstellar",
        poster_path: "/interstellar.jpg",
        vote_average: 8.7,
      },
      {
        id: 2,
        title: "Inception",
        poster_path: "/inception.jpg",
        vote_average: 8.3,
      },
    ]);

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });
});