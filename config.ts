import { Config } from './src/types';

const config: Config = {
  /**
   * Port where the server will be hosted.
   */
  port: 3000,

  /**
   * Room name used by the server upon startup. The room name can later be
   * changed through the console while the server is running.
   */
  roomNameOnStartup: 'bonjx.io',

  /**
   * Message of the day (motd) that is displayed to players when they load the rooms list.
   * The motd can be disabled by setting `motd` to false.
   * This overrides the roomname command somewhat.
   */
  motd: true,
  motdMessages: [
    "Gaming",
    "Learn rust",
    "NICAVA was here",
    "Balls boinking",
  ],

  /**
   * Password used by the server upon startup. Leave as `null` to make
   * the server start with no password. The password can later be changed
   * through the console while the server is running.
   */
  roomPasswordOnStartup: null,

  /**
   * Game settings used by the server upon startup.
   */
  defaultGameSettings: {
    map: 'ILCKJAhZIawhjqUgCQJoHUCsA7AkgKIAmAngEYDMAagK4BaqAsgOZMCWALAO4jEAi5AOIAbEcVz1OIQjAAMAOQDOAQ0zUATBJbAAwjtQh0McLOBMQO6BCG9IoAFIAOaUmC4AXjsQ-ff-z4AqroAZgDyvqD84AG+hJAAbjGxfgBi7l4+snIpPtDkFrm+uqCpALZFlRAlqfBVlfa1vtCYyfXtiLCQDn6ghHUdwF09vtz9gyCBkGY+fW0Q0ADK8xM+6QBKfvEziGMDq8VRK8D8wMu+FjkBJdHNZ8eXsTfHS8fZT0e+p+dZwFf+9gBE1ATDCqG8lTMgSGvVQ+wgp02cUgAAdVukRllINheoQXsAVMcio14VBgOglO09qspvRerd6vE0RN0v4dlVoNxOABTdrgexCAAyd2I0IOHTFvUGhF0AAUIvVrOkKciAIxE8XXUAlL7AegAewmJR1eT1hsGJLuCg6oHwLnaUMgdMiDM1DUpCBCAGoAPR+-1+pwgVA+hIBgPe8P+oOC0hOBIyEAxSNRn1B4AhsOplNRoMAaX05rM3hz4fTmdTPtLAZjum4HrMvGA1ejwdDlZbgeABZYRZgEE7abbWajg5jcYTwFkgObvtT5fb2bnue7hcTkBLy7Lw47W5rq9766bY53S8r+bXU70A73rYzi9Ht67sfjiZNJ-vI-DJ5fk9k+hAD8KzPedgF-N9jyfIdP13c8wInRNTkAqCFy-CMUPg18rwZICH2-DDwOwzc4JgkCV0wQVUg8RDIJI4DHzg9ZoWoq8ZlwtD-RPJjgBY2Q8WQui8PQuCVDKFEAEcEEIYjQNIhjQIoqipNo2T6PwuDFN44BWVnQSOL9E9RIkhBUmTDC5PUhTKK01IZJXCzhNAozJIgVIVPstTHJXZyECEG89NgpyxJckAhDMgKyO3TTEyEOztwcziMOihY7AAY14XR0DKVK3R8H1XD8H0ADZ6DKUryrKAArH0ABUmA8erGpY3KWtaiB+TAeJOpAJtE2AKx0rOdYNFSBhSEgXQ1AAD1UTAAE5aDUbBxPIDRAghXV0GMepZS9AJdrKw7yv1H05Aa87Gt6trrvFMw+mge6QA9XgoRgAxLD0cA8yek4QGtbS6gACwUNRQBYQIhCmwHiFiUoVHafgfQ2xBBR9K6EBBMFkdiCxJQaYAkSyOUFRuvxrC6x7wFZaR+F4fk+IG3h8FS0QlGEVJSCIajyD2rFmXqfL-F0aCfH4L0nDzWUAA1dEq1VuH50mlZtftKeLYAapMEApYsXRUFRYQodS9hIGWIQkdNQl2l2gIw38UNZfl-U5tSvMNWVj2tiTCmuuAfBtPATAQCU4ApvYKg6HQShYBYLLUjZ5gAiZDpBbJgJEbqi7zs9nOig6tWeuAKW3uAMKYEGvMIah4ghHoBJUrKOQWAUdHEFAVBFmx2JEa7kBEZRI7DpUWU5qasfc4noEpwein+0gQ04EgTmXXdiYpjARBdECSqehUAqpL+a70j6HwRHwKbuCEWgrWuwEHoQBx2CYd3uFM667p2TLKsKPwmG6W-uqIAIB4bgqB8DY2gP9Vqd8N4QEfqwRAABeIAA',
    gt: 2,
    wl: 3,
    q: false,
    tl: false,
    tea: false,
    ga: 'b',
    mo: 'b',
    bal: [],
  },

  /**
   * Maximum amount of players that can be in the room at the same time.
   * The max amount of players cannot be changed while the server is running.
   */
  maxPlayers: 101,

  /**
   * Controls whether the server automatically assigns a host when there
   * are no players in the room or when the previous host leaves.
   */
  autoAssignHost: true,

  /**
   * Controls whether the server gives a player host privileges if they chat the secret host password.
   */
  secretHost: true,
  secretHostPassword: 'boingboing13', // change this please

  /**
   * Timestamp format used for chatlogs.
   */
  timeStampFormat: 'YYYY-MM-DD hh:mm:ss UTCZ',

  /**
   * This object contains a set of rules that affect and regulate all players in the room (including the host), as
   * well as players trying to join the room.
   */
  restrictions: {
    usernames: {
      noDuplicates: true,
      noEmptyNames: true,
      maxLength: 32,
    },

    /**
     * This section determines how certain actions must be ratelimited.
     *
     * Each ratelimit has 3 settings: `amount`, `timeframe`, and `restore`.
     *
     * To put it simply: If a user performs an action `amount` times within
     * `timeframe` seconds, that user will not be able to perform that action
     * until `restore` seconds have passed.
     */
    ratelimits: {
      /**
       * Ratelimit for joining the server.
       */
      joining: { amount: 5, timeframe: 10, restore: 60 },
      /**
       * Ratelimit for sending chat messages. This ratelimit also applies
       * to map suggestions.
       */
      chatting: { amount: 7, timeframe: 10, restore: 10 },
      /**
       * Ratelimit for hitting the "ready" button.
       */
      readying: { amount: 20, timeframe: 5, restore: 30 },
      /**
       * Ratelimit for changing teams. This ratelimit also applies to
       * locking teams.
       */
      changingTeams: { amount: 4, timeframe: 0.5, restore: 1 },
      /**
       * Ratelimit for changing the room's game mode. This ratelimit does
       * not apply to GMMaker game modes.
       */
      changingMode: { amount: 2, timeframe: 1, restore: 1 },
      /**
       * Ratelimit for changing the room's map.
       */
      changingMap: { amount: 2, timeframe: 2, restore: 2 },
      /**
       * Ratelimit for "Game starts in (number)" messages.
       */
      startGameCountdown: { amount: 5, timeframe: 1, restore: 2 },
      /**
       * Ratelimit for starting and ending a game.
       */
      startingEndingGame: { amount: 10, timeframe: 5, restore: 5 },
      /**
       * Ratelimit for transferring host privileges.
       */
      transferringHost: { amount: 5, timeframe: 10, restore: 60 },
    },
  },
};

export default config;
