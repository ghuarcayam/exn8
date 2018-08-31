(function($root, ng) {
    ng.
    module("number8.calendar")
      .controller("controllerInputOptions", [function() {
        var vm = this;
        vm.change=function(){
            vm.onChange({
                $inputs: {
                    startDate : vm.startDate,
                    countDays: vm.countDays,
                    codeCountry: vm.country
                }
            })
        }
      }])
      .component("number8InputOptions", {
        templateUrl: "app/page/inputOptions.html",
        controller: "controllerInputOptions",
        bindings : {
            onChange : "&"
        }
      })
  })(window, angular)