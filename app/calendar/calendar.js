(function($root, ng) {
  ng
    .module("number8.calendar", [])
    .controller("controllerExamCalendar", ['$scope', 'observeOnScope', '$filter', function($scope, observeOnScope, $filter) {
      var vm = this;

      function refresh() {
        var weeks = [],
          week = null;
        var current = vm.startDate.getDate();
        var weekDay = vm.startDate.getDay();
        var lastDay = vm.countDays || new Date(vm.startDate.getFullYear(), vm.startDate.getMonth(), 0).getDate();
        var iterator = current;
        while (iterator <= lastDay) {
          week = [];
          for (var index = 0; index < 7; index++) {
            if ((weekDay <= index || weeks.length !== 0) && iterator <= lastDay) {
              var _date = new Date(vm.startDate.getFullYear(), vm.startDate.getMonth(), iterator)
              week.push({
                isEmpty: false,
                day: index,
                date: _date,
                dayNumber: iterator,
                isHolydate: getHoliday(_date)
              });
              iterator++;
            } else {
              week.push({
                isEmpty: true
              })
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
     
      vm.isHolyday = function(day) {
        return getHoliday(day);
      }

      function getPublics(element) {
        
        for (var index = 0; index < element.length; index++) {
          var item = element[index];
          if (item.public) return true;
        }
        return false;
      }

      function getHoliday(date) {
        if (vm.holidays && date) {
          var tdate = $filter('date')(date, 'yyyy-MM-dd')
          for (var key in vm.holidays) {
            if (vm.holidays.hasOwnProperty(key)) {
              var element = vm.holidays[key];
              var names = getPublics(element)
              if (key === tdate && names) return names;
            }
          }
        }
      }

    }])
    .component("number8Calendar", {
      templateUrl: "app/calendar/calendar.html",
      controller: "controllerExamCalendar",
      bindings: {
        startDate: "=",
        countDays: "=",
        holidays:"="
      }
    });
})(window, angular);