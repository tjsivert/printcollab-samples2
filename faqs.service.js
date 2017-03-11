module.exports = faqsService

function faqsService(options) {
    let Faq

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Faq = options.modelService

    return {
        getAll,
        getOne,
        insert,
        updateOne,
        removeOne
    }

    function getAll() {
        return Faq.find()
    }

    function getOne(queryCondition) {
        return Faq.findOne(queryCondition)
    }

    function insert(document) {
        // const faq = new Faq(reqBody)
        let faq = new Faq(document)
        return faq.save()
    }

    function updateOne(queryCondition, doc) {
        return Faq.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Faq.findOneAndRemove(queryCondition)
    }
}
