import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormlayoutsPage extends HelperBase{

    constructor(page: Page){
    super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByPlaceholder('Email').fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
/**
 * This method fill out the inline form with user details
 * @param name - shoould be string with first and last name
 * @param email - should be valide email 
 * @param rememberMe - should be boolean
 */
    async submitUsingTheInlineFormWithCredentialsAndCheckbox(name: string, email: string, rememberMe: boolean){
        const usingTheInlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await usingTheInlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await usingTheInlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await usingTheInlineForm.getByRole('checkbox').check({force: true})
            await usingTheInlineForm.getByRole('button').click()
    }
}