const bcrypt = require('bcrypt');








async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 5);
    return hashedPassword;
  }

  async function comparePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

async function compareDBAdmin(usermail, password) {
  const AdminModel = require('./models/adminModel.cjs');
  const user = await AdminModel.findOne({ email: usermail });
  if (!user) {
    return false; 
  }
  else {
    const isMatch = await comparePassword(password, user.password);
    return isMatch;
  }
}

async function compareDBStudent(usermail, password) {
  const StudentModel = require('./models/studentModel.cjs');
  const user = await StudentModel.findOne({ email: usermail });
  if (!user) {
    return false;
  }
  else {
    const isMatch = await comparePassword(password, user.password);
    return isMatch;
  }
}



  module.exports= {hashPassword,comparePassword,compareDBAdmin,compareDBStudent};