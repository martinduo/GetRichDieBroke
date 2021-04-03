function buildIras(node) {
    var testText = [];
    var html;
    var bigHtml = [];
    var sectionData = {};
    var theText = ""
    var testingText = [];

    getSwatchColor(14, 15); //define range of colors

    html = buildPageTitle(title4);
    bigHtml.push(html);

    //After Doing The bigHtml.push(html), Start New Section With New Color
    html = startColorBackground();
    theText = '<span class="page-lead">\n';
    theText += 'This page gets information about your tax-sheltered assets.\n';
    //theText += 'financial assets.\n';
    theText += '</span>\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    //After Doing The bigHtml.push(html), Start New Section With New Color
    html = startColorBackground();
    theText = 'Ths is the sum of all your tax-deferred IRA accounts.\n';
    theText += 'In these accounts, each year\'s earnings are added to the\n';
    theText += 'account balance without being taxed. Withdrawals are\n';
    theText += 'taxed when taken out.\n';
    theText += 'These accounts are used secondly, after your taxable\n';
    theText += 'accounts, to obtain the yearly amount required to meet your\n';
    theText += 'retirement living expenses.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Current value of all normal IRA accounts";
    sectionData.dataName = "irabal";
    sectionData.promptText = "Current value of all normal IRA accounts:";
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = '';
    //theText += 'Enter the amount you are contributing each year until retirement.\n';
    theText += 'Enter the amount you are contributing this year. This amount is increased each year to account for the entered inflation rate.\n';
    theText += 'These are your yearly IRA contributions.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly amount of normal IRA contributions until retirement";
    sectionData.dataName = "irasaveamount";
    sectionData.promptText = '<span class="single">Yearly normal<br/>IRA contributions<br/>until retirement</span>';
    sectionData.promptText += '<span class="married">Yearly amount of normal IRA<br/>contributions until retirement:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    //theText = '<img src="images/dotclear.gif" width="10" height="1">\n';
    theText = '<span class="paragraph-lead">A Note About Minimum IRA Withdrawals.</span>\n';
    theText += 'After age 70 1/2, the IRS requires a certain minimum amount to be\n';
    theText += 'withdrawn yearly from normal IRA\'s.\n';
    theText += 'This program will do this automatically.\n';
    theText += 'If this withdrawal results in more money left\n';
    theText += 'after taxes than is needed for your yearly retirement living expenses,\n';
    theText += 'the extra amount is deposited in your \n';
    theText += 'taxable account.\n';
    theText += 'This program uses the Single Life Expectancy(SLE) table from the IRS\n';
    theText += 'to determine the minimum withdrawal amount for each year.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    //After Doing The bigHtml.push(html), Start New Section With New Color
    html = startColorBackground();
    theText = 'Ths is the sum of all your tax-free Roth IRA accounts.\n';
    theText += 'In these accounts, each year\'s earnings are added to the\n';
    theText += 'account balance without being taxed. Withdrawals are\n';
    theText += 'taken out tax free after age 59 1/2.\n';
    theText += 'These accounts are used lastly, after your normal IRA\n';
    theText += 'accounts, to obtain the yearly amount required to meet your\n';
    theText += 'retirement living expenses.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Current value of all Roth IRA accounts";
    sectionData.dataName = "rothbal";
    sectionData.promptText = "Current value of all Roth IRA accounts:";
    //sectionData.promptText = '<span class="single">xxxxxxxxxxxxxxxxxx:</span>';
    //sectionData.promptText += '<span class="married">xxxxxxxxxxxxxxxxxx<br/>xxxxxxxxxxxxxxxxxx:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = '';
    //theText += 'Enter the amount you are contributing each year until retirement.\n';
    theText += 'Enter the amount you are contributing this year. This amount is increased each year to account for the entered inflation rate.\n';
    theText += 'These are your yearly Roth IRA contributions.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly amount of Roth IRA contributions until retirement";
    sectionData.dataName = "rothsaveamount";
    sectionData.promptText = '<span class="single">Yearly Roth<br/>IRA contributions<br/>until retirement</span>';
    sectionData.promptText += '<span class="married">Yearly amount of Roth IRA<br/>contributions until retirement:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    //theText = '<img src="images/dotclear.gif" width="10" height="1">\n';
    theText = '<span class="paragraph-lead">A Note About Roth IRA Withdrawals.</span>\n';
    theText += 'There is no requirement for minimum withdrawals from Roth IRA\'s.\n';
    theText += 'And money withdrawn is not taxed. Money in your Roth IRA\'s is left\n';
    theText += 'untouched for as long as possible, to get the maximum benefit from\n';
    theText += 'the tax free growth of this asset.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    //After Doing The bigHtml.push(html), Start New Section With New Color
    html = startColorBackground();
    theText = 'This is your employer provided tax-sheltered savings plan.\n';
    theText += 'In these accounts, each year\'s earnings are added to the\n';
    theText += 'account balance without being taxed.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Current value of 401(k) plan account";
    sectionData.dataName = "x401bal";
    sectionData.promptText = '<span class="single">Current value of<br/>401(k) plan account:</span>';
    sectionData.promptText += '<span class="married">Current value of 401(k) plan account:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    theText = '';
    //theText += 'Enter the total amount contributed each year until retirement.\n';
    theText += 'Enter the total amount that is contributed this year. This amount is increased each year using the entered inflation rate, which assumes your salary increases accordingly.\n';
    theText += 'This is your own contribution, deducted from your pay, plus the\n';
    theText += 'amount contributed by your employer.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly amount of 401(k) plan contributions until retirement";
    sectionData.dataName = "x401saveamount";
    //sectionData.promptText = "Starting amount of 401(k) plan<br/>contributions until retirement:";
    sectionData.promptText = '<span class="single">Yearly 401(k) plan<br/>contributions<br/>until retirement:</span>';
    sectionData.promptText += '<span class="married">Yearly amount of 401(k) plan<br/>contributions until retirement:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    //theText = '<img src="images/dotclear.gif" width="10" height="1">\n';
    theText = '<span class="paragraph-lead">A Note About 401(k) Plan Rollover Into IRA.</span>\n';
    theText += 'When you retire, your 401(k) plan account balance is put into your normal IRA account.\n';
    theText += 'No taxes are paid on this rollover, and the entire balance goes to your IRA account.\n';
    theText += '<br/>&nbsp;<br/>\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //--BCM--Win8 App fix //node.append(html);
    testText.push(html); //testing

    var testHtml = testText.join(''); //for test inspection of complete html 

    //After Doing The bigHtml.push(html), Do The node.append(bigHtml.join(''))
    //MSApp.execUnsafeLocalFunction(function () { node.append(bigHtml.join('')); }); //Win8 App fix //
    //MYAppAppendHTML(node, bigHtml.join(''));
    MYAppInsertHTML(node, bigHtml.join(' '));

}