myApp.controller('SettingController', function($scope, $ionicModal, $http, $ionicLoading, $timeout, service, $ionicHistory, $window, $state) {
    //label TH/ENG
    $scope.label = service.getLang();
    $scope.isLogin = service.isLogin;
    console.log(service.isLogin);
    $scope.languageList = [{
        text: "ไทย",
        value: "TH"
    }, {
        text: "English",
        value: "ENG"
    }];
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
    $scope.onSignout = function() {
        service.isLogin = false;
        //$state.transitionTo('home');
        $window.location.href = 'index.html';
        //$ionicHistory.clearHistory();
    };
    $scope.data = {
        selectLang: service.selectLang
    };

    $scope.languageChange = function(item) {
        service.selectLang = item.value;
        service.loadNow = true;
        //label TH/ENG
        $scope.label = service.getLang();
        console.log(item.text, "value:", item.value);
    };
});
