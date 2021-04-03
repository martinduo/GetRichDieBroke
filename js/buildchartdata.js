var currentCarouselPane; //zero based index for chart graph pages
//var currentHeaderId; //zero based index for chart data table headers
var currentTableId; //zero based index for chart data tables
var hashBarHeightTable = {}; //for saving the logarithmic bar height from the bar value


function showAssociatedTable(next_carousel_pane) { //carousel_pane is zero based index
	"use strict"
	var nextHeaderId = "header-" + next_carousel_pane
	var nextTableId = "table-" + next_carousel_pane
	if (currentTableId !== nextTableId) {
	//if (currentHeaderId !== nextHeaderId) {
		//$("#" + currentHeaderId).addClass("display-none");
		$("#" + currentTableId).addClass("display-none");
		//$("#" + nextHeaderId).removeClass("display-none");
		$("#" + nextTableId).removeClass("display-none");
		//currentHeaderId = nextHeaderId;
		currentTableId = nextTableId;
	}
	//return
	//var nextHeaderId = "header-" + next_carousel_pane
	//var nextTableId = "table-" + next_carousel_pane
	////console.log("nextTableId = " + nextTableId);
	//if (currentHeaderId !== nextHeaderId) {
	//    animateTheHeaderFadeSwitch(currentHeaderId, nextHeaderId);
	//    currentHeaderId = nextHeaderId;
	//}
	//if (currentTableId !== nextTableId) {
	//    animateTheFadeSwitch(currentTableId, nextTableId);
	//    currentTableId = nextTableId;
	//}
}


function showAssociatedCircle(next_carousel_pane) { //carousel_pane is zero based index
	"use strict"
	var nextChartId = "#chart" + (next_carousel_pane)
	$(".charts-pagination-active").addClass("display-none");
	$(nextChartId).removeClass("display-none");
	currentCarouselPane = next_carousel_pane;
}

function buildCharts() { //build the charts html
	"use strict"
	var chartIndex; //index is zero based
	var chartCount;
	$(".panel").addClass("display-none"); //hide chart panels until charts are built
	showPanels = true; //set switch to display built charts
	ChartWidth = $("#charts-graph-cell").width() - 2; //use instanciated DOM value minus width of border of container DIV
	$("#carousel").width(ChartWidth);//set desired width to work with the Win8 app code
	$("#panel-scroller").width(ChartWidth);//set desired width to work with the Win8 app code
	writeHTML(1); //do first pass to measure chart's sizes
	chartIndex = writeHTML(2); //do 2nd pass to build panes of charts and data tables for showing results
	chartCount = 1 + chartIndex;
	buildPaginationCircles(chartCount); //build one circle for each carousel pane built
	//these are initialized later  //$("#chart0").removeClass("display-none"); //activate first circle; panes are zero based
    //these are initialized later  //$("#table-0").removeClass("display-none"); //activate first data grid; panes are zero based
	Calculating = false;
	//showPanels = false; //only needs to be handled once for each page load
	doCalculation = false; //until user changes data
	return chartCount;
}

function showSelectedChart(e) {
	"use strict"
	var id = e.target.id;
	var next_carousel_pane = id.substring(5); //skip over id prefix
	e.preventDefault();
	if (currentCarouselPane !== next_carousel_pane) {
		//console.log("next_carousel_pane=" + next_carousel_pane);
		myCarousel.showPane(next_carousel_pane);
		currentCarouselPane = next_carousel_pane;
	}
}

function buildPaginationCircles(x) {
	"use strict"
	var html, testText = "", node;
	//var theWidth = "" + (x * 20) + "px";
	//$("#pagination").attr("width", theWidth);
	node = $("#pagination");
	html = addPaginationCircles(x)
	//var testHtml = html.join(' '); //for inspection of complete html 
	//MSApp.execUnsafeLocalFunction(function () { node.append(html.join(' ')); }); //Win8 App fix //node.append(html);
	MYAppInsertHTML(node, html.join(' '));
	Hammer(".pagination-center-span").on("tap", showSelectedChart); //delegate to handle event on pagination circles
}

function addPaginationCircles(x) {
	"use strict"
	var html = [];
	var ref = x;
	var divWidth = "" + (x + x * 30);
	html.push('<div style="width:' + divWidth + 'px;" class="pagination-center-span">\n');
	for (var i = 0; i < x; i++) {
		ref -= 1; //carousel_pane is a zero based index, count down to zero
		html.push('<div id="xxxxx' + ref + '" class="charts-pagination-target ">\n');
		html.push('<div id="yyyyy' + ref + '" class="charts-pagination-circle ">\n');
		html.push('<div id="chart' + ref + '" class="charts-pagination-active display-none">\n');
		html.push('</div>\n'); //close white
		html.push('</div>\n'); //close dark
		html.push('</div>\n'); //close chart
	}
	html.push('</div>\n');
	return html;
}

//function buildTables() { //build the tables html
//    "use strict"
//    buildFakeTable("table-0", 10);
//    buildFakeTable("table-1", 11);
//    buildFakeTable("table-2", 12);
//    buildFakeTable("table-3", 13);
//    buildFakeTable("table-4", 14);
//    buildFakeTable("table-5", 15);
//    buildFakeTable("table-6", 16);
//    buildFakeTable("table-7", 17);
//    buildFakeTable("table-8", 18);
//    buildFakeTable("table-9", 19);
//    $("#table-0").removeClass("display-none");
//}

//function buildFakeTable(id, x) {
//    "use strict"
//    var html, testText = "", node;
//    var xx = x || 11;
//    $("#" + id).addClass("display-none");
//    node = $("#" + id);
//    html = addFakeTables(xx);
//    var testHtml = html.join(''); //for inspection of complete html 
//    MSApp.execUnsafeLocalFunction(function () { node.append(html.join('')); }); //Win8 App fix //node.append(html);
//}

//function addFakeTables(x) {
//    "use strict"
//    var html = [];
//    for (var i = 0; i < x; i++) {
//        //var ref = x;
//        html.push('<table style="width: 100%" border="2">\n');
//        html.push('<tr>\n');
//        html.push('<td style="width: 50%">\n');
//        html.push('<p>' + "Cell " + (i * 2 + x) + '</p>\n');
//        html.push('</td>\n');
//        html.push('<td style="width: 50%">\n');
//        html.push('<p>' + "Cell " + (i * 2 + 1 + x) + '</p>\n');
//        html.push('</td>\n');
//        html.push('</tr>\n');
//        html.push('</table>\n');
//    }
//    return html;
//}

var filledHTML = false;
var snappedHTML = false;
var currentHTML;

function writeLogoHTML(targetId, logoId, ERatio, title, row1Height, row2Height, logoWidth, graphOnly, legendOnly) {
	"use strict";
	var node = $("#" + targetId);
	//if (targetId === "filled") {
	//    if (!filledHTML) {
	//        filledHTML = buildLogoHTML(targetId, logoId, ERatio, title, row1Height, row2Height, logoWidth, graphOnly, legendOnly);
	//    }
	//    currentHTML = filledHTML;
	//} else if (targetId === "snapped") {
	//    if (!snappedHTML) {
	//        snappedHTML = buildLogoHTML(targetId, logoId, ERatio, title, row1Height, row2Height, logoWidth, graphOnly, legendOnly);
	//    }
	//    currentHTML = snappedHTML;
	//}
	currentHTML = buildLogoHTML(targetId, logoId, ERatio, title, row1Height, row2Height, logoWidth, graphOnly, legendOnly);
	MYAppInsertHTML(node, currentHTML);
	//var theHTML = chartHTML.join(' '); //test
	//var row1h = $(".row1").height();
	//var row2h = $(".row2").height();
	$(".row1").height(row1Height); //adjust chart graph table
	$(".row2").height(row2Height); //adjust chart graph table
}

function buildLogoHTML(targetId, logoId, ERatio, title, row1Height, row2Height, logoWidth, graphOnly, legendOnly) {
	"use strict";
	//Note: "Year" and "silver7" are skipped over when building chart graph, but are included for compatibility
	//var saveChartWidth = ChartWidth; //this hack added at project end instead of doing code redesign
	var logoHeadings = "Year,Starting<br>Balance,Year End<br>Deposits,Year End<br>Earnings,Paid For<br>Taxes,Paid For<br>Retirement"
	var logoColors = [silver7, fuchsia7, yellow7, aqua7, red7, lime7];
	var StartIndex = 0;
	var MaxIndex = 20;
	var chartHTML = [];
	var xaxisyears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; //not used
	var worthstartbalance = [7000, 13060, 19605, 26673, 34307, 42552, 51456, 61072, 71458, 82675, 94789, 88372, 81161, 73089, 64079, 54051, 42918, 30585, 16950, 1903];
	var worthdepositss = [5500, 5500, 5500, 5500, 5500, 5500, 5500, 5500, 5500, 5500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var worthearnings = [700, 1306, 1960, 2667, 3431, 4255, 5146, 6107, 7146, 8267, 9479, 8837, 8116, 7309, 6408, 5405, 4292, 3059, 1695, 190];
	//var worthtaxes = [140, 261, 392, 533, 686, 851, 1029, 1221, 1429, 1653, 1896, 1767, 1623, 1462, 1282, 1081, 858, 612, 339, 38];
	var worthtaxes = [252, 470, 705, 960, 1235, 1531, 1852, 2198, 2572, 2976, 3412, 3181, 2921, 2631, 2306, 1945, 1545, 1101, 610, 68];
	//var worthtaxes = [448, 835, 1254, 1707, 2195, 2723, 3293, 3908, 4573, 5291, 6066, 5655, 5194, 4677, 4101, 3459, 2746, 1957, 1084, 121];
	var worthspent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14000, 14280, 14566, 14857, 15154, 15457, 15766, 16082, 16403, 16731];
	var AboveLineCount = 3; //number of arrays with prices to combine into one bar's positive extent
	ChartWidth = logoWidth; //this is the width of the logo, not the cash flow charts which are created later
	ExcursionRatio = ERatio; //initialize the global to override normal calculation
	AboveLineCount = 3;
	chartHTML = [];
	chartHTML.push('<div id="logoId" class="logoContainer">');
	if (graphOnly) {
		chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, title, logoHeadings, logoColors, xaxisyears, worthstartbalance, worthdepositss, worthearnings, worthtaxes, worthspent));
	}
	if (legendOnly) {
		chartHTML.push(getLegend(StartIndex, MaxIndex, title, logoHeadings, logoColors, xaxisyears, worthstartbalance, worthdepositss, worthearnings, worthtaxes, worthspent));
	}
	chartHTML.push('</div>');
	var theHTML = chartHTML.join(' ');
	//ChartWidth = saveChartWidth; //restore the global value
	return theHTML;
}

function buildLegendRow(node) {
    var $sourceTable, $targetTable, legendTableHtml
    $sourceTable = node.find('.chartDataColumnRows')
    $targetTable = node.find('.chartDataColumnHeaders');
    legendTableHtml = $sourceTable.clone();
    MYAppInsertHTML($targetTable, legendTableHtml);
    $sourceTable.find('.legendCloneSource').remove();

    //$sourceTable.find('.legendCloneSource').css('height', '5px');
    //$sourceTable.find('.legendCloneSource').addClass('rowLow');
    //$sourceTable.find('.legendCloneSource').remove();

    //$targetTable.find('tr').addClass('rowCollapse')
    //$targetTable.find('tr:first').removeClass('rowCollapse')

    //$('.chartLegend').append('<div class="chartLegendScrollLock"></div>');
    //$legendTable.find('tbody').remove();

    //var $table, $legendRowsource, $legendRowTarget, legendRowHtml;
    //$table = $("#" + currentTableId);
    //$legendRowsource = $table.find('.legendCloneSource');
    //$legendRowTarget = $table.find('.chartLegend tr');
    //legendRowHtml = $legendRowsource.clone();
    //$legendRowTarget.html(legendRowHtml);
    //$legendRowsource.find('td').each(function (i) {
    //    //$legendRowTarget.find('td').eq(i).width($(this).width());
    //    var xx = $legendRowTarget.find('td').eq(i);
    //    var yy = ($(this).width());
    //});
    //var zz = $table.width();
    //var firstColumnWidth1 = $table.find("td:first").innerWidth();
    //var firstColumnWidth2 = $table.find("td:first").width();
    ////$legendRowsource.remove();
}

function writeHTML(pass) {
	"use strict";
	//this function is called for two passes: 
	//1st pass calculates all the bar sizes, 
	//and figures the adjustment needed so largest graphs fit.
	//2nd pass then builds the html using the adjusted sizes to scale all graphs.
	var node;
	var fastplot = false;
	var AboveLineCount; //number of arrays with prices to combine into one bar's positive extent
	var chartHTML = [];
	var headerHTML = [];
	var tableHTML = [];
	var chartCount = 0;
	//var row1Height; //for chart tables
	//var row2Height; //for chart tables
	var StartIndex;
	var MaxIndex;
	var containerGraphTag = '<div class="Grid containerGraph" style="width:' + ChartWidth + 'px">';
	ExcursionRatio = null; //initialize the global
	maxAboveLineHeight = 0; //initialize global
	maxBelowLineHeight = 0; //initialize global

	if (pass === 1) { //first pass to get the chart table sizes
		hashBarHeightTable = {}; //initialize global to store height values
	}

	if (HouseObject.showworth >= 0) {
		var ChartTitle = networthTitle;
		chartCount = 0; //carousel_pane is zero based index
		AboveLineCount = 2;
		StartIndex = HouseObject.startworth; //HouseObject.startworth, HouseObject.showworth
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the bar chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, ChartTitle, NetWorthHeadings, NetWorthColors, HouseObject.xaxisyears, HouseObject.worthstartbalance, HouseObject.worthearnings, HouseObject.worthtaxes, HouseObject.worthspent)
		} else { //2nd pass to create the bar chart html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, ChartTitle, NetWorthHeadings, NetWorthColors, HouseObject.xaxisyears, HouseObject.worthstartbalance, HouseObject.worthearnings, HouseObject.worthtaxes, HouseObject.worthspent));
			chartHTML.push(getLegend(HouseObject.startworth, HouseObject.showworth, networthTitle, NetWorthHeadings, NetWorthColors, HouseObject.xaxisyears, HouseObject.worthstartbalance, HouseObject.worthearnings, HouseObject.worthtaxes, HouseObject.worthspent));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(HouseObject.startworth, HouseObject.showworth, networthTitle, NetWorthGridHeadings, NetWorthColors, HouseObject.xaxisyears, HouseObject.worthstartbalance, HouseObject.worthearnings, HouseObject.worthtaxes, HouseObject.worthspent));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(HouseObject.startworth, HouseObject.showworth, networthTitle, NetWorthGridHeadings, NetWorthColors, HouseObject.xaxisyears, HouseObject.worthstartbalance, HouseObject.worthearnings, HouseObject.worthtaxes, HouseObject.worthspent));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	//var theHTML = chartHTML.join(' '); //testing
	//return chartCount; //testing

	if (HouseObject.shownormal >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 3;
		StartIndex = HouseObject.startworth; //HouseObject.startnormal, HouseObject.shownormal
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, taxnormalTitle, NormalAccountHeadings, NormalAccountColors, HouseObject.xaxisyears, HouseObject.normalstartbalance, HouseObject.normaldeposits, HouseObject.normalearnings, HouseObject.normaltaxes, HouseObject.normalspent)
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, taxnormalTitle, NormalAccountHeadings, NormalAccountColors, HouseObject.xaxisyears, HouseObject.normalstartbalance, HouseObject.normaldeposits, HouseObject.normalearnings, HouseObject.normaltaxes, HouseObject.normalspent));
			chartHTML.push(getLegend(HouseObject.startnormal, HouseObject.shownormal, taxnormalTitle, NormalAccountHeadings, NormalAccountColors, HouseObject.xaxisyears, HouseObject.normalstartbalance, HouseObject.normaldeposits, HouseObject.normalearnings, HouseObject.normaltaxes, HouseObject.normalspent));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(HouseObject.startnormal, HouseObject.shownormal, taxnormalTitle, NormalAccountGridHeadings, NormalAccountColors, HouseObject.xaxisyears, HouseObject.normalstartbalance, HouseObject.normaldeposits, HouseObject.normalearnings, HouseObject.normaltaxes, HouseObject.normalspent));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(HouseObject.startnormal, HouseObject.shownormal, taxnormalTitle, NormalAccountGridHeadings, NormalAccountColors, HouseObject.xaxisyears, HouseObject.normalstartbalance, HouseObject.normaldeposits, HouseObject.normalearnings, HouseObject.normaltaxes, HouseObject.normalspent));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (YouObject.show401 >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 3;
		StartIndex = HouseObject.startworth; //YouObject.start401, YouObject.show401
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, You401Title, x401Headings, x401Colors, HouseObject.xaxisyears, YouObject.x401startbalance, YouObject.x401deposits, YouObject.x401earnings);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, You401Title, x401Headings, x401Colors, HouseObject.xaxisyears, YouObject.x401startbalance, YouObject.x401deposits, YouObject.x401earnings));
			chartHTML.push(getLegend(YouObject.start401, YouObject.show401, You401Title, x401Headings, x401Colors, HouseObject.xaxisyears, YouObject.x401startbalance, YouObject.x401deposits, YouObject.x401earnings));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(YouObject.start401, YouObject.show401, You401Title, x401GridHeadings, x401Colors, HouseObject.xaxisyears, YouObject.x401startbalance, YouObject.x401deposits, YouObject.x401earnings));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(YouObject.start401, YouObject.show401, You401Title, x401GridHeadings, x401Colors, HouseObject.xaxisyears, YouObject.x401startbalance, YouObject.x401deposits, YouObject.x401earnings));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (getSpouseData && SpouseObject.show401 >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 3;
		StartIndex = HouseObject.startworth; //SpouseObject.start401, SpouseObject.show401
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, Spouse401Title, x401Headings, x401Colors, HouseObject.xaxisyears, SpouseObject.x401startbalance, SpouseObject.x401deposits, SpouseObject.x401earnings);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, Spouse401Title, x401Headings, x401Colors, HouseObject.xaxisyears, SpouseObject.x401startbalance, SpouseObject.x401deposits, SpouseObject.x401earnings));
			chartHTML.push(getLegend(SpouseObject.start401, SpouseObject.show401, Spouse401Title, x401Headings, x401Colors, HouseObject.xaxisyears, SpouseObject.x401startbalance, SpouseObject.x401deposits, SpouseObject.x401earnings));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(SpouseObject.start401, SpouseObject.show401, Spouse401Title, x401GridHeadings, x401Colors, HouseObject.xaxisyears, SpouseObject.x401startbalance, SpouseObject.x401deposits, SpouseObject.x401earnings));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(SpouseObject.start401, SpouseObject.show401, Spouse401Title, x401GridHeadings, x401Colors, HouseObject.xaxisyears, SpouseObject.x401startbalance, SpouseObject.x401deposits, SpouseObject.x401earnings));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (YouObject.showira >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 3;
		StartIndex = HouseObject.startworth; //YouObject.startira, YouObject.showira
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, YouIRATitle, IRAHeadings, IRAColors, HouseObject.xaxisyears, YouObject.irastartbalance, YouObject.iradeposits, YouObject.iraearnings, YouObject.irataxes, YouObject.iraspent, YouObject.irasaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, YouIRATitle, IRAHeadings, IRAColors, HouseObject.xaxisyears, YouObject.irastartbalance, YouObject.iradeposits, YouObject.iraearnings, YouObject.irataxes, YouObject.iraspent, YouObject.irasaved));
			chartHTML.push(getLegend(YouObject.startira, YouObject.showira, YouIRATitle, IRAHeadings, IRAColors, HouseObject.xaxisyears, YouObject.irastartbalance, YouObject.iradeposits, YouObject.iraearnings, YouObject.irataxes, YouObject.iraspent, YouObject.irasaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(YouObject.startira, YouObject.showira, YouIRATitle, IRAGridHeadings, IRAColors, HouseObject.xaxisyears, YouObject.irastartbalance, YouObject.iradeposits, YouObject.iraearnings, YouObject.irataxes, YouObject.iraspent, YouObject.irasaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(YouObject.startira, YouObject.showira, YouIRATitle, IRAGridHeadings, IRAColors, HouseObject.xaxisyears, YouObject.irastartbalance, YouObject.iradeposits, YouObject.iraearnings, YouObject.irataxes, YouObject.iraspent, YouObject.irasaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (getSpouseData && SpouseObject.showira >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 3;
		StartIndex = HouseObject.startworth; //SpouseObject.startira, SpouseObject.showira
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, SpouseIRATitle, IRAHeadings, IRAColors, HouseObject.xaxisyears, SpouseObject.irastartbalance, SpouseObject.iradeposits, SpouseObject.iraearnings, SpouseObject.irataxes, SpouseObject.iraspent, SpouseObject.irasaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, SpouseIRATitle, IRAHeadings, IRAColors, HouseObject.xaxisyears, SpouseObject.irastartbalance, SpouseObject.iradeposits, SpouseObject.iraearnings, SpouseObject.irataxes, SpouseObject.iraspent, SpouseObject.irasaved));
			chartHTML.push(getLegend(SpouseObject.startira, SpouseObject.showira, SpouseIRATitle, IRAHeadings, IRAColors, HouseObject.xaxisyears, SpouseObject.irastartbalance, SpouseObject.iradeposits, SpouseObject.iraearnings, SpouseObject.irataxes, SpouseObject.iraspent, SpouseObject.irasaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(SpouseObject.startira, SpouseObject.showira, SpouseIRATitle, IRAGridHeadings, IRAColors, HouseObject.xaxisyears, SpouseObject.irastartbalance, SpouseObject.iradeposits, SpouseObject.iraearnings, SpouseObject.irataxes, SpouseObject.iraspent, SpouseObject.irasaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(SpouseObject.startira, SpouseObject.showira, SpouseIRATitle, IRAGridHeadings, IRAColors, HouseObject.xaxisyears, SpouseObject.irastartbalance, SpouseObject.iradeposits, SpouseObject.iraearnings, SpouseObject.irataxes, SpouseObject.iraspent, SpouseObject.irasaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (YouObject.showroth >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 3;
		StartIndex = HouseObject.startworth; //YouObject.startroth, YouObject.showroth
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, YouRothTitle, RothHeadings, RothColors, HouseObject.xaxisyears, YouObject.rothstartbalance, YouObject.rothdeposits, YouObject.rothearnings, YouObject.rothtaxes, YouObject.rothspent);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, YouRothTitle, RothHeadings, RothColors, HouseObject.xaxisyears, YouObject.rothstartbalance, YouObject.rothdeposits, YouObject.rothearnings, YouObject.rothtaxes, YouObject.rothspent));
			chartHTML.push(getLegend(YouObject.startroth, YouObject.showroth, YouRothTitle, RothHeadings, RothColors, HouseObject.xaxisyears, YouObject.rothstartbalance, YouObject.rothdeposits, YouObject.rothearnings, YouObject.rothtaxes, YouObject.rothspent));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(YouObject.startroth, YouObject.showroth, YouRothTitle, RothGridHeadings, RothColors, HouseObject.xaxisyears, YouObject.rothstartbalance, YouObject.rothdeposits, YouObject.rothearnings, YouObject.rothtaxes, YouObject.rothspent));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(YouObject.startroth, YouObject.showroth, YouRothTitle, RothGridHeadings, RothColors, HouseObject.xaxisyears, YouObject.rothstartbalance, YouObject.rothdeposits, YouObject.rothearnings, YouObject.rothtaxes, YouObject.rothspent));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (getSpouseData && SpouseObject.showroth >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 3;
		StartIndex = HouseObject.startworth; //SpouseObject.startroth, SpouseObject.showroth
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, SpouseRothTitle, RothHeadings, RothColors, HouseObject.xaxisyears, SpouseObject.rothstartbalance, SpouseObject.rothdeposits, SpouseObject.rothearnings, SpouseObject.rothtaxes, SpouseObject.rothspent);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, SpouseRothTitle, RothHeadings, RothColors, HouseObject.xaxisyears, SpouseObject.rothstartbalance, SpouseObject.rothdeposits, SpouseObject.rothearnings, SpouseObject.rothtaxes, SpouseObject.rothspent));
			chartHTML.push(getLegend(SpouseObject.startroth, SpouseObject.showroth, SpouseRothTitle, RothHeadings, RothColors, HouseObject.xaxisyears, SpouseObject.rothstartbalance, SpouseObject.rothdeposits, SpouseObject.rothearnings, SpouseObject.rothtaxes, SpouseObject.rothspent));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(SpouseObject.startroth, SpouseObject.showroth, SpouseRothTitle, RothGridHeadings, RothColors, HouseObject.xaxisyears, SpouseObject.rothstartbalance, SpouseObject.rothdeposits, SpouseObject.rothearnings, SpouseObject.rothtaxes, SpouseObject.rothspent));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(SpouseObject.startroth, SpouseObject.showroth, SpouseRothTitle, RothGridHeadings, RothColors, HouseObject.xaxisyears, SpouseObject.rothstartbalance, SpouseObject.rothdeposits, SpouseObject.rothearnings, SpouseObject.rothtaxes, SpouseObject.rothspent));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (YouObject.showincome >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //YouObject.startincome, YouObject.showincome
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, YouIncomeTitle, IncomeHeadings, IncomeColors, HouseObject.xaxisyears, YouObject.retireincome, YouObject.retiretaxes, YouObject.retirespent, YouObject.retiresaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, YouIncomeTitle, IncomeHeadings, IncomeColors, HouseObject.xaxisyears, YouObject.retireincome, YouObject.retiretaxes, YouObject.retirespent, YouObject.retiresaved));
			chartHTML.push(getLegend(YouObject.startincome, YouObject.showincome, YouIncomeTitle, IncomeHeadings, IncomeColors, HouseObject.xaxisyears, YouObject.retireincome, YouObject.retiretaxes, YouObject.retirespent, YouObject.retiresaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(YouObject.startincome, YouObject.showincome, YouIncomeTitle, IncomeGridHeadings, IncomeColors, HouseObject.xaxisyears, YouObject.retireincome, YouObject.retiretaxes, YouObject.retirespent, YouObject.retiresaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(YouObject.startincome, YouObject.showincome, YouIncomeTitle, IncomeGridHeadings, IncomeColors, HouseObject.xaxisyears, YouObject.retireincome, YouObject.retiretaxes, YouObject.retirespent, YouObject.retiresaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (getSpouseData && SpouseObject.showincome >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //SpouseObject.startincome, SpouseObject.showincome
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, SpouseIncomeTitle, IncomeHeadings, IncomeColors, HouseObject.xaxisyears, SpouseObject.retireincome, SpouseObject.retiretaxes, SpouseObject.retirespent, SpouseObject.retiresaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, SpouseIncomeTitle, IncomeHeadings, IncomeColors, HouseObject.xaxisyears, SpouseObject.retireincome, SpouseObject.retiretaxes, SpouseObject.retirespent, SpouseObject.retiresaved));
			chartHTML.push(getLegend(SpouseObject.startincome, SpouseObject.showincome, SpouseIncomeTitle, IncomeHeadings, IncomeColors, HouseObject.xaxisyears, SpouseObject.retireincome, SpouseObject.retiretaxes, SpouseObject.retirespent, SpouseObject.retiresaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(SpouseObject.startincome, SpouseObject.showincome, SpouseIncomeTitle, IncomeGridHeadings, IncomeColors, HouseObject.xaxisyears, SpouseObject.retireincome, SpouseObject.retiretaxes, SpouseObject.retirespent, SpouseObject.retiresaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(SpouseObject.startincome, SpouseObject.showincome, SpouseIncomeTitle, IncomeGridHeadings, IncomeColors, HouseObject.xaxisyears, SpouseObject.retireincome, SpouseObject.retiretaxes, SpouseObject.retirespent, SpouseObject.retiresaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (YouObject.showpension >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //YouObject.startpension, YouObject.showpension
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, YouPensionTitle, PensionHeadings, PensionColors, HouseObject.xaxisyears, YouObject.pensionincome, YouObject.pensiontaxes, YouObject.pensionspent, YouObject.pensionsaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, YouPensionTitle, PensionHeadings, PensionColors, HouseObject.xaxisyears, YouObject.pensionincome, YouObject.pensiontaxes, YouObject.pensionspent, YouObject.pensionsaved));
			chartHTML.push(getLegend(YouObject.startpension, YouObject.showpension, YouPensionTitle, PensionHeadings, PensionColors, HouseObject.xaxisyears, YouObject.pensionincome, YouObject.pensiontaxes, YouObject.pensionspent, YouObject.pensionsaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(YouObject.startpension, YouObject.showpension, YouPensionTitle, PensionGridHeadings, PensionColors, HouseObject.xaxisyears, YouObject.pensionincome, YouObject.pensiontaxes, YouObject.pensionspent, YouObject.pensionsaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(YouObject.startpension, YouObject.showpension, YouPensionTitle, PensionGridHeadings, PensionColors, HouseObject.xaxisyears, YouObject.pensionincome, YouObject.pensiontaxes, YouObject.pensionspent, YouObject.pensionsaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (getSpouseData && SpouseObject.showpension >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //SpouseObject.startpension, SpouseObject.showpension
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, SpousePensionTitle, PensionHeadings, PensionColors, HouseObject.xaxisyears, SpouseObject.pensionincome, SpouseObject.pensiontaxes, SpouseObject.pensionspent, SpouseObject.pensionsaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, SpousePensionTitle, PensionHeadings, PensionColors, HouseObject.xaxisyears, SpouseObject.pensionincome, SpouseObject.pensiontaxes, SpouseObject.pensionspent, SpouseObject.pensionsaved));
			chartHTML.push(getLegend(SpouseObject.startpension, SpouseObject.showpension, SpousePensionTitle, PensionHeadings, PensionColors, HouseObject.xaxisyears, SpouseObject.pensionincome, SpouseObject.pensiontaxes, SpouseObject.pensionspent, SpouseObject.pensionsaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(SpouseObject.startpension, SpouseObject.showpension, SpousePensionTitle, PensionGridHeadings, PensionColors, HouseObject.xaxisyears, SpouseObject.pensionincome, SpouseObject.pensiontaxes, SpouseObject.pensionspent, SpouseObject.pensionsaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(SpouseObject.startpension, SpouseObject.showpension, SpousePensionTitle, PensionGridHeadings, PensionColors, HouseObject.xaxisyears, SpouseObject.pensionincome, SpouseObject.pensiontaxes, SpouseObject.pensionspent, SpouseObject.pensionsaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (YouObject.showannuity >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //YouObject.startannuity, YouObject.showannuity
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, YouAnnuityTitle, AnnuityHeadings, AnnuityColors, HouseObject.xaxisyears, YouObject.annuityincome, YouObject.annuitytaxes, YouObject.annuityspent, YouObject.annuitysaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, YouAnnuityTitle, AnnuityHeadings, AnnuityColors, HouseObject.xaxisyears, YouObject.annuityincome, YouObject.annuitytaxes, YouObject.annuityspent, YouObject.annuitysaved));
			chartHTML.push(getLegend(YouObject.startannuity, YouObject.showannuity, YouAnnuityTitle, AnnuityHeadings, AnnuityColors, HouseObject.xaxisyears, YouObject.annuityincome, YouObject.annuitytaxes, YouObject.annuityspent, YouObject.annuitysaved));
			//chartHTML.push(WindowHTML += getLegend(YouObject.startannuity, YouObject.showannuity, YouAnnuityTitle, AnnuityHeadings, AnnuityColors, HouseObject.xaxisyears, YouObject.annuityincome, YouObject.annuitytaxes, YouObject.annuityspent, YouObject.annuitysaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(YouObject.startannuity, YouObject.showannuity, YouAnnuityTitle, AnnuityGridHeadings, AnnuityColors, HouseObject.xaxisyears, YouObject.annuityincome, YouObject.annuitytaxes, YouObject.annuityspent, YouObject.annuitysaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(YouObject.startannuity, YouObject.showannuity, YouAnnuityTitle, AnnuityGridHeadings, AnnuityColors, HouseObject.xaxisyears, YouObject.annuityincome, YouObject.annuitytaxes, YouObject.annuityspent, YouObject.annuitysaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (getSpouseData && SpouseObject.showannuity >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //SpouseObject.startannuity, SpouseObject.showannuity
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, SpouseAnnuityTitle, AnnuityHeadings, AnnuityColors, HouseObject.xaxisyears, SpouseObject.annuityincome, SpouseObject.annuitytaxes, SpouseObject.annuityspent, SpouseObject.annuitysaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, SpouseAnnuityTitle, AnnuityHeadings, AnnuityColors, HouseObject.xaxisyears, SpouseObject.annuityincome, SpouseObject.annuitytaxes, SpouseObject.annuityspent, SpouseObject.annuitysaved));
			chartHTML.push(getLegend(SpouseObject.startannuity, SpouseObject.showannuity, SpouseAnnuityTitle, AnnuityHeadings, AnnuityColors, HouseObject.xaxisyears, SpouseObject.annuityincome, SpouseObject.annuitytaxes, SpouseObject.annuityspent, SpouseObject.annuitysaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(SpouseObject.startannuity, SpouseObject.showannuity, SpouseAnnuityTitle, AnnuityGridHeadings, AnnuityColors, HouseObject.xaxisyears, SpouseObject.annuityincome, SpouseObject.annuitytaxes, SpouseObject.annuityspent, SpouseObject.annuitysaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(SpouseObject.startannuity, SpouseObject.showannuity, SpouseAnnuityTitle, AnnuityGridHeadings, AnnuityColors, HouseObject.xaxisyears, SpouseObject.annuityincome, SpouseObject.annuitytaxes, SpouseObject.annuityspent, SpouseObject.annuitysaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (YouObject.showss >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //YouObject.startss, YouObject.showss
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, YouSSTitle, SSHeadings, SSColors, HouseObject.xaxisyears, YouObject.ssincome, YouObject.sstaxes, YouObject.ssspent, YouObject.sssaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, YouSSTitle, SSHeadings, SSColors, HouseObject.xaxisyears, YouObject.ssincome, YouObject.sstaxes, YouObject.ssspent, YouObject.sssaved));
			chartHTML.push(getLegend(YouObject.startss, YouObject.showss, YouSSTitle, SSHeadings, SSColors, HouseObject.xaxisyears, YouObject.ssincome, YouObject.sstaxes, YouObject.ssspent, YouObject.sssaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(YouObject.startss, YouObject.showss, YouSSTitle, SSGridHeadings, SSColors, HouseObject.xaxisyears, YouObject.ssincome, YouObject.sstaxes, YouObject.ssspent, YouObject.sssaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(YouObject.startss, YouObject.showss, YouSSTitle, SSGridHeadings, SSColors, HouseObject.xaxisyears, YouObject.ssincome, YouObject.sstaxes, YouObject.ssspent, YouObject.sssaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}

	if (getSpouseData && SpouseObject.showss >= 0 && !fastplot) {
		chartCount += 1;
		AboveLineCount = 1;
		StartIndex = HouseObject.startworth; //SpouseObject.startss, SpouseObject.showss
		MaxIndex = HouseObject.showworth; //show span over all years for each chart
		if (pass === 1) { //first pass to get the chart table sizes
			measureChart(AboveLineCount, StartIndex, MaxIndex, SpouseSSTitle, SSHeadings, SSColors, HouseObject.xaxisyears, SpouseObject.ssincome, SpouseObject.sstaxes, SpouseObject.ssspent, SpouseObject.sssaved);
		} else { //2nd pass to create the html
			chartHTML = [];
			chartHTML.push(containerGraphTag);
			chartHTML.push(getChart(AboveLineCount, StartIndex, MaxIndex, SpouseSSTitle, SSHeadings, SSColors, HouseObject.xaxisyears, SpouseObject.ssincome, SpouseObject.sstaxes, SpouseObject.ssspent, SpouseObject.sssaved));
			chartHTML.push(getLegend(SpouseObject.startss, SpouseObject.showss, SpouseSSTitle, SSHeadings, SSColors, HouseObject.xaxisyears, SpouseObject.ssincome, SpouseObject.sstaxes, SpouseObject.ssspent, SpouseObject.sssaved));
			chartHTML.push('</div>');
			node = $("#chart-" + chartCount);
			if (showPanels) node.removeClass("display-none"); //show the DIVs with user data
			MYAppInsertHTML(node, chartHTML.join(' '));

			//headerHTML = [];
			//headerHTML.push(getGridHeader(SpouseObject.startss, SpouseObject.showss, SpouseSSTitle, SSGridHeadings, SSColors, HouseObject.xaxisyears, SpouseObject.ssincome, SpouseObject.sstaxes, SpouseObject.ssspent, SpouseObject.sssaved));
			//node = $("#header-" + chartCount);
			//MYAppInsertHTML(node, headerHTML.join(' '));

			tableHTML = [];
			tableHTML.push(getGrid(SpouseObject.startss, SpouseObject.showss, SpouseSSTitle, SSGridHeadings, SSColors, HouseObject.xaxisyears, SpouseObject.ssincome, SpouseObject.sstaxes, SpouseObject.ssspent, SpouseObject.sssaved));
			node = $("#table-" + chartCount);
			MYAppInsertHTML(node, tableHTML.join(' '));
			buildLegendRow(node);
        }
	}


	//determine the final adjustment value for chart table
	if (pass === 1) { //1st pass to measure bar sizes
		var carouselHeight = $("#charts-graph-cell").height(); //height of the panning pane
		var currentHeight = maxAboveLineHeight + maxBelowLineHeight; //chart height as built in first pass
		var graphSpace = carouselHeight - 100 - 20; //subtract the hard coded title height and legend height and margins
		barAdjustment = roundNumber(graphSpace / currentHeight, 2); //update global for second pass
		//maxAboveLineHeight = 0; //update global for second pass
		//maxBelowLineHeight = 0; //update global for second pass
	}

	if (pass === 2) { //2nd pass to get html chart tables
		$(".row1").height(maxAboveLineHeight); //adjust all the chart graph tables
		$(".row2").height(maxBelowLineHeight); //adjust all the chart graph tables
	}

	return chartCount;


	//Testing final table size adjustment
	var carouselHeight = $("#charts-graph-cell").height(); //height of the panning pane
	var currentHeight = maxAboveLineHeight + maxBelowLineHeight; //chart height as built
	var graphSpace = carouselHeight - 100 - 20; //subtract the hard coded title height and legend height and margins
	var adjustmentFactor = graphSpace / currentHeight;
	adjustmentFactor = 0.5; //********TEST TEST TEST
	//adjustmentFactor =1; //********TEST TEST TEST

	//$(".row1").height(maxAboveLineHeight * adjustmentFactor); //adjust all the chart graph tables
	//$(".row2").height(maxBelowLineHeight * adjustmentFactor); //adjust all the chart graph tables
	//$(".bar1").height(function (index, barHeight) { return (barHeight * adjustmentFactor); });
	//$(".bar2").height(function (index, barHeight) { return (barHeight * adjustmentFactor); });

	//var basepos = $(".bar2").offset();
	//var baseY; //reset this because moving to different chart pane changes this value
	var priorTop; //save for use in determining new top value of next bar block
	var priorBottom; //save for use in determining new top value of next bar block

	$(".bar1").offset(function (index, curLoc) {
		var sib = $(this).attr("childPos"); //sibling number of bar's child block
		var top = curLoc.top;
		var height1 = $(this).height()
		var height2 = adjustmentFactor * height1;
		$(this).height(height2);
		if (sib === "0") { //initialize the priorTop value using the first block of the bar's group
			priorTop = top + height1; //first priorTop is bottom of first block
			console.log("Bar1: 1stTop=" + top + ", priorTop=" + priorTop + ", height1=" + height1 + ", height2=" + height2);
		}
		var newTop = top + priorTop - top - height2; //distance from priorTop is adjusted for new height
		console.log("Bar1: newTop=" + newTop + ", top=" + top + ", priorTop=" + priorTop + ", height1=" + height1 + ", height2=" + height2);
		priorTop = newTop; //save for next bar block
		return {
			left: curLoc.left,
			top: newTop,
		};
	});

	$(".bar2").offset(function (index, curLoc) {
		var sib = $(this).attr("childPos"); //sibling number of bar's child block
		var top = curLoc.top;
		var height1 = $(this).height()
		var height2 = adjustmentFactor * height1;
		$(this).height(height2);
		if (sib === "0") { //initialize the base Y value using the first block of the bar's group
			priorBottom = top; //first priorBottom is top of first block
			console.log("Bar2: 1stTop=" + top + ", priorBottom=" + priorBottom + ", height1=" + height1 + ", height2=" + height2);
		}
		var newTop = priorBottom; //distance from base is adjusted for new top
		console.log("Bar2: newTop=" + newTop + ", top=" + top + ", priorBottom=" + priorBottom + ", height1=" + height1 + ", height2=" + height2);
		priorBottom = newTop + height2; //save for next bar block
		return {
			left: curLoc.left,
			top: newTop,
		};
	});

	return chartCount;
}

//var verDif = curPos.top - baseY; //distance from base line to bar's top
//var newTop = curPos.top - (verDif * (1 - adjustmentFactor) * pos);
//var year = $(this).attr("barYear"); //year of child bar - testing
//if (year === "2054" && pos === "1") { //-testing
//    year = "2054"; //break point - testing
//} //-testing
