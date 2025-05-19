// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';
// import { hashPassword, comparePassword } from '../utils/hash.js';

// // Registro de usuario
// export const registerUser = async (req, res) => {
//   try {
//     const { first_name, last_name, email, age, password } = req.body;

//     if (!first_name || !last_name || !email || !age || !password) {
//       return res.status(400).json({ message: 'Todos los campos son obligatorios' });
//     }

//     const exist = await User.findOne({ email });
//     if (exist) {
//       return res.status(400).json({ message: 'Usuario ya existe' });
//     }

//     const hashedPassword = await hashPassword(password);

//     const newUser = new User({
//       first_name,
//       last_name,
//       email,
//       age,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     const { password: _, ...userWithoutPassword } = newUser.toObject();

//     return res.status(201).json({
//       message: 'Usuario registrado con éxito',
//       user: userWithoutPassword,
//     });
//   } catch (error) {
//     console.error('Error en registro:', error);
//     return res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

// // Login de usuario
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Usuario no encontrado' });
//     }

//     const isValid = await comparePassword(password, user.password);
//     if (!isValid) {
//       return res.status(401).json({ message: 'Contraseña incorrecta' });
//     }

//     const payload = {
//       id: user._id,
//       email: user.email,
//       first_name: user.first_name,
//       last_name: user.last_name,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     return res.json({
//       message: 'Login exitoso',
//       token,
//       user: payload,
//     });
//   } catch (error) {
//     console.error('Error en login:', error);
//     return res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };


import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';

// Registro
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'Usuario ya existe' });
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
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const payload = {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      message: 'Login exitoso',
      token,
      user: payload,
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
