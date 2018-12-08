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
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
let sameName = (elem, name) => elem.$$('span[name="name"]').getText().then(text => text == name);
let sameLogin = (elem, login) => elem.$$('span[name="login"]').getText().then(text => text == login);
let sameStatus = (elem, status) => elem.$$('span[name="status"]').getText().then(text => text == status);
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
        yield protractor_1.browser.get(`http://localhost:4200/${uri}`);
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('GeradorDeFeedback');
        yield protractor_1.browser.wait(() => protractor_1.$("ul").isPresent());
    }));
    Given(/that i cant see a teaching assistant with name "([^\"]*)" and login "([^\"]*)"/, (name, login) => __awaiter(this, void 0, void 0, function* () {
        let allUsers = protractor_1.element.all(protractor_1.by.css('.user'));
        yield allUsers;
        var filteredUsers = allUsers.filter(elem => pAND(sameLogin(elem, login), sameName(elem, name)));
        yield filteredUsers;
        yield filteredUsers.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    When(/i fill the fields, name with "([^\"]*)" and login with "([^\"]*)"/, (name, login) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$('input[name="login"]').sendKeys(login);
        yield protractor_1.$('input[name="name"]').sendKeys(name);
    }));
    When(/i submit to register the teaching assistant/, () => __awaiter(this, void 0, void 0, function* () { return yield protractor_1.element(protractor_1.by.buttonText('Cadastrar')).click(); }));
    Then(/i can see the confirmation message "([^\"]*)"/, (message) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.wait(() => protractor_1.$("#message").isPresent());
        yield expect(protractor_1.$("#message").getText()).to.eventually.equal(message);
    }));
    Then(/i can see a student with name "([^\"]*)", login "([^\"]*)", and status "([^\"]*)"/, (name, login, status) => __awaiter(this, void 0, void 0, function* () {
        let allUsers = protractor_1.element.all(protractor_1.by.css('.user'));
        yield allUsers;
        var filteredUsers = allUsers.filter((elem) => __awaiter(this, void 0, void 0, function* () {
            const nameGUI = (yield elem.$$('span[name="name"]').getText());
            const loginGUI = (yield elem.$$('span[name="login"]').getText());
            const statusGUI = (yield elem.$$('span[name="status"]').getText());
            return nameGUI == name && loginGUI == login && statusGUI == status;
        }));
        yield filteredUsers;
        yield filteredUsers.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
});
