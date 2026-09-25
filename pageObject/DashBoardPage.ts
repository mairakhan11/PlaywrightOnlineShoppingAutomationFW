import{test,expect,Locator, Page} from'@playwright/test';
export class DashBoardPage {
  products:Locator;
  productTexts:Locator;
  title:Locator;
  cart:Locator;
  page:Page;

    constructor(page:Page)
    {
          this.page =page;
          this.products= page.locator(".card-body");
          this.productTexts = page.locator(".card-body b");
          this.title= page.locator(".card-body b")   ;
          this.cart= page.locator("[routerlink*='cart']")
    
        }

        async searchProductAddCart(productName:string)
        {
                // const allTextTitles= await page.locator(".card h5").allTextContents();
                //console.log(allTextTitles);
                // const titles = this.productTexts.first().textContent()
                // console.log(titles);
                 await this.page.waitForLoadState('networkidle');
                await this.title.first().waitFor();
                const alltitles = await this.productTexts.allTextContents();
                console.log(alltitles);
                const count = await this.products.count(); 
                for(let i=0; i<count; ++i){
                  if(await this.products.nth(i).locator("b").first().textContent() === productName){
                     await this.products.nth(i).locator("text= Add To Cart").click();
                     break;   
                  }
                }
                 
        }
        async navigateToCart()
        {
             await this.cart.click();
             await expect(this.page).toHaveURL(/.*cart/);
        }

}
module.exports ={DashBoardPage}