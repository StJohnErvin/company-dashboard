import { Company } from '../interfaces/Company';

interface Props {
    company: Company;
    isSelected: boolean;
    toggleSelect: (id: number) => void;
}

const CompanyCard = ({ company, isSelected, toggleSelect }: Props) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-md shadow-sm">
            <p>{company.name}   <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelect(company.id)}
                className="form-checkbox h-4 w-4 text-blue-600"
            /></p>

        </div>
    );
};

export default CompanyCard;
