const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récuperation du Token dans la reqûete
    const decodedToken = jwt.verify(token, "TOKEN"); // On regarde si ça match
    const userId = decodedToken.userId; // Nous extrayons le userId de notre token
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
