const generateOTP = () => {
  const code = Math.floor(10000 + Math.random() * 60000);
  return code;
};

module.exports =  generateOTP ;
