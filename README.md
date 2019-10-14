<h1 align="center">
  <br>
  <a href="https://braid.netlify.com">
    <img src="https://raw.githubusercontent.com/jobn/braid/master/src/icon.png" alt="Braid" width="120">
  </a>
  <br>
  Braid
  <br>
</h1>

<h4 align="center">Standup board for PivotalTracker</h4>

## The problem

You want to hold standups in your team, but you don't want to spend time writing and maintaining post-it notes on a physical board.

And if you do write the post-it notes, the remote developers cannot see them during the standup.

## The solution

Let Braid visualise the stories from the current iteration in the regular 4 column kaban style layout.

Braid lets you filter the stories by owner so you can easily get through the stanup without looking for your own stories.

## What Braid is not

A replacement for the PivotalTracker interface. If you want to do searching, editing, planning or anything else - go to the PivotalTracker webpage.

# Features

- **NEW: Slim theme**

  Want to have more stories on screen at a time? Try the slim theme. Toggle it in the settings tray or using the 's' keyboard shortcut.

- **NEW: Filter by epic**

  Kudos to [@leapingfrogs](https://github.com/leapingfrogs) for building "filter by epic"

- **NEW: Option to disable squashing of Delivered and Accepted columns**

  Change the setting in the settings-tray in the lower right corner. The setting is persisted in localStorage.

* KEYBOARD SHORTCUTS

  - Press n key to move owner filter to next owner.
  - Press p key to move owner filter to previous owner.
  - Press c key to clear owner filters.
  - Press N (shift + n) to move epic filter to next epic.
  - Press N (shift + p) to move epic filter to previous epic.
  - Press N (shift + c) to clear epic filters.
  - Press s to toggle the slim theme

- Drag n' drop stories. Change state of stories by dragging them to another column. If a developer has forgotten to opdate a story, you can now easily do it right in the standup by dragging the story card to the correct collum.

* Displays your current pivotal iteration in 4 or 5 column layout:

  - Pending, Started, Finished, Delivered | Accepted. Where stories with delivered and accepted state are show in the same column.
  - Pending, Started, Finished, Delivered, Accepted. Where each state has its own column.

* Lets you easily switch between projects.

* Lets you filter the stories based on epics, owners or type of story (bug, feature, chore) or combinations of these.

* Shuffles the owner list each day, so if you are using the filters to ease the standup, you dont have the same person starting every day.

* Keeps selected filters across page reloads.

* Braid is entirely a client side application. There is only a static file-server the hosts the html and javascript assets. It stores your pivotal api token in your browser localstorage. Clicking logout will clear the localstorage
