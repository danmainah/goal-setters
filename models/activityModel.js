const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    // LATER ADD USER FOR EACH ACTIVITY
    // author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User'},
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],
    reading_time: {
      type: String,
      select: true,
    },
},
{
  timestamps: true,
}
);
activitySchema.virtual('url').get(function(){
  return '/activity/' + this._id
})

const Activity = mongoose.model('activity', activitySchema);

module.exports = Activity;