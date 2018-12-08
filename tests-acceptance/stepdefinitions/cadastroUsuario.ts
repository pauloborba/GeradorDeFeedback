
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

let sameName = (elem, name) => elem.$$('span[name="name"]').getText().then(text => text == name)
let sameLogin = (elem, login) => elem.$$('span[name="login"]').getText().then(text => text == login)
let sameStatus = (elem, status) => elem.$$('span[name="status"]').getText().then(text => text == status)

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

    When(/i fill the fields, name with "([^\"]*)" and login with "([^\"]*)"/, async (name, login) => {
        await $('input[name="login"]').sendKeys(<string> login);
        await $('input[name="name"]').sendKeys(<string> name);
    })

    When(/i submit to register the teaching assistant/,
        async () => await element(by.buttonText('Cadastrar')).click()
        
    )

    Then(/i can see the confirmation message "([^\"]*)"/, async (message) => {
        await browser.wait(() => $("#message").isPresent())
        await expect($("#message").getText()).to.eventually.equal(message)
    })

    Then(/i can see a student with name "([^\"]*)", login "([^\"]*)", and status "([^\"]*)"/, async (name, login, status) => {
        let allUsers : ElementArrayFinder = element.all(by.css('.user'));
        await allUsers;
        var filteredUsers = allUsers.filter(
            async elem => {
                const nameGUI = (await elem.$$('span[name="name"]').getText())
                const loginGUI = (await elem.$$('span[name="login"]').getText())
                const statusGUI = (await elem.$$('span[name="status"]').getText())
                return nameGUI == name && loginGUI == login && statusGUI == status
            }
        );
        await filteredUsers;
        await filteredUsers.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })


})