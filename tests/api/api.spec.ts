import { test, expect } from '@playwright/test';

test.describe("Example API Requests", () => {

    const baseURL = "http://192.168.56.1:5000/";

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    test('verifyDetailsOfAllPeople', async ({ request }) => {
        const response = await request.get(baseURL + "api/people");
        expect(response.status()).toBe(200);
    });
});