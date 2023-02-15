RegisterNetEvent('sudo:client:executeCommand', function(command, sudoer)
    ExecuteCommand(command)
    -- TriggerEvent('QBCore:Notify', `You have been sudo-ed by ${sudoer}`, 'primary')
    TriggerEvent('chat:addMessage', {args = {"You have been sudo-ed by " .. sudoer .. " executing /" .. command}})
end)

TriggerEvent('chat:addSuggestion', '/sudo', 'Makes a player execute a command', {
    {name = 'player', help = 'The player id to execute the command as'},
    {name = 'command', help = 'The command to execute. Can start with a "/"'},
})