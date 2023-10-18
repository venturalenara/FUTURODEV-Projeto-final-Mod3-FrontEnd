import {render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListaDashboard from './ListaDashboard'
import { useFetch } from "../../../hooks/useFetch";
import userEvent from '@testing-library/user-event';
import {describe, expect, test, vi} from 'vitest'

vi.mock("../../../hooks/useFetch");
let originalAlert;

    beforeEach(() => {
      originalAlert = window.alert; 
      window.alert = vi.fn(); 
    });

    afterEach(() => {
      window.alert = originalAlert;
    });


describe('Teste do componente ListaDashboard', () => {
    test("Deve renderizar o componente corretamente", () => {
        const mockCreateData = vi.fn();
        useFetch.mockReturnValue({
          itens: []
        });

        render(
            <BrowserRouter>
            <ListaDashboard />
          </BrowserRouter>
        );
        
    });
}
)    