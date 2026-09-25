import{test,expect,Locator, Page} from'@playwright/test';

export class OrderHistoryPage {
    
ordersButton : Locator;
orderTable : Locator;
rows : Locator;
orderIdDetails :Locator;
page: Page;


    constructor(page: Page) {
        this.page = page;
        this.ordersButton = page.locator("li .fa-handshake-o");
        this.orderTable = page.locator("tbody").first();
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async goToOrders() {
        await this.ordersButton.click();
        await this.orderTable.waitFor();
    }

    async searchOrderAndSelect(orderId : any) {

        const rowCount = await this.rows.count();

        for (let i = 0; i < rowCount; i++) {

            const row = this.rows.nth(i);
            const rowOrderId = await row.locator("th").textContent();

            if (rowOrderId && orderId.includes(rowOrderId.trim())) {
                await row.locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId() {
        return await this.orderIdDetails.textContent();
    }
}

module.exports = { OrderHistoryPage };