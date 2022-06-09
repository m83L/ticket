const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });
const fs = require('fs');
const config = require('./config.json');
bot.commands = new Collection();


// Commandes Handler
const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)

    console.log(`La commandes ${file} est chargée avec succés !`)
    bot.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
  const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))

  for (const file of commandFiles) {
    const props = require(`./commands/${folder}/${file}`)
    console.log(`La commandes ${file} est chargée avec succés depuis ${folder} !`)
    bot.commands.set(props.help.name, props)
  }
});











// Event Handler
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
      console.log(`L'event ${file} est chargée avec succés !`)
      bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
      console.log(`L'event ${file} est chargée avec succés !`)
      bot.on(event.name, (...args) => event.execute(...args, bot))
    }
}

const eventSubFolders = fs.readdirSync('./events/').filter(f => !f.endsWith('.js'))
eventSubFolders.forEach(folder => {
  const commandFiles = fs.readdirSync(`./events/${folder}/`).filter(f => f.endsWith('.js'))

  for (const file of commandFiles) {
    const event = require(`./events/${folder}/${file}`)
    if(event.once) {
      console.log(`L'event ${file} est chargée avec succés depuis ${folder} !`)
      bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
      console.log(`L'event ${file} est chargée avec succés depuis ${folder} !`)
      bot.on(event.name, (...args) => event.execute(...args, bot))
    }
  }
});





// Bot sur plusieur serveur
bot.on("guildCreate", guild => {
  db.query(
      `INSERT INTO guilds(guildId, guildOwnerId, guildName) VALUES ("${guild.id}", "${guild.ownerId}", "${guild.name}")`
  )
  db.query(
      `INSERT INTO guildconfigurable(guildId) VALUES ("${guild.id}")`
  )
  db.query(
      `INSERT INTO ticket(guildId, guildOwnerId) VALUES ("${guild.id}", "${guild.ownerId}")`
  )
});







// Connexion au bot discord
bot.login(process.env.TOKEN);