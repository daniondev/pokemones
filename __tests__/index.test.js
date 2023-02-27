import { render, screen } from "@testing-library/react";
import Index, { getStaticProps } from "../pages/index";

describe("Index", () => {
  describe("Component", () => {
    it("Se renderiza", () => {
      render(
        <Index pokemones={[{ name: "Daniel", url: "/pokemon/detalle/1" }]} />
      );

      const paragraph = screen.getByTestId("titulo");
      expect(paragraph).toBeInTheDocument();

      const daniel = screen.getByText("Daniel");
      expect(daniel).toBeInTheDocument();
      
      const url = daniel.getAttribute("href");
      expect(url).toEqual("/pokemones/1");
    });
  });

  describe("getStaticProps", () => {
    it("Return Pokemones", async () => {
      global.fetch = jest.fn().mockImplementation((url) => {
        expect(url).toBe("https://pokeapi.co/api/v2/pokemon?limit= 151");
        return new Promise((resolve) => {
          resolve({
            json: () =>
              Promise.resolve({
                results: "lista de pokemones",
              }),
          });
        });
      });

      const { props } = await getStaticProps();
      expect(props.pokemones).toBe("lista de pokemones");
    });
  });
});
