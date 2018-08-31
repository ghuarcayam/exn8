(function($root, ng, _) {
  ng.module("number8.calendar", [])
    .factory('calendarService', ['$http', '$q', '$cacheFactory', function($http, $q, $cacheFactory) {
      var cache = $cacheFactory('cacheHoliday');

      function get(country) {
        var defer = $q.defer();
        $http.get("app/services/holidays/"+ country + "/2017.json")
          .then(function(response) {
            defer.resolve(response.data.holidays);
          }, function(e) {
            defer.reject(e);
          });
        return defer.promise;
      }
      return {
        getFromCache: function(country) {
          if (cache.get('holidays' + country)) {
            return $q.resolve(cache.get('holidays' + country));
          } else {
            var p = get(country);
            p.then(function(holidays) {
              cache.put('holidays' + country, holidays);
            })
            return p;
          }
        },
        get: get
      }
    }]).
    service("dataCalendar", ['calendarService','$q', 'rx', function(calendarService,$q,rx){
      function generate(startDate, countDays, holidays){
        if (!startDate) return [];
        var months = [];
        var sdate = new Date(startDate.valueOf());
        var endDate = new Date(sdate.valueOf());
        endDate.setDate(sdate.getDate() + (countDays || 0));
        var cm = ((endDate.getFullYear() - sdate.getFullYear()) * 12) - (sdate.getMonth()) + (endDate.getMonth());
        for (var index = 0; index < cm; index++) {
          var nm = new Date(sdate.valueOf());
          nm.setMonth(sdate.getMonth() + index);
          var mth = (nm.getMonth()+1).toString()
          mth =  mth.length ==1 ? "0" + mth : mth;
          months.push(
            { 
              startDate: new Date(nm.getFullYear(), nm.getMonth(), 1), 
              countDays: new Date(nm.getFullYear(), nm.getMonth(), 0).getDate() ,
              holidays: _.pickBy(holidays, function(v, k){ return k.startsWith(nm.getFullYear() + '-' + mth ) })
            });
        }
        months[0].startDate = sdate;
        months[months.length - 1].countDays = endDate.getDate();
        return months;
      }
      
      

      this.generate = generate;
      }]);
})(window, angular, _);