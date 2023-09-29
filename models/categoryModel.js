const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    },
    // LATER ADD USER FOR EACH ACTIVITY
    // author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User'},
},
{
  timestamps: true,
}
);
categorySchema.virtual('url').get(function(){
  return '/category/' + this._id
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;