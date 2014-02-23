var app = angular.module('codecards', []);

app.factory('Cards', ['$http', function($http) {
    return {
        post: function(data, success, error) {
            $http.post('/cards', data).success(function() {
                if (typeof success === 'function') success.apply(this, arguments);
            }).error(function() {
                if (typeof error === 'function') error.apply(this, arguments);
            });
        },
        get: function(data, success, error) {
            $http.get('/cards', data).success(function() {
                if (typeof success === 'function') success.apply(this, arguments);
            }).error(function() {
                if (typeof error === 'function') error.apply(this, arguments);
            });
        },
        remove: function(id, success) {
            $http.delete('/cards?id=' + id).success(function() {
                if (typeof success === 'function') success.apply(this, arguments);
            });
        }
    }
}]);

app.controller('AddCardCtrl', ['$scope', 'Cards', function($scope, Cards) {
    $scope.errors = {};
    $scope.cards = [];

    Cards.get({}, function(data) {
        $scope.cards = data;
    });

    $scope.submit = function() {
        if ($scope.validate()) {
            Cards.post({
                title: $scope.title,
                text: $scope.text
            }, function(data) {
                $scope.cards.unshift(data);
            });
            $scope.title = $scope.text = '';
        }
    };

    $scope.remove = function(id) {
        Cards.remove(id, function() {
            $scope.cards = $scope.cards.filter(function(card) {
                return card._id !== id;
            });
        });
    };

    $scope.validate = function() {
        $scope.errors.title = $scope.errors.text = false;
        if (!$scope.title) $scope.errors.title = true;
        if (!$scope.text) $scope.errors.text = true;
        if ($scope.errors.title || $scope.errors.text) return false;
        return true;
    };
}]);
