## Introduction

The New York Times Business section on April 3, 2021, had a "Pandemic Spurs Interest in Teaching Financial Literacy" article in the "Your Money Advisor" column by Ann Carrns.

The GetRichDieBroke program is perfect for teaching financial literacy.
It plots cash flow projections over time with interactive charts. It shows the compounding effects of earnings, taxes, and inflation on your money. On screen sliders change those rates with immediate visual results.

Today I posted it as open source on GitHub with a MIT license.

Back when I was learning JS I found Danny Goodman's book "Dynamic HTML" from O'Reilly. It showed how to work with just HTML and produce a great app. That resource helped me write this interactive financial planning program as my first JS hobby project in 1998. That program is hosted at GetRichDieBroke.com.

You can run it locally by just loading index.html in a browser.

## Getting Started

These instructions are for Windows.
The Mac should be the same, but I have not tested it there.

**Environment**

1.  Clone the repo into a folder on your computer.

```
git clone https://github.com/martinduo/GetRichDieBroke.git
```

1.  Install VS Code.

```
Download-
https://code.visualstudio.com/download

Start VS Code, and under File/Open Folder...
select the folder holding the cloned repo.
```

1.  In .vscode/launch.json, select the configuration shown below.
1.  Then hit f5 to run the program on your browser.

```
"configurations": [
  {
    "type": "pwa-chrome",
    "request": "launch",
    "name": "Open index.html",
    "file": "c:<yourfilepath>GetRichDieBroke\\index.html"
  }
]

```

**Application**

The program is an easy to use teaching tool.

It runs on iPads, notebooks, and desktop computers.

None of this setup is needed to use it.

Anyone can run it. It's already hosted on the Web.

```
Enter GetRichDieBroke.com in a browser.
```

![](https://github.com/martinduo/GetRichDieBroke.git/blob/main/images/GetRichBrokeDemo.png)
