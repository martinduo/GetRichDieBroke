
// **********************************
// * Copyright 1998 by Bruce Martin *
// *      All rights reserved		*

// **********************************

var BarWidth;
var ChartWidth; //price bar charts
var DataTableWidth = 300; //price data table
var ExcursionRatio;

//var FirstTopIndexLinkWritten;
//var BarPaddingImage;
//var BorderedColor = "#90EE90"; //lightgreen
//var unBorderedColor = "#ffffe0"; //lightyellow "#F5DEB3" //wheat
//var clearImage = new Image();
//var fuchsiaImage = new Image();
//var yellowImage = new Image();
//var aquaImage = new Image();
//var redImage = new Image();
//var limeImage = new Image();
//var silverImage = new Image();
//var blueImage = new Image(); // used for default

//clearImage.src = "images/dotclear.gif"
//fuchsiaImage.src = "images/dotfuchsia.gif"
//yellowImage.src = "images/dotyellow.gif"
//aquaImage.src = "images/dotaqua.gif"
//redImage.src = "images/dotred.gif"
//limeImage.src = "images/dotlime.gif"
//silverImage.src = "images/dotsilver.gif"
//blueImage.src = "images/dotblue.gif"  // used for default

var BarAdjustment; //used to adjust final table size
//the below global values are initialized in caller for use in measureChart()
var maxAboveLineHeight = 0; //used to adjust final table size
var maxBelowLineHeight = 0; //used to adjust final table size
var thisAboveLineHeight = 0; //used to adjust final table size
var thisBelowLineHeight = 0; //used to adjust final table size

function measureChart(AboveLineCount, StartIndex, MaxIndex, Title, BarNames, Colors) {
	//this is a preliminary run to measure all the bars and determine the final adjustment value
	var ReqArgs = 6 // the number of named arguments
	var ArgsArray = measureChart.arguments;
	var ArgsLength = measureChart.arguments.length;
	var Excursion = 0, MaxExcursion = 0;
	var ExcursionPar = 3000000
	//var ExcursionPar = 1500000
	var FirstBarIndex = ReqArgs + 1 // skip over the array of year valuess
	var BarValue;
	barAdjustment = 1; //initial barAdjustment value 
	// determine the maximum excursion from bottom to top of this chart's bars
	// for each year in the array of yearly numbers
	for (var i = StartIndex; i < MaxIndex; i++) { //usable range of years
		if (i === 45) {
			i = 45;
		}
		Excursion = 0;
		// for each bar with this year's data
		for (j = FirstBarIndex; j < ArgsLength; j++) { // for each array, we will get this year's value
			BarValue = ArgsArray[j][i]
			if (typeof (BarValue) != "string") Excursion += BarValue // not last row with comment
		}
		MaxExcursion = MaxExcursion > Excursion ? MaxExcursion : Excursion
	}
	if (!ExcursionRatio) { ExcursionRatio = ExcursionPar / MaxExcursion }; 
	//topMargin = (graphSpace - MaxExcursion) / 2;

	//maxAboveLineHeight = 0; //initialize for this bar's value segments
	// for each year in each array of yearly numbers
	for (var i = StartIndex; i < MaxIndex; i++) { //usable range of years
		thisAboveLineHeight = 0; //initialize for this bar's value segments
		for (j = FirstBarIndex; j < FirstBarIndex + AboveLineCount; j++) { // for each array above the line, get this year's data
			BarValue = ArgsArray[j][i];
			if (BarValue > 0) {
				blockHeight = getBarBlockHeight(BarValue); //first pass height
				thisAboveLineHeight += blockHeight;
			}
		}
		if (thisAboveLineHeight > 0) {
			if (maxAboveLineHeight < thisAboveLineHeight) maxAboveLineHeight = thisAboveLineHeight; //update height
		}
	}

	if (FirstBarIndex + AboveLineCount < ArgsLength) { // below-the-line bars are present
		//maxBelowLineHeight = 0; //initialize for this bar's value segments
		// for each year in each array of yearly numbers
		for (i = StartIndex; i < MaxIndex; i++) { //usable range of array of numbers
		   thisBelowLineHeight = 0; //initialize for this bar's value segments
			for (j = FirstBarIndex + AboveLineCount; j < ArgsLength; j++) { //work forwards for the arrays for above the line bars
				BarValue = ArgsArray[j][i];
				if (BarValue > 0) {
					blockHeight = getBarBlockHeight(BarValue); //first pass height
					thisBelowLineHeight += blockHeight;
				}
			}
			if (thisBelowLineHeight > 0) {
				if (maxBelowLineHeight < thisBelowLineHeight) maxBelowLineHeight = thisBelowLineHeight; //update height
			}
		}
	}
}

function getChart(AboveLineCount, StartIndex, MaxIndex, Title, BarNames, Colors) {
	// Title is chart title.
	// BarNames is a comma separated string of chart bar names.
	// BarColors is a comma separated string of chart bar colors.
	// There should be one title and one color for every subsequent function argument.
	// Each subsequent function argument is an array of numbers.
	// Each array should be of equal length.

	var ReqArgs = 6 // the number of named arguments
	var ArgsArray = getChart.arguments;
	var ArgsLength = getChart.arguments.length;
	var WindowHTML = [];
	var dataHTML = [];
	BarNames = replace(BarNames,"<br>"," ")
	var Names = BarNames.split(",")
	var FirstBarIndex = ReqArgs + 1 // skip over the array of year valuess
	var BarValue;
	var nestedDivs;
	var CellWidth
	var isFirst;
	var AboveLine;
	var blockHeight;
	var titleHeight = 50;
	////var Excursion = 0, MaxExcursion = 0;
	////var ExcursionPar = 3000000
	//////var ExcursionPar = 1500000

	var BarWidthFraction = 0.8; //Fraction of CellWidth
	var BarCount = MaxIndex - StartIndex - 1 //number of years plotted on the X axis
	CellWidth =	Math.floor(ChartWidth / BarCount )	
	BarWidth = Math.floor(BarWidthFraction * CellWidth) // set global value

	////// determine the maximum excursion from bottom to top of this chart's bars
	////// for each year in the array of yearly numbers
	////for (var i = StartIndex; i < MaxIndex; i++) { //usable range of years
	////    Excursion = 0;
	////	// for each bar with this year's data
	////    for (j = FirstBarIndex; j < ArgsLength; j++) { // for each array, we will get this year's value
	////		BarValue = ArgsArray[j][i]
	////		if (typeof(BarValue) != "string") Excursion += BarValue // not last row with comment
	////	}
	////	MaxExcursion = MaxExcursion > Excursion ? MaxExcursion : Excursion
	////}
	////if (!ExcursionRatio) { ExcursionRatio = ExcursionPar / MaxExcursion }; //fix this on first call to getChart
	//////topMargin = (graphSpace - MaxExcursion) / 2;

	if (Title) {
		WindowHTML.push('<div class = "Row chartTitle">');
		WindowHTML.push(getTitleTable(Title, ChartWidth, titleHeight)); //this is panned horizontally with the chart
		WindowHTML.push('</div>');
	}
	
	WindowHTML.push('<div class = "Row Expand chartBars">');
	//WindowHTML.push('<div class = "Row chartBars">');
	WindowHTML.push('<table class="charts-table" style="width:' + ChartWidth + 'px">\n'); //start the table html
	if (ArgsLength > FirstBarIndex) { //arrays of bar values are present
		AboveLineCount = (AboveLineCount < ArgsLength - FirstBarIndex) ? AboveLineCount : ArgsLength - FirstBarIndex 
		
		dataHTML = []; //initialize for the data
		// for each year in each array of yearly numbers
		for (var i = StartIndex; i < MaxIndex; i++) { //usable range of years
			dataHTML.push('<td class="above-line-cell" style="text-align:center; vertical-align:bottom; width:' + CellWidth + 'px">'); // start the items for this year

			// build nested divs for the above the line bars
			isFirst = true; //initialize
			AboveLine = true; //initialize
			blockCount = 0; //initialize
			thisAboveLineHeight = 0; //initialize for this bar's value segments
			for (j = FirstBarIndex; j < FirstBarIndex + AboveLineCount; j++) { // for each array above the line, get this year's data
				BarValue = ArgsArray[j][i];
				if (BarValue > 0) {
					blockHeight = getBarBlockHeight(BarValue, barAdjustment); //second pass height
					blockDiv = makeBarBlock(ArgsArray[ReqArgs][i], BarValue, Names[j - ReqArgs], Colors[j - ReqArgs], isFirst, AboveLine, blockHeight)
					dataHTML.push(blockDiv);
					isFirst = false; //first block of bar is done
					blockCount += 1; //count the number of blocks
					thisAboveLineHeight += blockHeight; //use for final table row height
				}
			}
			for (j = 0; j < blockCount; j++) { //use the count of blocks created
				dataHTML.push('</div>\n'); //close up the nested divs
			}
			dataHTML.push('</td>\n'); //close one bar
			if (thisAboveLineHeight > 0) {
				if (maxAboveLineHeight < thisAboveLineHeight) maxAboveLineHeight = thisAboveLineHeight; //update bar height
			}
		}
		WindowHTML.push('<tr class="row1" style="height:' + maxAboveLineHeight + 'px">\n');	// start the above-the-line row
		WindowHTML.push(dataHTML.join(" ")) // add the data elements for the bars
		WindowHTML.push('</tr>\n'); //close all the above-the-line bars

		
		if (FirstBarIndex+AboveLineCount < ArgsLength){ // below-the-line bars are present
		   //// WindowHTML.push('<tr class="row2">\n');	// start the below-the-line row
			dataHTML = []; //initialize for the data
			// for each year in each array of yearly numbers
			for (i = StartIndex; i < MaxIndex; i++) { //usable range of array of numbers
				dataHTML.push('<td class="below-line-cell" style="text-align:center; vertical-align:top; width:' + CellWidth + 'px">'); // start the bar blocks for this year
				// build nested divs for the below the line bars
				isFirst = true; //initialize
				AboveLine = false; //initialize
				blockCount = 0; //initialize
				thisBelowLineHeight = 0; //initialize for this bar's value segments
				for (j = FirstBarIndex + AboveLineCount; j < ArgsLength; j++) { //work forwards of the arrays for above the line bars
					
					BarValue = ArgsArray[j][i];
					if (BarValue > 0) {
						blockHeight = getBarBlockHeight(BarValue, barAdjustment); //second pass height
						blockDiv = makeBarBlock(ArgsArray[ReqArgs][i], BarValue, Names[j - ReqArgs], Colors[j - ReqArgs], isFirst, AboveLine, blockHeight)
						dataHTML.push(blockDiv);
						isFirst = false; //first block of bar is done
						blockCount += 1; //count the number of blocks
						thisBelowLineHeight += blockHeight; //use for final table row height
					}
				}
				for (j = 0; j < blockCount; j++) { //use the count of blocks created
					dataHTML.push('</div>\n'); //close up the nested divs
				}
				dataHTML.push('</td>\n'); //close one bar
				if (thisBelowLineHeight > 0) {
					if (maxBelowLineHeight < thisBelowLineHeight) maxBelowLineHeight = thisBelowLineHeight; //update bar height
				}
			}
			WindowHTML.push('<tr class="row2" style="height:' + maxBelowLineHeight + 'px">\n');	// start the below-the-line row
			WindowHTML.push(dataHTML.join(" ")) // add the data elements for the bars
			WindowHTML.push('</tr>\n'); //close all the below-the-line bars
		}

	}
	WindowHTML.push('</table>\n');
	WindowHTML.push('</div>');
	var testit = WindowHTML.join(" ");
	return WindowHTML.join(" ");
}

function getBarBlockHeight(BarValue, barAdjustment) {
	var BarLog, BarHeight;
	var hashKey, hashProperty;
	hashKey = Math.floor(BarValue);
	if (!barAdjustment) { //initial entry, make hash table
		//The Math.log method computes the natural logarithm of a number. 
		//Multiply the result of Math.log() by Math.LOG2E obtain the base-2 logarithm.
		BarLog = Math.LOG2E * Math.log(ExcursionRatio * BarValue); //obtain the base-2 logarithm of Ratio*Value
		BarHeight = Math.floor(Math.pow(BarLog, 5) / 30000); //adjust bar size with an ad-hoc formula of mine
		hashBarHeightTable[hashKey] = BarHeight;
		barAdjustment = 1; //for return formula
	} else {
		BarHeight = hashBarHeightTable[hashKey]; //recover value
	}
	return Math.floor(BarHeight * barAdjustment);
}

var priorBarHeight; //saved and used for relative positioning of next bar
var childPos; //saved and used for repositioning after scaling bar heights

function makeBarBlock(BarYear, BarValue, BarName, BarColor, isFirstBlock, isAboveLine, BarHeight) {
	//makes a <div> for one price value that is relatively positioned in the year's bar
	var WindowHTML = [];
	var PopupMsg;
	if (BarValue <= 0) {
		return '<div>'; //just start an empty div block
	}
	//if (isFirstBlock) {
	//    childPos = 0;
	//} else {
	//    childPos += 1;
	//}
	WindowHTML.push('<div class="' + BarYear + ' bar-block" style="');
	WindowHTML.push('background:' + BarColor + '; ');
	WindowHTML.push('display:block; '); // inline-block adds a default 2px padding space (see: http://designshack.net/articles/css/whats-the-deal-with-display-inline-block/)
	WindowHTML.push('width:' + BarWidth + 'px; '); //BarWidth is global
	WindowHTML.push('height:' + BarHeight + 'px; ');
	if (!isFirstBlock) { //this div is nested in the prior div
		WindowHTML.push('position:relative; ');
		if (isAboveLine) {
			WindowHTML.push('top:' + -(BarHeight + 2) + 'px; '); //relative position within prior block's div
		} else {
			WindowHTML.push('top:' + (priorBarHeight + 2) + 'px; '); //relative position within prior block's div
		}
	}     
	WindowHTML.push('"'); //end the style attribute  
	if (BarName.length > 0) {
		PopupMsg = BarYear + ': ' + BarName + ' = ' + formatCurrency(BarValue)
		WindowHTML.push(' title="' + PopupMsg + '"'); //for hover tool tip
		//WindowHTML.push(' popup="' + PopupMsg + '"'); //for click/touch tool tip
	}      
	//if (isAboveLine) {
	//    thisAboveLineHeight += BarHeight;
	//    WindowHTML.push(' class="bar1" '); //use for changing height
	//} else {
	//    thisBelowLineHeight += BarHeight;
	//    WindowHTML.push(' class="bar2" '); //use for changing height
	//}
	//WindowHTML.push(' barYear="' + BarYear + '" childPos="' + childPos + '" '); //use for changing height
	WindowHTML.push('>'); //end the div element
	priorBarHeight = BarHeight; //save for next bar's positioning
	return WindowHTML.join(" "); // return without the closing </div>, the collection of nested <div>s are all closed in the caller
}

function getTitleTable(Title, ChartWidth, titleHeight, Smaller) {	//this is called from getChart
	var TitleText = "";
	var TitleSubText = "";
	var WindowHTML = [];
	//if (Smaller) {
	//    spanText = '<span class = "charts-title-text small">'
	//} else {
	//    spanText = '<span class = "charts-title-text">'
	//}
	//if (Title.indexOf('<br>') > 0) {
	//    TitleText += spanText;
	//    TitleText += Title.substring(0, Title.indexOf('<br>'))
	//	TitleText += '</span><br>'
	//	TitleSubText += Title.substring(Title.indexOf('<br>')+4,Title.length) + '\n';
	//}else{
	//    TitleText += spanText + Title + '</span>\n';
	//}

	TitleText = getTitleText(Title, Smaller);
	if (Title.indexOf('<br>') > 0) {
		TitleSubText += Title.substring(Title.indexOf('<br>') + 4, Title.length) + '\n';
	}
	WindowHTML.push('<table class="charts-title" style="height:' + titleHeight + 'px; width:' + ChartWidth + 'px">\n');
	WindowHTML.push('<tr>\n');
	WindowHTML.push('<td align="center">' + TitleText + '</td>\n');
	WindowHTML.push('</tr>\n');
	if (TitleSubText.length > 0) {
		WindowHTML.push('<tr><td align="center">' + TitleSubText + '</td></tr>\n');
	}
	WindowHTML.push('</table>\n');
	return WindowHTML.join(" ");
}

function getTitleText(Title, Smaller) {
	var TitleText = "";
	var spanText = "";
	var TitleSubText = "";
	if (Smaller) {
		spanText = '<span class = "charts-title-text small">'
	} else {
		spanText = '<span class = "charts-title-text">'
	}
	if (Title.indexOf('<br>') > 0) {
		TitleText += spanText;
		TitleText += Title.substring(0, Title.indexOf('<br>'))
		TitleText += '</span>'
	} else {
		TitleText += spanText + Title + '</span>\n';
	}
	return TitleText;
}

function barMouseOut() {
	window.status = ""
}
function menuMouseOver(Msg) {
	window.status = Msg
}
