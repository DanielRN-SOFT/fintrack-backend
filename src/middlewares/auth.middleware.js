import jwt from "jsonwebtoken";
import prisma from "../../prismaClient.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      const { id } = decoded;
      req.usuario = await prisma.usuarios.findUnique({
        where: { id },
        select: {
          id: true,
          nombre: true,
          email: true,
          roles_id: true,
        },
      });
    } catch (error) {
      const e = new Error("Token no valido o inexistente");
      return res.status(403).json({ msg: e.message, success: false });
    }
  }

  if (!token) {
    const error = new Error("Token no valido o inexistente");
    return res.status(403).json({ msg: error.message, success: false });
  }

  next();
};

export default checkAuth;
