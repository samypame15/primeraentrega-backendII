// registerUser.js
import User from '../models/user.model.js';
import { hashPassword } from '../utils/hash.js';

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    await newUser.save();

    // Excluir contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Error registrando usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
