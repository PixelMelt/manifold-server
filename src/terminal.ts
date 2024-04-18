import { createInterface, Interface } from 'node:readline';
import ManifoldServer from './server';
import * as OUT from './outPacketIds';
import fs from 'fs';
import columnify from 'columnify';
import chalk from 'chalk';
import { Config } from './types';

interface TerminalCommand {
  usage: string;
  description: string;
  callback: (cmd: string[], server: ManifoldServer) => void;
}

function log(message: string, color: string) {
  // @ts-ignore
  console.log(chalk[color](message));
}

function isID(cmd: string) {
  return !/[^0-9]+/.test(cmd);
}

function getPlayerId(cmd: string, server: ManifoldServer) {
  if (isID(cmd) && server.playerSockets[parseInt(cmd)]) {
    return parseInt(cmd);
  } else {
    for (let i = 0; i < server.playerInfo.length; i++) {
      if (server.playerInfo[i] && server.playerInfo[i].userName.toLowerCase() == cmd.toLowerCase()) return i;
    }
  }

  return -1;
}

const availableCommands: Record<string, TerminalCommand> = {
  host: {
    usage: 'host [username or id, leave blank to make no one host]',
    description: 'Give host privileges to someone in the room.',
    callback: function (cmd, server) {
      const id = getPlayerId(cmd[1], server);

      if (cmd[1] && id == -1) {
        log(`${cmd[1]} is not a valid player name or id.`, 'red');
        return;
      }

      server.hostId = id;

      // send host change packet to everyone
      server.io.to('main').emit(OUT.TRANSFER_HOST, { oldHost: -1, newHost: server.hostId });

      // log host transfer message
      if (id == -1) {
        server.logChatMessage('* The game no longer has a host');
        log('The game no longer has a host.', 'yellow');
      } else {
        server.logChatMessage(`* ${server.playerInfo[server.hostId].userName} is now the game host`);
        log(`${server.playerInfo[id].userName} (id ${id}) is now the game host.`, 'green');
      }
    },
  },
  ban: {
    usage: 'ban [username]',
    description: 'Ban a player currently in the room.',
    callback(cmd, server) {
      const id = getPlayerId(cmd[1], server);

      if (id == -1) {
        log(`${cmd[1]} is not a valid player name or id.`, 'red');
        return;
      }

      server.banPlayer(id);

      log(`Banned ${cmd[1]}!`, 'green');
    },
  },
  unban: {
    usage: 'unban [username]',
    description: 'Unban a player.',
    callback(cmd, server) {
      const index = server.banList.usernames.indexOf(cmd[1]);

      if (index == -1) {
        log(`${cmd[1]} is not in the ban list.`, 'red');
        return;
      }

      server.banList.usernames.splice(index, 1);
      server.banList.addresses.splice(index, 1);

      fs.writeFileSync('./banlist.json', JSON.stringify(server.banList), {
        encoding: 'utf8',
      });

      log(`Unbanned ${cmd[1]}!`, 'green');
    },
  },
  players: {
    usage: 'players',
    description: 'Show a list of all the players in the room.',
    callback(cmd, server) {
      if (server.playerAmount == 0) {
        log("There isn't anyone connected to the server!", 'yellow');
        return;
      }

      const teamNames = ['Spectating', 'Free For All', 'Red', 'Blue', 'Green', 'Yellow'];

      const playerList = [];

      for (let i = 0; i < server.playerInfo.length; i++) {
        const player = server.playerInfo[i];

        if (!player) continue;

        playerList.push({
          id: i,
          username: player.userName,
          level: player.guest ? 'Guest' : player.level,
          team: teamNames[player.team],
        });
      }

      log(
        columnify(playerList, {
          columnSplitter: '   ',
          maxWidth: 20,
        }),
      "green");
    },
  },
  roomname: {
    usage: 'roomname [new name]',
    description:
      "Change the room's name. The new name is not permanent and will change back to roomNameOnStartup when the server is restarted. Remember to use quotes if the room name you want to use has spaces.",
    callback(cmd, server) {
      server.roomName = cmd[1];
      log(`The room name is now "${cmd[1]}".`, 'green');
    },
  },
  roompass: {
    usage: 'roompass [new password, leave blank to clear the password]',
    description:
      "Change the room's name. The new password is not permanent and will change back to roomPasswordOnStartup when the server is restarted. Remember to use quotes if the password you want to use has spaces.",
    callback(cmd, server) {
      if (cmd[1]) {
        server.password = cmd[1];
        log(`The room password is now "${cmd[1]}".`, 'green');
      } else {
        server.password = null;
        log(`The room password has been cleared.`,'green');
      }
    },
  },
  savechatlog: {
    usage: 'savechatlog',
    description: 'Save all chat messages sent since the last call to savechatlog into a txt file.',
    callback(cmd, server) {
      server.saveChatLog();
    },
  },
  close: {
    usage: 'close',
    description: 'Close the server.',
    callback: function () {
      log('Closing...', 'blue');
      process.exit(0);
    },
  },
  fakesay: {
    usage: 'fakesay [player name or id] [message]',
    description: 'Send a fake chat message from a user.',
    callback: function (cmd, server) {
      const id = getPlayerId(cmd[1], server);

      if (cmd[1] && id == -1) {
        log(`${cmd[1]} is not a valid player name or id.`,'red');
        return;
      }

      const message = cmd.slice(2).join(' ');

      server.io.to('main').emit(OUT.CHAT_MESSAGE, id, message);
      log(`Sent message from ${server.playerInfo[id].userName}`, 'green');
    },
  },
  help: {
    usage: 'help [command]',
    description: 'Show this list of commands.',
    callback: function (cmd) {
      if(cmd.length > 1) {
        if(availableCommands[cmd[1]]) {
          log(availableCommands[cmd[1]].usage, 'blue');
          log(availableCommands[cmd[1]].description, 'blue');
          return;
        }
      }

      log('Available commands:', 'blue');
      log('Type "help [command]" for more.', 'blue');
      // for (const command in availableCommands) {
      //   log(availableCommands[command].usage.split(' ')[0], 'blue');
      // }
      log(columnify(Object.keys(availableCommands).map((command) => (
        {
          command: command,
          usage: availableCommands[command].usage,
        }
      )), { columnSplitter: '   ', maxWidth: 80 }), 'blue');
    },
  },
};

export default class ManifoldTerminal {
  public server: ManifoldServer;
  public readlineInterface: Interface;

  constructor(server: ManifoldServer) {
    this.server = server;

    this.readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async start() {
    log(
      [
        `| Manifold Server v${require('../package.json').version}`,
        `| Live at port ${this.server.config.port}`,
        '|',
        '| Type "help" to show a list of commands.',
        '',
      ].join('\n'),
    "blue");

    while (true) {
      const userInput = await new Promise<string>((resolve) => {
        this.readlineInterface.question(chalk.magenta('> '), resolve);
      });

      const cmd = this.parseCommand(userInput);

      if (availableCommands[cmd[0]]) {
        availableCommands[cmd[0]].callback(cmd, this.server);
      } else {
        log(`${cmd[0]} is not a valid command.`,'red');
      }

      log('', 'blue');
    }
  }

  parseCommand(cmd: string) {
    const result = [];

    const splitBySpaces = cmd.split(' ');

    let readingString = false;
    let theString = '';

    for (const part of splitBySpaces) {
      if (readingString) {
        // multi-part string ending
        if (part.endsWith('"') && !part.endsWith('\\"')) {
          readingString = false;
          theString += part.slice(0, -1);
          result.push(theString.replace('\\', ''));
          theString = '';
          continue;
        }

        theString += part + ' ';
      } else {
        // string with no spaces
        if (part.startsWith('"') && part.endsWith('"') && !part.endsWith('\\"')) {
          result.push(part.slice(1, -1).replace('\\', ''));
          continue;
        }

        // multi-part string started
        if (part.startsWith('"')) {
          readingString = true;
          theString += part.slice(1) + ' ';
          continue;
        }

        // not a string nor part of a string
        result.push(part.replace('\\', ''));
      }
    }

    return result;
  }
}
