import { test, expect } from '@playwright/test';
import { readCsv } from '../../utils/readCsv';
//import path from 'path';

const testData = readCsv('testdata/test_data_sheet.csv');
//const testDataPath = path.resolve(__dirname, '../../testdata/test_data_sheet.csv');
//const testData = readCsv(testDataPath);

test.describe("Form Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/form');
  })
  //This test is to verify the availability of elements in the form. 
  //I have commented out some of the locator methods specific to playwright and replaced them with traditional methods such as XPath.
  test('verify the availability of form elements', async ({ page }) => {    
    //await expect(page.getByRole('link', { name: 'Formy' })).toBeVisible;
    await expect(page.locator(".//*[@id='logo'][text()='Formy']")).toBeVisible;
    //await expect(page.getByRole('link', { name: 'Form', exact: true })).toBeVisible;
    await expect(page.locator(".//*[@class='nav-link'][text()='Form']")).toBeVisible;
    //await expect(page.getByRole('link', { name: 'Components' })).toBeVisible;
    await expect(page.locator(".//*[@id='navbarDropdownMenuLink'][contains(text(), 'Components')]")).toBeVisible;
    //await expect(page.getByRole('heading', { name: 'Complete Web Form' })).toBeVisible;
    await expect(page.locator(".//*[text()='Complete Web Form']")).toBeVisible;
    //await expect(page.getByText('First name')).toBeVisible;
    await expect(page.locator(".//*[text()='First name']")).toBeVisible;
    //await expect(page.getByRole('textbox', { name: 'First name' })).toBeVisible;  
    await expect(page.locator(".//*[@id='first-name']")).toBeVisible;  
    //await expect(page.getByText('Last name')).toBeVisible;  
    await expect(page.locator(".//*[text()='Last name']")).toBeVisible;  
    //await expect(page.getByRole('textbox', { name: 'Last name' })).toBeVisible;
    await expect(page.locator(".//*[@id='last-name']")).toBeVisible;
    //await expect(page.getByText('Job title')).toBeVisible;
    await expect(page.locator(".//*[text()='Job title']")).toBeVisible;
    //await expect(page.getByRole('textbox', { name: 'Job title' })).toBeVisible;
    await expect(page.locator(".//*[@id='job-title']")).toBeVisible;
    //await expect(page.getByText('Highest level of education')).toBeVisible;
    await expect(page.locator(".//*[text()='Highest level of education']")).toBeVisible;
    //await expect(page.locator('#radio-button-3')).toBeVisible;  
    await expect(page.locator(".//*[@id='radio-button-1']")).toBeVisible;  
    await expect(page.locator(".//*[@id='radio-button-2']")).toBeVisible;  
    await expect(page.locator(".//*[@id='radio-button-3']")).toBeVisible;  
    //await expect(page.getByText('Sex')).toBeVisible;
    await expect(page.locator(".//*[text()='Sex']")).toBeVisible;
    //await expect(page.locator('#checkbox-1')).toBeVisible;  
    await expect(page.locator(".//*[@id='checkbox-1']")).toBeVisible;  
    await expect(page.locator(".//*[@id='checkbox-2']")).toBeVisible;  
    await expect(page.locator(".//*[@id='checkbox-3']")).toBeVisible;  
    //await expect(page.getByText('Years of experience:')).toBeVisible;
    //await expect(page.getByLabel('Years of experience:')).toBeVisible;  
    await expect(page.locator(".//*[text()='Years of experience:']")).toBeVisible;
    await expect(page.locator(".//*[@id='select-menu']/*[text()='Select an option']")).toBeVisible;
    //await expect(page.getByText('Date', { exact: true })).toBeVisible;
    await expect(page.locator(".//*[text()='Date']")).toBeVisible;
    //await expect(page.getByRole('textbox', { name: 'mm/dd/yyyy' })).toBeVisible;      
    await expect(page.locator(".//*[@id='datepicker']")).toBeVisible;
    //await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible;
    await expect(page.locator(".//*[@role='button'][text()='Submit']")).toBeVisible;
  });

  for (const row of testData) {
    if (row.TestName === 'positiveTest') {
      test('verify form is successfully submitted', async ({ page }) => {    
        //await page.getByRole('textbox', { name: 'First name' }).click();    
        //await page.getByRole('textbox', { name: 'First name' }).fill('Asanka');  
        await page.locator("//*[@id='first-name']").click();  
        await page.locator("//*[@id='first-name']").fill(row.FirstName);  
        //await page.getByRole('textbox', { name: 'Last name' }).click();
        //await page.getByRole('textbox', { name: 'Last name' }).fill('Guruge');  
        await page.locator("//*[@id='last-name']").click();
        await page.locator("//*[@id='last-name']").fill(row.LastName);
        //await page.getByRole('textbox', { name: 'Job title' }).click();
        //await page.getByRole('textbox', { name: 'Job title' }).fill('Software Engineer');  
        await page.locator("//*[@id='job-title']").click();
        await page.locator("//*[@id='job-title']").fill(row.JobTitle);  
        //await page.locator('#radio-button-3').check();  
        await page.locator("//*[@id='" + row.LevelOfEducation + "']").check();  
        //await page.locator('#checkbox-1').check();  
        await page.locator("//*[@id='" + row.Gender + "']").check();  
        //await page.getByLabel('Years of experience:').selectOption('4');  
        await page.locator("//*[@id='select-menu']").selectOption(row.Experience);
        //await page.getByRole('textbox', { name: 'mm/dd/yyyy' }).click();
        //await page.getByRole('cell', { name: '26' }).click();  
        await page.locator("//*[@id='datepicker']").click();
        await page.locator("//*[@id='datepicker']").fill(row.DateEntered);  
        //await page.getByRole('button', { name: 'Submit' }).click();
        await page.locator("//*[@role='button'][text()='Submit']").click();
        //await expect(page.getByRole('heading')).toContainText('Thanks for submitting your form');  
        await expect(page.locator("//*[@class='container']/*[text()='Thanks for submitting your form']")).toContainText('Thanks for submitting your form');  
        //await expect(page.getByRole('alert')).toContainText('The form was successfully submitted!');
        await expect(page.locator("//*[contains(@class, 'alert') ][contains(text(),'The form was successfully submitted!')]")).toContainText(row.ExpectedResult);
      });
    }
  }
});