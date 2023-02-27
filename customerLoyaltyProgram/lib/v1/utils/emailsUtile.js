var email = {};
const getGiftMail = (companyName, user) => {
  email.subject = "Congratulations! You have gift";
  email.text = `<h3>Dear ${user.title} ${user.name} ${user.surname},</h3>
<h4>We hope you are doing well,</h4> 

<p>Now, you are able to change the standard points in <b>${companyName}</b>.</p>
<p>So the <b>${companyName}</b> is obligated to change your standerd points.</p>

<p>Please head to the closest branch of <b>${companyName}</b> to change your points and receive your gift or discount.</p>

<p><i>As a loyalty system, we wish you to have a good day and enjoy your achievement.</i></p>

<p><b>Best wishes</b></p>
</br>

<p style="color:red">This email is sent automatically from the loyalty system. 
Please do not replay to this email</p>`;

  return email;
};

const getTierMail = (companyName, user, tierColor) => {
  const colors = {
    Gold: "#daa520",
    Silver: "#808080",
    Platinum: "#a39e95",
  };

  email.subject = "Congratulations! Your tier upgraded";
  email.text = `<h3>Dear ${user.title} ${user.name} ${user.surname},</h3>
<h4>We hope you are doing well,</h4> 

<p>Your tier in <b>${companyName}</b> has been upgraded to the <b style="color:${colors[tierColor]}">${tierColor} </b>tier.</p>
<p>So the <b>${companyName}</b> is obligated to give you the benefits of the <b style="color:${colors[tierColor]}">${tierColor} </b>tier.</p>

<p>Please remind the <b>${companyName}</b> that you have a <b style="color:${colors[tierColor]}">${tierColor}</b> tier when you do a trade with them next time.</p>

<p><i>As a loyalty system, we wish you to have a good day and enjoy your achievement.</i></p>

<p><b>Best wishes</b></p>
</br>

<p style="color:red">This email is sent automatically from the loyalty system. 
Please do not replay to this email</p>`;

  return email;
};

module.exports = {
  getGiftMail,
  getTierMail,
};
