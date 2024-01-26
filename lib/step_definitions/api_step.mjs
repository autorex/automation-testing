import { Given, When, Then } from "@wdio/cucumber-framework";
import apiObject from "../api_object/api_object.mjs";

Given(/^I want to get data using GET method$/, async () => {
  await apiObject.getMethod();
});

Given(
  /^I want to post data using POST method with data (.*)$/,
  async (data) => {
    await apiObject.postMethod(data);
  }
);

Given(/^I prepare the latest data to be updated$/, async () => {
  await apiObject.getData();
});

When(
  /^I want to update the latest data using PUT method and change the data name to (.*)$/,
  async (name) => {
    await apiObject.putMethod(name);
  }
);

Given(/^I prepare the latest data to be deleted$/, async () => {
	await apiObject.getData();
});

When(/^I want to delete the latest data using DELETE method$/, async () => {
  await apiObject.deleteMethod();
});

Then(/^I expect the status code (.*)$/, async (statusCode) => {
  await apiObject.verifyStatusCode(statusCode);
});

Then(/^I validate the data$/, async () => {
  await apiObject.validateData();
});

Then(/^I validate the deleted data$/, async () => {
	await apiObject.validateDeletedData();
  });
  

Then(/^I validate the post data$/, async () => {
  await apiObject.validatePostData();
});

When(
  /^I want to delete the data with user id (.*) using DELETE method$/,
  async (userId) => {
    await apiObject.deleteMethodWithUserId(userId);
  }
);

Then(/^I validate the deleted user id (.*)$/, async (userId) => {
  await apiObject.validateDeletedWithUserId(userId);
});
