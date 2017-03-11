const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/faqs'
const faqModel = require('../models/faq')
const faqsService = require('../services/faqs.service')({
    modelService: faqModel
})

module.exports = faqsController

function faqsController() {
    return {
        getAll,
        getOneById,
        insert,
        updateById,
        removeById
    }

    function getAll(req, res) {
        faqsService.getAll()
            .then((faqs) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = faqs
                res.json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }

        faqsService.getOne(queryCondition)
            .then((faq) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = faq
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function insert(req, res) {
        faqsService.insert(req.body)
            .then((faq) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = faq
                res.status(201)
                    .location(path.join(apiPrefix, faq._id.toString()))
                    .json(responseModel)
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        faqsService.updateOne(queryCondition, req.body)
            .then((faq) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err.stack))
            })
    }

    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        faqsService.removeOne(queryCondition)
            .then((faq) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = faq
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}
