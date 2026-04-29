const {test, expect} = require('@playwright/test');



test('Browser Context - Complete Order - Refactored locators', async ({page})=>
{
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "milanguzina@yahoo.com";

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill("milanguzina@yahoo.com");
    await page.getByPlaceholder("enter your passsword").fill("CH9GJeG#n7kqScR");
    await page.getByRole('button',{name: 'Login'}).click();

    //waits until network comes to idle state - when all the calls are successfully made
    await page.waitForLoadState('networkidle'); // sometimes it is flaky and returns an empty arrays

    //alternate way if the networkIdle is flaky
    await page.locator(".card-body b").first().waitFor();


    await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole("button",{name: ' Add To Cart'}).click();

    await page.getByRole("listitem").getByRole('button',{name: "Cart"}).click();

    await page.locator("div li").first().waitFor();
    await page.getByText("ZARA COAT 3").isVisible();
    
    await page.getByRole("button",{name: 'Checkout'}).click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:200});
   
    await page.getByRole("button",{name: 'India'}).nth(1).click();
   

    await page.getByText("Place Order").click();
    
    await expect(page.getByText('milanguzina@yahoo.com', { exact: true })).toBeVisible();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    
});
