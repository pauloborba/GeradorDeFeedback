Feature: 
As an administrator,
I want to register The Huxley’s students
So that I can manage the students

Scenario: new students
Given that i am logged as a Admin user, "admin", with password "123456"
And that i am at the "Register students" page
And "Rafael Mota Alves" is registered in The Huxley's group
When I try to upload a "XLS" file with columns "TheHuxleyName" and "LoginCin" and an entry of "Rafael Mota Alves" and "rma7" for those columns respectively
Then I can see "Rafael Mota Alves" with login "rma7" in the registered students list

Scenario: new student not registered in TheHuxley group
Given that i am logged as a Admin user, "admin", with password "123456"
And that i am at the "Register students" page
And "Joao" is not registered in The Huxley's group
When I try to upload a "XLS" file with columns "TheHuxleyName" and "LoginCin" and an entry of "Joao" and "j" for those columns respectively
Then I can see a error message
