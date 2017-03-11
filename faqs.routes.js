const router = require('express').Router()
const faqsController = require('../controllers/faqs.controller')()
const faqsValidation = require('../middleware/faqsValidation')
const {cache} = require('../../config/apicache')
module.exports = router

// api routes ===========================================================
router.get('/', cache.middleware(), faqsController.getAll)
router.get('/:id', faqsController.getOneById)
router.post('/', faqsValidation.validateFaqParams, faqsController.insert)
router.put('/:id', faqsValidation.validateFaqParams, faqsController.updateById)
router.delete('/:id', faqsController.removeById)
