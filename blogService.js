/* global angular */
'use strict'

angular.module('public.blogs')
    .factory('BlogService', BlogService)

BlogService.$inject = ['$http']

function BlogService($http) {
    return {
        getAllBlogs,
        insert,
        update,
        getOne,
        deleteById
    }

    function getAllBlogs(onSuccess, onError) {
        return $http.get('/api/blogs/')
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }

    function insert(data, onSuccess, onError) {
        return $http.post('/api/blogs/', data)
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }

    function update(id, data, onSuccess, onError) {
        return $http.put('/api/blogs/' + id, data)
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }

    function getOne(id, onSuccess, onError) {
        return $http.get('/api/blogs/' + id)
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }

    function deleteById(id, onSuccess, onError) {
        return $http.delete('/api/blogs/' + id)
            .then((response) => {
                onSuccess(response.data)
            })
            .catch((response) => {
                onError(response.data)
            })
    }
}
