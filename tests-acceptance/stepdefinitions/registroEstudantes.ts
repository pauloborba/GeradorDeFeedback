import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

import * as xlsx from "xlsx";
import * as path from "path";

import axios from "axios";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/"([^\"]*)" is registered in The Huxley\'s group/, async (name) => {
        const res = await axios.get(`http://localhost:3000/api/student?name=${name}`);
        expect(res.data.error).to.be.undefined;
    });

    When(/I try to upload a "([^\"]*)" file with columns "([^\"]*)" and "([^\"]*)" and an entry of "([^\"]*)" and "([^\"]*)" for those columns respectively/, async (type: string, column1: string, column2: string, name: string, login: string) => {
        var fileToUpload = 'teste.xls',
        absolutePath = path.resolve(__dirname, fileToUpload);
        const wb = xlsx.utils.book_new();
        const data = xlsx.utils.json_to_sheet([{theHuxleyName: name, login}]);
        xlsx.utils.book_append_sheet(wb, data, "teste");
        xlsx.writeFile(wb, absolutePath);


        await element(by.css('input[type="file"]')).sendKeys(absolutePath);    
        await element(by.id('uploadButton')).click();
    });

    Then(/I can see "([^\"]*)" with login "([^\"]*)" in the registered students list/, async (name: string, login: string) => {
        const allStudents = element.all(by.name("student"));
        let text = await allStudents.get(0).getText();
        await expect(Promise.resolve(text.indexOf(name))).to.not.eventually.equal(-1);
    })
})