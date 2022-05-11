import { render } from "../../../../utils/test";
import "@testing-library/jest-dom";
import User from "./index";

const name = "Lavern";
const surname = "Gerlach";

describe("Meetup component", () => {
  it("Testing rendering props in theme component", () => {
    const { getByText } = render(<User name={name} surname={surname} />);
    expect(getByText(`${name} ${surname}`)).toBeInTheDocument();
    expect(
      getByText(`${name[0].toUpperCase()}${surname[0].toUpperCase()}`)
    ).toBeInTheDocument();
  });
});
