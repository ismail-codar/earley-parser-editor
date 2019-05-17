(function jsonGrammarOnlyExample() {
  // ----------------- Lexer -----------------
  const createToken = chevrotain.createToken;
  const Lexer = chevrotain.Lexer;

  const ahmet = createToken({ name: "ahmet", pattern: /ahmet/ });
  const yemek = createToken({ name: "yemek", pattern: /yemek/ });
  const ye = createToken({ name: "ye", pattern: /ye/ });
  const yor = createToken({ name: "yor", pattern: /yor/ });
  const di = createToken({ name: "di", pattern: /di/ });
  const ecek = createToken({ name: "ecek", pattern: /ecek/ });
  const i = createToken({ name: "i", pattern: /i/ });
  const suanda = createToken({ name: "suanda", pattern: /suanda/ });
  const dun = createToken({ name: "dun", pattern: /dun/ });
  const yarin = createToken({ name: "yarin", pattern: /yarin/ });

  const jsonTokens = [ahmet, yemek, ye, yor, di, ecek, i, suanda, dun, yarin];

  const JsonLexer = new Lexer(jsonTokens, {
    // Less position info tracked, reduces verbosity of the playground output.
    positionTracking: "onlyStart"
  });

  // ----------------- parser -----------------
  const Parser = chevrotain.Parser;

  class JsonParser extends Parser {
    constructor() {
      super(jsonTokens, {
        recoveryEnabled: true
      });

      const $ = this;

      $.RULE("OZNE", () => {
        $.CONSUME(ahmet);
      });

      $.RULE("YUKLEM_KOK", () => {
        $.CONSUME(ye);
      });

      $.RULE("YUKLEM_GECMIS", () => {
        $.SUBRULE($.YUKLEM_KOK);
        $.CONSUME(di);
      });
      $.RULE("YUKLEM_GELECEK", () => {
        $.SUBRULE($.YUKLEM_KOK);
        $.CONSUME(ecek);
      });
      $.RULE("YUKLEM_SIMDIKI", () => {
        $.SUBRULE($.YUKLEM_KOK);
        $.CONSUME(yor);
      });
      $.RULE("BELIRTISIZ_NESNE", () => {
        $.CONSUME(yemek);
      });
      $.RULE("BELIRTILI_NESNE", () => {
        $.SUBRULE($.BELIRTISIZ_NESNE);
        $.CONSUME(i);
      });
      $.RULE("NESNE", () => {
        $.OR([
          { ALT: () => $.SUBRULE($.BELIRTILI_NESNE) },
          { ALT: () => $.SUBRULE($.BELIRTISIZ_NESNE) }
        ]);
      });

      $.RULE("ZAMAN_SIMDI", () => {
        $.CONSUME(suanda);
      });
      $.RULE("ZAMAN_GECMIS", () => {
        $.CONSUME(dun);
      });
      $.RULE("ZAMAN_GELECEK", () => {
        $.CONSUME(yarin);
      });
      $.RULE("ZAMAN", () => {
        $.OR([
          { ALT: () => $.SUBRULE($.ZAMAN_SIMDI) },
          { ALT: () => $.SUBRULE($.ZAMAN_GECMIS) },
          { ALT: () => $.SUBRULE($.ZAMAN_GELECEK) }
        ]);
      });

      $.RULE("YARDIMCI_BASIT", () => {
        $.OR([
          // { ALT: () => $.SUBRULE($.YER) },
          { ALT: () => $.SUBRULE($.ZAMAN) },
          { ALT: () => $.SUBRULE($.NESNE) }
        ]);
      });

      $.RULE("YARDIMCI_ZAMAN_NESNE", () => {
        $.SUBRULE($.NESNE);
        $.SUBRULE($.ZAMAN);
      });
      $.RULE("YARDIMCI_NESNE_ZAMAN", () => {
        $.SUBRULE($.ZAMAN);
        $.SUBRULE($.NESNE);
      });
      $.RULE("YARDIMCI", () => {
        $.OR([
          { ALT: () => $.SUBRULE($.YARDIMCI_NESNE_ZAMAN) },
          { ALT: () => $.SUBRULE($.YARDIMCI_ZAMAN_NESNE) },
          { ALT: () => $.SUBRULE($.YARDIMCI_BASIT) }
        ]);
      });

      $.RULE("YUKLEM", () => {
        $.OR([
          { ALT: () => $.SUBRULE($.YUKLEM_GECMIS) },
          { ALT: () => $.SUBRULE($.YUKLEM_GELECEK) },
          { ALT: () => $.SUBRULE($.YUKLEM_SIMDIKI) }
        ]);
      });

      $.RULE("CUMLE_SADE", () => {
        $.SUBRULE($.OZNE);
        $.SUBRULE($.YUKLEM);
      });
      $.RULE("CUMLE_YARDIMCILI", () => {
        $.SUBRULE($.OZNE);
        $.SUBRULE($.YARDIMCI);
        $.SUBRULE($.YUKLEM);
      });

      //  CUMLE_SADE | CUMLE_YARDIMCILI
      $.RULE("CUMLE", () => {
        $.OR([
          { ALT: () => $.SUBRULE($.CUMLE_SADE) },
          { ALT: () => $.SUBRULE($.CUMLE_YARDIMCILI) }
        ]);
      });

      // very important to call this after all the rules have been setup.
      // otherwise the parser may not work correctly as it will lack information
      // derived from the self analysis.
      this.performSelfAnalysis();
    }
  }

  // for the playground to work the returned object must contain these fields
  return {
    lexer: JsonLexer,
    parser: JsonParser,
    defaultRule: "CUMLE"
  };
})();
