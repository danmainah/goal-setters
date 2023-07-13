const Activity = require('../models/activityModel')

exports.getContent = async (req, res) => {
  res.render('index', { title: 'welcome to Goal Setters' })
};

exports.createActivity = async (req, res) => {
  const activity = new Activity({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    image: req.file.filename,
    author: 1,
  });

  //add Activity yo user Activities array
  // await User.findOneAndUpdate(
  //   { _id: id },
  //   { $push: { Activities: Activity } },
  // )
  activity.save(function (err) {
    if (err) { return next(err); }
       //successful - redirect to new activity record.
       res.redirect(book.url);
    });
};

exports.getActivity = async (req, res) => {
  const Activity = await Activity.findById(req.params.id);
  res.json(Activity);
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