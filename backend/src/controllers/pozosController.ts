import type { Request, Response } from "express";
import { pool } from "../db";
import type { Pozo } from "../models/Pozo.ts";

export const getPozos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM pozos ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo pozos", error });
  }
};

export const createPozo = async (req: Request, res: Response) => {
  try {
    const { nombre, ubicacion, produccion_diaria, estado }: Pozo = req.body;

    if (!nombre || !estado) {
      return res.status(400).json({ message: "Nombre y estado son requeridos" });
    }

    const result = await pool.query(
      "INSERT INTO pozos (nombre, ubicacion, produccion_diaria, estado) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, ubicacion, produccion_diaria, estado]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creando pozo", error });
  }
};

export const updateEstado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (estado !== "activo" && estado !== "inactivo") {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const result = await pool.query(
      "UPDATE pozos SET estado = $1 WHERE id = $2 RETURNING *",
      [estado, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Pozo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando estado", error });
  }
};
