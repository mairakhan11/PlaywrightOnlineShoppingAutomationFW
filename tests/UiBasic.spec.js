const {test, expect}= require('@playwright/test');

// in order to recognise the test cases we need to import "'@playwright/test'" this //

test('My First Test Case', async ({browser})=>
   {
    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const Username = page.locator('#username')
    const Password = page.locator('#password')
    const login= page.locator('#signInBtn')

    await Username.fill("rahulshetty");
    await Password.fill("Learning@830$3mK2");
    await login.click();
    // textContent is use to exxtract the value of selected locator 
    console.log(await page.locator("[style='display: block;']").textContent());
    await expect(page.locator("[style='display: block;']")).toContainText("Incorrect"); 

    await Username.fill("");
    await Username.fill("rahulshettyacademy");
    await login.click();
    console.log(await page.locator(".service-card ").allTextContents());
    


    });
// if you want to run only one test then add "only" with test case .. that will help you in case  where you dont want
// to run all the test just only the one test ..//
   
       /// Locators:
       // two ways:  xpath css, playwright supported css selectors 
       /// - this selector will help the playwright to access this editing box effectively.
       // - The playwright, by default, does not know exactly how to access this editing box.
      //Therefore, to get there, these specific people will help the playwright to do so.
        // Playwright rely only on CSS , we can use xpath also but css dominates 
        // Rules for writing selectors :
        // 1-- if Id is present => tagname #id  OR id
        // 2. if class attribute is present  => css -> tagname .class  or .class
        // 3. Css based on any attribute => [attribbute'value]
        // 4.  traversing from parent to child => parenttagname >> childtagname 
        // 5. if need to write the locator based on text => text= '' 

        // in order type sonething inside the text box there are two ways
        // type  and fill now playwright fully support Fill and depricated the Type 

    

 test('Ui Controls ', async ({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const Username = page.locator('#username')
    const Password = page.locator('#password')
    const login= page.locator('#signInBtn')
    //for static dropdown 
    const dropDown = page.locator("select.form-control");
    // for radio button 
  
    await Username.fill("rahulshetty");
    await Password.fill("Learning@830$3mK2");
    await dropDown.selectOption("consult")
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    console.log(page.locator(".radiotextsty").nth(1).isChecked())
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
    await login.click();

    // textContent is use to exxtract the value of selected locator 
    console.log(await page.locator("[style='display: block;']").textContent());
    await expect(page.locator("[style='display: block;']")).toContainText("Incorrect"); 


    await Username.fill("");
    await Username.fill("rahulshettyacademy");

    await login.click();
   
    })

    test('child windows handling', async ({browser})=>{

        const context = await browser.newContext(); 
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
         const documentLink = page.locator("[href*='documents-request']");
         //listen for any new page have three states : promise> return something | pending- the step is still in  process 
         // , rejected >  failed , fullfilled > successfully executed 
         // 
         const[newPage] = await  Promise.all(
            [
                context.waitForEvent('page'),
                documentLink.click(),

            ])
           const text = await newPage.locator(".red").textContent();
           console.log(await text)
           const arrayText= text.split("@");
           const domain = arrayText[1].split(" ")[0]
        //    console.log(domain);
           await page.locator("#username").fill(domain);
           await page.pause();
           console.log(await page.locator("#username").textContent())

           // dom pr value available hai to usko extract krnay k liye
           // use TECXTCONTENT() 
           //- runtime pr value add ho rhi hai usko extract krnay k liye use  INPUTVALUE() function  
          
         
         




    })