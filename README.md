# Art Track Plus
## Keep track of your Artist Alley.

### Features

##### Fast artist entry
It's the first day of artist signups and you've got a whole lot of people to
put on the list. This application allows rapid entry of artists so you can get
right down to the other less tedious (and more important) stuff.

##### Automated lottery
Randomly pick an order of artists labeled eligible so you don't have to rely on
rolling dice yourself.

##### Dual screen
The main screen can be used to perform the usual administrative duties, while
a second screen is designed to show everyone else (other artists, passers-by,
etc) what the status is. The second screen is automatically kept updated, so you
don't need to worry about the two parts being out of sync.

##### Cross-platform
The application is written in pure HTML, CSS and JavaScript. This means you can
run this application on anything as long as it supports IndexedDB. If you're
using a recent browser that supports it, you're golden. (Note: Safari does not
support this feature; consider using IE, Firefox or Chrome instead.)

##### Backed by local storage
No need for internet access. Art Track Plus will keep your artist list, even if
you close your browser window. Because it uses IndexedDB, it will also be
protected from clearing cookies and history.

##### CSV export
Need to save the list for your own records? Export the artist database as a CSV
which can be loaded in almost all spreadsheet programs.

### Running the application
Just open the `index.html` file in a browser of your choice. In Windows, you can
right-click the file and select `Open With...` and you should be able to choose
your browser there. You may also be able to drag the `index.html` file right on
top of an existing browser window to open it.

### System commands
There is a System menu at the bottom of the screen which will allow you to
enter a code. These screens are not readily available on the UI because of how
rarely they will be used (and how dangerous it can be for your data if they
could accidentally be clicked.)

##### raw
View and edit the artist database in JSON format. Use this if there's a user
related bug you can't seem to fix at the moment but need to keep the show going.
Useful also for developers. Correctness of the JSON will be checked, so you
shouldn't be able to get the data mangled in a way that crashes the application.

##### reset
Wipe the entire artist database.

##### test
Wipe the artist database and fill it with thousands of test users.
