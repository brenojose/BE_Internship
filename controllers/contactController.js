import { Contact } from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    const newContact = await Contact.create({
      firstName,
      lastName,
      phone,
      email,
      message,
    });

    res.status(201).json({ contact: newContact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};
