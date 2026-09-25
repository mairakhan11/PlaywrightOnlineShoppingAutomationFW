const {test, expect}= require('@playwright/test');

// in order to recognise the test cases we need to import "'@playwright/test'" this //

test('My First Test Case', async ({page})=>
   {
      const email = "khanmaira632@gmail.com";
      const password = "Mairakhan!999";
      const products= await page.locator(".card-body");
      const productName= "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password); 
    await page.getByRole('button', {name: "Login"}).click();   
    await page.waitForLoadState('networkidle');
   // const allTextTitles= await page.locator(".card h5").allTextContents();
    //console.log(allTextTitles);
   
    await page.locator(".card-body b").first().textContent(); 
    await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole('button', {name: " Add To Cart"}).click();
    await page.getByRole('listitem').getByRole('button',{name: "Cart"}).click(); 
     await page.locator("div li").first().waitFor();   
     await expect( page.getByText("ZARA COAT 3")).toBeVisible();
     await page.getByRole('button',{name: "Checkout"}).click();
      await page.getByPlaceholder("Select Country").pressSequentially("Pa");
      await page.getByRole('button',{name: 'Pakistan'}).click();

      await page.locator("div input[class='input txt']").first().fill("223");
     await page.locator("div input[class='input txt']").last().fill("MK");


   // click on place order button 
   await page.getByText("PLACE ORDER").click();  
  // Assertion to validate the order confirmation message
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();



    });
