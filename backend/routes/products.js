import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET /products - fetch all non-deleted products
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products WHERE deleted_at IS NULL"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /products - add new product
router.post("/", async (req, res) => {
  const { name, price, category } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
      [name, price, category]
    );
    res.json({ message: "Product created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /products/:id - update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  try {
    await db.query(
      "UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?",
      [name, price, category, id]
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /products/:id - soft delete (set deleted_at)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE products SET deleted_at = NOW() WHERE id = ?",
      [id]
    );
    res.json({ message: "Product soft-deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // PATCH /products/:id/restore - restore soft-deleted product
router.patch("/:id/restore", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE products SET deleted_at = NULL WHERE id = ?",
      [id]
    );
    res.json({ message: "Product restored" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
});

export default router;