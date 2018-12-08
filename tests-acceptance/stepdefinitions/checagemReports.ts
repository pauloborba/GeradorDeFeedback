import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import axios from 'axios';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/I am logged as a Teaching Assistant, "([^\"]*)", with password "([^\"]*)"/, async (username, password) => {
        await browser.get("http://localhost:4200/login");
        await expect(browser.getTitle()).to.eventually.equal('GeradorDeFeedback');
        await browser.executeScript('window.localStorage.clear("gn_token");');
        await browser.executeScript('window.localStorage.clear("gn_user");');
        await browser.refresh();
        await browser.get("http://localhost:4200/login");
        await $("input[name='username']").sendKeys(<string> username);
        await $("input[name='password']").sendKeys(<string> password);
        await element(by.buttonText('Login')).click().then(() => browser.waitForAngular());
        await browser.wait(() => $("h1").isPresent());
        await expect($("h1").getText()).to.eventually.equal('Home');
    })

    Given(/I am at the "([^\"]*)" page/, async (page) => {
        let uri = '';
        if (page == 'Lists') uri = '';
        await browser.get(`http://localhost:4200/${uri}`);
        await expect(browser.getTitle()).to.eventually.equal('GeradorDeFeedback');
    })

    Given(/there is a List "([^\"]*)" registered in the system/, async (list) => {
        let lists : ElementArrayFinder = element.all(by.css('list'));
        await lists;
        let foundList = lists.map(
            async elem => {
                if(await (elem.$$('span[name="list"]').getText()) == list) {
                    return elem;
                }
            }
        );
        await foundList;
        console.log(foundList);
        await foundList.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })

    Given(/There is a student "([^\"]*)" in the system/, async (student) => {
        const res = await axios.get(`http://localhost:3000/api/student?name=${student}`);
        expect(res.data.error).to.be(null);
    })

    Given(/There is a list "([^\"]*)" in the system/, async (list) => {
        const res = await axios.get(`http://localhost:3000/api/list?name=${list}`);
        expect(res.data.error).to.be(null);
    })

    Given(/The student "([^\"]*)" has a question "([^\"]*)" in list "([^\"]*)"/, async (student, question, list) => {
        const res = await axios.get(`http://localhost:3000/api/list?name=${list}/submissions?name=${student}/questions?=name=${question}`);
        expect(res.data.error).to.be(null);
        expect(res.data.pending);
    })

    When(/When I select the list "([^\"]*)"/, async (list) => {
        element(by.buttonText(`${list}`)).click();
    })

    When(/When I select the student "([^\"]*)"/, async (student) => {
        element(by.buttonText(`${student}`)).click();
    })

    Then(/I can see "([^\"]*)" report is pending/, async (question) => {
        const elems = await element.all(by.css(`.${question}`));
        await expect(Promise.resolve(elems.length)).to.eventually.equal(1);
        await expect(elems[0].getText()).toEqual(`${question}`);
    })



    
})