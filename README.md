# rick-morty-react
A small React project that fetches data from the Rick and Morty API and displays a feed of character cards.

# How to run
Clone the repo and run:
```
npm i
npm start
```

# Approach
I first mocked out a design on paper and from there decomposed the UI into components: a filter/sort bar, a card feed, individual cards, and the overall feed wrapper. From there I started by looking at the API documentation to get a sense of what the API responses looked like. Then, I created some dummy data to start with and created the static version of the UI (ignoring state). Once I had created the scaffolding for the filter/sort bar and the card feed, I started to think about where state should be used. I determined that the filter/sort bar will be setting state and then the feed wrapper will take that state, query the API, and then set a "characters" state that is then passed to the feed. After confirming the functionality of the the filtering/sorting, I created more pleasing cards for each character.

# Notes/Challenges
1. I decided to use Typescript for this project which definitely made development slower but I wanted to challenge myself to learn something new.
1. Midway through development, I realized that the API did not have a sorting query feature. Furthermore, the API is paginated - even if you don't specify a page. This meant that there was no endpoint to get all the characters in one call. Therefore, I would've had to get all pages of the API endpoint and store that list in a state variable. All subsequent updates to the filter/sort state would alter that character list. However, with the way the instructions were worded, it seemed like the intention was to call the API whenever the filtering or sorting changes. Therefore, I made a judgement call to follow the instructions and call the API whenever the sorting/filtering changes. This worked fine for filtering since that is supported by the API, but I had to sort the resulting character list after the API had been called. This minimizes the number of API calls but comes at the cost of non-fully-functional sorting since the base API endpoint only returns 20 characters.
