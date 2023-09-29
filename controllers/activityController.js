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
        res.redirect('/activity/:title');
    })
    .catch(err => {
        // Handle error
        return(err);
    });
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

// exports.updateActivityPost = async (req, res) => {
//     const title = req.body.title
//     const content = req.body.content
//     const category = req.body.category
//     const image = req.file.filename
//     Activity.findOneAndUpdate({title: title}, { title: title , content: content, category: category,image: image}, (err, activity) => {
//       if (err) {
//           // Handle error

//           return (err) 
//       } else {
//           // Redirect user back to form
//           res.redirect('activity/view', { activity });
//       }
//   });
//   }

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