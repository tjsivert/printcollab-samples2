'use strict'

angular.module('public.blogs')
    .factory('CommentService', CommentService)

CommentService.$inject = ['$http']

function CommentService($http) {
    return {
        getCommentByBlogId,
        getAllComments,
        insert
    }

    function getCommentByBlogId(id, onSuccess, onError) {
        return $http.get('api/comments/blog/' + id)
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }

    function getAllComments(onSuccess, onError) {
        return $http.get('api/comments')
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }

    function insert(data, onSuccess, onError) {
        return $http.post('api/comments', data)
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }
}

