import jwt from "jsonwebtoken";

// Blob URL stored in env so it's not hardcoded
const USERS_BLOB_URL = process.env.USERS_BLOB_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  try {
    // Fetch users.json from Blob storage
    const response = await fetch(USERS_BLOB_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch users.json");
    }
    const users = await response.json();

    // Check if user exists with matching credentials
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Sign JWT
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set as HttpOnly cookie
    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
    );

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
