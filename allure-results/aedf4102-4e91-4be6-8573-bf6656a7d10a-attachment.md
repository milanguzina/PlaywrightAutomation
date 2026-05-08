# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\ClientApp.spec.js >> Browser Context - Validating Error Login
- Location: tests\ClientApp.spec.js:4:1

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/client/", waiting until "load"

```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | 
  3  | 
  4  | test('Browser Context - Validating Error Login', async ({page})=>
  5  | {
  6  |     const products = page.locator(".card-body");
  7  |     const productName = "ZARA COAT 3";
  8  |     const email = "milanguzina@yahoo.com";
  9  | 
> 10 |     await page.goto("https://rahulshettyacademy.com/client/");
     |                ^ Error: page.goto: Target page, context or browser has been closed
  11 |     await page.locator("#userEmail").fill("milanguzina@yahoo.com");
  12 |     await page.locator("#userPassword").fill("CH9GJeG#n7kqScR");
  13 |     await page.locator("[value='Login']").click();
  14 | 
  15 |     //waits until network comes to idle state - when all the calls are successfully made
  16 |     await page.waitForLoadState('networkidle'); // sometimes it is flaky and returns an empty arrays
  17 | 
  18 |     //alternate way if the networkIdle is flaky
  19 |    await page.locator("div li").first().waitFor({ state: 'visible' });
  20 | 
  21 |     
  22 |     const titles = await page.locator(".card-body b").allTextContents();
  23 |     console.log(titles);
  24 | 
  25 |     const productsNumber = await products.count();
  26 |     for (let i=0; i<productsNumber; i++){
  27 |        if (await products.nth(i).locator("b").textContent() === productName)
  28 |        {
  29 |         //add to cart
  30 |         await products.nth(i).locator("text=Add To Cart").click();
  31 |         break;
  32 |        }
  33 |     }
  34 |     
  35 |     await page.locator("[routerlink*='cart']").click();
  36 |     await page.locator("div li").first().waitFor();
  37 |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  38 |     expect(bool).toBeTruthy();
  39 |     await page.locator("text=Checkout").click();
  40 |     await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:200});
  41 |     const dropdown = page.locator(".ta-results");
  42 |     await dropdown.waitFor();
  43 |     const optionsCount = await dropdown.locator("button").count();
  44 |     
  45 |     for(let i=0; i<optionsCount; ++i){
  46 |     const text = await dropdown.locator("button").nth(i).textContent();
  47 |         if(text === " India"){
  48 |             await dropdown.locator("button").nth(i).click();
  49 |             break;
  50 |         }
  51 |     }
  52 |    
  53 |     await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  54 |     await page.locator(".action__submit").click();
  55 |     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  56 |     const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  57 |     console.log(orderID);
  58 | 
  59 |     //find the orderID in the order page list
  60 | 
  61 |     await page.locator('label:has-text("Orders History Page")').click();
  62 |     await page.locator("tbody").waitFor();
  63 | 
  64 |     const orders = await page.locator("tbody tr");
  65 |     const ordersCount = await orders.locator("th").count();
  66 |     console.log(ordersCount);
  67 |      for(let i=0; i<ordersCount; ++i){
  68 |      const orderNumber = await orders.nth(i).locator("th").textContent();
  69 |         if(orderID.includes(orderNumber)){
  70 |             console.log(orderNumber);
  71 |             break;
  72 |         }
  73 |     }
  74 | 
  75 | });
  76 | 
```