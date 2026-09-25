
import{test,expect,Locator, Page} from'@playwright/test';
export class LoginPage{

    signInButton:Locator;
    userName:Locator;
    pass:Locator;
    page:Page;
    constructor(page:Page)
    {
        this.page=page;
        this.signInButton = page.locator("#login");
        this.userName=page.locator("#userEmail");
        this.pass=page.locator("#userPassword");

    }
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client")
    }

   async validLogin(email:string,password:string)
    {
        await this.userName.fill(email);
        await this.pass.fill(password);    
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle')
    }
}
module.exports = {LoginPage}