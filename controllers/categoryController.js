const Category = require('../models/categoryModel')
const User = require('../models/userModel')
const Objectid = require('mongodb').ObjectId;

exports.getCategory = async (req, res) => {
  const content = await Category.find();
  res.render('category/view', { content });
};

exports.createCategoryGet = async (req, res) => {
  console.log("imeload")
  res.render('category/add', { title: 'Create Category'});
}

exports.createCategoryPost = async (req, res) => {
  console.log(req.body)
  try {
    const id = req.session.userId;
    const category = new Category({
      category: req.body.category,
      author: id,
    });
    //add category to user categories array
    console.log(category)
    await category.save();
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { categories: category } },
    )

    // Handle successful save
    res.redirect('category');
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.updateCategoryGet = async (req, res) => {
  const filter = { category: req.params.category};
  const content = await Category.findOne(filter);
  res.render('category/edit', {content} )
};

  exports.updateCategoryPost = async (req, res) => {
    const category = req.body.category;

    try {
       await Category.findOneAndUpdate({category: category}, { category: category },{ new: true });
        res.redirect('/category/view');
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.deleteCategory = async (req, res) => {
  const category = req.params.category;

  try {
      await Category.findOneAndDelete({category: category});
      res.redirect('/')
  } catch (err) {
      res.status(500).send(err);
  }
}