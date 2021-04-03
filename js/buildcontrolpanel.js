function buildContolPanel() {
    "use strict";
    //use the in-memory calulation value and convert to the in-storage value as displayed to user
    var displayRoiRate = roundNumber(HouseObject.globalroi * 100, 1);
    var displayColaRate = roundNumber(HouseObject.cola * 100, 1);
    var displayTaxRate = roundNumber(HouseObject.taxrate * 100, 1);

    var currentRoiPrecision = 10; // this is the max readout number
    var currentColaPrecision = 16; // this is the max readout number
    var currentTaxPrecision = 45; // this is the max readout number

    //display current value to user
    $("#roirate").val(" " + isPercent(displayRoiRate)); //use the in-storage value
    $("#colarate").val(" " + isPercent(displayColaRate)); //use the in-storage value
    $("#taxrate").val(" " + isPercent(displayTaxRate)); //use the in-storage value

    //if (!$(".mySlider div i").hasClass("fa-square")) { //append once only
    //    $(".mySlider").append('<div class="ui-slider-handle"><i class="fa fa-square fa-2x"></i></div>');
    //}

    //start the sliders

    var $roirate = $("#roirate");
    var $roihandle = $("#roi-handle");
    var $roitext = $("#roitext");
    //var roiActive = true;
    var roiSlider = new Dragdealer('roi-slider', {
        slide: false,
        horizontal: true,
        vertical: false,
        x: displayRoiRate / currentRoiPrecision, //set slider's start position
        //xPrecision: currentRoiPrecision, // this is the max readout number
        animationCallback: function (x, y) { // x == the fraction of the xPrecision
            var m = isPercent(roundNumber(x * currentRoiPrecision, 1)); // m == the readout number
            $roirate.val(" " + m); //show animated value in text box
            $roihandle.text(m); //show animated value in slider handle
            $roitext.removeClass('hideContent');
        },
        callback: function (x, y) { // x == final position
            var testNewRate = true;
            var m = isPercent(roundNumber(x * currentRoiPrecision, 1)); // m == the readout number
            $roirate.val(" " + m); //show final value in text box
            $roihandle.text(m); //show final value in slider handle
            $roitext.addClass('hideContent');
            MYAppInsertHTML($("#roi-prompt"), "Changed ROI:");
            $("#roi-prompt").css('color', 'red');
            redrawCharts(testNewRate);
        },
    });
    $roitext.addClass('hideContent'); //retore initial condition
    $roihandle.text(isPercent(displayRoiRate)); //show start value in slider handle

    var $colarate = $("#colarate");
    var $colahandle = $("#cola-handle");
    var $colatext = $("#colatext");

    //$("#colaSlider").slider({
    //    value: displayColaRate*10, //bump up the user's number by 10 times
    //    max: 160, //max rate is 16%
    //    min: 0,
    //    start: function (event, ui) {
    //        //$colatext.removeClass('hideContent'); //show text box by removing the visibility:hidden condition
    //        //$colatext.fadeIn('fast');   //show text box 
    //    },
    //    slide: function (event, ui) {
    //        var m = " " + isPercent(ui.value/10); //scale the slider's value
    //        $colarate.val(" " + m); //show animated user's value in text box
    //    },
    //    stop: function (event, ui) {
    //        var m = " " + isPercent(ui.value / 10); //scale the slider's value
    //        $colarate.val(" " + m); //show animated user's value in text box
    //        redrawCharts();
    //        //$("#colatext").addClass('hideContent'); //retore initial visibility:hidden condition
    //        //$colatext.fadeOut('fast');   //retore initial condition
    //    },
    //});

    var colaSlider = new Dragdealer('cola-slider', {
        slide: false,
        horizontal: true,
        vertical: false,
        x: displayColaRate / currentColaPrecision, //set slider's start position
        //xPrecision: currentColaPrecision, // this is the max readout number
        animationCallback: function (x, y) { // x == the fraction of the xPrecision
            var m = isPercent(roundNumber(x * currentColaPrecision, 1)); // m == the readout number
            $colarate.val(" " + m); //show animated value in text box
            $colahandle.text(m); //show animated value in slider handle
            $colatext.removeClass('hideContent');
        },
        callback: function (x, y) { // x == final position
            var testNewRate = true;
            var m = isPercent(roundNumber(x * currentColaPrecision, 1)); // m == the readout number
            $colarate.val(" " + m); //show final value in text box
            $colahandle.text(m); //show final value in slider handle
            $colatext.addClass('hideContent');
            MYAppInsertHTML($("#cola-prompt"), "Changed COLA:");
            $("#cola-prompt").css('color', 'red');
            redrawCharts(testNewRate);
        },
    });
    $colatext.addClass('hideContent'); //retore initial condition
    $colahandle.text(isPercent(displayColaRate)); //show start value in slider handle

    var $taxrate = $("#taxrate");
    var $taxhandle = $("#tax-handle");
    var $taxtext = $("#taxtext");

    var taxSlider = new Dragdealer('tax-slider', {
        slide: false,
        horizontal: true,
        vertical: false,
        x: displayTaxRate / currentTaxPrecision, //set slider's start position
        //xPrecision: currentTaxPrecision, // this is the max readout number
        animationCallback: function (x, y) { // x == the fraction of the xPrecision
            var m = isPercent(roundNumber(x * currentTaxPrecision, 1)); // m == the readout number
            $taxrate.val(" " + m); //show animated value in text box
            $taxhandle.text(m); //show animated value in slider handle
            $taxtext.removeClass('hideContent');
        },
        callback: function (x, y) { // x == final position
            var testNewRate = true;
            var m = isPercent(roundNumber(x * currentTaxPrecision, 1)); // m == the readout number
            $taxrate.val(" " + m); //show final value in text box
            $taxhandle.text(m); //show final value in slider handle
            $taxtext.addClass('hideContent');
            MYAppInsertHTML($("#tax-prompt"), "Changed TAX:");
            $("#tax-prompt").css('color', 'red');
            redrawCharts(testNewRate);
        },
    });
    $taxtext.addClass('hideContent'); //retore initial condition
    $taxhandle.text(isPercent(displayTaxRate)); //show start value in slider handle


    function redrawCharts() {
        "use strict";
        //NOTE: Data item values are changed preparing charts to appropriate values for calculations: 
        //e.g. the "globalroi" value of "4%" is changed to "0.04" for use in the calculations.
        //But the stored values in the local data storage are not changed.
        //Therefore when the user goes "Back" to the home page, all values are restored from the saved data:
        //e.g. the "globalroi" value is restored to the user's string "4%"
        //IMPORTANT: No calls to saveAppData() function are ever made from the "charts" page, as
        //the modified calculation rate values are not the same as the user's saved values.
        //Recover the saved canned demo app data to restore the user's values for tax, roi, cola, etc 
        //so that the calculation math can correctly convert to rate fractions by dividing by 100

        recoverAppData(currentLocalStorageKey); //read from local storage
        setTimeout(function () { redrawChartsPage(); }, 100) //let the dom changes settle
        //redrawChartsPage();
    }


    ////***************************************************************************************
    //var testSlider = new Dragdealer('just-a-slider', {
    //    top: 5,
    //    bottom:5,
    //    horizontal: true,
    //    vertical: false,
    //    x: displayTaxRate / currentTaxPrecision, //set slider's start position
    //    //xPrecision: .35, //currentTaxPrecision, // this is the max readout number
    //    animationCallback: function (x, y) {
    //        $('#just-a-slider .value').text(Math.round(x * currentTaxPrecision));
    //    }
    //});
    ////testSlider.reflow;
    ////testSlider.setValue(.33, 0, false);
    ////***************************************************************************************
    //adjustPrompts();


    //function adjustPrompts() {
    //$("#roitext").text("Test");
    //$("#colatext").text("Test");
    //$("#taxtext").text("Test");
    //if (window.outerWidth < 1280) {
    //    $("#roitext").text("Slide To Change");
    //    $("#colatext").text("Slide To Change");
    //    $("#taxtext").text("Slide To Change");
    //} else {
    //    $("#roitext").text("Change Earnings (ROI) Rate And See The Effect");
    //    $("#colatext").text("See What A Different Inflation (COLA) Rate Does");
    //    $("#taxtext").text("Check Out How A New Tax Rate Affects Things");
    //}
    //}

}