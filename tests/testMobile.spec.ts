import {test, expect } from "@playwright/test"


test('input fields', async({page}, testInfo) => {

    await page.goto('/')
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()

    }
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.locator('.sidebar-toggle').click()
    const UsingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

    await UsingTheGridEmailInput.fill('first@gmail.com')
    await UsingTheGridEmailInput.clear()
    await UsingTheGridEmailInput.pressSequentially('test1@gmail.com')

    })