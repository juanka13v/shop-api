const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const CryptoJs = require('crypto-js');
// Update

router.put("/:id", verifyTokenAndAuthorization),
  (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }

    try {
        
    } catch (error) {
        
    }

  };

module.exports = router;
