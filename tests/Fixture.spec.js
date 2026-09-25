// const {test, expect} = require('@playwright/test');
const { customtest } = require('../pageObject/Fixture.js')
const { expect } = require('@playwright/test')

customtest('Fixture demo', async ({authenticatedPage, createOrder, testData})=>{
    await authenticatedPage.goto('https://rahulshettyacademy.com/client');
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
      await authenticatedPage.locator("tbody").waitFor();
      await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
      console.log(await testData.productName)





})