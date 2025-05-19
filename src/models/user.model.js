import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },  // recuerda que debe almacenarse en hash antes de guardar
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },  // referencia al modelo Carts
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

export default User;
