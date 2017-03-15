/* global angular */
'use strict'

angular.module('public.blogs')
    .controller('BlogController', BlogController)

BlogController.$inject = ['BlogService', 'CommentService', '$controller', '$state']

function BlogController(BlogService, CommentService, $controller, $state) {
    var vm = this
    vm.blogId = $state.params.id
    vm.blogs = []
    vm.index = null
    vm.getBlogById = getBlogById
    vm.submitForm = submitForm
    vm.deleteBlog = deleteBlog
    vm.newBlog = {}

    getAllBlogs()

    function submitForm(isValid) {
        if (isValid) {
            BlogService.insert(vm.newBlog, onInsertSuccess, onError)
        } else {
            console.log('form submitted with invalid data >:(')
        }
    }

    function getBlogById() {
        BlogService.getOne(vm.blogId, onGetOneSuccess, onError)
    }

    function onGetOneSuccess(data) {
        vm.newBlog = data.item
    }

    function onInsertSuccess(data) {
        vm.alert(data.alert, 'Blog saved, inserted successfully')
        vm.blogs.push(data.item)
        vm.newBlog = null
    }

    function onError(err) {
        console.log(err)
    }

    function getAllBlogs() {
        BlogService.getAllBlogs(getAllSuccess, onError)
    }

    function getAllSuccess(data) {
        vm.blogs = data.items
    }

    function deleteBlog(index, id) {
        vm.currentBlog = index
        BlogService.deleteById(id, deleteSuccess, onError)
    }

    function deleteSuccess(data) {
        vm.blogs.splice(vm.currentBlog, 1)
    }
}
