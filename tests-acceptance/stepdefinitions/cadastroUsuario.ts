
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let pAND = (p,q) => p.then(a => q.then(b => a && b));

let sameName = (elem, name) => elem.$$('span[name="name"]').getText().then(text => text == name);
let sameLogin = (elem, login) => elem.$$('span[name="login"]').getText().then(text => text == login);

defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {

    setDefaultTimeout(60 * 1000);

   //that i am logged as a Admin user, “Pedro”, with password “123” 
    Given(/that i am logged as a Admin user, "([^\"]*)", with password "([^\"]*)"/, async (username, password) => {
        await browser.get("http://localhost:4200/login");
        await expect(browser.getTitle()).to.eventually.equal('GeradorDeFeedback');    
        await browser.executeScript('window.localStorage.clear("gn_token");');
        await browser.executeScript('window.localStorage.clear("gn_user");');
        await browser.refresh();
        await browser.get("http://localhost:4200/login");
        await $("input[name='username']").sendKeys(<string> username);
        await $("input[name='password']").sendKeys(<string> password);
        await element(by.buttonText('Login')).click().then(() => browser.waitForAngular() )
        await browser.wait(() => $("h1").isPresent())
        await expect($("h1").getText()).to.eventually.equal('Home')
    }
    )

    Given(/that i am at the "([^\"]*)" page/, async (page) => {
        let uri = '';
        if (page == 'Register Teaching Assistant') uri = 'register'   
        
        await browser.get(`http://localhost:4200/${uri}`)
        await expect(browser.getTitle()).to.eventually.equal('GeradorDeFeedback');
        await browser.wait(() => $("ul").isPresent())

    })

    Given(/that i cant see a teaching assistant with name "([^\"]*)" and login "([^\"]*)"/, async (name, login) => {
        let allUsers : ElementArrayFinder = element.all(by.css('.user'));
        await allUsers;

        var filteredUsers = allUsers.filter(
            elem => pAND(sameLogin(elem, login), sameName(elem, name))
        );
        await filteredUsers;
        await filteredUsers.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    })

    Given(/that i can see a teaching assistant with name "([^\"]*)" and login "([^\"]*)"/, async (name, login) => {
        let allUsers : ElementArrayFinder = element.all(by.css('.user'));
        await allUsers;

        var filteredUsers = allUsers.filter(
            elem => pAND(sameLogin(elem, login), sameName(elem, name))
        );
        await filteredUsers;

        const alreadyExists = filteredUsers.length == 1;
        
        if (!alreadyExists) {
            fillForms (name, login);
            await submitForm();
        }
    })

    When(/i fill the fields, name with "([^\"]*)" and login with "([^\"]*)"/, async (name, login) => {
       await fillForms(name, login)
    })

    When(/i submit to register the teaching assistant/,
        async () => submitForm()
    )

    Then(/i can see the confirmation message "([^\"]*)"/, async (message) => {
        await browser.wait(() => $("#message").isPresent())
        await expect($("#message").getText()).to.eventually.equal(message)
    })


    Then(/i can see a error message "([^\"]*)"/, async (message) => {
        await browser.wait(() => $("#message").isPresent())
        await expect($("#message").getText()).to.eventually.equal(message)
    })


    Then(/i can see a student with name "([^\"]*)", login "([^\"]*)", and status "([^\"]*)"/, async (name, login, status) => {
        let allUsers : ElementArrayFinder = element.all(by.css('.user'));
        await allUsers;
        var filteredUsers = allUsers.filter(
            async elem => sameNameLoginAndStatus(elem, name, login, status)
        );
        await filteredUsers;
        await filteredUsers.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })

})

const sameNameLoginAndStatus = async (elem, name, login, status) => {
    const sameName = await elem.$$('span[name="name"]').getText().then(text => text == name);
    const sameLogin = await elem.$$('span[name="login"').getText().then(text => text == login);
    const sameStatus = await elem.$$('span[name="status"]').getText().then(text => text == status);
    return sameName && sameLogin && sameStatus;
}

const fillForms = async (name, login) => {
    await $('input[name="login"]').sendKeys(<string> login);
    await $('input[name="name"]').sendKeys(<string> name);
}

const submitForm = () => element(by.buttonText('Cadastrar')).click()