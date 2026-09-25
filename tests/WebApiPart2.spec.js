const {test, expect}= require('@playwright/test');

// login once 
const email = "khanmaira632@gmail.com";
const password = "Mairakhan!999";
let webContext;
test.beforeAll(async ({browser})=>{
    const Context = await browser.newContext();
    const page = await Context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);    
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle')
    await Context.storageState({path: 'state.json'});
   webContext=  await browser.newContext({storageState:'state.json'});

})

test('My First Test Case', async () =>
   {
    const page =await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    const productName= "ZARA COAT 3";
    const products= await page.locator(".card-body"); 
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().textContent()   ; 
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count(); 
    for(let i=0; i<count; ++i){
      if(await products.nth(i).locator("b").textContent() === productName){
         await products.nth(i).locator("text= Add To Cart").click();
         break;   
      }
    }
      await page.locator("[routerlink*='cart']").click();
      await page.locator("div li").first().waitFor();   
      const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
      expect(bool).toBeTruthy();
      await page.locator(".totalRow .btn-primary").click();
      await page.locator("[placeholder*='Country']").pressSequentially("Pa");
      await page.locator("div input[class='input txt']").first().fill("223");
      await page.locator("div input[class='input txt']").last().fill("MK");   
      const dropdown=  page.locator(".ta-results")
      await dropdown.waitFor();
      const optionCount = await page.locator(".ta-results button").count();
      for (let i=0; i<optionCount; ++i){
      const Text = await dropdown.locator("button").nth(i).textContent();
      if(Text === " Pakistan"){
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   expect(await page.locator("label[type='text']")).toHaveText(email);
   await page.locator(".action__submit").click();  
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
      console.log(orderId);
      await page.locator("li .fa-handshake-o").click();
      await page.locator("tbody").waitFor();
       const Row = await page.locator("tbody tr")
       for(let i=0; i< await Row.count(); ++i){
       const rowOrderId =  await Row.nth(i).locator("th").textContent();
       if(orderId.includes(rowOrderId)){
         await Row.nth(i).locator("button").first().click();  
         break;
      }
   }
   const OrderIdDetails= await page.locator(".col-text").textContent();
   expect(orderId.includes(OrderIdDetails)).toBeTruthy();
});

test('My second Test Case', async () =>
   {
    const page =await  webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    const productName= "ZARA COAT 3";
    const products= await page.locator(".card-body");
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().textContent()   ; 
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
  
});