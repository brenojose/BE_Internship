import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Sign Up Controller
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user with the same name exists
    let userByName = await User.findOne({ name });
    if (userByName) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Check if user with the same email exists
    let userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }
    
    // Create a new user
    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err); //Testing errors on console, please delete this.
    res.status(500).json({ message: "Server error." });
  }
};

// Sign In Controller
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err); //Testing errors on console, please delete this.
    res.status(500).json({ message: "Server error." });
  }
};
