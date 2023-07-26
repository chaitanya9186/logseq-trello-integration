let trelloApiKey;
let trelloToken;
const TRELLO_LIST_ID = 'abc'
function pushTodoToTrello(todoText) {
    if (!trelloApiKey || !trelloToken) {
        console.error('Trello API Key or Token not set!');
        return;
    }

    const url = `https://api.trello.com/1/cards?key=${trelloApiKey}&token=${trelloToken}&idList=${TRELLO_LIST_ID}&name=${encodeURIComponent(todoText)}`;

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
        trelloToken = settings.trello_token;
    });

    // Create onTodoAdded listener to push the todo to trello
    logseq.App.onTodoAdded((todo) => {
        pushTodoToTrello(todo.text);
    });
});
