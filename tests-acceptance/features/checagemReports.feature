Feature: 
As a teaching assistant
I want to access a specific list
So that I can check all pending reports for that list by student

Scenario: Access a list to check one pending report
Given I am logged as Teaching Assistant user, "luan", with password "senha123"
And I am at "Lists" page
And there is a student "valdemar" registered in the system
And there is a list "Prova 1" registered in the system
And The student "valdemar" has a question "Questao 3" pending in list "Prova 1" 
When I select the list "Prova 1"
When I select the student "valdemar"
Then I can see “Questao 3” report is pending
