myApp.controller('ProfileController', function($scope, $http, $ionicLoading, service, $ionicModal) {
    Chart.defaults.global.scaleBeginAtZero = true;
    Chart.defaults.Line.bezierCurve = false;
    Chart.defaults.Line.pointDot = false;
    Chart.defaults.Line.datasetFill = false;
    Chart.defaults.global.animation = false;
    //Chart.defaults.global.scaleOverride = true;
    //Chart.defaults.global.scaleSteps= 10;
    $scope.series = ['Reference', 'Value'];
    $scope.colors = [0, 4];

    service.isLogin = true;
    console.log(service.selectLang);
    //label TH/ENG
    $scope.label = service.getLang();

    $ionicModal.fromTemplateUrl('views/profileDetail.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalProfile = modal;
    });
    $scope.onProfile = function() {
        console.log(service.selectLang);
        //label TH/ENG
        $scope.label = service.getLang();
        $scope.modalProfile.show();
    };
    $scope.closeProfile = function() {
        $scope.modalProfile.hide();
    };

    var setData = function(data) {
        data.LastVisitDate = data.LastVisitDate.substring(0, 10);
        console.log(data);

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
        var x = 53 + d;
                var y = 22.06 + 0.42 * d;
                $scope.VitalSigns = {weight:x,bmi:y,temp:36.5,bp:135-d,pulse:59,rr:20};
    }


    $scope.label = service.getLang();
    $scope.data = [];
    $scope.chkups = [];

    service.loadNow = false;

    var healthbookServiceURL = localStorage.getItem('HealthbookServiceURL')+'?hn=' + localStorage.getItem('HN');

    console.log(healthbookServiceURL);

    service.get(healthbookServiceURL, function (getResult) {
        if (getResult.status == "200") {
            localStorage.setItem('data', JSON.stringify(getResult.data));
            setData(getResult.data);
        } else {
            service.alertURL(getResult.message, 'index.html');
        }
    });


    $scope.onSlideMove = function(data) {
        //alert("You have selected " + data.index + " tab");
    };
});
