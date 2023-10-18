import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ListaEstoque from "./ListaEstoque";
import { useFetch } from "../../../hooks/useFetch";

describe("ListaEstoque", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  vi.mock("../../../hooks/useFetch");

  test("Deve renderizar o componente corretamente", () => {
    useFetch.mockReturnValue({
      itens: []
    });

    render(
        <BrowserRouter>
        <ListaEstoque />
      </BrowserRouter>
    );
    
});

  test("renderiza corretamente os produtos", async () => {
    const mockProdutos = [
      { id: 1, armazem: { nome: "Armazém A" }, produto: "Ração", categoria: "Alimento", quantidade: 10 },
      { id: 2, armazem: { nome: "Armazém B" }, produto: "Antiparasitário", categoria: "Medicamento", quantidade: 5 },
    ];

    useFetch.mockReturnValue({
      itens: mockProdutos,
      deleteData: vi.fn(),
      updateData: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ListaEstoque />
      </BrowserRouter>
    );

    const produtoRows = await screen.findAllByRole("row");

    expect(produtoRows).toHaveLength(mockProdutos.length + 1);
  });

  test("deleta um produto corretamente", () => {
    const mockDeleteData = vi.fn();
    useFetch.mockReturnValue({
      itens: [
        { id: 1, armazem: { nome: "Armazém A" }, produto: "Ração", categoria: "Alimento", quantidade: 10 },
        { id: 2, armazem: { nome: "Armazém B" }, produto: "Antiparasitário", categoria: "Medicamento", quantidade: 5 },
      ],
      deleteData: mockDeleteData,
      updateData: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ListaEstoque />
      </BrowserRouter>
    );

    const deleteButton = screen.getAllByText("Remover")[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteData).toHaveBeenCalledWith(1);
  });
});
