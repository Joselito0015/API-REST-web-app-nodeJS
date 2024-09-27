const {Company} = require('../models/company.model');

class TokenDAO {
    async getTokensByCompanyId(companyId) {
        try {
            const company = await Company.findById(companyId, 'tokens');
            return company.tokens;
        }
        catch (error) {
            throw error;
        }
    };
    async addToken(companyId, tokenData) {
        try {
            const company = await Company.findById(companyId);
            if (!company.tokens.includes(tokenData)) {
                company.tokens.push(tokenData);
                const savedCompany = await company.save();
                return savedCompany.tokens[savedCompany.tokens.length - 1];
            } else {
                throw new Error('Token ya existe');
            }
        }
        catch (error) {
            throw error;
        }
    };
    async deleteToken(companyId, tokenId) {
        try {
            const company = await Company.findById(companyId);
            const tokenIndex = company.tokens.findIndex(token => token._id.toString() === tokenId);
            if (tokenIndex === -1) {
                throw new Error('Token not found');
            }
            company.tokens.splice(tokenIndex, 1);
            await company.save();
        }
        catch (error) {
            throw error;
        }
    };
    async getTokenByCompanyIdAndToken(companyId, tokenId) {
        try {
            const company = await Company.findById(companyId);
            const token = company.tokens.find(token => token._id.toString() === tokenId);
            if (!token) {
                throw new Error('Token not found');
            }
            return token;
        }
        catch (error) {
            throw error;
        }
    };
};

module.exports = TokenDAO;