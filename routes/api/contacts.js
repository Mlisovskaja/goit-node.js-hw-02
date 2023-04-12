const express = require('express');
const router = express.Router();
const ctrl = require('../../cotrollers/contacts-controllers');
const validateBody = require('../../decorators/decorators');
const { schemas }  = require('../../models/contact');


router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addNewContact);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavourite);

module.exports = router
