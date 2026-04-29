const {test, expect} = require('@playwright/test');



test('Browser Context - Validating Error Login', async ({page})=>
{
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "milanguzina@yahoo.com";

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("milanguzina@yahoo.com");
    await page.locator("#userPassword").fill("CH9GJeG#n7kqScR");
    await page.locator("[value='Login']").click();

    //waits until network comes to idle state - when all the calls are successfully made
    await page.waitForLoadState('networkidle'); // sometimes it is flaky and returns an empty arrays

    //alternate way if the networkIdle is flaky
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const productsNumber = await products.count();
    for (let i=0; i<productsNumber; i++){
       if (await products.nth(i).locator("b").textContent() === productName)
       {
        //add to cart
        await products.nth(i).locator("text=Add To Cart").click();
        break;
       }
    }
    
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:200});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    
    for(let i=0; i<optionsCount; ++i){
    const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
   
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    //find the orderID in the order page list

    await page.locator('label:has-text("Orders History Page")').click();
    await page.locator("tbody").waitFor();

    const orders = await page.locator("tbody tr");
    const ordersCount = await orders.locator("th").count();
    console.log(ordersCount);
     for(let i=0; i<ordersCount; ++i){
     const orderNumber = await orders.nth(i).locator("th").textContent();
        if(orderID.includes(orderNumber)){
            console.log(orderNumber);
            break;
        }
    }

});
