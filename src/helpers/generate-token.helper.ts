const jwt = require('jsonwebtoken');

export const generateJWT = async ( uid = '') => {
    return new Promise((resolve, reject ) => {
        const payload  = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err: string, token: string) => {
            if(err){
                console.log(err);
                reject('It was not possible to generate a token.')
            } else {
                resolve(token);
            }
        })
    });
}