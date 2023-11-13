import { test, expect } from "./fixtures/trello-test";

test.describe("Trello-like board", () => {
  let boardName: string;
  const listName = "TODO";

  test.beforeEach(async ({ request, myBoardsPage }) => {
    //clear database
    const randomNumber = Math.trunc(Math.random() * 100000);
    boardName = "Chores" + `${randomNumber}`;
    await request.post("/api/boards", { data: { name: boardName } });

    //load the app
    await myBoardsPage.load();
    await myBoardsPage.openBoard(boardName);
  });

  test("should display the new board", async ({ boardPage }) => {
    await boardPage.expectNewBoardLoaded(boardName);
  });

  test("should create the first list in a board", async ({ boardPage }) => {
    await boardPage.addList(listName);
    await expect(boardPage.listName).toHaveValue(listName);
  });

  test("should create a list with multiple cards", async ({ boardPage }) => {
    await boardPage.addList(listName);
    await boardPage.addCardToList(0, "Buy groceries");
    await boardPage.addCardToList(0, "Mow the lawn");
    await boardPage.addCardToList(0, "Walk the dog");
    await expect(boardPage.cardTexts).toHaveText([
      "Buy groceries",
      "Mow the lawn",
      "Walk the dog",
    ]);
  });

  test("should navigate home from a board", async ({
    boardPage,
    myBoardsPage,
  }) => {
    await boardPage.goHome();
    await myBoardsPage.expectLoaded([boardName]);
  });
});

// first step refactor code to page object

// test("Create a new board with a list and card", async ({
//   getStartedPage,
//   boardPage,
//   myBoardsPage,
// }) => {
//   //load the page
//   await getStartedPage.load();

//   // Create a new board
//   await getStartedPage.createFirstBoard("Chores");
//   await boardPage.expectNewBoardLoaded("Chores");

//   // Create a list
//   await boardPage.addList("TODO");
//   await expect(boardPage.listName).toHaveValue("TODO");

//   // Add cards to the list
//   await boardPage.addCardToList(0, "Buy groceries");
//   await boardPage.addCardToList(0, "Mow the lawn");
//   await boardPage.addCardToList(0, "Walk the dog");

//   await expect(boardPage.cardTexts).toHaveText([
//     "Buy groceries",
//     "Mow the lawn",
//     "Walk the dog",
//   ]);

//   // Navigate to the home page
//   await boardPage.goHome();
//   await myBoardsPage.expectLoaded(["My Boards", "Chores"]);
// });
