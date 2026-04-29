const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');



test('Browser Context - Validating Error Login', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //css, xpath    // type and fill are the same but the type is deprecated
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
    //waits until this locator is displayed on the page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    
    //deletes previous field input
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    //grabs all text content from all cardTitle elements - but this method doesn't have wait implemented, and it will return an empty array
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});


test('UI controls Test', async ({page})=>
{
        const username = page.locator('#username');
        const password = page.locator('#password');
        const dropdown = page.locator("select.form-control");
        const documentLink = page.locator("[href*='documents-request']");

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await dropdown.selectOption("consult");
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        console.log(page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        await page.locator("#terms").click();
        await expect (page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect (await page.locator("#terms").isChecked()).toBeFalsy();

        await expect(documentLink).toHaveAttribute("class","blinkingText");

        //pauses test execution
        //await page.pause();

});

test('Child windows handle', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const[newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //listen for any new page. We have three stages: pending, rejected, fulfilled
        documentLink.click(),//new page is opened
    ])

    const text = await newPage.locator(".red").textContent();
    const arraySplit = text.split("@");
    const domain = arraySplit[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").type(domain);
    //inputValue() method is different from textContent() as it returns dynamic input made to the field. 
    console.log( await page.locator("#username").inputValue());

});