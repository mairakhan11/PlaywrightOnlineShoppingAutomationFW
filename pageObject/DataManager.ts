//const {LoginPage}= require('./LoginPage');
//const {DashBoardPage} = require('./DashBoardPage');
//const{CheckoutPage}= require('./CheckoutPage');
//const{OrderHistoryPage} = require('./OrderHistoryPage')

import{LoginPage} from './LoginPage';
import{DashBoardPage} from './DashBoardPage';
import{CheckoutPage} from './CheckoutPage';
import{OrderHistoryPage} from './OrderHistoryPage';
import{Page} from '@playwright/test';
export class DataManager {
    LoginPage: LoginPage;
    DashBoardPage: DashBoardPage;
    CheckoutPage:CheckoutPage;
    OrderHistoryPage:OrderHistoryPage;
    page:Page;



constructor(page:Page)
{
    this.page = page;
    this.LoginPage= new LoginPage(this.page);
    this.DashBoardPage= new DashBoardPage(this.page);
    this.CheckoutPage = new CheckoutPage(this.page)
    this.OrderHistoryPage = new OrderHistoryPage(this.page)
}
getLoginPage()
{
    return this.LoginPage;
}
getDashboardPage()
{
    return this.DashBoardPage;
}
getCheckoutPage()
{
    return this.CheckoutPage;
}
getOrderHistoryPage()
{
    return this.OrderHistoryPage;
}
}
module.exports = {DataManager}