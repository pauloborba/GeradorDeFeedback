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
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/i can see a student with login "([^\"]*)", with a report at the list "([^\"]*)"/, (login, list) => __awaiter(this, void 0, void 0, function* () {
        // Não vai ser possível cadastrar um report no momento pois esse teste seria muito complexo, e
        // eu testar esse caso é a parte de outro integrante caso seja feito o teste de aceitação para cadastro de cenário pelo
        // integrante reposável, ele será adicionado aqui, por hora eu vou só checar se a condição já em cumprida
        let allLists = protractor_1.element.all(protractor_1.by.css('.list'));
        yield allLists;
        var filteredLists = allLists.filter((element) => __awaiter(this, void 0, void 0, function* () { return yield element.$('h1').getText().then(text => text == list); }));
        yield filteredLists;
        yield filteredLists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        let filteredUsers = yield filteredLists.first().$$('.submission').filter((sub) => __awaiter(this, void 0, void 0, function* () {
            let sameLogin = yield sub.$$('td[name="login"').getText().then(text => text == login);
            let isSent = yield sub.$$('td[name="status"]').getText().then(text => text == 'Enviado');
            return sameLogin && isSent;
        }));
        yield expect(filteredUsers.length).to.equal(1);
    }));
    Given(/i can see only the students with login "([^\"]*)" and "([^\"]*)" in the grades at the list "([^\"]*)"/, (login1, login2, list) => __awaiter(this, void 0, void 0, function* () {
        let allLists = protractor_1.element.all(protractor_1.by.css('.list'));
        yield allLists;
        var filteredLists = allLists.filter((element) => __awaiter(this, void 0, void 0, function* () { return yield element.$('h1').getText().then(text => text == list); }));
        yield filteredLists;
        yield filteredLists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        let filteredUsers = yield filteredLists.first().$$('.submission').filter((sub) => __awaiter(this, void 0, void 0, function* () {
            let notEqualLogin1 = yield sub.$('td[name="login"').getText().then(text => text != login1);
            let notEqualLogin2 = yield sub.$('td[name="login"').getText().then(text => text != login2);
            return notEqualLogin1 && notEqualLogin2;
        }));
        yield expect(filteredUsers.length).to.equal(1);
    }));
    When(/i select send reports for the list "([^\"]*)"/, (list) => __awaiter(this, void 0, void 0, function* () {
        let allLists = protractor_1.element.all(protractor_1.by.css('.list'));
        yield allLists;
        var filteredLists = allLists.filter((element) => __awaiter(this, void 0, void 0, function* () { return yield element.$('h1').getText().then(text => text == list); }));
        yield filteredLists;
        yield filteredLists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        let filteredUsers = yield filteredLists.first().$('button').click();
    }));
});
