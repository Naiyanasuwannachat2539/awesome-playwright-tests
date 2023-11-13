import { test, expect, type Page } from "@playwright/test";
import { GetStartedPage } from "./pages/get-started";
import { BoardPage } from "./pages/board";
import { MyBoardsPage } from "./pages/my-boards";

test("Create a new board with a list and card", async ({ page }) => {
  const getStartedPage = new GetStartedPage(page);
  const boardPage = new BoardPage(page);
  const myBoardsPage = new MyBoardsPage(page);

  //load the page
  await getStartedPage.load();

  // Create a new board
  await getStartedPage.createFirstBoard("Chores");
  await boardPage.expectNewBoardLoaded("Chores");

  // Create a list
  await boardPage.addList("TODO");
  await expect(boardPage.listName).toHaveValue("TODO");

  // Add cards to the list
  await boardPage.addCardToList(0, "Buy groceries");
  await boardPage.addCardToList(0, "Mow the lawn");
  await boardPage.addCardToList(0, "Walk the dog");

  await expect(boardPage.cardTexts).toHaveText([
    "Buy groceries",
    "Mow the lawn",
    "Walk the dog",
  ]);

  // Navigate to the home page
  await boardPage.goHome();
  await myBoardsPage.expectLoaded(["My Boards", "Chores"]);
});
