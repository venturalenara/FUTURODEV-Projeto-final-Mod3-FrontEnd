import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Rodape from "./rodape";


describe("Rodape", () => {
    test("Deve renderizar o componente corretamente", () => {
        render(
        <BrowserRouter>
            <Rodape />
        </BrowserRouter>
        );

        const title = screen.getByText("Todos os direitos reservados - ©DEV in Adotion");
        expect(title).toBeInTheDocument();
    })

})