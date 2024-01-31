import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/productModel";
import { blogsModel } from "../models/blogModel";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import fs from "fs-extra";
import * as formidable from "formidable";
import { UserModel } from "../models/userModel";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("req.body blogController :", req.body);
    console.log("req.file blogControllet", req.file);
    const { author } = req.body;
    var data = req.body;

    const findId = await UserModel.findOne({ name: author });
    console.log("findId", findId);

    let slug = slugify(data.title);
    console.log("slug :", slug ? slug : "0");
    console.log("data blogcontroller :", data);

    if (!slug) {
      slug = uuidv4();
    }
    data.slug = slug;

    if (req.file) {
      data.file = req.file.filename; // set data into req.body : keyname='file': req.file.filename (if key=data.test keyname="test")
      //   console.log('req.file blogcntrollers :',data);
    } else {
      data.file = "noimage.jpg";
    }

    if (findId?._id) {
      data.author = findId._id;
    }

    console.log("data blogcontroller", data);
    const add_blog = await new blogsModel(data).save();
    res.send(add_blog);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
}

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    console.log("@req.param blogController :", req.params);
    const find_product = await blogsModel.findOne({ _id: id }).exec();
    res.send(find_product);
  } catch (err) {
    res.status(500).send("server error");
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const getlist = await blogsModel
      .find({})
      .populate("author", ["name"])
      .exec();
    // console.log('getlist @blogController:', getlist);
    res.send(getlist);
  } catch (err) {
    res.send(err);
  }
}

export async function getblogbyslug(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { slug } = req.params;
    console.log("slug @blogcon :", slug);
    const getblogbyslug = await blogsModel
      .findOne({ slug })
      .populate("author", ["name"]) // ดึงข้อมูล usermodelมา เอาแค่ชื่อ
      .exec();
    console.log("getblogbyslug @blogcon>>>", getblogbyslug);
    res.json(getblogbyslug);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

export async function getblogbyid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    console.log("slug @blogcon :", id);
    const getblogbyid = await blogsModel
      .find({ author: id })
      // .populate('author',['name'])
      .exec();
    console.log("id.length :", getblogbyid.length);

    res.json(getblogbyid);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}
export async function getblogEditByid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    console.log("slug @blogcon :", id);
    const getblogbyid = await blogsModel
      .findOne({ _id: id })
      // .populate('author',['name'])
      .exec();
    console.log("id.length :", getblogbyid);

    res.json(getblogbyid);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    var newData = req.body;
    console.log("newdata @blogcon>>>", newData);
    console.log("id @blogcon>>>", id);
    console.log("req.file @blogcon>>>", req.file);
    console.log("typeof req.file @blogcon>>>", typeof req.file);

    if (req.file !== undefined) {
      newData.file = req.file?.filename;
      console.log("newData.file @blogController:", newData.file);
      await fs.unlink("./uploads/" + newData.imageold, (err) => {
        if (err) console.log(err);
        else console.log("Removed");
      });
    }
    const update_product = await blogsModel
      .findOneAndUpdate({ _id: id }, newData, { new: true })
      .exec();
    console.log("update_product @blogcon:", update_product);
    res.status(200).send("Updated!!");
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const remove_product = await blogsModel
      .findOneAndDelete({ _id: id })
      .exec();

    console.log("remove_product", remove_product);
    if (remove_product?.file && remove_product?.file != "noimage.jpg") {
      await fs.unlink("./uploads/" + remove_product?.file, (err) => {
        if (err) throw err;
        else console.log("Removed");
      });
    }
    res.status(200).send(remove_product);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

export async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const Shearchdata = req.query.data;
    console.log("search @blogcon:", Shearchdata);
    const querydata = await blogsModel
      .find({ title: { $regex: new RegExp(`^${Shearchdata}`, "i") } })
      .exec();

    res.send(querydata);

    // db.collection.find({ title: { $regex: /^how/i } })
  } catch (err) {
    console.log(err);
  }
}

// *** using formidable for access create ***
// export async function create1(req: Request, res: Response, next: NextFunction) {
//   try {
//     let form = new formidable.IncomingForm();
//     form.parse(
//       req,
//       async (
//         err: any,
//         fields: formidable.Fields<string>,
//         files: formidable.Files<string>
//       ) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("server error2");
//           return;
//         }
//         let { title, content, author } = fields;
//         if (files && files.file) {
//           const originalFilename = files.file[0].originalFilename;
//           console.log("Original Filename:", originalFilename);
//           res.send(originalFilename);
//         } else {
//           console.error("Invalid or missing file information");
//         }
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("server error");
//   }
// }
