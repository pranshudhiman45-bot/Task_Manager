const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status:{
    type:String,
    enum:['pending', 'completed'],
    default:'pending'
  },
  dueDate:{
    type:Date
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required: true,
  },
  
},{
    timestamps:true
})
const taskModule = mongoose.model('Task', taskSchema)


module.exports = taskModule