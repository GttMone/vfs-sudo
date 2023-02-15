const QBCore = exports['qb-core'].GetCoreObject()
let restricted = true;

on('onResourceStart', (resource) => {
    if (resource !== GetCurrentResourceName()) return;
    if (Config.UseQBPerms === true) restricted = false;
})

RegisterCommand('sudo', (source, args, raw) => {
    if (args.length < 2) return TriggerClientEvent('QBCore:Notify', source, 'Missing or invalid arguments!', 'error')
    if (Config.UseQBPerms === true && QBCore.Functions.HasPermission(source, Config.QBPerms) !== true) return TriggerClientEvent('QBCore:Notify', source, 'Insufficient permissions!', 'error')

    const target = args[0];
    if (!GetPlayerPed(target)) return TriggerClientEvent('QBCore:Notify', source, 'Player not online!', 'error')
    if (Config.UseQBPerms === true && QBCore.Functions.HasPermission(target, Config.ProtectedPerms) === true) return TriggerClientEvent('QBCore:Notify', source, 'Player can\'t be sudo-ed!', 'error');

    let command = '';
    for (let index = 0; index < args.length; index++) {
        if (index > 0) {
            command = command + args[index] + ' '
        }
    }
    if (command.startsWith('/') === true) command = command.replace('/', '').trim()

    TriggerClientEvent('sudo:client:executeCommand', target, command, GetPlayerName(source))
    TriggerClientEvent('QBCore:Notify', source, `Succesfully sudo-ed ${GetPlayerName(target)}`, 'success');
}, restricted)