import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Error from "./Error";

describe("Error", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });
    
    vi.mock("../../../hooks/useFetch");
    
    test("Deve renderizar o componente corretamente", () => {
        render(
        <BrowserRouter>
            <Error />
        </BrowserRouter>
        );

        const title = screen.getByText("Página não encontrada!");
        expect(title).toBeInTheDocument();
    });
    
});