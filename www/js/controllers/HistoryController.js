myApp.controller('HistoryController', function($scope, $http, $ionicHistory) {
    //alert(JSON.stringify($stateParams));
    var data = JSON.parse(localStorage.getItem('data'));
    $scope.chkups = data.ChkUpInfos;

    //alert( JSON.stringify($scope.data) );
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };


}).controller('HistoryDetailController', function($scope, $http, $stateParams, $ionicHistory) {
    //alert(JSON.stringify($stateParams));
    var data = JSON.parse(localStorage.getItem('data'));
    $scope.chkups = data.ChkUpInfos;
    //alert( JSON.stringify($scope.chkups) );
    function getById(arr, id) {
        for (var d = 0, len = arr.length; d < len; d += 1) {
            //alert(arr[d].RequestNo + ' : ' + id);
            if (arr[d].RequestNo === id) {
                //alert(JSON.stringify(arr[d]));
                $scope.Data = arr[d];
                $scope.ChkPEs = arr[d].ChkPEs;
                $scope.ChkSummarys = arr[d].ChkSummarys;
                $scope.ChkLabs = arr[d].ChkLabs;
                $scope.ChkXrays = arr[d].ChkXrays;
                var x = 53 + d;
                var y = 22.06 + 0.42 * d;
                $scope.VitalSigns = {weight:x,bmi:y,temp:36.5,bp:135-d,pulse:59,rr:20}
                //$scope.VitalSigns = arr[d].ChkVitalSigns;
            }
        }

    }

    getById($scope.chkups, $stateParams.RequestNo);

    //alert( JSON.stringify($scope.data) );
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };


});
