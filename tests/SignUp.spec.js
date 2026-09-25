const {test, expect}= require('@playwright/test')
const Email ='mairahk593@gmail.com'
const Pass = 'Mairakhan!999'
let webContext;
test.beforeAll(async ({browser})=>{
     const Context = await browser.newContext();
    const page = await Context.newPage();
    await page.goto("https://automationexercise.com/login");
    const UserName =  page.locator(".login-form [type=email]");
    const Password = page.locator(".login-form [type=password]");
    const loginButton = page.locator(".login-form [type=submit]");
    await UserName.fill(Email); 
    await Password.fill(Pass);
    await loginButton.click();
    await Context.storageState({path: 'state1.json'});
    webContext=  await browser.newContext({storageState:'state1.json'});
})



// test('Login with Wrong Credential ', async ({ browser }) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://automationexercise.com/login");
//     // login to the application
//     const Email ='mairakhan652@gmail.com';
//     const UserName =  page.locator(".login-form [type=email]");
//     const Password = page.locator(".login-form [type=password]");
//     const loginButton = page.locator(".login-form [type=submit]");
//     await UserName.fill(Email); 
//     await Password.fill("Maueyiuwfn07t0");
//     await loginButton.click();
//     await expect(page.locator("p[style*='red']")).toBeVisible();
//     await page.pause();


// })

// test('logout user', async () => {
//      const page =await webContext.newPage()
//     await page.goto("https://automationexercise.com");
//     // login to the application

//     await page.getByText('Logout').click();
//     await expect(page.locator(".login-form")).toBeVisible();
//     await page.pause();
    
// })

test('Contact us form', async () => {
        const page =await webContext.newPage()
    await page.goto("https://automationexercise.com");
    await page.goto("https://automationexercise.com/contact_us");

})


