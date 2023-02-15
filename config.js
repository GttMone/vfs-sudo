let Config = {};

Config.UseQBPerms = true // Whether the /sudo command should use QB core to check the executor's permission.

// The following options only works if the above option 'UseQBPerms' is set to true:
Config.QBPerms = 'admin' // The permissions required to run this command.
Config.ProtectedPerms = '' // Users with this permissions are protected from the command and nobody can sudo them.
//