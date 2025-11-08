import { Response } from "express";

export function handleError(res: Response, err: any) {
  console.error("❌ Error:", err);
  res.status(400).json({
    message: err.message || "Erro interno no servidor",
  });
}
