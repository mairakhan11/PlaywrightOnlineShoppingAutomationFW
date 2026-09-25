const {test, expect}= require('@playwright/test');

test('Playwright Special Locators ', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
   
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    const SuccessMessage= await page.getByText(" The Form has been submitted successfully!.").isVisible();
    // 5 sec default timeout for expet assertion 
    // but somehow it will take more time then we will force timeout only for this statement
    // to get the page and written text in stablle state
    // override step level --{timeout:10000}
    expect(SuccessMessage).toBeVisible({timeout:10000});
    expect(SuccessMessage).toBeTruthy();  
    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Samsung Note 8 '}).getByRole("button").click();
    await page.pause();
     // locator (css) waitfor

})

test ('Playwright assertions at test level  ', async ({page})=>{

    test.setTimeout(60000);  // test level timeout
    /*
    when you know your test case will take more time to complete then you can declare test level timeout
    and it will be applicable for all the expect assertion in this test case. it will override the test timeout that you declared in playwright.config.js file.
    in the config file .. 
    */




    // declaring  test level time out 
    const TestLevelTimeout= expect.configure({timeout: 15000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
   
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    const SuccessMessage= await page.getByText(" The Form has been submitted successfully!.").isVisible();
    // 5 sec default timeout for expet assertion 
    // but somehow it will take more time then we will force timeout only for this statement
    // to get the page and written text in stablle state
    // override step level --{timeout:10000}
    TestLevelTimeout(SuccessMessage).toBeVisible();
    TestLevelTimeout(SuccessMessage).toBeTruthy();
    await page.getByRole('link', {name: 'Shop'}).click();
    await TestLevelTimeout(page.locator(".my-4").first()).toHaveText("Shop");



    await page.locator("app-card").filter({hasText:'Samsung Note 8 '}).getByRole("button").click();
    await page.pause();
     // locator (css) waitfor


})