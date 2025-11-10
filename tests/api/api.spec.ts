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
        const response = await request.get(baseURL + "api/people/2");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
    });
    
    test('verifyCreatingPerson', async ({ request }) => {
        let person: any = {};  
        person.firstName = "TestUser1firstName";
        person.lastName = "TestUser1lastName";        
        const response = await request.post(baseURL + "api/people", {
            data: person,
            headers:{
                'Content-Type':'application/json'
            }
        });
        expect(response.status()).toBe(204);
        const responseBody = await response.json();
        console.log(responseBody);
    });
});