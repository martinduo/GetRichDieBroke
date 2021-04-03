## Introduction

The New York Times Business section on April 3, 2021, had a "Pandemic Spurs Interest in Teaching Financial Literacy" article in the "Your Money Advisor" column by Ann Carrns.

The GetRichDieBroke program can be a great tool for teaching the compounding effects of earnings, taxes, and inflation over time. It is a simple interactive financial calculator with sliders that adjust those rates with immediate visual feedback.

Today I'm posting it as open source on GitHub
with a MIT license.

Back when I was learning JS I found Danny Goodman's book "Dynamic HTML" from O'Reilly. It showed how to work with just HTML and produce a great app. That resource helped me write this interactive financial planning program as my first JS hobby project in 1998. That program is at GetRichDieBroke.com.

Now you can run it locally by just loading index.html in a browser.

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
Start VS Code and under File/Open Folder...
select the folder holding the cloned repo.
```

1.  In .vscode/launch.json, select the configuration shown below.
1.  Then hit f5 to run the program on your default browser.

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

The program can be used as an easy to use teaching tool.

It can run on iPads, notebooks, and desktop computers.

None of this setup is needed to use it.

```
Just enter GetRichDieBroke.com in your browser.
```
