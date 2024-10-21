import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home Component', () => {
    const companiesMock = [
        { id: 1, name: 'Company A' },
        { id: 2, name: 'Company B' },
        { id: 3, name: 'Company C' },
        { id: 4, name: 'Company D' },
        { id: 5, name: 'Company E' },
    ];

    beforeEach(() => {
        mockedAxios.get.mockReset();
    });

    test('renders the component and displays the title', () => {
        mockedAxios.get.mockResolvedValueOnce({ data: companiesMock });

        render(<Home />);

        expect(screen.getByText('Company Dashboard')).toBeInTheDocument();
    });

    test('displays loading indicator while fetching data', async () => {
        mockedAxios.get.mockImplementationOnce(() => new Promise(() => { }));
        render(<Home />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
    });

    test('displays a list of companies', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: companiesMock });

        render(<Home />);

        await waitFor(() => expect(screen.getByText('Company A')).toBeInTheDocument());

        companiesMock.forEach(company => {
            expect(screen.getByText(company.name)).toBeInTheDocument();
        });
    });

    test('allows users to select companies for deletion', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: companiesMock });

        render(<Home />);

        await waitFor(() => expect(screen.getByText('Company A')).toBeInTheDocument());

        const checkbox = screen.getByLabelText('Company A');
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });

    test('calls the delete function when the delete button is clicked', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: companiesMock });

        render(<Home />);

        await waitFor(() => expect(screen.getByText('Company A')).toBeInTheDocument());

        const checkbox = screen.getByLabelText('Company A');
        fireEvent.click(checkbox);

        const deleteButton = screen.getByRole('button', { name: /Delete Data for Selected Companies/i });
        fireEvent.click(deleteButton);

    });

    test('displays error message when fetching data fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<Home />);

        await waitFor(() => expect(screen.getByText('Failed to load companies. Please try again later.')).toBeInTheDocument());
    });
});
