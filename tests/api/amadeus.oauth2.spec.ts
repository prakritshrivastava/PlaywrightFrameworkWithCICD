import {test,expect} from "@playwright/test";

let accessToken:string;

let OAUTH_CONFIG={
    tokenURL:'https://test.api.amadeus.com/v1/security/oauth2/token',
    clientId:process.env.OAUTH_CLIENT_ID!,
    clientSecret:process.env.OAUTH_CLIENT_SECRET!,
    grantType:process.env.OAUTH_CLIENT_GRANT_TYPE!
}

//Token might be expired hence always use beforeEach and run it everytime
test.beforeEach('POST generate token',async({ request })=>{

    let response=await request.post(OAUTH_CONFIG.tokenURL,{
        form:{
            grant_type:OAUTH_CONFIG.grantType,
            client_id:OAUTH_CONFIG.clientId,
            client_secret:OAUTH_CONFIG.clientSecret
        }
    });

    //expect(response.status()).toBe(200);
    let json_res=await response.json();
    console.log(json_res);
    accessToken=json_res.accessToken;

});

test('GET Location Data',async({request})=>{

    //https://test.api.amadeus.com/v1/reference-data/locations?pubType=CITY,AIRPORT&keyword=MUC&countryCode=DE
    let baseURL = 'https://test.api.amadeus.com';
    let endPointURI = '/v1/reference-data/locations';

    let queryParam={
        subType:'CITY,AIRPORT',
        keyword:'MUC',
        countryCode:'DE'
    };

    let location_json=await request.get(`${baseURL}${endPointURI}`,{
        headers:{
           Authorization:`Bearer ${accessToken}`     
        },
        params:queryParam
    });

    let locationResponse=await location_json.json();
    console.log("Location: ",locationResponse);

    let location_one=locationResponse.data[1];
    console.log("Location: One",location_one);

})