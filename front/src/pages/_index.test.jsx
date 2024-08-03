import Home from "./index";

describe("Home", () => {
  it("Home が表示されること", () => {
    render(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
