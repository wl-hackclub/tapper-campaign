var _0x257e = ['tap_count', 'updateCounts', 'winner', 'getElementById', 'style', 'display', 'block', 'prize', 'emit', 'incrementGlobalCount', 'localCount', 'innerHTML', 'Personal\x20tap\x20count:\x20', 'globalCount', '</span>', 'email', 'value', 'undefined']; (function (_0xc4059f, _0x461a71) { var _0x3a6169 = function (_0x3b9615) { while (--_0x3b9615) { _0xc4059f['push'](_0xc4059f['shift']()); } }; _0x3a6169(++_0x461a71); }(_0x257e, 0x19d)); var _0x48cd = function (_0x505838, _0x502124) { _0x505838 = _0x505838 - 0x0; var _0xe69e7d = _0x257e[_0x505838]; return _0xe69e7d; }; const socket = io(); if (typeof Storage !== _0x48cd('0x0')) { if (!localStorage[_0x48cd('0x1')]) localStorage[_0x48cd('0x1')] = 0x0; } socket['on'](_0x48cd('0x2'), _0x465721 => { updateCounts(_0x465721); }); socket['on'](_0x48cd('0x3'), _0xe2784d => { document[_0x48cd('0x4')]('winnerModal')[_0x48cd('0x5')][_0x48cd('0x6')] = _0x48cd('0x7'); var _0x22fc72 = document[_0x48cd('0x4')](_0x48cd('0x8')); _0x22fc72['innerHTML'] = '\x20' + _0xe2784d; makeItRain(); }); function incrementCount() { socket[_0x48cd('0x9')](_0x48cd('0xa')); localStorage[_0x48cd('0x1')]++; document[_0x48cd('0x4')](_0x48cd('0xb'))[_0x48cd('0xc')] = _0x48cd('0xd') + localStorage[_0x48cd('0x1')]; } function updateCounts(_0x4532ee) { document[_0x48cd('0x4')](_0x48cd('0xb'))[_0x48cd('0xc')] = 'Personal\x20tap\x20count:\x20' + localStorage[_0x48cd('0x1')]; document['getElementById'](_0x48cd('0xe'))[_0x48cd('0xc')] = 'School-wide\x20tap\x20count:\x20<span>' + _0x4532ee + _0x48cd('0xf'); } function checkEmpty() { if (document[_0x48cd('0x4')](_0x48cd('0x10'))[_0x48cd('0x11')] === '') return ![]; }