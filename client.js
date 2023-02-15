onNet('sudo:client:executeCommand', (command, sudoer) => {
    ExecuteCommand(command)
    // TriggerEvent('QBCore:Notify', `You have been sudo-ed by ${sudoer}`, 'primary');
    emit('chat:addMessage', {args: [`You have been sudo-ed by ${sudoer} executing /${command}`]})
})

emit('chat:addSuggestion', '/sudo', 'Makes a player execute a command', [
    {name: 'player', help: 'The player id to execute the command as'},
    {name: 'command', help: 'The command to execute. Can start with a "/"'},
])