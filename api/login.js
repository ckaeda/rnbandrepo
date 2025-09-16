import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Load users.json
  const filePath = path.join(process.cwd(), "users.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(fileData);

  // Find user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT
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
}
