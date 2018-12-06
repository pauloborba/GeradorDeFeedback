Feature: 
As an administrator,
I want to register The Huxley’s students
So that I can manage the students

Scenario: new students
Given that i am logged as a Admin user, "testeadmin", with password "123456"
And that i am at the "Register students" page
And "Lucas Barros De Almeida Machado" is registered in The Huxley's group
When I try to upload a "XLS" file with columns "TheHuxleyName" and "LoginCin" and an entry of "Lucas Barros de Almeida Machado" and "lbam" for those columns respectively
Then I can see "Lucas Barros de Almeida Machado" with login "lbam" in the registered students list