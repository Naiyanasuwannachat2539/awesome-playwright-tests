import { type Locator, type Page } from "@playwright/test";

export class GetStartedPage {
  readonly page: Page;
  readonly firstBordInput: Locator;
  readonly 

  constructor(page: Page) {
    this.page = page;
    this.firstBordInput = page.getByPlaceholder("Name of your first board"); //page.locator('input[name="newBoard"]')
  }

  async load() {
    await this.page.goto("/");
  }

  async createFirstBoard(name: string){
    await this.firstBordInput.fill(name);
    await this.firstBordInput.press("Enter");
  
  }
}
