import { Request, Response } from "express";
import * as taskService from "../services/taskService";
import { handleError } from "../utils/errorHandler";

export async function getAll(req: Request, res: Response) {
  try {
    const tasks = await taskService.getAll();
    res.json(tasks);
  } catch (err) {
    handleError(res, err);
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const task = await taskService.getById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    handleError(res, err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const task = await taskService.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    handleError(res, err);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const task = await taskService.update(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    handleError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await taskService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
}
