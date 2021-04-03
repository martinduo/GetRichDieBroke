function buildIncome(node) {
    var testText = [];
    var html;
    var bigHtml = [];
    var sectionData = {};
    var theText = ""

    getSwatchColor(14, 15); //define range of colors

    html = buildPageTitle(title5);
    bigHtml.push(html);

    html = startColorBackground();
    theText = '<span class="page-lead">\n';
    theText += 'This page gets information about any income and benefits paid to you during retirement.\n';
    theText += '</span>\n';
    theText += 'Any retirement income and benefits reduce the\n';
    theText += 'withdrawals needed from your asset accounts for your retirement living expenses.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing
    var temp1 = testText.join(''); //for test

    html = startColorBackground();
    theText = 'This pension benefit income is used for\n';
    theText += 'your retirement living expenses.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly pension benefit";
    sectionData.dataName = "normpension";
    sectionData.promptText = "Yearly pension benefit at retirement:";
    //sectionData.promptText = '<span class="single">xxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxx<br/>xxxxxxxxxxxxxxxxxx:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing
    var temp2 = testText.join(''); //for test

    html = startMarriedColorBackground();
    theText = "The contingency beneficiary percentage determines how much of one's pension\n";
    theText += 'benefit amount continues to be paid for the benefit of the surviving spouse.\n';
    sectionData.houseData = false;
    sectionData.testCode = editPercent;
    sectionData.testPrompt = "Pension contingency beneficiary percentage";
    sectionData.dataName = "pensionpercent";
    //sectionData.promptText = "xxxxxxxxxxxxxxxxxx:";
    sectionData.promptText = '<span class="single">Pension\'s contingency beneficiary percentage:</span>';
    sectionData.promptText += '<span class="married">Pension\'s contingency<br/>beneficiary percentage:</span>';
    sectionData.inputExplaination = theText;
    html += buildMarriedInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    //html = startMarriedColorBackground();
    //theText = 'When retirement starts while the other spouse continues working,\n';
    //theText += 'the other spouse\'s income will reduce the withdrawals needed\n';
    //theText += 'from your investment accounts. Enter the income amount.\n';
    //sectionData.houseData = false;
    //sectionData.testCode = editDollars;
    //sectionData.testPrompt = "Yearly earnings from other spouse";
    //sectionData.dataName = "spousesalary";
    //sectionData.promptText = "Yearly earnings of<br/>other spouse until<br/>that spouse retires:";
    ////sectionData.promptText = '<span class="single">xxxxxxxxxxxxxxxxxx:</span>';
    ////sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxx<br/>xxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.inputExplaination = theText;
    //html += buildSpouseInputSection(sectionData);
    //html += '<br/>' + endColorBackground();
    //bigHtml.push(html);
    ////MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    //testText.push(html); //testing

    html = startColorBackground();
    theText = 'This income benefit is used for your retirement living expenses.\n';    
    //theText += 'This income amount depends on when you elect to start.\n';
    theText += 'This income amount is increased each year to account for the entered inflation rate.\n'; 
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly social security benefit";
    sectionData.dataName = "ssbenefit";
    //sectionData.promptText = "xxxxxxxxxxxxxxxxxx:";
    sectionData.promptText = '<span class="single">Yearly social<br/>security benefit:</span>';
    sectionData.promptText += '<span class="married">Yearly social security benefit:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = 'Your benefit amount depends on the age you decide to start the benefits.\n';
    theText += 'Enter the age you will start your social security benefits.\n';
    sectionData.houseData = false;
    sectionData.testCode = editAge;
    sectionData.testPrompt = "Starting at age";
    sectionData.dataName = "ssbenefitstartage";
    //sectionData.promptText = "Social security starts at age:";
    sectionData.promptText = '<span class="single">Social security<br/>starts at age:</span>';
    sectionData.promptText += '<span class="married">Social security starts at age:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing


    html = startColorBackground();
    theText = 'An annuity is an insurance product that pays benefits over your lifetime.\n';
    //theText += 'The tax liability of this benefit payment depends on how the annuity was funded.\n';
    theText += 'Enter the amount of this benefit here.\n';
    theText += 'This benefit is used for your retirement living expenses.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly annuity benefits";
    sectionData.dataName = "annuity";
    //sectionData.promptText = "Yearly annuity benefits for retirement:";
    sectionData.promptText = '<span class="single">Yearly annuity benefits<br/>for retirement:</span>';
    sectionData.promptText += '<span class="married">Yearly annuity benefits for retirement:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = 'Annuity benefits can be purchased to begin at any age.\n';
    theText += 'Variable annuities have a tax penalty for withdrawals before age 59 1/2.\n';
    sectionData.houseData = false;
    sectionData.testCode = editAge;
    sectionData.testPrompt = "Annuity benefits begin at age";
    sectionData.dataName = "annuityage";
    //sectionData.promptText = "Annuity benefits begin at age:";
    sectionData.promptText = '<span class="single">Annuity benefits<br/>begin at age:</span>';
    sectionData.promptText += '<span class="married">Annuity benefits begin at age:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    theText = 'If you plan on earning some income while retired, the earned\n';
    theText += 'amount will reduce the withdrawals needed from your investment accounts.\n';
    theText += 'You might also have income paid from a trust fund. Enter the income amount.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly income while retired";
    sectionData.dataName = "income";
    //sectionData.promptText = "Yearly income while retired:";
    sectionData.promptText = '<span class="single">Yearly income<br/>while retired:</span>';
    sectionData.promptText += '<span class="married">Yearly income while retired:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = 'You won\'t want to plan on working for your whole retirement,\n';
    theText += 'so if this is not trust fund income, choose a realistic period for your activity.\n';
    sectionData.houseData = false;
    sectionData.testCode = editAge;
    sectionData.testPrompt = "Starting at age";
    sectionData.dataName = "incomestartage";
    sectionData.promptText = "Starting at age:";
    //sectionData.promptText = '<span class="single">xxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxx<br/>xxxxxxxxxxxxxxxxxx:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = 'If this income is from a trust and continues throughout your lifetime,\n';
    theText += 'leave this last entry blank.\n';
    sectionData.houseData = false;
    sectionData.testCode = editAge;
    sectionData.testPrompt = "Ending at age";
    sectionData.dataName = "incomeendage";
    sectionData.promptText = "Ending at age:";
    //sectionData.promptText = '<span class="single">xxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxx<br/>xxxxxxxxxxxxxxxxxx:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    //theText = '<img src="images/dotclear.gif" width="10" height="1">\n';
    theText = '<span class="paragraph-lead">A Note About Income And Benefit Calculations.</span>\n';
    theText += 'Income and benefit amounts are added  in to the calculations at the end of each year.\n';
    theText += 'So these values are used, along with your other accounts, to accumulate the payout for your next year\'s retirement living expenses.\n';
    theText += 'In real-life you will have these amounts paid monthly throughout the year, but this is good enough for these approximate projections.\n';
    theText += '<br/>&nbsp;<br/>\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    // --------Template for specifying the html layout
    //theText = 'xxxxxxx\n';
    //theText += 'xxxxxx.\n';
    //sectionData.houseData = false;
    //sectionData.testCode = editDollars;
    //sectionData.testPrompt = "xxxxxxxxxxxxxxxxxx";
    //sectionData.dataName = "payoutliving";
    //sectionData.promptText = "xxxxxxxxxxxxxxxxxx:";
    //sectionData.promptText = '<span class="single">xxxxxxxxxx<br/>xxxxxxxx:</span>';
    //sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.inputExplaination = theText;
    //html = buildInputSection(sectionData);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    //testText.push(html); //testing
    // --------Template for specifying the html layout

    var testHtml = testText.join(''); //for test inspection of complete html 

    //MSApp.execUnsafeLocalFunction(function () { node.append(bigHtml.join('')); }); //Win8 App fix //node.append(html);
    //MYAppAppendHTML(node, bigHtml.join(' '));
    MYAppInsertHTML(node, bigHtml.join(' '));
}