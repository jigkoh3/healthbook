myApp.controller('HospitalListController', function ($scope, $http, service) {
    $scope.hospitalList = [];
    var url = 'http://casnet.dyndns-office.com/api/hospital';
    //var url = 'http://server1/api/hospital';

    service.get(url, function (getResult) {
        if (getResult.status == "200") {
            console.log(getResult.data);
            $scope.hospitalList = getResult.data;
        } else {
            service.alertURL(getResult.message, 'index.html');
        }
    });

    

});