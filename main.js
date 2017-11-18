const Discord = require('discord.js');
const music = require('discord.js-music-v11')
const cons = require('consolidate')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const db = low(adapter);


db.defaults({ histoires: [], xp: [], guilds :[]}).write()

var prefixx = 'st!';
var prefix = "->";
var bot = new Discord.Client();
var randnum = 0;
var premium = 0;
var asterix = '*';
var servercount = bot.guilds.size;

var storynumber = db.get('histoires').size().value();


bot.on(('guildMemberAdd'), (member) => {
    member.createDM().then(function (channel) {
        return channel.send(`Bvn sur ${member.guild} ${member.displayName} !!`)
    })
 
})
function jeux() {

      var answers = [`(ﾉ◕ヮ◕)| sur ${servercount}`, '->aide[1.0.2|2]©', 'Support: https://discord.gg/crenNVc', 'Dévellopeur: BigTNT©|Fonda|DR-TNT'];
    
    
        return answers[Math.floor(Math.random()*answers.length)];
    }
        var servers = bot.guilds.array().map(g => g.name).join(',');
    
    bot.on('ready', () => {
    setInterval(() => {
    bot.user.setGame(jeux())     }, 5000)
    console.log('Ready')
    })


bot.login(process.env.BOT_TOKEN);

bot.on('message', message => {

if (message.content === prefix + 'createChannel')
    function makeChannel(message){
        var server = message.guild;
        var name = message.author.username;
    
        bot.createChannel(server,name);
    }

    if (message.content === prefix + 'support'){
        var suppEmbed = new Discord.RichEmbed()
            .setColor('#1FEDC')
            .setTitle('https://discord.gg/crenNVc')
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        message.channel.send(suppEmbed)
    }

    if (message.content === prefixx + 'game1') {
        bot.user.setPresence({ game: { name: 'se faire coder', type: 0} });
        bot.user.setStatus('idle');
        message.author.sendMessage('Game1')
    }

    if (message.content === prefixx + 'game2') {
        bot.user.setPresence({ game: { name: '[->aide|=>aide]', type: 0} });
        bot.user.setStatus('online');
        message.author.sendMessage('Game2')
    } 

    if (message.content === prefixx + 'afk') {
        bot.user.setPresence({ game : { name: '[Afk|BigTNT©]', type: 0} });
        bot.user.setStatus('dnd');
    }
    
    var msgauthor = message.author.id;

    if (message.content === prefix + 'majInfos') {
        var MajEmbed = new Discord.RichEmbed()
            .setTitle('Infos sur la M.A.J: "1.0.2|2"')
            .setDescription('** **')
            .addField('VoiceChannel', '->leave _*NON FONTIONNEL*_')
            .addField('Modification', 'Changement : \n** ** \n ->me au lieu de ->infos')
            .setThumbnail(bot.user.avatarURL)
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        message.channel.sendEmbed(MajEmbed)
    }

    if(message.author.bot)return;

    if (message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`XP de ${message.author.username}`)
            .setDescription("Voici tout vos xp monsieur !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send({embed: xp_embed});
    }

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    }

    

    if (message.content === prefix + 'version') {
        message.channel.sendMessage('La version actuelle est _**1.0.2|2**_')
    }
    if (message.content === prefix + 'liens') {
        var liensembed = new Discord.RichEmbed()
            .setColor('#FE0101')
            .setTitle('Liens')
            .setDescription('Tous les liens utiles :smile:')
            .addField('YT de mon fonda', 'http://bit.ly/2j3K3Mv')
            .addField('Invitation moi à ton serv !! :', 'http://bit.ly/2ya3RAm')
            .addField('Discord', 'http://discord.gg/C4qQtyt')
            .addField('Discord Test', 'http://discord.gg/WwHueK6')
            .setThumbnail(bot.user.avatarURL)
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        var liensembed2 = new Discord.RichEmbed()
            .setColor('#FE0101')
            .setTitle('On est content')
            .setDescription(message.author + ' Les liens important ont été envoyé en MP')
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        message.channel.sendEmbed(liensembed2);
        message.author.sendEmbed(liensembed);
        console.log('Liens command execute');

    }

    if (message.content === prefix + 'liensay') {
        var liensembed = new Discord.RichEmbed()
            .setColor('#FE0101')
            .setTitle('Liens')
            .setDescription('Tous les liens utiles :smile:')
            .addField('YT de mon fonda', 'http://bit.ly/2j3K3Mv')
            .addField('Invitation moi à ton serv !! :', 'http://bit.ly/2ya3RAm')
            .addField('Discord', 'http://discord.gg/C4qQtyt')
            .addField('Discord AMI !!', 'http://discord.gg/jBnTcA3')
            .addField('Discord Test', 'http://discord.gg/WwHueK6')
            .setThumbnail(bot.user.avatarURL)
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
            message.channel.sendEmbed(liensembed);
            console.log('liensay execute')
    }
    
    if (message.content === prefix + 'join') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voiceChannel) {
          message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
              message.channel.send("Je t'est rejoint" + message.author);
            })
            .catch(console.log);
        } else {
          message.reply('Erreur');
        }
      }

if (message.content === prefix + "ping"){
        message.reply("Pong:smile:, mon ping est de" + bot.pings);
        console.log('Ping =' + bot.pings);
    }

    if (message.content === prefix + 'botstats')
    
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){

        case 'support':
        break;

        case 'botstats':
        break;

        case "newstory":
        var value = message.content.substr(10);
        var author = message.author.toString();
        var number = db.get('histoires').map('id').value();
        //var storyid = number + 1;
        console.log(value);
        message.reply("Ajout de l'histoire a la base de données")

        db.get('histoires')
            .push({ story_value: value, story_author: author})
            .write()
        break;

        case "tellstory" :
        
        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
        console.log(story);

        message.channel.send(`Voici l'histoire : ${story} (Histoire de ${author_story})`)
        
        break;

        case 'aide':
        break;

        case 'version':
        break;

        case 'me':
        break;

        case 'ping':
        break;

        case 'POP CORN':
        break;

        case 'join':
        break;

        case 'leave':
        break;

        case 'majInfos':
        break;

        case 'liens':
        break;

        case 'liensay':
        break;

        case "kick" :
        if(!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
            message.channel.sendMessage(`:scream:Enhhhhh lalala !! ${message.author}, tu n'a pas le droit de kick, tu savais pas ?:scream:`)
        }else{
            var member = message.mentions.members.first();
            if(!member){
                message.reply("L'utilisateur n'existe pas:warning:");
            }else{
                if(!member.kickable){
                    message.reply("L'utilisateur ne peut être kick")
                }else{                
                member.kick().then((member) => {
                // Successmessage
                message.channel.send(":wave: " + member.displayName + " a été kick ! Qu'il prenne ça dans le cul! :point_right: ");
                }).catch(() => {
                 // Failmessage
                message.channel.send("Kick Refusé:warning:");
            })
            }
            }
        }
        break;
        
        case "ban" :
        if(!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
            message.channel.sendMessage(`:scream:Enhhhhh lalala !! ${message.author}, tu n'a pas le droit de ban, tu savais pas ?:scream:`)
        }else{
            var member = message.mentions.members.first();
            if(!member){
                message.reply("L'utilisateur n'existe pas:warning:");
            }else{
                if(!member.kickable){
                    message.reply("L'utilisateur ne peut être ban")
                }else{                
                member.kick().then((member) => {
                // Successmessage
                message.channel.send(":wave: " + member.displayName + " a été ban ! Qu'il prenne ça dans le cul! :point_right: ");
                }).catch(() => {
                 // Failmessage
                message.channel.send("ban Refusé:warning:");
            })
            }
            }
        }
        break;

        default:
        var error = new Discord.RichEmbed()
            .setColor('#00000')
            .setTitle('Erreur')
            .setDescription('Commande inexistante')
        message.channel.send(error)
        break;

    }

    if (message.content === prefix + 'POP CORN') {

    pop_random();

    if (randnum == 5) {
        var pop_embed1 = new Discord.RichEmbed()
            .setColor('#FAFEBF')
            .setTitle('Tu aimes les pop corn ?')
            .setImage('http://img.michaeljacksonspictures.com/wp-content/uploads/2014/08/popcorn.gif')
        message.channel.sendEmbed(pop_embed1)
        console.log('PopCorn5')
    }
    if (randnum == 4) {
        var pop_embed1 = new Discord.RichEmbed()
            .setColor('#FAFEBF')
            .setTitle('Tu aimes les pop corn ?')
            .setImage('https://3.bp.blogspot.com/-ffnC3wpNQ2c/Vv0PijijSXI/AAAAAAAALLk/bEQ_X97R5QoeYN8NCDmagTPwm_TwmdM9A/s400/pop.gif')
        message.channel.sendEmbed(pop_embed1)
        console.log('PopCorn4')
    }
    if (randnum == 3) {
        var pop_embed1 = new Discord.RichEmbed()
            .setColor('#FAFEBF')
            .setTitle('Tu aimes les pop corn ?')
            .setImage('https://media.giphy.com/media/12aW6JtfvUdcdO/giphy.gif')
        message.channel.sendEmbed(pop_embed1)
        console.log('PopCorn3')
    }
    if (randnum == 2) {
        var pop_embed1 = new Discord.RichEmbed()
            .setColor('#FAFEBF')
            .setTitle('Tu aimes les pop corn ?')
            .setImage('http://media.topito.com/wp-content/uploads/2015/05/giphy-18.gif')
        message.channel.sendEmbed(pop_embed1)
        console.log('PopCorn2')
    }
    if (randnum == 1) {
        var pop_embed1 = new Discord.RichEmbed()
            .setColor('#FAFEBF')
            .setTitle('Tu aimes les pop corn ?')
            .setImage('http://aubrylia.a.u.pic.centerblog.net/gif-animal-popcorn.gif')
        message.channel.sendEmbed(pop_embed1)
        console.log('PopCorn1')
    }

    if (randnum == 0) {
        var pop_embed1 = new Discord.RichEmbed()
            .setColor('#FAFEBF')
            .setTitle('Tu aimes les pop corn ?')
            .setImage('https://vignette.wikia.nocookie.net/glee/images/3/36/Blaine_popcorn_lol.gif/revision/latest?cb=20140926195829')
        message.channel.sendEmbed(pop_embed1)
        console.log('PopCorn0')
    }

    }

    if (message.content.startsWith('!play')) {
        // On récupère le premier channel audio du serveur
        let voiceChannel = message.guild.channels
          .filter(function (channel) { return channel.type === 'voice' })
          .first()
        // On récupère les arguments de la commande 
        // il faudrait utiliser une expression régulière pour valider le lien youtube
        let args = message.content.split(' ')
        // On rejoint le channel audio
        voiceChannel
          .join()
          .then(function (connection) {
            // On démarre un stream à partir de la vidéo youtube
            let stream = YoutubeStream(args[1])
            stream.on('error', function () {
              message.reply("Je n'ai pas réussi à lire cette vidéo :(")
              connection.disconnect()
            })
            // On envoie le stream au channel audio
            // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
            connection
              .playStream(stream)
              .on('end', function () {
                connection.disconnect()
              })
          })
      }

        if (message.content === prefix + 'leave') {
            let voiceChannel = message.guild.channels
            .filter(function (channel) { return channel.type === 'voice' })
            .first()
            voiceChannel.leave();
            message.channel.send(`Je t'est quitté ${message.author}`)
        }
        if (message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#FE0101')
            .setTitle('Mes commandes :')
            .setDescription('** **')
            .addField("Help :", "->aide → Affiche les commandes du bot !")
            .addField('Histoire :', '`->newstory` → rajoute une histoire à la base de données.\n->tellstory → raconte une histoire de la base de donnés.')
            .addField('Liens :', '`->liens` → donne touts les liens utiles(ou ->liensay)')
            .addField('Mes infos :', '`->me` → donne tous ce que je sais sur vous')
            .addField('PopCorn !!', '`->POP CORN` → Réponse aléatoire')
            .addField("Ping :", "Ping → Donne le ping")
            .addField('Support', '->support pour le liens du support')
            .setThumbnail(bot.user.avatarURL)
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        var help_embed2 = new Discord.RichEmbed()
            .setColor('#FE0101')
            .setTitle('On est content')
            .setDescription(message.author + ' Le ->aide a été envoyé en MP')
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        var adminembed = new Discord.RichEmbed()
            .setColor('#FE0101')
            .setTitle('Administration')
            .setDescription('** **')
            .addField('Kick :', '->kick pour kick la personne demander')
            .addField('Ban', '->ban pour ban !!')
        message.author.sendEmbed(help_embed);
        message.author.sendEmbed(adminembed);
        message.channel.sendEmbed(help_embed2);
        //message.channel.sendMessage("Voici les commandes du bot :\n -/help pour afficher les commandes");
        console.log("Commande Help demandée !");
    }

    

    if (message.content === prefix + 'me') {
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var a = new Discord.RichEmbed()
            .setColor('#B0B0B0')
            .setThumbnail(bot.avatarURL)
            .setTitle(message.author.username)
            .setDescription('** **')
            .addField('Xp', `${xpfinal[1]} d'exp`)
            .addField('Discriminateur', '*A venir....*')
            .addField('Status', '*A venir....*')
            .addField('Nitro', '*A venir....*')
            .addField('Bot', '*A venir....*')
            .setImage(message.author.avatarURL)
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        var help_embed2 = new Discord.RichEmbed()
            .setColor('#B0B0B0')
            .setTitle('On est content')
            .setDescription(message.author + ' Le ->me a été envoyé en MP')
            .setFooter("©BigTNT-TnTStaff@gmx.fr")
        message.author.sendEmbed(a)
        message.channel.sendEmbed(help_embed2)
        console.log('Info execute')
    }
})

function story_random(min, max) {
        min = Math.ceil(0);
        max = Math.floor(storynumber);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
}


function pop_random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(5);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
