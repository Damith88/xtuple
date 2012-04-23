/*globals XT process global */

global.YES = true;
global.NO = false;

/** @namespace
  
  @extends SC.Object
*/
XT = global.XT = SC.Object.create(
  /** @scope XT.prototype */ {

  NAMESPACE: "XT",
  VERSION: "4.0.0ALPHA",
  
  /**
    Numbers are manually generated.
    
    @static
    @constant
    @type String
    @default M
  */
  MANUAL_NUMBER: 'M',

  /** 
    Numbers are automatically generated by the server.
  
    @static
    @constant
    @type String
    @default A
  */
  AUTO_NUMBER: 'A',

  /**
    Numbers are automatically generated, but can be over-ridden by the user.
    
    @static
    @constant
    @type Number
    @default O
  */
  AUTO_OVERRIDE_NUMBER: 'O',
  
  /**
    System precision scale for money.
    
    @static
    @constant
    @type Number
    @default 2
  */
  MONEY_SCALE: 2,
  
  /**
    System precision scale for quantity.
    
    @static
    @constant
    @type Number
    @default 6
  */
  QTY_SCALE: 6,
  
  /**
    System precision scale for quantity per.
    
    @static
    @constant
    @type Number
    @default 7
  */
  QTY_PER_SCALE: 7,
  
  /**
    System precision scale for costs.
    
    @static
    @constant
    @type Number
    @default 6
  */
  COST_SCALE: 6,
  
  /**
    System precision scale for sales prices.
    
    @static
    @constant
    @type Number
    @default 4
  */
  SALES_PRICE_SCALE: 4,
  
  /**
    System precision scale for purchase prices.
    
    @static
    @constant
    @type Number
    @default 6
  */
  PURCHASE_PRICE_SCALE: 6,
  
  /**
    System precision scale for extended prices.
    
    @static
    @constant
    @type Number
    @default 0
  */
  EXTENDED_PRICE_SCALE:4,
  
  /**
    System precision scale for unit conversion ratios.
    
    @static
    @constant
    @type Number
    @default 7
  */
  UNIT_RATIO_SCALE: 8,
  
  /**
    System precision scale for percentages.
    
    @static
    @constant
    @type Number
    @default 4
  */
  PERCENT_SCALE: 4,
  
  /**
    System precision scale for weight.
    
    @static
    @constant
    @type Number
    @default 2
  */
  WEIGHT_SCALE: 2,

  /**
    ...
    
    @static
    @constant
    @type Boolean
    @default false
  */
  USE_320_TILES: false,

  /**
    System display color for errors.
    
    @static
    @constant
    @type String
    @default Red
  */
  ERROR: 'Red',

  /**
    System display color for warnings.
    
    @static
    @constant
    @type String
    @default Orange
  */
  WARNING:'Orange',

  /**
    System display color for emphasis.
    
    @static
    @constant
    @type String
    @default Blue
  */
  EMPHASIS: 'Blue',
  
  /**
    System display color for alternate emphasis.
    
    @static
    @constant
    @type String
    @default Green
  */
  ALTERNATE_EMPHASIS: 'Green',
  
  /**
    System display color for expired dates.
    
    @static
    @constant
    @type String
    @default 'Red'
  */
  EXPIRED: 'Red',
  
  /**
    System display color for future dates.
    
    @static
    @constant
    @type String
    @default Blue
  */
  FUTURE: 'Blue'

});

SC.mixin(XT, 
  /** @scope XT */ {

  //...................................................
  //
  // THE FOLLOWING IS A WORKAROUND TO ALLOW CERTAIN FILES
  // TO LOAD OUT OF ORDER BUT THIS SHOULD NOT BE AN EXCUSE
  // TO NOT CORRECT THE LOAD-ORDER ISSUE -- IT ONLY EXISTS
  // AS THE XBO SYSTEM IS BEING REMOVED TO ALLOW THIS TO
  // CONTINUE TO LIMP ALONG
  // THE CODE IS MERELY COPIED FROM THE SC RUNLOOP STUFF

  _xt_readyQueue: [],

  isReady: false,

  ready: function(target, method) {
    var queue = this._xt_readyQueue;
    
    // normalize
    if (method === undefined) {
      method = target; target = null ;
    } else if (SC.typeOf(method) === SC.T_STRING) {
      method = target[method] ;
    }
    
    if (!method) return this; // nothing to do.
    
    // if isReady, execute now.
    if (this.isReady) return method.call(target || document) ;
    
    // otherwise, add to queue.
    queue.push([target, method]) ;
    return this ; 
  },

  run: function() {
    if(this.isReady) return;
    this.isReady = true;
    var handler, ary, idx, len ;
    do {
      ary = XT._xt_readyQueue ;
      XT._xt_readyQueue = [] ; // reset
      for (idx=0, len=ary.length; idx<len; idx++) {
        handler = ary[idx] ;
        var target = handler[0] || document ;
        var method = handler[1] ;
        if (method) method.call(target) ;
      }
    } while (XT._xt_readyQueue.length > 0) ;
  },

  //
  // END HACKY STUFF
  //...................................................




  //...................................................
  // LOGGING
  //

  /**
    @note Placeholder for real logging mechanism
  */
  logLevels: SC.Object.create(
    /** @scope XT.logLevels */ {
    warn: YES,
    error: YES,
    info: YES 
  }),

  //...................................................
  // DateTime convenience functions
  //

  /**
    returns SC.DateTime object set to '1971-01-01'
  */
  startOfTime: function() {
    return SC.DateTime.create(0);
  },

  /**
    returns SC.DateTime object set to '2100-01-01'
  */
  endOfTime: function() {
    return SC.DateTime.parse('2100-01-01 00:00:00', '%Y-%m-%d %H:%M:%S');
  },

});
