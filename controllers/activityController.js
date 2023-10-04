const Activity = require('../models/activityModel')
const User = require('../models/userModel')
const Category = require('../models/categoryModel')

exports.getContent = async (req, res) => {
  const content = await Activity.find();
  res.render('index', { content })
};

exports.createActivityGet = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('activity/add', { title: 'Create Activity', categories: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching categories');
  }
};

exports.createActivityPost = async (req, res) => {
  const id = req.session.userId;
  const category = await Category.findById(req.body.category);
  
  if (!category) {
    return res.redirect('./category/add');
  }

  const activity = new Activity({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    image: req.file.filename,
    author: id,
  });

  try {
    // Save the activity
    await activity.save();
    
    // Add post to user posts array
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { activities: activity } },
    )

    // Redirect after successful save
    res.redirect('./');
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send('An error occurred while creating the activity');
  }
};

exports.getActivity = async (req, res) => {
  const filter = { title: req.params.title };
  const content = await Activity.findOne( filter);
  res.render('activity/view', { content });
};

exports.updateActivityGet = async (req, res) => {
  const filter = { title: req.params.title };
  const content = await Activity.findOne(filter);
  res.render('activity/edit', {content} )
};

exports.updateActivityPost = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const image = req.file.filename;

    try {
       await Activity.findOneAndUpdate({title: title}, { title: title , content: content, category: category, image: image},{ new: true });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.deleteActivity = async (req, res) => {
  const title = req.params.title;

  try {
      await Activity.findOneAndDelete({title: title});
      res.redirect('/')
  } catch (err) {
      res.status(500).send(err);
  }
}