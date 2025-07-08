// server/controllers/productController.js
const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.create = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
};

exports.update = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'محصول حذف شد' });
};
