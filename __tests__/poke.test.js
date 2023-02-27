import { render, screen, waitFor } from "@testing-library/react";
import Poke from "../pages/poke";

describe("Poke", () => {
  it("Render Pokemones", async () => {
    const mockResults = [
      { name: "daniel", url: "https://www.dominio.com/pokemones/1" },
    ];

    global.fetch = jest.fn().mockImplementation((url) => {
      expect(url).toBe("https://pokeapi.co/api/v2/pokemon?limit= 151");
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              results: mockResults,
            }),
        });
      });
    });

    render(<Poke />);

    const loading = screen.getByText("Cargando...")
    expect(loading).toBeInTheDocument()
    await waitFor(()=> screen.getByText("PokeCheat"))
    
    const element = screen.getByTestId(1)
    const anchor = element.children[0]
    expect(anchor).toHaveAttribute('href', '/pokemones/1')
    expect(anchor).toHaveTextContent('daniel')
  });
});
