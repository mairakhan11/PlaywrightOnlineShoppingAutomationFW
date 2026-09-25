import{test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username : string;
    password: string;
    productName : string;
};

export const customtest = baseTest.extend <{testDataForOrder:TestDataForOrder}> (
    {testDataForOrder:
    {
         "username" : "khanmaira632@gmail.com",
         "password" : "Mairakhan!999",
         "productName": "ZARA COAT 3"
    }
}

)