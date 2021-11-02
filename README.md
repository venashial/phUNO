# phUNO

*UNO for free, online, multiplayer, with any rules*

### How it works

phUNO is a SvelteKit website that connects to a backend, [phDOS](https://github.com/venashial/phDOS) server. They use [native websockets to communicate](src/lib/utils/api.js). The [index page](src/routes/index.svelte) simply directs the player to the game page.

#### The game page

The [game page](src/routes/game/index.svelte) is split into three 3 stages:

- [Profile](src/routes/game/_Profile.svelte): client chooses a name, and joins the room
- [Lobby](src/routes/game/_Lobby.svelte): client waits for game to start and can see other players; the host has the power to start the game
- [Game](src/routes/game/_Game.svelte): the game page has sub-pages, navigated by the bottom black [menu](src/routes/game/_Game/_Menu.svelte) bar
  - Board (base page, the others are overlaid on top)
    - [Hand](src/routes/game/_Game/_Hand.svelte): holds the player's cards vertically
    - [Piles](src/routes/game/_Game/_Piles.svelte): contains the discard and draw pile
    - [Players](src/routes/game/_Game/_Players.svelte): a list of players, showing the size of their hands
  - [Help](src/routes/game/_Game/_Page/_Help.svelte): instructions on how to play
  - [History](src/routes/game/_Game/_Page/_History.svelte): a log of everyone's actions
  - [Leave](src/routes/game/_Game/_Page/_Leave.svelte): a page with a button to leave

The state of the client is held in the [store](src/routes/game/_store.js).

## Developing

Once you've created a project and installed dependencies with `pnpm install` start a development server:

```bash
pnpm dev
```

## Building

```bash
pnpm build
```

> You can preview the built app with `pnpm preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
