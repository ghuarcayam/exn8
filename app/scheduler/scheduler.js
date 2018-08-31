(function($root, ng) {
  ng
    .module("number8.calendar")
    .controller("controllerScheduler", ['$scope', 'dataCalendar', '$filter', 'observeOnScope', '$scope', 
      function($scope, dataCalendar, $filter, observeOnScope, $scope) {
      
      var vm = this;
      observeOnScope($scope, '$ctrl.n8Model')
        .subscribe(function(change){
          if (!change.newValue) return;
          dataCalendar
          .generateWithHolydays
              (change.newValue.startDate, change.newValue.countDays, change.newValue.codeCountry)
          .then(function(data){
            vm.months = data;
          })
        });

    }])
    .component("number8Scheduler", {
      templateUrl: "app/scheduler/scheduler.html",
      controller: "controllerScheduler",
      bindings: {
        n8Model: "="
      }
    });
})(window, angular);