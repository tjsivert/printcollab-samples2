// Blogs Controller will act as an entrypoint for the request, call the Blog service and handle the promise that is returned const responses = require('../models/responses')
const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/blogs'
const blogModel = require('../models/blog')
const blogService = require('../services/blogs.service')({ // bringing in blogs.service by requiring it also invoking it. if we invoke it, we get access to the 6 functions created.
    modelService: blogModel
})

module.exports = blogsController

function blogsController() { // function in my controller that, when invoked, will call a service function to return all blogs from my mongo db
    // return object otherwise known as closure, so that we can get access to all our functions closed up in this bprojectsController function.
    return {
        ping,
        getAll,
        getOneById,
        insert,
        updateById,
        removeById,
        getBlogByTagId
    }
    // the rest of the functions below link up and communicate with our /blogs.service
    // get all
    // below line is a function which alone returns us blogs.find which is a promise in blogs.service.
    function getAll(req, res) { // bc we are inside our controller, this is going to be receviing the request and response object directly from our route file.
        blogService.getAll() // the promise that's returned here, has to be handled and resolved 1 or 2 ways. either resolved or rejected. if resolved, w/e happens in .then method will run
            .then((blogs) => { // this is an anonymous function that is receiving blogs when promise (getAll() from blogs.service ) has been resolved. in this case, the promise is to get back all blogs.
                const responseModel = new responses.ItemsResponse()
                responseModel.items = blogs
                res.json(responseModel) // .then method will receive blogs with those blogs that are received back, we can resend with json.
            }).catch((err) => { // if rejected it will catch and send error message.
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    // get one by id
    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }

        blogService.getOne(queryCondition)
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = blog
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    // =================================================================================

    // $all notes
    // When passed an array of a nested array (e.g. [ [ "A" ] ] ), $all can now match documents where the field contains
    // the nested array as an element (e.g. field: [ [ "A" ], ... ]), or the field equals the nested array (e.g. field: [ "A" ]).

    // =================================================================================

   // get BLOG by tag id
    function getBlogByTagId(req, res) {
        let queryCondition = {
            tags: {
                $all: [ // The $all operator selects the documents where the value of a field is an array that contains all the specified elements.
                    [req.params.tagid]
                ]
            }
        }

        blogService.getAll(queryCondition)
            .then((tags) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = tags
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    // post/insert
    function insert(req, res) {
        blogService.insert(req.body) // req.body is going to be the body parsed out of any of its parameters.
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = blog
                res.status(201)
                    .location(path.join(apiPrefix, blog._id.toString()))
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }
    // put/update
    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        blogService.updateOne(queryCondition, req.body) // req.body is going to be the body parsed out of any of its parameters.
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err.stack))
            })
    }

    // remove by id
    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        blogService.removeOne(queryCondition)
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = blog
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function ping(req, res) {
        blogService.ping()
            .then((data) => { // this is an anonymous function that is receiving blogs when promise (line 9 from service file)has been resolved. in this case, the promise is to get back all blogs.
                const responseModel = new responses.ItemResponse()
                responseModel.item = data
                res.json(responseModel)
            })
            .catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}

// notes:
// Define any required fiellds in the scehma.
// create functions in the service to perform crud operations to connect with db
// controller acts as the enterypoint for the request, it calls the service and handles the promise that is returned
// blogs route will create an instance of the router and direct requests to api to correct controller fucntions
// Pipeline for request should be routes file -> controller -> service -> db
// insert is POST & update is PUT
