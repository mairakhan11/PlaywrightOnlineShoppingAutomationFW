const base = require('@playwright/test');
const LoginPayload =  {userEmail: "khanmaira632@gmail.com", userPassword: "Mairakhan!999"}
const orderPayload =  {orders: [{country: "Indonesia", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const {ApiUtils} = require('../utils/ApiUtils')
const {request} = require("@playwright/test");
let response; 

  const email = "khanmaira632@gmail.com";
  const password = "Mairakhan!999";

exports.customtest = base.test.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);    
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle')
    await use(page);
  },
  createOrder: async({}, use) =>{
    const apiContext = await request.newContext();
    const apiutils=  new ApiUtils(apiContext,LoginPayload)
    response= await apiutils.createOrder(orderPayload);  
    await use(response);

  },
  testData :
  {
    productName : "ADIDAS ORIGINAL"

  }

});