/* global angular */
'use strict'

angular.module('public.blogs')
    .controller('CommentController', CommentController)

CommentController.$inject = ['CommentService', 'BlogService', '$state', '$uibModal']

function CommentController(CommentService, BlogService, $state, $uibModal) {
    var vm = this
    vm.tagline = 'Have a comment?  Enter it in the form here.'
    vm.replyLine = 'Enter replies in this form.'
    vm.$uibModal = $uibModal
    vm.openModal = openModal
    vm.parentCommentId = null
    vm.comment = null
    vm.newComment = {}
    vm.submitForm = submitForm
    vm.submitReply = submitReply
    vm.blogId = $state.params.id
    vm.index = null

    if (vm.blogId) {
        getCommentByBlogId()
    }

    function openModal(_id) {
        var modalInstance = vm.$uibModal.open({
            animation: true,
            templateUrl: 'client/blogs/views/replies.html',
            controller: 'ModalCommentController as mc',
            size: 'sm',
            resolve: {
                id: function() {
                    return _id
                }
            }
        })

        modalInstance.result.then(function(newComment) {
            vm.newComment = newComment
            submitReply()
        }, function() {
            console.log('Modal dismissed at: ' + new Date())
        })
    }

    function submitForm() {
        console.log('submitting form')
        if (vm.blogId) {
            vm.newComment.blog_id = vm.blogId
            CommentService.insert(vm.newComment, onInsertSuccess, onError)
        }

        vm.newComment = null
    }

    function submitReply() {
        vm.newComment.blog_id = vm.blogId
        vm.parentCommentId = vm.newComment.parentCommentId
        CommentService.insert(vm.newComment, onReplySuccess, onError)
        vm.newComment = null
    }

    function onReplySuccess(data) {
        for (var i = 0; i < vm.comments.length; i++) {
            if (vm.comments[i]._id === data.item.parentCommentId) {
                vm.comments[i].replies.push(data.item)
            }
        }
    }

    function getCommentByBlogId() {
        CommentService.getCommentByBlogId(vm.blogId, getCommentSuccess, onError)
    }

    function getCommentSuccess(data) {
        vm.comments = data.items
    }

    function onInsertSuccess(data) {
        vm.comments.push(data.item)
    }

    function onError() {
        console.log('error')
    }
};
