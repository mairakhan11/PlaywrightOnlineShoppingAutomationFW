const {test, expect}= require('@playwright/test');




test('Go to Login Page', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://lbclariti--lbqa.sandbox.my.site.com/s/login/?language=en_US");
    await expect(page).toHaveTitle("Login");
    console.log(await page.title())
    
    const UserName = page.locator('[placeholder="Username"]')
    const PassWord = page.locator('[placeholder="Password"]')
    const signIn = page.locator(".loginButton")
    // wipe out existing data written in the text fiel 
    await UserName.fill("");
    await UserName.fill("clbfiretesting@yopmail.com");
   
    await PassWord.fill("");
    await PassWord.fill("LongBeach@2001")
   
    await signIn.click();
    await expect(page).toHaveURL( /https:\/\/lbclariti--lbqa\.sandbox\.my\.site\.com\/.*/);
    console.log(await page.locator(".service-card h2.service-title ").last().textContent());
    const cardTitles= page.locator(".service-card h2.service-title ")
    const allCardTitles = await cardTitles.allTextContents()
    console.log(allCardTitles);
    await expect(page).toHaveTitle("Home")
    console.log(await page.title())


// TextContent -> wait untill the element appears . playwright autowait for this function untill 
///                element appearance .
// AllTextContent=> does''nt wait for the element appearance it will run also  passed the test 
// by declaring [ ] empty array ... but iin the current scenario AllTextContent will show and 
// display reault of all elementss because wee are using TextContent before it !!!

// another way is wait for network call

    //await page.waitForLoadState('networkidle')
    //console.log(await page.locator(".service-card h2.service-title ").first().textContent());
    
    // await page.locator("button[aria-label='User Profile CLB Fire']").click();
    
   
});

test('Click on Apply For Permit', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://lbclariti--lbqa.sandbox.my.site.com/s/login/?language=en_US");
    await expect(page).toHaveTitle("Login");
    console.log(await page.title())
    
    const UserName = page.locator('[placeholder="Username"]')
    const PassWord = page.locator('[placeholder="Password"]')
    const signIn = page.locator(".loginButton")
    // wipe out existing data written in the text fiel 
    await UserName.fill("");
    await UserName.fill("clbfiretesting@yopmail.com");
   
    await PassWord.fill("");
    await PassWord.fill("LongBeach@2001")
   
    await signIn.click();
    console.log(await page.locator(".service-card h2.service-title ").last().textContent());
    const cardTitles= page.locator(".service-card h2.service-title ")
    const allCardTitles = await cardTitles.allTextContents()
    console.log(allCardTitles);
    /// accessing buttons dynamically

 
});


test('register user', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://lbclariti--lbqa.sandbox.my.site.com/s/login/?language=en_US");
    await expect(page).toHaveTitle("Login");
    console.log(await page.title());
 await page.locator("button[title='Individual Register']").click();
    //   const[newPage] = await  Promise.all(
    //         [
    //             context.waitForEvent('page'),
    //             documentLink.click(),

    //         ])
   console.log(await page.locator(".slds-is-relative strong").textContent());
   // enter information 
   await page.locator("#input-66").fill("Maira")
   


         

    
})

test('Logout', async({page})=>{

    await page.goto("https://lbclariti--lbqa.sandbox.my.site.com/s/");
    await expect(page).toHaveTitle("Home")
    console.log(await page.title())
    await page.waitForLoadState('networkidle')

})