(function($root, ng) {
  ng
    .module("number8.calendar", [])
    .controller("controllerExamCalendar", ['$scope', 'observeOnScope', '$filter', function($scope, observeOnScope, $filter) {
      var vm = this;

      function refresh() {
        var weeks = [],
          week = null;
        
        var weekDay = vm.startDate.getDay();
        var lastDay = vm.countDays || new Date(vm.startDate.getFullYear(), vm.startDate.getMonth(), 1).getDate();
        var iterator = 1;
        while (iterator <= lastDay) {
          week = [];
          for (var index = 0; index < 7; index++) {
            if ((weekDay <= index || weeks.length !== 0) && iterator <= lastDay) {
              var _date = new Date(vm.startDate.getFullYear(), vm.startDate.getMonth(), iterator)
              week.push({
                isEmpty: false,
                day: index,
                
              });
              
            } 

          }
          weeks.push(week);
        }

        vm.weeks = weeks;
      }
      observeOnScope($scope, "$ctrl.startDate")
      .subscribe(function(change){
        refresh();
      });
     

    }])
    .component("number8Calendar", {
      templateUrl: "app/calendar/calendar.html",
      controller: "controllerExamCalendar",
      bindings: {
        startDate: "=",
        countDays: "=",
      }
    });
})(window, angular);