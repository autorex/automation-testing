## How to clone
1. Clone git use https
2. In your code editor terminal, type git clone https://github.com/autorex/automation-testing.git


## How To Setup 
1. After Clone on your Local please run this:
    npm install
2. This project use Google Chrome Browser for the allure report, so please match the chromedriver version with your chrome browser version
    (you can change the chromedriver version in package.json, after change it please run 'npm install' again)
3. After that please run this (due to sometimes it wont run):
    npm install wdio-chromedriver-service --save-dev
    npm install chromedriver --save-dev
4. There is .env example, Every data that must not be allowed to public, must be on this file. 
    (you must fill the data in the .env.example and rename the file to .env)
5. For Creating step please create it under one feature file based on the feature developed.
6. For Creating step definition, please make sure there is no double function and double definition in The step-definition file


## How to Run Framework
1. Use this command to run the .feature file:
    npm run start
2. Use this command to run the .feature file with allure report:
    npm run start;allure open
   



