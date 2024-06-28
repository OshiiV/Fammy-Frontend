const Inform = require("../Model/InformModel");
// data Insert
const addInform = async (req, res, next) => {
  const { name, material, color, amount } = req.body;

  let infor;

  try {
    infor = new Inform({
      name,
      material,
      color,
      amount,
    });
    await infor.save();
  } catch (err) {
    console.log(err);
  }
  // not insert informs
  if (!infor) {
    return res.status(404).json({ message: "unable to add" });
  }
  return res.status(200).json({ infor });
};

exports.addInform = addInform;
