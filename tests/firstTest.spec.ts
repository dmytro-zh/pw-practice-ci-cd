import {test, expect} from '@playwright/test'
import { last } from 'rxjs-compat/operator/last'

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locator syntax rules', async({page}) => {
    //Locator by tag name
    await page.locator('input').first().click()
    // by ID
    page.locator('#inputEmail1')
    // by class value
    page.locator('.shape-rectangle')
    // by attribute
    page.locator('[placeholder="Email]"')
    // by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]"')
    // combine different selectors
    page.locator('input[placeholder="Email]".shape-rectangle[nbinput]')
    // by XPath (NOT recommended)
    page.locator('//*[@id="inputEmail1"]')
    // by parcial taext match
    page.locator(':text("Using")')
    // by exact text match 
    page.locator(':text-is("Using the Grid")')

})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText("Using the grid").click()

    await page.getByTitle("IoT Dashboard").click()
})

test('Locating child elements', async({page}) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(1).getByRole('button').click()

})

test('Locating parent elemrnt', async({page}) => {

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Password"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

    //xPath 
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()

})

test('Reusing thelocators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Password123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    expect(emailField).toHaveValue('test@test.com')
})

test('Exctracting values', async({page}) => {
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: "basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtons = await page.locator('nb-radio').allTextContents()

    expect(allRadioButtons).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox')

})

test('Assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    // General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion 
    await expect(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

})