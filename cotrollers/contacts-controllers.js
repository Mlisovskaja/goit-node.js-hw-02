const { Contact } = require('../models/contact');


const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result)
  }
  catch (error) {
    next(error);
  }
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
       return res.status(404).json({
                message: `Not found`
            })
    }
    res.status(200).json(result)
  }
  catch (error) {
    next(error);
  }
}

const addNewContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  }
   catch(error) {
        next(error);
    }
}

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      return res.status(404).json({
        message: `Not found`
      })
    }
    res.status(200).json({
      message: "Contact deleted"
    })
  }

    catch(error) {
        next(error);
    }
}

const updateContact = async (req, res, next) => {
  try {
        const {contactId} = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      return res.status(404).json({
        message: `Not found`
      })
    }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

const updateFavourite = async (req, res, next) => {
  try {
        const {contactId} = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      return res.status(404).json({
        message: `Not found`
      })
    }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    getAllContacts,
    getById,
    deleteContact,
    addNewContact,
  updateContact,
    updateFavourite,
}

