import bcrypt from "bcrypt";
import sendErrorResponse from "../helper/send.error.response.js";
import User from "../models/user.model.js";

export const CreateUser = async (req, res) => {
  try {
    const { full_name,
        username,
        email,
        password } = req.body;
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
      password: hashedPassword
    });
    res.status(201).json({
      message: "Create successfully",
      data: newUser,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    if (allUsers.length == 0) {
      return sendErrorResponse(
        { message: "Hali Userlar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allUsers,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const User = await User.findByPk(id);
    if (!User) {
      return sendErrorResponse(
        { message: "Bunday User mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: User,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const filtrUser = async (req, res) => {
  try {
    const { username } = req.query;
    const findUser = await User.findAll({ where: { username } });
    if (!findUser) {
      return sendErrorResponse(
        { message: "Bunday User mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: findUser,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { full_name, username, email, password } = req.body;
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) {
      return sendErrorResponse(
        { message: "Bunday User mavjud emas" },
        res,
        404
      );
    }
    if (user.email != email) {
      const filtr = await User.findOne({ where: { email } });
      if (filtr) {
        return sendErrorResponse(
          { message: "Bunday emaillik User mavjud" },
          res,
          400
        );
      }
    }
    if (user.username != username) {
      const filtr = await User.findOne({ where: { username } });
      if (filtr) {
        return sendErrorResponse(
          { message: "Bunday ismli User mavjud" },
          res,
          400
        );
      }
    }
    const coparePassword = await bcrypt.compare(user.password, password);
    let hashedPassword;
    if (!coparePassword) {
      hashedPassword = await bcrypt.hash(password, 7);
    }
    const updateUser = await User.update(
      {
        full_name,
        username,
        email,
        password: hashedPassword,
      },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).send({
      message: "Success",
      data: updateUser,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delUser = async (req, res) => {
  try {
    const id = req.params.id;
    const filtr = await User.findByPk(id);
    if (!filtr) {
      return sendErrorResponse(
        { message: "Bunday User mavjud emas" },
        res,
        400
      );
    }
    await User.destroy({ where: { id } });
    res.status(200).send({
      message: "Deleted seccessfully",
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
