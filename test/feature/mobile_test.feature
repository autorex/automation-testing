Feature: Automation Mobile Testing

    Scenario: Positive login scenario
        Given I want to get data using GET method
        Then I expect the status code <statusCode>
        Examples:
            | statusCode |
            | 200        |