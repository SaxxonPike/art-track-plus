# Art Track Plus

##### Keep track of your Artist's Alley.

### About

*Art Track Plus* was originally created for Midwest Furfest in 2014. The
original version of the software was a great success, so now we bring you the
evolved version of the program.

### Features

- Rapid Entry
  - Quickly add artists to your list (especially on day 1!)
  - Quickly assign rooms to artists after they've been seated.
- Alternate View
  - Designed for use with a second screen.
  - Show who's picked for the lottery at the start of each day to artists.
  - Show who's seated to guests looking for their favorite artists.
- Searching
  - Find an artist by table number or badge number quickly.
  - Show who's been checked in, but has now left for the day.
- Reporting
  - Artist lists can be exported to CSV which can be loaded in Excel.
- Non-volatile Database (using IndexedDB)
  - Artist database doesn't disappear when the browser closes.
  - Clearing cookies won't affect the artist lists, either.
- Test Functions
  - Data generator makes it easy to test the application under load.
- Cross-browser support
  - Designed to work in any browser with IndexedDB support!
  - Includes Internet Explorer, Firefox, and Chrome. Possibly others.
  - Responsive design helps things work on whatever size screen you've got.

## Live Version

If you don't want to deploy it anywhere, this is a fast option to get up and running. It uses local
storage, so data will only persist on a single machine.

[Live Version](https://saxxonpike.github.io/art-track-plus-live/)

## Standalone Version

*The standalone version is recommended if you don't have or need a server.*

### Installation

1. [Download the latest release](https://github.com/SaxxonPike/art-track-plus/releases)
1. Open `index.html`
1. Enjoy!

### Build from source

```
git clone https://github.com/SaxxonPike/art-track-plus.git art-track-plus
cd art-track-plus/standalone
npm install
gulp build
```

Your files will be available in `build/`. Just open `index.html`.

## Client/Server Version

*The client/server version is recommended if you need access on multiple devices.*

This is coming in a future release. Stay tuned!

## Using Art Track Plus

#### Menus

- *System*
  - Contains actions you can perform that are often application-wide and can't
    be reversed. You can reset all the lists and generate test data from this
    menu.
- *Reports*
  - Contains reporting actions. You can export the artist list to CSV.
- *Find*
  - Contains actions related to finding an artist by some sort of criteria. If
    you happen to find someone's badge or table card and need to quickly find
    out who in the list it belongs to, this is where you look.
- *Actions*
  - A general bucket of actions that don't belong in any other menu. This will
    allow you to run the lottery, close out a day, and more.
- *New Artist*
  - Does exactly what it says. You can add a new artist quickly with this.
- *View 2*
  - This opens a new tab or window which shows an alternate view of the lists.
    This view is meant for artists and users to see, and won't show any
    sensitive information since nothing is clickable on it. Make sure not to
    load this up on a machine they have control over- it's still running the
    full application underneath.

#### Things to know

- *Close Out Day*: Perform end-of-day operations and clear the lottery, standby
  and seated lists. This is required in order to run the next day's lottery.
- *Lottery Eligible*: An artist is eligible to be picked for the next lottery.
- *Lottery Guaranteed*: An artist is guaranteed to be at the top of next
  lottery's picks. Useful if it's the last day of Artist's Alley and someone
  was particularly unlucky.

#### Start of the Convention

On signups for the first day of Artist's Alley, it's expected you'll have to
enter a lot of data into the program. The first task is to open **Actions >
Rapid New Artist Entry**. From there, you can type in information for artists
as they sign up.

Once you're done with the initial sign up process, you're ready to run the
lottery.

#### Start of the Day

Make sure the lottery, standby and seated lists are all empty. (If you
still have names in those lists, you can use **Actions > Close Out Day** to
clean them out.)

Running the lottery is as easy as **Actions > Run Lottery**. It'll explain what
will happen. Click **Run** and it'll then ask how many seats are available.
Fill in the number and press Enter (or click OK.) Artists who have been
selected will be in the blue Lottery list, and artists who were picked after
all the slots were filled will be in the Standby list.

Go through the Lottery list, calling off names. You can click on a name in the
list to pull up their details. Here, you can add their table number and send
them on their way.

#### During the Day

If spots open up, or there are people who were picked for the lottery but did
not show up, you can start reading off the top of the standby list and start
seating those people.

Signing an artist out is also pretty easy. Just click on their name in any
column and click Sign Out. You'll be asked if they would like to be included
in tomorrow's lottery.

#### End of the Day

Once everyone's cleared out, sometimes you might find that an artist has not
approached you to sign out. You can either sign them out yourself, or you can
use **Actions > Close Out Day** to do this. It'll explain what will happen to
artists listed in each column. This should set you up for the next day.

## Developing Art Track Plus

Art Track Plus relies on you having *node.js* available. Once you clone this
repo, just install dependencies:

```
npm install
```

#### Gulp Tasks

Gulp is used as the task runner. There are a number of tasks that you can use:

- `gulp dev`
  - Builds the project in development mode and runs watchers. Great for setting
    up a terminal window so it can run in the background.
- `gulp build-dev`
  - Builds the project in development mode.
- `gulp build`
  - Builds the project in production mode with minification.

#### Project Layout

There are a few important folders:

- `build`
  - This is where your built files are going to go. This folder gets wiped out
    each time you build, so don't put anything important in here.
- `docs`
  - Documentation. Kind of sparse at the moment; we'll get to it.
- `html`
  - Jade templates go here. `index.jade` contains the root HTML element,
    required scripts and stylesheets. Includes need to manually be added here.
- `include`
  - Files to include in the build. These files are not processed; they're copied
    directly into `build` with the directory structure preserved.
- `script`
  - Contains JS files. Every file in this tree is built and concatenated.
    Scripts in the `modules` folder are compiled first in the file, then the
    scripts in the main folder.
- `style`
  - Contains SCSS files. Every file in this tree is built and concatenated.
    Bootstrap is automatically included, and Bootstrap-specific variables are in
    a file on their own.
- `test`
  - Jasmine tests. For whenever *those* get written.

You'll also need to know about these files:

- `config.json`
  - Contains configuration information that is used by the build process. It
    does not need to be included as a file in the build output.
- `.jshintrc`
  - JSHint is used to find script problems early in the compilation process.
    Many of the settings in this file exist for some reason, and you probably
    shouldn't change anything inside unless you plan to go over the existing
    scripts to correct any warnings thrown.

#### Contributing

If you have something awesome to share with us, put in a pull request! This
account is checked *at least* weekly, if not daily. Be sure that JSHint does
not throw warnings or errors.
