
import{test,expect,Locator, Page} from'@playwright/test';

export class CheckoutPage {
    cartItem:Locator;
    checkoutButton:Locator;
    countryInput:Locator;
    emailField:Locator;
    submitButton:Locator;
    inputFields:Locator;
    countryDropdown:Locator;
    countryOptions:Locator;
    orderConfirmationText:Locator;
    orderId:Locator;
    page:Page;




    constructor(page:Page) {
        this.page = page;

        // Cart / checkout
        this.cartItem = page.locator("div li").first();
        this.checkoutButton = page.locator(".totalRow .btn-primary");

        // Checkout form
        this.countryInput = page.locator("[placeholder*='Country']");
        this.emailField = page.locator("label[type='text']");
        this.submitButton = page.locator(".action__submit");

        // Other fields
        this.inputFields = page.locator("div input[class='input txt']");

        // Country dropdown
        this.countryDropdown = page.locator(".ta-results");
        this.countryOptions = page.locator(".ta-results button");

        // order id & details 
        this.orderConfirmationText= page.locator(".hero-primary")
        this.orderId =  page.locator(".em-spacer-1 .ng-star-inserted")
    }
  
    async verifyProduct(productName: string) {
        await this.cartItem.waitFor();
        const bool = await this.getProductLocator(productName);
        await expect(bool).toBeTruthy();
    }
      async getProductLocator(productName: string)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }


    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async enterCountry(country:string) {
        await this.countryInput.pressSequentially(country);
    }

    async enterCardDetails(firstValue:string, lastValue:string) {
        await this.inputFields.first().fill(firstValue);
        await this.inputFields.last().fill(lastValue);
    }

    async selectCountry(countryName:string) {
        await this.countryDropdown.waitFor();

        const optionCount = await this.countryOptions.count();

        for (let i = 0; i < optionCount; i++) {
            let text :any;
            text= await this.countryOptions.nth(i).textContent();

            if (text.trim() === countryName) {
                await this.countryOptions.nth(i).click();
                break;
            }
        }
    }

    async verifyEmail(email:string) {
        await expect(this.emailField).toHaveText(email);
    }

    async placeOrder() {
        await this.submitButton.click();
    }
    async SubmitAndGetOrderId()
        {
            await this.submitButton.click();
            await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
             return await this.orderId.textContent();
        }
}

module.exports = { CheckoutPage };