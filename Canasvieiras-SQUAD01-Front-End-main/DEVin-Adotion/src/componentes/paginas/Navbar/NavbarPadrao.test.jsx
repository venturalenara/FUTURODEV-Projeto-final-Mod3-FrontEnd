import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarPadrao from './NavbarPadrao';

describe('NavbarPadrao', () => {
  test('renderiza corretamente', () => {
    render(
      <Router>
        <NavbarPadrao />
      </Router>
    );

    expect(screen.getByText('Dev in Adotion')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  test('redireciona para a página correta ao clicar no link', () => {
    render(
      <Router>
        <Routes>
          <Route path="/login">Login Page</Route>
          <Route path="/cadastro-usuario">Cadastro Page</Route>
        </Routes>
        <NavbarPadrao />
      </Router>
    );

    const loginLink = screen.getByText('Login');
    const cadastrarLink = screen.getByText('Cadastrar');

    expect(loginLink).toHaveAttribute('href', '/login');
    expect(cadastrarLink).toHaveAttribute('href', '/cadastro-usuario');
  });
});
