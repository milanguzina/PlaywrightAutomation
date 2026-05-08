const {test, expect} = require('@playwright/test');

test.only ("Popup validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //browser navigates back or forward
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //alert popup handling /  dialog.accept() -> ok ,  dialog.dismiss() -> reject
    await page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //mouse hover handling
    await page.locator("#mousehover").hover();

    //handling iframes
    const framesPage = await page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


})