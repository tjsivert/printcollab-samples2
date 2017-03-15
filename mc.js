/* global angular */
'use strict'

angular.module('public.blogs')
                .controller('ModalCommentController', ModalCommentController)

ModalCommentController.$inject = ['$scope', '$uibModalInstance', 'id', 'CommentService']

function ModalCommentController($scope, $uibModalInstance, id, CommentService) {
    let vm = this

    vm.$scope = $scope
    vm.$uibModalInstance = $uibModalInstance
    vm.newComment = {
        parentCommentId: id
    }
    vm.submit = function() {
        vm.$uibModalInstance.close(vm.newComment)
    }
    vm.cancel = function() {
        vm.$uibModalInstance.dismiss('cancel')
    }
}
