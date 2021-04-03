
// **********************************
// * Copyright 2013 by Bruce Martin *
// *      All rights reserved		*
// **********************************

/* ======================================================================
FUNCTION:	roundNumber 
INPUT:      rnum - number to round
			rlength - number of decimal places
DESC:		This function rounds a number to a specified number of decimal places
====================================================================== */
function roundNumber(rnum, rlength) { // Arguments: number to round, number of decimal places
	var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
	return parseFloat(newnumber); // Output the result
}


/* ======================================================================
FUNCTION:	replace 
DESC:		This function simply replaces any occurences of the "text"
			string within the "string" string with the "by" string. 
====================================================================== */
function replace(string,text,by) {
 // Replaces text with by in string
	 var i = string.indexOf(text);
	 var newstr = '';
	 if ((!i) || (i == -1)) return string;
	 newstr += string.substring(0,i) + by;

	 if (i+text.length < string.length)
		 newstr += replace(string.substring(i+text.length,string.length),text,by);
	 
	 return newstr;
 }
/* ======================================================================
FUNCTION:	formatCurrency 
INPUT:  	num - a number to be formatted as dollars.
			addDollarSign - boolean is true if dollar sign to be added.
RETURN: 	A string containing a formatted currency value in dollars;
			Returns back the same input if a isNaN is passed.
DESC:		This function converts a number to a currency string.  
			It is useful for placing dollar signs, commas,
			into output strings. Negative amounts get leading dash.
			Whole dollar amounts only; cents are truncated.
			If for special cases, the parameter was formatted somewhere
			else, it is returned unchanged.
====================================================================== */
function formatCurrency(num, addDollarSign) {
	var resultStr = "";
	var Str = "";

	// Return immediately if a null value was passed in
	if (num == null) return "0"

	// Return immediately if a NaN value was passed in
	if (isNaN(num)) return num; // return unchanged

	if (num < 0) resultStr = "-"

	if (addDollarSign == true)  resultStr += "$"	

	// convert the argument to a string
	Str = "" + num;  
	if (Str.charAt(0) == "-") {
		Str = Str.substring(1,Str.length)
	}

	// Get the index of any decimal point.
	// If there is a decimal point, strip it
	idx = Str.indexOf(".");	
	if (idx >= 0)
		Str = Str.substring(0, idx);

	// Format output string - insert commas
	if (Str.length > 3) {
		var x = Str.length % 3 //length of first chunck
		if (x > 0) resultStr += Str.substring(0, x) + ","
		Str = Str.substring(x, Str.length)
		while (Str.length > 3) {
			resultStr += Str.substring(0, 3) + ","
			Str = Str.substring(3, Str.length)
		}
	}
	resultStr += Str
	return resultStr;
}

function formatCurrencyForGrid(num) {
	if (num === 0) return " ";
	return formatCurrency(num);
}

/* ======================================================================
FUNCTION:	formatTableCurrency 
INPUT:  	num - a number to be formatted as dollars for dispay in the charts dollar data table.
            Values of zero (0) are padded with blanks (&nbsp;) so as to make the column width wider.
RETURN: 	A string containing a formatted value;
			Returns back the same input if a isNaN is passed.
DESC:		This function converts a number to a currency string.
            Zero values are padded to expand the column width.
			Whole dollar amounts only; cents are truncated.
			If for special cases, the parameter was formatted somewhere
			else, it is returned unchanged.
====================================================================== */
function formatTableCurrency(num) {
    var resultStr = "";
    var Str = "";
    var paddedZero = '&nbsp0&nbsp;'

    // Return immediately if a null value was passed in
    if (num == null) return paddedZero;

    // Return immediately if a NaN value was passed in
    if (isNaN(num)) return num; // return unchanged

    if (num < 0) resultStr = "-"

    // convert the argument to a string
    Str = "" + num;
    if (Str.charAt(0) == "-") {
        Str = Str.substring(1, Str.length)
    }

    // Get the index of any decimal point.
    // If there is a decimal point, strip it
    idx = Str.indexOf(".");
    if (idx >= 0)
        Str = Str.substring(0, idx);

    // Format output string - insert commas
    if (Str.length > 3) {
        var x = Str.length % 3 //length of first chunck
        if (x > 0) resultStr += Str.substring(0, x) + ","
        Str = Str.substring(x, Str.length)
        while (Str.length > 3) {
            resultStr += Str.substring(0, 3) + ","
            Str = Str.substring(3, Str.length)
        }
    }
    resultStr += Str
    if (resultStr === "0") return paddedZero;
    return resultStr;
}

/* ======================================================================
FUNCTION:	createYearsArray  
INPUT: 		size (integer) : the size of the array
			year (integer) : the first year
RETURN:		An array with length == size, filled with consectutive year values
DESC:		The function creates an array with a number of elements equal to "size"
			and initializes the values to consectutive years.
USAGE:		myArray = new createYearsArray(12,1998);
====================================================================== */
function createYearsArray(size,year) {
	// Validate parameter value
	if (size+"" == "undefined" || size == null) 
		return null;	
	this.length = size;
	for (var i = 0; i < size; i++) {
		this[i] = year++; 
	}
	return this;
}
/* ======================================================================
FUNCTION:	createArray  
INPUT: 		size (integer) : the size of the array
RETURN:		An array with length == size
DESC:		The function creates an numeric array with a number of 
			elements equal to "size" and initializes the values to zero.
USAGE:		myArray = new createArray(12);
====================================================================== */
function createArray(size) {
	// Validate parameter value
	if (size+"" == "undefined" || size == null) 
		return null;	
	this.length = size;
	for (var i = 0; i < size; i++) {
		this[i] = 0; 
	}
	return this;
}

/* ======================================================================
FUNCTION:	newFilledArray()  
RETURN:     a module with methods to call to make initialized arrays
USAGE:		makeArray = newFilledArray(); 
METHODS:    makeArray.set(maxsize, value);
			makeArray.get(size);
SET INPUT:  maxsize (integer) : the maximum array size specified in subsequent method calls
			value (integer) : the initializing value
RETURN:		null
GET INPUT: 	size (integer) : the size of the requested array
RETURN:		An array with length == size, filled with each item == value
DESC:		The function creates an numeric array with a number of 
			elements equal to "size" and with the elements set to "value"
COMMENT:
If you need to create many zero filled arrays of different lengths during the execution of your code, 
the fastest way I've found to achieve this is to create a zero array once, 
of a length which you know will never be exceeded, and then slice that array as necessary

For example create a zero filled array of length maxLength, as a variable visible to the code that needs zero arrays:
var zero = newFilledArray(maxLength, 0);
Now slice this array everytime you need a zero filled array of length requiredLength < maxLength:
zero.slice(0, requiredLength);
I was creating zero filled arrays thousands of times during execution of my code, this speeded up the process tremendously.
====================================================================== */
function newFilledArray(len, val) {
	var sourceArray = [];
	var makeArray = {
		set: function(len, val) {
			while (0 < len--) {
				sourceArray.push(val);
			}
		},
		get: function (requiredLength) {
			if (sourceArray.length) {
				return sourceArray.slice(0, requiredLength);
			} else {
				return null;
			}
		},
	}
	return makeArray;
}

/* ======================================================================
====================================================================== */
function isNotPositive(num) {
	if (isNaN(num) || num <= 0) return true
	return false
}

/* ======================================================================
====================================================================== */
function isNotPositiveOrZero(num) {
	if (isNaN(num) || num < 0) return true
	return false
}


/* ======================================================================
FUNCTION:  	cleanNumber (numstr, defaultvalue)
INPUT:  	numstr (string/number) - the string that will be cleaned to ensure 
									that the value is a number (int or float)
RETURN: 	A string containing a valid integer or float value;
			Returns the defaultvalue if an empty string is passed
			Returns the defaultvalue if invalid argument was passed
DESC:		If the defaultvalue input parameter is missing, it is set to zero ("0")
			This function removes "$", "%", and "," characters
			and checks for a single decimal point. This input comes
			from form fields that have been validated beforehand. 
			Empty fields are changed to the defaultvalue.
====================================================================== */
function cleanNumber(numstr, defaultvalue) {
	var resultStr = "";
	var decCount = 0;		// number of decimal points in the string

    //??? Jan 2014 ??? if (arguments.length < 2) defaultvalue = "0"	//use this default value
	if (arguments.length < 2) defaultvalue = "0"	//use this default value
	//??? Feb 2014 revert ??? if (arguments.length < 2) defaultvalue = ""	//use this default value

	// Return immediately if an empty string was passed in
	if (numstr+"" == "undefined" || numstr+"" == "null" || numstr+"" == "")	
		return defaultvalue+"";

	// Return immediately if the special "empty field" flag was passed in
	if (numstr == "#")	
		return defaultvalue+"";

	// convert to a string for performing string comparisons.
	numstr += "";

    ////reset zero to blank entry //debugging
	//if (numstr == "0")
	//    return defaultvalue + "";

	// Loop through string and test each character.
	// Include special cases for negative numbers (first char == '-')
	// and a single decimal point (any one char in string == '.').   
	for (i = 0; i < numstr.length; i++) {
		// track number of decimal points
		if (numstr.charAt(i) == ".")
			decCount++;

		if (!((numstr.charAt(i) >= "0") && (numstr.charAt(i) <= "9") || 
				(numstr.charAt(i) == "-") || (numstr.charAt(i) == "."))) {
			if (!((numstr.charAt(i) == "$") || (numstr.charAt(i) == "%") || (numstr.charAt(i) == ","))) {return null};
			continue; //skip over allowable character
		} else if ((numstr.charAt(i) == "-" && i != 0) ||
			  (numstr.charAt(i) == "." && numstr.length == 1) ||
			  (numstr.charAt(i) == "." && decCount > 1)) { return 0 }
		resultStr += numstr.charAt(i)
	}
	return resultStr;
}

/* ======================================================================
FUNCTION:	isPercent 
INPUT:  	str - a string to be tested.
RETURN: 	A string containing a formatted percent value;
			Returns null if invalid arguments were passed.
DESC:		This function reformats a percent string.  
====================================================================== */
function isPercent(str) {
	var resultStr = "";

	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null) return null;

	// Make sure the argument is a string
	str += "";
	str = Trim( str )

	// remove extra leading zeros
	//while (str.charAt(0) == "0" && str.charAt(1) != "." && str.length > 1) {
	while (str.charAt(0) == "0" && str.length > 1) {
		str = str.substring(1,str.length)
	}

	// Get the index of any decimal point, and any percent sign
	idx = str.indexOf(".");	
	idy = str.indexOf("%");	
//	if (idx > 0) return null // x.xx format
	if (idx == 0 && str.length == 1) return null // . format
//	if (idx == 0 && idy >= 0) return null // mixed .xx% format
	if (idy == 0) return null // % format
//	if (idy > 2) return null // xxx% format

//	if (idx == 0) {
//		if (str.length == 2) str += "0"
//		str = str.substring(1, 3);
//	}

	if (idy >= 0) str = str.substring(0, idy); // remove "%"

	inputPercent = parseFloat(str)
	if (isNaN(inputPercent)) return null
	if (inputPercent < 0 || inputPercent > 99) return null //unreasonable value
	resultStr = "" + inputPercent + "%"
	return resultStr;
} 

/* ======================================================================
FUNCTION:	isDate 
INPUT:  	str - a string to be tested.
RETURN: 	A string containing a formatted date value;
			Returns null if invalid arguments were passed.
DESC:		This function reformats a date string.  
====================================================================== */
function isDate(str) {
	var resultStr = "";
	var dateObject
	var dateParts
	var thisYear
	var theDay
	var inputYear
	var theMonths
	var theMonthsArray
	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null) return null;
	// Make sure the argument is a string
	str += "";
	str = Trim( str )

	dateObject = new Date() //get todays date
	FixDateObject(dateObject)
	thisYear = dateObject.getYear()
	thisYear = (thisYear < 1000 ? thisYear + 1900 : thisYear);

	theMonths =	"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec"
	theMonthsArray = theMonths.split(",")
	// Get the index of any slash.
	// If there is a slash, assume mm/dd/yyyy format
	idx = str.indexOf("/");	
	if (idx >= 0) {
		dateParts = str.split("/")
		dateParts[0] = Trim( dateParts[0])
		dateParts[1] = Trim( dateParts[1])
		dateParts[2] = Trim( dateParts[2])
		if (dateParts[0] < 1 || dateParts[0] > 12) return null
		if (dateParts[1] < 1 || dateParts[1] > 31) return null
		inputYear = parseInt(dateParts[2])
		if (isNaN(inputYear))  return null
		inputYear = (inputYear < 1000 ? inputYear + 1900 : inputYear);
		dateParts[2] = "" + inputYear
		if (dateParts[2] < 1890 || dateParts[2] > thisYear) return null
	 } else { // assume Month Day, Year format
		dateParts = str.split(" ")
		for (i=0;i++;i<12) {
			if (theMonthsArray[i].toLowerCase()==dateParts[0].substring(0,3).toLowerCase()) {
				dateParts[0] = "" + i + 1
				break
			}
		}
		if (i == 12) return null
		idx = dateParts[1].indexOf(",");	
		if (idx >= 0) {
			//theDay = "" + dateParts[1] //make string
			dateParts[1] = dateParts[1].substring(0,idx)
		}
		if (dateParts[1] < 1 || dateParts[1] > 31) return null
		if (dateParts[2] < 1890 || dateParts[2] > thisYear) return null
	 }
	resultStr = "" + theMonthsArray[dateParts[0] - 1]  + " " + dateParts[1] + ", " + dateParts[2]
	return resultStr;
}

/* ======================================================================
FUNCTION:	isCurrency 
INPUT:  	str - a string to be tested.
			addDollarSign - boolean is true if dollar sign to be added.
RETURN: 	A string containing a formatted currency value in dollars;
			Returns null if invalid arguments were passed.
DESC:		This function reformats a currency string.  
			It is useful for placing dollar signs, commas,
			into currency strings. Negative amounts get leading dash.
			Whole dollar amounts only; cents are truncated.
====================================================================== */
function isCurrency(str, addDollarSign) {
	var resultStr = "";
	var outStr = "";
	var	isMinus = false

	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null) return null;

	// Default addDollarSign to false when undefined or null
	//if (addDollarSign+"" == "undefined" || addDollarSign+"" == "null")	
	//    addDollarSign = false;
	addDollarSign = addDollarSign || false;

	// Make sure the argument is a string
	str += "";

	str = Trim( str )

	if (str.charAt(0) == "-") {
		isMinus = true
		str = str.substring(1,str.length)
	} else if ((str.charAt(0) == "(") && (str.charAt(str.length-1) == ")")) {
		isMinus = true
		str = str.substring(1,str.length)
		str = str.substring(0,str.length-1)
	}

	while (str.charAt(0) == "0" && str.length > 1) {
		str = str.substring(1,str.length)
	}

	// Get the index of any decimal point.
	// If there is a decimal point, strip it
	idx = str.indexOf(".");	
	if (idx >= 0)
		str = str.substring(0, idx);

	// Loop through entire string, adding each character from the original
	// string if it is a number, removing dollar signs, commas.
	for (var i=0; i < str.length; i++)
	{
		if ( (str.charAt(i) >= "0") && (str.charAt(i) <= "9") )
			resultStr += str.charAt(i);
		else if (!((str.charAt(i) == "$") || (str.charAt(i) == ",")))
			return null; 
	} // end for loop

	if (resultStr.length == 0) return null; 

	// Format output string
	if (isMinus) outStr = "-"

	if (addDollarSign) outStr += "$"

	// Insert commas
	if (resultStr.length > 3) {
		var x = resultStr.length % 3 //length of first chunck
		if (x > 0) outStr += resultStr.substring(0, x) + ","
		resultStr = resultStr.substring(x, resultStr.length)
		while (resultStr.length > 3) {
			outStr += resultStr.substring(0, 3) + ","
			resultStr = resultStr.substring(3, resultStr.length)
		}
	}
	outStr += resultStr

	return outStr;
}

/* ======================================================================
FUNCTION:	isAge 
INPUT:  	str - a string to be tested.
RETURN: 	A string containing a formatted age value;
			Returns null if invalid arguments were passed.
DESC:		This function reformats a age string.  
====================================================================== */
function isAge(str) {
	var inputAge
	var resultStr = "";
	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null) return null;
	// Make sure the argument is a string
	str += "";
	str = Trim( str )
	inputAge = parseInt(str)
	if (isNaN(inputAge)) return null
	if (inputAge < 5 || inputAge > 120) return null //unreasonable value
	resultStr = "" + inputAge
	return resultStr;
}

/* ======================================================================
FUNCTION:	isName 
INPUT:  	str - a string to be tested.
RETURN: 	A string containing a name value;
			Returns null if invalid arguments were passed.
DESC:		This function reformats a name string.  
====================================================================== */
function isName(str) {
	var resultStr = "";
	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null) return null;
	// Make sure the argument is a string
	str += "";
	str = Trim( str )
	resultStr = "" + str
	return resultStr;
}

/* ======================================================================
FUNCTION:	isYear 
INPUT:  	str - a string to be tested.
RETURN: 	A string containing a formatted year value;
			Returns null if invalid arguments were passed.
DESC:		This function reformats a year string.  
====================================================================== */
function isYear(str) {
	var inputYear
	var resultStr = "";
	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null) return null;
	// Make sure the argument is a string
	str += "";
	str = Trim( str )
	inputYear = parseInt(str)
	if (isNaN(inputYear)) return null
	if (inputYear < 1900 || inputYear > 2200) return null //unreasonable value
	resultStr = "" + inputYear
	return resultStr;
}

/* ======================================================================
FUNCTION:	TrimLeft
 INPUT:  	str : the string to be altered
RETURN: 	A string with no leading spaces;
			returns null if invalid arguments were passed.
DESC:		This function removes all leading spaces from a string.
====================================================================== */
function TrimLeft( str ) {
	var resultStr = "";
	var i = len = 0;
	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null)	
		return null;
	// Make sure the argument is a string
	str += "";
	if (str.length == 0) 
		resultStr = "";
	else {	
		// Loop through string starting at the beginning as long as there
		// are spaces.
		len = str.length;		
		while ((i < len) && (str.charAt(i) == " "))
			i++;
	// When the loop is done, we're sitting at the first non-space char,
	// so return that char plus the remaining chars of the string.
	resultStr = str.substring(i, len);
	}
	return resultStr;
}

/* ======================================================================
FUNCTION:	TrimRight 
INPUT:  	str : the string to be altered
RETURN: 	A string with no trailing spaces;
			returns null if invalid arguments were passed.
DESC:		This function removes all trailing spaces from a string.
====================================================================== */
function TrimRight( str ) {
	var resultStr = "";
	var i = 0;
	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null)	
		return null;
	// Make sure the argument is a string
	str += "";
	if (str.length == 0) 
		resultStr = "";
	else {
		// Loop through string starting at the end as long as there
		// are spaces.
		i = str.length - 1;
		while ((i >= 0) && (str.charAt(i) == " "))
			i--; 			
		// When the loop is done, we're sitting at the last non-space char,
		// so return that char plus all previous chars of the string.
		resultStr = str.substring(0, i + 1);
	}  	
	return resultStr;  	
}

/* ======================================================================
FUNCTION:	Trim 
INPUT:  	str : the string to be altered
RETURN: 	A string with no leading or trailing spaces;
			returns null if invalid arguments were passed.
DESC:		This function removes all leading and tralining spaces from a string.
CALLS:		This function depends on the functions TrimLeft & TrimRight
			They must be included in order for this function to work properly.
====================================================================== */
function Trim( str ) {
	var resultStr = "";
	resultStr = TrimLeft(str);
	resultStr = TrimRight(resultStr);	
	return resultStr;
}

/* ======================================================================
Function to correct for 2.x Mac date bug.
Call this function only once for any given date object, prior to using it.
======================================================================= */
function FixDateObject (date) {
	var base = new Date(0)
	var skew = base.getTime() // should be zero except on the Mac
	if (skew > 0) {
		date.setTime(date.getTime() - skew)
	}
}
