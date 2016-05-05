myApp.controller('HomeController', function ($scope, $ionicModal, $ionicHistory, $http, $ionicLoading, $timeout, service, $cordovaCamera, $window, $stateParams) {
    $scope.registerData = {
        photo: ""
    };
    $scope.loginData = {};
    //label TH/ENG
    $scope.label = service.getLang();


    //
    if (service.isLogin == true) {
        location.href = "index.html";
    }

    localStorage.setItem('AuthenServiceURL', $stateParams.auth.split('|').join('/'));
    localStorage.setItem('HealthbookServiceURL', $stateParams.hb.split('|').join('/'));


    $scope.goBack = function () {
        $ionicHistory.goBack();
    };
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('views/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalRegister = modal;
    });
    $ionicModal.fromTemplateUrl('views/signin.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalSignin = modal;
    });
    $ionicModal.fromTemplateUrl('views/agreement.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalAgreement = modal;
    });
    $ionicModal.fromTemplateUrl('views/otp.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalOTP = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modalRegister.hide();
    };
    $scope.closeSignin = function () {
        $scope.modalSignin.hide();
    };
    $scope.onRegister = function () {
        $scope.modalRegister.show();
    };
    $scope.onSignin = function () {
        $scope.modalSignin.show();
    };
    $scope.doLogin = function () {
        $ionicLoading.show();
        console.log($scope.loginData);
        var tokenUrl = localStorage.getItem('AuthenServiceURL') + '/token';
        var data = "grant_type=password&username=" +
            $scope.loginData.username + "&password=" + $scope.loginData.password;


        $http.post(tokenUrl, data, {
            headers:
            { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (response) {

            //localStorageService.set('authorizationData', { token: response.access_token, userName: $scope.loginData.userName });

            console.log('success');
            console.log(response.userName);

            var url = localStorage.getItem('AuthenServiceURL') + '/api/requestMember?email=' + response.userName;
            $http.get(url, {
                timeout: 10000
            }).success(function (data) {
                $ionicLoading.hide();
                console.log(data);
                localStorage.setItem('HN', data);
                //$window.location.href = '#/profile';
                $scope.modalSignin.hide();
                $window.location.href = '#/profile';
            }).error(function (data) {
                    $ionicLoading.hide();
                    service.alert($scope.label.badRequest);
                });

            //service.get(url, function (getResult) {
            //    console.log(getResult);
            //    if (getResult.status == "200") {
            //        console.log(getResult.data);
            //        localStorage.setItem('HN', getResult.data);
            //    } else {
            //        console.log('ERROR : '+url);
            //        service.alertURL(getResult.message, 'index.html');
            //    }
            //});

            //$scope.modalSignin.hide();
        }).error(function (data, status) {
            $ionicLoading.hide();
            service.alert($scope.label.badRequest);
            console.log("ERROR");
            console.log(data, status);
        });

    };
    $scope.doAgreement = function () {
        $scope.modalAgreement.hide();
        $scope.modalOTP.show();
        //$scope.modalAgreement.hide();
        //service.isLogin = true;
        //$window.location.href = '#/profile';
    };
    $scope.onOTP = function () {
        $scope.modalAgreement.show();
    };
    $scope.doOTP = function () {
        $scope.modalOTP.hide();
        service.isLogin = true;
        $window.location.href = '#/profile';
    };


    $scope.doRegister = function () {
        var registerUrl = localStorage.getItem('AuthenServiceURL') + '/api/requestMember'
        var data = {};
        $ionicLoading.show();
        console.log($scope.registerData);

        var httpRequest = {
            method: "POST",
            url: registerUrl,
            data: $scope.registerData,
            timeout: 30000
        };
        $http(httpRequest).success(function (data) {
            console.log("success");
            $scope.registerData = {
                photo: ""
            };
            console.log(data);
            $ionicLoading.hide();
            $scope.modalRegister.hide();
        }).error(function (data, status) {
            $ionicLoading.hide();
            service.alert($scope.label.badRequest);
            console.log("ERROR");
            console.log(data, status);
        });
    };



    $scope.onGetPhoto = function () {

        document.addEventListener("deviceready", function () {

            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 240,
                targetHeight: 240,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {

                // var image = document.getElementById('myImage');
                // image.src = "data:image/jpeg;base64," + imageData;
                $scope.registerData.photo = imageData + "";

            }, function (err) {
                //alert(err);
            });

        }, false);
    };






});
