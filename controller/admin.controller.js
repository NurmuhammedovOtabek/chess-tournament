import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import sendErrorResponse from "../helper/send.error.response.js";

export const CreateAdmin = async (req, res) => {
  try {
    const { full_name, email, password, is_creator, is_active } = req.body;
    const filtr1 = await Admin.findOne({ where: { email } });
    if (filtr1) {
      return sendErrorResponse(
        { message: "Bunday emaillik Admin mavjud" },
        res,
        400
      );
    }
    const filtr2 = await Admin.findOne({ where: { full_name } });
    if (filtr2) {
      return sendErrorResponse(
        { message: "Bunday ismli Admin mavjud" },
        res,
        400
      );
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const newAdmin = await Admin.create({
      full_name,
      email,
      password: hashedPassword,
      is_creator,
      is_active,
    });
    res.status(201).json({
      message: "Create successfully",
      data: newAdmin,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const allAdmins = await Admin.findAll();
    if (allAdmins.length == 0) {
      return sendErrorResponse(
        { message: "Hali Adminlar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allAdmins,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdAdmins = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return sendErrorResponse(
        { message: "Bunday admin mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: admin,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const filtrAdmin = async (req, res) => {
  try {
    const { full_name } = req.query;
    const findAdmin = await Admin.findAll({ where: { full_name } });
    if (!findAdmin) {
      return sendErrorResponse(
        { message: "Bunday admin mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: findAdmin,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updateAdmins = async (req, res) => {
  try {
    const { full_name, email, password, is_active } = req.body;
    const id = req.params.id;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return sendErrorResponse(
        { message: "Bunday admin mavjud emas" },
        res,
        404
      );
    }
    if (admin.email != email) {
      const filtr = await Admin.findOne({ where: { email } });
      if (filtr) {
        return sendErrorResponse(
          { message: "Bunday emaillik Admin mavjud" },
          res,
          400
        );
      }
    }
    if (admin.full_name != full_name) {
      const filtr = await Admin.findOne({ where: { full_name } });
      if (filtr) {
        return sendErrorResponse(
          { message: "Bunday ismli Admin mavjud" },
          res,
          400
        );
      }
    }
    const coparePassword = await bcrypt.compare(admin.password, password);
    let hashedPassword;
    if (!coparePassword) {
      hashedPassword = await bcrypt.hash(password, 7);
    }
    const updateAdmin = await Admin.update(
      {
        full_name,
        email,
        password: hashedPassword,
        is_active,
      },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).send({
      message: "Success",
      data: updateAdmin,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delAdmin = async(req,res)=>{
    try{
        const id = req.params.id
        const filtr = await Admin.findByPk(id)
        if(!filtr){
            return sendErrorResponse({message:"Bunday Admin mavjud emas"}, res, 400)
        }
        await Admin.destroy({where: {id}})
        res.status(200).send({
            message: "Deleted seccessfully",
            statusCode: 200
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}