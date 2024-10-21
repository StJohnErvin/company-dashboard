import { NextApiRequest, NextApiResponse } from 'next';
import { Company } from '../../interfaces/Company';

const companies: Company[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Company ${index + 1}`,
}));

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedCompanies = companies.slice(startIndex, startIndex + Number(limit));

    res.status(200).json(paginatedCompanies);
};
