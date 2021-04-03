function buildIntro(node) {
    var testText = [];
    var html;
    var bigHtml = [];
    var sectionData = {};
    var theText = "";

    getSwatchColor(14, 15); //define range of colors

    html = buildPageTitle(title1);
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    html += '<h2 class="tabData">Get Rich</h2>\n';
    theText = 'To get rich, you must spend less than you earn, and invest the difference. Your goal is to build a nest egg for your retirement. If your employer offers a 401(k) plan with company contributions, you put the maximum amount possible into that plan. And you contribute as much as is allowed to individual IRA accounts. You invest your 401(k) plan, your IRA savings, and your taxable savings in a portfolio of investments tailored to your objectives and you review the performance of these investments periodically.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    html += '<h2 class="tabData">Die Broke</h2>\n';
    theText = 'The conventional wisdom used to be: build your net worth while earning, live frugally in your retirement, and leave an estate to your heirs when you die. Now there is a new wisdom: die broke. This means that you should build your worth while earning and then manage your money while retired to maximize the enjoyment of your retirement life style. Spend down your worth for your own benefit. This can include giving yearly gifts to your loved ones, so they can still receive money from you, and you can enjoy the pleasure of giving these gifts while you are alive. Use your money while you can enjoy it. Leave only enough to settle your affairs.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    html += '<h2 class="tabData">Have An Excellent Retirement In Between</h2>\n';
    theText = 'Plan now for your retirement. Determine a yearly life style budget so that you can have the excellent retirement life style you deserve. But at the same time you do not want to withdraw so much that you run out of money too early. And you do not want to withdraw so little that you stint on your life style and die with large amounts still in your estate.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    html += '<h2 class="tabData">Can You Do It?</h2>\n';
    theText = 'Yes, with planning and follow through. Save now. Invest wisely. Learn about the rules that effect your savings and retirement. To get the maximum benefit from dying broke, you must make sure your wealth is used in the most efficient manner.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    html += '<h2 class="tabData">Test Your Assumptions Here</h2>\n';
    theText = 'This program forecasts the results of your plan using the assumptions you make about your rate of return on investments, the inflation rate, and your income tax rate. Enter these assumptions along with your current financial information, and this program will forecast your future cash flow and net worth. Your goal is to adjust your savings and spending to end up with the desired yearly cash in-hand for your retirement life style along with the desired amount left over in your estate when you die. You may be surprised at the results. You especially should try out different tax rates, different inflation rates, and different rates of investment earnings. They can make dramatic changes in the money available for your retirement life style.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing
    var temp1 = testText.join(''); //for test

    html = startColorBackground();
    html += '<h2 class="tabData">Test Your Assumptions Often</h2>\n';
    //theText = '<img src="images/dotclear.gif" width="20" height="1">'
    theText = 'This program\'s projections use your assumptions of rates (taxes, earnings and inflation) that can change year-to-year. Any small rate change can compound into large differences in results as the years go by. This program can produce projections so far into the future as to be meaningless.\n'; 
    theText += 'It is important that you keep revising this plan yearly. Use current assumptions for rates. Update your current financial account balances. This financial forecast is only a guide to what your future may hold. It needs to be done again and again to keep it up to date.\n';
    theText += 'And you need to adjust your savings and spending to achieve your desired results with your current parameter data.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    html += '<h2 class="tabData">Your Get Rich, Die Broke Charts</h2>\n';
    theText = 'The information presented to you here is for informational purposes only. The information in these forward looking projections is based upon assumptions that involve risks and uncertainties, and actual events or results may differ materially.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    html += '<h2 class="tabData">Privacy Of Your Data</h2>\n';
    theText = 'This program respects your privacy. The information that you enter here is kept in your own computer only. It is not disclosed to any other person or organization. This program saves your information locally for use the next time you use this program.\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    html = startColorBackground();
    //theText = '<br/>&nbsp;<br/>\n';
    theText = '<div class="copy"><span>Reference book: <a href="http://www.getrichslowly.org/blog/2008/07/24/die-broke-spend-til-the-end/" target="_blank">Die Broke: Spend ’til the End</a></span><br />&nbsp;<br /><span>Reference blog: <a href="http://www.bankrate.com/finance/financial-literacy/forget-about-retiring-live-rich-and-die-broke-1.aspx" target="_blank">Forget about retiring, live rich and die broke</a></span><br />&nbsp;<br/><span>Copyright &copy; 2014 by Bruce Martin. All Rights Reserved. </span><br />&nbsp;<br /><span><a href="http://www.martinapps.com" target="_blank">martinapps.com</a></span><br />&nbsp;<br /><span><a href="http://www.retirementforecaster.com" target="_blank">retirementforecaster.com</a></span></div>\n';
    theText += '<br/>&nbsp;<br/>\n';
    html += buildExtraSection(theText);
    html += '<br/>' + endColorBackground();
    bigHtml.push(html);
    testText.push(html); //testing

    var testHtml = testText.join(''); //for test inspection of complete html 

    //MSApp.execUnsafeLocalFunction(function () { node.append(bigHtml.join('')); }); //Win8 App fix //node.append(html);
    //MYAppAppendHTML(node, bigHtml.join(''));
    MYAppInsertHTML(node, bigHtml.join(' '));
}
