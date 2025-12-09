import { test, expect } from '@playwright/test';

test.describe("Example API Requests", () => {

    const baseURL = "http://192.168.56.1:5000/";

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('verifyDetailsOfAllPeople', async ({ request }) => {
        const response = await request.get(baseURL + "api/people");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('verifyDetailsOfOnePerson', async ({ request }) => {
        let personId = "2";
        const response = await request.get(baseURL + "api/people/" + personId);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
    });
    
    test('verifyCreatingPerson', async ({ request }) => {
        let person: any = {};  
        person.fname = "TestUser1firstName";
        person.lname = "TestUser1lastName";        
        const response = await request.post(baseURL + "api/people", {
            data: person,
            headers:{
                'Content-Type':'application/json'
            }
        });
        expect(response.status()).toBe(204);
        console.log(response.body);        
    });

    test('verifyUpdatingExistingPerson', async ({ request }) => {
        let person: any = {};
        let personId = "6";  
        person.fname = "TestUser2firstName";
        person.lname = "TestUser2lastName";        
        const response = await request.put(baseURL + "api/people/" + personId , {
            data: person,
            headers:{
                'Content-Type':'application/json'
            }
        });
        expect(response.status()).toBe(200);
        let responseBody = await response.json();
        console.log(responseBody);
        
    });

    test('verifyDeletingExistingPerson', async ({ request }) => {
        let person: any = {};
        let personId = "6";          
        const response = await request.delete(baseURL + "api/people/" + personId);
        expect(response.status()).toBe(200);        
        console.log(response.body);        
    });
});