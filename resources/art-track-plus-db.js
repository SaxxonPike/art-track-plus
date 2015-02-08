(function(w){
	// database schema + defaults (every table must have an 'id' field)
	var _config = {
		name: 'ArtTrackPlus',
		schema: {
			users: {
				enabled: true,
				badgeName: "",
				badgeNumber: "",
				realName: "",
				email: "",
				contact: "",
				remarks: "",
				signedIn: false,
				standby: false,
				standbyOrder: 0,
				lottery: false,
				lotteryEligible: true,
				lotteryGuaranteed: false,
				lotteryOrder: 0,
				signInDate: "Never",
				seatedTable: "",
				checkedInDays: "[]",
				standbyDays: '[]'
			}
		},
		version: 15
	};
	
	// internal database object
	var _db = new Dexie(_config.name);
	
	// this is exposed as a window object
	var _result = {
		addUser: function(callback, data) {
			// copy default user data
			var userData = $.extend({}, _config.schema.users, data);
			_db.users.add(userData).then(callback);
		},
		addUsers: function(callback, data) {
			var count = data.length;
			var current = 0;
			var callbackCalled = false;
			var progressMax = data.length;
			_db.transaction('rw', _db.users, function() {
				// add each user individually
				for (var i in data) {
					_result.addUser(function() {
						$('.progress').text(String(current) + "/" + String(progressMax));
						current++;
						if (current >= count && !callbackCalled) {
							callbackCalled = true;
							callback();
						}
					}, data[i]);
				}
			});
		},
		deleteUser: function(callback, data) {
			_db.users.where('id').equals(data.id).modify({ enabled: false }).then(callback);
		},
		eraseUser: function(callback, data) {
			_db.users.where('id').equals(data.id).delete().then(callback);			
		},
		eraseUsers: function(callback) {
			// delete all users
			_db.users.toCollection().delete().then(callback);
		},
		getAllUsers: function(callback) {
			// return all users in the database
			var result = [];
			var collection = _db.users.toCollection();
			collection.each(function(i) {
				result.push(i);
			}).then(function() { callback(result); });
		},
		getLotteryUsers: function(callback) {
			_result.getUsers(function(users) {
				var result = [];
				for (var i in users) {
					var user = users[i];
					if (user.enabled == true && user.lotteryEligible == true) {
						result.push($.extend({}, user));
					}
				}
				callback(result);
			});
		},
		getUser: function(callback, data) {
			// return all users in the database
			var result = [];
			var collection = _db.users.toCollection();
			collection.each(function(i) {
				var match = true;
				for (var j in data) {
					if (i[j] != data[j]) {
						match = false;
						break;
					}
				}
				if (match) {
					result.push($.extend({}, i));
				}
			}).then(function() { callback(result); });
		},
		getUsers: function(callback) {
			// return all users in the database that are enabled
			var result = [];
			var collection = _db.users.toCollection();
			collection.each(function(i) {
				if (i.enabled == true) {
					result.push($.extend({}, i));
				}
			}).then(function() { callback(result); });
		},
		name: _config.name,
		schema: {},
		setUser: function(callback, data) {
			// determine the data to be modified
			var modifyData = {};
			for (var key in data) {
				if (key != 'id') {
					modifyData[key] = data[key];
				}
			}
			// perform modification
			_db.users.where('id').equals(data['id']).modify(modifyData)
			.then(callback)
			.catch(function(e) { alert("Database error: " + e); });
		},
		setUsers: function(callback, data) {
			var count = data.length;
			var current = 0;
			var callbackCalled = false;
			var progressMax = data.length;
			// modify each user individually
			_db.transaction('rw', _db.users, function() {
				for (var i in data) {
					_result.setUser(function() {
						$('.progress').text(String(current) + "/" + String(progressMax));
						current++;
						if (current >= count && !callbackCalled) {
							callbackCalled = true;
							callback();
						}
					}, data[i]);
				}
			});
		},
		version: _config.version
	};
	
	// initialize
	function init() {
		// define schema
		var schema = {};
		for (var tableName in _config.schema) {
			var columns = ['++id'];
			for (var columnName in _config.schema[tableName]) {
				columns.push(columnName);
			}
			schema[tableName] = columns.join(', ');
		}

		// init database & version
		_db.version(_config.version).stores(schema);
		_result.schema = $.extend({}, _config.schema);
		_db.open().catch(function(e) { alert("Database error: " + e); });
		w.db = _result;
	}
	
	// perform initialization
	init();
})(window);