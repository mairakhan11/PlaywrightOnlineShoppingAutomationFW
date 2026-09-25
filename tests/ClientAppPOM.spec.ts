import{test,expect,Locator, Page} from'@playwright/test';
import {LoginPage} from '../pageObject/LoginPage';
import {DataManager} from '../pageObject/DataManager';
//json> String > JS Object
const dataSet= JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
import {customtest} from '../utils ts/test-base';

const productName= "ZARA COAT 3";
const country= 'Pa'
const countryName = 'Pakistan'
const firstValue = '223'
const lastValue = 'MK'
  
// adding test casee
test(`Client login for all products`, async ({page, context}) => {
  test.setTimeout(60 * 1000);

  for (const data of dataSet) {
    const poManager =  new DataManager(page);
    const products= await page.locator(".card-body");

    const loginpage =  poManager.getLoginPage();
    await loginpage.goTo();
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    await loginpage.goTo();
    await loginpage.validLogin(data.username, data.password);
    await context.storageState({ path: 'auth.json' });
    
    const dashboard = poManager.getDashboardPage();
    await dashboard.searchProductAddCart(data.productName);
    await dashboard.navigateToCart();

    const cartPage = poManager.getCheckoutPage()
    await cartPage.verifyProduct(data.productName);
    await cartPage.clickCheckout();
    await cartPage.enterCountry(country);
    await cartPage.enterCardDetails(firstValue,lastValue)
    await cartPage.selectCountry(countryName);
    await cartPage.verifyEmail(data.username);
    let orderId :any
     orderId = await cartPage.SubmitAndGetOrderId();
    console.log(orderId)
    



    const orderHistory = poManager.getOrderHistoryPage();
    await orderHistory.goToOrders();
    await orderHistory.searchOrderAndSelect(orderId)

  }
});

customtest(`Client App Login`, async ({page, testDataForOrder})=>{

  const poManager = new DataManager(page);
  const products = page.locator(".card-body")
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo()
  await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password)
  const dashboard = poManager.getDashboardPage();
  await dashboard.searchProductAddCart(testDataForOrder.productName);
  await dashboard.navigateToCart();

})









