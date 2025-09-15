import { Page, expect } from "@playwright/test";
import { privateDecrypt } from "crypto";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(strtDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(strtDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleDateString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})

        const exactedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${exactedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${exactedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, { exact: true }).click();
        return dateToAssert
    }
}

