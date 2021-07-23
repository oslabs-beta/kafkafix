import { RequestHandler } from "express";
import { handleAsync } from "../common";
const bcrypt = require("bcrypt");
import fs from "fs";
import path from "path";

export class AuthController {
  static signup: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    let data;
    try {
      data = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../users.json")).toString()
      );
      if (data[email]) return next({ err: "email has already been used" });
    } catch (e) {
      return next({ err: "error with searching db for email: " + e });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const cookie = await bcrypt.hash(email, 5);
    try {
      data[email] = { email, password: hashedPassword, cookie };
      fs.writeFileSync(
        path.resolve(__dirname, "../users.json"),
        JSON.stringify(data)
      );
  
    } catch (e) {
      return next({ err: "error with inserting into user collection: " + e });
    }
    res.cookie("SSID", cookie);
    return next();
  };

  
  static login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const data = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../users.json")).toString()
      );
      
      const { password: hashedPassword, cookie } = data[email];
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordMatch) {
        res.cookie("SSID", cookie);
        
        return next();
      }
    } catch (e) {
      return next({ err: "error with searching for user pass in db: " + e });
    }
  };

  static logout: RequestHandler = async (req, res, next) => {
    try {
      res.clearCookie("ssid");
      return next();
    } catch (e) {
      next({
        log: "ERROR from AuthController.logout",
        message: { err: `Did not delete cookie properly ERROR: ${e}` },
      });
    }
  };
}
