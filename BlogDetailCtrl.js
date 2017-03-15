/* global angular */
'use strict'

angular.module('public.blogs')
    .controller('BlogDetailController', BlogDetailController)
    .directive('scroll', function($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind('scroll', function() {
                scope.visible = false
                scope.$apply()
            })
        }
    })

BlogDetailController.$inject = ['BlogService', 'CommentService', '$controller', '$state']

function BlogDetailController(BlogService, CommentService, $controller, $state) {
    var vm = this
    vm.initialized = false
    vm.blogs = []
    vm.comments = []
    vm.getBlogById = getBlogById
    vm.newBlog = {}
    vm.blogId = $state.params.id
    if (vm.blogId) {
        getBlogById()
    }

    function onError(err) {
        console.log(err)
    }

    function getBlogById() {
        BlogService.getOne(vm.blogId, onGetOneSuccess, onError)
    }

    function onGetOneSuccess(data) {
        vm.newBlog = data.item
    }
}
