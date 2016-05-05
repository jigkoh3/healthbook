angular.module('healthBook.controllers', ['healthBook.services', 'chart.js'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localstorage) {
    // Initiate the authen
    if (typeof $localstorage.get('authen') === "undefined") {
        $localstorage.set('authen', true);
    };
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();

    });


    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        alert('login');
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $scope.closeLogin();
        $ionicModal.fromTemplateUrl('templates/agreement.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();

        });
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system

    };
    $scope.doAgreement = function () {
        console.log('Doing login', $scope.loginData);
        $scope.closeLogin();

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system

    };


})

.controller('AppointmentsCtrl', function ($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
})

.controller('MainCtrl', function ($scope, $http, $ionicSlideBoxDelegate, $localstorage) {
    Chart.defaults.global.scaleBeginAtZero = true;
    //Chart.defaults.global.scaleOverride = true;
    //Chart.defaults.global.scaleSteps= 10;

    $scope.data = [];
    $scope.chkups = [];
    var url = "http://203.155.165.20/healthbookP2/api/Values"; // + "?callback=JSON_CALLBACK";

    $http.get(url)
        .success(function (data) {
            data.LastVisitDate = data.LastVisitDate.substring(0, 10);
            console.log(data);
            $localstorage.setObject('data', data);
            $scope.data = data;
            $scope.chkups = data.ChkUpInfos;
            $scope.charts = data.ChkLabCompareVms;
            $scope.chkPEs = data.ChkPEVms;
            //alert(JSON.stringify($scope.chkups));
			var arr = data.ChkUpInfos;
			var d = 0;
			$scope.Data = arr[d];
    		$scope.ChkPEs = arr[d].ChkPEs;
    		$scope.ChkSummarys = arr[d].ChkSummarys;
    		$scope.ChkLabs = arr[d].ChkLabs;
    		$scope.ChkXrays = arr[d].ChkXrays;
    		$scope.VitalSigns = arr[d].ChkVitalSigns;
        })
        .error(function (data) {
            alert('error');
        });
    $scope.series = ['Reference','Value'];
    
})

.controller('CheckupCtrl', function ($scope, $http, $stateParams, $localstorage) {
    //alert(JSON.stringify($stateParams));
    var data = $localstorage.getObject('data');
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
                $scope.VitalSigns = arr[d].ChkVitalSigns;
            }
        }
    }

    getById($scope.chkups, $stateParams.RequestNo);
    //alert( JSON.stringify($scope.data) );



})
.controller('CheckupListCtrl', function ($scope, $http, $stateParams, $localstorage) {
    //alert(JSON.stringify($stateParams));
    var data = $localstorage.getObject('data');
    $scope.chkups = data.ChkUpInfos;
    
    //alert( JSON.stringify($scope.data) );



})
.controller('AppointmentListCtrl', function ($scope, $http, $localstorage) {
    var data = $localstorage.getObject('data');
    $scope.appointmentLists = data.AppointmentInfos;
    
})
.controller('AppointmentDtlCtrl', function ($scope, $http, $stateParams, $localstorage) {
    var data = $localstorage.getObject('data');
    var appointInfos = data.AppointmentInfos;
    var id = $stateParams.AppointmentNo;
    for (var i = 0; i <= appointInfos.length; i++) {
        if (id == appointInfos[i].AppointmentNo) {
            $scope.appointmentDetail = appointInfos[i];
            break;
        }
    }
})
.controller('CheckupLabDtlCtrl', function ($scope, $http, $stateParams, $localstorage) {
    var data = $localstorage.getObject('data');
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
})

.controller('CheckupDtlCtrl', function ($scope, $http, $stateParams, $localstorage) {
    
    //alert(JSON.stringify($stateParams));
    var data = $localstorage.getObject('data');
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
})

.controller('AppointmentCtrl', function ($scope, $stateParams) {
    //alert($stateParams);

})

.controller("LineCtrl", function ($scope, $timeout, $localstorage) {
    var data = $localstorage.getObject('data');
            alert('');
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
	$scope.dataset = [
	   {
		   label:"",
		   fillColor: "Red",
		   data: [65, 59, 80, 81, 56, 55, 40]
		},
	   {
		label:"",
		   fillColor: "yellow",
		   data: [15, 89, 30, 61, 56, 95, 40]   
		}
	   ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
	$scope.fillColor = ["Red", "Green"];
    $scope.colours = ["rgb(213,44,44,0.9)"];
    $scope.data2 = [
      [51, 21, 30, 40, 50, 16, 27],
      [65, 59, 80, 81, 56, 55, 40]
    ];
    $scope.someData = {
        labels: [
        'Apr', 
        'May', 
        'Jun'
      ],
      datasets: [
        {
          data: [1, 7, 15, 19, 31, 40]
        },
        {
          data: [6, 12, 18, 24, 30, 36]
        }
      ]
    };

    $scope.someOptions = {
        segementStrokeWidth: 20,
        segmentStrokeColor: '#000'
    };

}).controller('TabsPageController', ['$scope', '$state', function ($scope, $state) { }]);

