import {render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CadastroUserForm from './CadastroUserForm';
import { useFetch } from "../../../hooks/useFetch";
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest'

vi.mock("../../../hooks/useFetch");
let originalAlert;

    beforeEach(() => {
      originalAlert = window.alert; 
      window.alert = vi.fn(); 
    });

    afterEach(() => {
      window.alert = originalAlert;
    });

describe('Teste do componente CadastroUserForm', () => {
    test('Deve renderizar o componente sem erros', () => {
      const mockCreateData = vi.fn();
      useFetch.mockReturnValue({
        itens: [],
        createData: mockCreateData,
      });

        render(
            <BrowserRouter>
            <CadastroUserForm />
          </BrowserRouter>
          );
          const linkElement = screen.getByText(/Cadastro/i);
          expect(linkElement).toBeInTheDocument();
    });

    test("exibe erro se o nome estiver em branco", async () => {
      const mockCreateData = vi.fn();
      useFetch.mockReturnValue({
        itens: [],
        createData: mockCreateData,
      });
      const user = userEvent.setup()
      render(
        <BrowserRouter>
        <CadastroUserForm />
      </BrowserRouter>
      );
  
      const cadastrarButton = screen.getByText("Cadastrar");
      await user.click(cadastrarButton);
  
      expect(window.alert).toHaveBeenCalledWith(
        "O nome do usuário não pode ser vazio ou em branco"
      )
    });

    test("exibe erro se o email estiver em branco", async () => {
      const mockCreateData = vi.fn();
      useFetch.mockReturnValue({
        itens: [],
        createData: mockCreateData,
      });
      render(
        <BrowserRouter>
          <CadastroUserForm />
        </BrowserRouter>
      );
  
      const nomeInput = await screen.findByPlaceholderText("Exemplo: João da Silva Pereira");
      await userEvent.type(nomeInput, "João da Silva Pereira");
  
      const cadastrarButton = screen.getByText("Cadastrar");
      await userEvent.click(cadastrarButton);
  
      expect(window.alert).toHaveBeenCalledWith("O email do usuário não pode ser vazio ou em branco");
    });
      
    test("exibe erro se a senha estiver em branco", async () => {
      const mockCreateData = vi.fn();
      useFetch.mockReturnValue({
        itens: [],
        createData: mockCreateData,
      });
      render(
        <BrowserRouter>
          <CadastroUserForm />
        </BrowserRouter>
      )
  
      const nomeInput = await screen.findByPlaceholderText("Exemplo: João da Silva Pereira");
      await userEvent.type(nomeInput, "João da Silva Pereira");
  
      const emailInput = await screen.findByPlaceholderText("E-mail");
      await userEvent.type(emailInput, "email@email.com");
  
      const cadastrarButton = screen.getByText("Cadastrar");
      await userEvent.click(cadastrarButton);
  
      expect(window.alert).toHaveBeenCalledWith("A senha do usuário não pode estar vazia");
    });

    

    test("exibe mensagem de sucesso ao cadastrar usuário", async () => {
      useFetch.mockReturnValue({
        itens: [
          { email: "joao@example.com" },
          { email: "maria@example.com" },
        ],
        createData: vi.fn().mockResolvedValue({ status: 200, Response: "Usuário cadastrado com sucesso!" }),
      });
  
      render(
        <BrowserRouter>
          <CadastroUserForm />
        </BrowserRouter>
      );
  
      const nomeInput = await screen.findByPlaceholderText("Exemplo: João da Silva Pereira");
      const emailInput = await screen.findByPlaceholderText("E-mail");
      const senhaInput = await screen.findByPlaceholderText("Digite uma senha");
  
      await userEvent.type(nomeInput, "João da Silva Pereira");
      await userEvent.type(emailInput, "joao@example.com");
      await userEvent.type(senhaInput, "senha123");
  
      const cadastrarButton = screen.getByText("Cadastrar");
      await userEvent.click(cadastrarButton);
  
      expect(window.alert).toHaveBeenCalled();
    });

    test("exibe mensagem de erro ao cadastrar usuário", async () => {
      useFetch.mockReturnValue({
        itens: [],
        createData: vi.fn().mockRejectedValue({ status: 400 }),
      });
  
      render(
        <BrowserRouter>
          <CadastroUserForm />
        </BrowserRouter>
      );
  
      const nomeInput = await screen.findByPlaceholderText("Exemplo: João da Silva Pereira");
      const emailInput = await screen.findByPlaceholderText("E-mail");
      const senhaInput = await screen.findByPlaceholderText("Digite uma senha");
  
      await userEvent.type(nomeInput, "João da Silva Pereira");
      await userEvent.type(emailInput, "joao@example.com");
      await userEvent.type(senhaInput, "senha123");
  
      const cadastrarButton = screen.getByText("Cadastrar");
      await userEvent.click(cadastrarButton);
  
      
      expect(window.alert).toHaveBeenCalled("Erro ao cadastrar o usuário. Por favor, verifique os dados e tente novamente.");
    });
})