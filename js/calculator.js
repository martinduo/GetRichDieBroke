
// **********************************
// * Copyright 2013 by Bruce Martin *
// *      All rights reserved	    *
// **********************************

//IRA Single Life Expectancy(SLE) Ordered by Age
var SLEDataString = ""

//NOTE THAT LIFE EXPECTANCY FOR AGE LESS THAN 70 IS NEVER USED IN CALCULATIONS OF MINIMUM WITHDRAWALS
//HENCE THESE VALUES HAVE NOT BEEN CHANGED IN JAN 2001
SLEDataString += "81.6,80.6,79.6,78.6,77.6," // this is my padding for ages 0 thru 4
SLEDataString += "76.6,75.6,74.7,73.7,72.7,71.7,70.7,69.7,"	//IRS tables start with age = 5 - 12
SLEDataString += "68.8,67.8,66.8,65.8,64.8,63.9,62.9,61.9,60.9,59.9,59.0,58.0,57.0,56.0,55.1,54.1," //age = 13 - 28
SLEDataString += "53.1,52.2,51.2,50.2,49.3,48.3,47.3,46.4,45.4,44.4,43.5,42.5,41.5,40.6,39.6,38.7," //age = 29 - 44
SLEDataString += "37.7,36.8,35.9,34.9,34.0,33.1,32.2,31.3,30.4,29.5,28.6,27.7,26.8,25.9,25.0,24.2," //age = 45 - 60
SLEDataString += "23.3,22.5,21.6,20.8,20.0,19.2,18.4,17.6,16.8," //age = 61 - 69

//THE FOLLOWING VALUES ARE THE NEW LENGTHENED VALUES AS OF JAN 2001
SLEDataString += "26.2,25.3,24.4,23.5,22.7,21.8,20.9,20.1,19.2,18.4," //age 70 - 79
SLEDataString += "17.8,16.8,16.0,15.3,14.5,13.8,13.1,12.4,11.8,11.1," //age 80 - 89
SLEDataString += "10.5,09.9,09.4,08.8,08.3,07.8,07.3,06.9,06.5,06.1," //age 90 - 99
SLEDataString += "05.7,05.3,05.0,04.7,04.4,04.1,03.8,03.6,03.3,03.1," //age 100 - 109
SLEDataString += "02.8,02.6,02.4,02.2,02.0,01.8,01.8,01.8,01.8,01.8" //age 110 - 119, 115 and over = 1.8

var SLEData = SLEDataString.split(",")

//s="";for (i in self) s+=i+": "+self[i]+"\n";alert(s)

var Calculating;
var HouseObject; //make reference objects for our easy use
var YouObject;
var SpouseObject;

var iraContributionLimit = 5500; //use 2013 limit: contribution limits are subject to annual cost of living adjustments 

var initialWorthStartBalance; //initial value saved for what-if trials of rate changes
var NoPayoutsInYearOfDeath = false // set this to change logic

var StatusObject
var ResultObject
var ResultHeight
var OldestObject
var YoungestObject

var ShowNormal
var ShowYou401
var ShowYouIRA
var ShowYouRoth
var ShowYouBenefits
var ShowYouIncome
var ShowSpouse401
var ShowSpouseIRA
var ShowSpouseRoth
var ShowSpouseBenefits
var ShowSpouseIncome

function prepareChartData() {
	"use strict";
	var msg; //error report
	msg = prepareDataForCalculation(getSpouseData);
	if (msg) {
		return msg; //error report about user data
	}
	initializeCalculationStart();
	doCalculationCycles();
}

// Edit Codes
var editDollars = 1
var editDate = 2
var editAge = 3
var editPercent = 4
var editYear = 5
var editName = 6

//var lastBadDataName = ""
//var checkCount

//function checkValidInput(object,editCode,promptText) {
//    "use strict";
//    //Don't let user move away from field without correcting bad data
//	//if checkCount = 0, skip test to get out of a loop concerning multiple lost focus events
//	//checkCount has to be at 1 to do the test again
//	if (lastBadDataName == object.name && checkCount > 0) {
//		validateInput(object,editCode,promptText)
//	}
//}

function validateInput(object) {
	"use strict";
	var validatedText
	var exampleText
	var fieldColumn
	var editRequest
	var editCode = object.editCode;
	var promptText = object.promptText;
	var fieldName = object.name;

	doCalculation = true // user has changed data, recalc req'd

	if (object.value == "brucemartin") { //special test: bomb it now
		x = bombitnow() // no such function
	}

	if (object.value == "") { //input field was erased
		//lastBadDataName = ""
		//checkCount = 0
		return
	}
	if (getSpouseData) {
		if (fieldName.charAt(1)	== "1") fieldColumn = "Your self"
		if (fieldName.charAt(1)	== "2") fieldColumn = "Your spouse"
	}
	if (editCode == editDollars) {
		editRequest = "dollar amounts"
		exampleText = "Enter only whole numbers for dollar amounts."
		validatedText = isCurrency(object.value);
		//validatedText = isCurrency(object.value, true)
	}
	if (editCode == editDate) {
		editRequest = "dates"
		exampleText = 'Enter date in "mm/dd/yyyy" format.'
		validatedText = isDate(object.value)
	}
	if (editCode == editAge) {
		editRequest = "age"
		exampleText = 'Enter an age of reasonable value.'
		validatedText = isAge(object.value)
	}
	if (editCode == editPercent) {
		editRequest = "percentages"
		exampleText = 'Enter a percent in xx.x% format.'
		validatedText = isPercent(object.value)
	}
	if (editCode == editYear) {
		editRequest = "year"
		exampleText = 'Enter a 4-digit year of reasonable value.'
		validatedText = isYear(object.value)
	}
	if (editCode == editName) {
		editRequest = "name"
		exampleText = 'Enter a reasonable name.'
		validatedText = isName(object.value)
	}
	//checkCount = 0
	if (validatedText) {
		object.value = validatedText
		//lastBadDataName = ""
		return validatedText; //<========Note: EXIT========
	} else {
		//lastBadDataName = object.name
		fieldMsg = ""
		//fieldMsg += 'You made a mistake in the data format for ' + editRequest;
		//fieldMsg += '\nin "' + promptText + '"'
		//if (fieldColumn) fieldMsg += "\nfor " + fieldColumn
		//fieldMsg += ".\n"
		fieldMsg += exampleText
		fieldMsg += "<br/>Please correct the entry, or erase it."
		object.errorMessage = fieldMsg;
		fieldObject = object
		return; //<========Note: EXIT========
		// setTimeout(showErrorMsg, 400) //let the window handle all events from the mouseclick (which may include another onBlur event) before we post the alert
	}
}

//function showErrorMsg() {
//    "use strict";
//    alert(fieldMsg)
//	if (fieldObject.focus) fieldObject.focus()
//	if (fieldObject.select) fieldObject.select()
//	setTimeout("checkCount = 1",100)  //skip onBlur events until timeout
//}

var fieldMsg
var fieldObject

function prepareDataForCalculation(getSpouseData) {
	"use strict";
	var assetArray = [];
	var incomeArray = [];
	var assets = 0;
	var income = 0;
	var msg = ""
	HouseObject = appObject.HouseObject;
	YouObject = appObject.YouObject;
	SpouseObject = appObject.SpouseObject;
	HouseObject.who = "house"
	YouObject.who = "you"
	SpouseObject.who = "spouse"
	var dateObject = new Date()
	FixDateObject(dateObject)
	HouseObject.startyear = parseInt(dateObject.getYear())
	HouseObject.startyear = HouseObject.startyear < 1000 ? HouseObject.startyear + 1900 : HouseObject.startyear

	//=============================== INPUT DATA ITEMS =================================

	// Convert input data items
	HouseObject.payoutliving = parseInt(cleanNumber(HouseObject.payoutliving, -1))
	if (isNotPositiveOrZero(HouseObject.payoutliving)) msg += "<p>Yearly dollars needed for retirement life style.</p>\n"
	HouseObject.taxrate = parseFloat(cleanNumber(HouseObject.taxrate, -1))
	if (isNotPositiveOrZero(HouseObject.taxrate)) msg += "<p>Effective tax rate after retirement.</p>\n"
	//Done in initializeCalculationStart() -- else HouseObject.taxrate = HouseObject.taxrate / 100 // set up for multiplier
	HouseObject.cola = parseFloat(cleanNumber(HouseObject.cola, -1))
	if (isNotPositiveOrZero(HouseObject.cola)) msg += "<p>Estimated yearly rate of inflation.</p>\n"
	//Done in initializeCalculationStart() -- else HouseObject.cola = HouseObject.cola / 100 // set up for multiplier
	HouseObject.globalroi = parseFloat(cleanNumber(HouseObject.globalroi, -1))
	if (isNotPositiveOrZero(HouseObject.globalroi)) msg += "<p>Estimated rate of return for investment accounts.</p>\n"
	//Done in initializeCalculationStart() -- else HouseObject.globalroi = HouseObject.globalroi / 100 // set up for multiplier
	HouseObject.normbal = parseInt(cleanNumber(HouseObject.normbal))
	//	HouseObject.normroi = parseFloat(cleanNumber(HouseObject.normroi))
	HouseObject.spousesalary = parseInt(cleanNumber(HouseObject.spousesalary))
	HouseObject.lumpsum = parseInt(cleanNumber(HouseObject.lumpsum))
	HouseObject.lumpsumyear = parseInt(cleanNumber(HouseObject.lumpsumyear))
	if (HouseObject.lumpsumyear > 0 && HouseObject.lumpsumyear < HouseObject.startyear) msg += "<p>Year windfall obtained is too early.</p>\n"

	YouObject.payoutgifts = parseInt(cleanNumber(YouObject.payoutgifts))
	YouObject.retireage = parseInt(cleanNumber(YouObject.retireage))
	if (isNotPositive(YouObject.retireage)) msg += "<p>Retirement start age for you.</p>\n"
	YouObject.birthyear = parseInt(cleanNumber(YouObject.birthyear))
	if (isNotPositive(YouObject.birthyear)) msg += "<p>Year of birth for you.</p>\n"
	YouObject.lifeage = parseInt(cleanNumber(YouObject.lifeage))
	if (isNotPositive(YouObject.lifeage)) msg += "<p>Life expectancy for you.</p>\n"
	YouObject.normsaveamount = parseInt(cleanNumber(YouObject.normsaveamount))
	YouObject.x401bal = parseInt(cleanNumber(YouObject.x401bal))
	YouObject.x401saveamount = parseInt(cleanNumber(YouObject.x401saveamount))
	//	YouObject.x401roi = parseFloat(cleanNumber(YouObject.x401roi))
	YouObject.irabal = parseInt(cleanNumber(YouObject.irabal))
	YouObject.irasaveamount = parseInt(cleanNumber(YouObject.irasaveamount))
	//	YouObject.iraroi = parseFloat(cleanNumber(YouObject.iraroi))
	YouObject.rothbal = parseInt(cleanNumber(YouObject.rothbal))
	YouObject.rothsaveamount = parseInt(cleanNumber(YouObject.rothsaveamount))
	//	YouObject.rothroi = parseFloat(cleanNumber(YouObject.rothroi))
	YouObject.ssbenefit = parseInt(cleanNumber(YouObject.ssbenefit))
	YouObject.ssbenefitstartage = parseInt(cleanNumber(YouObject.ssbenefitstartage)) //--NEW--
	if (isNotPositive(YouObject.ssbenefitstartage) && YouObject.ssbenefit > 0) msg += "<p>Social security start age for you.</p>\n"
	YouObject.earlypension = parseInt(cleanNumber(YouObject.earlypension))
	YouObject.normpension = parseInt(cleanNumber(YouObject.normpension))
	YouObject.pensionpercent = parseFloat(cleanNumber(YouObject.pensionpercent))
	//Done in initializeCalculationStart() -- YouObject.pensionpercent = YouObject.pensionpercent / 100	 // set up for multiplier
	YouObject.annuity = parseInt(cleanNumber(YouObject.annuity))
	YouObject.annuityage = parseInt(cleanNumber(YouObject.annuityage))
	if (YouObject.annuity > 0) {
		if (isNotPositive(YouObject.annuityage)) msg += "<p>Annuity benefits beginning age for you is incorrect or missing.</p>\n"
	}
	YouObject.income = parseInt(cleanNumber(YouObject.income))
	YouObject.incomestartage = parseInt(cleanNumber(YouObject.incomestartage))
	YouObject.incomeendage = parseInt(cleanNumber(YouObject.incomeendage))
	if (YouObject.income > 0) {
		if (isNotPositive(YouObject.incomestartage)) msg += "<p>Retirement income starting age for you is incorrect or missing.</p>\n"
		if (YouObject.incomeendage > 0) {
			if (YouObject.incomestartage > YouObject.incomeendage || isNotPositive(YouObject.incomeendage)) msg += "<p>Retirement income ending age for you is incorrect.</p>\n"
		}
	}

	assets += HouseObject.normbal;
	assets += HouseObject.lumpsum;
	income += HouseObject.spousesalary;

	assets += YouObject.irabal;
	assets += YouObject.x401bal;
	assets += YouObject.rothbal;
	income += YouObject.ssbenefit;
	income += YouObject.earlypension;
	income += YouObject.normpension;
	income += YouObject.annuity;
	income += YouObject.income;

	assetArray.push(
		HouseObject.normbal,
		HouseObject.lumpsum,
		YouObject.irabal,
		YouObject.x401bal,
		YouObject.rothbal
		);

	incomeArray.push(
		HouseObject.spousesalary,
		YouObject.ssbenefit,
		YouObject.earlypension,
		YouObject.normpension,
		YouObject.annuity,
		YouObject.income
		);


	if (getSpouseData) {
		SpouseObject.payoutgifts = parseInt(cleanNumber(SpouseObject.payoutgifts))
		SpouseObject.retireage = parseInt(cleanNumber(SpouseObject.retireage))
		if (isNotPositive(SpouseObject.retireage)) msg += "<p>Retirement start age for spouse.</p>\n"
		SpouseObject.birthyear = parseInt(cleanNumber(SpouseObject.birthyear))
		if (isNotPositive(SpouseObject.birthyear)) msg += "<p>Year of birth for spouse.</p>\n"
		SpouseObject.lifeage = parseInt(cleanNumber(SpouseObject.lifeage))
		if (isNotPositive(SpouseObject.lifeage)) msg += "<p>Life expectancy for spouse.</p>\n"
		SpouseObject.normsaveamount = parseInt(cleanNumber(SpouseObject.normsaveamount))
		SpouseObject.x401bal = parseInt(cleanNumber(SpouseObject.x401bal))
		SpouseObject.x401saveamount = parseInt(cleanNumber(SpouseObject.x401saveamount))
		//		SpouseObject.x401roi = parseFloat(cleanNumber(SpouseObject.x401roi))
		SpouseObject.irabal = parseInt(cleanNumber(SpouseObject.irabal))
		SpouseObject.irasaveamount = parseInt(cleanNumber(SpouseObject.irasaveamount))
		//		SpouseObject.iraroi = parseFloat(cleanNumber(SpouseObject.iraroi))
		SpouseObject.rothbal = parseInt(cleanNumber(SpouseObject.rothbal))
		SpouseObject.rothsaveamount = parseInt(cleanNumber(SpouseObject.rothsaveamount))
		//		SpouseObject.rothroi = parseFloat(cleanNumber(SpouseObject.rothroi))
		SpouseObject.ssbenefit = parseInt(cleanNumber(SpouseObject.ssbenefit))
		SpouseObject.ssbenefitstartage = parseInt(cleanNumber(SpouseObject.ssbenefitstartage)) //--NEW--
		if (isNotPositive(SpouseObject.ssbenefitstartage) && SpouseObject.ssbenefit > 0) msg += "<p>Social security start age for spouse.</p>\n"
		SpouseObject.earlypension = parseInt(cleanNumber(SpouseObject.earlypension))
		SpouseObject.normpension = parseInt(cleanNumber(SpouseObject.normpension))
		SpouseObject.pensionpercent = parseFloat(cleanNumber(SpouseObject.pensionpercent))
		SpouseObject.annuity = parseInt(cleanNumber(SpouseObject.annuity))
		SpouseObject.annuityage = parseInt(cleanNumber(SpouseObject.annuityage))
		if (SpouseObject.annuity > 0) {
			if (isNotPositive(SpouseObject.annuityage)) msg += "<p>Annuity benefits beginning age for spouse is incorrect.</p>\n"
		}
		SpouseObject.income = parseInt(cleanNumber(SpouseObject.income))
		SpouseObject.incomestartage = parseInt(cleanNumber(SpouseObject.incomestartage))
		SpouseObject.incomeendage = parseInt(cleanNumber(SpouseObject.incomeendage))
		if (SpouseObject.income > 0) {
			if (isNotPositive(SpouseObject.incomestartage)) msg += "<p>Retirement income starting age for spouse is incorrect or missing.</p>\n"
			if (SpouseObject.incomeendage > 0) {
				if (SpouseObject.incomestartage > SpouseObject.incomeendage || isNotPositive(SpouseObject.incomeendage)) msg += "<p>Retirement income ending age for spouse is incorrect.</p>\n"
			}
		}
		assets += SpouseObject.irabal;
		assets += SpouseObject.x401bal;
		assets += SpouseObject.rothbal;
		income += SpouseObject.ssbenefit;
		income += SpouseObject.earlypension;
		income += SpouseObject.normpension;
		income += SpouseObject.annuity;
		income += SpouseObject.income;
	}

	assetArray.push(
		SpouseObject.irabal,
		SpouseObject.x401bal,
		SpouseObject.rothbal
		);

	incomeArray.push(
		SpouseObject.ssbenefit,
		SpouseObject.earlypension,
		SpouseObject.normpension,
		SpouseObject.annuity,
		SpouseObject.income
		);

	assets = 0;
	assetArray.forEach(function (value){
		if (value > 0) {assets += value};
	});
	income = 0;
	incomeArray.forEach(function (value) {
		if (value > 0) { income += value };
	});

	//test traditional and roth contributions for sum under limit, they'll be indexed yearly
	//msg += testIraContributions(YouObject);
	//msg += testIraContributions(SpouseObject);

	if (isNotPositive(assets + income)) msg += "<p class='errorLead'>Funds for your retirement are missing.</p>\n"

	// See if minimum data items are provided
	if (msg.length > 0) {
		msg = "<p class='errorLead'>You forgot to provide the following required items:</p><p id='menuNote'><i>(Open the menu to see the demo plans.)</i></p>\n\n" + msg;
		//console.log(msg);
		return msg; //report this error
	}
	return; //no error
}


function initializeCalculationStart() {
	"use strict";
	var arraySize;
	var makeArray; //object with array methods
	YouObject.currentage = HouseObject.startyear - YouObject.birthyear
	YouObject.spanyears = YouObject.lifeage - YouObject.currentage
	YouObject.retireyear = YouObject.retireage + YouObject.birthyear
	HouseObject.spanyears = YouObject.spanyears
	HouseObject.retireyear = YouObject.retireyear //updated to be earliest retirement year

	HouseObject.taxrate = HouseObject.taxrate / 100 // set up for multiplier
	HouseObject.cola = HouseObject.cola / 100 // set up for multiplier
	HouseObject.globalroi = HouseObject.globalroi / 100 // set up for multiplier
	if (YouObject.pensionpercent) YouObject.pensionpercent = YouObject.pensionpercent / 100	 // set up for multiplier

	if (getSpouseData) {
		if (SpouseObject.pensionpercent) SpouseObject.pensionpercent = SpouseObject.pensionpercent / 100	 // set up for multiplier		
		SpouseObject.currentage = HouseObject.startyear - SpouseObject.birthyear
		SpouseObject.spanyears = SpouseObject.lifeage - SpouseObject.currentage
		SpouseObject.retireyear = SpouseObject.retireage + SpouseObject.birthyear
		HouseObject.spanyears = SpouseObject.spanyears > YouObject.spanyears ? SpouseObject.spanyears : YouObject.spanyears
		HouseObject.retireyear = HouseObject.retireyear < SpouseObject.retireyear ? HouseObject.retireyear : SpouseObject.retireyear
		OldestObject = SpouseObject.currentage > YouObject.currentage ? SpouseObject : YouObject
		YoungestObject = SpouseObject.currentage <= YouObject.currentage ? SpouseObject : YouObject
	}
	HouseObject.spanyears += 2 // include start year and after death year
	arraySize = HouseObject.spanyears;
	makeArray = newFilledArray(); //load module address
	makeArray.set(arraySize + 1, 0); //set up properties


//=============================== CREATE ARRAYS =================================

	//create working arrays
	HouseObject.xaxisyears = new createYearsArray(arraySize, HouseObject.startyear)
	HouseObject.lifestylemoney = makeArray.get(arraySize); // makeArray.get(arraySize)
	HouseObject.lifestylemoney[0] = HouseObject.payoutliving //initialize first year
	HouseObject.targetmoney = makeArray.get(arraySize)
	HouseObject.collectedmoney = makeArray.get(arraySize)

	//create arrays for overall net worth (the house)
	HouseObject.worthearnings = makeArray.get(arraySize)
	HouseObject.worthstartbalance = makeArray.get(arraySize + 1) //one more slot to accomdate logic in calculateyear[i]
	HouseObject.worthstartbalance[0] = 0 //init
	HouseObject.worthtaxes = makeArray.get(arraySize)
	HouseObject.worthspent = makeArray.get(arraySize)

	//create arrays for joint normal investment account (the house)
	HouseObject.normaldeposits = makeArray.get(arraySize)
	HouseObject.normalearnings = makeArray.get(arraySize)
	HouseObject.normalstartbalance = makeArray.get(arraySize)
	HouseObject.normaltaxes = makeArray.get(arraySize)
	HouseObject.normalspent = makeArray.get(arraySize)
	HouseObject.normalstartbalance[0] = HouseObject.normbal
	HouseObject.worthstartbalance[0] += HouseObject.normbal

	//create arrays for 401k accounts
	YouObject.x401deposits = makeArray.get(arraySize)
	YouObject.x401earnings = makeArray.get(arraySize)
	YouObject.x401startbalance = makeArray.get(arraySize)
	YouObject.x401transferout = makeArray.get(arraySize)
	YouObject.x401startbalance[0] =	YouObject.x401bal
	HouseObject.worthstartbalance[0] += YouObject.x401bal
	if (getSpouseData) {
		SpouseObject.x401deposits = makeArray.get(arraySize)
		SpouseObject.x401earnings = makeArray.get(arraySize)
		SpouseObject.x401startbalance = makeArray.get(arraySize)
		SpouseObject.x401transferout = makeArray.get(arraySize)
		SpouseObject.x401startbalance[0] = SpouseObject.x401bal
		HouseObject.worthstartbalance[0] += SpouseObject.x401bal
	}

	//create arrays for normal IRA accounts
	YouObject.iratransferin = makeArray.get(arraySize)
	YouObject.iradeposits = makeArray.get(arraySize)
	YouObject.iraearnings = makeArray.get(arraySize)
	YouObject.irastartbalance = makeArray.get(arraySize)
	YouObject.irataxes = makeArray.get(arraySize)
	YouObject.iraspent = makeArray.get(arraySize)
	YouObject.irasaved = makeArray.get(arraySize)
	YouObject.irastartbalance[0] = YouObject.irabal
	HouseObject.worthstartbalance[0] += YouObject.irabal
	if (getSpouseData) {
		SpouseObject.iratransferin = makeArray.get(arraySize)
		SpouseObject.iradeposits = makeArray.get(arraySize)
		SpouseObject.iraearnings = makeArray.get(arraySize)
		SpouseObject.irastartbalance = makeArray.get(arraySize)
		SpouseObject.irataxes = makeArray.get(arraySize)
		SpouseObject.iraspent = makeArray.get(arraySize)
		SpouseObject.irasaved = makeArray.get(arraySize)
		SpouseObject.irastartbalance[0] = SpouseObject.irabal
		HouseObject.worthstartbalance[0] += SpouseObject.irabal
	}

	//create arrays for Roth IRA accounts
	YouObject.rothdeposits = makeArray.get(arraySize)
	YouObject.rothearnings = makeArray.get(arraySize)
	YouObject.rothstartbalance = makeArray.get(arraySize)
	YouObject.rothtaxes = makeArray.get(arraySize)
	YouObject.rothspent = makeArray.get(arraySize)
	YouObject.rothstartbalance[0] = YouObject.rothbal
	HouseObject.worthstartbalance[0] += YouObject.rothbal
	if (getSpouseData) {
		SpouseObject.rothdeposits = makeArray.get(arraySize)
		SpouseObject.rothearnings = makeArray.get(arraySize)
		SpouseObject.rothstartbalance = makeArray.get(arraySize)
		SpouseObject.rothtaxes = makeArray.get(arraySize)
		SpouseObject.rothspent = makeArray.get(arraySize)
		SpouseObject.rothstartbalance[0] = SpouseObject.rothbal
		HouseObject.worthstartbalance[0] += SpouseObject.rothbal
	}

	//create arrays for social security benefits
	YouObject.ssincome = makeArray.get(arraySize)
	YouObject.sstaxes = makeArray.get(arraySize)
	YouObject.ssspent = makeArray.get(arraySize)
	YouObject.sssaved = makeArray.get(arraySize)
	if (getSpouseData) {
		SpouseObject.ssincome = makeArray.get(arraySize)
		SpouseObject.sstaxes = makeArray.get(arraySize)
		SpouseObject.ssspent = makeArray.get(arraySize)
		SpouseObject.sssaved = makeArray.get(arraySize)
	}

	//create arrays for pension benefits
	YouObject.pensionincome = makeArray.get(arraySize)
	YouObject.pensiontaxes = makeArray.get(arraySize)
	YouObject.pensionspent = makeArray.get(arraySize)
	YouObject.pensionsaved = makeArray.get(arraySize)
	if (getSpouseData) {
		SpouseObject.pensionincome = makeArray.get(arraySize)
		SpouseObject.pensiontaxes = makeArray.get(arraySize)
		SpouseObject.pensionspent = makeArray.get(arraySize)
		SpouseObject.pensionsaved = makeArray.get(arraySize)
	}

	//create arrays for annuity benefits
	YouObject.annuityincome = makeArray.get(arraySize)
	YouObject.annuitytaxes = makeArray.get(arraySize)
	YouObject.annuityspent = makeArray.get(arraySize)
	YouObject.annuitysaved = makeArray.get(arraySize)
	if (getSpouseData) {
		SpouseObject.annuityincome = makeArray.get(arraySize)
		SpouseObject.annuitytaxes = makeArray.get(arraySize)
		SpouseObject.annuityspent = makeArray.get(arraySize)
		SpouseObject.annuitysaved = makeArray.get(arraySize)
	}

	//create arrays for retirement income (other spouse income is added to appropriate array)
	YouObject.retireincome = makeArray.get(arraySize)
	YouObject.retiretaxes = makeArray.get(arraySize)
	YouObject.retirespent = makeArray.get(arraySize)
	YouObject.retiresaved = makeArray.get(arraySize)
	if (getSpouseData) {
		SpouseObject.retireincome = makeArray.get(arraySize)
		SpouseObject.retiretaxes = makeArray.get(arraySize)
		SpouseObject.retirespent = makeArray.get(arraySize)
		SpouseObject.retiresaved = makeArray.get(arraySize)
	}

	HouseObject.startworth = 0 // init to start display at row 0
	HouseObject.startnormal = 1000 // init to start display at row 1000
	HouseObject.showworth = -1 // init to not trigger display
	HouseObject.shownormal = -1 // init to not trigger display

	YouObject.start401 = 1000 // init to start display at row 1000
	YouObject.startira = 1000 // init to start display at row 1000
	YouObject.startroth = 1000 // init to start display at row 1000
	YouObject.startss = 1000 // init to start display at row 1000
	YouObject.startpension = 1000 // init to start display at row 1000
	YouObject.startannuity = 1000 // init to start display at row 1000
	YouObject.startincome = 1000 // init to start display at row 1000
	YouObject.show401 = -1 // init to not trigger display
	YouObject.showira = -1 // init to not trigger display
	YouObject.showroth = -1 // init to not trigger display
	YouObject.showss = -1 // init to not trigger display
	YouObject.showpension = -1 // init to not trigger display
	YouObject.showannuity = -1 // init to not trigger display
	YouObject.showincome = -1 // init to not trigger display

	if (getSpouseData) {
		SpouseObject.start401 = 1000 // init to start display at row 1000
		SpouseObject.startira = 1000 // init to start display at row 1000
		SpouseObject.startroth = 1000 // init to start display at row 1000
		SpouseObject.startss = 1000 // init to start display at row 1000
		SpouseObject.startpension = 1000 // init to start display at row 1000
		SpouseObject.startannuity = 1000 // init to start display at row 1000
		SpouseObject.startincome = 1000 // init to start display at row 1000
		SpouseObject.show401 = -1 // init to not trigger display
		SpouseObject.showira = -1 // init to not trigger display
		SpouseObject.showroth = -1 // init to not trigger display
		SpouseObject.showss = -1 // init to not trigger display
		SpouseObject.showpension = -1 // init to not trigger display
		SpouseObject.showannuity = -1 // init to not trigger display
		SpouseObject.showincome = -1 // init to not trigger display
	}

	YouObject.dead = false
	if (getSpouseData) SpouseObject.dead = false

	initialWorthStartBalance = HouseObject.worthstartbalance[0] //save for what-if trials of rate changes

	// start calculate the forecast
	Calculating = true
	//YearIndex = 0
	//CurrentYear = HouseObject.startyear	+ YearIndex
	//setTimeout("calculationCycle()",100) //allow ie to refresh status display
	//StatusObject.write("<p>&nbsp;<p><center><span class=prompt>Calculating " + CurrentYear + "<br>Please Wait . . .\n</span></center>")
}

//function testIraContributions(QueryObject) { //test contributions before calculations start
//    var traditional = QueryObject.irasaveamount;
//    var roth = QueryObject.rothsaveamount
//    var who = QueryObject.who === "spouse" ? " spouse's " : " "
//    if (traditional + roth <= iraContributionLimit) return "";
//    return "<p>The sum of your" + who + "traditional and roth ira contributions must be less than 5500.</p>\n"
//}

var CurrentYear	 //global variable for use within calculation loops
var traceObject = null; //used for debugging only

function doCalculationCycles() {
	"use strict";
	var startYear = HouseObject.startyear;
	var periodYears = HouseObject.spanyears;
	HouseObject.worthstartbalance[0] = initialWorthStartBalance;
	for (var yearIndex = 0 ; yearIndex < periodYears ; yearIndex++) {
		CurrentYear = startYear + yearIndex;
		////--debugging logic below--debug trace--
		//if (CurrentYear === 2058) {
		//    var xxx = 1; //set breakpoint here for debugging
		//    traceObject = HouseObject.worthspent; //used for debugging only
		//    console.log("* Debug Year: " + CurrentYear + ", Number logged is: " + "worthspent" + " *"); //**debug**
		//} else {
		//    traceObject = null; //used for debugging only
		//}
		////--debugging logic above--
		calculateYear(yearIndex); // do the current year calculation
	}
}

var zeroworthTitle = "You Forgot To Enter Your Retirement Assets"
var networthTitle = "Your Retirement's Overall Finances"
var taxnormalTitle = "Your Normal Investments"
var You401Title = "Your 401(k) Investments"
var Spouse401Title = "Spouse's 401(k) Investments"
var YouIRATitle = "Your IRA Investments"
var SpouseIRATitle = "Spouse's IRA Investments"
var YouRothTitle = "Your Roth IRA Investments"
var SpouseRothTitle = "Spouse's Roth IRA Investments"
var YouSSTitle = "Your Social Security Benefits"
var SpouseSSTitle = "Spouse's Social Security Benefits"
var YouPensionTitle = "Your Pension Benefits"
var SpousePensionTitle = "Spouse's Pension Benefits"
var YouAnnuityTitle = "Your Annuity Benefits"
var SpouseAnnuityTitle = "Spouse's Annuity Benefits"
var YouIncomeTitle = "Your Retirement Income"
var SpouseIncomeTitle = "Spouse's Retirement Income"
var ChartSubText = "<br>Bars show positive cash flows and balances above the line, negative cash flows below the line. The year's beginning amount plus or minus year's changes equals next year's beginning amount. Bars are color coded to match the column headings in the associated table shown below.<br>Touch and hold on a bar to see the numbers (bars are not to scale)."

var fuchsia7 = "#dd54e1"; // "#FF0AFF";
var yellow7 = "#ffed3d"; // "#FFFF00";
var aqua7 = "#40bdff"; // "#00FFFF";
var red7 = "#fd371e"; // "#FF0000";
var lime7 = "#8bd937"; // "#00FF00";
var silver7 = "#bcbdc2"; // "#bdc3c7";

var NetWorthGridHeadings = "Year,Balance,Increase,Taxes,Retirement"
var NetWorthHeadings = "Year,Begining<br>Amount,Year End<br>Increase,Paid For<br>Taxes,Paid For<br>Retirement"
var NetWorthColors = [silver7, fuchsia7, aqua7, red7, lime7];

var NormalAccountGridHeadings = "Year,Balance,Deposits,Earnings,Taxes,Retirement"
var NormalAccountHeadings = "Year,Starting<br>Balance,Year End<br>Deposits,Year End<br>Earnings,Paid For<br>Taxes,Paid For<br>Retirement"
var NormalAccountColors = [silver7, fuchsia7, yellow7, aqua7, red7, lime7];

var x401GridHeadings = "Year,Balance,Deposits,Earnings"
var x401Headings = "Year,Starting<br>Balance,Year End<br>Deposits,Year End<br>Earnings"
var x401Colors = [silver7, fuchsia7, yellow7, aqua7]

//var IRAGridHeadings = "Year,Balance,Deposits,Earnings,Taxes,Retirement,Required"
var IRAGridHeadings = "Year,Balance,Deposits,Earnings,Taxes,Retire,MRD"
//var IRAHeadings = "Year,Starting<br>Balance,Year End<br>Deposits,Year End<br>Earnings,Paid For<br>Taxes,Paid For<br>Retirement,Paid For<br>Minimum"
var IRAHeadings = "Year,Starting<br>Balance,Year End<br>Deposits,Year End<br>Earnings,Paid For<br>Taxes,Paid For<br>Retirement,Paid For<br>The MRD"
var IRAColors = [silver7, fuchsia7, yellow7, aqua7, red7, lime7, silver7]

var RothGridHeadings = "Year,Balance,Deposits,Earnings,Taxes,Retirement"
var RothHeadings = "Year,Starting<br>Balance,Year End<br>Deposits,Year End<br>Earnings,Paid For<br>Taxes,Paid For<br>Retirement"
var RothColors = [silver7, fuchsia7, yellow7, aqua7, red7, lime7]

var IncomeGridHeadings = "Year,Income,Taxes,Retirement,Saved"
var IncomeHeadings = "Year,Year End<br>Total Income,Paid For<br>Taxes,Paid For<br>Retirement,Saved"
var IncomeColors = [silver7, aqua7, red7, lime7, yellow7, ]

var SSGridHeadings = "Year,Receipts,Taxes,Retirement,Saved"
var SSHeadings = "Year,Year End<br>Receipts,Paid For<br>Taxes,Paid For<br>Retirement,Saved"
var SSColors = [silver7, aqua7, red7, lime7, yellow7, ]

var PensionGridHeadings = "Year,Receipts,Taxes,Retirement,Saved"
var PensionHeadings = "Year,Year End<br>Receipts,Paid For<br>Taxes,Paid For<br>Retirement,Saved"
var PensionColors = [silver7, aqua7, red7, lime7, yellow7, ]

var AnnuityGridHeadings = "Year,Receipts,Taxes,Retirement,Saved"
var AnnuityHeadings = "Year,Year End<br>Receipts,Paid For<br>Taxes,Paid For<br>Retirement,Saved"
var AnnuityColors = [silver7, aqua7, red7, lime7, yellow7, ]


//=============================== CALCULATE YEAR (i) =================================
var MinimumIRAOnly = true  //set for use in function call

function calculateYear(i) {
	"use strict";
	// end of processing if both are dead
	if (YouObject.dead && !(getSpouseData && !SpouseObject.dead)) return;

	HouseObject.worthstartbalance[i+1] = HouseObject.worthstartbalance[i] // init fron last year
	HouseObject.worthearnings[i] = 0   // init
	HouseObject.worthspent[i] = 0   // init
	HouseObject.worthtaxes[i] = 0   // init
	HouseObject.collectedmoney[i] = 0 // init
	getTargetMoney(i, HouseObject)	  // init
	if (getSpouseData) allocateSalary(i, HouseObject) // salary is put into correct person's income array
	getNormalEarnings(i, HouseObject)
	  if (traceObject) console.log(traceObject[i] + "  *NormalEarnings*"); //**debug**
	getLumpsum(i, HouseObject)
	  if (traceObject) console.log(traceObject[i] + "  *Lumpsum*"); //**debug**

	YouObject.currentage = CurrentYear - YouObject.birthyear
	allocatePension(i, YouObject) // possible contigent beneficiary
	  if (traceObject) console.log(traceObject[i] + "  *Pension*"); //**debug**
	if (!YouObject.dead) {
		allocateSocialSecurity(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *SocialSecurity*"); //**debug**
		allocateAnnuity(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *Annuity*"); //**debug**
		allocateIncome(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *Income*"); //**debug**
		getNormalDeposits(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *NormalDeposits*"); //**debug**
		get401Deposits(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *401Deposits*"); //**debug**
		getIraDeposits(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *IraDeposits*"); //**debug**
		getRothDeposits(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *tRothDeposits*"); //**debug**
		get401Earnings(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *401Earnings*"); //**debug**
		getIraEarnings(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *IraEarnings*"); //**debug**
		getRothEarnings(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *RothEarnings*"); //**debug**
		transfer401(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *transfer401*"); //**debug**
	}
	if (getSpouseData) {
		SpouseObject.currentage = CurrentYear - SpouseObject.birthyear
		allocatePension(i, SpouseObject) // possible contigent Pension
	}
	if (getSpouseData && !SpouseObject.dead) {
		allocateSocialSecurity(i, SpouseObject)
		allocateAnnuity(i, SpouseObject)
		allocateIncome(i, SpouseObject)
		getNormalDeposits(i, SpouseObject)
		get401Deposits(i, SpouseObject)
		getIraDeposits(i, SpouseObject)
		getRothDeposits(i, SpouseObject)
		get401Earnings(i, SpouseObject)
		getIraEarnings(i, SpouseObject)
		getRothEarnings(i, SpouseObject)
		transfer401(i, SpouseObject)
	}

	// get required IRS minimums from normal IRAs for first withdrawals
	if (getSpouseData) {
		if (!OldestObject.dead) withdrawFromNormalIRA(i, OldestObject, MinimumIRAOnly)
			if (traceObject) console.log(traceObject[i] + "  *withdrawMinimumIRA by oldest*"); //**debug**
		if (!YoungestObject.dead) withdrawFromNormalIRA(i, YoungestObject, MinimumIRAOnly)
			if (traceObject) console.log(traceObject[i] + "  *withdrawMinimumIRA by youngest*"); //**debug**
	} else if (!YouObject.dead) {
		withdrawFromNormalIRA(i, YouObject, MinimumIRAOnly)
		  if (traceObject) console.log(traceObject[i] + "  *withdrawMinimumIRA*"); //**debug**
	}

	//if (CurrentYear === 2058) {
	//    var xxx = 1; //set breakpoint here for debugging
	//}

	// get from tax normal accounts for second withdrawals
	withdrawFromNormalAccount(i, HouseObject)
	  if (traceObject) console.log(traceObject[i] + "  *withdrawNormalAccount*"); //**debug**

	// go back to normal and Roth IRA accounts for more withdrawals (if any still needed)
	if (getSpouseData) {
		if (!OldestObject.dead) withdrawFromNormalIRA(i, OldestObject)
		if (!YoungestObject.dead) withdrawFromNormalIRA(i, YoungestObject)
		if (!OldestObject.dead) withdrawFromRothIRA(i, OldestObject)
		if (!YoungestObject.dead) withdrawFromRothIRA(i, YoungestObject)
	} else if (!YouObject.dead) {
		withdrawFromNormalIRA(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *withdrawNormalIRA*"); //**debug**
		withdrawFromRothIRA(i, YouObject)
		  if (traceObject) console.log(traceObject[i] + "  *withdrawRothIRA*"); //**debug**
	}

	// do these death related tests after all other processing for the year
	if (!YouObject.dead) testForDeath(i, YouObject)
	if (getSpouseData) {
		if (!SpouseObject.dead) testForDeath(i, SpouseObject)
		if (SpouseObject.dead &&!YouObject.dead) bequeathIRAs(i, SpouseObject, YouObject)
		if (YouObject.dead && !SpouseObject.dead) bequeathIRAs(i, YouObject, SpouseObject)
	}
}
function allocateSocialSecurity(i, QueryObject) {
	"use strict";
	var benefit, net, tax, saved, spent, neededmoney;
	if (HouseObject.retireyear > CurrentYear ) return // no payouts yet
	if (QueryObject.ssbenefit <= 0) return // no social security
	//if ((QueryObject.currentage < 62 || QueryObject.currentage < QueryObject.retireage ) && (QueryObject.currentage < 70)) return // no social security yet
	//if ((QueryObject.currentage < 66 || QueryObject.currentage < QueryObject.ssbenefitstartage) && (QueryObject.currentage < 70)) return // no social security yet - "ssbenefitstartage" is new
	if (QueryObject.currentage < QueryObject.ssbenefitstartage) return // no social security yet - "ssbenefitstartage" is new
	if (QueryObject.currentage > QueryObject.ssbenefitstartage) { //S.S. has paid past one year
		QueryObject.ssbenefit = Math.round((1 + HouseObject.cola) * QueryObject.ssbenefit) //indexed for cost of living
	}
	benefit = QueryObject.ssbenefit
	tax = Math.round(0.85 * benefit * HouseObject.taxrate) // max hit, assumes total income over $44,000, filing jointly
	saved = benefit - tax
	spent = 0
	neededmoney = HouseObject.targetmoney[i] - HouseObject.collectedmoney[i]
	if (NoPayoutsInYearOfDeath) {
		if (QueryObject.currentage >= QueryObject.lifeage) neededmoney = 0 // dead this year
	}
	if (neededmoney > 0) {
		if (saved > neededmoney) { // able to still save some money
			spent = neededmoney
			saved -= neededmoney
		} else {
			spent = saved
			saved = 0
		}
	}
	QueryObject.ssincome[i] += benefit
	QueryObject.sstaxes[i] += tax
	QueryObject.ssspent[i]  += spent
	QueryObject.sssaved[i]  += saved
	if (QueryObject.startss > i) QueryObject.startss = i // fatirst row to display
	QueryObject.showss = i+1 // the last row in grid display
	updateTheHouseObject(i, benefit, tax, spent, saved)
}
function allocatePension(i, QueryObject) {
	"use strict";
	var benefit, net, tax, saved, spent, neededmoney, benefitObject
	if (HouseObject.retireyear > CurrentYear ) return // no payouts yet, based on earliest retirement year
	//if (QueryObject.normpension > 0 && QueryObject.currentage >= 65 && QueryObject.retireyear <= CurrentYear) {
	if (QueryObject.normpension > 0 && QueryObject.retireyear <= CurrentYear) {
			benefit = QueryObject.normpension
	} else if (QueryObject.earlypension > 0 && QueryObject.retireyear <= CurrentYear) { //early pension not supported
		benefit = QueryObject.earlypension
	} else {
		return // no pension available
	}
	//pension available, but recipient may be dead
	if (QueryObject.dead && QueryObject.pensionpercent > 0) { // dead but spouse gets benefits
		benefitObject = QueryObject.who == "you" ? SpouseObject : YouObject // switch objects
		benefit = Math.round(benefit * QueryObject.pensionpercent)
	} else if (QueryObject.dead) {
		return // no pension payout
	} else {
		benefitObject = QueryObject
	}
	tax = Math.round(benefit * HouseObject.taxrate)
	saved = benefit - tax
	spent = 0
	neededmoney = HouseObject.targetmoney[i] - HouseObject.collectedmoney[i]
	if (NoPayoutsInYearOfDeath) {
		if (benefitObject.currentage >= benefitObject.lifeage) neededmoney = 0 // dead this year
	}
	if (neededmoney > 0) {
		if (saved > neededmoney) { // able to still save some money
			spent = neededmoney
			saved -= neededmoney
		} else {
			spent = saved
			saved = 0
		}
	}
	benefitObject.pensionincome[i] += benefit
	benefitObject.pensiontaxes[i] += tax
	benefitObject.pensionspent[i]  += spent
	benefitObject.pensionsaved[i]  += saved
	if (benefitObject.startpension > i) benefitObject.startpension = i // first row to display
	benefitObject.showpension = i+1 // the last row in grid display
	updateTheHouseObject(i, benefit, tax, spent, saved)
}
function allocateAnnuity(i, QueryObject) {
	"use strict";
	var benefit, net, tax, saved, spent, neededmoney;
	if (HouseObject.retireyear > CurrentYear ) return // no payouts yet
	if (QueryObject.annuity <= 0) return // no annuity
	if (QueryObject.annuityage <= 0) return // no annuity
	if (QueryObject.annuityage > QueryObject.currentage) return // no annuity
	benefit	= QueryObject.annuity
	tax = Math.round(benefit * HouseObject.taxrate)
	saved = benefit - tax
	spent = 0
	neededmoney = HouseObject.targetmoney[i] - HouseObject.collectedmoney[i]
	if (NoPayoutsInYearOfDeath) {
		if (QueryObject.currentage >= QueryObject.lifeage) neededmoney = 0 // dead this year
	}
	if (neededmoney > 0) {
		if (saved > neededmoney) { // able to still save some money
			spent = neededmoney
			saved -= neededmoney
		} else {
			spent = saved
			saved = 0
		}
	}
	QueryObject.annuityincome[i] += benefit
	QueryObject.annuitytaxes[i] += tax
	QueryObject.annuityspent[i]  += spent
	QueryObject.annuitysaved[i]  += saved
	if (QueryObject.startannuity > i) QueryObject.startannuity = i // first row to display
	QueryObject.showannuity = i+1 // the last row in grid display
	updateTheHouseObject(i, benefit, tax, spent, saved)
}
function allocateSalary(i, QueryObject) { // if other spouse is still working
	"use strict";
	var benefit, benefitObject
	if (HouseObject.retireyear > CurrentYear ) return // no payouts yet
	if (QueryObject.spousesalary <= 0) return // no salary
	benefitObject = YouObject.retireyear > SpouseObject.retireyear ? YouObject : SpouseObject
	if (benefitObject.retireyear <= CurrentYear) return // salary is ended
	if (HouseObject.startyear < CurrentYear) { //salary paid past first year of plan
		QueryObject.spousesalary = Math.round((1 + HouseObject.cola) * QueryObject.spousesalary) //indexed using cost of living as estimate
	}
	benefit = QueryObject.spousesalary
	calculateRetirementIncome(i, benefit, benefitObject)
}
function allocateIncome(i, QueryObject) {
	"use strict";
	var benefit
	if (HouseObject.retireyear > CurrentYear ) return // no payouts yet
	if (QueryObject.income <= 0) return // no income
	if (QueryObject.currentage < QueryObject.incomestartage || (QueryObject.currentage >= QueryObject.incomeendage && QueryObject.incomeendage > 0)) return // no income
	benefit = QueryObject.income
	calculateRetirementIncome(i, benefit, QueryObject)
}
function calculateRetirementIncome(i, benefit, benefitObject) { //paid out for retirement life style living expenses
	"use strict";
	var spent, tax, saved, spent, neededmoney;
	tax = Math.round(benefit * HouseObject.taxrate)
	saved = benefit - tax
	spent = 0
	neededmoney = HouseObject.targetmoney[i] - HouseObject.collectedmoney[i]
	if (NoPayoutsInYearOfDeath) {
		if (QueryObject.currentage >= QueryObject.lifeage) neededmoney = 0 // dead this year
	}
	if (neededmoney > 0) {
		if (saved > neededmoney) { // able to still save some money
			spent = neededmoney
			saved -= neededmoney
		} else {
			spent = saved
			saved = 0
		}
	}
	benefitObject.retireincome[i] += benefit
	benefitObject.retiretaxes[i] += tax
	benefitObject.retirespent[i]  += spent
	benefitObject.retiresaved[i]  += saved
	if (benefitObject.startincome > i) benefitObject.startincome = i // first row to display
	benefitObject.showincome = i+1 // the last row in grid display
	updateTheHouseObject(i, benefit, tax, spent, saved)
}
function updateTheHouseObject(i, benefit, tax, spent, saved) {
	"use strict";
	if (saved > 0) {
		HouseObject.normaldeposits[i] += saved
		HouseObject.normalstartbalance[i+1] += saved
		if (HouseObject.startnormal > i) HouseObject.startnormal = i // first row to display
		HouseObject.shownormal = i+1 // the last row in grid display
	}
	HouseObject.worthearnings[i] += benefit
	HouseObject.worthtaxes[i] += tax
		if (traceObject) console.log(traceObject[i] + "@updateTheHouseObject"); //**debug**
	HouseObject.worthspent[i] += spent
	HouseObject.worthstartbalance[i+1] += (benefit - spent - tax)
	HouseObject.collectedmoney[i] += spent
	HouseObject.showworth = i+1 // the last row in grid display
}

function getNormalDeposits(i, QueryObject) { // add in the year-end deposits
	"use strict";
	if (QueryObject.retireyear <= CurrentYear) return // no more deposits
	if (QueryObject.normsaveamount == 0) return // no deposits
	if (HouseObject.startyear < CurrentYear) { //deposit made past first year of plan
		QueryObject.normsaveamount = Math.round((1 + HouseObject.cola) * QueryObject.normsaveamount) //indexed using cost of living as estimate
	}
	HouseObject.normaldeposits[i] += QueryObject.normsaveamount
	HouseObject.normalstartbalance[i+1] += QueryObject.normsaveamount
	HouseObject.worthstartbalance[i+1] += QueryObject.normsaveamount
	HouseObject.worthearnings[i] += QueryObject.normsaveamount
	if (QueryObject.startnormal > i) QueryObject.startnormal = i // first row to display
	QueryObject.shownormal = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function get401Deposits(i, QueryObject) { // add in the year-end deposits
	"use strict";
	if (QueryObject.retireyear <= CurrentYear) return // no more deposits
	if (QueryObject.x401saveamount == 0) return // no deposit specified
	if (HouseObject.startyear < CurrentYear) { //deposit made past first year of plan
		QueryObject.x401saveamount = Math.round((1 + HouseObject.cola) * QueryObject.x401saveamount) //indexed using cost of living as estimate
	}
	QueryObject.x401deposits[i] += QueryObject.x401saveamount
	QueryObject.x401startbalance[i+1] += QueryObject.x401saveamount
	HouseObject.worthstartbalance[i+1] += QueryObject.x401saveamount
	HouseObject.worthearnings[i] += QueryObject.x401saveamount
	if (QueryObject.start401 > i) QueryObject.start401 = i // first row to display
	if (QueryObject.retireyear === CurrentYear) return // 401 is rolled over this year
	QueryObject.show401 = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function getIraDeposits(i, QueryObject) { // add in the year-end deposits
	"use strict";
	if (QueryObject.retireyear <= CurrentYear) return // no more deposits
	if (QueryObject.irasaveamount == 0) return // no deposits
	if (HouseObject.startyear < CurrentYear) { //deposit made past first year of plan
		QueryObject.irasaveamount = Math.round((1 + HouseObject.cola) * QueryObject.irasaveamount) //indexed using cost of living as estimate
	}
	QueryObject.iradeposits[i] += QueryObject.irasaveamount
	QueryObject.irastartbalance[i+1] += QueryObject.irasaveamount
	HouseObject.worthstartbalance[i+1] += QueryObject.irasaveamount
	HouseObject.worthearnings[i] += QueryObject.irasaveamount
	if (QueryObject.startira > i) QueryObject.startira = i // first row to display
	QueryObject.showira = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function getRothDeposits(i, QueryObject) { // add in the year-end deposits
	"use strict";
	if (QueryObject.retireyear <= CurrentYear) return // no more deposits
	if (QueryObject.rothsaveamount == 0) return // no deposits
	if (HouseObject.startyear < CurrentYear) { //deposit made past first year of plan
		QueryObject.rothsaveamount = Math.round((1 + HouseObject.cola) * QueryObject.rothsaveamount) //indexed using cost of living as estimate
	}
	QueryObject.rothdeposits[i] += QueryObject.rothsaveamount
	QueryObject.rothstartbalance[i+1] += QueryObject.rothsaveamount
	HouseObject.worthstartbalance[i+1] += QueryObject.rothsaveamount
	HouseObject.worthearnings[i] += QueryObject.rothsaveamount
	if (QueryObject.startroth > i) QueryObject.startroth = i // first row to display
	QueryObject.showroth = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function getNormalEarnings(i, QueryObject) {
	"use strict";
	if (QueryObject.normalstartbalance[i] > 0) { // positive balance (allows for negative balance)
		QueryObject.normalearnings[i] += Math.round(QueryObject.normalstartbalance[i] * HouseObject.globalroi)
		QueryObject.normaltaxes[i] += Math.round(QueryObject.normalearnings[i] * HouseObject.taxrate)
		QueryObject.normalstartbalance[i+1] += QueryObject.normalstartbalance[i] + QueryObject.normalearnings[i] - QueryObject.normaltaxes[i]
		HouseObject.worthearnings[i] += QueryObject.normalearnings[i]
		HouseObject.worthtaxes[i] += QueryObject.normaltaxes[i]
			if (traceObject) console.log(traceObject[i] + "  *worthtaxes* @getNormalEarnings"); //**debug**
		HouseObject.worthstartbalance[i + 1] += QueryObject.normalearnings[i] - QueryObject.normaltaxes[i]
	}
	if (QueryObject.normalstartbalance[i] == 0) return // no balance
	if (QueryObject.startnormal > i) QueryObject.startnormal = i // first row to display
	QueryObject.shownormal = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function get401Earnings(i, QueryObject) {
	"use strict";
	if (QueryObject.retireyear < CurrentYear) return // retired, fund was rolled over to IRA last year end
	if (QueryObject.x401startbalance[i] > 0) {
		QueryObject.x401earnings[i] += Math.round(QueryObject.x401startbalance[i] * HouseObject.globalroi)
		QueryObject.x401startbalance[i+1] += QueryObject.x401startbalance[i] + QueryObject.x401earnings[i]
		HouseObject.worthearnings[i] += QueryObject.x401earnings[i]
		HouseObject.worthstartbalance[i+1] += QueryObject.x401earnings[i]
	}
	if (QueryObject.x401startbalance[i] == 0) return // no balance
	if (QueryObject.start401 > i) QueryObject.start401 = i // first row to display
	if (QueryObject.retireyear === CurrentYear) return // 401 is rolled over this year end
	QueryObject.show401 = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function getIraEarnings(i, QueryObject) {
	"use strict";
	if (QueryObject.irastartbalance[i] > 0) {
		QueryObject.iraearnings[i] += Math.round(QueryObject.irastartbalance[i] * HouseObject.globalroi)
		QueryObject.irastartbalance[i+1] += QueryObject.irastartbalance[i] + QueryObject.iraearnings[i]
		HouseObject.worthearnings[i] += QueryObject.iraearnings[i]
		HouseObject.worthstartbalance[i+1] += QueryObject.iraearnings[i]
	}
	if (QueryObject.irastartbalance[i] == 0) return // no balance
	if (QueryObject.startira > i) QueryObject.startira = i // first row to display
	QueryObject.showira = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function getRothEarnings(i, QueryObject) {
	"use strict";
	if (QueryObject.rothstartbalance[i] > 0) {
		QueryObject.rothearnings[i] +=	Math.round(QueryObject.rothstartbalance[i] * HouseObject.globalroi)
		QueryObject.rothstartbalance[i+1] += QueryObject.rothstartbalance[i] + QueryObject.rothearnings[i]
		HouseObject.worthearnings[i] += QueryObject.rothearnings[i]
		HouseObject.worthstartbalance[i+1] += QueryObject.rothearnings[i]
	}
	if (QueryObject.rothstartbalance[i] == 0) return // no balance
	if (QueryObject.startroth > i) QueryObject.startroth = i // first row to display
	QueryObject.showroth = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function getLumpsum(i, QueryObject) {
	"use strict";
	if (HouseObject.lumpsum == 0 || HouseObject.lumpsumyear != CurrentYear) return
	HouseObject.normaldeposits[i] += HouseObject.lumpsum // this is the after-tax income amount
	HouseObject.normalstartbalance[i+1] += HouseObject.lumpsum // this is the after-tax income amount
	HouseObject.worthearnings[i] += HouseObject.lumpsum // this is the after-tax income amount
	HouseObject.worthstartbalance[i+1] += HouseObject.lumpsum // this is the after-tax income amount
	if (QueryObject.startnormal > i) QueryObject.startnormal = i // first row to display
	QueryObject.shownormal = i+1 // the last row in grid display
	HouseObject.showworth = i+1 // the last row in grid display
}
function withdrawFromNormalAccount(i, QueryObject) { // start at end of retirement year for next year's expenses
	"use strict";
	var neededmoney, payout
	if (HouseObject.retireyear > CurrentYear ) return // no payouts yet
	if (NoPayoutsInYearOfDeath) {
		if (getSpouseData) {
			if (OldestObject.currentage >= OldestObject.lifeage) return // last one dead this year
		} else {
			if (YouObject.currentage >= YouObject.lifeage) return // dead this year
		}
	}
	if (QueryObject.normalstartbalance[i+1] <=	0) return // no more money
	neededmoney = HouseObject.targetmoney[i] - HouseObject.collectedmoney[i]
	if (neededmoney > 0) {
		if (QueryObject.normalstartbalance[i+1] >= neededmoney) { // able to cover entire payout
			payout = neededmoney // tax has already been paid on this money
		} else { // use it all up now
			payout = QueryObject.normalstartbalance[i + 1] > 0 ? QueryObject.normalstartbalance[i + 1] : 0;
		}
		QueryObject.normalstartbalance[i+1] -= payout
		QueryObject.normalspent[i] += payout
		HouseObject.worthspent[i] += payout
		HouseObject.worthstartbalance[i+1] -= payout
		HouseObject.collectedmoney[i] += payout
	}
}
function withdrawFromNormalIRA(i, QueryObject, GetMinimum) { // start at end of retirement year for next year's expenses
	"use strict";
	//if (CurrentYear === 2038) {
	//    var xxx = 1; //set breakpoint here for debugging
	//}
	var actualwithdrawal, getmintaxrate, calctaxrate, taxrate, neededmoney, neededwithdrawal, payout, tax, minimumwithdrawal, excesswithdraw
	// bug //////if (HouseObject.retireyear > CurrentYear ) return // no payouts yet	
	if (NoPayoutsInYearOfDeath) {
		if (QueryObject.currentage >= QueryObject.lifeage) return // dead this year
	}
	if (QueryObject.irastartbalance[i+1] <=	0) return // no more money
	if (arguments.length < 3) GetMinimum = false // get needed money only
	if (GetMinimum && QueryObject.currentage > 69) { // assume age 70 and 70 1/2 happen in same year
		minimumwithdrawal = Math.ceil(getIraMinimum(i, QueryObject))
		minimumwithdrawal = minimumwithdrawal > QueryObject.irastartbalance[i] ? QueryObject.irastartbalance[i] : minimumwithdrawal
	} else {
		minimumwithdrawal = 0
	}
	if (GetMinimum && minimumwithdrawal <= 0) return //no withdrawal done
	getmintaxrate = HouseObject.taxrate //tax for any withdrawal
	if (HouseObject.retireyear <= CurrentYear) { // figure withdrawal for next year's needed money
		neededmoney = HouseObject.targetmoney[i] - HouseObject.collectedmoney[i]
		if (neededmoney > 0) {
			var calctaxrate = QueryObject.currentage < 60 ?	getmintaxrate += .10 : getmintaxrate // add the penalty tax if early withdrawal
			if (Math.round(QueryObject.irastartbalance[i+1] * (1 - calctaxrate)) > neededmoney) { // able to cover entire payout
				neededwithdrawal = Math.ceil(neededmoney / (1 - calctaxrate))
			} else { // use it all up now
				neededwithdrawal = QueryObject.irastartbalance[i+1]
			}
		} else {
			neededwithdrawal = 0
		}
	} else {
		neededwithdrawal = 0
	}
	if (GetMinimum) {
		actualwithdrawal = minimumwithdrawal
		taxrate = getmintaxrate // the house rate, since age is 70
	} else {
		actualwithdrawal = neededwithdrawal
		taxrate = calctaxrate // possibly the house rate plus early penalty
	}
	if (actualwithdrawal > 0) { //some withdrawal done
		payout = Math.round(actualwithdrawal * (1 - taxrate))
		tax = actualwithdrawal - payout
		if (GetMinimum) { //possibility of too much money withdrawn for retirement needs
			// ignore rounding errors in payout vs neededmoney
			excesswithdraw = payout	> 2 + neededmoney ? payout - neededmoney : 0
			if (excesswithdraw > 0 ) {
				payout -= excesswithdraw
				QueryObject.irasaved[i] += excesswithdraw //transferred from ira to normal
				HouseObject.normaldeposits[i] += excesswithdraw //transferred from ira to normal
				HouseObject.normalstartbalance[i+1] += excesswithdraw //transferred from ira to normal
				HouseObject.worthstartbalance[i+1] += excesswithdraw //transferred from ira to normal
				if (HouseObject.startnormal > i) HouseObject.startnormal = i // first row to display
			}
		}
		QueryObject.irastartbalance[i+1] -= actualwithdrawal
		QueryObject.iraspent[i] += payout
		QueryObject.irataxes[i] += tax
		HouseObject.worthstartbalance[i+1] -= actualwithdrawal
		HouseObject.worthspent[i] += payout
		HouseObject.worthtaxes[i] += tax
			if (traceObject) console.log(traceObject[i] + "  *worthtaxes* @withdrawFromNormalIRA"); //**debug**
		HouseObject.collectedmoney[i] += payout	//add to amount collected so far
	}
}
function withdrawFromRothIRA(i, QueryObject) { // start at end of retirement year for next year's expenses
	"use strict";
	var taxrate, neededmoney, withdraw, payout, tax
	if (HouseObject.retireyear > CurrentYear ) return // no payouts yet
	if (NoPayoutsInYearOfDeath) {
		if (QueryObject.currentage >= QueryObject.lifeage) return // dead this year
	}
	if (QueryObject.rothstartbalance[i+1] <= 0) return // no more money
	if (HouseObject.retireyear <= CurrentYear) { // draw payout for next year from this ira
		neededmoney = HouseObject.targetmoney[i] - HouseObject.collectedmoney[i]
	}
	if (neededmoney > 0) {
		taxrate = 0
		if (QueryObject.currentage < 60) taxrate = .10 // penalty tax
		if (taxrate > 0 && Math.round(QueryObject.rothstartbalance[i+1] * (1 - taxrate)) > neededmoney) { // able to cover entire payout
			withdraw = Math.ceil(neededmoney / (1 - taxrate))
		} else if (QueryObject.rothstartbalance[i+1] > neededmoney) { // able to cover entire payout
			withdraw = neededmoney
		} else { // use it all up now
			withdraw = QueryObject.rothstartbalance[i+1]
		}
		if (taxrate > 0) {
			payout = Math.round(withdraw * (1 - taxrate))
			tax = withdraw - payout
		} else {
			payout = withdraw
			tax = 0
		}
		QueryObject.rothstartbalance[i+1] -= withdraw
		QueryObject.rothspent[i] += payout
		QueryObject.rothtaxes[i] += tax
		HouseObject.worthspent[i] += payout
		HouseObject.worthtaxes[i] += tax
		HouseObject.worthstartbalance[i+1] -= withdraw
		HouseObject.collectedmoney[i] += payout
	}
}
function bequeathIRAs(i, QueryObject, TargetObject) { // transfer at end of death year
    var theText = QueryObject.who == "you" ? "<br>Bequest To<br>Spouse<br>Last Year" : "<br>Above Bequest<br>From Spouse<br>Last Year"
    var theTargetText = TargetObject.who == "you" ? "<br>Bequest To<br>Spouse<br>Last Year" : "Above Bequest<br>From Spouse<br>Last Year"
    "use strict";
	if (QueryObject.irastartbalance[i + 1] > 0) {
		if (TargetObject.startira > i) TargetObject.startira = i // first row to display
		TargetObject.iradeposits[i] += QueryObject.irastartbalance[i + 1]
		TargetObject.iradeposits[i + 1] = theTargetText;
		TargetObject.irastartbalance[i + 1] += QueryObject.irastartbalance[i + 1]
		QueryObject.irastartbalance[i+1] = formatCurrency(QueryObject.irastartbalance[i+1]) + theText
		QueryObject.showira = i+1 // the last row in grid display
	}
	if (QueryObject.rothstartbalance[i+1] > 0) {
		if (TargetObject.startroth > i) TargetObject.startroth = i // first row to display
		TargetObject.rothdeposits[i] += QueryObject.rothstartbalance[i+1]
		TargetObject.rothdeposits[i + 1] = theTargetText;
		TargetObject.rothstartbalance[i + 1] += QueryObject.rothstartbalance[i + 1]
		QueryObject.rothstartbalance[i+1] = formatCurrency(QueryObject.rothstartbalance[i+1]) + theText
		QueryObject.showroth = i+1 // the last row in grid display
	}
}
function transfer401(i, QueryObject) { // transfer at end of retirement year
	"use strict";
	if (QueryObject.retireyear > CurrentYear) return // not retired yet
	if (QueryObject.x401startbalance[i + 1] > 0) {
		if (QueryObject.startira > i) QueryObject.startira = i // first row to display
		QueryObject.iradeposits[i] += QueryObject.x401startbalance[i + 1]
		QueryObject.irastartbalance[i + 1] += QueryObject.x401startbalance[i + 1]
		var theText = QueryObject.who == "you" ? "Your Normal IRA" : "Spouse's Normal IRA";
		QueryObject.x401startbalance[i + 1] = formatCurrency(QueryObject.x401startbalance[i + 1]) + " Rolled Over To<br>" + theText + "<br>At The " + (CurrentYear) + " Year End" 
		QueryObject.show401 = i+1 // the last row in grid display
	}
}
function testForDeath(i, QueryObject) {
	if (QueryObject.currentage >= QueryObject.lifeage) QueryObject.dead = true
}
function getTargetMoney(i, QueryObject) {
	if (i > 0) QueryObject.lifestylemoney[i] = Math.round((1 + HouseObject.cola) * QueryObject.lifestylemoney[i - 1])
	QueryObject.targetmoney[i] = QueryObject.lifestylemoney[i]
	if (!YouObject.dead) QueryObject.targetmoney[i] += YouObject.payoutgifts
	if (getSpouseData && !SpouseObject.dead) QueryObject.targetmoney[i] += SpouseObject.payoutgifts
}
function getIraMinimum(i, QueryObject) {
	 if (QueryObject.currentage > 115) return QueryObject.irastartbalance[i] / SLEData[115]
	return QueryObject.irastartbalance[i]/SLEData[QueryObject.currentage]
}
