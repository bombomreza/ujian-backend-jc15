const nodemailer = require('nodemailer');
const util = require('util');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mrezas1616@gmail.com',
    pass: 'azogeklcbgszwlaf',
  },
});

const transportPromise = util.promisify(transporter.sendMail).bind(transporter);

module.exports = {transporter, transportPromise};
