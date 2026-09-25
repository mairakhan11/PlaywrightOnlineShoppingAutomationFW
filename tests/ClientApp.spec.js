const {test, expect}= require('@playwright/test');

// in order to recognise the test cases we need to import "'@playwright/test'" this //

test('My First Test Case', async ({page})=>
   {
      const email = "khanmaira632@gmail.com";
      const password = "Mairakhan!999";
      const products= await page.locator(".card-body");
      const productName= "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);    
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle')
   // const allTextTitles= await page.locator(".card h5").allTextContents();
    //console.log(allTextTitles);
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

      /* This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, you can introduce a delay and rewrite the step as:

await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
Here, a delay of 150 milliseconds is introduced between each key press.
That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d

By doing this, you give the application enough time to respond with the relevant options.
*/
   
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
   // asertion to validate email id 
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
