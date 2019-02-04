const bcrypt = require('bcrypt-nodejs');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');

// bcrypt.genSalt(10, (err, salt) => {
//     if(err) return next(err);

//     bcrypt.hash('bunkshit', salt, null, (err, hash) => {
//         if(err) return next(err);

//         console.log(hash)
//     })
// })

// const secret = 'thefuckyoupassword';
// const secretSalt= '8435hdsfjbfjh78f6sd87y';

// const user = {
//     id: 1,
//     token: MD5(secret).toString() + secretSalt
// }

// const recievedToken = '108ff689b3037e50c12ced943c68ee868435hdsfjbfjh78f6sd87y';

// if(recievedToken === user.token) {
//     console.log('move outta here');
// }

// console.log(user)

const id = '1000';
const secret = "fuckyoupassword";

const recievedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.5Gp10baFbhSX2p8LHFHDcdCNWUvEYq3A_itRr_rXFQw';

const token = jwt.sign(id, secret);
const decodeToken = jwt.verify(recievedToken, secret)

console.log(decodeToken)
