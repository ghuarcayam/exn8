(function($root, ng) {
  ng.
  module("number8.calendar")
    .controller("controllerPageExam", [function() {
      var vm = this;
      vm.changeOption = function($inputs){
        vm.n8Model = $inputs;
      }
    }])
    .component("number8Page", {
      templateUrl: "app/page/inputpage.html",
      controller: "controllerPageExam"
    })
})(window, angular)