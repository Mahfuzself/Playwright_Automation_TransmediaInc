import { expect, Page } from "@playwright/test";
export default class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  private homePageElement = {
    Board_Field : "//input[@name='newBoard']",
    createBoard: "//button[@data-cy='createBoard']",
    homeBtn : "//button[@data-cy='home']",
    board : "//div[@class='board']",
    AddListBtn : "Add list",
    inputList: "//input[contains(@class,'py-2 px-2')]",
    list: "//input[@data-cy='list-name']",
    Delete_list : "//div[normalize-space(text())='Delete list']",
    List_ThreeDots : "//button[@data-cy='list-options']",
    checkBoard: "//div[@data-cy='board-item']",
    boardThreeDots: "//button[@data-cy='board-options']",

  }
  async navigate() {
    await this.page.goto("/");
  }
  async getTitle(): Promise<void> {
    
    await this.page.waitForLoadState("domcontentloaded");
    const title = await this.page.title();
    await expect(title).toBe("Transmedia Inc.");
    console.log("Page title is: " + title);

  }
    async InputBoardName(boardName: string): Promise<void> {     
        const ele =  await this.page.locator(this.homePageElement.Board_Field);
        try {
            await ele.fill(boardName);
             await this.page.keyboard.press("Enter");
        } catch (error) {

            throw new Error(`Failed to create board with name: ${boardName}. Error: ${error}`);
        }
    }
    async verifyBoardName(boardName: string): Promise<void> {
        const ele = this.page.locator("h2", { hasText: `${boardName}` });
        try {
            await expect(ele).toContainText(boardName);
        } catch (error) {
            throw new Error(`Failed to get board name. Error: ${error}`);
        }
    }
    async clickHomeButton(): Promise<void> {
        const ele = this.page.locator(this.homePageElement.homeBtn);
        try {
            await ele.click();
        } catch (error) {
            throw new Error(`Failed to click home button. Error: ${error}`);
        }
    }
    async clickBoard(): Promise<void> {
        const ele = this.page.locator(this.homePageElement.board);
        try {
            await ele.click();
            await this.page.waitForTimeout(1000)
        } catch (error) {
            throw new Error(`Failed to click on board. Error: ${error}`);
        }
    }
    async clickAddListButton(): Promise<void> {
        const ele = this.page.getByText(this.homePageElement.AddListBtn, { exact: true });
        try {
            await ele.first().click();
        } catch (error) {
            throw new Error(`Failed to click on Add List button. Error: ${error}`);
        }
    }
    async inputListName(listName: string): Promise<void> {
        const ele = this.page.locator(this.homePageElement.inputList);
        try {
            await ele.fill(listName);
        } catch (error) {
            throw new Error(`Failed to input list with name: ${listName}. Error: ${error}`);
        }
    }
    async verifyListName1(listName1: string): Promise<void> {
        let ele =  await this.page.getByRole('textbox').nth(1);
        try {
            await expect(ele).toHaveValue(listName1);
        } catch (error) {
            throw new Error(`Failed to get list name. Error: ${error}`);
        }
    }  
    async verifyListName2(listName2: string): Promise<void> {
        let ele =   await this.page.getByRole('textbox').nth(2);
        try {
            await expect(ele).toHaveValue(listName2);
        } catch (error) {
            throw new Error(`Failed to get list name. Error: ${error}`);
        }
    }   
    async listThreeDots(): Promise<void> {
        const ele = this.page.locator(this.homePageElement.List_ThreeDots).first();
        try {
            await ele.click();
        } catch (error) {
            throw new Error(`Failed to click on three dots. Error: ${error}`);
        }
    }
    async deleteList(): Promise<void> {
        const ele = this.page.locator(this.homePageElement.Delete_list);
        try {
            await ele.click();
        } catch (error) {
            throw new Error(`Failed to click on delete list. Error: ${error}`);
        }
    }
    async verifyBoardNameExists_ThenDelete(): Promise<void> {
        const ele = this.page.locator(this.homePageElement.checkBoard);
        
            if( await ele.count() > 0) {
                const threeDots = this.page.locator(this.homePageElement.boardThreeDots);
                await this.page.locator(this.homePageElement.board).click();
                await threeDots.click();
                const deleteButton = this.page.getByText("Delete board");
                await expect(deleteButton).toBeVisible();
                await deleteButton.click();

            }
        } 
    }
 
