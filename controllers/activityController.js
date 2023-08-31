const Activity = require('../models/activityModel')
const User = require('../models/userModel')
const Objectid = require('mongodb').ObjectId;

exports.getContent = async (req, res) => {
  const content = await Activity.find();
  res.render('index', { content })
};

exports.createActivityGet = async (req, res) => {
  res.render('activity/add', { title: 'Create Activity'});
}

exports.createActivityPost = async (req, res) => {
  const id = req.session.userId;
  const activity = new Activity({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    image: req.file.filename,
    author: id,
  });

  //add Activity yo user Activities array
  await activity.save();
  //add post yo user posts array
  await User.findOneAndUpdate(
    { _id: id },
    { $push: { activities: activity } },
  )

  activity.save()
    .then(() => {
        // Handle successful save
        res.redirect('/');
    })
    .catch(err => {
        // Handle error
        return(err);
    });
  // activity.save(function (err) {
  //   if (err) { return next(err); }
  //      //successful - redirect to new activity record.
  //      res.redirect(activity.url);
  //   });
};

exports.getActivity = async (req, res) => {
  const content = await Activity.findById(req.params.id);
  const title = req.params.title;
  res.render('activity/:title', { content });
  
};

exports.updateActivity = async (req, res) => {
  const Activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(Activity);
};

exports.deleteActivity = async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.json({ message: 'Activity deleted' });
};