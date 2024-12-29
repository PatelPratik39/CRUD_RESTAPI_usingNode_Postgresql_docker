import pool from "../config/db.js";

export const getAllUserService = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return null; // Explicitly return null if no user is found
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching user by ID ${id}:`, error);
    throw error;
  }
};

export const createUserService = async (name, email) => {
  if (!name || !email) {
    throw new Error("Name and email are required fields");
  }
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUserService = async (id, name, email) => {
  if (!name || !email) {
    throw new Error("Name and email are required fields");
  }
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    if (result.rows.length === 0) {
      return null; // Return null if no user was updated
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUserService = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return null; // Return null if no user was deleted
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};
