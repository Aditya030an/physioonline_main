const ownerAuth = (req, res, next) => {
  const ownerKey = req.headers["x-owner-key"];

  if (!ownerKey || ownerKey !== process.env.OWNER_SECRET_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized owner access",
    });
  }

  next();
};

export default ownerAuth;