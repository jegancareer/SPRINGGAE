App.RollProperty = function($scope){

$scope.initialize = function (prgcount, totalChordCount) {
	//progress bar count and name of progress display
    for (var i=0; i < prgcount; i++) {
        var o={};
        o.index=i;
        o.month=$scope.monthsMap[i % 12];
        o.year=$scope.baseYear + Math.floor(i/12);
        $scope.months.push(o);
    }

    $scope.createVerticalGradient('svg','gradient1',[
        {offset:'0%', 'stop-color':'#00AC6B'},
        {offset: '40%', 'stop-color':'#FFFFFF', 'stop-opacity':'0' },
        {offset: '60%', 'stop-color':'#FFFFFF', 'stop-opacity':'0' },
        {offset:'100%','stop-color':'#9B001C'}]);
	
    $scope.gradientGroup.transition().select("rect").delay($scope.delay*1.5).attr("width",12);
    $scope.dGroup.transition().selectAll("text").delay($scope.delay*1.5).style("font-size","10px");
}

	
var prgrCount=100, totalFetchCount=10, totalPplCount=10, initPrgrCount=0;
var dataJsonObj="resources/d4/data/ustrade_2000-2015.csv";
var htmlcont=  99999999999999+" Joined.";
document.getElementsByClassName("secondLabel")[0].innerHTML=htmlcont
$scope.initialize(prgrCount, totalPplCount);
$scope.fetchData(dataJsonObj, totalFetchCount);

$scope.run = function () {			
	 if(initPrgrCount++ < totalPplCount) {
		 $scope.update(0,initPrgrCount);
	 } else {
		initPrgrCount=0;
		$scope.fetchData(dataJsonObj, totalFetchCount);
	 }
}
}