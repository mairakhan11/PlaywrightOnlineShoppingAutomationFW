export class ApiUtils

{
    apiContext : any ;
    LoginPayload : string ;

    constructor(apiContext : any , LoginPayload: string)
    {
        this.apiContext= apiContext;
        this.LoginPayload= LoginPayload;
    }
   async  getToken()
    {
         const LoginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                 {
                    data: this.LoginPayload
                });
            const LoginResponseJson = await LoginResponse.json(); 
            const   token = LoginResponseJson.token;
            console.log(token);
            return token;

    }
    async createOrder(orderPayload:string)
    {
        let response ={token : String , orderId: String};
        response.token= await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
                    {
                        data: orderPayload,
                        headers:
                        {
                            'Authorization' : response.token,
                            'Content-Type': 'application/json'
                        },
                    })
                

                const orderResponseJson = await orderResponse.json();
                console.log(orderResponseJson);
           
                const orderId = await orderResponseJson.orders[0];
                response.orderId=orderId;
                return response;
                console.log('Order ID', orderId)
    }

}
module.exports={ApiUtils};