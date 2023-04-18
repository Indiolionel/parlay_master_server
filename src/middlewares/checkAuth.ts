import jwt from "jsonwebtoken";
import User from "../mongo/models/user";
import { NextFunction } from "express";

const checkAuth = async (req:any, res:any, next:NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log(token)

      const decoded:any = jwt.verify(token, "dfsdgfdfg");

      req.usuario = await User.findById(decoded.id);

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;