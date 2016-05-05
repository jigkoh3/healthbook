myApp.controller('AppointmentListController', function($scope, $http, $ionicHistory) {
    //alert(JSON.stringify($stateParams));
    var data = JSON.parse(localStorage.getItem('data'));
    $scope.appointmentLists = data.AppointmentInfos;

    //alert( JSON.stringify($scope.data) );
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };


}).controller('AppointmentDetailController', function($scope, $http, $stateParams, $ionicHistory) {
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
    var data = JSON.parse(localStorage.getItem('data'));
    var appointInfos = data.AppointmentInfos;
    var id = $stateParams.AppointmentNo;
    for (var i = 0; i <= appointInfos.length; i++) {
        if (id == appointInfos[i].AppointmentNo) {
            $scope.appointmentDetail = appointInfos[i];
            break;
        }
    }

});
