myApp.controller('LabDetailController', function($scope, $stateParams, $ionicHistory){
	$scope.goBack = function() {
    	$ionicHistory.goBack();
    };
	var data = JSON.parse(localStorage.getItem('data'));

	var chkUpInfos = data.ChkUpInfos;
    var id = $stateParams.Order;
    for (var i = 0; i <= chkUpInfos.length; i++) {
        for (var dd = 0, len = chkUpInfos[i].ChkLabs.length; dd < len; dd += 1) {
            //alert(JSON.stringify(arr[d].ChkXrays[dd]));
            if (id == chkUpInfos[i].ChkLabs[dd].Order) {
                $scope.ChkLabs = chkUpInfos[i].ChkLabs[dd].LabGroups;
                return false;
            }
        }
    }

    
}).controller('XrayDetailController', function($scope, $stateParams, $ionicHistory){
	$scope.goBack = function() {
    	$ionicHistory.goBack();
    };
	var data = JSON.parse(localStorage.getItem('data'));

	$scope.chkups = data.ChkUpInfos;
    //alert( JSON.stringify($scope.chkups) );
    function getById(arr, id) {
        for (var d = 0, len = arr.length; d < len; d += 1) {
            
            for (var dd = 0, len = arr[d].ChkXrays.length; dd < len; dd += 1) {
                //alert(JSON.stringify(arr[d].ChkXrays[dd]));
                if (arr[d].ChkXrays[dd].RequestNo === id) {
                    
                    $scope.Xray = arr[d].ChkXrays[dd];
                    return false;
                    //alert(JSON.stringify(arr[d].ChkXrays[dd]));
                }
            }
        }
    }

    getById($scope.chkups, $stateParams.RequestNo);

    
});