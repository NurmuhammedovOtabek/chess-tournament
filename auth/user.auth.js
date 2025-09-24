import config from "config";
import bcrypt from "bcrypt";
import jwtService from "../service/jwt.service.js";
import sendErrorResponse from "../helper/send.error.response.js";
import User from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendErrorResponse(
        { message: "Email yoki password noto'g'ri" },
        res,
        401
      );
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Email yoki password noto'g'ri" },
        res,
        401
      );
    }
    const payload = {
      id:user.id,
      email:user.email,
      is_active:user.username,
    };
    const tokens = jwtService.geterateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    user.refresh_token = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "UserUser logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refresh token topilmadi" },
        res,
        400
      );
    }
    const verifydRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const user = await User.findByPk(verifydRefreshToken.id);
    user.refresh_token = null;
    await user.save();

    res.clearCookie("refreshToken");
    res.send({
      message: "UserUser loget out",
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refresh token topilmadi" },
        res,
        400
      );
    }

    const verifydRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const user = await User.findByPk(verifydRefreshToken.id);

    const compareRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refresh_token
    );
    if (!compareRefreshToken) {
      return sendErrorResponse({ message: "Refresh token notog'ri" }, res, 400);
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.username,
    };
    const tokens = jwtService.geterateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    user.refresh_token = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Tokens refreshed",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const register = async (req,res) =>{
    try {
      const { full_name, username, email, password } = req.body;
      const filtr1 = await User.findOne({ where: { email } });
      if (filtr1) {
        return sendErrorResponse(
          { message: "Bunday emaillik User mavjud" },
          res,
          400
        );
      }
      const filtr2 = await User.findOne({ where: { username } });
      if (filtr2) {
        return sendErrorResponse(
          { message: "Bunday ismli User mavjud" },
          res,
          400
        );
      }

      const hashedPassword = await bcrypt.hash(password, 7);
      const newUser = await User.create({
        full_name,
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        message: "Create successfully",
        data: newUser,
        statusCode: 201,
      });
    } catch (error) {
      sendErrorResponse(error, res, 500);
    }
}