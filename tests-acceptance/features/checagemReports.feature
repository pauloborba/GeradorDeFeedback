Feature: 
As a teaching assistant
I want to access a specific list
So that I can check all pending reports for that list by student

Scenario: Access a list to check one pending report
Given I am logged as Teaching Assistant user, "admin", with password "123456"
And I am at "Listas" page
And there is a list "Lista 4 - 2017.2  (Sílvio e suas Matrizes)" registered in the system
And there is a student "Rafael Mota Alves" registered in the system
When I select the list "Lista 4 - 2017.2  (Sílvio e suas Matrizes)"
When I select the student "Rafael Mota Alves"
Then I can see "L4Q1 - Traço de uma matriz." report is pending
