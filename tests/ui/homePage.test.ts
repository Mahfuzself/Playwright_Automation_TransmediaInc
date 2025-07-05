
import test,{expect} from '../../fixtures/basePages';
  test("TC1 : Input a Board name, press enter. Verify Board created successfully", async ({page,homePage}) => { 
    let boardName = "Test Board";
    await homePage.navigate();
    await homePage.getTitle();
    //check board name exists, then delete
    await homePage.verifyBoardNameExists_ThenDelete()
    //create a new board
    await homePage.InputBoardName(boardName);
    await page.waitForTimeout(1000); 
    await homePage.clickHomeButton();
    await page.waitForTimeout(1000);
    await homePage.verifyBoardName(boardName);

  });
  test("TC2 : Add two lists and verify two lists created successfully.", async ({page,homePage}) => {
     await homePage.navigate();
     await homePage.clickBoard();
     await homePage.inputListName("List 1");
     await homePage.clickAddListButton();
     await homePage.inputListName("List 2");
     await homePage.clickAddListButton();
     await homePage.verifyListName1("List 1");
     await homePage.verifyListName2("List 2");
  });
  test("TC3: Delete a list.", async ({page,homePage}) => {
     await homePage.navigate();
     await homePage.clickBoard();
     await homePage.listThreeDots();
     await homePage.deleteList();

  });
