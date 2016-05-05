// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic', 'ngCordova', 'chart.js'])

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .service('service', function($ionicPopup, $ionicLoading, $http) {
        var serviceURL = '';
        var that = this;
        that.loadNow = true;
        that.isLogin = false;
        //default language
        that.selectLang = "ENG";
        that.labelTH = {
            firstName: "ชื่อ",
            lastName: "นามสกุล",
            userName: "ชื่อผู้ใช้",
            passWord: "รหัสผ่าน",
            idenNo: "เลขที่บัตรประชาชน",
            age: "อายุ",
            email: "อีเมล์",
            phoneNo: "เบอร์โทรศัพท์",
            HN: "HN",
            photo: "รูปภาพ",
            signin: "เข้าสู่ระบบ",
            send: "ส่ง",
            register: "   สมัคร",
            setting: "ตั้งค่า",
            language: "ภาษา",
            alert: "แจ้งเตือน",
            badRequest: 'ข้อมูลไม่ถูกต้อง',
            lastdate:"ครั้งล่าสุด"
        };
        that.labelENG = {
            firstName: "Name",
            lastName: "Last Name",
            userName: "Username",
            passWord: "Password",
            age: "Age",
            idenNo: "ID CARD No.",
            email: "E-mail",
            phoneNo: "Tel.",
            HN: "HN",
            photo: "Photo",
            signin: "Sign in",
            send: "Send",
            register: "Register",
            setting: "Settings",
            language: "Language",
            alert: "Alert",
            badRequest: 'Data is Invalid.',
            lastdate:"Last Date"
        };
        that.getLang = function() {

            if (that.selectLang == "TH") {
                return that.labelTH;
            } else {
                return that.labelENG;
            }
        };
        that.alert = function(text) {
            var alertPopup = $ionicPopup.alert({
                title: that.getLang().alert,
                template: '' + text + ''
            });
            alertPopup.then(function(res) {
                //console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
        that.alertURL = function(text, url) {
            var alertPopup = $ionicPopup.alert({
                title: that.getLang().alert,
                template: '' + text + ''
            });
            alertPopup.then(function(res) {
                location.href = url;
            });
        };
        that.get = function(serviceName, fnCallback) {
            $ionicLoading.show();
            var resultData = [];
            var resultStatus = false;
            $http.get(serviceURL + serviceName, {
                    timeout: 10000
                })
                .success(function(data) {
                    $ionicLoading.hide();
                    if (angular.isObject(data)) {
                        fnCallback({
                            status: "200",
                            message: "OK",
                            data: data
                        });
                    } else {
                        fnCallback({
                            status: "204",
                            message: "Request failed.",
                            data: null
                        });
                    }
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    fnCallback({
                        status: "000",
                        message: "Connection failed.",
                        data: null
                    });
                });
        };
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom'); // other values: top
        $stateProvider
            .state('home', {
                url: '/home/:auth/:hb',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .state('hospitalList', {
                url: '/hospitalList',
                templateUrl: 'views/hospitalList.html',
                controller: 'HospitalListController'
            })
            .state('setting', {
                url: '/setting',
                templateUrl: 'views/setting.html',
                controller: 'SettingController'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller: 'ProfileController'
            })
            .state('history', {
                url: '/history',
                templateUrl: 'views/history.html',
                controller: 'HistoryController'
            })
            .state('historyDetail', {
                url: '/historyDetail/:RequestNo',
                templateUrl: 'views/historyDetail.html',
                controller: 'HistoryDetailController'
            })
            .state('labDetail', {
                url: '/labDetail/:Order',
                templateUrl: 'views/labDetail.html',
                controller: 'LabDetailController'
            })
            .state('xrayDetail', {
                url: '/xrayDetail/:RequestNo',
                templateUrl: 'views/xrayDetail.html',
                controller: 'XrayDetailController'
            })
            .state('appointmentList', {
                url: '/appointmentList',
                templateUrl: 'views/appointmentList.html',
                controller: 'AppointmentListController'
            })
            .state('appointmentDetail', {
                url: '/appointmentDetail/:AppointmentNo',
                templateUrl: 'views/appointmentDetail.html',
                controller: 'AppointmentDetailController'
            });
        $urlRouterProvider.otherwise('/hospitalList');
    });
