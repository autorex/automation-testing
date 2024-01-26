import fsExtra from "fs-extra";
import { getReport, setReport } from "../lib/helper/helper.mjs";
import allureReport from "@wdio/allure-reporter";
import allure from "allure-commandline";
import axios from "axios";

export const config = {
  runner: "local",
  port: 4723,
  specs: ["../test/feature/api_test.feature"],
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        args: ["headless", "disable-gpu"],
      },
    },
  ],
  services: ["chromedriver"],
  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  framework: "cucumber",
  reporters: ["spec", "cucumberjs-json"],
  cucumberOpts: {
    require: ["./lib/step_definitions/*.mjs"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true,
      },
    ],
  ],

  //   beforeSession: async function (config, capabilities, specs) {
  //     // function GET TOKEN
  //     const authEndpoint = "https://gorest.co.in/oauth/token";
  //     try {
  //       // Make a request to the authentication endpoint
  //       const response = await axios.get(authEndpoint, {
  //         // Provide any necessary credentials or parameters
  //         username: "autorex",
  //         password: "Crait03LogyX",
  //         // username: process.env.USERNAME_GOREST,
  //         // password: process.env.PASSWORD_GOREST,
  //       });
  //       // Extract the API token from the response
  //       const apiToken = response.data.token;

  //       console.log("API Token:", apiToken);
  //     } catch (error) {
  //       console.error("Error obtaining API token:", error.message);
  //     }
  //   },

  onPrepare: async () => {
    fsExtra.remove("./allure-results");
    fsExtra.remove("./allure-report");
  },

  beforeStep: function (step, scenario, context) {
    setReport("");
  },

  afterStep: async function (
    test,
    scenario,
    { error, duration, passed },
    context
  ) {
    let report = getReport();
    console.log(report);
    allureReport.addAttachment("report", report);
  },

  afterScenario: async function (world, result, context) {
    await browser.reloadSession();
  },

  onComplete: function (exitCode, config, capabilities, specs, results) {
    const reportError = new Error("Could not generate Allure report");
    const generation = allure([
      "generate",
      "allure-results",
      "--clean",
      "-o",
      "allure-report",
    ]);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);
      generation.on("exit", function (exitCode) {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(reportError);
        }
        console.log("Allure report successfully generated");
        resolve();
      });
    });
  },
};
