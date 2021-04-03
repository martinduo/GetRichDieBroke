
// **********************************
// * Copyright 1998 by Bruce Martin *
// *      All rights reserved		*
// **********************************

function getLegend(StartIndex, MaxIndex, Title, Headings, HeadingColors) {
    //gets legend for the chart bar graph only
	"use strict";
	var WindowHTML = [];
	var bordersize = 1;
	var idName = "chartLegend";
	var className = "charts-legend";
	var tableWidth = ChartWidth; //a legend is wanted for the chart - ChartWidth is global
	var arrayStart = 1; //only chart legend is wanted, skip the years heading
	WindowHTML.push('<div class = "Row chartLegend">');

    //WindowHTML.push(getGridBorderStart(bordersize, tableWidth, className, idName));
	WindowHTML.push('<table id="' + idName + '" class="' + className + '" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="' + bordersize + '" style="width:' + tableWidth + 'px">\n');

	WindowHTML.push(getLegendTable(Headings, HeadingColors, arrayStart));

	//WindowHTML.push(getGridBorderEnd());
	WindowHTML.push('</table>\n');

	WindowHTML.push('</div>');
	//var testir = WindowHTML.join(' ');
	return WindowHTML.join(' ');
}

////Dummy for design test
//function getDataTables() { //gets the css3 table divs for the chart's data table
//    var WindowHTML = []; 
//    WindowHTML.push(containerTableTag); //outer wrapper DIV
//    WindowHTML.push('<div class = "Row chartTitle">'); //1st row wrapper DIV
//    WindowHTML.push(getGridHeader.apply(this, arguments)); //call getGridHeader() passing whole argument array
//    WindowHTML.push('</div>'); //1st row wrapper DIV
//    WindowHTML.push('<div class = "Row chartLegend">'); //2nd row wrapper DIV

//    WindowHTML.push('</div>'); //2nd row wrapper DIV
//    WindowHTML.push('<div class = "Row chartTable">'); //3rd row wrapper DIV

//    WindowHTML.push('</div>'); //3rd row wrapper DIV
//    WindowHTML.push('</div>'); //outer wrapper DIV
//    var testir = WindowHTML.join(' ');
//    return WindowHTML;
//}

//function getGridHeader(StartIndex, MaxIndex, Title, Headings, HeadingColors) { //gets header for the data grid table
//	 Title is grid title
//	 There should be one column's head title and color for every subsequent (unnamed) function argument.
//	var WindowHTML = [];  //this is transformed with the data grid
//	var titleHeight = 30; //top part of the -ms-grid layout for the header
//	var className = "grid-header-title";
//	var tableWidth = $("#chartDataTables").width(); //change the width specification
//	var arrayStart = 0; //use all headings including "Year"
//	var legendOnly = true; //build whole data grid to establish column widths, but just use the legend part
//	WindowHTML.push('<table class="grid-header-title" border="1" cellspacing="0" cellpadding="0" style="height:' + titleHeight + 'px; width:' + tableWidth + 'px">\n');
//	WindowHTML.push('<table class="grid-header-title" cellspacing="0" cellpadding="0">\n');
//	WindowHTML.push('<tr><td colspan="5" style="vertical-align:middle">\n');
//	WindowHTML.push(getTitleText(Title, true));
//	WindowHTML.push("</td></tr>\n");
//	WindowHTML.push('</table>\n');
//	//Title = null; //do this hack to add a special signal to the call to getGrid() without having to change the argument array
//	//legendTable = getGrid.apply(this, arguments); //call getGrid() passing whole argument array
//	//WindowHTML.push(legendTable);
//	var testir = WindowHTML.join(' ');
//	return WindowHTML.join(' ');
//}

function getGrid(StartIndex, MaxIndex, Title, Headings, HeadingColors) {
	// "use strict" NOTE: can not access arguments property with "use strict" in force;
	// Each unnamed function argument is an array of numbers.
	// Each array should be of equal length.
	// If only the legend is wanted, legendOnly=true.
	// In all cases, the legend is built along with the data grid table to obtain correct column widths.
	// Depending on the value of legendOnly, appropriate rows are collapsed so as to be hidden.
	// This gives us two final objects for different DOM placement whose columns align perfectly.

	var ReqArgs = 5; // the number of named arguments
	var dataIncluded = getGrid.arguments.length > ReqArgs ? true : false;
	var WindowHTML = [];
	//var tableWidth;
	var arrayStart;
	//var containerTableTag = '<div class="containerTable">';

	//This is now the master function to build all three css3 table row divs for the chart's data table 2/16/2014

	WindowHTML.push('<div class="containerTable">'); //outer wrapper DIV
    WindowHTML.push('<div class="chartLegendScrollLock"></div>'); //position:absolute, overlays title and cloned table to prevent scrolling

	WindowHTML.push('<div class = "chartTitle">'); //1st row wrapper DIV
	WindowHTML.push('<table class="grid-header-title" cellspacing="0" cellpadding="0">\n');
	WindowHTML.push('<tr><td colspan="5" style="vertical-align:middle">\n');
	WindowHTML.push(getTitleText(Title, true));
	WindowHTML.push("</td></tr>\n");
	WindowHTML.push('</table>\n');
	//WindowHTML.push(getGridHeader(StartIndex, MaxIndex, Title, Headings, HeadingColors)); //calls getGridHeader() to get Title only
	WindowHTML.push('</div>'); //1st row wrapper DIV
	WindowHTML.push('<div class = "chartLegend">'); //2nd row wrapper DIV
	WindowHTML.push('<table class="chartDataColumnHeaders" cellspacing="0" cellpadding="0">\n');
	WindowHTML.push('<thead><tr><th>first</th><th>second</th><th>third</th><th>fourth</th><th>fifth</th></tr></thead>\n');
	WindowHTML.push('</table>\n');
	WindowHTML.push('</div>'); //2nd row wrapper DIV

	WindowHTML.push('<div class = "chartTable">'); //3rd row wrapper DIV
	WindowHTML.push('<div class = "chartTableSection">'); //TableSection wrapper DIV with overflow-y = auto
	WindowHTML.push('<div class = "chartTableScroller">'); //TableScroller wrapper DIV holding all the data tables
	//override chart span to show all years for each grid
	StartIndex = HouseObject.startworth;
	MaxIndex = HouseObject.showworth;
	//var testTableWidth = "" + $("#table-data-cell").width(); //This does not work as inline style in HTML5. Change the width specification
	arrayStart = 0; //include all headings

	////here we build the legend table, together with the data grid to obtain correct column widths
	//if (!Title) { //sorry about this hack, but this is the signal to show that I only want the legend
	//	WindowHTML.push('<table class="chartDataColumnHeader" cellspacing="0" cellpadding="0" style="height:50px; width:' + tableWidth + 'px">\n');
	//	WindowHTML.push(getLegendTable(Headings, HeadingColors, tableWidth, arrayStart, false)); //build legend to remain
	//	//gridRowClass = "rowCollapse"; // remining body of grid table is hidden
	//} else {
	//	WindowHTML.push('<table class="chartDataColumnRows" cellspacing="0" cellpadding="0">\n');
	//	//WindowHTML.push(getLegendTable(Headings, HeadingColors, tableWidth, arrayStart, true)); //build legend to collapse
	//	WindowHTML.push(getLegendTable(Headings, HeadingColors, tableWidth, arrayStart, false)); //build legend to remain, it will be cloned and moved later
	//	//gridRowClass = "rowNormal"; // body of grid table remains
	//}

	//here we build the data grid with its top legend row to obtain correct column widths
	WindowHTML.push('<table class="chartDataColumnRows" cellspacing="0" cellpadding="0">\n');
    WindowHTML.push('<thead>');
	WindowHTML.push(getLegendTable(Headings, HeadingColors, arrayStart)); //build legend, it will be cloned and moved later
	WindowHTML.push('</thead>');

    WindowHTML.push('<tbody>');
	for (i = StartIndex; i < MaxIndex; i++) { //usable range of array of numbers, one for each year
		WindowHTML.push('<tr>\n');
		// first array numbers are years, don't format as currency
		WindowHTML.push('<td class="dataYear">' + getGrid.arguments[ReqArgs][i] + '</td>\n'); //years
		// susequent array numbers are dollars, format as currency
		for (j = ReqArgs + 1; j < getGrid.arguments.length; j++) {
		    WindowHTML.push('<td>' + formatTableCurrency(getGrid.arguments[j][i]) + '</td>\n'); //dollars
		    //WindowHTML.push('<td>' + formatCurrency(getGrid.arguments[j][i]) + '</td>\n'); //dollars
		}
		WindowHTML.push('</tr>\n');
	}
	WindowHTML.push('</tbody>');
	WindowHTML.push('</table>\n');
	WindowHTML.push('</div>'); //TableScroller wrapper DIV
	WindowHTML.push('</div>'); //TableSection wrapper DIV
	WindowHTML.push('</div>'); //3rd row wrapper DIV
	WindowHTML.push('</div>'); //outer wrapper DIV
	var testir = WindowHTML.join(' ');
	return WindowHTML.join(' ');
}

function getLegendTable(Headings, HeadingColors, arrayStart) {
	// Headings is a comma separated string of column head titles.
	// HeadingColors is a comma separated string of background colors for the column head titles.
	var Heads = Headings.split(",");
	var WindowHTML = [];
	//WindowHTML.push('<thead>');
	if (arrayStart === 0) { //legend is for the money data grid, includes "year" as first td element
	    WindowHTML.push('<tr class="legendCloneSource">\n');

	    //WindowHTML.push('<td style="width:50px"  bgcolor="' + HeadingColors[0] + '">' + Heads[0] + '</td>\n'); //years
	    //WindowHTML.push('<td bgcolor="' + HeadingColors[0] + '">' + Heads[0] + '</td>\n'); //years
	    //arrayStart = 1;

	    for (i = arrayStart; i < Heads.length; i++) { //legend is for the chart graph
	        WindowHTML.push('<td bgcolor="' + HeadingColors[i] + '">' + Heads[i].charAt(0)  + '</td>\n'); //get the legend for the chart graph
	        //WindowHTML.push('<td bgcolor="' + HeadingColors[i] + '">' + '</td>\n'); //get the legend for the chart graph
	    }

	} else { //legend is for the bar chart, does not include "year", and is not cloned
	    WindowHTML.push('<tr>\n');
	    for (i = arrayStart; i < Heads.length; i++) { //legend is for the chart graph
	        WindowHTML.push('<td bgcolor="' + HeadingColors[i] + '">' + Heads[i] + '</td>\n'); //get the legend for the chart graph
	    }
    }
	WindowHTML.push('</tr>\n');
	//WindowHTML.push('</thead>');
	var testir = WindowHTML.join(' ');
	return WindowHTML.join(' ');
}

//function getGridBorderStart(bordersize, tableWidth, className, idName) {
//	"use strict";
//	var WindowHTML = '<table id="' + idName + '" class="' + className + '" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="' + bordersize + '" style="width:' + tableWidth + 'px">\n';
//	return WindowHTML
//}
//function getGridBorderEnd() {
//	"use strict";
//	var WindowHTML = '</table>\n';
//	return WindowHTML
//}

////This is not used due to cross browser incompatibilty
//function getColorsWithAlpha(alpha, colorArray) {
//	"use strict";
//	//modify an array of hex color values to rgb including the alpha channel value
//	var newArray = [];
//	var length = colorArray.length;
//	for (var i = 0; i < length; i++) {
//		var R = hexToR(colorArray[i]);
//		var G = hexToG(colorArray[i]);
//		var B = hexToB(colorArray[i]);
//		var color = "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
//		newArray.push(color);
//	}
//	return newArray;
//}
//function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
//function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
//function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
//function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }
