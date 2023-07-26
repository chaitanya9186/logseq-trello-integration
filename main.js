let trelloApiKey;
let trelloSecret;
let trelloTodoListId;
const TRELLO_LIST_ID = 'abc'
function pushTodoToTrello(todoText) {
    if (!trelloApiKey || !trelloToken || !trelloTodoListId) {
        console.error('Trello API Key or Secret or Todo list id not set!');
        return;
    }

    const url = `https://api.trello.com/1/cards?key=${trelloApiKey}&token=${trelloSecret}&idList=${trelloTodoListId}&name=${encodeURIComponent(todoText)}`;

    fetch(url, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Card created:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


logseq.ready(() => {
    // Fetch user settings
    logseq.getAppSettings("trello-integration").then(settings => {
        trelloApiKey = settings.trello_api_key;
        trelloSecret = settings.trello_secret;
        trelloTodoListId = settings.trello_todo_list_id;
    });

    // Create onTodoAdded listener to push the todo to trello
    logseq.App.onTodoAdded((todo) => {
        pushTodoToTrello(todo.text);
    });
});
