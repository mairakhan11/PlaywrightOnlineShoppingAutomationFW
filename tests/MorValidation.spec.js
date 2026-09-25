const {test, expect}= require('@playwright/test');

test('Pop Up Validation', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   
    // await page.goto("http://google.com");
    // await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // handle web popup alert
    // page.on -> help to listen event on the page
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover()

    // handling child frame inside the parent frame 

    // const FramPage= page.frameLocator("#courses-iframe");
    // await FramPage.locator("li a[href*='lifetime-access']:visible").click();
    // const textCheck = await FramPage.locator(".text h2").textContent();
    // console.log(textCheck.split(" ")[1]);
})

test("Screenshsot and Visual Comparison ", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   
    // await page.goto("http://google.com");
    // await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    // partial screenshot only take screenshot of given locator 
    await page.locator("#displayed-text").screenshot({path: 'Partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    // full page screenshot only take screen shot of page 

    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();

})

test.only('Visuals', async ({page})=>{
     await page.goto("https://www.google.com/");
      await expect(await page.screenshot()).toMatchSnapshot('Homescreenshot.png')
})