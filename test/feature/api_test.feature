Feature: Automation API Testing

    Scenario: API Method GET
        Given I want to get data using GET method
        Then I expect the status code <statusCode>
        Examples:
            | statusCode |
            | 200        |

    Scenario: API Method POST using data: <data> - <scenarioType> Case
        Given I want to post data using POST method with data <data>
        Then I expect the status code <statusCode>
        Then I validate the post data
        Examples:
            | data  | statusCode | scenarioType |
            | data1 | 200        | Positive     |
            | data2 | 422        | Negative     |

    Scenario: API Method PUT
        Given I prepare the latest data to be updated
        When I want to update the latest data using PUT method and change the data name to <name>
        Then I expect the status code <statusCode>
        Then I validate the data
        Examples:
            | statusCode | name  |
            | 200        | Giant |

    Scenario: API Method DELETE
        Given I prepare the latest data to be deleted
        When I want to delete the latest data using DELETE method
        Then I expect the status code <statusCode>
        Then I validate the deleted data
        Examples:
            | statusCode |
            | 200        |

    Scenario: API Method DELETE - Negative Case
        When I want to delete the data with user id <userId> using DELETE method
        Then I expect the status code <statusCode>
        Then I validate the deleted user id <userId>
        Examples:
            | userId | statusCode |
            | 605543 | 404        |

