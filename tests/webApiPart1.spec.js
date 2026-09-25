const {test, expect, request}= require('@playwright/test');
const LoginPayload =  {userEmail: "khanmaira632@gmail.com", userPassword: "Mairakhan!999"}
const orderPayload =  {orders: [{country: "Indonesia", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
//const{ApiUtils} = require('./utils/ApiUtils')
let response;

test.beforeAll( async   () => {
   
    const apiContext = await request.newContext();
   const apiutils=  new ApiUtils(apiContext,LoginPayload)
   response= await apiutils.createOrder(orderPayload);       
      
});
// in order to recognise the test cases we need to import "'@playwright/test'" this //

test('Place The Order', async ({page})=>
   {
    //  const apiUtils = new ApiUtils(apiContext, LoginPayload)
    //  const orderId = creatOrder(orderPayload)
    // const order = createOrder();
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);;

    }, response.token)

      const email = "khanmaira632@gmail.com";
      const password = "Mairakhan!999";
      const productName= "ZARA COAT 3";
      await page.goto("https://rahulshettyacademy.com/client");
      await page.locator("button[routerlink*='myorders']").click();
      await page.locator("tbody").waitFor();
   // const allTextTitles= await page.locator(".card h5").allTextContents();
    //console.log(allTextTitles);
       const Row = await page.locator("tbody tr")
       for(let i=0; i< await Row.count(); ++i){
       const rowOrderId =  await Row.nth(i).locator("th").textContent();
       if(response.orderId.includes(rowOrderId)){
         await Row.nth(i).locator("button").first().click();  
         break;
      }
   }
   const OrderIdDetails= await page.locator(".col-text").textContent();
   await page.pause();
   expect(response.orderId.includes(OrderIdDetails)).toBeTruthy();

    });
