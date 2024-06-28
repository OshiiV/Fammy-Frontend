const Allocate = require("../Model/AllocateModel");
// data Insert
const addAllocate = async (req, res, next) => {
  const { stockid, material, color, amount } = req.body;

  let allo;

  try {
    allo = new Allocate({
      stockid,
      material,
      color,
      amount,
    });
    await allo.save();
  } catch (err) {
    console.log(err);
  }
  // not insert allos
  if (!allo) {
    return res.status(404).json({ message: "unable to add Allocate" });
  }
  return res.status(200).json({ allo });
};

exports.addAllocate = addAllocate;
