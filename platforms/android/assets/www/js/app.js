// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('healthBook', ['ionic', 'ngCordova', 'healthBook.controllers', 'healthBook.services', 'chart.js'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        if (window.plugins && window.plugins.AdMob) {

            var admob_key = device.platform == "Android" ? "ca-app-pub-5403362234362062/1540516624" : "ca-app-pub-5403362234362062/7888101420";
            var admob = window.plugins.AdMob;
            admob.createBannerView({
                    'publisherId': admob_key,
                    'adSize': admob.AD_SIZE.BANNER,
                    'bannerAtTop': false
                },
                function() {
                    admob.requestAd({
                            'isTesting': false
                        },
                        function() {
                            admob.showAd(true);
                        },
                        function() {
                            console.log('failed to request ad');
                        }
                    );
                },
                function() {
                    console.log('failed to create banner view');
                }
            );

        } else {
            console.log("Cannot show Admobs. Have you installed the Plugin? Is this a Web Browser?");
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        new RegExp('^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(vimeo|youtube|soundcloud|mixcloud)\.com(/.*)?$'),
        'self'
    ]);
    $stateProvider

  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
  })

.state('app.checkuplist', {
    url: "/checkuplist",
    views: {
        'menuContent': {
            templateUrl: "templates/checkuplist.html",
            controller: 'CheckupListCtrl'
        }
    }
})
  
  .state('app.checkup', {
        url: "/checkups/:RequestNo",
        views: {
            'menuContent': {
                templateUrl: "templates/checkups.html",
                controller: 'CheckupCtrl'
            }
        }
    })
        .state('app.checkupdetail', {
            url: "/checkupdetails/:RequestNo",
            views: {
                'menuContent': {
                    templateUrl: "templates/checkupdetail.html",
                    controller: 'CheckupDtlCtrl'
                }
            }
        })
        
        .state('app.appointmentlist', {
            url: "/appointmentlist",
            views: {
                'menuContent': {
                    templateUrl: "templates/appointmentlist.html",
                    controller: 'AppointmentListCtrl'
                }
            }
        })
    

    .state('app.appointment', {
        url: "/appointments/:AppointmentNo",
        views: {
            'menuContent': {
                templateUrl: "templates/appointment.html",
                controller: 'AppointmentDtlCtrl'
            }
        }
    })

    .state('app.checkuplabdetail', {
        url: "/checkuplabdetails/:Order",
        views: {
            'menuContent': {
                templateUrl: "templates/checkuplabdetail.html",
                controller: 'CheckupLabDtlCtrl'
            }
        }
    })
  
    .state('app.main', {
      url: '/main',
      views: {
          'menuContent': {
           templateUrl: 'templates/main.html',
           controller: 'MainCtrl'
            }
        }
    })

    .state('app.chart', {
        url: '/chart',
        views: {
            'menuContent': {
                templateUrl: 'templates/chart.html',
                controller: 'LineCtrl'
            }
        }
    })
    // if none of the above states are matched, use this as the fallback
    
    $urlRouterProvider.otherwise('/app/main');
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    })
})

.run(function($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: 'Loading HTTP Content'
        })
    })

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    })
})
