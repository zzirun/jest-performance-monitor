# QuiP: Quick Performance testing for Javascript before deployment

QuiP is an extension of the Javascript Jest testing framework. It was built to enable performance Test-Driven Development for web-apps, for a Final Year Project as part of the degree requirement for MEng Computing at Imperial College London. 

QuiP allows performance testing before deployment by relying on performance models to estimate runtime instead of real-time measurements. It can estimate the effect of both synchronous and asynchronous Javascript on runtime, using the Async hooks API. Since it performs all its runtime estimations in virtual time, it has short turnaround times.

An overview of QuiP's implementation:
<img width="1359" alt="arch overview" src="https://github.com/zzirun/jest-performance-monitor/assets/54733895/881cd21c-3c46-418a-95b0-859f3c949a11">

Examples of using QuiP for performance Test-Driven Development are added to this repo, including an example web-app implemented with QuiP. The implementation is in [the example code folder](exampleCode), and the corresponding tests are in [the tests folder](__tests__). 

In this repo, the following commands can be called in the command line: 

``` npm run test ``` runs the example tests. 

``` npm run runtimes ``` hosts the test timeline visualizer locally. 

``` npm run caseStudy ``` hosts the example web-app locally. 

Further details on QuiP can be found in its associated research paper: [QuiP paper.pdf](https://github.com/zzirun/jest-performance-monitor/files/11835590/QuiP.paper.pdf)

QuiP can also be installed as a npm package [here](https://www.npmjs.com/package/jest-performance-monitor).
