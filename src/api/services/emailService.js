const sgMail = require('@sendgrid/mail');

const { sendgridApiKey } = require('../../config/vars');

sgMail.setApiKey(sendgridApiKey);

const msg = (statusChange, userName, receiver) => ({
  to: `${receiver}`, // Change to your recipient
  from: 'edwardteixeiradias@gmail.com', // Change to your verified sender
  dynamic_template_data: { statusChange, userName },
  template_id: 'd-25300c8df46341f8867176694bcccfb2',
});

exports.send = async (statusChange, userName, receiver) => {
  try {
    const result = await sgMail.send(msg(statusChange, userName, receiver));
  } catch (error) {
    console.log(error);
  }
};
