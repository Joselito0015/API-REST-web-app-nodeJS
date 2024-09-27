const express = require('express');
const router = express.Router();
const TokenDAO = require('../../dao/class/dao.token');
const { Expo } = require('expo-server-sdk');

const Token = new TokenDAO;
const expo = new Expo();

router.post('/:companyId/tokens', async (req, res) => {
    const companyId = req.params.companyId;
    const tokenData = req.body;

    try {
        const tokens = await Token.getTokensByCompanyId(companyId);
        const listTokens = tokens.map(token => token.token);
        if (listTokens) {
            if (listTokens.includes(tokenData.token)){
                throw new Error('Token ya existe');
            } else {
                const newToken = await Token.addToken(companyId, tokenData);
                res.status(201).json(newToken);
            }
        } else {
            const newToken = await Token.addToken(companyId, tokenData);
            res.status(201).json(newToken);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:companyId/tokens/:tokenId', async (req, res) => {
    const companyId = req.params.companyId;
    const tokenId = req.params.tokenId;

    try {
        const tokens = await Token.getTokensByCompanyId(companyId);
        const listIds = tokens.map(token => token._id);
        if (!listIds.includes(tokenId)) {
            throw new Error('Id de token no existe');
        } else{
            await Token.deleteToken(companyId, tokenId);
            res.status(204).send();
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:companyId/registerPushToken', async (req, res) => {
    const companyId = req.params.companyId;
    const tokenTitle = req.body.title;
    const tokenBody = req.body.body;
    try {
        const tokens = await Token.getTokensByCompanyId(companyId);
        for (let token of tokens) {
            if (!Expo.isExpoPushToken(token)) {
                throw new Error(`Push token ${token} is not a valid Expo push token`);
            }
            expo.sendPushNotificationsAsync([
                {
                    to: token,
                    title: tokenTitle,
                    body: tokenBody,
                    trigger: {
                        seconds: 5,
                    },
                },
            ]);
        }
        res.status(200).send("Push notification sent successfully!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;