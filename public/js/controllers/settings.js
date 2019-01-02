emptyApp.controller("settings", function($http, $scope, $rootScope) {

    $rootScope.login_status = false;
    // $scope.login_status = false;
    $scope.pwd_confirm = false;
    $scope.login = function() {
        if ($scope.pwd_confirm === false) {
            $http({

                method:"POST",
                url:"api/login",
                data: {
        
                    password:$scope.password,
        
                }
        
            }).then(function successCallBack(response) {
        
                Materialize.toast("로그인 성공", 2000);
                // $scope.loadSeats();
                $scope.pwd_confirm = false;
                $rootScope.login_status = true;
        
            }, function errorCallBack(response) {
        
                if (response.data) {
        
                    Materialize.toast(response.data, 2300);
        
                }
        
                console.log("로그인 에러", response);
    
                if (response.status === 403) {
                    Materialize.toast("Fill the password confirmation to create new password", 2300);
                    $scope.pwd_confirm = true;
                }
        
            });
        } else {
            if ($scope.password === $scope.password_confirmation) {
                $http({

                    method:"POST",
                    url:"api/signup",
                    data: {
            
                        password:$scope.password,
            
                    }
            
                }).then(function successCallBack(response) {
            
                    Materialize.toast("비밀번호 생성 완료", 2000);
                    // $scope.loadSeats();
                    $scope.pwd_confirm = false;
                    $rootScope.login_status = true;
            
                }, function errorCallBack(response) {
            
                    if (response.data) {
            
                        Materialize.toast(response.data, 2300);
            
                    }
            
                    console.log("로그인 에러", response);
            
                });
            } else {
                Materialize.toast("비밀번호가 다릅니다.", 2300);
            }
            
        }
        
    }

    $scope.loginClick = function() {
        $scope.login_clicked = true;
    }

});