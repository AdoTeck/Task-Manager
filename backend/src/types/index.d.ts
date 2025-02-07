  import mongoose from 'mongoose';
  export interface ITodo extends mongoose.Document {
    User: mongoose.Types.ObjectId;
    TodoTitle: string;
    TodoDescription: string;
  }