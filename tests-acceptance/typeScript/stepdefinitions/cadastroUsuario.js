"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let pAND = (p, q) => p.then(a => q.then(b => a && b));
let sameName = (elem, name) => elem.$$('span[name="name"]').getText().then(text => text == name);
let sameLogin = (elem, login) => elem.$$('span[name="login"]').getText().then(text => text == login);
cucumber_1.defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000);
    //that i am logged as a Admin user, “Pedro”, with password “123” 
    Given(/that i am logged as a Admin user, "([^\"]*)", with password "([^\"]*)"/, (username, password) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/login");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('GeradorDeFeedback');
        yield protractor_1.browser.executeScript('window.localStorage.clear("gn_token");');
        yield protractor_1.browser.executeScript('window.localStorage.clear("gn_user");');
        yield protractor_1.browser.refresh();
        yield protractor_1.browser.get("http://localhost:4200/login");
        yield protractor_1.$("input[name='username']").sendKeys(username);
        yield protractor_1.$("input[name='password']").sendKeys(password);
        yield protractor_1.element(protractor_1.by.buttonText('Login')).click().then(() => protractor_1.browser.waitForAngular());
        yield protractor_1.browser.wait(() => protractor_1.$("h1").isPresent());
        yield expect(protractor_1.$("h1").getText()).to.eventually.equal('Home');
    }));
    Given(/that i am at the "([^\"]*)" page/, (page) => __awaiter(this, void 0, void 0, function* () {
        let uri = '';
        if (page == 'Register Teaching Assistant')
            uri = 'register';
        else if (page == 'Reports Admin Page')
            uri = 'report';
        yield protractor_1.browser.get(`http://localhost:4200/${uri}`);
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('GeradorDeFeedback');
    }));
    Given(/that i cant see a teaching assistant with name "([^\"]*)" and login "([^\"]*)"/, (name, login) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.wait(() => protractor_1.$("ul").isPresent());
        let allUsers = protractor_1.element.all(protractor_1.by.css('.user'));
        yield allUsers;
        var filteredUsers = allUsers.filter(elem => pAND(sameLogin(elem, login), sameName(elem, name)));
        yield filteredUsers;
        yield filteredUsers.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    Given(/that i can see a teaching assistant with name "([^\"]*)" and login "([^\"]*)"/, (name, login) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.wait(() => protractor_1.$("ul").isPresent());
        let allUsers = protractor_1.element.all(protractor_1.by.css('.user'));
        yield allUsers;
        var filteredUsers = allUsers.filter(elem => pAND(sameLogin(elem, login), sameName(elem, name)));
        yield filteredUsers;
        const alreadyExists = filteredUsers.length == 1;
        if (!alreadyExists) {
            fillForms(name, login);
            yield submitForm();
        }
    }));
    When(/i fill the fields, name with "([^\"]*)" and login with "([^\"]*)"/, (name, login) => __awaiter(this, void 0, void 0, function* () {
        yield fillForms(name, login);
    }));
    When(/i submit to register the teaching assistant/, () => __awaiter(this, void 0, void 0, function* () { return submitForm(); }));
    Then(/i can see the confirmation message "([^\"]*)"/, (message) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.wait(() => protractor_1.$("#message").isPresent());
        yield expect(protractor_1.$("#message").getText()).to.eventually.equal(message);
    }));
    Then(/i can see a error message "([^\"]*)"/, (message) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.wait(() => protractor_1.$("#message").isPresent());
        yield expect(protractor_1.$("#message").getText()).to.eventually.equal(message);
    }));
    Then(/i can see a student with name "([^\"]*)", login "([^\"]*)", and status "([^\"]*)"/, (name, login, status) => __awaiter(this, void 0, void 0, function* () {
        let allUsers = protractor_1.element.all(protractor_1.by.css('.user'));
        yield allUsers;
        var filteredUsers = allUsers.filter((elem) => __awaiter(this, void 0, void 0, function* () { return sameNameLoginAndStatus(elem, name, login, status); }));
        yield filteredUsers;
        yield filteredUsers.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
});
const sameNameLoginAndStatus = (elem, name, login, status) => __awaiter(this, void 0, void 0, function* () {
    const sameName = yield elem.$$('span[name="name"]').getText().then(text => text == name);
    const sameLogin = yield elem.$$('span[name="login"').getText().then(text => text == login);
    const sameStatus = yield elem.$$('span[name="status"]').getText().then(text => text == status);
    return sameName && sameLogin && sameStatus;
});
const fillForms = (name, login) => __awaiter(this, void 0, void 0, function* () {
    const loginForm = yield protractor_1.$('input[name="login"]');
    yield loginForm.clear();
    yield loginForm.sendKeys(login);
    const nameForm = yield protractor_1.$('input[name="name"]');
    yield nameForm.clear();
    yield nameForm.sendKeys(name);
});
const submitForm = () => protractor_1.element(protractor_1.by.buttonText('Cadastrar')).click();
