App.RollData = function($scope)
{
	$scope.fetchData= function(dataJsonObj, fetchMax) {

    d3.csv($scope.fireDataJsonObj, function(csv) {

        var normalized=[];
		if (fetchMax>csv.length) {
			fetchMax=csv.length;
		}
        for (var i=0; i < fetchMax; i++)  {
            var row=csv[i];

            for (var y=1; y < 13; y++) {
                var newRow={};
                newRow.Year=row.year;
                newRow.Country=row.CTYNAME;
                newRow.Month=(y < 10) ? "0" + String(y) : String(y);
                newRow.Imports=Number(row["I_" + String(y)]);
                normalized.push(newRow);
            }
        }

        $scope.countriesGrouped = d3.nest()
            .key(function(d) { return d.Year; })
            .key(function(d) { return d.Month; })
            .entries(normalized);

        //Sum total deficit for each month
        var totalImport=0;

        for (var y=0; y < $scope.countriesGrouped.length; y++) {
            var yearGroup=$scope.countriesGrouped[y];
            for (var m=0; m < yearGroup.values.length; m++) {
                var monthGroup=yearGroup.values[m];
                for (var c=0; c < monthGroup.values.length; c++) {
                    var country=monthGroup.values[c];
                    totalImport= Number(totalImport) + Number(country.Imports)*10000000;
                }
                $scope.monthlyImports.push(totalImport);
            }
        }
	//Start refreshing Chart
      $scope.run();
    refreshIntervalId = setInterval($scope.run, $scope.delay);
    });
	}
}
