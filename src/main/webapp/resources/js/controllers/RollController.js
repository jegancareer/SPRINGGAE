var RollController = function($scope, $http) {
    $scope.fetchRoll = function() {
        $http.get('roll/roll.json').success(function(rolling){
            $scope.roll = rolling;
        });
    };
    $scope.fetchRoll();
    App.RollGlobals($scope);
    App.RollGradiants($scope);
    App.RollData($scope);
    App.RollChords($scope);
    App.RollProperty($scope);
    App.RollUpdate($scope);
    
};