import { render, screen, fireEvent } from '@testing-library/react'
import App from './App.js'


describe('App tests', () => {

    it('renders h1', async () => {
        render(<App />);
        const headingElement = screen.getByText(/NBA Players/i);
        expect(headingElement).toBeInTheDocument();
    })

    it('Render instruction Please enter the height', async () => {
        render(<App />);
        const instructionElement = screen.getByText(/Please enter the height/i);
        expect(instructionElement).toBeInTheDocument();
    })

    it('Should render input', async () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        expect(inputElement).toBeInTheDocument();
    })

    it('Should be able to type in input', async () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        fireEvent.change(inputElement, { target: { value: '80'}})
        expect(inputElement.value).toBe('80');
    })

    it('Should display No matches found when the input is empty', async () => {
        render(<App />);
        const pElement = await screen.findByText(/No matches found/i)
        expect(pElement).toBeInTheDocument();
    })

    it('Should display No matches found when does not match player height', async () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        fireEvent.change(inputElement, { target: { value: 95 }})
        const pElement = await screen.findByText(/No matches found/i)
        expect(pElement).toBeInTheDocument();
    })

    it('Return element if I type a number that matches height in the input field', async () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        fireEvent.change(inputElement, { target: { value: '1'}})
        const listElement = await screen.findByTestId('players-name');
        expect(listElement).toBeInTheDocument();
    })

})