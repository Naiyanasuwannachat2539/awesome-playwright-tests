import { test, expect } from "./fixtures/trello-test";

test("Create a new board with a list and card", async ({
  getStartedPage,
  boardPage,
  myBoardsPage,
}) => {
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
