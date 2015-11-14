$(function(){
	// arguments
	var _args = Arg.all();
	var _day = moment().format("dddd");
	var _editable = false;
	var _id = _args.id || 0;
	var _mode = _args.mode || "";
	var _renderBusy = false;

	// add new user from the raw screen
	function addRawUserData() {
		var userName;
		if (userName = prompt("Enter the user's name.")) {
			db.addUser(function(id) {
				$(location).attr('href', '?mode=raw&id=' + id);
			}, { badgeName: userName });
		}
	}

	// add user
	function addUser() {
		var userName;
		if (userName = prompt("Enter the user's name.")) {
			db.addUser(function(id) {
				$(location).attr('href', '?mode=edit&id=' + id);
			}, { badgeName: userName });
		}
	}

	// append today's day to an array
	function appendToday(inDays) {
		var days = JSON.parse(inDays);
		if (days.length <= 0) {
			days = [_day];
		} else if ($.inArray(_day, days) < 0) {
			days.push(_day);
		}
		return JSON.stringify(days);
	}

	// compare by lottery order
	function compareLottery(a, b) {
		return a.lotteryOrder - b.lotteryOrder;
	}

	// compare by badge name
	function compareName(a, b) {
		var a1 = a.badgeName.toLowerCase();
		var b1 = b.badgeName.toLowerCase();
		if (a1 < b1) { return -1; }
		if (a1 > b1) { return 1; }
		return 0;
	}

	// compare by standby order
	function compareStandby(a, b) {
		return a.standbyOrder - b.standbyOrder;
	}

	// count the number of days in a stringified day array
	function countDays(inDays) {
		return JSON.parse(inDays || []).length;
	}

	// delete everything from the database
	function deleteAll() {
		var input;
		if (input = prompt("Type the word 'reset' to reset the database.")) {
			if (String(input).toLowerCase() == "reset") {
				spin('.user-erase-all');
				db.eraseUsers(setMainMode);
			}
		}
	}

	// delete currently edited raw user data
	function deleteRawUserData() {
		if (confirm("Really delete this user's data?")) {
			db.eraseUser(setRawMode, { id: _id });
		}
	}

	// delete currently selected user
	function deleteUser() {
		if (confirm("Really delete this user?")) {
			db.deleteUser(setMainMode, { id: _id });
		}
	}

	// export the database as CSV
	function exportDatabase() {
		db.getAllUsers(function(users) {
			if (true) {
				var undef;
				var schema = db.schema.users;
				var csv = "";
				// build CSV columns
				var csvColumns = ["id"];
				for (var i in schema) {
					csvColumns.push(i);
				}
				csv += csvColumns.join(",") + "\r\n";
				// build CSV rows
				for (var i in users) {
					var user = users[i];
					var csvRow = [];
					console.log(JSON.stringify(user));
					for (var j in csvColumns) {
						var column = csvColumns[j];
						var columnValue = user[column];
						if (columnValue === false) { columnValue = "false" }
						else if (columnValue === true) { columnValue = "true" }
						else if (columnValue === undef) { columnValue = "" }
						else { columnValue = String(columnValue); }
						columnValue = '"' + columnValue.replace(/"/g, '""') + '"';
						console.log(columnValue);
						csvRow.push(columnValue);
					}
					csv += csvRow.join(",") + "\r\n";
				}
				// build data URI and start downloading
				var anchor = window.document.createElement('a');
				anchor.href = window.URL.createObjectURL(new Blob([csv], {type: 'text/csv'}));
				anchor.download = "ArtTrackPlus.csv";
				document.body.appendChild(anchor);
				anchor.click();
				document.body.removeChild(anchor);
			}
		});
	}

	// find a user by table number
	function findUserByTableNumber() {
		var table;
		if (table = prompt('Enter table number.')) {
			db.getUsers(function(users) {
				var found = false;
				for (var i in users) {
					if (users[i].seatedTable == table) {
						found = true;
						$(location).attr('href', '?mode=edit&id=' + users[i].id);
						break;
					}
				}
				if (!found) {
					alert("No artist with that table number exists.");
				}
			});
		}
	}

	// retrieve a list of lottery candidates
	function getLotteryWinners(users, forcedIds, count) {
		var results = [];
		var totalUserCount = users.length;
		var lotteryOrder = 1;
		var standbyOrder = 1;
		// process all the forced winners
		for (var i in forcedIds) {
			for (var j in users) {
				var user = users[j];
				if (user.id == forcedIds[i]) {
					user.lottery = true;
					user.lotteryOrder = lotteryOrder;
					lotteryOrder++;
					results.push(user);
					count--;
					totalUserCount--;
					break;
				}
			}
		}
		// randomly choose the rest
		var maxUser = users.length;
		while (totalUserCount > 0) {
			var pick = users[Math.floor(Math.random() * maxUser)].id;
			var alreadyPicked = false;
			for (var k in results) {
				if (results[k].id == pick) {
					alreadyPicked = true;
					break;
				}
			}
			if (!alreadyPicked) {
				for (var m in users) {
					var user = users[m];
					if (user.id == pick) {
						if (count > 0) {
							user.lottery = true;
							user.lotteryOrder = lotteryOrder;
							lotteryOrder++;
						} else {
							user.standby = true;
							user.standbyOrder = standbyOrder;
							standbyOrder++;
						}
						results.push(user);
						count--;
						totalUserCount--;
						break;
					}
				}
			}
		}
	}

	// get the URL for a different mode
	function getModeUrl(newMode) {
		return Args.url({ mode: newMode });
	}

	// get nice looking JSON for editing
	function getNiceJSON(o) {
		var result = [];
		for (var i in o) {
			var j = JSON.stringify(o[i]);
			result.push('"' + i + '": ' + j);
		}
		return "{\n" + result.join(',\n') + "\n}";
	}

	// get user table entry
	function getUserEntry(user) {
		var displayName = sanitize(user.badgeName);

		if (user.seatedTable && user.seatedTable.trim().length > 0) {
			displayName += " <span class='list-table-number'>(" + user.seatedTable + ")</span>"
		}

		if (_editable) {
			displayName = "<a href='?mode=edit&id=" + user.id + "' id='" + user.id + "' class='user'>" + displayName + "</a>";
			if (isUnluckyUser(user)) {
				displayName += " <span class='notice long-standby'><i class='fa fa-exclamation'></i></span>";
			}
		}
		return "<tr><td>" + displayName + "</td></tr>";
	}

	// get edit user url
	function getUserEditUrl(id) {
		return "?mode=edit&id=" + id;
	}

	// initialize script
	function init() {
		// fall back to default mode if invalid
		var screenQuery = '#' + _mode + '-screen';
		if ($(screenQuery).length <= 0) {
			_mode = "license";
			screenQuery = '#license-screen';
		}

		// do not use show(), it doesn't always work in Chrome
		$('[id$="-screen"]').each(function() {
			var element = $(this);
			var elementId = element.attr("id");
			if (elementId == _mode + '-screen') {
				// make the desired screen visible
				element.css("display", "block");
				_editable = element.hasClass("editable-screen");
				if (element.hasClass("dynamic-screen")) {
					setInterval(function() {
						renderTables();
					}, 5000);
				}
			} else {
				// optimization: delete all screen data not used
				element.html("");
			}
		});

		// show footer if we are using a container
		$('.footer').html($('.footer-source').html());

		// init screen divs
		initScreen();

		// init input elements
		initInputs();
	}

	// attach input element event handlers
	function initInputs() {
		// from http://stackoverflow.com/questions/1009808/enter-key-press-behaves-like-a-tab-in-javascript
		// make enter tab to the next input element (modified for this app)
		$('body').on('keydown', 'input, select', function(e) {
			var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
			if (e.keyCode == 13) {
				focusable = form.find('input[type="text"],a,select,button[type="submit"]').filter(':visible');
				next = focusable.eq(focusable.index(this) + 1);
				if (next.length) {
					next.focus();
				} else {
					form.submit();
				}
				return false;
			}
		});
	}

	// initialize page
	function initScreen() {
		// floating THEAD elements
		$('table.scrollable').floatThead({ useAbsolutePositioning: false });

		// attach slimscroll
		initSlimScroll();

		// attach event handlers
		$(window).resize(onWindowResize);
		$('.run-lottery').click(setLotteryMode);
		$('.export-database').click(exportDatabase);
		$('.new-user').click(addUser);
		$('.user-sign-in').click(signInUser);
		$('.user-sign-out').click(signOutUser);
		$('.user-standby').click(standbyUser);
		$('.user-delete').click(deleteUser);
		$('.user-save').click(function() { saveUser({}); });
		$('.user-save-and-add').click(function() { saveUser({}, addUser); });
		$('.return').click(setMainMode);
		$('.set-mode').click(setUserMode);
		$('.user-erase-all').click(deleteAll);
		$('.user-generate-test-data').click(testDatabase);
		$('.raw-user-revert').click(revertRawUserData);
		$('.raw-user-save').click(saveRawUserData);
		$('.raw-user-delete').click(deleteRawUserData);
		$('.raw-user-new').click(addRawUserData);
		$('.lottery-execute').click(runLottery);
		$('.find-by-table').click(findUserByTableNumber);

		// disable form submission (we'll handle that separately)
		$('form').submit(function(e) { e.preventDefault(); });

		// render onscreen data
		if ($("table").length > 0) {
			renderTables();
		}

		renderUserData();
	}

	// initialize slimscroll on all content divs
	function initSlimScroll() {
		$('.content').each(function(i){
			var div = $(this);
			var divParent = div.parent();
			var divHeight = divParent.height();
			var divWidth = divParent.width();
			div.slimScroll({ height: divHeight, width: divWidth, size: '12px', wheelStep: 1, disableFadeOut: true, color: '#ffffff' });
		});
	}

	// returns true if the user is 'unlucky' (been on standby until the last day)
	function isUnluckyUser(user) {
		return (countDays(user.checkedInDays) == 0 && countDays(user.standbyDays) >= 2);
	}

	// event handler for resizing the window
	function onWindowResize() {
		// destroy and recreate slimscroll (not the most efficient, but..)
		$('.content').slimScroll({destroy: true});
		initSlimScroll();
	}

	// render tables
	function renderTables() {
		if (!_renderBusy) {
			_renderBusy = true;
			db.getUsers(function(users) {
				var allUsersTable = "";
				var allUsersCount = 0;
				var lotteryTable = "";
				var lotteryCount = 0;
				var standbyTable = "";
				var standbyCount = 0;
				var signedInTable = "";
				var signedInCount = 0;
				var sortedLotteryTable = "";

				// populate sorted tables
				users.sort(compareName);
				for (var i in users) {
					var user = users[i];
					var userEntry = getUserEntry(user);
					allUsersTable += userEntry;
					allUsersCount++;
					if (user.signedIn) { signedInTable += userEntry; signedInCount++; }
					if (user.lottery) { sortedLotteryTable += userEntry; }
				}

				// populate lottery table
				users.sort(compareLottery);
				for (var i in users) {
					var user = users[i];
					if (user.enabled && user.lottery) {
						lotteryTable += getUserEntry(user);
						lotteryCount++;
					}
				}

				// populate standby table
				users.sort(compareStandby);
				for (var i in users) {
					var user = users[i];
					if (user.enabled && user.standby) {
						standbyTable += getUserEntry(user);
						standbyCount++;
					}
				}

				// populate tables
				$('.users-table').html(allUsersTable);
				$('.lottery-table').html(lotteryTable);
				$('.standby-table').html(standbyTable);
				$('.signedin-table').html(signedInTable);
				$('.sorted-lottery-table').html(sortedLotteryTable);

				// populate table counts
				$('.user-count').html(allUsersCount);
				$('.lottery-count').html(lotteryCount);
				$('.standby-count').html(standbyCount);
				$('.signedin-count').html(signedInCount);
			});
			_renderBusy = false;
		}
	}

	// render user-relevant data
	function renderUserData() {
		// user editor data
		if (_id > 0 && $('input:visible').length > 0) {
			db.getUser(function(users) {
				if (users.length > 0) {
					var user = users[0];
					for (var key in user) {
						var value;
						switch (key) {
							case 'checkedInDays':
								value = JSON.parse(user[key]).join(', ') || "None";
								break;
							case 'standbyDays':
								value = JSON.parse(user[key]).join(', ') || "None";
								if (isUnluckyUser(user)) {
									$('span.' + key).addClass('notice');
								}
								break;
							default:
								value = user[key];
								break;
						}
						$('input#' + key).val(String(value).trim());
						$('span.' + key).text(String(value).trim());
						$('input[type="checkbox"]#' + key).prop("checked", Boolean(value));
					}

					// initialize the cursor if there are important missing fields
					$('#badgeNumber').each(function() {
						if ($(this).val().length == 0) {
							$(this).focus();
						}
					});
				}
			}, { id: _id });
		}

		// raw user editor data
		if ($('.raw-user-data:visible').length > 0) {
			db.getAllUsers(function(users) {
				$('.raw-user-data').val("");
				$('.raw-user-list').filter(':visible').each(function() {
					var dropdown = $(this);
					var options = $('<div/>');
					for (var i in users) {
						var optionText = "[" + users[i].id + (users[i].enabled ? "" : "*") + "] " + users[i].badgeName;
						options.append(
							$('<option/>')
							.text(optionText)
							.attr('value', users[i].id)
						);
					}
					dropdown.append(options.html())
					.change(function() {
						_id = Number($(this).val());
						revertRawUserData();
					});
				});
			});
		}

		// lottery user data
		if ($('.lottery-guaranteed-list:visible').length > 0) {
			db.getLotteryUsers(function(users) {
				var guaranteedList = $('<ul/>');
				var unluckyList = $('<ul/>');
				if (users.length <= 0) {
					$('.lottery-main').css('display', 'none');
					$('.lottery-error').css('display', 'block');
				} else {
					for (var i in users) {
						var user = users[i];
						var userLine = $('<li/>').append(
							$('<label/>').append(
								$('<input/>')
								.attr('type', 'checkbox')
								.attr('checked', true)
								.attr('id', user.id)
								.addClass('lottery-filter')
							).append(user.badgeName + " ")
							.addClass('highlight')
						)
						if (user.lotteryGuaranteed) {
							guaranteedList.append($('<li/>').html(userLine));
						}
						if (isUnluckyUser(user)) {
							unluckyList.append($('<li/>').html(userLine));
						}
					}
				}
				var guaranteedHidden = (guaranteedList.html().length == 0);
				var unluckyHidden = (unluckyList.html().length == 0);
				if (guaranteedHidden) {
					$('.lottery-guaranteed-collapse').hide();
				}
				if (unluckyHidden) {
					$('.lottery-unlucky-collapse').hide();
				}
				if (guaranteedHidden && unluckyHidden) {
					$('.lottery-checkbox-collapse').hide();
				}
				$('.lottery-guaranteed-list').html(guaranteedList.html());
				$('.lottery-unlucky-list').html(unluckyList.html());
			});
		}
	}

	// revert raw user data to saved (or load raw data)
	function revertRawUserData() {
		if (_id > 0) {
			db.getUser(function(users) {
				if (users.length > 0) {
					$('.raw-user-data').val(getNiceJSON(users[0]));
				} else {
					$('.raw-user-data').val("");
				}
			}, { id: _id });
		} else {
			$('.raw-user-data').val("");
		}
	}

	// run lottery
	function runLottery() {
		var count;
		if (count = prompt('How many seats?')) {
			db.getUsers(function(allusers) {
				// erase current lists
				for (var i in allusers) {
					var user = allusers[i];
					user.lottery = false;
					user.lotteryOrder = 0;
					user.standby = false;
					user.standbyOrder = 0;
					user.signedIn = false;
				}
				db.setUsers(function(users) {
					db.getLotteryUsers(function(users) {
						spin('.lottery-execute');
						// discover who's been guaranteed
						var forcedIds = [];
						$('.lottery-filter:checked').each(function() {
							var id = Number($(this).attr('id'));
							forcedIds.push(id);
						});
						// get the lottery winners
						getLotteryWinners(users, forcedIds, count);
						// apply database changes
						db.setUsers(setMainMode, users);
					});
				}, allusers);
			});
		}
	}

	// sanitize data for HTML
	function sanitize(s) {
		return $('<div/>').text(s).html();
	}

	// save currently edited raw user data
	function saveRawUserData() {
		if (_id > 0) {
			try {
				var user = JSON.parse($('.raw-user-data').val());
				user.id = _id;
				db.setUser(setRawMode, user);
			} catch (e) {
				alert("JSON did not validate: " + e.message);
			}
		} else {
			$('.raw-user-data').val("");
		}
	}

	// save currently edited user data
	function saveUser(changes, callback) {
		if (!callback) {
			callback = setMainMode;
		}
		changes = $.extend({}, changes);
		changes.id = _id;
		if (_id > 0) {
			db.getUser(function(users) {
				if (users.length > 0) {
					var undef;
					var user = users[0];;
					var value;
					for (var key in user) {
						if (!changes[key]) {
							$('input#' + key).each(function() {
								changes[key] = $(this).val().trim();
							});
							$('input[type="checkbox"]#' + key).each(function() {
								changes[key] = Boolean($(this).prop("checked"));
							});
						}
					}
					if (changes.badgeName == undef || changes.badgeName.length <= 0) {
						alert('Badge name is missing.');
						$('.badgeName').focus();
					} else {
						db.setUser(callback, changes);
					}
				}
			}, { id: _id });
		}
	}

	// switch to the lottery mode
	function setLotteryMode() {
		setMode('lottery');
	}

	// switch to the main mode
	function setMainMode() {
		setMode('main');
	}

	// switch to a specific mode
	function setMode(newMode) {
		$(location).attr('href', '?mode=' + newMode)
	}

	// switch to raw edit mode
	function setRawMode() {
		setMode('raw');
	}

	// switch to a user-specified mode
	function setUserMode() {
		var newMode;
		if (newMode = prompt("Enter the mode to switch to.")) {
			if ($("#" + newMode + "-screen").length > 0) {
				setMode(newMode);
			} else {
				alert("Invalid mode: " + newMode);
			}
		}
	}

	// sign user in
	function signInUser() {
		db.getUser(function(users) {
			if (users.length > 0) {
				var table;
				if (table = prompt('Enter table number.')) {
					var user = users[0];
					saveUser({ signedIn: true, standby: false, standbyOrder: 0, lottery: false, lotteryOrder: 0, signInDate: moment().format("dddd, h:mm:ss a"), checkedInDays: appendToday(user.checkedInDays), seatedTable: table });
				}
			}
		}, { id: _id});
	}

	// sign user out
	function signOutUser() {
		var eligible = false;
		if (confirm("Do they want to be eligible for tomorrow's lottery?\nClick OK for yes, or Cancel for no.")) {
			eligible = true;
		}
		saveUser({ signedIn: false, standby: false, standbyOrder: 0, lottery: false, lotteryOrder: 0, lotteryEligible: eligible, seatedTable: " " });
	}

	function spin(target) {
		$(target).html("<i class='fa fa-spinner fa-spin'></i> <span class='progress'></span>");
	}

	// standby all remaining lottery users
	function standbyLotteryUsers() {
		db.getLotteryUsers(function(users) {

		});
	}

	// standby user
	function standbyUser() {
		db.getUsers(function(users) {
			var eligible = false;
			var user;
			for (var i in users) {
				if (users[i].id == _id && !users[i].standby) {
					eligible = true;
					user = users[i];
					break;
				}
			}
			if (eligible) {
				var highestValue = 0;
				for (var i in users) {
					if (users[i].standbyOrder > highestValue) {
						highestValue = users[i].standbyOrder;
					}
				}
				saveUser({ signedIn: false, standby: true, standbyOrder: highestValue + 1, lottery: false, lotteryOrder: 0, standbyDays: appendToday(user.standbyDays) });
			}
		});
	}

	// generate test data
	function testDatabase() {
		var input;
		if (input = prompt("Type the word 'test' to reset the database and generate test data.")) {
			if (String(input).toLowerCase() == "test") {
				spin('.user-generate-test-data');
				db.eraseUsers(function() {
					var newUsers = [];
					for (var i = 0; i < 500; i++) {
						newUsers.push({ badgeName: "Test " + String(i), badgeNumber: i, enabled: true });
					}
					db.addUsers(setMainMode, newUsers);
				});
			}
		}
	}

	init();
});
