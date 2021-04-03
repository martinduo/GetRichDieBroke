function buildSavings(node) {
    var testText = [];
    var bigHtml = [];
    var html;
    var sectionData = {};
    var theText = ""

    getSwatchColor(14, 15); //define range of colors

    html = buildPageTitle(title3);
    bigHtml.push(html);

    html = startColorBackground();
    theText = '<span class="page-lead">\n';
    theText += 'This page gets information about your taxable financial assets.\n';
    theText += '</span>\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    theText = '<span class="married">All of your accounts and all of your spouse\'s accounts are combined in to one joint account for the purposes of this forecast.\n</span>';
    theText += 'These are not your IRA or 401k accounts.\n';
    theText += 'This is the sum of all your taxable savings accounts,\n';
    theText += 'brokerage accounts, and money market accounts.\n';
    theText += 'In these accounts, each year\'s earnings are taxed\n';
    theText += 'at your effective tax rate before being added to the\n';
    theText += 'account balance. These accounts are the first to be\n';
    theText += 'used for withdrawals to meet your yearly retirement\n';
    theText += 'expenses. This leaves your tax-sheltered accounts to\n';
    theText += 'grow for as long as possible.\n';
    theText += 'This is the best strategy to maximize your retirement wealth.\n';
    sectionData.houseData = true;
    //sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Current value of all taxable accounts";
    sectionData.dataName = "normbal";
    sectionData.promptText = '<span class="single">Current value of all<br/>taxable accounts:</span>';
    sectionData.promptText += '<span class="married">Current value of all<br/>taxable accounts:</span>';
    //sectionData.promptText += '<span class="married">Combined current<br/>value of all tax<br/>normal accounts:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = 'These are not your IRA or 401k savings.\n';
    theText += 'These are additional savings you are adding to your taxable accounts until retirement.\n';
    //theText += 'Enter the amount you are saving each year until retirement.\n';
    theText += 'Enter the amount you are saving this year. This amount is increased each year to account for the entered inflation rate.\n';   


    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly amount of savings in to these accounts until retirement";
    sectionData.dataName = "normsaveamount";
    //sectionData.promptText = "Yearly amount of savings for<br/>these accounts until retirement:";
    sectionData.promptText = '<span class="single">Yearly savings for<br/>these accounts<br/>until retirement:</span>';
    sectionData.promptText += '<span class="married">Yearly amount of savings for<br/>these accounts until retirement:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    theText = 'If you plan to sell your house and move to another, you may have\n';
    theText += 'money left over to add to your asset accounts. Or you may have\n';
    theText += 'knowledge of some other windfall amount becoming available. Enter the net deposit amount.\n';
    sectionData.houseData = true;
    //sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Lump sum windfall";
    sectionData.dataName = "lumpsum";
    sectionData.promptText = "Lump sum windfall:";
    //sectionData.promptText = '<span class="single">xxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxx<br/>xxxxxxxxxxxxxxxxxx:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = 'Enter the year of the deposit into your tax normal asset account.\n';
    theText += 'The program assumes investment earnings on this amount begin in the next year.\n';
    theText += '<br/>&nbsp;<br/>\n';
    sectionData.houseData = true;
    //sectionData.houseData = false;
    sectionData.testCode = editYear;
    sectionData.testPrompt = "Year windfall obtained";
    sectionData.dataName = "lumpsumyear";
    sectionData.promptText = "Year windfall obtained:";
    //sectionData.promptText = '<span class="single">xxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxx<br/>xxxxxxxxxxxxxxxxxx:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    var testHtml = testText.join(''); //for test inspection of complete html 

    //MSApp.execUnsafeLocalFunction(function () { node.append(bigHtml.join('')); }); //Win8 App fix //node.append(html);
    //MYAppAppendHTML(node, bigHtml.join(' '));
    MYAppInsertHTML(node, bigHtml.join(' '));

}