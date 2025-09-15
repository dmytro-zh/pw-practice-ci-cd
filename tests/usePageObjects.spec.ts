import {test, expect} from '@playwright/test'
import { argosScreenshot } from "@argos-ci/playwright";
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test.only('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipsPage()
})

test('paprametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    //await page.screenshot({path:'screenshots/formsLayoutsPage.png'})
    // const buffer = await page.screenshot()
    // console.log(buffer.toString('base64'))
    await pm.onFormLayoutsPage().submitUsingTheInlineFormWithCredentialsAndCheckbox(randomFullName, randomEmail, false)
    // await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/TheInlineForm.png'})
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
    // await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6, 9)
})

test.only('esting with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "form layouts page");
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "date picker page");
})