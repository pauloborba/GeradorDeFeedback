
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, ElementFinder, by } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/i can see a student with login "([^\"]*)", with a report at the list  "([^\"]*)"/, async (login, list) => {
        // Não vai ser possível cadastrar um report no momento pois esse teste seria muito complexo, e
        // eu testar esse caso é a parte de outro integrante caso seja feito o teste de aceitação para cadastro de cenário pelo
        // integrante reposável, ele será adicionado aqui, por hora eu vou só checar se a condição já em cumprida
        let allLists : ElementArrayFinder = element.all(by.css('.list'));
        await allLists;
        var filteredLists = allLists.filter(async element =>
            await element.$('h1').getText().then(text => text == list)
        );
        await filteredLists;
        await filteredLists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        let filteredUsers = await filteredLists.first().$$('.submission').filter(
            async sub => {
                let sameLogin = await sub.$('td[name="login"').getText().then(text => text == login);
                let isSent = await sub.$('td[name="status"]').getText().then(text => text == 'Enviado');
                return sameLogin && isSent;
            }
        )
        await filteredUsers.length === 1;

    })

    Given(/i can see only the students with login "([^\"]*)" and "([^\"]*)" in the grades at the list "([^\"]*)"/, 
        async (login1, login2, list) => {
            let allLists : ElementArrayFinder = element.all(by.css('.list'));
            await allLists;
            var filteredLists = allLists.filter(async element =>
                await element.$('h1').getText().then(text => text == list)
            );
            await filteredLists;
            await filteredLists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
            let filteredUsers = await filteredLists.first().$$('.submission').filter(
                async sub => {
                    let notEqualLogin1 = await sub.$('td[name="login"').getText().then(text => text != login1);
                    let notEqualLogin2 = await sub.$('td[name="login"').getText().then(text => text != login2);
                    return notEqualLogin1 && notEqualLogin2
                }
            )
            await filteredUsers.length === 0;
        }
    )

    When(/i select send reports for the list "([^\"]*)"/, async (list) => {
        let allLists : ElementArrayFinder = element.all(by.css('.list'));
        await allLists;
        var filteredLists = allLists.filter(async element =>
            await element.$('h1').getText().then(text => text == list)
        );
        await filteredLists;
        await filteredLists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        let filteredUsers = await filteredLists.first().$('button').click();
    })



})