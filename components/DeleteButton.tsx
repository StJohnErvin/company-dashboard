interface Props {
    selectedCompanies: number[];
    handleDelete: () => void;
}

const DeleteButton = ({ selectedCompanies, handleDelete }: Props) => {
    return (
        <button
            onClick={handleDelete}
            disabled={selectedCompanies.length === 0}
            className={`mt-6 w-full px-4 py-2 text-white font-semibold rounded-lg 
        ${selectedCompanies.length === 0 ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
            Delete Data for Selected Companies
        </button>
    );
};

export default DeleteButton;
