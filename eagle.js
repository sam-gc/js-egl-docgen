module.exports = function(hljs) {
  var GO_KEYWORDS = {
    keyword:
      'break default func interface case struct else switch ' +
      'fallthrough if continue for import export return var defer ' +
      'bool byte short int long ubyte ushort ulong uint float double ' +
      'class __inc __dec sizeof new',
    literal:
       'yes no nil',
    built_in:
      'self init destruct'
  };
  return {
    aliases: ['eagle'],
    keywords: GO_KEYWORDS,
    illegal: '</',
    contains: [
      {
        className: 'string',
        variants: [
          hljs.QUOTE_STRING_MODE,
          {begin: '\'', end: '[^\\\\]\''},
          {begin: '`', end: '`'},
        ]
      },
      {
          className: 'comment',
          variants: [
            {begin: '--', end: '\n'},
            {begin: '-\\*', end: '\\*-'}
          ]
      },
      {
        className: 'number',
        variants: [
          {begin: hljs.C_NUMBER_RE + '[dflsi]', relevance: 1},
          hljs.C_NUMBER_MODE
        ]
      },
      /*
      {
        className: 'function',
        beginKeywords: 'func', end: /\s*\{/, excludeEnd: true,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: GO_KEYWORDS,
            illegal: /["']/
          }
        ]
      }
      */
    ]
  };
};
