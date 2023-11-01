import jwt  from 'jsonwebtoken';

// Generate a random 8 digit number as the email token
export const generateEmailToken =  () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Generate auth token
export const  generateAuthToken = async (tokenId: number, secretKey: string) => {
    try {
        const payload = { tokenId} // Get token Id
        // Sign token
        const signPayload = jwt.sign(payload, secretKey, {
            expiresIn: '30m',
            algorithm: 'HS256',
            noTimestamp: true,
        });
        return signPayload;
    } catch (error) {
        throw error
    }
}


  