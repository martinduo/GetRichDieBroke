function buildGeneral(node) {
    var testText = [];
    var html;
    var bigHtml = [];
    var sectionData = {};
    var theText = ""
    var testingText = [];

    getSwatchColor(14, 15); //define range of colors

    html = buildPageTitle(title2);
    bigHtml.push(html);

    html = startColorBackground();
    html += buildCheckboxSection("t0married", getSpouseData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    theText = '<span class="paragraph-lead">Get Rich, Die Broke</span>.\n';
    //theText += 'Well, maybe that\'s an exaggeration.\n';
    //theText += 'But a new, unconventional wisdom says your wealth should be spent\n';
    theText += 'A new, unconventional wisdom says your wealth should be spent\n';
    theText += 'while you\'re alive, on yourself and your loved ones.\n';
    //theText += 'while you\'re alive, either on yourself or your loved ones.\n';
    theText += 'Plan your retirement spending so that your wealth lasts to provide your desired life style.\n';
    //theText += 'You should plan your retirement spending to make sure your wealth provides for your desired life style.\n';
    theText += '<p>';
    //theText += 'Test your assumptions here.\n';
    //theText += 'Your assumptions are used with the financial data you enter below and in the other pages to calculate your retirement forecast.\n';
    theText += 'Your assumptions and the financial data you enter below are used to calculate your retirement cashflow.\n';
    theText += 'Can you fund your retirement and\n';
    theText += 'not run out of money too soon, or not leave too much?\n';
    //theText += 'not run out of money too soon, or not leave too much after you die?\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    theText = 'This is the net, after-tax, cash-in-hand\n';
    theText += 'amount, in today\'s dollars, you need for your retirement life style expenses.\n';
    theText += 'This amount will be adjusted\n';
    theText += 'upwards yearly to compensate for the inflation rate you assume.';
    theText += 'This amount should not include your planned gifts to loved ones, or other fixed expenses such as mortgage payments.\n';
    sectionData.houseData = true;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly take-home dollars needed for retirement life style";
    sectionData.dataName = "payoutliving";
    sectionData.promptText = "Yearly take-home dollars needed for retirement life style:";
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing
    //testingText.push(html); //testing partial html

    html = startColorBackground();
    theText = 'This is the net, after-tax, cash-in-hand\n';
    theText += 'amount needed for all fixed expenses.\n';
    theText += 'This amount is not adjusted for inflation.\n';
    theText += 'This amount should include house mortgage payments and yearly gift giving to loved ones. Currently (2014) \n';
    theText += '<span class="married">you each</span>\n';
    theText += '<span class="single">you</span>\n';
    theText += 'can give up to $14,000 every\n';
    theText += 'year tax free to each of your loved ones.\n';
    sectionData.houseData = false;
    sectionData.testCode = editDollars;
    sectionData.testPrompt = "Yearly take-home dollars needed for all fixed expenses";
    sectionData.dataName = "payoutgifts";
    sectionData.promptText = '<span class="single">Yearly take-home<br/>dollars needed for<br/>all fixed expenses:</span>';
    sectionData.promptText += '<span class="married">Yearly take-home dollars<br/>needed for all fixed expenses:</span>';
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    testingText.push(html); //testing partial html
    testingText = testingText.join(''); //testing partial html


    html = startColorBackground();
    theText = '<span class="married">The earliest retirement</span>\n';
    theText += '<span class="single">This</span>\n';
    theText += 'is used for the start of your retirement expenses.\n';
    sectionData.houseData = false;
    sectionData.testCode = editAge;
    sectionData.testPrompt = "Retirement start age";
    sectionData.dataName = "retireage";
    sectionData.promptText = "Retirement start age:";
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing


    html = startColorBackground();
    sectionData.testCode = editYear;
    sectionData.testPrompt = "Year you were born";
    sectionData.dataName = "birthyear";
    sectionData.promptText = "Year you were born:";
    sectionData.inputExplaination = '';
    html += buildInputSection(sectionData);
    //bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    //testText.push(html); //testing

    theText = 'The longer you live in retirement, the more money you need.\n';
    theText += 'For a conserative forecast, it\'s best to assume a life to a\n';
    theText += 'ripe old age.\n';
    sectionData.houseData = false;
    sectionData.testCode = editAge;
    sectionData.testPrompt = "Assume a life expectancy up to age";
    sectionData.dataName = "lifeage";
    sectionData.promptText = "Assume a life expectancy up to age:";
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    theText = 'This is your effective tax rate, not your marginal rate.\n';
    theText += 'Don\'t forget to add on your state\'s tax rate.\n';
    theText += 'This rate is used to determine the tax paid from all accounts\n';
    theText += 'where earnings or withdrawals are subject to income tax.\n';
    theText += 'This rate is used on all pension and annuity benefit payments.\n';
    sectionData.houseData = true;
    sectionData.testCode = editPercent;
    sectionData.testPrompt = "Effective tax rate after retirement";
    sectionData.dataName = "taxrate";
    sectionData.promptText = "Effective tax rate<br/>after retirement:"
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing


    html = startColorBackground();
    theText = 'This rate is used to adjust the amount of your yearly retirement\n';
    theText += 'life style expenses to keep up with inflation. The amount is increased\n';
    theText += 'to maintain your purchasing power equivalent to what it is today.\n';
    theText += 'Your yearly withdrawals are increased to account for this inflation rate.\n';

    theText += '<br/>Important Note: The yearly amounts entered for savings deposits, IRA & 401k contributions, and Social Security benefits are all indexed yearly to account for the entered inflation rate. Pensions and annuities are not indexed. You should update your entries yearly to stay in synch with your actual situation.\n';

    sectionData.houseData = true;
    sectionData.testCode = editPercent;
    sectionData.testPrompt = "Estimated yearly rate of inflation";
    sectionData.dataName = "cola";
    sectionData.promptText = "Estimated yearly<br/>rate of inflation:";
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing


    html = startColorBackground();
    theText = 'This is the annual rate of return that is used to calculate the before-tax earnings\n';
    theText += 'in each of your different investment accounts.\n';
    theText += 'For tax normal investment accounts, the after-tax balance of the earnings is added to the account\'s starting balance for the next year.\n';
    theText += 'For tax deferred investment accounts, such as IRAs, the total amount of year-end earnings is added to the account\'s starting balance for the next year.\n';
    //theText += '<p>If you fill in this value, it is used instead of each\n';
    //theText += 'individual account\'s estimated annual rate of return.\n';
    //theText += 'If you leave this value blank, each investment account\'s\n';
    //theText += 'individual estimated annual rate of return is used instead.\n';
    //theText += '<p>Use this value to quickly change your investment earnings assumptions to\n';		
    //theText += 'see the effect on the end result your forecast.\n';
    //theText += 'Leave this value blank if you want to use the individually entered estimated annual rate of return for each investment account on the other pages.\n';
    sectionData.houseData = true;
    sectionData.testCode = editPercent;
    sectionData.testPrompt = "Estimated annual rate of return for all investment accounts";
    sectionData.dataName = "globalroi";
    sectionData.promptText = "Estimated annual<br/>rate of return for all investment accounts:";
    sectionData.inputExplaination = theText;
    html += buildInputSection(sectionData);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    testText.push(html); //testing

    html = startColorBackground();
    //theText = '<img src="images/dotclear.gif" width="10" height="1">\n';
    theText = '<span class="paragraph-lead">A Note About Investment Income Calculations.</span>\n';
    theText += 'The annual rate of return is used to calculate investment income at the end\n';
    theText += 'of each year, starting with this year. If you are entering account balances\n';
    theText += 'near the end of the year, you may already have most of the year\'s earnings\n';
    theText += 'included and the program would add its own earnings calculation. To get a correct\n';
    theText += 'balance at the end of the first year, you can adjust your entry to be\n';
    theText += 'the amount that was in the account at the beginning of the year.\n';
    theText += '<br/>&nbsp;<br/>\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing
    var testHtml = testText.join(''); //for test inspection of complete html 

    //MSApp.execUnsafeLocalFunction(function () { node.append(bigHtml.join('')); }); //Win8 App fix //node.append(html);
    //MYAppAppendHTML(node, bigHtml.join(' '));
    MYAppInsertHTML(node, bigHtml.join(' '));
}
