Feature: As an administrator,
I want to access a specific list 
So that I can check pending teaching assistants and send reports batch

Scenario: Send all list’s reports successfully
Given that i am logged as a Admin user, "admin", with password "123456"
And that i am at the "Reports Admin Page" page
And i can see a student with login "abc", with a report at the list "Prova 1"
And i can see a student with login "def", with a report at the list "Prova 1"
And i can see only the students with login "abc" and "def" in the grades at the list "Prova 1"
When i select send reports for the list "Prova 1"
Then  i can see the confirmation message "Relatórios enviados com sucesso"

