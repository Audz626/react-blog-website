import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/productModel";
import fs from "fs-extra";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('reqbody productcontroller',req.body);
    console.log('reqfile productcontroller',req.file);
    var data = req.body;
    if (req.file) {
      data.file = req.file.filename;
    }
    console.log(data);
    const add_product = await new ProductModel(req.body).save();
    res.send(add_product);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
}

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    // console.log(req.params)
    const find_product = await ProductModel.findOne({ _id: id }).exec();
    res.send(find_product);
  } catch (err) {
    res.status(500).send("server error");
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const getlist = await ProductModel.find({}).exec();
    res.send(getlist);
  } catch (err) {
    res.send("error");
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    var newData = req.body;
    console.log('newdata>>>',newData);
    console.log(newData.imageold);
    console.log(req.file);

    if (typeof req.file !== undefined) {
      newData.file = req.file?.filename;
      await fs.unlink("./uploads/" + newData.imageold, (err) => {
        if (err) console.log(err);
        else console.log("Removed");
      });
    }
    const update_product = await ProductModel.findOneAndUpdate(
      { _id: id },
      newData,
      { new: true }
    ).exec();
    res.send(update_product);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const remove_product = await ProductModel
      .findOneAndDelete({_id: id,})
      .exec();

    console.log("remove_product", remove_product);
    // if (remove_product?.file) {
      await fs.unlink("./uploads/" + remove_product?.file, (err) => {
        if (err) throw err;
        else console.log("Removed");
      });
    // }
    res.status(200).send(remove_product);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
