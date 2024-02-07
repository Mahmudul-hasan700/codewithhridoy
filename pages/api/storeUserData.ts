// pages/api/storeUserData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs/promises";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { fullName, email, password } = req.body;

    const userDataFilePath = path.join(process.cwd(), "public/userData.json");

    try {
      // Read existing user data from the file
      let userData: any[] = [];
      try {
        const data = await fs.readFile(userDataFilePath, "utf-8");
        userData = JSON.parse(data);
      } catch (error) {
        console.error("Error reading user data file:", error);
      }

      // Add new user data
      userData.push({ fullName, email, password });

      // Write updated user data back to the file
      await fs.writeFile(userDataFilePath, JSON.stringify(userData, null, 2));

      res.status(200).json({ success: true, message: "User data stored successfully." });
    } catch (error) {
      console.error("Error storing user data:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}