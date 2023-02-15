QBCore = exports['qb-core'].GetCoreObject()
local restricted = true

RegisterNetEvent('onResourceStart', function(resource)
    if resource ~= GetCurrentResourceName() then
        return
    end

    if Config.UseQBPerms == true then
        restricted = false
    end
end)

RegisterCommand('sudo', function(source, args, raw)
    if #args < 2 then
        TriggerClientEvent('QBCore:Notify', source, 'Missing or invalid arguments!', 'error')
        return
    end
    if Config.UseQBPerms == true and QBCore.Functions.HasPermission(source, Config.QBPerms) ~= true then
        TriggerClientEvent('QBCore:Notify', source, 'Insufficient permissions!', 'error')
        return
    end

    local target = args[0]

    if not GetPlayerPed(target) then
        TriggerClientEvent('QBCore:Notify', source, 'Player not online!', 'error')
        return
    end

    if Config.UseQBPerms == true and QBCore.Functions.HasPermission(target, Config.ProtectedPerms) == true then
        TriggerClientEvent('QBCore:Notify', source, 'Player can\'t be sudo-ed!', 'error')
        return
    end

    local command = ''
    for i = 0, args.length, 1 do
        if i > 0 then
            command = command .. args[i] .. ' '
        end
    end
    if string.sub(command, 1,1) == "/" then
        command = string.sub(command, 2, #command)
    end

    TriggerClientEvent('sudo:client:executeCommand', target, command, GetPlayerName(source))
    TriggerClientEvent('QBCore:Notify', source, "Succesfully sudo-ed " .. GetPlayerName(target), 'success')
end, restricted)