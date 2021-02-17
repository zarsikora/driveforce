/*!
  * Bootstrap v4.5.3 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, (function (exports, $) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($__default['default'](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $__default['default'](this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $__default['default'].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default['default'].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (_) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $__default['default'](element).css('transition-duration');
      var transitionDelay = $__default['default'](element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $__default['default'](element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $__default['default'].fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.5.3';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $__default['default'](element).closest("." + CLASS_NAME_ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $__default['default'].Event(EVENT_CLOSE);
      $__default['default'](element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $__default['default'](element).removeClass(CLASS_NAME_SHOW);

      if (!$__default['default'](element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $__default['default'](element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $__default['default'](element).detach().trigger(EVENT_CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME] = Alert._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = Alert;

  $__default['default'].fn[NAME].noConflict = function () {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.5.3';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_BUTTON = '.btn';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $__default['default'](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

              if (activeElement) {
                $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default['default'](input).trigger('change');
            }
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }

        if (triggerChangeEvent) {
          $__default['default'](this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY$1, data);
        }

        data.shouldAvoidTriggerChange = avoidTriggerChange;

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;

    if (!$__default['default'](button).hasClass(CLASS_NAME_BUTTON)) {
      button = $__default['default'](button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
        Button._jQueryInterface.call($__default['default'](button), 'toggle', initialButton.tagName === 'INPUT');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $__default['default'](event.target).closest(SELECTOR_BUTTON)[0];
    $__default['default'](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $__default['default'](window).on(EVENT_LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$1] = Button._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = Button;

  $__default['default'].fn[NAME$1].noConflict = function () {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.5.3';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      var $element = $__default['default'](this._element); // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible

      if (!document.hidden && $element.is(':visible') && $element.css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $__default['default'](this._element).one(EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $__default['default'](this._element).off(EVENT_KEY$2);
      $__default['default'].removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $__default['default'](this._element).on(EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $__default['default'](this._element).on(EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $__default['default'](this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $__default['default'](this._element).on(EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default['default'](this._element).on(EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $__default['default'].Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $__default['default'](this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default['default'](indicators).removeClass(CLASS_NAME_ACTIVE$1);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $__default['default'](nextIndicator).addClass(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default['default'](nextElement).hasClass(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $__default['default'].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default['default'](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default['default'](nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $__default['default'](activeElement).addClass(directionalClassName);
        $__default['default'](nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $__default['default'](activeElement).one(Util.TRANSITION_END, function () {
          $__default['default'](nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE$1);
          $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1 + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $__default['default'](_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1);
        $__default['default'](nextElement).addClass(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        $__default['default'](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$2);

        var _config = _extends({}, Default, $__default['default'](this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default['default'](this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $__default['default'](selector)[0];

      if (!target || !$__default['default'](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default['default'](target), config);

      if (slideIndex) {
        $__default['default'](target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $__default['default'](window).on(EVENT_LOAD_DATA_API$1, function () {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $__default['default'](carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$2] = Carousel._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = Carousel;

  $__default['default'].fn[NAME$2].noConflict = function () {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.5.3';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$1));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $__default['default'](actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $__default['default'].Event(EVENT_SHOW);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default['default'](actives).not(this._selector), 'hide');

        if (!activesData) {
          $__default['default'](actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $__default['default'](this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default['default'](this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $__default['default'](_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $__default['default'](_this._element).trigger(EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var startEvent = $__default['default'].Event(EVENT_HIDE);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $__default['default'](this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $__default['default']([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(CLASS_NAME_SHOW$1)) {
              $__default['default'](trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $__default['default'](_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $__default['default'](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $__default['default'](children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $__default['default'](element).hasClass(CLASS_NAME_SHOW$1);

      if (triggerArray.length) {
        $__default['default'](triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$3);

        var _config = _extends({}, Default$1, $element.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $__default['default'](this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $__default['default'](selectors).each(function () {
      var $target = $__default['default'](this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$3] = Collapse._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = Collapse;

  $__default['default'].fn[NAME$3].noConflict = function () {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends$1({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends$1({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends$1({}, attributes, data.attributes);
    data.styles = _extends$1({}, styles, data.styles);
    data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$1({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends$1({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends$1({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.5.3';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $__default['default'].Event(EVENT_SHOW$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $__default['default'](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $__default['default'](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_SHOWN$1, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || !$__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$4);
      $__default['default'](this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $__default['default'](this._element).on(EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $__default['default'](this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $__default['default'](this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $__default['default'](this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default['default'](this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $__default['default'](toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$__default['default'](parent).hasClass(CLASS_NAME_SHOW$2)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $__default['default'].contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);
        $__default['default'](parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default['default'](dropdownMenu).removeClass(CLASS_NAME_SHOW$2);
        $__default['default'](parent).removeClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $__default['default'](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || $__default['default'](this).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $__default['default'](parent).hasClass(CLASS_NAME_SHOW$2);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE) {
        if (event.which === ESCAPE_KEYCODE) {
          $__default['default'](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default['default'](this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
        return $__default['default'](item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$4 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default['default'](this), 'toggle');
  }).on(EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$4] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Dropdown;

  $__default['default'].fn[NAME$4].noConflict = function () {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.5.3';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$3 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
        this._isTransitioning = true;
      }

      var showEvent = $__default['default'].Event(EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      $__default['default'](this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $__default['default'](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function () {
        $__default['default'](_this._element).one(EVENT_MOUSEUP_DISMISS, function (event) {
          if ($__default['default'](event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$2);
      $__default['default'](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'](this._element).removeClass(CLASS_NAME_SHOW$3);
      $__default['default'](this._element).off(EVENT_CLICK_DISMISS);
      $__default['default'](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $__default['default'](htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'].removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $__default['default'].Event(EVENT_HIDE_PREVENTED);
        $__default['default'](this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.isDefaultPrevented()) {
          return;
        }

        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._element).off(Util.TRANSITION_END);
        $__default['default'](this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            $__default['default'](_this3._element).one(Util.TRANSITION_END, function () {
              _this3._element.style.overflowY = '';
            }).emulateTransitionEnd(_this3._element, modalTransitionDuration);
          }
        }).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);
      var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      if ($__default['default'](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default['default'](this._element).addClass(CLASS_NAME_SHOW$3);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $__default['default'].Event(EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $__default['default'](_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $__default['default'](document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
      .on(EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $__default['default'](_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $__default['default'](this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this6.hide();
          } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default['default'](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $__default['default'](window).on(EVENT_RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $__default['default'](window).off(EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $__default['default'](document.body).removeClass(CLASS_NAME_OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $__default['default'](_this8._element).trigger(EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $__default['default'](this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default['default'](this._backdrop).appendTo(document.body);
        $__default['default'](this._element).on(EVENT_CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this9._triggerBackdropTransition();
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $__default['default'](this._backdrop).addClass(CLASS_NAME_SHOW$3);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $__default['default'](this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default['default'](this._backdrop).removeClass(CLASS_NAME_SHOW$3);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default['default'](this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

        $__default['default'](fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $__default['default'](element).css('padding-right');
          $__default['default'](element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $__default['default'](stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $__default['default'](element).css('margin-right');
          $__default['default'](element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $__default['default'](document.body).css('padding-right');
        $__default['default'](document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $__default['default'](document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default['default'](fixedContent).each(function (index, element) {
        var padding = $__default['default'](element).data('padding-right');
        $__default['default'](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
      $__default['default'](elements).each(function (index, element) {
        var margin = $__default['default'](element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $__default['default'](element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $__default['default'](document.body).data('padding-right');
      $__default['default'](document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$5);

        var _config = _extends({}, Default$3, $__default['default'](this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $__default['default'](this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $__default['default'](target).data(DATA_KEY$5) ? 'toggle' : _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $__default['default'](target).one(EVENT_SHOW$2, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(EVENT_HIDDEN$2, function () {
        if ($__default['default'](_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default['default'](target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$5] = Modal._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = Modal;

  $__default['default'].fn[NAME$5].noConflict = function () {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.3): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.5.3';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var Event = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $__default['default'](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $__default['default'](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default['default'](this.getTipElement()).hasClass(CLASS_NAME_SHOW$4)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $__default['default'].removeData(this.element, this.constructor.DATA_KEY);
      $__default['default'](this.element).off(this.constructor.EVENT_KEY);
      $__default['default'](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default['default'](this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($__default['default'](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $__default['default'].Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $__default['default'](this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $__default['default'].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $__default['default'](tip).addClass(CLASS_NAME_FADE$2);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $__default['default'](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default['default'].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default['default'](tip).appendTo(container);
        }

        $__default['default'](this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $__default['default'](tip).addClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $__default['default'](_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $__default['default'](this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $__default['default'].Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $__default['default'](_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default['default'](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $__default['default'](tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($__default['default'](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2 + " " + CLASS_NAME_SHOW$4);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default['default'](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default['default'](content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $__default['default'](this.config.container);
      }

      return $__default['default'](document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $__default['default'](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $__default['default'](_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $__default['default'](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if ($__default['default'](context.getTipElement()).hasClass(CLASS_NAME_SHOW$4) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $__default['default'](this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$6] = Tooltip._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Tooltip;

  $__default['default'].fn[NAME$6].noConflict = function () {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.5.3';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $__default['default'](this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$5);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default['default'](this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$7] = Popover._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = Popover;

  $__default['default'].fn[NAME$7].noConflict = function () {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.5.3';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default['default'](this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default['default'](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$8);
      $__default['default'](this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        var id = $__default['default'](config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $__default['default'](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default['default']([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE$2);
        $link.addClass(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$2); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE$2); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE$2);
      }

      $__default['default'](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default['default'](this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API$2, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default['default'](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$8] = ScrollSpy._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = ScrollSpy;

  $__default['default'].fn[NAME$8].noConflict = function () {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.5.3';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$2 = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default['default'](this._element).hasClass(CLASS_NAME_ACTIVE$3) || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var target;
      var previous;
      var listElement = $__default['default'](this._element).closest(SELECTOR_NAV_LIST_GROUP$1)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$2;
        previous = $__default['default'].makeArray($__default['default'](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$3, {
        relatedTarget: this._element
      });
      var showEvent = $__default['default'].Event(EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (previous) {
        $__default['default'](previous).trigger(hideEvent);
      }

      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $__default['default'].Event(EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default['default'].Event(EVENT_SHOWN$3, {
          relatedTarget: previous
        });
        $__default['default'](previous).trigger(hiddenEvent);
        $__default['default'](_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default['default'](container).find(SELECTOR_ACTIVE_UL) : $__default['default'](container).children(SELECTOR_ACTIVE$2);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default['default'](active).hasClass(CLASS_NAME_FADE$4);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $__default['default'](active).removeClass(CLASS_NAME_SHOW$6).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default['default'](active).removeClass(CLASS_NAME_ACTIVE$3);
        var dropdownChild = $__default['default'](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $__default['default'](dropdownChild).removeClass(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default['default'](element).addClass(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$4)) {
        element.classList.add(CLASS_NAME_SHOW$6);
      }

      if (element.parentNode && $__default['default'](element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default['default'](element).closest(SELECTOR_DROPDOWN$1)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE$1));
          $__default['default'](dropdownToggleList).addClass(CLASS_NAME_ACTIVE$3);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $__default['default'](this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($__default['default'](this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$9] = Tab._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = Tab;

  $__default['default'].fn[NAME$9].noConflict = function () {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.5.3';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $__default['default'].Event(EVENT_SHOW$4);
      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$5);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$7);

        $__default['default'](_this._element).trigger(EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      Util.reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$4);
      $__default['default'](this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        this._element.classList.remove(CLASS_NAME_SHOW$7);
      }

      $__default['default'](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default['default'].removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, $__default['default'](this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        $__default['default'](_this3._element).trigger(EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$a] = Toast._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = Toast;

  $__default['default'].fn[NAME$a].noConflict = function () {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.bundle.js.map

/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
;
(function(root, blazy) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register bLazy as an anonymous module
        define(blazy);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = blazy();
    } else {
        // Browser globals. Register bLazy on window
        root.Blazy = blazy();
    }
})(this, function() {
    'use strict';

    //private vars
    var _source, _viewport, _isRetina, _supportClosest, _attrSrc = 'src', _attrSrcset = 'srcset';

    // constructor
    return function Blazy(options) {
        //IE7- fallback for missing querySelectorAll support
        if (!document.querySelectorAll) {
            var s = document.createStyleSheet();
            document.querySelectorAll = function(r, c, i, j, a) {
                a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                    s.removeRule(0);
                }
                return c;
            };
        }

        //options and helper vars
        var scope = this;
        var util = scope._util = {};
        util.elements = [];
        util.destroyed = true;
        scope.options = options || {};
        scope.options.error = scope.options.error || false;
        scope.options.offset = scope.options.offset || 100;
        scope.options.root = scope.options.root || document;
        scope.options.success = scope.options.success || false;
        scope.options.selector = scope.options.selector || '.b-lazy';
        scope.options.separator = scope.options.separator || '|';
        scope.options.containerClass = scope.options.container;
        scope.options.container = scope.options.containerClass ? document.querySelectorAll(scope.options.containerClass) : false;
        scope.options.errorClass = scope.options.errorClass || 'b-error';
        scope.options.breakpoints = scope.options.breakpoints || false;
        scope.options.loadInvisible = scope.options.loadInvisible || false;
        scope.options.successClass = scope.options.successClass || 'b-loaded';
        scope.options.validateDelay = scope.options.validateDelay || 25;
        scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;
        scope.options.srcset = scope.options.srcset || 'data-srcset';
        scope.options.src = _source = scope.options.src || 'data-src';
        _supportClosest = Element.prototype.closest;
        _isRetina = window.devicePixelRatio > 1;
        _viewport = {};
        _viewport.top = 0 - scope.options.offset;
        _viewport.left = 0 - scope.options.offset;


        /* public functions
         ************************************/
        scope.revalidate = function() {
            initialize(scope);
        };
        scope.load = function(elements, force) {
            var opt = this.options;
            if (elements && elements.length === undefined) {
                loadElement(elements, force, opt);
            } else {
                each(elements, function(element) {
                    loadElement(element, force, opt);
                });
            }
        };
        scope.destroy = function() {            
            var util = scope._util;
            if (scope.options.container) {
                each(scope.options.container, function(object) {
                    unbindEvent(object, 'scroll', util.validateT);
                });
            }
            unbindEvent(window, 'scroll', util.validateT);
            unbindEvent(window, 'resize', util.validateT);
            unbindEvent(window, 'resize', util.saveViewportOffsetT);
            util.count = 0;
            util.elements.length = 0;
            util.destroyed = true;
        };

        //throttle, ensures that we don't call the functions too often
        util.validateT = throttle(function() {
            validate(scope);
        }, scope.options.validateDelay, scope);
        util.saveViewportOffsetT = throttle(function() {
            saveViewportOffset(scope.options.offset);
        }, scope.options.saveViewportOffsetDelay, scope);
        saveViewportOffset(scope.options.offset);

        //handle multi-served image src (obsolete)
        each(scope.options.breakpoints, function(object) {
            if (object.width >= window.screen.width) {
                _source = object.src;
                return false;
            }
        });

        // start lazy load
        setTimeout(function() {
            initialize(scope);
        }); // "dom ready" fix

    };


    /* Private helper functions
     ************************************/
    function initialize(self) {
        var util = self._util;
        // First we create an array of elements to lazy load
        util.elements = toArray(self.options);
        util.count = util.elements.length;
        // Then we bind resize and scroll events if not already binded
        if (util.destroyed) {
            util.destroyed = false;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    bindEvent(object, 'scroll', util.validateT);
                });
            }
            bindEvent(window, 'resize', util.saveViewportOffsetT);
            bindEvent(window, 'resize', util.validateT);
            bindEvent(window, 'scroll', util.validateT);
        }
        // And finally, we start to lazy load.
        validate(self);
    }

    function validate(self) {
        var util = self._util;
        for (var i = 0; i < util.count; i++) {
            var element = util.elements[i];
            if (elementInView(element, self.options) || hasClass(element, self.options.successClass)) {
                self.load(element);
                util.elements.splice(i, 1);
                util.count--;
                i--;
            }
        }
        if (util.count === 0) {
            self.destroy();
        }
    }

    function elementInView(ele, options) {
        var rect = ele.getBoundingClientRect();

        if(options.container && _supportClosest){
            // Is element inside a container?
            var elementContainer = ele.closest(options.containerClass);
            if(elementContainer){
                var containerRect = elementContainer.getBoundingClientRect();
                // Is container in view?
                if(inView(containerRect, _viewport)){
                    var top = containerRect.top - options.offset;
                    var right = containerRect.right + options.offset;
                    var bottom = containerRect.bottom + options.offset;
                    var left = containerRect.left - options.offset;
                    var containerRectWithOffset = {
                        top: top > _viewport.top ? top : _viewport.top,
                        right: right < _viewport.right ? right : _viewport.right,
                        bottom: bottom < _viewport.bottom ? bottom : _viewport.bottom,
                        left: left > _viewport.left ? left : _viewport.left
                    };
                    // Is element in view of container?
                    return inView(rect, containerRectWithOffset);
                } else {
                    return false;
                }
            }
        }      
        return inView(rect, _viewport);
    }

    function inView(rect, viewport){
        // Intersection
        return rect.right >= viewport.left &&
               rect.bottom >= viewport.top && 
               rect.left <= viewport.right && 
               rect.top <= viewport.bottom;
    }

    function loadElement(ele, force, options) {
        // if element is visible, not loaded or forced
        if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || (ele.offsetWidth > 0 && ele.offsetHeight > 0))) {
            var dataSrc = getAttr(ele, _source) || getAttr(ele, options.src); // fallback to default 'data-src'
            if (dataSrc) {
                var dataSrcSplitted = dataSrc.split(options.separator);
                var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
                var srcset = getAttr(ele, options.srcset);
                var isImage = equal(ele, 'img');
                var parent = ele.parentNode;
                var isPicture = parent && equal(parent, 'picture');
                // Image or background image
                if (isImage || ele.src === undefined) {
                    var img = new Image();
                    // using EventListener instead of onerror and onload
                    // due to bug introduced in chrome v50 
                    // (https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o)
                    var onErrorHandler = function() {
                        if (options.error) options.error(ele, "invalid");
                        addClass(ele, options.errorClass);
                        unbindEvent(img, 'error', onErrorHandler);
                        unbindEvent(img, 'load', onLoadHandler);
                    };
                    var onLoadHandler = function() {
                        // Is element an image
                        if (isImage) {
                            if(!isPicture) {
                                handleSources(ele, src, srcset);
                            }
                        // or background-image
                        } else {
                            ele.style.backgroundImage = 'url("' + src + '")';
                        }
                        itemLoaded(ele, options);
                        unbindEvent(img, 'load', onLoadHandler);
                        unbindEvent(img, 'error', onErrorHandler);
                    };
                    
                    // Picture element
                    if (isPicture) {
                        img = ele; // Image tag inside picture element wont get preloaded
                        each(parent.getElementsByTagName('source'), function(source) {
                            handleSource(source, _attrSrcset, options.srcset);
                        });
                    }
                    bindEvent(img, 'error', onErrorHandler);
                    bindEvent(img, 'load', onLoadHandler);
                    handleSources(img, src, srcset); // Preload

                } else { // An item with src like iframe, unity games, simpel video etc
                    ele.src = src;
                    itemLoaded(ele, options);
                }
            } else {
                // video with child source
                if (equal(ele, 'video')) {
                    each(ele.getElementsByTagName('source'), function(source) {
                        handleSource(source, _attrSrc, options.src);
                    });
                    ele.load();
                    itemLoaded(ele, options);
                } else {
                    if (options.error) options.error(ele, "missing");
                    addClass(ele, options.errorClass);
                }
            }
        }
    }

    function itemLoaded(ele, options) {
        addClass(ele, options.successClass);
        if (options.success) options.success(ele);
        // cleanup markup, remove data source attributes
        removeAttr(ele, options.src);
        removeAttr(ele, options.srcset);
        each(options.breakpoints, function(object) {
            removeAttr(ele, object.src);
        });
    }

    function handleSource(ele, attr, dataAttr) {
        var dataSrc = getAttr(ele, dataAttr);
        if (dataSrc) {
            setAttr(ele, attr, dataSrc);
            removeAttr(ele, dataAttr);
        }
    }

    function handleSources(ele, src, srcset){
        if(srcset) {
            setAttr(ele, _attrSrcset, srcset); //srcset
        }
        ele.src = src; //src 
    }

    function setAttr(ele, attr, value){
        ele.setAttribute(attr, value);
    }

    function getAttr(ele, attr) {
        return ele.getAttribute(attr);
    }

    function removeAttr(ele, attr){
        ele.removeAttribute(attr); 
    }

    function equal(ele, str) {
        return ele.nodeName.toLowerCase() === str;
    }

    function hasClass(ele, className) {
        return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
    }

    function addClass(ele, className) {
        if (!hasClass(ele, className)) {
            ele.className += ' ' + className;
        }
    }

    function toArray(options) {
        var array = [];
        var nodelist = (options.root).querySelectorAll(options.selector);
        for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
        return array;
    }

    function saveViewportOffset(offset) {
        _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
        _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
    }

    function bindEvent(ele, type, fn) {
        if (ele.attachEvent) {
            ele.attachEvent && ele.attachEvent('on' + type, fn);
        } else {
            ele.addEventListener(type, fn, { capture: false, passive: true });
        }
    }

    function unbindEvent(ele, type, fn) {
        if (ele.detachEvent) {
            ele.detachEvent && ele.detachEvent('on' + type, fn);
        } else {
            ele.removeEventListener(type, fn, { capture: false, passive: true });
        }
    }

    function each(object, fn) {
        if (object && fn) {
            var l = object.length;
            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
        }
    }

    function throttle(fn, minDelay, scope) {
        var lastCall = 0;
        return function() {
            var now = +new Date();
            if (now - lastCall < minDelay) {
                return;
            }
            lastCall = now;
            fn.apply(scope, arguments);
        };
    }
});

/*!
 * Paper.js v0.12.11 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2020, Jürg Lehni & Jonathan Puckey
 * http://juerglehni.com/ & https://puckey.studio/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Fri Jun 19 19:14:33 2020 +0200
 *
 ***
 *
 * Straps.js - Class inheritance library with support for bean-style accessors
 *
 * Copyright (c) 2006 - 2020 Jürg Lehni
 * http://juerglehni.com/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * https://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */

var paper = function(self, undefined) {

self = self || require('./node/self.js');
var window = self.window,
	document = self.document;

var Base = new function() {
	var hidden = /^(statics|enumerable|beans|preserve)$/,
		array = [],
		slice = array.slice,
		create = Object.create,
		describe = Object.getOwnPropertyDescriptor,
		define = Object.defineProperty,

		forEach = array.forEach || function(iter, bind) {
			for (var i = 0, l = this.length; i < l; i++) {
				iter.call(bind, this[i], i, this);
			}
		},

		forIn = function(iter, bind) {
			for (var i in this) {
				if (this.hasOwnProperty(i))
					iter.call(bind, this[i], i, this);
			}
		},

		set = Object.assign || function(dst) {
			for (var i = 1, l = arguments.length; i < l; i++) {
				var src = arguments[i];
				for (var key in src) {
					if (src.hasOwnProperty(key))
						dst[key] = src[key];
				}
			}
			return dst;
		},

		each = function(obj, iter, bind) {
			if (obj) {
				var desc = describe(obj, 'length');
				(desc && typeof desc.value === 'number' ? forEach : forIn)
					.call(obj, iter, bind = bind || obj);
			}
			return bind;
		};

	function inject(dest, src, enumerable, beans, preserve) {
		var beansNames = {};

		function field(name, val) {
			val = val || (val = describe(src, name))
					&& (val.get ? val : val.value);
			if (typeof val === 'string' && val[0] === '#')
				val = dest[val.substring(1)] || val;
			var isFunc = typeof val === 'function',
				res = val,
				prev = preserve || isFunc && !val.base
						? (val && val.get ? name in dest : dest[name])
						: null,
				bean;
			if (!preserve || !prev) {
				if (isFunc && prev)
					val.base = prev;
				if (isFunc && beans !== false
						&& (bean = name.match(/^([gs]et|is)(([A-Z])(.*))$/)))
					beansNames[bean[3].toLowerCase() + bean[4]] = bean[2];
				if (!res || isFunc || !res.get || typeof res.get !== 'function'
						|| !Base.isPlainObject(res)) {
					res = { value: res, writable: true };
				}
				if ((describe(dest, name)
						|| { configurable: true }).configurable) {
					res.configurable = true;
					res.enumerable = enumerable != null ? enumerable : !bean;
				}
				define(dest, name, res);
			}
		}
		if (src) {
			for (var name in src) {
				if (src.hasOwnProperty(name) && !hidden.test(name))
					field(name);
			}
			for (var name in beansNames) {
				var part = beansNames[name],
					set = dest['set' + part],
					get = dest['get' + part] || set && dest['is' + part];
				if (get && (beans === true || get.length === 0))
					field(name, { get: get, set: set });
			}
		}
		return dest;
	}

	function Base() {
		for (var i = 0, l = arguments.length; i < l; i++) {
			var src = arguments[i];
			if (src)
				set(this, src);
		}
		return this;
	}

	return inject(Base, {
		inject: function(src) {
			if (src) {
				var statics = src.statics === true ? src : src.statics,
					beans = src.beans,
					preserve = src.preserve;
				if (statics !== src)
					inject(this.prototype, src, src.enumerable, beans, preserve);
				inject(this, statics, null, beans, preserve);
			}
			for (var i = 1, l = arguments.length; i < l; i++)
				this.inject(arguments[i]);
			return this;
		},

		extend: function() {
			var base = this,
				ctor,
				proto;
			for (var i = 0, obj, l = arguments.length;
					i < l && !(ctor && proto); i++) {
				obj = arguments[i];
				ctor = ctor || obj.initialize;
				proto = proto || obj.prototype;
			}
			ctor = ctor || function() {
				base.apply(this, arguments);
			};
			proto = ctor.prototype = proto || create(this.prototype);
			define(proto, 'constructor',
					{ value: ctor, writable: true, configurable: true });
			inject(ctor, this);
			if (arguments.length)
				this.inject.apply(ctor, arguments);
			ctor.base = base;
			return ctor;
		}
	}).inject({
		enumerable: false,

		initialize: Base,

		set: Base,

		inject: function() {
			for (var i = 0, l = arguments.length; i < l; i++) {
				var src = arguments[i];
				if (src) {
					inject(this, src, src.enumerable, src.beans, src.preserve);
				}
			}
			return this;
		},

		extend: function() {
			var res = create(this);
			return res.inject.apply(res, arguments);
		},

		each: function(iter, bind) {
			return each(this, iter, bind);
		},

		clone: function() {
			return new this.constructor(this);
		},

		statics: {
			set: set,
			each: each,
			create: create,
			define: define,
			describe: describe,

			clone: function(obj) {
				return set(new obj.constructor(), obj);
			},

			isPlainObject: function(obj) {
				var ctor = obj != null && obj.constructor;
				return ctor && (ctor === Object || ctor === Base
						|| ctor.name === 'Object');
			},

			pick: function(a, b) {
				return a !== undefined ? a : b;
			},

			slice: function(list, begin, end) {
				return slice.call(list, begin, end);
			}
		}
	});
};

if (typeof module !== 'undefined')
	module.exports = Base;

Base.inject({
	enumerable: false,

	toString: function() {
		return this._id != null
			?  (this._class || 'Object') + (this._name
				? " '" + this._name + "'"
				: ' @' + this._id)
			: '{ ' + Base.each(this, function(value, key) {
				if (!/^_/.test(key)) {
					var type = typeof value;
					this.push(key + ': ' + (type === 'number'
							? Formatter.instance.number(value)
							: type === 'string' ? "'" + value + "'" : value));
				}
			}, []).join(', ') + ' }';
	},

	getClassName: function() {
		return this._class || '';
	},

	importJSON: function(json) {
		return Base.importJSON(json, this);
	},

	exportJSON: function(options) {
		return Base.exportJSON(this, options);
	},

	toJSON: function() {
		return Base.serialize(this);
	},

	set: function(props, exclude) {
		if (props)
			Base.filter(this, props, exclude, this._prioritize);
		return this;
	}
}, {

beans: false,
statics: {
	exports: {},

	extend: function extend() {
		var res = extend.base.apply(this, arguments),
			name = res.prototype._class;
		if (name && !Base.exports[name])
			Base.exports[name] = res;
		return res;
	},

	equals: function(obj1, obj2) {
		if (obj1 === obj2)
			return true;
		if (obj1 && obj1.equals)
			return obj1.equals(obj2);
		if (obj2 && obj2.equals)
			return obj2.equals(obj1);
		if (obj1 && obj2
				&& typeof obj1 === 'object' && typeof obj2 === 'object') {
			if (Array.isArray(obj1) && Array.isArray(obj2)) {
				var length = obj1.length;
				if (length !== obj2.length)
					return false;
				while (length--) {
					if (!Base.equals(obj1[length], obj2[length]))
						return false;
				}
			} else {
				var keys = Object.keys(obj1),
					length = keys.length;
				if (length !== Object.keys(obj2).length)
					return false;
				while (length--) {
					var key = keys[length];
					if (!(obj2.hasOwnProperty(key)
							&& Base.equals(obj1[key], obj2[key])))
						return false;
				}
			}
			return true;
		}
		return false;
	},

	read: function(list, start, options, amount) {
		if (this === Base) {
			var value = this.peek(list, start);
			list.__index++;
			return value;
		}
		var proto = this.prototype,
			readIndex = proto._readIndex,
			begin = start || readIndex && list.__index || 0,
			length = list.length,
			obj = list[begin];
		amount = amount || length - begin;
		if (obj instanceof this
			|| options && options.readNull && obj == null && amount <= 1) {
			if (readIndex)
				list.__index = begin + 1;
			return obj && options && options.clone ? obj.clone() : obj;
		}
		obj = Base.create(proto);
		if (readIndex)
			obj.__read = true;
		obj = obj.initialize.apply(obj, begin > 0 || begin + amount < length
				? Base.slice(list, begin, begin + amount)
				: list) || obj;
		if (readIndex) {
			list.__index = begin + obj.__read;
			var filtered = obj.__filtered;
			if (filtered) {
				list.__filtered = filtered;
				obj.__filtered = undefined;
			}
			obj.__read = undefined;
		}
		return obj;
	},

	peek: function(list, start) {
		return list[list.__index = start || list.__index || 0];
	},

	remain: function(list) {
		return list.length - (list.__index || 0);
	},

	readList: function(list, start, options, amount) {
		var res = [],
			entry,
			begin = start || 0,
			end = amount ? begin + amount : list.length;
		for (var i = begin; i < end; i++) {
			res.push(Array.isArray(entry = list[i])
					? this.read(entry, 0, options)
					: this.read(list, i, options, 1));
		}
		return res;
	},

	readNamed: function(list, name, start, options, amount) {
		var value = this.getNamed(list, name),
			hasValue = value !== undefined;
		if (hasValue) {
			var filtered = list.__filtered;
			if (!filtered) {
				var source = this.getSource(list);
				filtered = list.__filtered = Base.create(source);
				filtered.__unfiltered = source;
			}
			filtered[name] = undefined;
		}
		return this.read(hasValue ? [value] : list, start, options, amount);
	},

	readSupported: function(list, dest) {
		var source = this.getSource(list),
			that = this,
			read = false;
		if (source) {
			Object.keys(source).forEach(function(key) {
				if (key in dest) {
					var value = that.readNamed(list, key);
					if (value !== undefined) {
						dest[key] = value;
					}
					read = true;
				}
			});
		}
		return read;
	},

	getSource: function(list) {
		var source = list.__source;
		if (source === undefined) {
			var arg = list.length === 1 && list[0];
			source = list.__source = arg && Base.isPlainObject(arg)
				? arg : null;
		}
		return source;
	},

	getNamed: function(list, name) {
		var source = this.getSource(list);
		if (source) {
			return name ? source[name] : list.__filtered || source;
		}
	},

	hasNamed: function(list, name) {
		return !!this.getNamed(list, name);
	},

	filter: function(dest, source, exclude, prioritize) {
		var processed;

		function handleKey(key) {
			if (!(exclude && key in exclude) &&
				!(processed && key in processed)) {
				var value = source[key];
				if (value !== undefined)
					dest[key] = value;
			}
		}

		if (prioritize) {
			var keys = {};
			for (var i = 0, key, l = prioritize.length; i < l; i++) {
				if ((key = prioritize[i]) in source) {
					handleKey(key);
					keys[key] = true;
				}
			}
			processed = keys;
		}

		Object.keys(source.__unfiltered || source).forEach(handleKey);
		return dest;
	},

	isPlainValue: function(obj, asString) {
		return Base.isPlainObject(obj) || Array.isArray(obj)
				|| asString && typeof obj === 'string';
	},

	serialize: function(obj, options, compact, dictionary) {
		options = options || {};

		var isRoot = !dictionary,
			res;
		if (isRoot) {
			options.formatter = new Formatter(options.precision);
			dictionary = {
				length: 0,
				definitions: {},
				references: {},
				add: function(item, create) {
					var id = '#' + item._id,
						ref = this.references[id];
					if (!ref) {
						this.length++;
						var res = create.call(item),
							name = item._class;
						if (name && res[0] !== name)
							res.unshift(name);
						this.definitions[id] = res;
						ref = this.references[id] = [id];
					}
					return ref;
				}
			};
		}
		if (obj && obj._serialize) {
			res = obj._serialize(options, dictionary);
			var name = obj._class;
			if (name && !obj._compactSerialize && (isRoot || !compact)
					&& res[0] !== name) {
				res.unshift(name);
			}
		} else if (Array.isArray(obj)) {
			res = [];
			for (var i = 0, l = obj.length; i < l; i++)
				res[i] = Base.serialize(obj[i], options, compact, dictionary);
		} else if (Base.isPlainObject(obj)) {
			res = {};
			var keys = Object.keys(obj);
			for (var i = 0, l = keys.length; i < l; i++) {
				var key = keys[i];
				res[key] = Base.serialize(obj[key], options, compact,
						dictionary);
			}
		} else if (typeof obj === 'number') {
			res = options.formatter.number(obj, options.precision);
		} else {
			res = obj;
		}
		return isRoot && dictionary.length > 0
				? [['dictionary', dictionary.definitions], res]
				: res;
	},

	deserialize: function(json, create, _data, _setDictionary, _isRoot) {
		var res = json,
			isFirst = !_data,
			hasDictionary = isFirst && json && json.length
				&& json[0][0] === 'dictionary';
		_data = _data || {};
		if (Array.isArray(json)) {
			var type = json[0],
				isDictionary = type === 'dictionary';
			if (json.length == 1 && /^#/.test(type)) {
				return _data.dictionary[type];
			}
			type = Base.exports[type];
			res = [];
			for (var i = type ? 1 : 0, l = json.length; i < l; i++) {
				res.push(Base.deserialize(json[i], create, _data,
						isDictionary, hasDictionary));
			}
			if (type) {
				var args = res;
				if (create) {
					res = create(type, args, isFirst || _isRoot);
				} else {
					res = new type(args);
				}
			}
		} else if (Base.isPlainObject(json)) {
			res = {};
			if (_setDictionary)
				_data.dictionary = res;
			for (var key in json)
				res[key] = Base.deserialize(json[key], create, _data);
		}
		return hasDictionary ? res[1] : res;
	},

	exportJSON: function(obj, options) {
		var json = Base.serialize(obj, options);
		return options && options.asString == false
				? json
				: JSON.stringify(json);
	},

	importJSON: function(json, target) {
		return Base.deserialize(
				typeof json === 'string' ? JSON.parse(json) : json,
				function(ctor, args, isRoot) {
					var useTarget = isRoot && target
							&& target.constructor === ctor,
						obj = useTarget ? target
							: Base.create(ctor.prototype);
					if (args.length === 1 && obj instanceof Item
							&& (useTarget || !(obj instanceof Layer))) {
						var arg = args[0];
						if (Base.isPlainObject(arg)) {
							arg.insert = false;
							if (useTarget) {
								args = args.concat([{ insert: true }]);
							}
						}
					}
					(useTarget ? obj.set : ctor).apply(obj, args);
					if (useTarget)
						target = null;
					return obj;
				});
	},

	push: function(list, items) {
		var itemsLength = items.length;
		if (itemsLength < 4096) {
			list.push.apply(list, items);
		} else {
			var startLength = list.length;
			list.length += itemsLength;
			for (var i = 0; i < itemsLength; i++) {
				list[startLength + i] = items[i];
			}
		}
		return list;
	},

	splice: function(list, items, index, remove) {
		var amount = items && items.length,
			append = index === undefined;
		index = append ? list.length : index;
		if (index > list.length)
			index = list.length;
		for (var i = 0; i < amount; i++)
			items[i]._index = index + i;
		if (append) {
			Base.push(list, items);
			return [];
		} else {
			var args = [index, remove];
			if (items)
				Base.push(args, items);
			var removed = list.splice.apply(list, args);
			for (var i = 0, l = removed.length; i < l; i++)
				removed[i]._index = undefined;
			for (var i = index + amount, l = list.length; i < l; i++)
				list[i]._index = i;
			return removed;
		}
	},

	capitalize: function(str) {
		return str.replace(/\b[a-z]/g, function(match) {
			return match.toUpperCase();
		});
	},

	camelize: function(str) {
		return str.replace(/-(.)/g, function(match, chr) {
			return chr.toUpperCase();
		});
	},

	hyphenate: function(str) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
}});

var Emitter = {
	on: function(type, func) {
		if (typeof type !== 'string') {
			Base.each(type, function(value, key) {
				this.on(key, value);
			}, this);
		} else {
			var types = this._eventTypes,
				entry = types && types[type],
				handlers = this._callbacks = this._callbacks || {};
			handlers = handlers[type] = handlers[type] || [];
			if (handlers.indexOf(func) === -1) {
				handlers.push(func);
				if (entry && entry.install && handlers.length === 1)
					entry.install.call(this, type);
			}
		}
		return this;
	},

	off: function(type, func) {
		if (typeof type !== 'string') {
			Base.each(type, function(value, key) {
				this.off(key, value);
			}, this);
			return;
		}
		var types = this._eventTypes,
			entry = types && types[type],
			handlers = this._callbacks && this._callbacks[type],
			index;
		if (handlers) {
			if (!func || (index = handlers.indexOf(func)) !== -1
					&& handlers.length === 1) {
				if (entry && entry.uninstall)
					entry.uninstall.call(this, type);
				delete this._callbacks[type];
			} else if (index !== -1) {
				handlers.splice(index, 1);
			}
		}
		return this;
	},

	once: function(type, func) {
		return this.on(type, function handler() {
			func.apply(this, arguments);
			this.off(type, handler);
		});
	},

	emit: function(type, event) {
		var handlers = this._callbacks && this._callbacks[type];
		if (!handlers)
			return false;
		var args = Base.slice(arguments, 1),
			setTarget = event && event.target && !event.currentTarget;
		handlers = handlers.slice();
		if (setTarget)
			event.currentTarget = this;
		for (var i = 0, l = handlers.length; i < l; i++) {
			if (handlers[i].apply(this, args) == false) {
				if (event && event.stop)
					event.stop();
				break;
		   }
		}
		if (setTarget)
			delete event.currentTarget;
		return true;
	},

	responds: function(type) {
		return !!(this._callbacks && this._callbacks[type]);
	},

	attach: '#on',
	detach: '#off',
	fire: '#emit',

	_installEvents: function(install) {
		var types = this._eventTypes,
			handlers = this._callbacks,
			key = install ? 'install' : 'uninstall';
		if (types) {
			for (var type in handlers) {
				if (handlers[type].length > 0) {
					var entry = types[type],
						func = entry && entry[key];
					if (func)
						func.call(this, type);
				}
			}
		}
	},

	statics: {
		inject: function inject(src) {
			var events = src._events;
			if (events) {
				var types = {};
				Base.each(events, function(entry, key) {
					var isString = typeof entry === 'string',
						name = isString ? entry : key,
						part = Base.capitalize(name),
						type = name.substring(2).toLowerCase();
					types[type] = isString ? {} : entry;
					name = '_' + name;
					src['get' + part] = function() {
						return this[name];
					};
					src['set' + part] = function(func) {
						var prev = this[name];
						if (prev)
							this.off(type, prev);
						if (func)
							this.on(type, func);
						this[name] = func;
					};
				});
				src._eventTypes = types;
			}
			return inject.base.apply(this, arguments);
		}
	}
};

var PaperScope = Base.extend({
	_class: 'PaperScope',

	initialize: function PaperScope() {
		paper = this;
		this.settings = new Base({
			applyMatrix: true,
			insertItems: true,
			handleSize: 4,
			hitTolerance: 0
		});
		this.project = null;
		this.projects = [];
		this.tools = [];
		this._id = PaperScope._id++;
		PaperScope._scopes[this._id] = this;
		var proto = PaperScope.prototype;
		if (!this.support) {
			var ctx = CanvasProvider.getContext(1, 1) || {};
			proto.support = {
				nativeDash: 'setLineDash' in ctx || 'mozDash' in ctx,
				nativeBlendModes: BlendMode.nativeModes
			};
			CanvasProvider.release(ctx);
		}
		if (!this.agent) {
			var user = self.navigator.userAgent.toLowerCase(),
				os = (/(darwin|win|mac|linux|freebsd|sunos)/.exec(user)||[])[0],
				platform = os === 'darwin' ? 'mac' : os,
				agent = proto.agent = proto.browser = { platform: platform };
			if (platform)
				agent[platform] = true;
			user.replace(
				/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node|jsdom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g,
				function(match, n, v1, v2, rv) {
					if (!agent.chrome) {
						var v = n === 'opera' ? v2 :
								/^(node|trident)$/.test(n) ? rv : v1;
						agent.version = v;
						agent.versionNumber = parseFloat(v);
						n = { trident: 'msie', jsdom: 'node' }[n] || n;
						agent.name = n;
						agent[n] = true;
					}
				}
			);
			if (agent.chrome)
				delete agent.webkit;
			if (agent.atom)
				delete agent.chrome;
		}
	},

	version: "0.12.11",

	getView: function() {
		var project = this.project;
		return project && project._view;
	},

	getPaper: function() {
		return this;
	},

	execute: function(code, options) {
	},

	install: function(scope) {
		var that = this;
		Base.each(['project', 'view', 'tool'], function(key) {
			Base.define(scope, key, {
				configurable: true,
				get: function() {
					return that[key];
				}
			});
		});
		for (var key in this)
			if (!/^_/.test(key) && this[key])
				scope[key] = this[key];
	},

	setup: function(element) {
		paper = this;
		this.project = new Project(element);
		return this;
	},

	createCanvas: function(width, height) {
		return CanvasProvider.getCanvas(width, height);
	},

	activate: function() {
		paper = this;
	},

	clear: function() {
		var projects = this.projects,
			tools = this.tools;
		for (var i = projects.length - 1; i >= 0; i--)
			projects[i].remove();
		for (var i = tools.length - 1; i >= 0; i--)
			tools[i].remove();
	},

	remove: function() {
		this.clear();
		delete PaperScope._scopes[this._id];
	},

	statics: new function() {
		function handleAttribute(name) {
			name += 'Attribute';
			return function(el, attr) {
				return el[name](attr) || el[name]('data-paper-' + attr);
			};
		}

		return {
			_scopes: {},
			_id: 0,

			get: function(id) {
				return this._scopes[id] || null;
			},

			getAttribute: handleAttribute('get'),
			hasAttribute: handleAttribute('has')
		};
	}
});

var PaperScopeItem = Base.extend(Emitter, {

	initialize: function(activate) {
		this._scope = paper;
		this._index = this._scope[this._list].push(this) - 1;
		if (activate || !this._scope[this._reference])
			this.activate();
	},

	activate: function() {
		if (!this._scope)
			return false;
		var prev = this._scope[this._reference];
		if (prev && prev !== this)
			prev.emit('deactivate');
		this._scope[this._reference] = this;
		this.emit('activate', prev);
		return true;
	},

	isActive: function() {
		return this._scope[this._reference] === this;
	},

	remove: function() {
		if (this._index == null)
			return false;
		Base.splice(this._scope[this._list], null, this._index, 1);
		if (this._scope[this._reference] == this)
			this._scope[this._reference] = null;
		this._scope = null;
		return true;
	},

	getView: function() {
		return this._scope.getView();
	}
});

var CollisionDetection = {
	findItemBoundsCollisions: function(items1, items2, tolerance) {
		function getBounds(items) {
			var bounds = new Array(items.length);
			for (var i = 0; i < items.length; i++) {
				var rect = items[i].getBounds();
				bounds[i] = [rect.left, rect.top, rect.right, rect.bottom];
			}
			return bounds;
		}

		var bounds1 = getBounds(items1),
			bounds2 = !items2 || items2 === items1
				? bounds1
				: getBounds(items2);
		return this.findBoundsCollisions(bounds1, bounds2, tolerance || 0);
	},

	findCurveBoundsCollisions: function(curves1, curves2, tolerance, bothAxis) {
		function getBounds(curves) {
			var min = Math.min,
				max = Math.max,
				bounds = new Array(curves.length);
			for (var i = 0; i < curves.length; i++) {
				var v = curves[i];
				bounds[i] = [
					min(v[0], v[2], v[4], v[6]),
					min(v[1], v[3], v[5], v[7]),
					max(v[0], v[2], v[4], v[6]),
					max(v[1], v[3], v[5], v[7])
				];
			}
			return bounds;
		}

		var bounds1 = getBounds(curves1),
			bounds2 = !curves2 || curves2 === curves1
				? bounds1
				: getBounds(curves2);
		if (bothAxis) {
			var hor = this.findBoundsCollisions(
					bounds1, bounds2, tolerance || 0, false, true),
				ver = this.findBoundsCollisions(
					bounds1, bounds2, tolerance || 0, true, true),
				list = [];
			for (var i = 0, l = hor.length; i < l; i++) {
				list[i] = { hor: hor[i], ver: ver[i] };
			}
			return list;
		}
		return this.findBoundsCollisions(bounds1, bounds2, tolerance || 0);
	},

	findBoundsCollisions: function(boundsA, boundsB, tolerance,
		sweepVertical, onlySweepAxisCollisions) {
		var self = !boundsB || boundsA === boundsB,
			allBounds = self ? boundsA : boundsA.concat(boundsB),
			lengthA = boundsA.length,
			lengthAll = allBounds.length;

		function binarySearch(indices, coord, value) {
			var lo = 0,
				hi = indices.length;
			while (lo < hi) {
				var mid = (hi + lo) >>> 1;
				if (allBounds[indices[mid]][coord] < value) {
					lo = mid + 1;
				} else {
					hi = mid;
				}
			}
			return lo - 1;
		}

		var pri0 = sweepVertical ? 1 : 0,
			pri1 = pri0 + 2,
			sec0 = sweepVertical ? 0 : 1,
			sec1 = sec0 + 2;
		var allIndicesByPri0 = new Array(lengthAll);
		for (var i = 0; i < lengthAll; i++) {
			allIndicesByPri0[i] = i;
		}
		allIndicesByPri0.sort(function(i1, i2) {
			return allBounds[i1][pri0] - allBounds[i2][pri0];
		});
		var activeIndicesByPri1 = [],
			allCollisions = new Array(lengthA);
		for (var i = 0; i < lengthAll; i++) {
			var curIndex = allIndicesByPri0[i],
				curBounds = allBounds[curIndex],
				origIndex = self ? curIndex : curIndex - lengthA,
				isCurrentA = curIndex < lengthA,
				isCurrentB = self || !isCurrentA,
				curCollisions = isCurrentA ? [] : null;
			if (activeIndicesByPri1.length) {
				var pruneCount = binarySearch(activeIndicesByPri1, pri1,
						curBounds[pri0] - tolerance) + 1;
				activeIndicesByPri1.splice(0, pruneCount);
				if (self && onlySweepAxisCollisions) {
					curCollisions = curCollisions.concat(activeIndicesByPri1);
					for (var j = 0; j < activeIndicesByPri1.length; j++) {
						var activeIndex = activeIndicesByPri1[j];
						allCollisions[activeIndex].push(origIndex);
					}
				} else {
					var curSec1 = curBounds[sec1],
						curSec0 = curBounds[sec0];
					for (var j = 0; j < activeIndicesByPri1.length; j++) {
						var activeIndex = activeIndicesByPri1[j],
							activeBounds = allBounds[activeIndex],
							isActiveA = activeIndex < lengthA,
							isActiveB = self || activeIndex >= lengthA;

						if (
							onlySweepAxisCollisions ||
							(
								isCurrentA && isActiveB ||
								isCurrentB && isActiveA
							) && (
								curSec1 >= activeBounds[sec0] - tolerance &&
								curSec0 <= activeBounds[sec1] + tolerance
							)
						) {
							if (isCurrentA && isActiveB) {
								curCollisions.push(
									self ? activeIndex : activeIndex - lengthA);
							}
							if (isCurrentB && isActiveA) {
								allCollisions[activeIndex].push(origIndex);
							}
						}
					}
				}
			}
			if (isCurrentA) {
				if (boundsA === boundsB) {
					curCollisions.push(curIndex);
				}
				allCollisions[curIndex] = curCollisions;
			}
			if (activeIndicesByPri1.length) {
				var curPri1 = curBounds[pri1],
					index = binarySearch(activeIndicesByPri1, pri1, curPri1);
				activeIndicesByPri1.splice(index + 1, 0, curIndex);
			} else {
				activeIndicesByPri1.push(curIndex);
			}
		}
		for (var i = 0; i < allCollisions.length; i++) {
			var collisions = allCollisions[i];
			if (collisions) {
				collisions.sort(function(i1, i2) { return i1 - i2; });
			}
		}
		return allCollisions;
	}
};

var Formatter = Base.extend({
	initialize: function(precision) {
		this.precision = Base.pick(precision, 5);
		this.multiplier = Math.pow(10, this.precision);
	},

	number: function(val) {
		return this.precision < 16
				? Math.round(val * this.multiplier) / this.multiplier : val;
	},

	pair: function(val1, val2, separator) {
		return this.number(val1) + (separator || ',') + this.number(val2);
	},

	point: function(val, separator) {
		return this.number(val.x) + (separator || ',') + this.number(val.y);
	},

	size: function(val, separator) {
		return this.number(val.width) + (separator || ',')
				+ this.number(val.height);
	},

	rectangle: function(val, separator) {
		return this.point(val, separator) + (separator || ',')
				+ this.size(val, separator);
	}
});

Formatter.instance = new Formatter();

var Numerical = new function() {

	var abscissas = [
		[  0.5773502691896257645091488],
		[0,0.7745966692414833770358531],
		[  0.3399810435848562648026658,0.8611363115940525752239465],
		[0,0.5384693101056830910363144,0.9061798459386639927976269],
		[  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
		[0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
		[  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
		[0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
		[  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
		[0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
		[  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
		[0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
		[  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
		[0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
		[  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
	];

	var weights = [
		[1],
		[0.8888888888888888888888889,0.5555555555555555555555556],
		[0.6521451548625461426269361,0.3478548451374538573730639],
		[0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
		[0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
		[0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
		[0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
		[0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
		[0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
		[0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
		[0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
		[0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
		[0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
		[0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
		[0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
	];

	var abs = Math.abs,
		sqrt = Math.sqrt,
		pow = Math.pow,
		log2 = Math.log2 || function(x) {
			return Math.log(x) * Math.LOG2E;
		},
		EPSILON = 1e-12,
		MACHINE_EPSILON = 1.12e-16;

	function clamp(value, min, max) {
		return value < min ? min : value > max ? max : value;
	}

	function getDiscriminant(a, b, c) {
		function split(v) {
			var x = v * 134217729,
				y = v - x,
				hi = y + x,
				lo = v - hi;
			return [hi, lo];
		}

		var D = b * b - a * c,
			E = b * b + a * c;
		if (abs(D) * 3 < E) {
			var ad = split(a),
				bd = split(b),
				cd = split(c),
				p = b * b,
				dp = (bd[0] * bd[0] - p + 2 * bd[0] * bd[1]) + bd[1] * bd[1],
				q = a * c,
				dq = (ad[0] * cd[0] - q + ad[0] * cd[1] + ad[1] * cd[0])
						+ ad[1] * cd[1];
			D = (p - q) + (dp - dq);
		}
		return D;
	}

	function getNormalizationFactor() {
		var norm = Math.max.apply(Math, arguments);
		return norm && (norm < 1e-8 || norm > 1e8)
				? pow(2, -Math.round(log2(norm)))
				: 0;
	}

	return {
		EPSILON: EPSILON,
		MACHINE_EPSILON: MACHINE_EPSILON,
		CURVETIME_EPSILON: 1e-8,
		GEOMETRIC_EPSILON: 1e-7,
		TRIGONOMETRIC_EPSILON: 1e-8,
		KAPPA: 4 * (sqrt(2) - 1) / 3,

		isZero: function(val) {
			return val >= -EPSILON && val <= EPSILON;
		},

		isMachineZero: function(val) {
			return val >= -MACHINE_EPSILON && val <= MACHINE_EPSILON;
		},

		clamp: clamp,

		integrate: function(f, a, b, n) {
			var x = abscissas[n - 2],
				w = weights[n - 2],
				A = (b - a) * 0.5,
				B = A + a,
				i = 0,
				m = (n + 1) >> 1,
				sum = n & 1 ? w[i++] * f(B) : 0;
			while (i < m) {
				var Ax = A * x[i];
				sum += w[i++] * (f(B + Ax) + f(B - Ax));
			}
			return A * sum;
		},

		findRoot: function(f, df, x, a, b, n, tolerance) {
			for (var i = 0; i < n; i++) {
				var fx = f(x),
					dx = fx / df(x),
					nx = x - dx;
				if (abs(dx) < tolerance) {
					x = nx;
					break;
				}
				if (fx > 0) {
					b = x;
					x = nx <= a ? (a + b) * 0.5 : nx;
				} else {
					a = x;
					x = nx >= b ? (a + b) * 0.5 : nx;
				}
			}
			return clamp(x, a, b);
		},

		solveQuadratic: function(a, b, c, roots, min, max) {
			var x1, x2 = Infinity;
			if (abs(a) < EPSILON) {
				if (abs(b) < EPSILON)
					return abs(c) < EPSILON ? -1 : 0;
				x1 = -c / b;
			} else {
				b *= -0.5;
				var D = getDiscriminant(a, b, c);
				if (D && abs(D) < MACHINE_EPSILON) {
					var f = getNormalizationFactor(abs(a), abs(b), abs(c));
					if (f) {
						a *= f;
						b *= f;
						c *= f;
						D = getDiscriminant(a, b, c);
					}
				}
				if (D >= -MACHINE_EPSILON) {
					var Q = D < 0 ? 0 : sqrt(D),
						R = b + (b < 0 ? -Q : Q);
					if (R === 0) {
						x1 = c / a;
						x2 = -x1;
					} else {
						x1 = R / a;
						x2 = c / R;
					}
				}
			}
			var count = 0,
				boundless = min == null,
				minB = min - EPSILON,
				maxB = max + EPSILON;
			if (isFinite(x1) && (boundless || x1 > minB && x1 < maxB))
				roots[count++] = boundless ? x1 : clamp(x1, min, max);
			if (x2 !== x1
					&& isFinite(x2) && (boundless || x2 > minB && x2 < maxB))
				roots[count++] = boundless ? x2 : clamp(x2, min, max);
			return count;
		},

		solveCubic: function(a, b, c, d, roots, min, max) {
			var f = getNormalizationFactor(abs(a), abs(b), abs(c), abs(d)),
				x, b1, c2, qd, q;
			if (f) {
				a *= f;
				b *= f;
				c *= f;
				d *= f;
			}

			function evaluate(x0) {
				x = x0;
				var tmp = a * x;
				b1 = tmp + b;
				c2 = b1 * x + c;
				qd = (tmp + b1) * x + c2;
				q = c2 * x + d;
			}

			if (abs(a) < EPSILON) {
				a = b;
				b1 = c;
				c2 = d;
				x = Infinity;
			} else if (abs(d) < EPSILON) {
				b1 = b;
				c2 = c;
				x = 0;
			} else {
				evaluate(-(b / a) / 3);
				var t = q / a,
					r = pow(abs(t), 1/3),
					s = t < 0 ? -1 : 1,
					td = -qd / a,
					rd = td > 0 ? 1.324717957244746 * Math.max(r, sqrt(td)) : r,
					x0 = x - s * rd;
				if (x0 !== x) {
					do {
						evaluate(x0);
						x0 = qd === 0 ? x : x - q / qd / (1 + MACHINE_EPSILON);
					} while (s * x0 > s * x);
					if (abs(a) * x * x > abs(d / x)) {
						c2 = -d / x;
						b1 = (c2 - c) / x;
					}
				}
			}
			var count = Numerical.solveQuadratic(a, b1, c2, roots, min, max),
				boundless = min == null;
			if (isFinite(x) && (count === 0
					|| count > 0 && x !== roots[0] && x !== roots[1])
					&& (boundless || x > min - EPSILON && x < max + EPSILON))
				roots[count++] = boundless ? x : clamp(x, min, max);
			return count;
		}
	};
};

var UID = {
	_id: 1,
	_pools: {},

	get: function(name) {
		if (name) {
			var pool = this._pools[name];
			if (!pool)
				pool = this._pools[name] = { _id: 1 };
			return pool._id++;
		} else {
			return this._id++;
		}
	}
};

var Point = Base.extend({
	_class: 'Point',
	_readIndex: true,

	initialize: function Point(arg0, arg1) {
		var type = typeof arg0,
			reading = this.__read,
			read = 0;
		if (type === 'number') {
			var hasY = typeof arg1 === 'number';
			this._set(arg0, hasY ? arg1 : arg0);
			if (reading)
				read = hasY ? 2 : 1;
		} else if (type === 'undefined' || arg0 === null) {
			this._set(0, 0);
			if (reading)
				read = arg0 === null ? 1 : 0;
		} else {
			var obj = type === 'string' ? arg0.split(/[\s,]+/) || [] : arg0;
			read = 1;
			if (Array.isArray(obj)) {
				this._set(+obj[0], +(obj.length > 1 ? obj[1] : obj[0]));
			} else if ('x' in obj) {
				this._set(obj.x || 0, obj.y || 0);
			} else if ('width' in obj) {
				this._set(obj.width || 0, obj.height || 0);
			} else if ('angle' in obj) {
				this._set(obj.length || 0, 0);
				this.setAngle(obj.angle || 0);
			} else {
				this._set(0, 0);
				read = 0;
			}
		}
		if (reading)
			this.__read = read;
		return this;
	},

	set: '#initialize',

	_set: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},

	equals: function(point) {
		return this === point || point
				&& (this.x === point.x && this.y === point.y
					|| Array.isArray(point)
						&& this.x === point[0] && this.y === point[1])
				|| false;
	},

	clone: function() {
		return new Point(this.x, this.y);
	},

	toString: function() {
		var f = Formatter.instance;
		return '{ x: ' + f.number(this.x) + ', y: ' + f.number(this.y) + ' }';
	},

	_serialize: function(options) {
		var f = options.formatter;
		return [f.number(this.x), f.number(this.y)];
	},

	getLength: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	setLength: function(length) {
		if (this.isZero()) {
			var angle = this._angle || 0;
			this._set(
				Math.cos(angle) * length,
				Math.sin(angle) * length
			);
		} else {
			var scale = length / this.getLength();
			if (Numerical.isZero(scale))
				this.getAngle();
			this._set(
				this.x * scale,
				this.y * scale
			);
		}
	},
	getAngle: function() {
		return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
	},

	setAngle: function(angle) {
		this.setAngleInRadians.call(this, angle * Math.PI / 180);
	},

	getAngleInDegrees: '#getAngle',
	setAngleInDegrees: '#setAngle',

	getAngleInRadians: function() {
		if (!arguments.length) {
			return this.isZero()
					? this._angle || 0
					: this._angle = Math.atan2(this.y, this.x);
		} else {
			var point = Point.read(arguments),
				div = this.getLength() * point.getLength();
			if (Numerical.isZero(div)) {
				return NaN;
			} else {
				var a = this.dot(point) / div;
				return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
			}
		}
	},

	setAngleInRadians: function(angle) {
		this._angle = angle;
		if (!this.isZero()) {
			var length = this.getLength();
			this._set(
				Math.cos(angle) * length,
				Math.sin(angle) * length
			);
		}
	},

	getQuadrant: function() {
		return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
	}
}, {
	beans: false,

	getDirectedAngle: function() {
		var point = Point.read(arguments);
		return Math.atan2(this.cross(point), this.dot(point)) * 180 / Math.PI;
	},

	getDistance: function() {
		var args = arguments,
			point = Point.read(args),
			x = point.x - this.x,
			y = point.y - this.y,
			d = x * x + y * y,
			squared = Base.read(args);
		return squared ? d : Math.sqrt(d);
	},

	normalize: function(length) {
		if (length === undefined)
			length = 1;
		var current = this.getLength(),
			scale = current !== 0 ? length / current : 0,
			point = new Point(this.x * scale, this.y * scale);
		if (scale >= 0)
			point._angle = this._angle;
		return point;
	},

	rotate: function(angle, center) {
		if (angle === 0)
			return this.clone();
		angle = angle * Math.PI / 180;
		var point = center ? this.subtract(center) : this,
			sin = Math.sin(angle),
			cos = Math.cos(angle);
		point = new Point(
			point.x * cos - point.y * sin,
			point.x * sin + point.y * cos
		);
		return center ? point.add(center) : point;
	},

	transform: function(matrix) {
		return matrix ? matrix._transformPoint(this) : this;
	},

	add: function() {
		var point = Point.read(arguments);
		return new Point(this.x + point.x, this.y + point.y);
	},

	subtract: function() {
		var point = Point.read(arguments);
		return new Point(this.x - point.x, this.y - point.y);
	},

	multiply: function() {
		var point = Point.read(arguments);
		return new Point(this.x * point.x, this.y * point.y);
	},

	divide: function() {
		var point = Point.read(arguments);
		return new Point(this.x / point.x, this.y / point.y);
	},

	modulo: function() {
		var point = Point.read(arguments);
		return new Point(this.x % point.x, this.y % point.y);
	},

	negate: function() {
		return new Point(-this.x, -this.y);
	},

	isInside: function() {
		return Rectangle.read(arguments).contains(this);
	},

	isClose: function() {
		var args = arguments,
			point = Point.read(args),
			tolerance = Base.read(args);
		return this.getDistance(point) <= tolerance;
	},

	isCollinear: function() {
		var point = Point.read(arguments);
		return Point.isCollinear(this.x, this.y, point.x, point.y);
	},

	isColinear: '#isCollinear',

	isOrthogonal: function() {
		var point = Point.read(arguments);
		return Point.isOrthogonal(this.x, this.y, point.x, point.y);
	},

	isZero: function() {
		var isZero = Numerical.isZero;
		return isZero(this.x) && isZero(this.y);
	},

	isNaN: function() {
		return isNaN(this.x) || isNaN(this.y);
	},

	isInQuadrant: function(q) {
		return this.x * (q > 1 && q < 4 ? -1 : 1) >= 0
			&& this.y * (q > 2 ? -1 : 1) >= 0;
	},

	dot: function() {
		var point = Point.read(arguments);
		return this.x * point.x + this.y * point.y;
	},

	cross: function() {
		var point = Point.read(arguments);
		return this.x * point.y - this.y * point.x;
	},

	project: function() {
		var point = Point.read(arguments),
			scale = point.isZero() ? 0 : this.dot(point) / point.dot(point);
		return new Point(
			point.x * scale,
			point.y * scale
		);
	},

	statics: {
		min: function() {
			var args = arguments,
				point1 = Point.read(args),
				point2 = Point.read(args);
			return new Point(
				Math.min(point1.x, point2.x),
				Math.min(point1.y, point2.y)
			);
		},

		max: function() {
			var args = arguments,
				point1 = Point.read(args),
				point2 = Point.read(args);
			return new Point(
				Math.max(point1.x, point2.x),
				Math.max(point1.y, point2.y)
			);
		},

		random: function() {
			return new Point(Math.random(), Math.random());
		},

		isCollinear: function(x1, y1, x2, y2) {
			return Math.abs(x1 * y2 - y1 * x2)
					<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
						* 1e-8;
		},

		isOrthogonal: function(x1, y1, x2, y2) {
			return Math.abs(x1 * x2 + y1 * y2)
					<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
						* 1e-8;
		}
	}
}, Base.each(['round', 'ceil', 'floor', 'abs'], function(key) {
	var op = Math[key];
	this[key] = function() {
		return new Point(op(this.x), op(this.y));
	};
}, {}));

var LinkedPoint = Point.extend({
	initialize: function Point(x, y, owner, setter) {
		this._x = x;
		this._y = y;
		this._owner = owner;
		this._setter = setter;
	},

	_set: function(x, y, _dontNotify) {
		this._x = x;
		this._y = y;
		if (!_dontNotify)
			this._owner[this._setter](this);
		return this;
	},

	getX: function() {
		return this._x;
	},

	setX: function(x) {
		this._x = x;
		this._owner[this._setter](this);
	},

	getY: function() {
		return this._y;
	},

	setY: function(y) {
		this._y = y;
		this._owner[this._setter](this);
	},

	isSelected: function() {
		return !!(this._owner._selection & this._getSelection());
	},

	setSelected: function(selected) {
		this._owner._changeSelection(this._getSelection(), selected);
	},

	_getSelection: function() {
		return this._setter === 'setPosition' ? 4 : 0;
	}
});

var Size = Base.extend({
	_class: 'Size',
	_readIndex: true,

	initialize: function Size(arg0, arg1) {
		var type = typeof arg0,
			reading = this.__read,
			read = 0;
		if (type === 'number') {
			var hasHeight = typeof arg1 === 'number';
			this._set(arg0, hasHeight ? arg1 : arg0);
			if (reading)
				read = hasHeight ? 2 : 1;
		} else if (type === 'undefined' || arg0 === null) {
			this._set(0, 0);
			if (reading)
				read = arg0 === null ? 1 : 0;
		} else {
			var obj = type === 'string' ? arg0.split(/[\s,]+/) || [] : arg0;
			read = 1;
			if (Array.isArray(obj)) {
				this._set(+obj[0], +(obj.length > 1 ? obj[1] : obj[0]));
			} else if ('width' in obj) {
				this._set(obj.width || 0, obj.height || 0);
			} else if ('x' in obj) {
				this._set(obj.x || 0, obj.y || 0);
			} else {
				this._set(0, 0);
				read = 0;
			}
		}
		if (reading)
			this.__read = read;
		return this;
	},

	set: '#initialize',

	_set: function(width, height) {
		this.width = width;
		this.height = height;
		return this;
	},

	equals: function(size) {
		return size === this || size && (this.width === size.width
				&& this.height === size.height
				|| Array.isArray(size) && this.width === size[0]
					&& this.height === size[1]) || false;
	},

	clone: function() {
		return new Size(this.width, this.height);
	},

	toString: function() {
		var f = Formatter.instance;
		return '{ width: ' + f.number(this.width)
				+ ', height: ' + f.number(this.height) + ' }';
	},

	_serialize: function(options) {
		var f = options.formatter;
		return [f.number(this.width),
				f.number(this.height)];
	},

	add: function() {
		var size = Size.read(arguments);
		return new Size(this.width + size.width, this.height + size.height);
	},

	subtract: function() {
		var size = Size.read(arguments);
		return new Size(this.width - size.width, this.height - size.height);
	},

	multiply: function() {
		var size = Size.read(arguments);
		return new Size(this.width * size.width, this.height * size.height);
	},

	divide: function() {
		var size = Size.read(arguments);
		return new Size(this.width / size.width, this.height / size.height);
	},

	modulo: function() {
		var size = Size.read(arguments);
		return new Size(this.width % size.width, this.height % size.height);
	},

	negate: function() {
		return new Size(-this.width, -this.height);
	},

	isZero: function() {
		var isZero = Numerical.isZero;
		return isZero(this.width) && isZero(this.height);
	},

	isNaN: function() {
		return isNaN(this.width) || isNaN(this.height);
	},

	statics: {
		min: function(size1, size2) {
			return new Size(
				Math.min(size1.width, size2.width),
				Math.min(size1.height, size2.height));
		},

		max: function(size1, size2) {
			return new Size(
				Math.max(size1.width, size2.width),
				Math.max(size1.height, size2.height));
		},

		random: function() {
			return new Size(Math.random(), Math.random());
		}
	}
}, Base.each(['round', 'ceil', 'floor', 'abs'], function(key) {
	var op = Math[key];
	this[key] = function() {
		return new Size(op(this.width), op(this.height));
	};
}, {}));

var LinkedSize = Size.extend({
	initialize: function Size(width, height, owner, setter) {
		this._width = width;
		this._height = height;
		this._owner = owner;
		this._setter = setter;
	},

	_set: function(width, height, _dontNotify) {
		this._width = width;
		this._height = height;
		if (!_dontNotify)
			this._owner[this._setter](this);
		return this;
	},

	getWidth: function() {
		return this._width;
	},

	setWidth: function(width) {
		this._width = width;
		this._owner[this._setter](this);
	},

	getHeight: function() {
		return this._height;
	},

	setHeight: function(height) {
		this._height = height;
		this._owner[this._setter](this);
	}
});

var Rectangle = Base.extend({
	_class: 'Rectangle',
	_readIndex: true,
	beans: true,

	initialize: function Rectangle(arg0, arg1, arg2, arg3) {
		var args = arguments,
			type = typeof arg0,
			read;
		if (type === 'number') {
			this._set(arg0, arg1, arg2, arg3);
			read = 4;
		} else if (type === 'undefined' || arg0 === null) {
			this._set(0, 0, 0, 0);
			read = arg0 === null ? 1 : 0;
		} else if (args.length === 1) {
			if (Array.isArray(arg0)) {
				this._set.apply(this, arg0);
				read = 1;
			} else if (arg0.x !== undefined || arg0.width !== undefined) {
				this._set(arg0.x || 0, arg0.y || 0,
						arg0.width || 0, arg0.height || 0);
				read = 1;
			} else if (arg0.from === undefined && arg0.to === undefined) {
				this._set(0, 0, 0, 0);
				if (Base.readSupported(args, this)) {
					read = 1;
				}
			}
		}
		if (read === undefined) {
			var frm = Point.readNamed(args, 'from'),
				next = Base.peek(args),
				x = frm.x,
				y = frm.y,
				width,
				height;
			if (next && next.x !== undefined || Base.hasNamed(args, 'to')) {
				var to = Point.readNamed(args, 'to');
				width = to.x - x;
				height = to.y - y;
				if (width < 0) {
					x = to.x;
					width = -width;
				}
				if (height < 0) {
					y = to.y;
					height = -height;
				}
			} else {
				var size = Size.read(args);
				width = size.width;
				height = size.height;
			}
			this._set(x, y, width, height);
			read = args.__index;
		}
		var filtered = args.__filtered;
		if (filtered)
			this.__filtered = filtered;
		if (this.__read)
			this.__read = read;
		return this;
	},

	set: '#initialize',

	_set: function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		return this;
	},

	clone: function() {
		return new Rectangle(this.x, this.y, this.width, this.height);
	},

	equals: function(rect) {
		var rt = Base.isPlainValue(rect)
				? Rectangle.read(arguments)
				: rect;
		return rt === this
				|| rt && this.x === rt.x && this.y === rt.y
					&& this.width === rt.width && this.height === rt.height
				|| false;
	},

	toString: function() {
		var f = Formatter.instance;
		return '{ x: ' + f.number(this.x)
				+ ', y: ' + f.number(this.y)
				+ ', width: ' + f.number(this.width)
				+ ', height: ' + f.number(this.height)
				+ ' }';
	},

	_serialize: function(options) {
		var f = options.formatter;
		return [f.number(this.x),
				f.number(this.y),
				f.number(this.width),
				f.number(this.height)];
	},

	getPoint: function(_dontLink) {
		var ctor = _dontLink ? Point : LinkedPoint;
		return new ctor(this.x, this.y, this, 'setPoint');
	},

	setPoint: function() {
		var point = Point.read(arguments);
		this.x = point.x;
		this.y = point.y;
	},

	getSize: function(_dontLink) {
		var ctor = _dontLink ? Size : LinkedSize;
		return new ctor(this.width, this.height, this, 'setSize');
	},

	_fw: 1,
	_fh: 1,

	setSize: function() {
		var size = Size.read(arguments),
			sx = this._sx,
			sy = this._sy,
			w = size.width,
			h = size.height;
		if (sx) {
			this.x += (this.width - w) * sx;
		}
		if (sy) {
			this.y += (this.height - h) * sy;
		}
		this.width = w;
		this.height = h;
		this._fw = this._fh = 1;
	},

	getLeft: function() {
		return this.x;
	},

	setLeft: function(left) {
		if (!this._fw) {
			var amount = left - this.x;
			this.width -= this._sx === 0.5 ? amount * 2 : amount;
		}
		this.x = left;
		this._sx = this._fw = 0;
	},

	getTop: function() {
		return this.y;
	},

	setTop: function(top) {
		if (!this._fh) {
			var amount = top - this.y;
			this.height -= this._sy === 0.5 ? amount * 2 : amount;
		}
		this.y = top;
		this._sy = this._fh = 0;
	},

	getRight: function() {
		return this.x + this.width;
	},

	setRight: function(right) {
		if (!this._fw) {
			var amount = right - this.x;
			this.width = this._sx === 0.5 ? amount * 2 : amount;
		}
		this.x = right - this.width;
		this._sx = 1;
		this._fw = 0;
	},

	getBottom: function() {
		return this.y + this.height;
	},

	setBottom: function(bottom) {
		if (!this._fh) {
			var amount = bottom - this.y;
			this.height = this._sy === 0.5 ? amount * 2 : amount;
		}
		this.y = bottom - this.height;
		this._sy = 1;
		this._fh = 0;
	},

	getCenterX: function() {
		return this.x + this.width / 2;
	},

	setCenterX: function(x) {
		if (this._fw || this._sx === 0.5) {
			this.x = x - this.width / 2;
		} else {
			if (this._sx) {
				this.x += (x - this.x) * 2 * this._sx;
			}
			this.width = (x - this.x) * 2;
		}
		this._sx = 0.5;
		this._fw = 0;
	},

	getCenterY: function() {
		return this.y + this.height / 2;
	},

	setCenterY: function(y) {
		if (this._fh || this._sy === 0.5) {
			this.y = y - this.height / 2;
		} else {
			if (this._sy) {
				this.y += (y - this.y) * 2 * this._sy;
			}
			this.height = (y - this.y) * 2;
		}
		this._sy = 0.5;
		this._fh = 0;
	},

	getCenter: function(_dontLink) {
		var ctor = _dontLink ? Point : LinkedPoint;
		return new ctor(this.getCenterX(), this.getCenterY(), this, 'setCenter');
	},

	setCenter: function() {
		var point = Point.read(arguments);
		this.setCenterX(point.x);
		this.setCenterY(point.y);
		return this;
	},

	getArea: function() {
		return this.width * this.height;
	},

	isEmpty: function() {
		return this.width === 0 || this.height === 0;
	},

	contains: function(arg) {
		return arg && arg.width !== undefined
				|| (Array.isArray(arg) ? arg : arguments).length === 4
				? this._containsRectangle(Rectangle.read(arguments))
				: this._containsPoint(Point.read(arguments));
	},

	_containsPoint: function(point) {
		var x = point.x,
			y = point.y;
		return x >= this.x && y >= this.y
				&& x <= this.x + this.width
				&& y <= this.y + this.height;
	},

	_containsRectangle: function(rect) {
		var x = rect.x,
			y = rect.y;
		return x >= this.x && y >= this.y
				&& x + rect.width <= this.x + this.width
				&& y + rect.height <= this.y + this.height;
	},

	intersects: function() {
		var rect = Rectangle.read(arguments),
			epsilon = Base.read(arguments) || 0;
		return rect.x + rect.width > this.x - epsilon
				&& rect.y + rect.height > this.y - epsilon
				&& rect.x < this.x + this.width + epsilon
				&& rect.y < this.y + this.height + epsilon;
	},

	intersect: function() {
		var rect = Rectangle.read(arguments),
			x1 = Math.max(this.x, rect.x),
			y1 = Math.max(this.y, rect.y),
			x2 = Math.min(this.x + this.width, rect.x + rect.width),
			y2 = Math.min(this.y + this.height, rect.y + rect.height);
		return new Rectangle(x1, y1, x2 - x1, y2 - y1);
	},

	unite: function() {
		var rect = Rectangle.read(arguments),
			x1 = Math.min(this.x, rect.x),
			y1 = Math.min(this.y, rect.y),
			x2 = Math.max(this.x + this.width, rect.x + rect.width),
			y2 = Math.max(this.y + this.height, rect.y + rect.height);
		return new Rectangle(x1, y1, x2 - x1, y2 - y1);
	},

	include: function() {
		var point = Point.read(arguments);
		var x1 = Math.min(this.x, point.x),
			y1 = Math.min(this.y, point.y),
			x2 = Math.max(this.x + this.width, point.x),
			y2 = Math.max(this.y + this.height, point.y);
		return new Rectangle(x1, y1, x2 - x1, y2 - y1);
	},

	expand: function() {
		var amount = Size.read(arguments),
			hor = amount.width,
			ver = amount.height;
		return new Rectangle(this.x - hor / 2, this.y - ver / 2,
				this.width + hor, this.height + ver);
	},

	scale: function(hor, ver) {
		return this.expand(this.width * hor - this.width,
				this.height * (ver === undefined ? hor : ver) - this.height);
	}
}, Base.each([
		['Top', 'Left'], ['Top', 'Right'],
		['Bottom', 'Left'], ['Bottom', 'Right'],
		['Left', 'Center'], ['Top', 'Center'],
		['Right', 'Center'], ['Bottom', 'Center']
	],
	function(parts, index) {
		var part = parts.join(''),
			xFirst = /^[RL]/.test(part);
		if (index >= 4)
			parts[1] += xFirst ? 'Y' : 'X';
		var x = parts[xFirst ? 0 : 1],
			y = parts[xFirst ? 1 : 0],
			getX = 'get' + x,
			getY = 'get' + y,
			setX = 'set' + x,
			setY = 'set' + y,
			get = 'get' + part,
			set = 'set' + part;
		this[get] = function(_dontLink) {
			var ctor = _dontLink ? Point : LinkedPoint;
			return new ctor(this[getX](), this[getY](), this, set);
		};
		this[set] = function() {
			var point = Point.read(arguments);
			this[setX](point.x);
			this[setY](point.y);
		};
	}, {
		beans: true
	}
));

var LinkedRectangle = Rectangle.extend({
	initialize: function Rectangle(x, y, width, height, owner, setter) {
		this._set(x, y, width, height, true);
		this._owner = owner;
		this._setter = setter;
	},

	_set: function(x, y, width, height, _dontNotify) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
		if (!_dontNotify)
			this._owner[this._setter](this);
		return this;
	}
},
new function() {
	var proto = Rectangle.prototype;

	return Base.each(['x', 'y', 'width', 'height'], function(key) {
		var part = Base.capitalize(key),
			internal = '_' + key;
		this['get' + part] = function() {
			return this[internal];
		};

		this['set' + part] = function(value) {
			this[internal] = value;
			if (!this._dontNotify)
				this._owner[this._setter](this);
		};
	}, Base.each(['Point', 'Size', 'Center',
			'Left', 'Top', 'Right', 'Bottom', 'CenterX', 'CenterY',
			'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
			'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'],
		function(key) {
			var name = 'set' + key;
			this[name] = function() {
				this._dontNotify = true;
				proto[name].apply(this, arguments);
				this._dontNotify = false;
				this._owner[this._setter](this);
			};
		}, {
			isSelected: function() {
				return !!(this._owner._selection & 2);
			},

			setSelected: function(selected) {
				var owner = this._owner;
				if (owner._changeSelection) {
					owner._changeSelection(2, selected);
				}
			}
		})
	);
});

var Matrix = Base.extend({
	_class: 'Matrix',

	initialize: function Matrix(arg, _dontNotify) {
		var args = arguments,
			count = args.length,
			ok = true;
		if (count >= 6) {
			this._set.apply(this, args);
		} else if (count === 1 || count === 2) {
			if (arg instanceof Matrix) {
				this._set(arg._a, arg._b, arg._c, arg._d, arg._tx, arg._ty,
						_dontNotify);
			} else if (Array.isArray(arg)) {
				this._set.apply(this,
						_dontNotify ? arg.concat([_dontNotify]) : arg);
			} else {
				ok = false;
			}
		} else if (!count) {
			this.reset();
		} else {
			ok = false;
		}
		if (!ok) {
			throw new Error('Unsupported matrix parameters');
		}
		return this;
	},

	set: '#initialize',

	_set: function(a, b, c, d, tx, ty, _dontNotify) {
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
		this._tx = tx;
		this._ty = ty;
		if (!_dontNotify)
			this._changed();
		return this;
	},

	_serialize: function(options, dictionary) {
		return Base.serialize(this.getValues(), options, true, dictionary);
	},

	_changed: function() {
		var owner = this._owner;
		if (owner) {
			if (owner._applyMatrix) {
				owner.transform(null, true);
			} else {
				owner._changed(25);
			}
		}
	},

	clone: function() {
		return new Matrix(this._a, this._b, this._c, this._d,
				this._tx, this._ty);
	},

	equals: function(mx) {
		return mx === this || mx && this._a === mx._a && this._b === mx._b
				&& this._c === mx._c && this._d === mx._d
				&& this._tx === mx._tx && this._ty === mx._ty;
	},

	toString: function() {
		var f = Formatter.instance;
		return '[[' + [f.number(this._a), f.number(this._c),
					f.number(this._tx)].join(', ') + '], ['
				+ [f.number(this._b), f.number(this._d),
					f.number(this._ty)].join(', ') + ']]';
	},

	reset: function(_dontNotify) {
		this._a = this._d = 1;
		this._b = this._c = this._tx = this._ty = 0;
		if (!_dontNotify)
			this._changed();
		return this;
	},

	apply: function(recursively, _setApplyMatrix) {
		var owner = this._owner;
		if (owner) {
			owner.transform(null, Base.pick(recursively, true), _setApplyMatrix);
			return this.isIdentity();
		}
		return false;
	},

	translate: function() {
		var point = Point.read(arguments),
			x = point.x,
			y = point.y;
		this._tx += x * this._a + y * this._c;
		this._ty += x * this._b + y * this._d;
		this._changed();
		return this;
	},

	scale: function() {
		var args = arguments,
			scale = Point.read(args),
			center = Point.read(args, 0, { readNull: true });
		if (center)
			this.translate(center);
		this._a *= scale.x;
		this._b *= scale.x;
		this._c *= scale.y;
		this._d *= scale.y;
		if (center)
			this.translate(center.negate());
		this._changed();
		return this;
	},

	rotate: function(angle ) {
		angle *= Math.PI / 180;
		var center = Point.read(arguments, 1),
			x = center.x,
			y = center.y,
			cos = Math.cos(angle),
			sin = Math.sin(angle),
			tx = x - x * cos + y * sin,
			ty = y - x * sin - y * cos,
			a = this._a,
			b = this._b,
			c = this._c,
			d = this._d;
		this._a = cos * a + sin * c;
		this._b = cos * b + sin * d;
		this._c = -sin * a + cos * c;
		this._d = -sin * b + cos * d;
		this._tx += tx * a + ty * c;
		this._ty += tx * b + ty * d;
		this._changed();
		return this;
	},

	shear: function() {
		var args = arguments,
			shear = Point.read(args),
			center = Point.read(args, 0, { readNull: true });
		if (center)
			this.translate(center);
		var a = this._a,
			b = this._b;
		this._a += shear.y * this._c;
		this._b += shear.y * this._d;
		this._c += shear.x * a;
		this._d += shear.x * b;
		if (center)
			this.translate(center.negate());
		this._changed();
		return this;
	},

	skew: function() {
		var args = arguments,
			skew = Point.read(args),
			center = Point.read(args, 0, { readNull: true }),
			toRadians = Math.PI / 180,
			shear = new Point(Math.tan(skew.x * toRadians),
				Math.tan(skew.y * toRadians));
		return this.shear(shear, center);
	},

	append: function(mx, _dontNotify) {
		if (mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				a2 = mx._a,
				b2 = mx._c,
				c2 = mx._b,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + c2 * c1;
			this._c = b2 * a1 + d2 * c1;
			this._b = a2 * b1 + c2 * d1;
			this._d = b2 * b1 + d2 * d1;
			this._tx += tx2 * a1 + ty2 * c1;
			this._ty += tx2 * b1 + ty2 * d1;
			if (!_dontNotify)
				this._changed();
		}
		return this;
	},

	prepend: function(mx, _dontNotify) {
		if (mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				tx1 = this._tx,
				ty1 = this._ty,
				a2 = mx._a,
				b2 = mx._c,
				c2 = mx._b,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + b2 * b1;
			this._c = a2 * c1 + b2 * d1;
			this._b = c2 * a1 + d2 * b1;
			this._d = c2 * c1 + d2 * d1;
			this._tx = a2 * tx1 + b2 * ty1 + tx2;
			this._ty = c2 * tx1 + d2 * ty1 + ty2;
			if (!_dontNotify)
				this._changed();
		}
		return this;
	},

	appended: function(mx) {
		return this.clone().append(mx);
	},

	prepended: function(mx) {
		return this.clone().prepend(mx);
	},

	invert: function() {
		var a = this._a,
			b = this._b,
			c = this._c,
			d = this._d,
			tx = this._tx,
			ty = this._ty,
			det = a * d - b * c,
			res = null;
		if (det && !isNaN(det) && isFinite(tx) && isFinite(ty)) {
			this._a = d / det;
			this._b = -b / det;
			this._c = -c / det;
			this._d = a / det;
			this._tx = (c * ty - d * tx) / det;
			this._ty = (b * tx - a * ty) / det;
			res = this;
		}
		return res;
	},

	inverted: function() {
		return this.clone().invert();
	},

	concatenate: '#append',
	preConcatenate: '#prepend',
	chain: '#appended',

	_shiftless: function() {
		return new Matrix(this._a, this._b, this._c, this._d, 0, 0);
	},

	_orNullIfIdentity: function() {
		return this.isIdentity() ? null : this;
	},

	isIdentity: function() {
		return this._a === 1 && this._b === 0 && this._c === 0 && this._d === 1
				&& this._tx === 0 && this._ty === 0;
	},

	isInvertible: function() {
		var det = this._a * this._d - this._c * this._b;
		return det && !isNaN(det) && isFinite(this._tx) && isFinite(this._ty);
	},

	isSingular: function() {
		return !this.isInvertible();
	},

	transform: function( src, dst, count) {
		return arguments.length < 3
			? this._transformPoint(Point.read(arguments))
			: this._transformCoordinates(src, dst, count);
	},

	_transformPoint: function(point, dest, _dontNotify) {
		var x = point.x,
			y = point.y;
		if (!dest)
			dest = new Point();
		return dest._set(
				x * this._a + y * this._c + this._tx,
				x * this._b + y * this._d + this._ty,
				_dontNotify);
	},

	_transformCoordinates: function(src, dst, count) {
		for (var i = 0, max = 2 * count; i < max; i += 2) {
			var x = src[i],
				y = src[i + 1];
			dst[i] = x * this._a + y * this._c + this._tx;
			dst[i + 1] = x * this._b + y * this._d + this._ty;
		}
		return dst;
	},

	_transformCorners: function(rect) {
		var x1 = rect.x,
			y1 = rect.y,
			x2 = x1 + rect.width,
			y2 = y1 + rect.height,
			coords = [ x1, y1, x2, y1, x2, y2, x1, y2 ];
		return this._transformCoordinates(coords, coords, 4);
	},

	_transformBounds: function(bounds, dest, _dontNotify) {
		var coords = this._transformCorners(bounds),
			min = coords.slice(0, 2),
			max = min.slice();
		for (var i = 2; i < 8; i++) {
			var val = coords[i],
				j = i & 1;
			if (val < min[j]) {
				min[j] = val;
			} else if (val > max[j]) {
				max[j] = val;
			}
		}
		if (!dest)
			dest = new Rectangle();
		return dest._set(min[0], min[1], max[0] - min[0], max[1] - min[1],
				_dontNotify);
	},

	inverseTransform: function() {
		return this._inverseTransform(Point.read(arguments));
	},

	_inverseTransform: function(point, dest, _dontNotify) {
		var a = this._a,
			b = this._b,
			c = this._c,
			d = this._d,
			tx = this._tx,
			ty = this._ty,
			det = a * d - b * c,
			res = null;
		if (det && !isNaN(det) && isFinite(tx) && isFinite(ty)) {
			var x = point.x - this._tx,
				y = point.y - this._ty;
			if (!dest)
				dest = new Point();
			res = dest._set(
					(x * d - y * c) / det,
					(y * a - x * b) / det,
					_dontNotify);
		}
		return res;
	},

	decompose: function() {
		var a = this._a,
			b = this._b,
			c = this._c,
			d = this._d,
			det = a * d - b * c,
			sqrt = Math.sqrt,
			atan2 = Math.atan2,
			degrees = 180 / Math.PI,
			rotate,
			scale,
			skew;
		if (a !== 0 || b !== 0) {
			var r = sqrt(a * a + b * b);
			rotate = Math.acos(a / r) * (b > 0 ? 1 : -1);
			scale = [r, det / r];
			skew = [atan2(a * c + b * d, r * r), 0];
		} else if (c !== 0 || d !== 0) {
			var s = sqrt(c * c + d * d);
			rotate = Math.asin(c / s)  * (d > 0 ? 1 : -1);
			scale = [det / s, s];
			skew = [0, atan2(a * c + b * d, s * s)];
		} else {
			rotate = 0;
			skew = scale = [0, 0];
		}
		return {
			translation: this.getTranslation(),
			rotation: rotate * degrees,
			scaling: new Point(scale),
			skewing: new Point(skew[0] * degrees, skew[1] * degrees)
		};
	},

	getValues: function() {
		return [ this._a, this._b, this._c, this._d, this._tx, this._ty ];
	},

	getTranslation: function() {
		return new Point(this._tx, this._ty);
	},

	getScaling: function() {
		return this.decompose().scaling;
	},

	getRotation: function() {
		return this.decompose().rotation;
	},

	applyToContext: function(ctx) {
		if (!this.isIdentity()) {
			ctx.transform(this._a, this._b, this._c, this._d,
					this._tx, this._ty);
		}
	}
}, Base.each(['a', 'b', 'c', 'd', 'tx', 'ty'], function(key) {
	var part = Base.capitalize(key),
		prop = '_' + key;
	this['get' + part] = function() {
		return this[prop];
	};
	this['set' + part] = function(value) {
		this[prop] = value;
		this._changed();
	};
}, {}));

var Line = Base.extend({
	_class: 'Line',

	initialize: function Line(arg0, arg1, arg2, arg3, arg4) {
		var asVector = false;
		if (arguments.length >= 4) {
			this._px = arg0;
			this._py = arg1;
			this._vx = arg2;
			this._vy = arg3;
			asVector = arg4;
		} else {
			this._px = arg0.x;
			this._py = arg0.y;
			this._vx = arg1.x;
			this._vy = arg1.y;
			asVector = arg2;
		}
		if (!asVector) {
			this._vx -= this._px;
			this._vy -= this._py;
		}
	},

	getPoint: function() {
		return new Point(this._px, this._py);
	},

	getVector: function() {
		return new Point(this._vx, this._vy);
	},

	getLength: function() {
		return this.getVector().getLength();
	},

	intersect: function(line, isInfinite) {
		return Line.intersect(
				this._px, this._py, this._vx, this._vy,
				line._px, line._py, line._vx, line._vy,
				true, isInfinite);
	},

	getSide: function(point, isInfinite) {
		return Line.getSide(
				this._px, this._py, this._vx, this._vy,
				point.x, point.y, true, isInfinite);
	},

	getDistance: function(point) {
		return Math.abs(this.getSignedDistance(point));
	},

	getSignedDistance: function(point) {
		return Line.getSignedDistance(this._px, this._py, this._vx, this._vy,
				point.x, point.y, true);
	},

	isCollinear: function(line) {
		return Point.isCollinear(this._vx, this._vy, line._vx, line._vy);
	},

	isOrthogonal: function(line) {
		return Point.isOrthogonal(this._vx, this._vy, line._vx, line._vy);
	},

	statics: {
		intersect: function(p1x, p1y, v1x, v1y, p2x, p2y, v2x, v2y, asVector,
				isInfinite) {
			if (!asVector) {
				v1x -= p1x;
				v1y -= p1y;
				v2x -= p2x;
				v2y -= p2y;
			}
			var cross = v1x * v2y - v1y * v2x;
			if (!Numerical.isMachineZero(cross)) {
				var dx = p1x - p2x,
					dy = p1y - p2y,
					u1 = (v2x * dy - v2y * dx) / cross,
					u2 = (v1x * dy - v1y * dx) / cross,
					epsilon = 1e-12,
					uMin = -epsilon,
					uMax = 1 + epsilon;
				if (isInfinite
						|| uMin < u1 && u1 < uMax && uMin < u2 && u2 < uMax) {
					if (!isInfinite) {
						u1 = u1 <= 0 ? 0 : u1 >= 1 ? 1 : u1;
					}
					return new Point(
							p1x + u1 * v1x,
							p1y + u1 * v1y);
				}
			}
		},

		getSide: function(px, py, vx, vy, x, y, asVector, isInfinite) {
			if (!asVector) {
				vx -= px;
				vy -= py;
			}
			var v2x = x - px,
				v2y = y - py,
				ccw = v2x * vy - v2y * vx;
			if (!isInfinite && Numerical.isMachineZero(ccw)) {
				ccw = (v2x * vx + v2x * vx) / (vx * vx + vy * vy);
				if (ccw >= 0 && ccw <= 1)
					ccw = 0;
			}
			return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
		},

		getSignedDistance: function(px, py, vx, vy, x, y, asVector) {
			if (!asVector) {
				vx -= px;
				vy -= py;
			}
			  return  vx === 0 ? (vy > 0 ? x - px : px - x)
					: vy === 0 ? (vx < 0 ? y - py : py - y)
					: ((x - px) * vy - (y - py) * vx) / (
						vy > vx
							? vy * Math.sqrt(1 + (vx * vx) / (vy * vy))
							: vx * Math.sqrt(1 + (vy * vy) / (vx * vx))
					);
		},

		getDistance: function(px, py, vx, vy, x, y, asVector) {
			return Math.abs(
					Line.getSignedDistance(px, py, vx, vy, x, y, asVector));
		}
	}
});

var Project = PaperScopeItem.extend({
	_class: 'Project',
	_list: 'projects',
	_reference: 'project',
	_compactSerialize: true,

	initialize: function Project(element) {
		PaperScopeItem.call(this, true);
		this._children = [];
		this._namedChildren = {};
		this._activeLayer = null;
		this._currentStyle = new Style(null, null, this);
		this._view = View.create(this,
				element || CanvasProvider.getCanvas(1, 1));
		this._selectionItems = {};
		this._selectionCount = 0;
		this._updateVersion = 0;
	},

	_serialize: function(options, dictionary) {
		return Base.serialize(this._children, options, true, dictionary);
	},

	_changed: function(flags, item) {
		if (flags & 1) {
			var view = this._view;
			if (view) {
				view._needsUpdate = true;
				if (!view._requested && view._autoUpdate)
					view.requestUpdate();
			}
		}
		var changes = this._changes;
		if (changes && item) {
			var changesById = this._changesById,
				id = item._id,
				entry = changesById[id];
			if (entry) {
				entry.flags |= flags;
			} else {
				changes.push(changesById[id] = { item: item, flags: flags });
			}
		}
	},

	clear: function() {
		var children = this._children;
		for (var i = children.length - 1; i >= 0; i--)
			children[i].remove();
	},

	isEmpty: function() {
		return !this._children.length;
	},

	remove: function remove() {
		if (!remove.base.call(this))
			return false;
		if (this._view)
			this._view.remove();
		return true;
	},

	getView: function() {
		return this._view;
	},

	getCurrentStyle: function() {
		return this._currentStyle;
	},

	setCurrentStyle: function(style) {
		this._currentStyle.set(style);
	},

	getIndex: function() {
		return this._index;
	},

	getOptions: function() {
		return this._scope.settings;
	},

	getLayers: function() {
		return this._children;
	},

	getActiveLayer: function() {
		return this._activeLayer || new Layer({ project: this, insert: true });
	},

	getSymbolDefinitions: function() {
		var definitions = [],
			ids = {};
		this.getItems({
			class: SymbolItem,
			match: function(item) {
				var definition = item._definition,
					id = definition._id;
				if (!ids[id]) {
					ids[id] = true;
					definitions.push(definition);
				}
				return false;
			}
		});
		return definitions;
	},

	getSymbols: 'getSymbolDefinitions',

	getSelectedItems: function() {
		var selectionItems = this._selectionItems,
			items = [];
		for (var id in selectionItems) {
			var item = selectionItems[id],
				selection = item._selection;
			if ((selection & 1) && item.isInserted()) {
				items.push(item);
			} else if (!selection) {
				this._updateSelection(item);
			}
		}
		return items;
	},

	_updateSelection: function(item) {
		var id = item._id,
			selectionItems = this._selectionItems;
		if (item._selection) {
			if (selectionItems[id] !== item) {
				this._selectionCount++;
				selectionItems[id] = item;
			}
		} else if (selectionItems[id] === item) {
			this._selectionCount--;
			delete selectionItems[id];
		}
	},

	selectAll: function() {
		var children = this._children;
		for (var i = 0, l = children.length; i < l; i++)
			children[i].setFullySelected(true);
	},

	deselectAll: function() {
		var selectionItems = this._selectionItems;
		for (var i in selectionItems)
			selectionItems[i].setFullySelected(false);
	},

	addLayer: function(layer) {
		return this.insertLayer(undefined, layer);
	},

	insertLayer: function(index, layer) {
		if (layer instanceof Layer) {
			layer._remove(false, true);
			Base.splice(this._children, [layer], index, 0);
			layer._setProject(this, true);
			var name = layer._name;
			if (name)
				layer.setName(name);
			if (this._changes)
				layer._changed(5);
			if (!this._activeLayer)
				this._activeLayer = layer;
		} else {
			layer = null;
		}
		return layer;
	},

	_insertItem: function(index, item, _created) {
		item = this.insertLayer(index, item)
				|| (this._activeLayer || this._insertItem(undefined,
						new Layer(Item.NO_INSERT), true))
						.insertChild(index, item);
		if (_created && item.activate)
			item.activate();
		return item;
	},

	getItems: function(options) {
		return Item._getItems(this, options);
	},

	getItem: function(options) {
		return Item._getItems(this, options, null, null, true)[0] || null;
	},

	importJSON: function(json) {
		this.activate();
		var layer = this._activeLayer;
		return Base.importJSON(json, layer && layer.isEmpty() && layer);
	},

	removeOn: function(type) {
		var sets = this._removeSets;
		if (sets) {
			if (type === 'mouseup')
				sets.mousedrag = null;
			var set = sets[type];
			if (set) {
				for (var id in set) {
					var item = set[id];
					for (var key in sets) {
						var other = sets[key];
						if (other && other != set)
							delete other[item._id];
					}
					item.remove();
				}
				sets[type] = null;
			}
		}
	},

	draw: function(ctx, matrix, pixelRatio) {
		this._updateVersion++;
		ctx.save();
		matrix.applyToContext(ctx);
		var children = this._children,
			param = new Base({
				offset: new Point(0, 0),
				pixelRatio: pixelRatio,
				viewMatrix: matrix.isIdentity() ? null : matrix,
				matrices: [new Matrix()],
				updateMatrix: true
			});
		for (var i = 0, l = children.length; i < l; i++) {
			children[i].draw(ctx, param);
		}
		ctx.restore();

		if (this._selectionCount > 0) {
			ctx.save();
			ctx.strokeWidth = 1;
			var items = this._selectionItems,
				size = this._scope.settings.handleSize,
				version = this._updateVersion;
			for (var id in items) {
				items[id]._drawSelection(ctx, matrix, size, items, version);
			}
			ctx.restore();
		}
	}
});

var Item = Base.extend(Emitter, {
	statics: {
		extend: function extend(src) {
			if (src._serializeFields)
				src._serializeFields = Base.set({},
					this.prototype._serializeFields, src._serializeFields);
			return extend.base.apply(this, arguments);
		},

		NO_INSERT: { insert: false }
	},

	_class: 'Item',
	_name: null,
	_applyMatrix: true,
	_canApplyMatrix: true,
	_canScaleStroke: false,
	_pivot: null,
	_visible: true,
	_blendMode: 'normal',
	_opacity: 1,
	_locked: false,
	_guide: false,
	_clipMask: false,
	_selection: 0,
	_selectBounds: true,
	_selectChildren: false,
	_serializeFields: {
		name: null,
		applyMatrix: null,
		matrix: new Matrix(),
		pivot: null,
		visible: true,
		blendMode: 'normal',
		opacity: 1,
		locked: false,
		guide: false,
		clipMask: false,
		selected: false,
		data: {}
	},
	_prioritize: ['applyMatrix']
},
new function() {
	var handlers = ['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onClick',
			'onDoubleClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave'];
	return Base.each(handlers,
		function(name) {
			this._events[name] = {
				install: function(type) {
					this.getView()._countItemEvent(type, 1);
				},

				uninstall: function(type) {
					this.getView()._countItemEvent(type, -1);
				}
			};
		}, {
			_events: {
				onFrame: {
					install: function() {
						this.getView()._animateItem(this, true);
					},

					uninstall: function() {
						this.getView()._animateItem(this, false);
					}
				},

				onLoad: {},
				onError: {}
			},
			statics: {
				_itemHandlers: handlers
			}
		}
	);
}, {
	initialize: function Item() {
	},

	_initialize: function(props, point) {
		var hasProps = props && Base.isPlainObject(props),
			internal = hasProps && props.internal === true,
			matrix = this._matrix = new Matrix(),
			project = hasProps && props.project || paper.project,
			settings = paper.settings;
		this._id = internal ? null : UID.get();
		this._parent = this._index = null;
		this._applyMatrix = this._canApplyMatrix && settings.applyMatrix;
		if (point)
			matrix.translate(point);
		matrix._owner = this;
		this._style = new Style(project._currentStyle, this, project);
		if (internal || hasProps && props.insert == false
			|| !settings.insertItems && !(hasProps && props.insert === true)) {
			this._setProject(project);
		} else {
			(hasProps && props.parent || project)
					._insertItem(undefined, this, true);
		}
		if (hasProps && props !== Item.NO_INSERT) {
			this.set(props, {
				internal: true, insert: true, project: true, parent: true
			});
		}
		return hasProps;
	},

	_serialize: function(options, dictionary) {
		var props = {},
			that = this;

		function serialize(fields) {
			for (var key in fields) {
				var value = that[key];
				if (!Base.equals(value, key === 'leading'
						? fields.fontSize * 1.2 : fields[key])) {
					props[key] = Base.serialize(value, options,
							key !== 'data', dictionary);
				}
			}
		}

		serialize(this._serializeFields);
		if (!(this instanceof Group))
			serialize(this._style._defaults);
		return [ this._class, props ];
	},

	_changed: function(flags) {
		var symbol = this._symbol,
			cacheParent = this._parent || symbol,
			project = this._project;
		if (flags & 8) {
			this._bounds = this._position = this._decomposed = undefined;
		}
		if (flags & 16) {
			this._globalMatrix = undefined;
		}
		if (cacheParent
				&& (flags & 72)) {
			Item._clearBoundsCache(cacheParent);
		}
		if (flags & 2) {
			Item._clearBoundsCache(this);
		}
		if (project)
			project._changed(flags, this);
		if (symbol)
			symbol._changed(flags);
	},

	getId: function() {
		return this._id;
	},

	getName: function() {
		return this._name;
	},

	setName: function(name) {

		if (this._name)
			this._removeNamed();
		if (name === (+name) + '')
			throw new Error(
					'Names consisting only of numbers are not supported.');
		var owner = this._getOwner();
		if (name && owner) {
			var children = owner._children,
				namedChildren = owner._namedChildren;
			(namedChildren[name] = namedChildren[name] || []).push(this);
			if (!(name in children))
				children[name] = this;
		}
		this._name = name || undefined;
		this._changed(256);
	},

	getStyle: function() {
		return this._style;
	},

	setStyle: function(style) {
		this.getStyle().set(style);
	}
}, Base.each(['locked', 'visible', 'blendMode', 'opacity', 'guide'],
	function(name) {
		var part = Base.capitalize(name),
			key = '_' + name,
			flags = {
				locked: 256,
				visible: 265
			};
		this['get' + part] = function() {
			return this[key];
		};
		this['set' + part] = function(value) {
			if (value != this[key]) {
				this[key] = value;
				this._changed(flags[name] || 257);
			}
		};
	},
{}), {
	beans: true,

	getSelection: function() {
		return this._selection;
	},

	setSelection: function(selection) {
		if (selection !== this._selection) {
			this._selection = selection;
			var project = this._project;
			if (project) {
				project._updateSelection(this);
				this._changed(257);
			}
		}
	},

	_changeSelection: function(flag, selected) {
		var selection = this._selection;
		this.setSelection(selected ? selection | flag : selection & ~flag);
	},

	isSelected: function() {
		if (this._selectChildren) {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++)
				if (children[i].isSelected())
					return true;
		}
		return !!(this._selection & 1);
	},

	setSelected: function(selected) {
		if (this._selectChildren) {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++)
				children[i].setSelected(selected);
		}
		this._changeSelection(1, selected);
	},

	isFullySelected: function() {
		var children = this._children,
			selected = !!(this._selection & 1);
		if (children && selected) {
			for (var i = 0, l = children.length; i < l; i++)
				if (!children[i].isFullySelected())
					return false;
			return true;
		}
		return selected;
	},

	setFullySelected: function(selected) {
		var children = this._children;
		if (children) {
			for (var i = 0, l = children.length; i < l; i++)
				children[i].setFullySelected(selected);
		}
		this._changeSelection(1, selected);
	},

	isClipMask: function() {
		return this._clipMask;
	},

	setClipMask: function(clipMask) {
		if (this._clipMask != (clipMask = !!clipMask)) {
			this._clipMask = clipMask;
			if (clipMask) {
				this.setFillColor(null);
				this.setStrokeColor(null);
			}
			this._changed(257);
			if (this._parent)
				this._parent._changed(2048);
		}
	},

	getData: function() {
		if (!this._data)
			this._data = {};
		return this._data;
	},

	setData: function(data) {
		this._data = data;
	},

	getPosition: function(_dontLink) {
		var ctor = _dontLink ? Point : LinkedPoint;
		var position = this._position ||
			(this._position = this._getPositionFromBounds());
		return new ctor(position.x, position.y, this, 'setPosition');
	},

	setPosition: function() {
		this.translate(Point.read(arguments).subtract(this.getPosition(true)));
	},

	_getPositionFromBounds: function(bounds) {
		return this._pivot
				? this._matrix._transformPoint(this._pivot)
				: (bounds || this.getBounds()).getCenter(true);
	},

	getPivot: function() {
		var pivot = this._pivot;
		return pivot
				? new LinkedPoint(pivot.x, pivot.y, this, 'setPivot')
				: null;
	},

	setPivot: function() {
		this._pivot = Point.read(arguments, 0, { clone: true, readNull: true });
		this._position = undefined;
	}
}, Base.each({
		getStrokeBounds: { stroke: true },
		getHandleBounds: { handle: true },
		getInternalBounds: { internal: true }
	},
	function(options, key) {
		this[key] = function(matrix) {
			return this.getBounds(matrix, options);
		};
	},
{
	beans: true,

	getBounds: function(matrix, options) {
		var hasMatrix = options || matrix instanceof Matrix,
			opts = Base.set({}, hasMatrix ? options : matrix,
					this._boundsOptions);
		if (!opts.stroke || this.getStrokeScaling())
			opts.cacheItem = this;
		var rect = this._getCachedBounds(hasMatrix && matrix, opts).rect;
		return !arguments.length
				? new LinkedRectangle(rect.x, rect.y, rect.width, rect.height,
					this, 'setBounds')
				: rect;
	},

	setBounds: function() {
		var rect = Rectangle.read(arguments),
			bounds = this.getBounds(),
			_matrix = this._matrix,
			matrix = new Matrix(),
			center = rect.getCenter();
		matrix.translate(center);
		if (rect.width != bounds.width || rect.height != bounds.height) {
			if (!_matrix.isInvertible()) {
				_matrix.set(_matrix._backup
						|| new Matrix().translate(_matrix.getTranslation()));
				bounds = this.getBounds();
			}
			matrix.scale(
					bounds.width !== 0 ? rect.width / bounds.width : 0,
					bounds.height !== 0 ? rect.height / bounds.height : 0);
		}
		center = bounds.getCenter();
		matrix.translate(-center.x, -center.y);
		this.transform(matrix);
	},

	_getBounds: function(matrix, options) {
		var children = this._children;
		if (!children || !children.length)
			return new Rectangle();
		Item._updateBoundsCache(this, options.cacheItem);
		return Item._getBounds(children, matrix, options);
	},

	_getBoundsCacheKey: function(options, internal) {
		return [
			options.stroke ? 1 : 0,
			options.handle ? 1 : 0,
			internal ? 1 : 0
		].join('');
	},

	_getCachedBounds: function(matrix, options, noInternal) {
		matrix = matrix && matrix._orNullIfIdentity();
		var internal = options.internal && !noInternal,
			cacheItem = options.cacheItem,
			_matrix = internal ? null : this._matrix._orNullIfIdentity(),
			cacheKey = cacheItem && (!matrix || matrix.equals(_matrix))
				&& this._getBoundsCacheKey(options, internal),
			bounds = this._bounds;
		Item._updateBoundsCache(this._parent || this._symbol, cacheItem);
		if (cacheKey && bounds && cacheKey in bounds) {
			var cached = bounds[cacheKey];
			return {
				rect: cached.rect.clone(),
				nonscaling: cached.nonscaling
			};
		}
		var res = this._getBounds(matrix || _matrix, options),
			rect = res.rect || res,
			style = this._style,
			nonscaling = res.nonscaling || style.hasStroke()
				&& !style.getStrokeScaling();
		if (cacheKey) {
			if (!bounds) {
				this._bounds = bounds = {};
			}
			var cached = bounds[cacheKey] = {
				rect: rect.clone(),
				nonscaling: nonscaling,
				internal: internal
			};
		}
		return {
			rect: rect,
			nonscaling: nonscaling
		};
	},

	_getStrokeMatrix: function(matrix, options) {
		var parent = this.getStrokeScaling() ? null
				: options && options.internal ? this
					: this._parent || this._symbol && this._symbol._item,
			mx = parent ? parent.getViewMatrix().invert() : matrix;
		return mx && mx._shiftless();
	},

	statics: {
		_updateBoundsCache: function(parent, item) {
			if (parent && item) {
				var id = item._id,
					ref = parent._boundsCache = parent._boundsCache || {
						ids: {},
						list: []
					};
				if (!ref.ids[id]) {
					ref.list.push(item);
					ref.ids[id] = item;
				}
			}
		},

		_clearBoundsCache: function(item) {
			var cache = item._boundsCache;
			if (cache) {
				item._bounds = item._position = item._boundsCache = undefined;
				for (var i = 0, list = cache.list, l = list.length; i < l; i++){
					var other = list[i];
					if (other !== item) {
						other._bounds = other._position = undefined;
						if (other._boundsCache)
							Item._clearBoundsCache(other);
					}
				}
			}
		},

		_getBounds: function(items, matrix, options) {
			var x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2,
				nonscaling = false;
			options = options || {};
			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];
				if (item._visible && !item.isEmpty(true)) {
					var bounds = item._getCachedBounds(
						matrix && matrix.appended(item._matrix), options, true),
						rect = bounds.rect;
					x1 = Math.min(rect.x, x1);
					y1 = Math.min(rect.y, y1);
					x2 = Math.max(rect.x + rect.width, x2);
					y2 = Math.max(rect.y + rect.height, y2);
					if (bounds.nonscaling)
						nonscaling = true;
				}
			}
			return {
				rect: isFinite(x1)
					? new Rectangle(x1, y1, x2 - x1, y2 - y1)
					: new Rectangle(),
				nonscaling: nonscaling
			};
		}
	}

}), {
	beans: true,

	_decompose: function() {
		return this._applyMatrix
			? null
			: this._decomposed || (this._decomposed = this._matrix.decompose());
	},

	getRotation: function() {
		var decomposed = this._decompose();
		return decomposed ? decomposed.rotation : 0;
	},

	setRotation: function(rotation) {
		var current = this.getRotation();
		if (current != null && rotation != null) {
			var decomposed = this._decomposed;
			this.rotate(rotation - current);
			if (decomposed) {
				decomposed.rotation = rotation;
				this._decomposed = decomposed;
			}
		}
	},

	getScaling: function() {
		var decomposed = this._decompose(),
			s = decomposed && decomposed.scaling;
		return new LinkedPoint(s ? s.x : 1, s ? s.y : 1, this, 'setScaling');
	},

	setScaling: function() {
		var current = this.getScaling(),
			scaling = Point.read(arguments, 0, { clone: true, readNull: true });
		if (current && scaling && !current.equals(scaling)) {
			var rotation = this.getRotation(),
				decomposed = this._decomposed,
				matrix = new Matrix(),
				isZero = Numerical.isZero;
			if (isZero(current.x) || isZero(current.y)) {
				matrix.translate(decomposed.translation);
				if (rotation) {
					matrix.rotate(rotation);
				}
				matrix.scale(scaling.x, scaling.y);
				this._matrix.set(matrix);
			} else {
				var center = this.getPosition(true);
				matrix.translate(center);
				if (rotation)
					matrix.rotate(rotation);
				matrix.scale(scaling.x / current.x, scaling.y / current.y);
				if (rotation)
					matrix.rotate(-rotation);
				matrix.translate(center.negate());
				this.transform(matrix);
			}
			if (decomposed) {
				decomposed.scaling = scaling;
				this._decomposed = decomposed;
			}
		}
	},

	getMatrix: function() {
		return this._matrix;
	},

	setMatrix: function() {
		var matrix = this._matrix;
		matrix.set.apply(matrix, arguments);
	},

	getGlobalMatrix: function(_dontClone) {
		var matrix = this._globalMatrix;
		if (matrix) {
			var parent = this._parent;
			var parents = [];
			while (parent) {
				if (!parent._globalMatrix) {
					matrix = null;
					for (var i = 0, l = parents.length; i < l; i++) {
						parents[i]._globalMatrix = null;
					}
					break;
				}
				parents.push(parent);
				parent = parent._parent;
			}
		}
		if (!matrix) {
			matrix = this._globalMatrix = this._matrix.clone();
			var parent = this._parent;
			if (parent)
				matrix.prepend(parent.getGlobalMatrix(true));
		}
		return _dontClone ? matrix : matrix.clone();
	},

	getViewMatrix: function() {
		return this.getGlobalMatrix().prepend(this.getView()._matrix);
	},

	getApplyMatrix: function() {
		return this._applyMatrix;
	},

	setApplyMatrix: function(apply) {
		if (this._applyMatrix = this._canApplyMatrix && !!apply)
			this.transform(null, true);
	},

	getTransformContent: '#getApplyMatrix',
	setTransformContent: '#setApplyMatrix',
}, {
	getProject: function() {
		return this._project;
	},

	_setProject: function(project, installEvents) {
		if (this._project !== project) {
			if (this._project)
				this._installEvents(false);
			this._project = project;
			var children = this._children;
			for (var i = 0, l = children && children.length; i < l; i++)
				children[i]._setProject(project);
			installEvents = true;
		}
		if (installEvents)
			this._installEvents(true);
	},

	getView: function() {
		return this._project._view;
	},

	_installEvents: function _installEvents(install) {
		_installEvents.base.call(this, install);
		var children = this._children;
		for (var i = 0, l = children && children.length; i < l; i++)
			children[i]._installEvents(install);
	},

	getLayer: function() {
		var parent = this;
		while (parent = parent._parent) {
			if (parent instanceof Layer)
				return parent;
		}
		return null;
	},

	getParent: function() {
		return this._parent;
	},

	setParent: function(item) {
		return item.addChild(this);
	},

	_getOwner: '#getParent',

	getChildren: function() {
		return this._children;
	},

	setChildren: function(items) {
		this.removeChildren();
		this.addChildren(items);
	},

	getFirstChild: function() {
		return this._children && this._children[0] || null;
	},

	getLastChild: function() {
		return this._children && this._children[this._children.length - 1]
				|| null;
	},

	getNextSibling: function() {
		var owner = this._getOwner();
		return owner && owner._children[this._index + 1] || null;
	},

	getPreviousSibling: function() {
		var owner = this._getOwner();
		return owner && owner._children[this._index - 1] || null;
	},

	getIndex: function() {
		return this._index;
	},

	equals: function(item) {
		return item === this || item && this._class === item._class
				&& this._style.equals(item._style)
				&& this._matrix.equals(item._matrix)
				&& this._locked === item._locked
				&& this._visible === item._visible
				&& this._blendMode === item._blendMode
				&& this._opacity === item._opacity
				&& this._clipMask === item._clipMask
				&& this._guide === item._guide
				&& this._equals(item)
				|| false;
	},

	_equals: function(item) {
		return Base.equals(this._children, item._children);
	},

	clone: function(options) {
		var copy = new this.constructor(Item.NO_INSERT),
			children = this._children,
			insert = Base.pick(options ? options.insert : undefined,
					options === undefined || options === true),
			deep = Base.pick(options ? options.deep : undefined, true);
		if (children)
			copy.copyAttributes(this);
		if (!children || deep)
			copy.copyContent(this);
		if (!children)
			copy.copyAttributes(this);
		if (insert)
			copy.insertAbove(this);
		var name = this._name,
			parent = this._parent;
		if (name && parent) {
			var children = parent._children,
				orig = name,
				i = 1;
			while (children[name])
				name = orig + ' ' + (i++);
			if (name !== orig)
				copy.setName(name);
		}
		return copy;
	},

	copyContent: function(source) {
		var children = source._children;
		for (var i = 0, l = children && children.length; i < l; i++) {
			this.addChild(children[i].clone(false), true);
		}
	},

	copyAttributes: function(source, excludeMatrix) {
		this.setStyle(source._style);
		var keys = ['_locked', '_visible', '_blendMode', '_opacity',
				'_clipMask', '_guide'];
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i];
			if (source.hasOwnProperty(key))
				this[key] = source[key];
		}
		if (!excludeMatrix)
			this._matrix.set(source._matrix, true);
		this.setApplyMatrix(source._applyMatrix);
		this.setPivot(source._pivot);
		this.setSelection(source._selection);
		var data = source._data,
			name = source._name;
		this._data = data ? Base.clone(data) : null;
		if (name)
			this.setName(name);
	},

	rasterize: function(resolution, insert) {
		var bounds = this.getStrokeBounds(),
			scale = (resolution || this.getView().getResolution()) / 72,
			topLeft = bounds.getTopLeft().floor(),
			bottomRight = bounds.getBottomRight().ceil(),
			size = new Size(bottomRight.subtract(topLeft)),
			raster = new Raster(Item.NO_INSERT);
		if (!size.isZero()) {
			var canvas = CanvasProvider.getCanvas(size.multiply(scale)),
				ctx = canvas.getContext('2d'),
				matrix = new Matrix().scale(scale).translate(topLeft.negate());
			ctx.save();
			matrix.applyToContext(ctx);
			this.draw(ctx, new Base({ matrices: [matrix] }));
			ctx.restore();
			raster.setCanvas(canvas);
		}
		raster.transform(new Matrix().translate(topLeft.add(size.divide(2)))
				.scale(1 / scale));
		if (insert === undefined || insert)
			raster.insertAbove(this);
		return raster;
	},

	contains: function() {
		var matrix = this._matrix;
		return (
			matrix.isInvertible() &&
			!!this._contains(matrix._inverseTransform(Point.read(arguments)))
		);
	},

	_contains: function(point) {
		var children = this._children;
		if (children) {
			for (var i = children.length - 1; i >= 0; i--) {
				if (children[i].contains(point))
					return true;
			}
			return false;
		}
		return point.isInside(this.getInternalBounds());
	},

	isInside: function() {
		return Rectangle.read(arguments).contains(this.getBounds());
	},

	_asPathItem: function() {
		return new Path.Rectangle({
			rectangle: this.getInternalBounds(),
			matrix: this._matrix,
			insert: false,
		});
	},

	intersects: function(item, _matrix) {
		if (!(item instanceof Item))
			return false;
		return this._asPathItem().getIntersections(item._asPathItem(), null,
				_matrix, true).length > 0;
	}
},
new function() {
	function hitTest() {
		var args = arguments;
		return this._hitTest(
				Point.read(args),
				HitResult.getOptions(args));
	}

	function hitTestAll() {
		var args = arguments,
			point = Point.read(args),
			options = HitResult.getOptions(args),
			all = [];
		this._hitTest(point, new Base({ all: all }, options));
		return all;
	}

	function hitTestChildren(point, options, viewMatrix, _exclude) {
		var children = this._children;
		if (children) {
			for (var i = children.length - 1; i >= 0; i--) {
				var child = children[i];
				var res = child !== _exclude && child._hitTest(point, options,
						viewMatrix);
				if (res && !options.all)
					return res;
			}
		}
		return null;
	}

	Project.inject({
		hitTest: hitTest,
		hitTestAll: hitTestAll,
		_hitTest: hitTestChildren
	});

	return {
		hitTest: hitTest,
		hitTestAll: hitTestAll,
		_hitTestChildren: hitTestChildren,
	};
}, {

	_hitTest: function(point, options, parentViewMatrix) {
		if (this._locked || !this._visible || this._guide && !options.guides
				|| this.isEmpty()) {
			return null;
		}

		var matrix = this._matrix,
			viewMatrix = parentViewMatrix
					? parentViewMatrix.appended(matrix)
					: this.getGlobalMatrix().prepend(this.getView()._matrix),
			tolerance = Math.max(options.tolerance, 1e-12),
			tolerancePadding = options._tolerancePadding = new Size(
					Path._getStrokePadding(tolerance,
						matrix._shiftless().invert()));
		point = matrix._inverseTransform(point);
		if (!point || !this._children &&
			!this.getBounds({ internal: true, stroke: true, handle: true })
				.expand(tolerancePadding.multiply(2))._containsPoint(point)) {
			return null;
		}

		var checkSelf = !(options.guides && !this._guide
				|| options.selected && !this.isSelected()
				|| options.type && options.type !== Base.hyphenate(this._class)
				|| options.class && !(this instanceof options.class)),
			match = options.match,
			that = this,
			bounds,
			res;

		function filter(hit) {
			if (hit && match && !match(hit))
				hit = null;
			if (hit && options.all)
				options.all.push(hit);
			return hit;
		}

		function checkPoint(type, part) {
			var pt = part ? bounds['get' + part]() : that.getPosition();
			if (point.subtract(pt).divide(tolerancePadding).length <= 1) {
				return new HitResult(type, that, {
					name: part ? Base.hyphenate(part) : type,
					point: pt
				});
			}
		}

		var checkPosition = options.position,
			checkCenter = options.center,
			checkBounds = options.bounds;
		if (checkSelf && this._parent
				&& (checkPosition || checkCenter || checkBounds)) {
			if (checkCenter || checkBounds) {
				bounds = this.getInternalBounds();
			}
			res = checkPosition && checkPoint('position') ||
					checkCenter && checkPoint('center', 'Center');
			if (!res && checkBounds) {
				var points = [
					'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
					'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'
				];
				for (var i = 0; i < 8 && !res; i++) {
					res = checkPoint('bounds', points[i]);
				}
			}
			res = filter(res);
		}

		if (!res) {
			res = this._hitTestChildren(point, options, viewMatrix)
				|| checkSelf
					&& filter(this._hitTestSelf(point, options, viewMatrix,
						this.getStrokeScaling() ? null
							: viewMatrix._shiftless().invert()))
				|| null;
		}
		if (res && res.point) {
			res.point = matrix.transform(res.point);
		}
		return res;
	},

	_hitTestSelf: function(point, options) {
		if (options.fill && this.hasFill() && this._contains(point))
			return new HitResult('fill', this);
	},

	matches: function(name, compare) {
		function matchObject(obj1, obj2) {
			for (var i in obj1) {
				if (obj1.hasOwnProperty(i)) {
					var val1 = obj1[i],
						val2 = obj2[i];
					if (Base.isPlainObject(val1) && Base.isPlainObject(val2)) {
						if (!matchObject(val1, val2))
							return false;
					} else if (!Base.equals(val1, val2)) {
						return false;
					}
				}
			}
			return true;
		}
		var type = typeof name;
		if (type === 'object') {
			for (var key in name) {
				if (name.hasOwnProperty(key) && !this.matches(key, name[key]))
					return false;
			}
			return true;
		} else if (type === 'function') {
			return name(this);
		} else if (name === 'match') {
			return compare(this);
		} else {
			var value = /^(empty|editable)$/.test(name)
					? this['is' + Base.capitalize(name)]()
					: name === 'type'
						? Base.hyphenate(this._class)
						: this[name];
			if (name === 'class') {
				if (typeof compare === 'function')
					return this instanceof compare;
				value = this._class;
			}
			if (typeof compare === 'function') {
				return !!compare(value);
			} else if (compare) {
				if (compare.test) {
					return compare.test(value);
				} else if (Base.isPlainObject(compare)) {
					return matchObject(compare, value);
				}
			}
			return Base.equals(value, compare);
		}
	},

	getItems: function(options) {
		return Item._getItems(this, options, this._matrix);
	},

	getItem: function(options) {
		return Item._getItems(this, options, this._matrix, null, true)[0]
				|| null;
	},

	statics: {
		_getItems: function _getItems(item, options, matrix, param, firstOnly) {
			if (!param) {
				var obj = typeof options === 'object' && options,
					overlapping = obj && obj.overlapping,
					inside = obj && obj.inside,
					bounds = overlapping || inside,
					rect = bounds && Rectangle.read([bounds]);
				param = {
					items: [],
					recursive: obj && obj.recursive !== false,
					inside: !!inside,
					overlapping: !!overlapping,
					rect: rect,
					path: overlapping && new Path.Rectangle({
						rectangle: rect,
						insert: false
					})
				};
				if (obj) {
					options = Base.filter({}, options, {
						recursive: true, inside: true, overlapping: true
					});
				}
			}
			var children = item._children,
				items = param.items,
				rect = param.rect;
			matrix = rect && (matrix || new Matrix());
			for (var i = 0, l = children && children.length; i < l; i++) {
				var child = children[i],
					childMatrix = matrix && matrix.appended(child._matrix),
					add = true;
				if (rect) {
					var bounds = child.getBounds(childMatrix);
					if (!rect.intersects(bounds))
						continue;
					if (!(rect.contains(bounds)
							|| param.overlapping && (bounds.contains(rect)
								|| param.path.intersects(child, childMatrix))))
						add = false;
				}
				if (add && child.matches(options)) {
					items.push(child);
					if (firstOnly)
						break;
				}
				if (param.recursive !== false) {
					_getItems(child, options, childMatrix, param, firstOnly);
				}
				if (firstOnly && items.length > 0)
					break;
			}
			return items;
		}
	}
}, {

	importJSON: function(json) {
		var res = Base.importJSON(json, this);
		return res !== this ? this.addChild(res) : res;
	},

	addChild: function(item) {
		return this.insertChild(undefined, item);
	},

	insertChild: function(index, item) {
		var res = item ? this.insertChildren(index, [item]) : null;
		return res && res[0];
	},

	addChildren: function(items) {
		return this.insertChildren(this._children.length, items);
	},

	insertChildren: function(index, items) {
		var children = this._children;
		if (children && items && items.length > 0) {
			items = Base.slice(items);
			var inserted = {};
			for (var i = items.length - 1; i >= 0; i--) {
				var item = items[i],
					id = item && item._id;
				if (!item || inserted[id]) {
					items.splice(i, 1);
				} else {
					item._remove(false, true);
					inserted[id] = true;
				}
			}
			Base.splice(children, items, index, 0);
			var project = this._project,
				notifySelf = project._changes;
			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i],
					name = item._name;
				item._parent = this;
				item._setProject(project, true);
				if (name)
					item.setName(name);
				if (notifySelf)
					item._changed(5);
			}
			this._changed(11);
		} else {
			items = null;
		}
		return items;
	},

	_insertItem: '#insertChild',

	_insertAt: function(item, offset) {
		var owner = item && item._getOwner(),
			res = item !== this && owner ? this : null;
		if (res) {
			res._remove(false, true);
			owner._insertItem(item._index + offset, res);
		}
		return res;
	},

	insertAbove: function(item) {
		return this._insertAt(item, 1);
	},

	insertBelow: function(item) {
		return this._insertAt(item, 0);
	},

	sendToBack: function() {
		var owner = this._getOwner();
		return owner ? owner._insertItem(0, this) : null;
	},

	bringToFront: function() {
		var owner = this._getOwner();
		return owner ? owner._insertItem(undefined, this) : null;
	},

	appendTop: '#addChild',

	appendBottom: function(item) {
		return this.insertChild(0, item);
	},

	moveAbove: '#insertAbove',

	moveBelow: '#insertBelow',

	addTo: function(owner) {
		return owner._insertItem(undefined, this);
	},

	copyTo: function(owner) {
		return this.clone(false).addTo(owner);
	},

	reduce: function(options) {
		var children = this._children;
		if (children && children.length === 1) {
			var child = children[0].reduce(options);
			if (this._parent) {
				child.insertAbove(this);
				this.remove();
			} else {
				child.remove();
			}
			return child;
		}
		return this;
	},

	_removeNamed: function() {
		var owner = this._getOwner();
		if (owner) {
			var children = owner._children,
				namedChildren = owner._namedChildren,
				name = this._name,
				namedArray = namedChildren[name],
				index = namedArray ? namedArray.indexOf(this) : -1;
			if (index !== -1) {
				if (children[name] == this)
					delete children[name];
				namedArray.splice(index, 1);
				if (namedArray.length) {
					children[name] = namedArray[0];
				} else {
					delete namedChildren[name];
				}
			}
		}
	},

	_remove: function(notifySelf, notifyParent) {
		var owner = this._getOwner(),
			project = this._project,
			index = this._index;
		if (this._style)
			this._style._dispose();
		if (owner) {
			if (this._name)
				this._removeNamed();
			if (index != null) {
				if (project._activeLayer === this)
					project._activeLayer = this.getNextSibling()
							|| this.getPreviousSibling();
				Base.splice(owner._children, null, index, 1);
			}
			this._installEvents(false);
			if (notifySelf && project._changes)
				this._changed(5);
			if (notifyParent)
				owner._changed(11, this);
			this._parent = null;
			return true;
		}
		return false;
	},

	remove: function() {
		return this._remove(true, true);
	},

	replaceWith: function(item) {
		var ok = item && item.insertBelow(this);
		if (ok)
			this.remove();
		return ok;
	},

	removeChildren: function(start, end) {
		if (!this._children)
			return null;
		start = start || 0;
		end = Base.pick(end, this._children.length);
		var removed = Base.splice(this._children, null, start, end - start);
		for (var i = removed.length - 1; i >= 0; i--) {
			removed[i]._remove(true, false);
		}
		if (removed.length > 0)
			this._changed(11);
		return removed;
	},

	clear: '#removeChildren',

	reverseChildren: function() {
		if (this._children) {
			this._children.reverse();
			for (var i = 0, l = this._children.length; i < l; i++)
				this._children[i]._index = i;
			this._changed(11);
		}
	},

	isEmpty: function(recursively) {
		var children = this._children;
		var numChildren = children ? children.length : 0;
		if (recursively) {
			for (var i = 0; i < numChildren; i++) {
				if (!children[i].isEmpty(recursively)) {
					return false;
				}
			}
			return true;
		}
		return !numChildren;
	},

	isEditable: function() {
		var item = this;
		while (item) {
			if (!item._visible || item._locked)
				return false;
			item = item._parent;
		}
		return true;
	},

	hasFill: function() {
		return this.getStyle().hasFill();
	},

	hasStroke: function() {
		return this.getStyle().hasStroke();
	},

	hasShadow: function() {
		return this.getStyle().hasShadow();
	},

	_getOrder: function(item) {
		function getList(item) {
			var list = [];
			do {
				list.unshift(item);
			} while (item = item._parent);
			return list;
		}
		var list1 = getList(this),
			list2 = getList(item);
		for (var i = 0, l = Math.min(list1.length, list2.length); i < l; i++) {
			if (list1[i] != list2[i]) {
				return list1[i]._index < list2[i]._index ? 1 : -1;
			}
		}
		return 0;
	},

	hasChildren: function() {
		return this._children && this._children.length > 0;
	},

	isInserted: function() {
		return this._parent ? this._parent.isInserted() : false;
	},

	isAbove: function(item) {
		return this._getOrder(item) === -1;
	},

	isBelow: function(item) {
		return this._getOrder(item) === 1;
	},

	isParent: function(item) {
		return this._parent === item;
	},

	isChild: function(item) {
		return item && item._parent === this;
	},

	isDescendant: function(item) {
		var parent = this;
		while (parent = parent._parent) {
			if (parent === item)
				return true;
		}
		return false;
	},

	isAncestor: function(item) {
		return item ? item.isDescendant(this) : false;
	},

	isSibling: function(item) {
		return this._parent === item._parent;
	},

	isGroupedWith: function(item) {
		var parent = this._parent;
		while (parent) {
			if (parent._parent
				&& /^(Group|Layer|CompoundPath)$/.test(parent._class)
				&& item.isDescendant(parent))
					return true;
			parent = parent._parent;
		}
		return false;
	},

}, Base.each(['rotate', 'scale', 'shear', 'skew'], function(key) {
	var rotate = key === 'rotate';
	this[key] = function() {
		var args = arguments,
			value = (rotate ? Base : Point).read(args),
			center = Point.read(args, 0, { readNull: true });
		return this.transform(new Matrix()[key](value,
				center || this.getPosition(true)));
	};
}, {
	translate: function() {
		var mx = new Matrix();
		return this.transform(mx.translate.apply(mx, arguments));
	},

	transform: function(matrix, _applyRecursively, _setApplyMatrix) {
		var _matrix = this._matrix,
			transformMatrix = matrix && !matrix.isIdentity(),
			applyMatrix = (
				_setApplyMatrix && this._canApplyMatrix ||
				this._applyMatrix && (
					transformMatrix || !_matrix.isIdentity() ||
					_applyRecursively && this._children
				)
			);
		if (!transformMatrix && !applyMatrix)
			return this;
		if (transformMatrix) {
			if (!matrix.isInvertible() && _matrix.isInvertible())
				_matrix._backup = _matrix.getValues();
			_matrix.prepend(matrix, true);
			var style = this._style,
				fillColor = style.getFillColor(true),
				strokeColor = style.getStrokeColor(true);
			if (fillColor)
				fillColor.transform(matrix);
			if (strokeColor)
				strokeColor.transform(matrix);
		}

		if (applyMatrix && (applyMatrix = this._transformContent(
				_matrix, _applyRecursively, _setApplyMatrix))) {
			var pivot = this._pivot;
			if (pivot)
				_matrix._transformPoint(pivot, pivot, true);
			_matrix.reset(true);
			if (_setApplyMatrix && this._canApplyMatrix)
				this._applyMatrix = true;
		}
		var bounds = this._bounds,
			position = this._position;
		if (transformMatrix || applyMatrix) {
			this._changed(25);
		}
		var decomp = transformMatrix && bounds && matrix.decompose();
		if (decomp && decomp.skewing.isZero() && decomp.rotation % 90 === 0) {
			for (var key in bounds) {
				var cache = bounds[key];
				if (cache.nonscaling) {
					delete bounds[key];
				} else if (applyMatrix || !cache.internal) {
					var rect = cache.rect;
					matrix._transformBounds(rect, rect);
				}
			}
			this._bounds = bounds;
			var cached = bounds[this._getBoundsCacheKey(
				this._boundsOptions || {})];
			if (cached) {
				this._position = this._getPositionFromBounds(cached.rect);
			}
		} else if (transformMatrix && position && this._pivot) {
			this._position = matrix._transformPoint(position, position);
		}
		return this;
	},

	_transformContent: function(matrix, applyRecursively, setApplyMatrix) {
		var children = this._children;
		if (children) {
			for (var i = 0, l = children.length; i < l; i++) {
				children[i].transform(matrix, applyRecursively, setApplyMatrix);
			}
			return true;
		}
	},

	globalToLocal: function() {
		return this.getGlobalMatrix(true)._inverseTransform(
				Point.read(arguments));
	},

	localToGlobal: function() {
		return this.getGlobalMatrix(true)._transformPoint(
				Point.read(arguments));
	},

	parentToLocal: function() {
		return this._matrix._inverseTransform(Point.read(arguments));
	},

	localToParent: function() {
		return this._matrix._transformPoint(Point.read(arguments));
	},

	fitBounds: function(rectangle, fill) {
		rectangle = Rectangle.read(arguments);
		var bounds = this.getBounds(),
			itemRatio = bounds.height / bounds.width,
			rectRatio = rectangle.height / rectangle.width,
			scale = (fill ? itemRatio > rectRatio : itemRatio < rectRatio)
					? rectangle.width / bounds.width
					: rectangle.height / bounds.height,
			newBounds = new Rectangle(new Point(),
					new Size(bounds.width * scale, bounds.height * scale));
		newBounds.setCenter(rectangle.getCenter());
		this.setBounds(newBounds);
	}
}), {

	_setStyles: function(ctx, param, viewMatrix) {
		var style = this._style,
			matrix = this._matrix;
		if (style.hasFill()) {
			ctx.fillStyle = style.getFillColor().toCanvasStyle(ctx, matrix);
		}
		if (style.hasStroke()) {
			ctx.strokeStyle = style.getStrokeColor().toCanvasStyle(ctx, matrix);
			ctx.lineWidth = style.getStrokeWidth();
			var strokeJoin = style.getStrokeJoin(),
				strokeCap = style.getStrokeCap(),
				miterLimit = style.getMiterLimit();
			if (strokeJoin)
				ctx.lineJoin = strokeJoin;
			if (strokeCap)
				ctx.lineCap = strokeCap;
			if (miterLimit)
				ctx.miterLimit = miterLimit;
			if (paper.support.nativeDash) {
				var dashArray = style.getDashArray(),
					dashOffset = style.getDashOffset();
				if (dashArray && dashArray.length) {
					if ('setLineDash' in ctx) {
						ctx.setLineDash(dashArray);
						ctx.lineDashOffset = dashOffset;
					} else {
						ctx.mozDash = dashArray;
						ctx.mozDashOffset = dashOffset;
					}
				}
			}
		}
		if (style.hasShadow()) {
			var pixelRatio = param.pixelRatio || 1,
				mx = viewMatrix._shiftless().prepend(
					new Matrix().scale(pixelRatio, pixelRatio)),
				blur = mx.transform(new Point(style.getShadowBlur(), 0)),
				offset = mx.transform(this.getShadowOffset());
			ctx.shadowColor = style.getShadowColor().toCanvasStyle(ctx);
			ctx.shadowBlur = blur.getLength();
			ctx.shadowOffsetX = offset.x;
			ctx.shadowOffsetY = offset.y;
		}
	},

	draw: function(ctx, param, parentStrokeMatrix) {
		var updateVersion = this._updateVersion = this._project._updateVersion;
		if (!this._visible || this._opacity === 0)
			return;
		var matrices = param.matrices,
			viewMatrix = param.viewMatrix,
			matrix = this._matrix,
			globalMatrix = matrices[matrices.length - 1].appended(matrix);
		if (!globalMatrix.isInvertible())
			return;

		viewMatrix = viewMatrix ? viewMatrix.appended(globalMatrix)
				: globalMatrix;

		matrices.push(globalMatrix);
		if (param.updateMatrix) {
			this._globalMatrix = globalMatrix;
		}

		var blendMode = this._blendMode,
			opacity = Numerical.clamp(this._opacity, 0, 1),
			normalBlend = blendMode === 'normal',
			nativeBlend = BlendMode.nativeModes[blendMode],
			direct = normalBlend && opacity === 1
					|| param.dontStart
					|| param.clip
					|| (nativeBlend || normalBlend && opacity < 1)
						&& this._canComposite(),
			pixelRatio = param.pixelRatio || 1,
			mainCtx, itemOffset, prevOffset;
		if (!direct) {
			var bounds = this.getStrokeBounds(viewMatrix);
			if (!bounds.width || !bounds.height) {
				matrices.pop();
				return;
			}
			prevOffset = param.offset;
			itemOffset = param.offset = bounds.getTopLeft().floor();
			mainCtx = ctx;
			ctx = CanvasProvider.getContext(bounds.getSize().ceil().add(1)
					.multiply(pixelRatio));
			if (pixelRatio !== 1)
				ctx.scale(pixelRatio, pixelRatio);
		}
		ctx.save();
		var strokeMatrix = parentStrokeMatrix
				? parentStrokeMatrix.appended(matrix)
				: this._canScaleStroke && !this.getStrokeScaling(true)
					&& viewMatrix,
			clip = !direct && param.clipItem,
			transform = !strokeMatrix || clip;
		if (direct) {
			ctx.globalAlpha = opacity;
			if (nativeBlend)
				ctx.globalCompositeOperation = blendMode;
		} else if (transform) {
			ctx.translate(-itemOffset.x, -itemOffset.y);
		}
		if (transform) {
			(direct ? matrix : viewMatrix).applyToContext(ctx);
		}
		if (clip) {
			param.clipItem.draw(ctx, param.extend({ clip: true }));
		}
		if (strokeMatrix) {
			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			var offset = param.offset;
			if (offset)
				ctx.translate(-offset.x, -offset.y);
		}
		this._draw(ctx, param, viewMatrix, strokeMatrix);
		ctx.restore();
		matrices.pop();
		if (param.clip && !param.dontFinish) {
			ctx.clip(this.getFillRule());
		}
		if (!direct) {
			BlendMode.process(blendMode, ctx, mainCtx, opacity,
					itemOffset.subtract(prevOffset).multiply(pixelRatio));
			CanvasProvider.release(ctx);
			param.offset = prevOffset;
		}
	},

	_isUpdated: function(updateVersion) {
		var parent = this._parent;
		if (parent instanceof CompoundPath)
			return parent._isUpdated(updateVersion);
		var updated = this._updateVersion === updateVersion;
		if (!updated && parent && parent._visible
				&& parent._isUpdated(updateVersion)) {
			this._updateVersion = updateVersion;
			updated = true;
		}
		return updated;
	},

	_drawSelection: function(ctx, matrix, size, selectionItems, updateVersion) {
		var selection = this._selection,
			itemSelected = selection & 1,
			boundsSelected = selection & 2
					|| itemSelected && this._selectBounds,
			positionSelected = selection & 4;
		if (!this._drawSelected)
			itemSelected = false;
		if ((itemSelected || boundsSelected || positionSelected)
				&& this._isUpdated(updateVersion)) {
			var layer,
				color = this.getSelectedColor(true) || (layer = this.getLayer())
					&& layer.getSelectedColor(true),
				mx = matrix.appended(this.getGlobalMatrix(true)),
				half = size / 2;
			ctx.strokeStyle = ctx.fillStyle = color
					? color.toCanvasStyle(ctx) : '#009dec';
			if (itemSelected)
				this._drawSelected(ctx, mx, selectionItems);
			if (positionSelected) {
				var pos = this.getPosition(true),
					parent = this._parent,
					point = parent ? parent.localToGlobal(pos) : pos,
					x = point.x,
					y = point.y;
				ctx.beginPath();
				ctx.arc(x, y, half, 0, Math.PI * 2, true);
				ctx.stroke();
				var deltas = [[0, -1], [1, 0], [0, 1], [-1, 0]],
					start = half,
					end = size + 1;
				for (var i = 0; i < 4; i++) {
					var delta = deltas[i],
						dx = delta[0],
						dy = delta[1];
					ctx.moveTo(x + dx * start, y + dy * start);
					ctx.lineTo(x + dx * end, y + dy * end);
					ctx.stroke();
				}
			}
			if (boundsSelected) {
				var coords = mx._transformCorners(this.getInternalBounds());
				ctx.beginPath();
				for (var i = 0; i < 8; i++) {
					ctx[!i ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
				}
				ctx.closePath();
				ctx.stroke();
				for (var i = 0; i < 8; i++) {
					ctx.fillRect(coords[i] - half, coords[++i] - half,
							size, size);
				}
			}
		}
	},

	_canComposite: function() {
		return false;
	}
}, Base.each(['down', 'drag', 'up', 'move'], function(key) {
	this['removeOn' + Base.capitalize(key)] = function() {
		var hash = {};
		hash[key] = true;
		return this.removeOn(hash);
	};
}, {

	removeOn: function(obj) {
		for (var name in obj) {
			if (obj[name]) {
				var key = 'mouse' + name,
					project = this._project,
					sets = project._removeSets = project._removeSets || {};
				sets[key] = sets[key] || {};
				sets[key][this._id] = this;
			}
		}
		return this;
	}
}), {
	tween: function(from, to, options) {
		if (!options) {
			options = to;
			to = from;
			from = null;
			if (!options) {
				options = to;
				to = null;
			}
		}
		var easing = options && options.easing,
			start = options && options.start,
			duration = options != null && (
				typeof options === 'number' ? options : options.duration
			),
			tween = new Tween(this, from, to, duration, easing, start);
		function onFrame(event) {
			tween._handleFrame(event.time * 1000);
			if (!tween.running) {
				this.off('frame', onFrame);
			}
		}
		if (duration) {
			this.on('frame', onFrame);
		}
		return tween;
	},

	tweenTo: function(to, options) {
		return this.tween(null, to, options);
	},

	tweenFrom: function(from, options) {
		return this.tween(from, null, options);
	}
});

var Group = Item.extend({
	_class: 'Group',
	_selectBounds: false,
	_selectChildren: true,
	_serializeFields: {
		children: []
	},

	initialize: function Group(arg) {
		this._children = [];
		this._namedChildren = {};
		if (!this._initialize(arg))
			this.addChildren(Array.isArray(arg) ? arg : arguments);
	},

	_changed: function _changed(flags) {
		_changed.base.call(this, flags);
		if (flags & 2050) {
			this._clipItem = undefined;
		}
	},

	_getClipItem: function() {
		var clipItem = this._clipItem;
		if (clipItem === undefined) {
			clipItem = null;
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++) {
				if (children[i]._clipMask) {
					clipItem = children[i];
					break;
				}
			}
			this._clipItem = clipItem;
		}
		return clipItem;
	},

	isClipped: function() {
		return !!this._getClipItem();
	},

	setClipped: function(clipped) {
		var child = this.getFirstChild();
		if (child)
			child.setClipMask(clipped);
	},

	_getBounds: function _getBounds(matrix, options) {
		var clipItem = this._getClipItem();
		return clipItem
			? clipItem._getCachedBounds(clipItem._matrix.prepended(matrix),
				Base.set({}, options, { stroke: false }))
			: _getBounds.base.call(this, matrix, options);
	},

	_hitTestChildren: function _hitTestChildren(point, options, viewMatrix) {
		var clipItem = this._getClipItem();
		return (!clipItem || clipItem.contains(point))
				&& _hitTestChildren.base.call(this, point, options, viewMatrix,
					clipItem);
	},

	_draw: function(ctx, param) {
		var clip = param.clip,
			clipItem = !clip && this._getClipItem();
		param = param.extend({ clipItem: clipItem, clip: false });
		if (clip) {
			ctx.beginPath();
			param.dontStart = param.dontFinish = true;
		} else if (clipItem) {
			clipItem.draw(ctx, param.extend({ clip: true }));
		}
		var children = this._children;
		for (var i = 0, l = children.length; i < l; i++) {
			var item = children[i];
			if (item !== clipItem)
				item.draw(ctx, param);
		}
	}
});

var Layer = Group.extend({
	_class: 'Layer',

	initialize: function Layer() {
		Group.apply(this, arguments);
	},

	_getOwner: function() {
		return this._parent || this._index != null && this._project;
	},

	isInserted: function isInserted() {
		return this._parent ? isInserted.base.call(this) : this._index != null;
	},

	activate: function() {
		this._project._activeLayer = this;
	},

	_hitTestSelf: function() {
	}
});

var Shape = Item.extend({
	_class: 'Shape',
	_applyMatrix: false,
	_canApplyMatrix: false,
	_canScaleStroke: true,
	_serializeFields: {
		type: null,
		size: null,
		radius: null
	},

	initialize: function Shape(props, point) {
		this._initialize(props, point);
	},

	_equals: function(item) {
		return this._type === item._type
			&& this._size.equals(item._size)
			&& Base.equals(this._radius, item._radius);
	},

	copyContent: function(source) {
		this.setType(source._type);
		this.setSize(source._size);
		this.setRadius(source._radius);
	},

	getType: function() {
		return this._type;
	},

	setType: function(type) {
		this._type = type;
	},

	getShape: '#getType',
	setShape: '#setType',

	getSize: function() {
		var size = this._size;
		return new LinkedSize(size.width, size.height, this, 'setSize');
	},

	setSize: function() {
		var size = Size.read(arguments);
		if (!this._size) {
			this._size = size.clone();
		} else if (!this._size.equals(size)) {
			var type = this._type,
				width = size.width,
				height = size.height;
			if (type === 'rectangle') {
				this._radius.set(Size.min(this._radius, size.divide(2).abs()));
			} else if (type === 'circle') {
				width = height = (width + height) / 2;
				this._radius = width / 2;
			} else if (type === 'ellipse') {
				this._radius._set(width / 2, height / 2);
			}
			this._size._set(width, height);
			this._changed(9);
		}
	},

	getRadius: function() {
		var rad = this._radius;
		return this._type === 'circle'
				? rad
				: new LinkedSize(rad.width, rad.height, this, 'setRadius');
	},

	setRadius: function(radius) {
		var type = this._type;
		if (type === 'circle') {
			if (radius === this._radius)
				return;
			var size = radius * 2;
			this._radius = radius;
			this._size._set(size, size);
		} else {
			radius = Size.read(arguments);
			if (!this._radius) {
				this._radius = radius.clone();
			} else {
				if (this._radius.equals(radius))
					return;
				this._radius.set(radius);
				if (type === 'rectangle') {
					var size = Size.max(this._size, radius.multiply(2));
					this._size.set(size);
				} else if (type === 'ellipse') {
					this._size._set(radius.width * 2, radius.height * 2);
				}
			}
		}
		this._changed(9);
	},

	isEmpty: function() {
		return false;
	},

	toPath: function(insert) {
		var path = new Path[Base.capitalize(this._type)]({
			center: new Point(),
			size: this._size,
			radius: this._radius,
			insert: false
		});
		path.copyAttributes(this);
		if (paper.settings.applyMatrix)
			path.setApplyMatrix(true);
		if (insert === undefined || insert)
			path.insertAbove(this);
		return path;
	},

	toShape: '#clone',

	_asPathItem: function() {
		return this.toPath(false);
	},

	_draw: function(ctx, param, viewMatrix, strokeMatrix) {
		var style = this._style,
			hasFill = style.hasFill(),
			hasStroke = style.hasStroke(),
			dontPaint = param.dontFinish || param.clip,
			untransformed = !strokeMatrix;
		if (hasFill || hasStroke || dontPaint) {
			var type = this._type,
				radius = this._radius,
				isCircle = type === 'circle';
			if (!param.dontStart)
				ctx.beginPath();
			if (untransformed && isCircle) {
				ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
			} else {
				var rx = isCircle ? radius : radius.width,
					ry = isCircle ? radius : radius.height,
					size = this._size,
					width = size.width,
					height = size.height;
				if (untransformed && type === 'rectangle' && rx === 0 && ry === 0) {
					ctx.rect(-width / 2, -height / 2, width, height);
				} else {
					var x = width / 2,
						y = height / 2,
						kappa = 1 - 0.5522847498307936,
						cx = rx * kappa,
						cy = ry * kappa,
						c = [
							-x, -y + ry,
							-x, -y + cy,
							-x + cx, -y,
							-x + rx, -y,
							x - rx, -y,
							x - cx, -y,
							x, -y + cy,
							x, -y + ry,
							x, y - ry,
							x, y - cy,
							x - cx, y,
							x - rx, y,
							-x + rx, y,
							-x + cx, y,
							-x, y - cy,
							-x, y - ry
						];
					if (strokeMatrix)
						strokeMatrix.transform(c, c, 32);
					ctx.moveTo(c[0], c[1]);
					ctx.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
					if (x !== rx)
						ctx.lineTo(c[8], c[9]);
					ctx.bezierCurveTo(c[10], c[11], c[12], c[13], c[14], c[15]);
					if (y !== ry)
						ctx.lineTo(c[16], c[17]);
					ctx.bezierCurveTo(c[18], c[19], c[20], c[21], c[22], c[23]);
					if (x !== rx)
						ctx.lineTo(c[24], c[25]);
					ctx.bezierCurveTo(c[26], c[27], c[28], c[29], c[30], c[31]);
				}
			}
			ctx.closePath();
		}
		if (!dontPaint && (hasFill || hasStroke)) {
			this._setStyles(ctx, param, viewMatrix);
			if (hasFill) {
				ctx.fill(style.getFillRule());
				ctx.shadowColor = 'rgba(0,0,0,0)';
			}
			if (hasStroke)
				ctx.stroke();
		}
	},

	_canComposite: function() {
		return !(this.hasFill() && this.hasStroke());
	},

	_getBounds: function(matrix, options) {
		var rect = new Rectangle(this._size).setCenter(0, 0),
			style = this._style,
			strokeWidth = options.stroke && style.hasStroke()
					&& style.getStrokeWidth();
		if (matrix)
			rect = matrix._transformBounds(rect);
		return strokeWidth
				? rect.expand(Path._getStrokePadding(strokeWidth,
					this._getStrokeMatrix(matrix, options)))
				: rect;
	}
},
new function() {
	function getCornerCenter(that, point, expand) {
		var radius = that._radius;
		if (!radius.isZero()) {
			var halfSize = that._size.divide(2);
			for (var q = 1; q <= 4; q++) {
				var dir = new Point(q > 1 && q < 4 ? -1 : 1, q > 2 ? -1 : 1),
					corner = dir.multiply(halfSize),
					center = corner.subtract(dir.multiply(radius)),
					rect = new Rectangle(
							expand ? corner.add(dir.multiply(expand)) : corner,
							center);
				if (rect.contains(point))
					return { point: center, quadrant: q };
			}
		}
	}

	function isOnEllipseStroke(point, radius, padding, quadrant) {
		var vector = point.divide(radius);
		return (!quadrant || vector.isInQuadrant(quadrant)) &&
				vector.subtract(vector.normalize()).multiply(radius)
					.divide(padding).length <= 1;
	}

	return {
		_contains: function _contains(point) {
			if (this._type === 'rectangle') {
				var center = getCornerCenter(this, point);
				return center
						? point.subtract(center.point).divide(this._radius)
							.getLength() <= 1
						: _contains.base.call(this, point);
			} else {
				return point.divide(this.size).getLength() <= 0.5;
			}
		},

		_hitTestSelf: function _hitTestSelf(point, options, viewMatrix,
				strokeMatrix) {
			var hit = false,
				style = this._style,
				hitStroke = options.stroke && style.hasStroke(),
				hitFill = options.fill && style.hasFill();
			if (hitStroke || hitFill) {
				var type = this._type,
					radius = this._radius,
					strokeRadius = hitStroke ? style.getStrokeWidth() / 2 : 0,
					strokePadding = options._tolerancePadding.add(
						Path._getStrokePadding(strokeRadius,
							!style.getStrokeScaling() && strokeMatrix));
				if (type === 'rectangle') {
					var padding = strokePadding.multiply(2),
						center = getCornerCenter(this, point, padding);
					if (center) {
						hit = isOnEllipseStroke(point.subtract(center.point),
								radius, strokePadding, center.quadrant);
					} else {
						var rect = new Rectangle(this._size).setCenter(0, 0),
							outer = rect.expand(padding),
							inner = rect.expand(padding.negate());
						hit = outer._containsPoint(point)
								&& !inner._containsPoint(point);
					}
				} else {
					hit = isOnEllipseStroke(point, radius, strokePadding);
				}
			}
			return hit ? new HitResult(hitStroke ? 'stroke' : 'fill', this)
					: _hitTestSelf.base.apply(this, arguments);
		}
	};
}, {

statics: new function() {
	function createShape(type, point, size, radius, args) {
		var item = Base.create(Shape.prototype);
		item._type = type;
		item._size = size;
		item._radius = radius;
		item._initialize(Base.getNamed(args), point);
		return item;
	}

	return {
		Circle: function() {
			var args = arguments,
				center = Point.readNamed(args, 'center'),
				radius = Base.readNamed(args, 'radius');
			return createShape('circle', center, new Size(radius * 2), radius,
					args);
		},

		Rectangle: function() {
			var args = arguments,
				rect = Rectangle.readNamed(args, 'rectangle'),
				radius = Size.min(Size.readNamed(args, 'radius'),
						rect.getSize(true).divide(2));
			return createShape('rectangle', rect.getCenter(true),
					rect.getSize(true), radius, args);
		},

		Ellipse: function() {
			var args = arguments,
				ellipse = Shape._readEllipse(args),
				radius = ellipse.radius;
			return createShape('ellipse', ellipse.center, radius.multiply(2),
					radius, args);
		},

		_readEllipse: function(args) {
			var center,
				radius;
			if (Base.hasNamed(args, 'radius')) {
				center = Point.readNamed(args, 'center');
				radius = Size.readNamed(args, 'radius');
			} else {
				var rect = Rectangle.readNamed(args, 'rectangle');
				center = rect.getCenter(true);
				radius = rect.getSize(true).divide(2);
			}
			return { center: center, radius: radius };
		}
	};
}});

var Raster = Item.extend({
	_class: 'Raster',
	_applyMatrix: false,
	_canApplyMatrix: false,
	_boundsOptions: { stroke: false, handle: false },
	_serializeFields: {
		crossOrigin: null,
		source: null
	},
	_prioritize: ['crossOrigin'],
	_smoothing: true,
	beans: true,

	initialize: function Raster(source, position) {
		if (!this._initialize(source,
				position !== undefined && Point.read(arguments))) {
			var image,
				type = typeof source,
				object = type === 'string'
					? document.getElementById(source)
					: type  === 'object'
						? source
						: null;
			if (object && object !== Item.NO_INSERT) {
				if (object.getContext || object.naturalHeight != null) {
					image = object;
				} else if (object) {
					var size = Size.read(arguments);
					if (!size.isZero()) {
						image = CanvasProvider.getCanvas(size);
					}
				}
			}
			if (image) {
				this.setImage(image);
			} else {
				this.setSource(source);
			}
		}
		if (!this._size) {
			this._size = new Size();
			this._loaded = false;
		}
	},

	_equals: function(item) {
		return this.getSource() === item.getSource();
	},

	copyContent: function(source) {
		var image = source._image,
			canvas = source._canvas;
		if (image) {
			this._setImage(image);
		} else if (canvas) {
			var copyCanvas = CanvasProvider.getCanvas(source._size);
			copyCanvas.getContext('2d').drawImage(canvas, 0, 0);
			this._setImage(copyCanvas);
		}
		this._crossOrigin = source._crossOrigin;
	},

	getSize: function() {
		var size = this._size;
		return new LinkedSize(size ? size.width : 0, size ? size.height : 0,
				this, 'setSize');
	},

	setSize: function() {
		var size = Size.read(arguments);
		if (!size.equals(this._size)) {
			if (size.width > 0 && size.height > 0) {
				var element = this.getElement();
				this._setImage(CanvasProvider.getCanvas(size));
				if (element)
					this.getContext(true).drawImage(element, 0, 0,
							size.width, size.height);
			} else {
				if (this._canvas)
					CanvasProvider.release(this._canvas);
				this._size = size.clone();
			}
		}
	},

	getWidth: function() {
		return this._size ? this._size.width : 0;
	},

	setWidth: function(width) {
		this.setSize(width, this.getHeight());
	},

	getHeight: function() {
		return this._size ? this._size.height : 0;
	},

	setHeight: function(height) {
		this.setSize(this.getWidth(), height);
	},

	getLoaded: function() {
		return this._loaded;
	},

	isEmpty: function() {
		var size = this._size;
		return !size || size.width === 0 && size.height === 0;
	},

	getResolution: function() {
		var matrix = this._matrix,
			orig = new Point(0, 0).transform(matrix),
			u = new Point(1, 0).transform(matrix).subtract(orig),
			v = new Point(0, 1).transform(matrix).subtract(orig);
		return new Size(
			72 / u.getLength(),
			72 / v.getLength()
		);
	},

	getPpi: '#getResolution',

	getImage: function() {
		return this._image;
	},

	setImage: function(image) {
		var that = this;

		function emit(event) {
			var view = that.getView(),
				type = event && event.type || 'load';
			if (view && that.responds(type)) {
				paper = view._scope;
				that.emit(type, new Event(event));
			}
		}

		this._setImage(image);
		if (this._loaded) {
			setTimeout(emit, 0);
		} else if (image) {
			DomEvent.add(image, {
				load: function(event) {
					that._setImage(image);
					emit(event);
				},
				error: emit
			});
		}
	},

	_setImage: function(image) {
		if (this._canvas)
			CanvasProvider.release(this._canvas);
		if (image && image.getContext) {
			this._image = null;
			this._canvas = image;
			this._loaded = true;
		} else {
			this._image = image;
			this._canvas = null;
			this._loaded = !!(image && image.src && image.complete);
		}
		this._size = new Size(
				image ? image.naturalWidth || image.width : 0,
				image ? image.naturalHeight || image.height : 0);
		this._context = null;
		this._changed(1033);
	},

	getCanvas: function() {
		if (!this._canvas) {
			var ctx = CanvasProvider.getContext(this._size);
			try {
				if (this._image)
					ctx.drawImage(this._image, 0, 0);
				this._canvas = ctx.canvas;
			} catch (e) {
				CanvasProvider.release(ctx);
			}
		}
		return this._canvas;
	},

	setCanvas: '#setImage',

	getContext: function(_change) {
		if (!this._context)
			this._context = this.getCanvas().getContext('2d');
		if (_change) {
			this._image = null;
			this._changed(1025);
		}
		return this._context;
	},

	setContext: function(context) {
		this._context = context;
	},

	getSource: function() {
		var image = this._image;
		return image && image.src || this.toDataURL();
	},

	setSource: function(src) {
		var image = new self.Image(),
			crossOrigin = this._crossOrigin;
		if (crossOrigin)
			image.crossOrigin = crossOrigin;
		if (src)
			image.src = src;
		this.setImage(image);
	},

	getCrossOrigin: function() {
		var image = this._image;
		return image && image.crossOrigin || this._crossOrigin || '';
	},

	setCrossOrigin: function(crossOrigin) {
		this._crossOrigin = crossOrigin;
		var image = this._image;
		if (image)
			image.crossOrigin = crossOrigin;
	},

	getSmoothing: function() {
		return this._smoothing;
	},

	setSmoothing: function(smoothing) {
		this._smoothing = smoothing;
		this._changed(257);
	},

	getElement: function() {
		return this._canvas || this._loaded && this._image;
	}
}, {
	beans: false,

	getSubCanvas: function() {
		var rect = Rectangle.read(arguments),
			ctx = CanvasProvider.getContext(rect.getSize());
		ctx.drawImage(this.getCanvas(), rect.x, rect.y,
				rect.width, rect.height, 0, 0, rect.width, rect.height);
		return ctx.canvas;
	},

	getSubRaster: function() {
		var rect = Rectangle.read(arguments),
			raster = new Raster(Item.NO_INSERT);
		raster._setImage(this.getSubCanvas(rect));
		raster.translate(rect.getCenter().subtract(this.getSize().divide(2)));
		raster._matrix.prepend(this._matrix);
		raster.insertAbove(this);
		return raster;
	},

	toDataURL: function() {
		var image = this._image,
			src = image && image.src;
		if (/^data:/.test(src))
			return src;
		var canvas = this.getCanvas();
		return canvas ? canvas.toDataURL.apply(canvas, arguments) : null;
	},

	drawImage: function(image ) {
		var point = Point.read(arguments, 1);
		this.getContext(true).drawImage(image, point.x, point.y);
	},

	getAverageColor: function(object) {
		var bounds, path;
		if (!object) {
			bounds = this.getBounds();
		} else if (object instanceof PathItem) {
			path = object;
			bounds = object.getBounds();
		} else if (typeof object === 'object') {
			if ('width' in object) {
				bounds = new Rectangle(object);
			} else if ('x' in object) {
				bounds = new Rectangle(object.x - 0.5, object.y - 0.5, 1, 1);
			}
		}
		if (!bounds)
			return null;
		var sampleSize = 32,
			width = Math.min(bounds.width, sampleSize),
			height = Math.min(bounds.height, sampleSize);
		var ctx = Raster._sampleContext;
		if (!ctx) {
			ctx = Raster._sampleContext = CanvasProvider.getContext(
					new Size(sampleSize));
		} else {
			ctx.clearRect(0, 0, sampleSize + 1, sampleSize + 1);
		}
		ctx.save();
		var matrix = new Matrix()
				.scale(width / bounds.width, height / bounds.height)
				.translate(-bounds.x, -bounds.y);
		matrix.applyToContext(ctx);
		if (path)
			path.draw(ctx, new Base({ clip: true, matrices: [matrix] }));
		this._matrix.applyToContext(ctx);
		var element = this.getElement(),
			size = this._size;
		if (element)
			ctx.drawImage(element, -size.width / 2, -size.height / 2);
		ctx.restore();
		var pixels = ctx.getImageData(0.5, 0.5, Math.ceil(width),
				Math.ceil(height)).data,
			channels = [0, 0, 0],
			total = 0;
		for (var i = 0, l = pixels.length; i < l; i += 4) {
			var alpha = pixels[i + 3];
			total += alpha;
			alpha /= 255;
			channels[0] += pixels[i] * alpha;
			channels[1] += pixels[i + 1] * alpha;
			channels[2] += pixels[i + 2] * alpha;
		}
		for (var i = 0; i < 3; i++)
			channels[i] /= total;
		return total ? Color.read(channels) : null;
	},

	getPixel: function() {
		var point = Point.read(arguments);
		var data = this.getContext().getImageData(point.x, point.y, 1, 1).data;
		return new Color('rgb', [data[0] / 255, data[1] / 255, data[2] / 255],
				data[3] / 255);
	},

	setPixel: function() {
		var args = arguments,
			point = Point.read(args),
			color = Color.read(args),
			components = color._convert('rgb'),
			alpha = color._alpha,
			ctx = this.getContext(true),
			imageData = ctx.createImageData(1, 1),
			data = imageData.data;
		data[0] = components[0] * 255;
		data[1] = components[1] * 255;
		data[2] = components[2] * 255;
		data[3] = alpha != null ? alpha * 255 : 255;
		ctx.putImageData(imageData, point.x, point.y);
	},

	clear: function() {
		var size = this._size;
		this.getContext(true).clearRect(0, 0, size.width + 1, size.height + 1);
	},

	createImageData: function() {
		var size = Size.read(arguments);
		return this.getContext().createImageData(size.width, size.height);
	},

	getImageData: function() {
		var rect = Rectangle.read(arguments);
		if (rect.isEmpty())
			rect = new Rectangle(this._size);
		return this.getContext().getImageData(rect.x, rect.y,
				rect.width, rect.height);
	},

	setImageData: function(data ) {
		var point = Point.read(arguments, 1);
		this.getContext(true).putImageData(data, point.x, point.y);
	},

	_getBounds: function(matrix, options) {
		var rect = new Rectangle(this._size).setCenter(0, 0);
		return matrix ? matrix._transformBounds(rect) : rect;
	},

	_hitTestSelf: function(point) {
		if (this._contains(point)) {
			var that = this;
			return new HitResult('pixel', that, {
				offset: point.add(that._size.divide(2)).round(),
				color: {
					get: function() {
						return that.getPixel(this.offset);
					}
				}
			});
		}
	},

	_draw: function(ctx, param, viewMatrix) {
		var element = this.getElement();
		if (element && element.width > 0 && element.height > 0) {
			ctx.globalAlpha = Numerical.clamp(this._opacity, 0, 1);

			this._setStyles(ctx, param, viewMatrix);

			DomElement.setPrefixed(
				ctx, 'imageSmoothingEnabled', this._smoothing
			);

			ctx.drawImage(element,
					-this._size.width / 2, -this._size.height / 2);
		}
	},

	_canComposite: function() {
		return true;
	}
});

var SymbolItem = Item.extend({
	_class: 'SymbolItem',
	_applyMatrix: false,
	_canApplyMatrix: false,
	_boundsOptions: { stroke: true },
	_serializeFields: {
		symbol: null
	},

	initialize: function SymbolItem(arg0, arg1) {
		if (!this._initialize(arg0,
				arg1 !== undefined && Point.read(arguments, 1)))
			this.setDefinition(arg0 instanceof SymbolDefinition ?
					arg0 : new SymbolDefinition(arg0));
	},

	_equals: function(item) {
		return this._definition === item._definition;
	},

	copyContent: function(source) {
		this.setDefinition(source._definition);
	},

	getDefinition: function() {
		return this._definition;
	},

	setDefinition: function(definition) {
		this._definition = definition;
		this._changed(9);
	},

	getSymbol: '#getDefinition',
	setSymbol: '#setDefinition',

	isEmpty: function() {
		return this._definition._item.isEmpty();
	},

	_getBounds: function(matrix, options) {
		var item = this._definition._item;
		return item._getCachedBounds(item._matrix.prepended(matrix), options);
	},

	_hitTestSelf: function(point, options, viewMatrix) {
		var opts = options.extend({ all: false });
		var res = this._definition._item._hitTest(point, opts, viewMatrix);
		if (res)
			res.item = this;
		return res;
	},

	_draw: function(ctx, param) {
		this._definition._item.draw(ctx, param);
	}

});

var SymbolDefinition = Base.extend({
	_class: 'SymbolDefinition',

	initialize: function SymbolDefinition(item, dontCenter) {
		this._id = UID.get();
		this.project = paper.project;
		if (item)
			this.setItem(item, dontCenter);
	},

	_serialize: function(options, dictionary) {
		return dictionary.add(this, function() {
			return Base.serialize([this._class, this._item],
					options, false, dictionary);
		});
	},

	_changed: function(flags) {
		if (flags & 8)
			Item._clearBoundsCache(this);
		if (flags & 1)
			this.project._changed(flags);
	},

	getItem: function() {
		return this._item;
	},

	setItem: function(item, _dontCenter) {
		if (item._symbol)
			item = item.clone();
		if (this._item)
			this._item._symbol = null;
		this._item = item;
		item.remove();
		item.setSelected(false);
		if (!_dontCenter)
			item.setPosition(new Point());
		item._symbol = this;
		this._changed(9);
	},

	getDefinition: '#getItem',
	setDefinition: '#setItem',

	place: function(position) {
		return new SymbolItem(this, position);
	},

	clone: function() {
		return new SymbolDefinition(this._item.clone(false));
	},

	equals: function(symbol) {
		return symbol === this
				|| symbol && this._item.equals(symbol._item)
				|| false;
	}
});

var HitResult = Base.extend({
	_class: 'HitResult',

	initialize: function HitResult(type, item, values) {
		this.type = type;
		this.item = item;
		if (values)
			this.inject(values);
	},

	statics: {
		getOptions: function(args) {
			var options = args && Base.read(args);
			return new Base({
				type: null,
				tolerance: paper.settings.hitTolerance,
				fill: !options,
				stroke: !options,
				segments: !options,
				handles: false,
				ends: false,
				position: false,
				center: false,
				bounds: false,
				guides: false,
				selected: false
			}, options);
		}
	}
});

var Segment = Base.extend({
	_class: 'Segment',
	beans: true,
	_selection: 0,

	initialize: function Segment(arg0, arg1, arg2, arg3, arg4, arg5) {
		var count = arguments.length,
			point, handleIn, handleOut, selection;
		if (count > 0) {
			if (arg0 == null || typeof arg0 === 'object') {
				if (count === 1 && arg0 && 'point' in arg0) {
					point = arg0.point;
					handleIn = arg0.handleIn;
					handleOut = arg0.handleOut;
					selection = arg0.selection;
				} else {
					point = arg0;
					handleIn = arg1;
					handleOut = arg2;
					selection = arg3;
				}
			} else {
				point = [ arg0, arg1 ];
				handleIn = arg2 !== undefined ? [ arg2, arg3 ] : null;
				handleOut = arg4 !== undefined ? [ arg4, arg5 ] : null;
			}
		}
		new SegmentPoint(point, this, '_point');
		new SegmentPoint(handleIn, this, '_handleIn');
		new SegmentPoint(handleOut, this, '_handleOut');
		if (selection)
			this.setSelection(selection);
	},

	_serialize: function(options, dictionary) {
		var point = this._point,
			selection = this._selection,
			obj = selection || this.hasHandles()
					? [point, this._handleIn, this._handleOut]
					: point;
		if (selection)
			obj.push(selection);
		return Base.serialize(obj, options, true, dictionary);
	},

	_changed: function(point) {
		var path = this._path;
		if (!path)
			return;
		var curves = path._curves,
			index = this._index,
			curve;
		if (curves) {
			if ((!point || point === this._point || point === this._handleIn)
					&& (curve = index > 0 ? curves[index - 1] : path._closed
						? curves[curves.length - 1] : null))
				curve._changed();
			if ((!point || point === this._point || point === this._handleOut)
					&& (curve = curves[index]))
				curve._changed();
		}
		path._changed(41);
	},

	getPoint: function() {
		return this._point;
	},

	setPoint: function() {
		this._point.set(Point.read(arguments));
	},

	getHandleIn: function() {
		return this._handleIn;
	},

	setHandleIn: function() {
		this._handleIn.set(Point.read(arguments));
	},

	getHandleOut: function() {
		return this._handleOut;
	},

	setHandleOut: function() {
		this._handleOut.set(Point.read(arguments));
	},

	hasHandles: function() {
		return !this._handleIn.isZero() || !this._handleOut.isZero();
	},

	isSmooth: function() {
		var handleIn = this._handleIn,
			handleOut = this._handleOut;
		return !handleIn.isZero() && !handleOut.isZero()
				&& handleIn.isCollinear(handleOut);
	},

	clearHandles: function() {
		this._handleIn._set(0, 0);
		this._handleOut._set(0, 0);
	},

	getSelection: function() {
		return this._selection;
	},

	setSelection: function(selection) {
		var oldSelection = this._selection,
			path = this._path;
		this._selection = selection = selection || 0;
		if (path && selection !== oldSelection) {
			path._updateSelection(this, oldSelection, selection);
			path._changed(257);
		}
	},

	_changeSelection: function(flag, selected) {
		var selection = this._selection;
		this.setSelection(selected ? selection | flag : selection & ~flag);
	},

	isSelected: function() {
		return !!(this._selection & 7);
	},

	setSelected: function(selected) {
		this._changeSelection(7, selected);
	},

	getIndex: function() {
		return this._index !== undefined ? this._index : null;
	},

	getPath: function() {
		return this._path || null;
	},

	getCurve: function() {
		var path = this._path,
			index = this._index;
		if (path) {
			if (index > 0 && !path._closed
					&& index === path._segments.length - 1)
				index--;
			return path.getCurves()[index] || null;
		}
		return null;
	},

	getLocation: function() {
		var curve = this.getCurve();
		return curve
				? new CurveLocation(curve, this === curve._segment1 ? 0 : 1)
				: null;
	},

	getNext: function() {
		var segments = this._path && this._path._segments;
		return segments && (segments[this._index + 1]
				|| this._path._closed && segments[0]) || null;
	},

	smooth: function(options, _first, _last) {
		var opts = options || {},
			type = opts.type,
			factor = opts.factor,
			prev = this.getPrevious(),
			next = this.getNext(),
			p0 = (prev || this)._point,
			p1 = this._point,
			p2 = (next || this)._point,
			d1 = p0.getDistance(p1),
			d2 = p1.getDistance(p2);
		if (!type || type === 'catmull-rom') {
			var a = factor === undefined ? 0.5 : factor,
				d1_a = Math.pow(d1, a),
				d1_2a = d1_a * d1_a,
				d2_a = Math.pow(d2, a),
				d2_2a = d2_a * d2_a;
			if (!_first && prev) {
				var A = 2 * d2_2a + 3 * d2_a * d1_a + d1_2a,
					N = 3 * d2_a * (d2_a + d1_a);
				this.setHandleIn(N !== 0
					? new Point(
						(d2_2a * p0._x + A * p1._x - d1_2a * p2._x) / N - p1._x,
						(d2_2a * p0._y + A * p1._y - d1_2a * p2._y) / N - p1._y)
					: new Point());
			}
			if (!_last && next) {
				var A = 2 * d1_2a + 3 * d1_a * d2_a + d2_2a,
					N = 3 * d1_a * (d1_a + d2_a);
				this.setHandleOut(N !== 0
					? new Point(
						(d1_2a * p2._x + A * p1._x - d2_2a * p0._x) / N - p1._x,
						(d1_2a * p2._y + A * p1._y - d2_2a * p0._y) / N - p1._y)
					: new Point());
			}
		} else if (type === 'geometric') {
			if (prev && next) {
				var vector = p0.subtract(p2),
					t = factor === undefined ? 0.4 : factor,
					k = t * d1 / (d1 + d2);
				if (!_first)
					this.setHandleIn(vector.multiply(k));
				if (!_last)
					this.setHandleOut(vector.multiply(k - t));
			}
		} else {
			throw new Error('Smoothing method \'' + type + '\' not supported.');
		}
	},

	getPrevious: function() {
		var segments = this._path && this._path._segments;
		return segments && (segments[this._index - 1]
				|| this._path._closed && segments[segments.length - 1]) || null;
	},

	isFirst: function() {
		return !this._index;
	},

	isLast: function() {
		var path = this._path;
		return path && this._index === path._segments.length - 1 || false;
	},

	reverse: function() {
		var handleIn = this._handleIn,
			handleOut = this._handleOut,
			tmp = handleIn.clone();
		handleIn.set(handleOut);
		handleOut.set(tmp);
	},

	reversed: function() {
		return new Segment(this._point, this._handleOut, this._handleIn);
	},

	remove: function() {
		return this._path ? !!this._path.removeSegment(this._index) : false;
	},

	clone: function() {
		return new Segment(this._point, this._handleIn, this._handleOut);
	},

	equals: function(segment) {
		return segment === this || segment && this._class === segment._class
				&& this._point.equals(segment._point)
				&& this._handleIn.equals(segment._handleIn)
				&& this._handleOut.equals(segment._handleOut)
				|| false;
	},

	toString: function() {
		var parts = [ 'point: ' + this._point ];
		if (!this._handleIn.isZero())
			parts.push('handleIn: ' + this._handleIn);
		if (!this._handleOut.isZero())
			parts.push('handleOut: ' + this._handleOut);
		return '{ ' + parts.join(', ') + ' }';
	},

	transform: function(matrix) {
		this._transformCoordinates(matrix, new Array(6), true);
		this._changed();
	},

	interpolate: function(from, to, factor) {
		var u = 1 - factor,
			v = factor,
			point1 = from._point,
			point2 = to._point,
			handleIn1 = from._handleIn,
			handleIn2 = to._handleIn,
			handleOut2 = to._handleOut,
			handleOut1 = from._handleOut;
		this._point._set(
				u * point1._x + v * point2._x,
				u * point1._y + v * point2._y, true);
		this._handleIn._set(
				u * handleIn1._x + v * handleIn2._x,
				u * handleIn1._y + v * handleIn2._y, true);
		this._handleOut._set(
				u * handleOut1._x + v * handleOut2._x,
				u * handleOut1._y + v * handleOut2._y, true);
		this._changed();
	},

	_transformCoordinates: function(matrix, coords, change) {
		var point = this._point,
			handleIn = !change || !this._handleIn.isZero()
					? this._handleIn : null,
			handleOut = !change || !this._handleOut.isZero()
					? this._handleOut : null,
			x = point._x,
			y = point._y,
			i = 2;
		coords[0] = x;
		coords[1] = y;
		if (handleIn) {
			coords[i++] = handleIn._x + x;
			coords[i++] = handleIn._y + y;
		}
		if (handleOut) {
			coords[i++] = handleOut._x + x;
			coords[i++] = handleOut._y + y;
		}
		if (matrix) {
			matrix._transformCoordinates(coords, coords, i / 2);
			x = coords[0];
			y = coords[1];
			if (change) {
				point._x = x;
				point._y = y;
				i = 2;
				if (handleIn) {
					handleIn._x = coords[i++] - x;
					handleIn._y = coords[i++] - y;
				}
				if (handleOut) {
					handleOut._x = coords[i++] - x;
					handleOut._y = coords[i++] - y;
				}
			} else {
				if (!handleIn) {
					coords[i++] = x;
					coords[i++] = y;
				}
				if (!handleOut) {
					coords[i++] = x;
					coords[i++] = y;
				}
			}
		}
		return coords;
	}
});

var SegmentPoint = Point.extend({
	initialize: function SegmentPoint(point, owner, key) {
		var x, y,
			selected;
		if (!point) {
			x = y = 0;
		} else if ((x = point[0]) !== undefined) {
			y = point[1];
		} else {
			var pt = point;
			if ((x = pt.x) === undefined) {
				pt = Point.read(arguments);
				x = pt.x;
			}
			y = pt.y;
			selected = pt.selected;
		}
		this._x = x;
		this._y = y;
		this._owner = owner;
		owner[key] = this;
		if (selected)
			this.setSelected(true);
	},

	_set: function(x, y) {
		this._x = x;
		this._y = y;
		this._owner._changed(this);
		return this;
	},

	getX: function() {
		return this._x;
	},

	setX: function(x) {
		this._x = x;
		this._owner._changed(this);
	},

	getY: function() {
		return this._y;
	},

	setY: function(y) {
		this._y = y;
		this._owner._changed(this);
	},

	isZero: function() {
		var isZero = Numerical.isZero;
		return isZero(this._x) && isZero(this._y);
	},

	isSelected: function() {
		return !!(this._owner._selection & this._getSelection());
	},

	setSelected: function(selected) {
		this._owner._changeSelection(this._getSelection(), selected);
	},

	_getSelection: function() {
		var owner = this._owner;
		return this === owner._point ? 1
			: this === owner._handleIn ? 2
			: this === owner._handleOut ? 4
			: 0;
	}
});

var Curve = Base.extend({
	_class: 'Curve',
	beans: true,

	initialize: function Curve(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
		var count = arguments.length,
			seg1, seg2,
			point1, point2,
			handle1, handle2;
		if (count === 3) {
			this._path = arg0;
			seg1 = arg1;
			seg2 = arg2;
		} else if (!count) {
			seg1 = new Segment();
			seg2 = new Segment();
		} else if (count === 1) {
			if ('segment1' in arg0) {
				seg1 = new Segment(arg0.segment1);
				seg2 = new Segment(arg0.segment2);
			} else if ('point1' in arg0) {
				point1 = arg0.point1;
				handle1 = arg0.handle1;
				handle2 = arg0.handle2;
				point2 = arg0.point2;
			} else if (Array.isArray(arg0)) {
				point1 = [arg0[0], arg0[1]];
				point2 = [arg0[6], arg0[7]];
				handle1 = [arg0[2] - arg0[0], arg0[3] - arg0[1]];
				handle2 = [arg0[4] - arg0[6], arg0[5] - arg0[7]];
			}
		} else if (count === 2) {
			seg1 = new Segment(arg0);
			seg2 = new Segment(arg1);
		} else if (count === 4) {
			point1 = arg0;
			handle1 = arg1;
			handle2 = arg2;
			point2 = arg3;
		} else if (count === 8) {
			point1 = [arg0, arg1];
			point2 = [arg6, arg7];
			handle1 = [arg2 - arg0, arg3 - arg1];
			handle2 = [arg4 - arg6, arg5 - arg7];
		}
		this._segment1 = seg1 || new Segment(point1, null, handle1);
		this._segment2 = seg2 || new Segment(point2, handle2, null);
	},

	_serialize: function(options, dictionary) {
		return Base.serialize(this.hasHandles()
				? [this.getPoint1(), this.getHandle1(), this.getHandle2(),
					this.getPoint2()]
				: [this.getPoint1(), this.getPoint2()],
				options, true, dictionary);
	},

	_changed: function() {
		this._length = this._bounds = undefined;
	},

	clone: function() {
		return new Curve(this._segment1, this._segment2);
	},

	toString: function() {
		var parts = [ 'point1: ' + this._segment1._point ];
		if (!this._segment1._handleOut.isZero())
			parts.push('handle1: ' + this._segment1._handleOut);
		if (!this._segment2._handleIn.isZero())
			parts.push('handle2: ' + this._segment2._handleIn);
		parts.push('point2: ' + this._segment2._point);
		return '{ ' + parts.join(', ') + ' }';
	},

	classify: function() {
		return Curve.classify(this.getValues());
	},

	remove: function() {
		var removed = false;
		if (this._path) {
			var segment2 = this._segment2,
				handleOut = segment2._handleOut;
			removed = segment2.remove();
			if (removed)
				this._segment1._handleOut.set(handleOut);
		}
		return removed;
	},

	getPoint1: function() {
		return this._segment1._point;
	},

	setPoint1: function() {
		this._segment1._point.set(Point.read(arguments));
	},

	getPoint2: function() {
		return this._segment2._point;
	},

	setPoint2: function() {
		this._segment2._point.set(Point.read(arguments));
	},

	getHandle1: function() {
		return this._segment1._handleOut;
	},

	setHandle1: function() {
		this._segment1._handleOut.set(Point.read(arguments));
	},

	getHandle2: function() {
		return this._segment2._handleIn;
	},

	setHandle2: function() {
		this._segment2._handleIn.set(Point.read(arguments));
	},

	getSegment1: function() {
		return this._segment1;
	},

	getSegment2: function() {
		return this._segment2;
	},

	getPath: function() {
		return this._path;
	},

	getIndex: function() {
		return this._segment1._index;
	},

	getNext: function() {
		var curves = this._path && this._path._curves;
		return curves && (curves[this._segment1._index + 1]
				|| this._path._closed && curves[0]) || null;
	},

	getPrevious: function() {
		var curves = this._path && this._path._curves;
		return curves && (curves[this._segment1._index - 1]
				|| this._path._closed && curves[curves.length - 1]) || null;
	},

	isFirst: function() {
		return !this._segment1._index;
	},

	isLast: function() {
		var path = this._path;
		return path && this._segment1._index === path._curves.length - 1
				|| false;
	},

	isSelected: function() {
		return this.getPoint1().isSelected()
				&& this.getHandle1().isSelected()
				&& this.getHandle2().isSelected()
				&& this.getPoint2().isSelected();
	},

	setSelected: function(selected) {
		this.getPoint1().setSelected(selected);
		this.getHandle1().setSelected(selected);
		this.getHandle2().setSelected(selected);
		this.getPoint2().setSelected(selected);
	},

	getValues: function(matrix) {
		return Curve.getValues(this._segment1, this._segment2, matrix);
	},

	getPoints: function() {
		var coords = this.getValues(),
			points = [];
		for (var i = 0; i < 8; i += 2)
			points.push(new Point(coords[i], coords[i + 1]));
		return points;
	}
}, {
	getLength: function() {
		if (this._length == null)
			this._length = Curve.getLength(this.getValues(), 0, 1);
		return this._length;
	},

	getArea: function() {
		return Curve.getArea(this.getValues());
	},

	getLine: function() {
		return new Line(this._segment1._point, this._segment2._point);
	},

	getPart: function(from, to) {
		return new Curve(Curve.getPart(this.getValues(), from, to));
	},

	getPartLength: function(from, to) {
		return Curve.getLength(this.getValues(), from, to);
	},

	divideAt: function(location) {
		return this.divideAtTime(location && location.curve === this
				? location.time : this.getTimeAt(location));
	},

	divideAtTime: function(time, _setHandles) {
		var tMin = 1e-8,
			tMax = 1 - tMin,
			res = null;
		if (time >= tMin && time <= tMax) {
			var parts = Curve.subdivide(this.getValues(), time),
				left = parts[0],
				right = parts[1],
				setHandles = _setHandles || this.hasHandles(),
				seg1 = this._segment1,
				seg2 = this._segment2,
				path = this._path;
			if (setHandles) {
				seg1._handleOut._set(left[2] - left[0], left[3] - left[1]);
				seg2._handleIn._set(right[4] - right[6],right[5] - right[7]);
			}
			var x = left[6], y = left[7],
				segment = new Segment(new Point(x, y),
						setHandles && new Point(left[4] - x, left[5] - y),
						setHandles && new Point(right[2] - x, right[3] - y));
			if (path) {
				path.insert(seg1._index + 1, segment);
				res = this.getNext();
			} else {
				this._segment2 = segment;
				this._changed();
				res = new Curve(segment, seg2);
			}
		}
		return res;
	},

	splitAt: function(location) {
		var path = this._path;
		return path ? path.splitAt(location) : null;
	},

	splitAtTime: function(time) {
		return this.splitAt(this.getLocationAtTime(time));
	},

	divide: function(offset, isTime) {
		return this.divideAtTime(offset === undefined ? 0.5 : isTime ? offset
				: this.getTimeAt(offset));
	},

	split: function(offset, isTime) {
		return this.splitAtTime(offset === undefined ? 0.5 : isTime ? offset
				: this.getTimeAt(offset));
	},

	reversed: function() {
		return new Curve(this._segment2.reversed(), this._segment1.reversed());
	},

	clearHandles: function() {
		this._segment1._handleOut._set(0, 0);
		this._segment2._handleIn._set(0, 0);
	},

statics: {
	getValues: function(segment1, segment2, matrix, straight) {
		var p1 = segment1._point,
			h1 = segment1._handleOut,
			h2 = segment2._handleIn,
			p2 = segment2._point,
			x1 = p1.x, y1 = p1.y,
			x2 = p2.x, y2 = p2.y,
			values = straight
				? [ x1, y1, x1, y1, x2, y2, x2, y2 ]
				: [
					x1, y1,
					x1 + h1._x, y1 + h1._y,
					x2 + h2._x, y2 + h2._y,
					x2, y2
				];
		if (matrix)
			matrix._transformCoordinates(values, values, 4);
		return values;
	},

	subdivide: function(v, t) {
		var x0 = v[0], y0 = v[1],
			x1 = v[2], y1 = v[3],
			x2 = v[4], y2 = v[5],
			x3 = v[6], y3 = v[7];
		if (t === undefined)
			t = 0.5;
		var u = 1 - t,
			x4 = u * x0 + t * x1, y4 = u * y0 + t * y1,
			x5 = u * x1 + t * x2, y5 = u * y1 + t * y2,
			x6 = u * x2 + t * x3, y6 = u * y2 + t * y3,
			x7 = u * x4 + t * x5, y7 = u * y4 + t * y5,
			x8 = u * x5 + t * x6, y8 = u * y5 + t * y6,
			x9 = u * x7 + t * x8, y9 = u * y7 + t * y8;
		return [
			[x0, y0, x4, y4, x7, y7, x9, y9],
			[x9, y9, x8, y8, x6, y6, x3, y3]
		];
	},

	getMonoCurves: function(v, dir) {
		var curves = [],
			io = dir ? 0 : 1,
			o0 = v[io + 0],
			o1 = v[io + 2],
			o2 = v[io + 4],
			o3 = v[io + 6];
		if ((o0 >= o1) === (o1 >= o2) && (o1 >= o2) === (o2 >= o3)
				|| Curve.isStraight(v)) {
			curves.push(v);
		} else {
			var a = 3 * (o1 - o2) - o0 + o3,
				b = 2 * (o0 + o2) - 4 * o1,
				c = o1 - o0,
				tMin = 1e-8,
				tMax = 1 - tMin,
				roots = [],
				n = Numerical.solveQuadratic(a, b, c, roots, tMin, tMax);
			if (!n) {
				curves.push(v);
			} else {
				roots.sort();
				var t = roots[0],
					parts = Curve.subdivide(v, t);
				curves.push(parts[0]);
				if (n > 1) {
					t = (roots[1] - t) / (1 - t);
					parts = Curve.subdivide(parts[1], t);
					curves.push(parts[0]);
				}
				curves.push(parts[1]);
			}
		}
		return curves;
	},

	solveCubic: function (v, coord, val, roots, min, max) {
		var v0 = v[coord],
			v1 = v[coord + 2],
			v2 = v[coord + 4],
			v3 = v[coord + 6],
			res = 0;
		if (  !(v0 < val && v3 < val && v1 < val && v2 < val ||
				v0 > val && v3 > val && v1 > val && v2 > val)) {
			var c = 3 * (v1 - v0),
				b = 3 * (v2 - v1) - c,
				a = v3 - v0 - c - b;
			res = Numerical.solveCubic(a, b, c, v0 - val, roots, min, max);
		}
		return res;
	},

	getTimeOf: function(v, point) {
		var p0 = new Point(v[0], v[1]),
			p3 = new Point(v[6], v[7]),
			epsilon = 1e-12,
			geomEpsilon = 1e-7,
			t = point.isClose(p0, epsilon) ? 0
			  : point.isClose(p3, epsilon) ? 1
			  : null;
		if (t === null) {
			var coords = [point.x, point.y],
				roots = [];
			for (var c = 0; c < 2; c++) {
				var count = Curve.solveCubic(v, c, coords[c], roots, 0, 1);
				for (var i = 0; i < count; i++) {
					var u = roots[i];
					if (point.isClose(Curve.getPoint(v, u), geomEpsilon))
						return u;
				}
			}
		}
		return point.isClose(p0, geomEpsilon) ? 0
			 : point.isClose(p3, geomEpsilon) ? 1
			 : null;
	},

	getNearestTime: function(v, point) {
		if (Curve.isStraight(v)) {
			var x0 = v[0], y0 = v[1],
				x3 = v[6], y3 = v[7],
				vx = x3 - x0, vy = y3 - y0,
				det = vx * vx + vy * vy;
			if (det === 0)
				return 0;
			var u = ((point.x - x0) * vx + (point.y - y0) * vy) / det;
			return u < 1e-12 ? 0
				 : u > 0.999999999999 ? 1
				 : Curve.getTimeOf(v,
					new Point(x0 + u * vx, y0 + u * vy));
		}

		var count = 100,
			minDist = Infinity,
			minT = 0;

		function refine(t) {
			if (t >= 0 && t <= 1) {
				var dist = point.getDistance(Curve.getPoint(v, t), true);
				if (dist < minDist) {
					minDist = dist;
					minT = t;
					return true;
				}
			}
		}

		for (var i = 0; i <= count; i++)
			refine(i / count);

		var step = 1 / (count * 2);
		while (step > 1e-8) {
			if (!refine(minT - step) && !refine(minT + step))
				step /= 2;
		}
		return minT;
	},

	getPart: function(v, from, to) {
		var flip = from > to;
		if (flip) {
			var tmp = from;
			from = to;
			to = tmp;
		}
		if (from > 0)
			v = Curve.subdivide(v, from)[1];
		if (to < 1)
			v = Curve.subdivide(v, (to - from) / (1 - from))[0];
		return flip
				? [v[6], v[7], v[4], v[5], v[2], v[3], v[0], v[1]]
				: v;
	},

	isFlatEnough: function(v, flatness) {
		var x0 = v[0], y0 = v[1],
			x1 = v[2], y1 = v[3],
			x2 = v[4], y2 = v[5],
			x3 = v[6], y3 = v[7],
			ux = 3 * x1 - 2 * x0 - x3,
			uy = 3 * y1 - 2 * y0 - y3,
			vx = 3 * x2 - 2 * x3 - x0,
			vy = 3 * y2 - 2 * y3 - y0;
		return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy)
				<= 16 * flatness * flatness;
	},

	getArea: function(v) {
		var x0 = v[0], y0 = v[1],
			x1 = v[2], y1 = v[3],
			x2 = v[4], y2 = v[5],
			x3 = v[6], y3 = v[7];
		return 3 * ((y3 - y0) * (x1 + x2) - (x3 - x0) * (y1 + y2)
				+ y1 * (x0 - x2) - x1 * (y0 - y2)
				+ y3 * (x2 + x0 / 3) - x3 * (y2 + y0 / 3)) / 20;
	},

	getBounds: function(v) {
		var min = v.slice(0, 2),
			max = min.slice(),
			roots = [0, 0];
		for (var i = 0; i < 2; i++)
			Curve._addBounds(v[i], v[i + 2], v[i + 4], v[i + 6],
					i, 0, min, max, roots);
		return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
	},

	_addBounds: function(v0, v1, v2, v3, coord, padding, min, max, roots) {
		function add(value, padding) {
			var left = value - padding,
				right = value + padding;
			if (left < min[coord])
				min[coord] = left;
			if (right > max[coord])
				max[coord] = right;
		}

		padding /= 2;
		var minPad = min[coord] + padding,
			maxPad = max[coord] - padding;
		if (    v0 < minPad || v1 < minPad || v2 < minPad || v3 < minPad ||
				v0 > maxPad || v1 > maxPad || v2 > maxPad || v3 > maxPad) {
			if (v1 < v0 != v1 < v3 && v2 < v0 != v2 < v3) {
				add(v0, 0);
				add(v3, 0);
			} else {
				var a = 3 * (v1 - v2) - v0 + v3,
					b = 2 * (v0 + v2) - 4 * v1,
					c = v1 - v0,
					count = Numerical.solveQuadratic(a, b, c, roots),
					tMin = 1e-8,
					tMax = 1 - tMin;
				add(v3, 0);
				for (var i = 0; i < count; i++) {
					var t = roots[i],
						u = 1 - t;
					if (tMin <= t && t <= tMax)
						add(u * u * u * v0
							+ 3 * u * u * t * v1
							+ 3 * u * t * t * v2
							+ t * t * t * v3,
							padding);
				}
			}
		}
	}
}}, Base.each(
	['getBounds', 'getStrokeBounds', 'getHandleBounds'],
	function(name) {
		this[name] = function() {
			if (!this._bounds)
				this._bounds = {};
			var bounds = this._bounds[name];
			if (!bounds) {
				bounds = this._bounds[name] = Path[name](
						[this._segment1, this._segment2], false, this._path);
			}
			return bounds.clone();
		};
	},
{

}), Base.each({
	isStraight: function(p1, h1, h2, p2) {
		if (h1.isZero() && h2.isZero()) {
			return true;
		} else {
			var v = p2.subtract(p1);
			if (v.isZero()) {
				return false;
			} else if (v.isCollinear(h1) && v.isCollinear(h2)) {
				var l = new Line(p1, p2),
					epsilon = 1e-7;
				if (l.getDistance(p1.add(h1)) < epsilon &&
					l.getDistance(p2.add(h2)) < epsilon) {
					var div = v.dot(v),
						s1 = v.dot(h1) / div,
						s2 = v.dot(h2) / div;
					return s1 >= 0 && s1 <= 1 && s2 <= 0 && s2 >= -1;
				}
			}
		}
		return false;
	},

	isLinear: function(p1, h1, h2, p2) {
		var third = p2.subtract(p1).divide(3);
		return h1.equals(third) && h2.negate().equals(third);
	}
}, function(test, name) {
	this[name] = function(epsilon) {
		var seg1 = this._segment1,
			seg2 = this._segment2;
		return test(seg1._point, seg1._handleOut, seg2._handleIn, seg2._point,
				epsilon);
	};

	this.statics[name] = function(v, epsilon) {
		var x0 = v[0], y0 = v[1],
			x3 = v[6], y3 = v[7];
		return test(
				new Point(x0, y0),
				new Point(v[2] - x0, v[3] - y0),
				new Point(v[4] - x3, v[5] - y3),
				new Point(x3, y3), epsilon);
	};
}, {
	statics: {},

	hasHandles: function() {
		return !this._segment1._handleOut.isZero()
				|| !this._segment2._handleIn.isZero();
	},

	hasLength: function(epsilon) {
		return (!this.getPoint1().equals(this.getPoint2()) || this.hasHandles())
				&& this.getLength() > (epsilon || 0);
	},

	isCollinear: function(curve) {
		return curve && this.isStraight() && curve.isStraight()
				&& this.getLine().isCollinear(curve.getLine());
	},

	isHorizontal: function() {
		return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).y)
				< 1e-8;
	},

	isVertical: function() {
		return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).x)
				< 1e-8;
	}
}), {
	beans: false,

	getLocationAt: function(offset, _isTime) {
		return this.getLocationAtTime(
				_isTime ? offset : this.getTimeAt(offset));
	},

	getLocationAtTime: function(t) {
		return t != null && t >= 0 && t <= 1
				? new CurveLocation(this, t)
				: null;
	},

	getTimeAt: function(offset, start) {
		return Curve.getTimeAt(this.getValues(), offset, start);
	},

	getParameterAt: '#getTimeAt',

	getTimesWithTangent: function () {
		var tangent = Point.read(arguments);
		return tangent.isZero()
				? []
				: Curve.getTimesWithTangent(this.getValues(), tangent);
	},

	getOffsetAtTime: function(t) {
		return this.getPartLength(0, t);
	},

	getLocationOf: function() {
		return this.getLocationAtTime(this.getTimeOf(Point.read(arguments)));
	},

	getOffsetOf: function() {
		var loc = this.getLocationOf.apply(this, arguments);
		return loc ? loc.getOffset() : null;
	},

	getTimeOf: function() {
		return Curve.getTimeOf(this.getValues(), Point.read(arguments));
	},

	getParameterOf: '#getTimeOf',

	getNearestLocation: function() {
		var point = Point.read(arguments),
			values = this.getValues(),
			t = Curve.getNearestTime(values, point),
			pt = Curve.getPoint(values, t);
		return new CurveLocation(this, t, pt, null, point.getDistance(pt));
	},

	getNearestPoint: function() {
		var loc = this.getNearestLocation.apply(this, arguments);
		return loc ? loc.getPoint() : loc;
	}

},
new function() {
	var methods = ['getPoint', 'getTangent', 'getNormal', 'getWeightedTangent',
		'getWeightedNormal', 'getCurvature'];
	return Base.each(methods,
		function(name) {
			this[name + 'At'] = function(location, _isTime) {
				var values = this.getValues();
				return Curve[name](values, _isTime ? location
						: Curve.getTimeAt(values, location));
			};

			this[name + 'AtTime'] = function(time) {
				return Curve[name](this.getValues(), time);
			};
		}, {
			statics: {
				_evaluateMethods: methods
			}
		}
	);
},
new function() {

	function getLengthIntegrand(v) {
		var x0 = v[0], y0 = v[1],
			x1 = v[2], y1 = v[3],
			x2 = v[4], y2 = v[5],
			x3 = v[6], y3 = v[7],

			ax = 9 * (x1 - x2) + 3 * (x3 - x0),
			bx = 6 * (x0 + x2) - 12 * x1,
			cx = 3 * (x1 - x0),

			ay = 9 * (y1 - y2) + 3 * (y3 - y0),
			by = 6 * (y0 + y2) - 12 * y1,
			cy = 3 * (y1 - y0);

		return function(t) {
			var dx = (ax * t + bx) * t + cx,
				dy = (ay * t + by) * t + cy;
			return Math.sqrt(dx * dx + dy * dy);
		};
	}

	function getIterations(a, b) {
		return Math.max(2, Math.min(16, Math.ceil(Math.abs(b - a) * 32)));
	}

	function evaluate(v, t, type, normalized) {
		if (t == null || t < 0 || t > 1)
			return null;
		var x0 = v[0], y0 = v[1],
			x1 = v[2], y1 = v[3],
			x2 = v[4], y2 = v[5],
			x3 = v[6], y3 = v[7],
			isZero = Numerical.isZero;
		if (isZero(x1 - x0) && isZero(y1 - y0)) {
			x1 = x0;
			y1 = y0;
		}
		if (isZero(x2 - x3) && isZero(y2 - y3)) {
			x2 = x3;
			y2 = y3;
		}
		var cx = 3 * (x1 - x0),
			bx = 3 * (x2 - x1) - cx,
			ax = x3 - x0 - cx - bx,
			cy = 3 * (y1 - y0),
			by = 3 * (y2 - y1) - cy,
			ay = y3 - y0 - cy - by,
			x, y;
		if (type === 0) {
			x = t === 0 ? x0 : t === 1 ? x3
					: ((ax * t + bx) * t + cx) * t + x0;
			y = t === 0 ? y0 : t === 1 ? y3
					: ((ay * t + by) * t + cy) * t + y0;
		} else {
			var tMin = 1e-8,
				tMax = 1 - tMin;
			if (t < tMin) {
				x = cx;
				y = cy;
			} else if (t > tMax) {
				x = 3 * (x3 - x2);
				y = 3 * (y3 - y2);
			} else {
				x = (3 * ax * t + 2 * bx) * t + cx;
				y = (3 * ay * t + 2 * by) * t + cy;
			}
			if (normalized) {
				if (x === 0 && y === 0 && (t < tMin || t > tMax)) {
					x = x2 - x1;
					y = y2 - y1;
				}
				var len = Math.sqrt(x * x + y * y);
				if (len) {
					x /= len;
					y /= len;
				}
			}
			if (type === 3) {
				var x2 = 6 * ax * t + 2 * bx,
					y2 = 6 * ay * t + 2 * by,
					d = Math.pow(x * x + y * y, 3 / 2);
				x = d !== 0 ? (x * y2 - y * x2) / d : 0;
				y = 0;
			}
		}
		return type === 2 ? new Point(y, -x) : new Point(x, y);
	}

	return { statics: {

		classify: function(v) {

			var x0 = v[0], y0 = v[1],
				x1 = v[2], y1 = v[3],
				x2 = v[4], y2 = v[5],
				x3 = v[6], y3 = v[7],
				a1 = x0 * (y3 - y2) + y0 * (x2 - x3) + x3 * y2 - y3 * x2,
				a2 = x1 * (y0 - y3) + y1 * (x3 - x0) + x0 * y3 - y0 * x3,
				a3 = x2 * (y1 - y0) + y2 * (x0 - x1) + x1 * y0 - y1 * x0,
				d3 = 3 * a3,
				d2 = d3 - a2,
				d1 = d2 - a2 + a1,
				l = Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3),
				s = l !== 0 ? 1 / l : 0,
				isZero = Numerical.isZero,
				serpentine = 'serpentine';
			d1 *= s;
			d2 *= s;
			d3 *= s;

			function type(type, t1, t2) {
				var hasRoots = t1 !== undefined,
					t1Ok = hasRoots && t1 > 0 && t1 < 1,
					t2Ok = hasRoots && t2 > 0 && t2 < 1;
				if (hasRoots && (!(t1Ok || t2Ok)
						|| type === 'loop' && !(t1Ok && t2Ok))) {
					type = 'arch';
					t1Ok = t2Ok = false;
				}
				return {
					type: type,
					roots: t1Ok || t2Ok
							? t1Ok && t2Ok
								? t1 < t2 ? [t1, t2] : [t2, t1]
								: [t1Ok ? t1 : t2]
							: null
				};
			}

			if (isZero(d1)) {
				return isZero(d2)
						? type(isZero(d3) ? 'line' : 'quadratic')
						: type(serpentine, d3 / (3 * d2));
			}
			var d = 3 * d2 * d2 - 4 * d1 * d3;
			if (isZero(d)) {
				return type('cusp', d2 / (2 * d1));
			}
			var f1 = d > 0 ? Math.sqrt(d / 3) : Math.sqrt(-d),
				f2 = 2 * d1;
			return type(d > 0 ? serpentine : 'loop',
					(d2 + f1) / f2,
					(d2 - f1) / f2);
		},

		getLength: function(v, a, b, ds) {
			if (a === undefined)
				a = 0;
			if (b === undefined)
				b = 1;
			if (Curve.isStraight(v)) {
				var c = v;
				if (b < 1) {
					c = Curve.subdivide(c, b)[0];
					a /= b;
				}
				if (a > 0) {
					c = Curve.subdivide(c, a)[1];
				}
				var dx = c[6] - c[0],
					dy = c[7] - c[1];
				return Math.sqrt(dx * dx + dy * dy);
			}
			return Numerical.integrate(ds || getLengthIntegrand(v), a, b,
					getIterations(a, b));
		},

		getTimeAt: function(v, offset, start) {
			if (start === undefined)
				start = offset < 0 ? 1 : 0;
			if (offset === 0)
				return start;
			var abs = Math.abs,
				epsilon = 1e-12,
				forward = offset > 0,
				a = forward ? start : 0,
				b = forward ? 1 : start,
				ds = getLengthIntegrand(v),
				rangeLength = Curve.getLength(v, a, b, ds),
				diff = abs(offset) - rangeLength;
			if (abs(diff) < epsilon) {
				return forward ? b : a;
			} else if (diff > epsilon) {
				return null;
			}
			var guess = offset / rangeLength,
				length = 0;
			function f(t) {
				length += Numerical.integrate(ds, start, t,
						getIterations(start, t));
				start = t;
				return length - offset;
			}
			return Numerical.findRoot(f, ds, start + guess, a, b, 32,
					1e-12);
		},

		getPoint: function(v, t) {
			return evaluate(v, t, 0, false);
		},

		getTangent: function(v, t) {
			return evaluate(v, t, 1, true);
		},

		getWeightedTangent: function(v, t) {
			return evaluate(v, t, 1, false);
		},

		getNormal: function(v, t) {
			return evaluate(v, t, 2, true);
		},

		getWeightedNormal: function(v, t) {
			return evaluate(v, t, 2, false);
		},

		getCurvature: function(v, t) {
			return evaluate(v, t, 3, false).x;
		},

		getPeaks: function(v) {
			var x0 = v[0], y0 = v[1],
				x1 = v[2], y1 = v[3],
				x2 = v[4], y2 = v[5],
				x3 = v[6], y3 = v[7],
				ax =     -x0 + 3 * x1 - 3 * x2 + x3,
				bx =  3 * x0 - 6 * x1 + 3 * x2,
				cx = -3 * x0 + 3 * x1,
				ay =     -y0 + 3 * y1 - 3 * y2 + y3,
				by =  3 * y0 - 6 * y1 + 3 * y2,
				cy = -3 * y0 + 3 * y1,
				tMin = 1e-8,
				tMax = 1 - tMin,
				roots = [];
			Numerical.solveCubic(
					9 * (ax * ax + ay * ay),
					9 * (ax * bx + by * ay),
					2 * (bx * bx + by * by) + 3 * (cx * ax + cy * ay),
					(cx * bx + by * cy),
					roots, tMin, tMax);
			return roots.sort();
		}
	}};
},
new function() {

	function addLocation(locations, include, c1, t1, c2, t2, overlap) {
		var excludeStart = !overlap && c1.getPrevious() === c2,
			excludeEnd = !overlap && c1 !== c2 && c1.getNext() === c2,
			tMin = 1e-8,
			tMax = 1 - tMin;
		if (t1 !== null && t1 >= (excludeStart ? tMin : 0) &&
			t1 <= (excludeEnd ? tMax : 1)) {
			if (t2 !== null && t2 >= (excludeEnd ? tMin : 0) &&
				t2 <= (excludeStart ? tMax : 1)) {
				var loc1 = new CurveLocation(c1, t1, null, overlap),
					loc2 = new CurveLocation(c2, t2, null, overlap);
				loc1._intersection = loc2;
				loc2._intersection = loc1;
				if (!include || include(loc1)) {
					CurveLocation.insert(locations, loc1, true);
				}
			}
		}
	}

	function addCurveIntersections(v1, v2, c1, c2, locations, include, flip,
			recursion, calls, tMin, tMax, uMin, uMax) {
		if (++calls >= 4096 || ++recursion >= 40)
			return calls;
		var fatLineEpsilon = 1e-9,
			q0x = v2[0], q0y = v2[1], q3x = v2[6], q3y = v2[7],
			getSignedDistance = Line.getSignedDistance,
			d1 = getSignedDistance(q0x, q0y, q3x, q3y, v2[2], v2[3]),
			d2 = getSignedDistance(q0x, q0y, q3x, q3y, v2[4], v2[5]),
			factor = d1 * d2 > 0 ? 3 / 4 : 4 / 9,
			dMin = factor * Math.min(0, d1, d2),
			dMax = factor * Math.max(0, d1, d2),
			dp0 = getSignedDistance(q0x, q0y, q3x, q3y, v1[0], v1[1]),
			dp1 = getSignedDistance(q0x, q0y, q3x, q3y, v1[2], v1[3]),
			dp2 = getSignedDistance(q0x, q0y, q3x, q3y, v1[4], v1[5]),
			dp3 = getSignedDistance(q0x, q0y, q3x, q3y, v1[6], v1[7]),
			hull = getConvexHull(dp0, dp1, dp2, dp3),
			top = hull[0],
			bottom = hull[1],
			tMinClip,
			tMaxClip;
		if (d1 === 0 && d2 === 0
				&& dp0 === 0 && dp1 === 0 && dp2 === 0 && dp3 === 0
			|| (tMinClip = clipConvexHull(top, bottom, dMin, dMax)) == null
			|| (tMaxClip = clipConvexHull(top.reverse(), bottom.reverse(),
				dMin, dMax)) == null)
			return calls;
		var tMinNew = tMin + (tMax - tMin) * tMinClip,
			tMaxNew = tMin + (tMax - tMin) * tMaxClip;
		if (Math.max(uMax - uMin, tMaxNew - tMinNew) < fatLineEpsilon) {
			var t = (tMinNew + tMaxNew) / 2,
				u = (uMin + uMax) / 2;
			addLocation(locations, include,
					flip ? c2 : c1, flip ? u : t,
					flip ? c1 : c2, flip ? t : u);
		} else {
			v1 = Curve.getPart(v1, tMinClip, tMaxClip);
			var uDiff = uMax - uMin;
			if (tMaxClip - tMinClip > 0.8) {
				if (tMaxNew - tMinNew > uDiff) {
					var parts = Curve.subdivide(v1, 0.5),
						t = (tMinNew + tMaxNew) / 2;
					calls = addCurveIntersections(
							v2, parts[0], c2, c1, locations, include, !flip,
							recursion, calls, uMin, uMax, tMinNew, t);
					calls = addCurveIntersections(
							v2, parts[1], c2, c1, locations, include, !flip,
							recursion, calls, uMin, uMax, t, tMaxNew);
				} else {
					var parts = Curve.subdivide(v2, 0.5),
						u = (uMin + uMax) / 2;
					calls = addCurveIntersections(
							parts[0], v1, c2, c1, locations, include, !flip,
							recursion, calls, uMin, u, tMinNew, tMaxNew);
					calls = addCurveIntersections(
							parts[1], v1, c2, c1, locations, include, !flip,
							recursion, calls, u, uMax, tMinNew, tMaxNew);
				}
			} else {
				if (uDiff === 0 || uDiff >= fatLineEpsilon) {
					calls = addCurveIntersections(
							v2, v1, c2, c1, locations, include, !flip,
							recursion, calls, uMin, uMax, tMinNew, tMaxNew);
				} else {
					calls = addCurveIntersections(
							v1, v2, c1, c2, locations, include, flip,
							recursion, calls, tMinNew, tMaxNew, uMin, uMax);
				}
			}
		}
		return calls;
	}

	function getConvexHull(dq0, dq1, dq2, dq3) {
		var p0 = [ 0, dq0 ],
			p1 = [ 1 / 3, dq1 ],
			p2 = [ 2 / 3, dq2 ],
			p3 = [ 1, dq3 ],
			dist1 = dq1 - (2 * dq0 + dq3) / 3,
			dist2 = dq2 - (dq0 + 2 * dq3) / 3,
			hull;
		if (dist1 * dist2 < 0) {
			hull = [[p0, p1, p3], [p0, p2, p3]];
		} else {
			var distRatio = dist1 / dist2;
			hull = [
				distRatio >= 2 ? [p0, p1, p3]
				: distRatio <= 0.5 ? [p0, p2, p3]
				: [p0, p1, p2, p3],
				[p0, p3]
			];
		}
		return (dist1 || dist2) < 0 ? hull.reverse() : hull;
	}

	function clipConvexHull(hullTop, hullBottom, dMin, dMax) {
		if (hullTop[0][1] < dMin) {
			return clipConvexHullPart(hullTop, true, dMin);
		} else if (hullBottom[0][1] > dMax) {
			return clipConvexHullPart(hullBottom, false, dMax);
		} else {
			return hullTop[0][0];
		}
	}

	function clipConvexHullPart(part, top, threshold) {
		var px = part[0][0],
			py = part[0][1];
		for (var i = 1, l = part.length; i < l; i++) {
			var qx = part[i][0],
				qy = part[i][1];
			if (top ? qy >= threshold : qy <= threshold) {
				return qy === threshold ? qx
						: px + (threshold - py) * (qx - px) / (qy - py);
			}
			px = qx;
			py = qy;
		}
		return null;
	}

	function getCurveLineIntersections(v, px, py, vx, vy) {
		var isZero = Numerical.isZero;
		if (isZero(vx) && isZero(vy)) {
			var t = Curve.getTimeOf(v, new Point(px, py));
			return t === null ? [] : [t];
		}
		var angle = Math.atan2(-vy, vx),
			sin = Math.sin(angle),
			cos = Math.cos(angle),
			rv = [],
			roots = [];
		for (var i = 0; i < 8; i += 2) {
			var x = v[i] - px,
				y = v[i + 1] - py;
			rv.push(
				x * cos - y * sin,
				x * sin + y * cos);
		}
		Curve.solveCubic(rv, 1, 0, roots, 0, 1);
		return roots;
	}

	function addCurveLineIntersections(v1, v2, c1, c2, locations, include,
			flip) {
		var x1 = v2[0], y1 = v2[1],
			x2 = v2[6], y2 = v2[7],
			roots = getCurveLineIntersections(v1, x1, y1, x2 - x1, y2 - y1);
		for (var i = 0, l = roots.length; i < l; i++) {
			var t1 = roots[i],
				p1 = Curve.getPoint(v1, t1),
				t2 = Curve.getTimeOf(v2, p1);
			if (t2 !== null) {
				addLocation(locations, include,
						flip ? c2 : c1, flip ? t2 : t1,
						flip ? c1 : c2, flip ? t1 : t2);
			}
		}
	}

	function addLineIntersection(v1, v2, c1, c2, locations, include) {
		var pt = Line.intersect(
				v1[0], v1[1], v1[6], v1[7],
				v2[0], v2[1], v2[6], v2[7]);
		if (pt) {
			addLocation(locations, include,
					c1, Curve.getTimeOf(v1, pt),
					c2, Curve.getTimeOf(v2, pt));
		}
	}

	function getCurveIntersections(v1, v2, c1, c2, locations, include) {
		var epsilon = 1e-12,
			min = Math.min,
			max = Math.max;

		if (max(v1[0], v1[2], v1[4], v1[6]) + epsilon >
			min(v2[0], v2[2], v2[4], v2[6]) &&
			min(v1[0], v1[2], v1[4], v1[6]) - epsilon <
			max(v2[0], v2[2], v2[4], v2[6]) &&
			max(v1[1], v1[3], v1[5], v1[7]) + epsilon >
			min(v2[1], v2[3], v2[5], v2[7]) &&
			min(v1[1], v1[3], v1[5], v1[7]) - epsilon <
			max(v2[1], v2[3], v2[5], v2[7])) {
			var overlaps = getOverlaps(v1, v2);
			if (overlaps) {
				for (var i = 0; i < 2; i++) {
					var overlap = overlaps[i];
					addLocation(locations, include,
							c1, overlap[0],
							c2, overlap[1], true);
				}
			} else {
				var straight1 = Curve.isStraight(v1),
					straight2 = Curve.isStraight(v2),
					straight = straight1 && straight2,
					flip = straight1 && !straight2,
					before = locations.length;
				(straight
					? addLineIntersection
					: straight1 || straight2
						? addCurveLineIntersections
						: addCurveIntersections)(
							flip ? v2 : v1, flip ? v1 : v2,
							flip ? c2 : c1, flip ? c1 : c2,
							locations, include, flip,
							0, 0, 0, 1, 0, 1);
				if (!straight || locations.length === before) {
					for (var i = 0; i < 4; i++) {
						var t1 = i >> 1,
							t2 = i & 1,
							i1 = t1 * 6,
							i2 = t2 * 6,
							p1 = new Point(v1[i1], v1[i1 + 1]),
							p2 = new Point(v2[i2], v2[i2 + 1]);
						if (p1.isClose(p2, epsilon)) {
							addLocation(locations, include,
									c1, t1,
									c2, t2);
						}
					}
				}
			}
		}
		return locations;
	}

	function getSelfIntersection(v1, c1, locations, include) {
		var info = Curve.classify(v1);
		if (info.type === 'loop') {
			var roots = info.roots;
			addLocation(locations, include,
					c1, roots[0],
					c1, roots[1]);
		}
	  return locations;
	}

	function getIntersections(curves1, curves2, include, matrix1, matrix2,
			_returnFirst) {
		var epsilon = 1e-7,
			self = !curves2;
		if (self)
			curves2 = curves1;
		var length1 = curves1.length,
			length2 = curves2.length,
			values1 = new Array(length1),
			values2 = self ? values1 : new Array(length2),
			locations = [];

		for (var i = 0; i < length1; i++) {
			values1[i] = curves1[i].getValues(matrix1);
		}
		if (!self) {
			for (var i = 0; i < length2; i++) {
				values2[i] = curves2[i].getValues(matrix2);
			}
		}
		var boundsCollisions = CollisionDetection.findCurveBoundsCollisions(
				values1, values2, epsilon);
		for (var index1 = 0; index1 < length1; index1++) {
			var curve1 = curves1[index1],
				v1 = values1[index1];
			if (self) {
				getSelfIntersection(v1, curve1, locations, include);
			}
			var collisions1 = boundsCollisions[index1];
			if (collisions1) {
				for (var j = 0; j < collisions1.length; j++) {
					if (_returnFirst && locations.length)
						return locations;
					var index2 = collisions1[j];
					if (!self || index2 > index1) {
						var curve2 = curves2[index2],
							v2 = values2[index2];
						getCurveIntersections(
								v1, v2, curve1, curve2, locations, include);
					}
				}
			}
		}
		return locations;
	}

	function getOverlaps(v1, v2) {

		function getSquaredLineLength(v) {
			var x = v[6] - v[0],
				y = v[7] - v[1];
			return x * x + y * y;
		}

		var abs = Math.abs,
			getDistance = Line.getDistance,
			timeEpsilon = 1e-8,
			geomEpsilon = 1e-7,
			straight1 = Curve.isStraight(v1),
			straight2 = Curve.isStraight(v2),
			straightBoth = straight1 && straight2,
			flip = getSquaredLineLength(v1) < getSquaredLineLength(v2),
			l1 = flip ? v2 : v1,
			l2 = flip ? v1 : v2,
			px = l1[0], py = l1[1],
			vx = l1[6] - px, vy = l1[7] - py;
		if (getDistance(px, py, vx, vy, l2[0], l2[1], true) < geomEpsilon &&
			getDistance(px, py, vx, vy, l2[6], l2[7], true) < geomEpsilon) {
			if (!straightBoth &&
				getDistance(px, py, vx, vy, l1[2], l1[3], true) < geomEpsilon &&
				getDistance(px, py, vx, vy, l1[4], l1[5], true) < geomEpsilon &&
				getDistance(px, py, vx, vy, l2[2], l2[3], true) < geomEpsilon &&
				getDistance(px, py, vx, vy, l2[4], l2[5], true) < geomEpsilon) {
				straight1 = straight2 = straightBoth = true;
			}
		} else if (straightBoth) {
			return null;
		}
		if (straight1 ^ straight2) {
			return null;
		}

		var v = [v1, v2],
			pairs = [];
		for (var i = 0; i < 4 && pairs.length < 2; i++) {
			var i1 = i & 1,
				i2 = i1 ^ 1,
				t1 = i >> 1,
				t2 = Curve.getTimeOf(v[i1], new Point(
					v[i2][t1 ? 6 : 0],
					v[i2][t1 ? 7 : 1]));
			if (t2 != null) {
				var pair = i1 ? [t1, t2] : [t2, t1];
				if (!pairs.length ||
					abs(pair[0] - pairs[0][0]) > timeEpsilon &&
					abs(pair[1] - pairs[0][1]) > timeEpsilon) {
					pairs.push(pair);
				}
			}
			if (i > 2 && !pairs.length)
				break;
		}
		if (pairs.length !== 2) {
			pairs = null;
		} else if (!straightBoth) {
			var o1 = Curve.getPart(v1, pairs[0][0], pairs[1][0]),
				o2 = Curve.getPart(v2, pairs[0][1], pairs[1][1]);
			if (abs(o2[2] - o1[2]) > geomEpsilon ||
				abs(o2[3] - o1[3]) > geomEpsilon ||
				abs(o2[4] - o1[4]) > geomEpsilon ||
				abs(o2[5] - o1[5]) > geomEpsilon)
				pairs = null;
		}
		return pairs;
	}

	function getTimesWithTangent(v, tangent) {
		var x0 = v[0], y0 = v[1],
			x1 = v[2], y1 = v[3],
			x2 = v[4], y2 = v[5],
			x3 = v[6], y3 = v[7],
			normalized = tangent.normalize(),
			tx = normalized.x,
			ty = normalized.y,
			ax = 3 * x3 - 9 * x2 + 9 * x1 - 3 * x0,
			ay = 3 * y3 - 9 * y2 + 9 * y1 - 3 * y0,
			bx = 6 * x2 - 12 * x1 + 6 * x0,
			by = 6 * y2 - 12 * y1 + 6 * y0,
			cx = 3 * x1 - 3 * x0,
			cy = 3 * y1 - 3 * y0,
			den = 2 * ax * ty - 2 * ay * tx,
			times = [];
		if (Math.abs(den) < Numerical.CURVETIME_EPSILON) {
			var num = ax * cy - ay * cx,
				den = ax * by - ay * bx;
			if (den != 0) {
				var t = -num / den;
				if (t >= 0 && t <= 1) times.push(t);
			}
		} else {
			var delta = (bx * bx - 4 * ax * cx) * ty * ty +
				(-2 * bx * by + 4 * ay * cx + 4 * ax * cy) * tx * ty +
				(by * by - 4 * ay * cy) * tx * tx,
				k = bx * ty - by * tx;
			if (delta >= 0 && den != 0) {
				var d = Math.sqrt(delta),
					t0 = -(k + d) / den,
					t1 = (-k + d) / den;
				if (t0 >= 0 && t0 <= 1) times.push(t0);
				if (t1 >= 0 && t1 <= 1) times.push(t1);
			}
		}
		return times;
	}

	return {
		getIntersections: function(curve) {
			var v1 = this.getValues(),
				v2 = curve && curve !== this && curve.getValues();
			return v2 ? getCurveIntersections(v1, v2, this, curve, [])
					  : getSelfIntersection(v1, this, []);
		},

		statics: {
			getOverlaps: getOverlaps,
			getIntersections: getIntersections,
			getCurveLineIntersections: getCurveLineIntersections,
			getTimesWithTangent: getTimesWithTangent
		}
	};
});

var CurveLocation = Base.extend({
	_class: 'CurveLocation',

	initialize: function CurveLocation(curve, time, point, _overlap, _distance) {
		if (time >= 0.99999999) {
			var next = curve.getNext();
			if (next) {
				time = 0;
				curve = next;
			}
		}
		this._setCurve(curve);
		this._time = time;
		this._point = point || curve.getPointAtTime(time);
		this._overlap = _overlap;
		this._distance = _distance;
		this._intersection = this._next = this._previous = null;
	},

	_setPath: function(path) {
		this._path = path;
		this._version = path ? path._version : 0;
	},

	_setCurve: function(curve) {
		this._setPath(curve._path);
		this._curve = curve;
		this._segment = null;
		this._segment1 = curve._segment1;
		this._segment2 = curve._segment2;
	},

	_setSegment: function(segment) {
		var curve = segment.getCurve();
		if (curve) {
			this._setCurve(curve);
		} else {
			this._setPath(segment._path);
			this._segment1 = segment;
			this._segment2 = null;
		}
		this._segment = segment;
		this._time = segment === this._segment1 ? 0 : 1;
		this._point = segment._point.clone();
	},

	getSegment: function() {
		var segment = this._segment;
		if (!segment) {
			var curve = this.getCurve(),
				time = this.getTime();
			if (time === 0) {
				segment = curve._segment1;
			} else if (time === 1) {
				segment = curve._segment2;
			} else if (time != null) {
				segment = curve.getPartLength(0, time)
					< curve.getPartLength(time, 1)
						? curve._segment1
						: curve._segment2;
			}
			this._segment = segment;
		}
		return segment;
	},

	getCurve: function() {
		var path = this._path,
			that = this;
		if (path && path._version !== this._version) {
			this._time = this._offset = this._curveOffset = this._curve = null;
		}

		function trySegment(segment) {
			var curve = segment && segment.getCurve();
			if (curve && (that._time = curve.getTimeOf(that._point)) != null) {
				that._setCurve(curve);
				return curve;
			}
		}

		return this._curve
			|| trySegment(this._segment)
			|| trySegment(this._segment1)
			|| trySegment(this._segment2.getPrevious());
	},

	getPath: function() {
		var curve = this.getCurve();
		return curve && curve._path;
	},

	getIndex: function() {
		var curve = this.getCurve();
		return curve && curve.getIndex();
	},

	getTime: function() {
		var curve = this.getCurve(),
			time = this._time;
		return curve && time == null
			? this._time = curve.getTimeOf(this._point)
			: time;
	},

	getParameter: '#getTime',

	getPoint: function() {
		return this._point;
	},

	getOffset: function() {
		var offset = this._offset;
		if (offset == null) {
			offset = 0;
			var path = this.getPath(),
				index = this.getIndex();
			if (path && index != null) {
				var curves = path.getCurves();
				for (var i = 0; i < index; i++)
					offset += curves[i].getLength();
			}
			this._offset = offset += this.getCurveOffset();
		}
		return offset;
	},

	getCurveOffset: function() {
		var offset = this._curveOffset;
		if (offset == null) {
			var curve = this.getCurve(),
				time = this.getTime();
			this._curveOffset = offset = time != null && curve
					&& curve.getPartLength(0, time);
		}
		return offset;
	},

	getIntersection: function() {
		return this._intersection;
	},

	getDistance: function() {
		return this._distance;
	},

	divide: function() {
		var curve = this.getCurve(),
			res = curve && curve.divideAtTime(this.getTime());
		if (res) {
			this._setSegment(res._segment1);
		}
		return res;
	},

	split: function() {
		var curve = this.getCurve(),
			path = curve._path,
			res = curve && curve.splitAtTime(this.getTime());
		if (res) {
			this._setSegment(path.getLastSegment());
		}
		return  res;
	},

	equals: function(loc, _ignoreOther) {
		var res = this === loc;
		if (!res && loc instanceof CurveLocation) {
			var c1 = this.getCurve(),
				c2 = loc.getCurve(),
				p1 = c1._path,
				p2 = c2._path;
			if (p1 === p2) {
				var abs = Math.abs,
					epsilon = 1e-7,
					diff = abs(this.getOffset() - loc.getOffset()),
					i1 = !_ignoreOther && this._intersection,
					i2 = !_ignoreOther && loc._intersection;
				res = (diff < epsilon
						|| p1 && abs(p1.getLength() - diff) < epsilon)
					&& (!i1 && !i2 || i1 && i2 && i1.equals(i2, true));
			}
		}
		return res;
	},

	toString: function() {
		var parts = [],
			point = this.getPoint(),
			f = Formatter.instance;
		if (point)
			parts.push('point: ' + point);
		var index = this.getIndex();
		if (index != null)
			parts.push('index: ' + index);
		var time = this.getTime();
		if (time != null)
			parts.push('time: ' + f.number(time));
		if (this._distance != null)
			parts.push('distance: ' + f.number(this._distance));
		return '{ ' + parts.join(', ') + ' }';
	},

	isTouching: function() {
		var inter = this._intersection;
		if (inter && this.getTangent().isCollinear(inter.getTangent())) {
			var curve1 = this.getCurve(),
				curve2 = inter.getCurve();
			return !(curve1.isStraight() && curve2.isStraight()
					&& curve1.getLine().intersect(curve2.getLine()));
		}
		return false;
	},

	isCrossing: function() {
		var inter = this._intersection;
		if (!inter)
			return false;
		var t1 = this.getTime(),
			t2 = inter.getTime(),
			tMin = 1e-8,
			tMax = 1 - tMin,
			t1Inside = t1 >= tMin && t1 <= tMax,
			t2Inside = t2 >= tMin && t2 <= tMax;
		if (t1Inside && t2Inside)
			return !this.isTouching();
		var c2 = this.getCurve(),
			c1 = c2 && t1 < tMin ? c2.getPrevious() : c2,
			c4 = inter.getCurve(),
			c3 = c4 && t2 < tMin ? c4.getPrevious() : c4;
		if (t1 > tMax)
			c2 = c2.getNext();
		if (t2 > tMax)
			c4 = c4.getNext();
		if (!c1 || !c2 || !c3 || !c4)
			return false;

		var offsets = [];

		function addOffsets(curve, end) {
			var v = curve.getValues(),
				roots = Curve.classify(v).roots || Curve.getPeaks(v),
				count = roots.length,
				offset = Curve.getLength(v,
					end && count ? roots[count - 1] : 0,
					!end && count ? roots[0] : 1);
			offsets.push(count ? offset : offset / 32);
		}

		function isInRange(angle, min, max) {
			return min < max
					? angle > min && angle < max
					: angle > min || angle < max;
		}

		if (!t1Inside) {
			addOffsets(c1, true);
			addOffsets(c2, false);
		}
		if (!t2Inside) {
			addOffsets(c3, true);
			addOffsets(c4, false);
		}
		var pt = this.getPoint(),
			offset = Math.min.apply(Math, offsets),
			v2 = t1Inside ? c2.getTangentAtTime(t1)
					: c2.getPointAt(offset).subtract(pt),
			v1 = t1Inside ? v2.negate()
					: c1.getPointAt(-offset).subtract(pt),
			v4 = t2Inside ? c4.getTangentAtTime(t2)
					: c4.getPointAt(offset).subtract(pt),
			v3 = t2Inside ? v4.negate()
					: c3.getPointAt(-offset).subtract(pt),
			a1 = v1.getAngle(),
			a2 = v2.getAngle(),
			a3 = v3.getAngle(),
			a4 = v4.getAngle();
		return !!(t1Inside
				? (isInRange(a1, a3, a4) ^ isInRange(a2, a3, a4)) &&
				  (isInRange(a1, a4, a3) ^ isInRange(a2, a4, a3))
				: (isInRange(a3, a1, a2) ^ isInRange(a4, a1, a2)) &&
				  (isInRange(a3, a2, a1) ^ isInRange(a4, a2, a1)));
	},

	hasOverlap: function() {
		return !!this._overlap;
	}
}, Base.each(Curve._evaluateMethods, function(name) {
	var get = name + 'At';
	this[name] = function() {
		var curve = this.getCurve(),
			time = this.getTime();
		return time != null && curve && curve[get](time, true);
	};
}, {
	preserve: true
}),
new function() {

	function insert(locations, loc, merge) {
		var length = locations.length,
			l = 0,
			r = length - 1;

		function search(index, dir) {
			for (var i = index + dir; i >= -1 && i <= length; i += dir) {
				var loc2 = locations[((i % length) + length) % length];
				if (!loc.getPoint().isClose(loc2.getPoint(),
						1e-7))
					break;
				if (loc.equals(loc2))
					return loc2;
			}
			return null;
		}

		while (l <= r) {
			var m = (l + r) >>> 1,
				loc2 = locations[m],
				found;
			if (merge && (found = loc.equals(loc2) ? loc2
					: (search(m, -1) || search(m, 1)))) {
				if (loc._overlap) {
					found._overlap = found._intersection._overlap = true;
				}
				return found;
			}
		var path1 = loc.getPath(),
			path2 = loc2.getPath(),
			diff = path1 !== path2
				? path1._id - path2._id
				: (loc.getIndex() + loc.getTime())
				- (loc2.getIndex() + loc2.getTime());
			if (diff < 0) {
				r = m - 1;
			} else {
				l = m + 1;
			}
		}
		locations.splice(l, 0, loc);
		return loc;
	}

	return { statics: {
		insert: insert,

		expand: function(locations) {
			var expanded = locations.slice();
			for (var i = locations.length - 1; i >= 0; i--) {
				insert(expanded, locations[i]._intersection, false);
			}
			return expanded;
		}
	}};
});

var PathItem = Item.extend({
	_class: 'PathItem',
	_selectBounds: false,
	_canScaleStroke: true,
	beans: true,

	initialize: function PathItem() {
	},

	statics: {
		create: function(arg) {
			var data,
				segments,
				compound;
			if (Base.isPlainObject(arg)) {
				segments = arg.segments;
				data = arg.pathData;
			} else if (Array.isArray(arg)) {
				segments = arg;
			} else if (typeof arg === 'string') {
				data = arg;
			}
			if (segments) {
				var first = segments[0];
				compound = first && Array.isArray(first[0]);
			} else if (data) {
				compound = (data.match(/m/gi) || []).length > 1
						|| /z\s*\S+/i.test(data);
			}
			var ctor = compound ? CompoundPath : Path;
			return new ctor(arg);
		}
	},

	_asPathItem: function() {
		return this;
	},

	isClockwise: function() {
		return this.getArea() >= 0;
	},

	setClockwise: function(clockwise) {
		if (this.isClockwise() != (clockwise = !!clockwise))
			this.reverse();
	},

	setPathData: function(data) {

		var parts = data && data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),
			coords,
			relative = false,
			previous,
			control,
			current = new Point(),
			start = new Point();

		function getCoord(index, coord) {
			var val = +coords[index];
			if (relative)
				val += current[coord];
			return val;
		}

		function getPoint(index) {
			return new Point(
				getCoord(index, 'x'),
				getCoord(index + 1, 'y')
			);
		}

		this.clear();

		for (var i = 0, l = parts && parts.length; i < l; i++) {
			var part = parts[i],
				command = part[0],
				lower = command.toLowerCase();
			coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
			var length = coords && coords.length;
			relative = command === lower;
			if (previous === 'z' && !/[mz]/.test(lower))
				this.moveTo(current);
			switch (lower) {
			case 'm':
			case 'l':
				var move = lower === 'm';
				for (var j = 0; j < length; j += 2) {
					this[move ? 'moveTo' : 'lineTo'](current = getPoint(j));
					if (move) {
						start = current;
						move = false;
					}
				}
				control = current;
				break;
			case 'h':
			case 'v':
				var coord = lower === 'h' ? 'x' : 'y';
				current = current.clone();
				for (var j = 0; j < length; j++) {
					current[coord] = getCoord(j, coord);
					this.lineTo(current);
				}
				control = current;
				break;
			case 'c':
				for (var j = 0; j < length; j += 6) {
					this.cubicCurveTo(
							getPoint(j),
							control = getPoint(j + 2),
							current = getPoint(j + 4));
				}
				break;
			case 's':
				for (var j = 0; j < length; j += 4) {
					this.cubicCurveTo(
							/[cs]/.test(previous)
									? current.multiply(2).subtract(control)
									: current,
							control = getPoint(j),
							current = getPoint(j + 2));
					previous = lower;
				}
				break;
			case 'q':
				for (var j = 0; j < length; j += 4) {
					this.quadraticCurveTo(
							control = getPoint(j),
							current = getPoint(j + 2));
				}
				break;
			case 't':
				for (var j = 0; j < length; j += 2) {
					this.quadraticCurveTo(
							control = (/[qt]/.test(previous)
									? current.multiply(2).subtract(control)
									: current),
							current = getPoint(j));
					previous = lower;
				}
				break;
			case 'a':
				for (var j = 0; j < length; j += 7) {
					this.arcTo(current = getPoint(j + 5),
							new Size(+coords[j], +coords[j + 1]),
							+coords[j + 2], +coords[j + 4], +coords[j + 3]);
				}
				break;
			case 'z':
				this.closePath(1e-12);
				current = start;
				break;
			}
			previous = lower;
		}
	},

	_canComposite: function() {
		return !(this.hasFill() && this.hasStroke());
	},

	_contains: function(point) {
		var winding = point.isInside(
				this.getBounds({ internal: true, handle: true }))
					? this._getWinding(point)
					: {};
		return winding.onPath || !!(this.getFillRule() === 'evenodd'
				? winding.windingL & 1 || winding.windingR & 1
				: winding.winding);
	},

	getIntersections: function(path, include, _matrix, _returnFirst) {
		var self = this === path || !path,
			matrix1 = this._matrix._orNullIfIdentity(),
			matrix2 = self ? matrix1
				: (_matrix || path._matrix)._orNullIfIdentity();
		return self || this.getBounds(matrix1).intersects(
				path.getBounds(matrix2), 1e-12)
				? Curve.getIntersections(
						this.getCurves(), !self && path.getCurves(), include,
						matrix1, matrix2, _returnFirst)
				: [];
	},

	getCrossings: function(path) {
		return this.getIntersections(path, function(inter) {
			return inter.isCrossing();
		});
	},

	getNearestLocation: function() {
		var point = Point.read(arguments),
			curves = this.getCurves(),
			minDist = Infinity,
			minLoc = null;
		for (var i = 0, l = curves.length; i < l; i++) {
			var loc = curves[i].getNearestLocation(point);
			if (loc._distance < minDist) {
				minDist = loc._distance;
				minLoc = loc;
			}
		}
		return minLoc;
	},

	getNearestPoint: function() {
		var loc = this.getNearestLocation.apply(this, arguments);
		return loc ? loc.getPoint() : loc;
	},

	interpolate: function(from, to, factor) {
		var isPath = !this._children,
			name = isPath ? '_segments' : '_children',
			itemsFrom = from[name],
			itemsTo = to[name],
			items = this[name];
		if (!itemsFrom || !itemsTo || itemsFrom.length !== itemsTo.length) {
			throw new Error('Invalid operands in interpolate() call: ' +
					from + ', ' + to);
		}
		var current = items.length,
			length = itemsTo.length;
		if (current < length) {
			var ctor = isPath ? Segment : Path;
			for (var i = current; i < length; i++) {
				this.add(new ctor());
			}
		} else if (current > length) {
			this[isPath ? 'removeSegments' : 'removeChildren'](length, current);
		}
		for (var i = 0; i < length; i++) {
			items[i].interpolate(itemsFrom[i], itemsTo[i], factor);
		}
		if (isPath) {
			this.setClosed(from._closed);
			this._changed(9);
		}
	},

	compare: function(path) {
		var ok = false;
		if (path) {
			var paths1 = this._children || [this],
				paths2 = path._children ? path._children.slice() : [path],
				length1 = paths1.length,
				length2 = paths2.length,
				matched = [],
				count = 0;
			ok = true;
			var boundsOverlaps = CollisionDetection.findItemBoundsCollisions(paths1, paths2, Numerical.GEOMETRIC_EPSILON);
			for (var i1 = length1 - 1; i1 >= 0 && ok; i1--) {
				var path1 = paths1[i1];
				ok = false;
				var pathBoundsOverlaps = boundsOverlaps[i1];
				if (pathBoundsOverlaps) {
					for (var i2 = pathBoundsOverlaps.length - 1; i2 >= 0 && !ok; i2--) {
						if (path1.compare(paths2[pathBoundsOverlaps[i2]])) {
							if (!matched[pathBoundsOverlaps[i2]]) {
								matched[pathBoundsOverlaps[i2]] = true;
								count++;
							}
							ok = true;
						}
					}
				}
			}
			ok = ok && count === length2;
		}
		return ok;
	},

});

var Path = PathItem.extend({
	_class: 'Path',
	_serializeFields: {
		segments: [],
		closed: false
	},

	initialize: function Path(arg) {
		this._closed = false;
		this._segments = [];
		this._version = 0;
		var args = arguments,
			segments = Array.isArray(arg)
			? typeof arg[0] === 'object'
				? arg
				: args
			: arg && (arg.size === undefined && (arg.x !== undefined
					|| arg.point !== undefined))
				? args
				: null;
		if (segments && segments.length > 0) {
			this.setSegments(segments);
		} else {
			this._curves = undefined;
			this._segmentSelection = 0;
			if (!segments && typeof arg === 'string') {
				this.setPathData(arg);
				arg = null;
			}
		}
		this._initialize(!segments && arg);
	},

	_equals: function(item) {
		return this._closed === item._closed
				&& Base.equals(this._segments, item._segments);
	},

	copyContent: function(source) {
		this.setSegments(source._segments);
		this._closed = source._closed;
	},

	_changed: function _changed(flags) {
		_changed.base.call(this, flags);
		if (flags & 8) {
			this._length = this._area = undefined;
			if (flags & 32) {
				this._version++;
			} else if (this._curves) {
			   for (var i = 0, l = this._curves.length; i < l; i++)
					this._curves[i]._changed();
			}
		} else if (flags & 64) {
			this._bounds = undefined;
		}
	},

	getStyle: function() {
		var parent = this._parent;
		return (parent instanceof CompoundPath ? parent : this)._style;
	},

	getSegments: function() {
		return this._segments;
	},

	setSegments: function(segments) {
		var fullySelected = this.isFullySelected(),
			length = segments && segments.length;
		this._segments.length = 0;
		this._segmentSelection = 0;
		this._curves = undefined;
		if (length) {
			var last = segments[length - 1];
			if (typeof last === 'boolean') {
				this.setClosed(last);
				length--;
			}
			this._add(Segment.readList(segments, 0, {}, length));
		}
		if (fullySelected)
			this.setFullySelected(true);
	},

	getFirstSegment: function() {
		return this._segments[0];
	},

	getLastSegment: function() {
		return this._segments[this._segments.length - 1];
	},

	getCurves: function() {
		var curves = this._curves,
			segments = this._segments;
		if (!curves) {
			var length = this._countCurves();
			curves = this._curves = new Array(length);
			for (var i = 0; i < length; i++)
				curves[i] = new Curve(this, segments[i],
					segments[i + 1] || segments[0]);
		}
		return curves;
	},

	getFirstCurve: function() {
		return this.getCurves()[0];
	},

	getLastCurve: function() {
		var curves = this.getCurves();
		return curves[curves.length - 1];
	},

	isClosed: function() {
		return this._closed;
	},

	setClosed: function(closed) {
		if (this._closed != (closed = !!closed)) {
			this._closed = closed;
			if (this._curves) {
				var length = this._curves.length = this._countCurves();
				if (closed)
					this._curves[length - 1] = new Curve(this,
						this._segments[length - 1], this._segments[0]);
			}
			this._changed(41);
		}
	}
}, {
	beans: true,

	getPathData: function(_matrix, _precision) {
		var segments = this._segments,
			length = segments.length,
			f = new Formatter(_precision),
			coords = new Array(6),
			first = true,
			curX, curY,
			prevX, prevY,
			inX, inY,
			outX, outY,
			parts = [];

		function addSegment(segment, skipLine) {
			segment._transformCoordinates(_matrix, coords);
			curX = coords[0];
			curY = coords[1];
			if (first) {
				parts.push('M' + f.pair(curX, curY));
				first = false;
			} else {
				inX = coords[2];
				inY = coords[3];
				if (inX === curX && inY === curY
						&& outX === prevX && outY === prevY) {
					if (!skipLine) {
						var dx = curX - prevX,
							dy = curY - prevY;
						parts.push(
							  dx === 0 ? 'v' + f.number(dy)
							: dy === 0 ? 'h' + f.number(dx)
							: 'l' + f.pair(dx, dy));
					}
				} else {
					parts.push('c' + f.pair(outX - prevX, outY - prevY)
							 + ' ' + f.pair( inX - prevX,  inY - prevY)
							 + ' ' + f.pair(curX - prevX, curY - prevY));
				}
			}
			prevX = curX;
			prevY = curY;
			outX = coords[4];
			outY = coords[5];
		}

		if (!length)
			return '';

		for (var i = 0; i < length; i++)
			addSegment(segments[i]);
		if (this._closed && length > 0) {
			addSegment(segments[0], true);
			parts.push('z');
		}
		return parts.join('');
	},

	isEmpty: function() {
		return !this._segments.length;
	},

	_transformContent: function(matrix) {
		var segments = this._segments,
			coords = new Array(6);
		for (var i = 0, l = segments.length; i < l; i++)
			segments[i]._transformCoordinates(matrix, coords, true);
		return true;
	},

	_add: function(segs, index) {
		var segments = this._segments,
			curves = this._curves,
			amount = segs.length,
			append = index == null,
			index = append ? segments.length : index;
		for (var i = 0; i < amount; i++) {
			var segment = segs[i];
			if (segment._path)
				segment = segs[i] = segment.clone();
			segment._path = this;
			segment._index = index + i;
			if (segment._selection)
				this._updateSelection(segment, 0, segment._selection);
		}
		if (append) {
			Base.push(segments, segs);
		} else {
			segments.splice.apply(segments, [index, 0].concat(segs));
			for (var i = index + amount, l = segments.length; i < l; i++)
				segments[i]._index = i;
		}
		if (curves) {
			var total = this._countCurves(),
				start = index > 0 && index + amount - 1 === total ? index - 1
					: index,
				insert = start,
				end = Math.min(start + amount, total);
			if (segs._curves) {
				curves.splice.apply(curves, [start, 0].concat(segs._curves));
				insert += segs._curves.length;
			}
			for (var i = insert; i < end; i++)
				curves.splice(i, 0, new Curve(this, null, null));
			this._adjustCurves(start, end);
		}
		this._changed(41);
		return segs;
	},

	_adjustCurves: function(start, end) {
		var segments = this._segments,
			curves = this._curves,
			curve;
		for (var i = start; i < end; i++) {
			curve = curves[i];
			curve._path = this;
			curve._segment1 = segments[i];
			curve._segment2 = segments[i + 1] || segments[0];
			curve._changed();
		}
		if (curve = curves[this._closed && !start ? segments.length - 1
				: start - 1]) {
			curve._segment2 = segments[start] || segments[0];
			curve._changed();
		}
		if (curve = curves[end]) {
			curve._segment1 = segments[end];
			curve._changed();
		}
	},

	_countCurves: function() {
		var length = this._segments.length;
		return !this._closed && length > 0 ? length - 1 : length;
	},

	add: function(segment1 ) {
		var args = arguments;
		return args.length > 1 && typeof segment1 !== 'number'
			? this._add(Segment.readList(args))
			: this._add([ Segment.read(args) ])[0];
	},

	insert: function(index, segment1 ) {
		var args = arguments;
		return args.length > 2 && typeof segment1 !== 'number'
			? this._add(Segment.readList(args, 1), index)
			: this._add([ Segment.read(args, 1) ], index)[0];
	},

	addSegment: function() {
		return this._add([ Segment.read(arguments) ])[0];
	},

	insertSegment: function(index ) {
		return this._add([ Segment.read(arguments, 1) ], index)[0];
	},

	addSegments: function(segments) {
		return this._add(Segment.readList(segments));
	},

	insertSegments: function(index, segments) {
		return this._add(Segment.readList(segments), index);
	},

	removeSegment: function(index) {
		return this.removeSegments(index, index + 1)[0] || null;
	},

	removeSegments: function(start, end, _includeCurves) {
		start = start || 0;
		end = Base.pick(end, this._segments.length);
		var segments = this._segments,
			curves = this._curves,
			count = segments.length,
			removed = segments.splice(start, end - start),
			amount = removed.length;
		if (!amount)
			return removed;
		for (var i = 0; i < amount; i++) {
			var segment = removed[i];
			if (segment._selection)
				this._updateSelection(segment, segment._selection, 0);
			segment._index = segment._path = null;
		}
		for (var i = start, l = segments.length; i < l; i++)
			segments[i]._index = i;
		if (curves) {
			var index = start > 0 && end === count + (this._closed ? 1 : 0)
					? start - 1
					: start,
				curves = curves.splice(index, amount);
			for (var i = curves.length - 1; i >= 0; i--)
				curves[i]._path = null;
			if (_includeCurves)
				removed._curves = curves.slice(1);
			this._adjustCurves(index, index);
		}
		this._changed(41);
		return removed;
	},

	clear: '#removeSegments',

	hasHandles: function() {
		var segments = this._segments;
		for (var i = 0, l = segments.length; i < l; i++) {
			if (segments[i].hasHandles())
				return true;
		}
		return false;
	},

	clearHandles: function() {
		var segments = this._segments;
		for (var i = 0, l = segments.length; i < l; i++)
			segments[i].clearHandles();
	},

	getLength: function() {
		if (this._length == null) {
			var curves = this.getCurves(),
				length = 0;
			for (var i = 0, l = curves.length; i < l; i++)
				length += curves[i].getLength();
			this._length = length;
		}
		return this._length;
	},

	getArea: function() {
		var area = this._area;
		if (area == null) {
			var segments = this._segments,
				closed = this._closed;
			area = 0;
			for (var i = 0, l = segments.length; i < l; i++) {
				var last = i + 1 === l;
				area += Curve.getArea(Curve.getValues(
						segments[i], segments[last ? 0 : i + 1],
						null, last && !closed));
			}
			this._area = area;
		}
		return area;
	},

	isFullySelected: function() {
		var length = this._segments.length;
		return this.isSelected() && length > 0 && this._segmentSelection
				=== length * 7;
	},

	setFullySelected: function(selected) {
		if (selected)
			this._selectSegments(true);
		this.setSelected(selected);
	},

	setSelection: function setSelection(selection) {
		if (!(selection & 1))
			this._selectSegments(false);
		setSelection.base.call(this, selection);
	},

	_selectSegments: function(selected) {
		var segments = this._segments,
			length = segments.length,
			selection = selected ? 7 : 0;
		this._segmentSelection = selection * length;
		for (var i = 0; i < length; i++)
			segments[i]._selection = selection;
	},

	_updateSelection: function(segment, oldSelection, newSelection) {
		segment._selection = newSelection;
		var selection = this._segmentSelection += newSelection - oldSelection;
		if (selection > 0)
			this.setSelected(true);
	},

	divideAt: function(location) {
		var loc = this.getLocationAt(location),
			curve;
		return loc && (curve = loc.getCurve().divideAt(loc.getCurveOffset()))
				? curve._segment1
				: null;
	},

	splitAt: function(location) {
		var loc = this.getLocationAt(location),
			index = loc && loc.index,
			time = loc && loc.time,
			tMin = 1e-8,
			tMax = 1 - tMin;
		if (time > tMax) {
			index++;
			time = 0;
		}
		var curves = this.getCurves();
		if (index >= 0 && index < curves.length) {
			if (time >= tMin) {
				curves[index++].divideAtTime(time);
			}
			var segs = this.removeSegments(index, this._segments.length, true),
				path;
			if (this._closed) {
				this.setClosed(false);
				path = this;
			} else {
				path = new Path(Item.NO_INSERT);
				path.insertAbove(this);
				path.copyAttributes(this);
			}
			path._add(segs, 0);
			this.addSegment(segs[0]);
			return path;
		}
		return null;
	},

	split: function(index, time) {
		var curve,
			location = time === undefined ? index
				: (curve = this.getCurves()[index])
					&& curve.getLocationAtTime(time);
		return location != null ? this.splitAt(location) : null;
	},

	join: function(path, tolerance) {
		var epsilon = tolerance || 0;
		if (path && path !== this) {
			var segments = path._segments,
				last1 = this.getLastSegment(),
				last2 = path.getLastSegment();
			if (!last2)
				return this;
			if (last1 && last1._point.isClose(last2._point, epsilon))
				path.reverse();
			var first2 = path.getFirstSegment();
			if (last1 && last1._point.isClose(first2._point, epsilon)) {
				last1.setHandleOut(first2._handleOut);
				this._add(segments.slice(1));
			} else {
				var first1 = this.getFirstSegment();
				if (first1 && first1._point.isClose(first2._point, epsilon))
					path.reverse();
				last2 = path.getLastSegment();
				if (first1 && first1._point.isClose(last2._point, epsilon)) {
					first1.setHandleIn(last2._handleIn);
					this._add(segments.slice(0, segments.length - 1), 0);
				} else {
					this._add(segments.slice());
				}
			}
			if (path._closed)
				this._add([segments[0]]);
			path.remove();
		}
		var first = this.getFirstSegment(),
			last = this.getLastSegment();
		if (first !== last && first._point.isClose(last._point, epsilon)) {
			first.setHandleIn(last._handleIn);
			last.remove();
			this.setClosed(true);
		}
		return this;
	},

	reduce: function(options) {
		var curves = this.getCurves(),
			simplify = options && options.simplify,
			tolerance = simplify ? 1e-7 : 0;
		for (var i = curves.length - 1; i >= 0; i--) {
			var curve = curves[i];
			if (!curve.hasHandles() && (!curve.hasLength(tolerance)
					|| simplify && curve.isCollinear(curve.getNext())))
				curve.remove();
		}
		return this;
	},

	reverse: function() {
		this._segments.reverse();
		for (var i = 0, l = this._segments.length; i < l; i++) {
			var segment = this._segments[i];
			var handleIn = segment._handleIn;
			segment._handleIn = segment._handleOut;
			segment._handleOut = handleIn;
			segment._index = i;
		}
		this._curves = null;
		this._changed(9);
	},

	flatten: function(flatness) {
		var flattener = new PathFlattener(this, flatness || 0.25, 256, true),
			parts = flattener.parts,
			length = parts.length,
			segments = [];
		for (var i = 0; i < length; i++) {
			segments.push(new Segment(parts[i].curve.slice(0, 2)));
		}
		if (!this._closed && length > 0) {
			segments.push(new Segment(parts[length - 1].curve.slice(6)));
		}
		this.setSegments(segments);
	},

	simplify: function(tolerance) {
		var segments = new PathFitter(this).fit(tolerance || 2.5);
		if (segments)
			this.setSegments(segments);
		return !!segments;
	},

	smooth: function(options) {
		var that = this,
			opts = options || {},
			type = opts.type || 'asymmetric',
			segments = this._segments,
			length = segments.length,
			closed = this._closed;

		function getIndex(value, _default) {
			var index = value && value.index;
			if (index != null) {
				var path = value.path;
				if (path && path !== that)
					throw new Error(value._class + ' ' + index + ' of ' + path
							+ ' is not part of ' + that);
				if (_default && value instanceof Curve)
					index++;
			} else {
				index = typeof value === 'number' ? value : _default;
			}
			return Math.min(index < 0 && closed
					? index % length
					: index < 0 ? index + length : index, length - 1);
		}

		var loop = closed && opts.from === undefined && opts.to === undefined,
			from = getIndex(opts.from, 0),
			to = getIndex(opts.to, length - 1);

		if (from > to) {
			if (closed) {
				from -= length;
			} else {
				var tmp = from;
				from = to;
				to = tmp;
			}
		}
		if (/^(?:asymmetric|continuous)$/.test(type)) {
			var asymmetric = type === 'asymmetric',
				min = Math.min,
				amount = to - from + 1,
				n = amount - 1,
				padding = loop ? min(amount, 4) : 1,
				paddingLeft = padding,
				paddingRight = padding,
				knots = [];
			if (!closed) {
				paddingLeft = min(1, from);
				paddingRight = min(1, length - to - 1);
			}
			n += paddingLeft + paddingRight;
			if (n <= 1)
				return;
			for (var i = 0, j = from - paddingLeft; i <= n; i++, j++) {
				knots[i] = segments[(j < 0 ? j + length : j) % length]._point;
			}

			var x = knots[0]._x + 2 * knots[1]._x,
				y = knots[0]._y + 2 * knots[1]._y,
				f = 2,
				n_1 = n - 1,
				rx = [x],
				ry = [y],
				rf = [f],
				px = [],
				py = [];
			for (var i = 1; i < n; i++) {
				var internal = i < n_1,
					a = internal ? 1 : asymmetric ? 1 : 2,
					b = internal ? 4 : asymmetric ? 2 : 7,
					u = internal ? 4 : asymmetric ? 3 : 8,
					v = internal ? 2 : asymmetric ? 0 : 1,
					m = a / f;
				f = rf[i] = b - m;
				x = rx[i] = u * knots[i]._x + v * knots[i + 1]._x - m * x;
				y = ry[i] = u * knots[i]._y + v * knots[i + 1]._y - m * y;
			}

			px[n_1] = rx[n_1] / rf[n_1];
			py[n_1] = ry[n_1] / rf[n_1];
			for (var i = n - 2; i >= 0; i--) {
				px[i] = (rx[i] - px[i + 1]) / rf[i];
				py[i] = (ry[i] - py[i + 1]) / rf[i];
			}
			px[n] = (3 * knots[n]._x - px[n_1]) / 2;
			py[n] = (3 * knots[n]._y - py[n_1]) / 2;

			for (var i = paddingLeft, max = n - paddingRight, j = from;
					i <= max; i++, j++) {
				var segment = segments[j < 0 ? j + length : j],
					pt = segment._point,
					hx = px[i] - pt._x,
					hy = py[i] - pt._y;
				if (loop || i < max)
					segment.setHandleOut(hx, hy);
				if (loop || i > paddingLeft)
					segment.setHandleIn(-hx, -hy);
			}
		} else {
			for (var i = from; i <= to; i++) {
				segments[i < 0 ? i + length : i].smooth(opts,
						!loop && i === from, !loop && i === to);
			}
		}
	},

	toShape: function(insert) {
		if (!this._closed)
			return null;

		var segments = this._segments,
			type,
			size,
			radius,
			topCenter;

		function isCollinear(i, j) {
			var seg1 = segments[i],
				seg2 = seg1.getNext(),
				seg3 = segments[j],
				seg4 = seg3.getNext();
			return seg1._handleOut.isZero() && seg2._handleIn.isZero()
					&& seg3._handleOut.isZero() && seg4._handleIn.isZero()
					&& seg2._point.subtract(seg1._point).isCollinear(
						seg4._point.subtract(seg3._point));
		}

		function isOrthogonal(i) {
			var seg2 = segments[i],
				seg1 = seg2.getPrevious(),
				seg3 = seg2.getNext();
			return seg1._handleOut.isZero() && seg2._handleIn.isZero()
					&& seg2._handleOut.isZero() && seg3._handleIn.isZero()
					&& seg2._point.subtract(seg1._point).isOrthogonal(
						seg3._point.subtract(seg2._point));
		}

		function isArc(i) {
			var seg1 = segments[i],
				seg2 = seg1.getNext(),
				handle1 = seg1._handleOut,
				handle2 = seg2._handleIn,
				kappa = 0.5522847498307936;
			if (handle1.isOrthogonal(handle2)) {
				var pt1 = seg1._point,
					pt2 = seg2._point,
					corner = new Line(pt1, handle1, true).intersect(
							new Line(pt2, handle2, true), true);
				return corner && Numerical.isZero(handle1.getLength() /
						corner.subtract(pt1).getLength() - kappa)
					&& Numerical.isZero(handle2.getLength() /
						corner.subtract(pt2).getLength() - kappa);
			}
			return false;
		}

		function getDistance(i, j) {
			return segments[i]._point.getDistance(segments[j]._point);
		}

		if (!this.hasHandles() && segments.length === 4
				&& isCollinear(0, 2) && isCollinear(1, 3) && isOrthogonal(1)) {
			type = Shape.Rectangle;
			size = new Size(getDistance(0, 3), getDistance(0, 1));
			topCenter = segments[1]._point.add(segments[2]._point).divide(2);
		} else if (segments.length === 8 && isArc(0) && isArc(2) && isArc(4)
				&& isArc(6) && isCollinear(1, 5) && isCollinear(3, 7)) {
			type = Shape.Rectangle;
			size = new Size(getDistance(1, 6), getDistance(0, 3));
			radius = size.subtract(new Size(getDistance(0, 7),
					getDistance(1, 2))).divide(2);
			topCenter = segments[3]._point.add(segments[4]._point).divide(2);
		} else if (segments.length === 4
				&& isArc(0) && isArc(1) && isArc(2) && isArc(3)) {
			if (Numerical.isZero(getDistance(0, 2) - getDistance(1, 3))) {
				type = Shape.Circle;
				radius = getDistance(0, 2) / 2;
			} else {
				type = Shape.Ellipse;
				radius = new Size(getDistance(2, 0) / 2, getDistance(3, 1) / 2);
			}
			topCenter = segments[1]._point;
		}

		if (type) {
			var center = this.getPosition(true),
				shape = new type({
					center: center,
					size: size,
					radius: radius,
					insert: false
				});
			shape.copyAttributes(this, true);
			shape._matrix.prepend(this._matrix);
			shape.rotate(topCenter.subtract(center).getAngle() + 90);
			if (insert === undefined || insert)
				shape.insertAbove(this);
			return shape;
		}
		return null;
	},

	toPath: '#clone',

	compare: function compare(path) {
		if (!path || path instanceof CompoundPath)
			return compare.base.call(this, path);
		var curves1 = this.getCurves(),
			curves2 = path.getCurves(),
			length1 = curves1.length,
			length2 = curves2.length;
		if (!length1 || !length2) {
			return length1 == length2;
		}
		var v1 = curves1[0].getValues(),
			values2 = [],
			pos1 = 0, pos2,
			end1 = 0, end2;
		for (var i = 0; i < length2; i++) {
			var v2 = curves2[i].getValues();
			values2.push(v2);
			var overlaps = Curve.getOverlaps(v1, v2);
			if (overlaps) {
				pos2 = !i && overlaps[0][0] > 0 ? length2 - 1 : i;
				end2 = overlaps[0][1];
				break;
			}
		}
		var abs = Math.abs,
			epsilon = 1e-8,
			v2 = values2[pos2],
			start2;
		while (v1 && v2) {
			var overlaps = Curve.getOverlaps(v1, v2);
			if (overlaps) {
				var t1 = overlaps[0][0];
				if (abs(t1 - end1) < epsilon) {
					end1 = overlaps[1][0];
					if (end1 === 1) {
						v1 = ++pos1 < length1 ? curves1[pos1].getValues() : null;
						end1 = 0;
					}
					var t2 = overlaps[0][1];
					if (abs(t2 - end2) < epsilon) {
						if (!start2)
							start2 = [pos2, t2];
						end2 = overlaps[1][1];
						if (end2 === 1) {
							if (++pos2 >= length2)
								pos2 = 0;
							v2 = values2[pos2] || curves2[pos2].getValues();
							end2 = 0;
						}
						if (!v1) {
							return start2[0] === pos2 && start2[1] === end2;
						}
						continue;
					}
				}
			}
			break;
		}
		return false;
	},

	_hitTestSelf: function(point, options, viewMatrix, strokeMatrix) {
		var that = this,
			style = this.getStyle(),
			segments = this._segments,
			numSegments = segments.length,
			closed = this._closed,
			tolerancePadding = options._tolerancePadding,
			strokePadding = tolerancePadding,
			join, cap, miterLimit,
			area, loc, res,
			hitStroke = options.stroke && style.hasStroke(),
			hitFill = options.fill && style.hasFill(),
			hitCurves = options.curves,
			strokeRadius = hitStroke
					? style.getStrokeWidth() / 2
					: hitFill && options.tolerance > 0 || hitCurves
						? 0 : null;
		if (strokeRadius !== null) {
			if (strokeRadius > 0) {
				join = style.getStrokeJoin();
				cap = style.getStrokeCap();
				miterLimit = style.getMiterLimit();
				strokePadding = strokePadding.add(
					Path._getStrokePadding(strokeRadius, strokeMatrix));
			} else {
				join = cap = 'round';
			}
		}

		function isCloseEnough(pt, padding) {
			return point.subtract(pt).divide(padding).length <= 1;
		}

		function checkSegmentPoint(seg, pt, name) {
			if (!options.selected || pt.isSelected()) {
				var anchor = seg._point;
				if (pt !== anchor)
					pt = pt.add(anchor);
				if (isCloseEnough(pt, strokePadding)) {
					return new HitResult(name, that, {
						segment: seg,
						point: pt
					});
				}
			}
		}

		function checkSegmentPoints(seg, ends) {
			return (ends || options.segments)
				&& checkSegmentPoint(seg, seg._point, 'segment')
				|| (!ends && options.handles) && (
					checkSegmentPoint(seg, seg._handleIn, 'handle-in') ||
					checkSegmentPoint(seg, seg._handleOut, 'handle-out'));
		}

		function addToArea(point) {
			area.add(point);
		}

		function checkSegmentStroke(segment) {
			var isJoin = closed || segment._index > 0
					&& segment._index < numSegments - 1;
			if ((isJoin ? join : cap) === 'round') {
				return isCloseEnough(segment._point, strokePadding);
			} else {
				area = new Path({ internal: true, closed: true });
				if (isJoin) {
					if (!segment.isSmooth()) {
						Path._addBevelJoin(segment, join, strokeRadius,
							   miterLimit, null, strokeMatrix, addToArea, true);
					}
				} else if (cap === 'square') {
					Path._addSquareCap(segment, cap, strokeRadius, null,
							strokeMatrix, addToArea, true);
				}
				if (!area.isEmpty()) {
					var loc;
					return area.contains(point)
						|| (loc = area.getNearestLocation(point))
							&& isCloseEnough(loc.getPoint(), tolerancePadding);
				}
			}
		}

		if (options.ends && !options.segments && !closed) {
			if (res = checkSegmentPoints(segments[0], true)
					|| checkSegmentPoints(segments[numSegments - 1], true))
				return res;
		} else if (options.segments || options.handles) {
			for (var i = 0; i < numSegments; i++)
				if (res = checkSegmentPoints(segments[i]))
					return res;
		}
		if (strokeRadius !== null) {
			loc = this.getNearestLocation(point);
			if (loc) {
				var time = loc.getTime();
				if (time === 0 || time === 1 && numSegments > 1) {
					if (!checkSegmentStroke(loc.getSegment()))
						loc = null;
				} else if (!isCloseEnough(loc.getPoint(), strokePadding)) {
					loc = null;
				}
			}
			if (!loc && join === 'miter' && numSegments > 1) {
				for (var i = 0; i < numSegments; i++) {
					var segment = segments[i];
					if (point.getDistance(segment._point)
							<= miterLimit * strokeRadius
							&& checkSegmentStroke(segment)) {
						loc = segment.getLocation();
						break;
					}
				}
			}
		}
		return !loc && hitFill && this._contains(point)
				|| loc && !hitStroke && !hitCurves
					? new HitResult('fill', this)
					: loc
						? new HitResult(hitStroke ? 'stroke' : 'curve', this, {
							location: loc,
							point: loc.getPoint()
						})
						: null;
	}

}, Base.each(Curve._evaluateMethods,
	function(name) {
		this[name + 'At'] = function(offset) {
			var loc = this.getLocationAt(offset);
			return loc && loc[name]();
		};
	},
{
	beans: false,

	getLocationOf: function() {
		var point = Point.read(arguments),
			curves = this.getCurves();
		for (var i = 0, l = curves.length; i < l; i++) {
			var loc = curves[i].getLocationOf(point);
			if (loc)
				return loc;
		}
		return null;
	},

	getOffsetOf: function() {
		var loc = this.getLocationOf.apply(this, arguments);
		return loc ? loc.getOffset() : null;
	},

	getLocationAt: function(offset) {
		if (typeof offset === 'number') {
			var curves = this.getCurves(),
				length = 0;
			for (var i = 0, l = curves.length; i < l; i++) {
				var start = length,
					curve = curves[i];
				length += curve.getLength();
				if (length > offset) {
					return curve.getLocationAt(offset - start);
				}
			}
			if (curves.length > 0 && offset <= this.getLength()) {
				return new CurveLocation(curves[curves.length - 1], 1);
			}
		} else if (offset && offset.getPath && offset.getPath() === this) {
			return offset;
		}
		return null;
	},

	getOffsetsWithTangent: function() {
		var tangent = Point.read(arguments);
		if (tangent.isZero()) {
			return [];
		}

		var offsets = [];
		var curveStart = 0;
		var curves = this.getCurves();
		for (var i = 0, l = curves.length; i < l; i++) {
			var curve = curves[i];
			var curveTimes = curve.getTimesWithTangent(tangent);
			for (var j = 0, m = curveTimes.length; j < m; j++) {
				var offset = curveStart + curve.getOffsetAtTime(curveTimes[j]);
				if (offsets.indexOf(offset) < 0) {
					offsets.push(offset);
				}
			}
			curveStart += curve.length;
		}
		return offsets;
	}
}),
new function() {

	function drawHandles(ctx, segments, matrix, size) {
		if (size <= 0) return;

		var half = size / 2,
			miniSize = size - 2,
			miniHalf = half - 1,
			coords = new Array(6),
			pX, pY;

		function drawHandle(index) {
			var hX = coords[index],
				hY = coords[index + 1];
			if (pX != hX || pY != hY) {
				ctx.beginPath();
				ctx.moveTo(pX, pY);
				ctx.lineTo(hX, hY);
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
				ctx.fill();
			}
		}

		for (var i = 0, l = segments.length; i < l; i++) {
			var segment = segments[i],
				selection = segment._selection;
			segment._transformCoordinates(matrix, coords);
			pX = coords[0];
			pY = coords[1];
			if (selection & 2)
				drawHandle(2);
			if (selection & 4)
				drawHandle(4);
			ctx.fillRect(pX - half, pY - half, size, size);
			if (miniSize > 0 && !(selection & 1)) {
				var fillStyle = ctx.fillStyle;
				ctx.fillStyle = '#ffffff';
				ctx.fillRect(pX - miniHalf, pY - miniHalf, miniSize, miniSize);
				ctx.fillStyle = fillStyle;
			}
		}
	}

	function drawSegments(ctx, path, matrix) {
		var segments = path._segments,
			length = segments.length,
			coords = new Array(6),
			first = true,
			curX, curY,
			prevX, prevY,
			inX, inY,
			outX, outY;

		function drawSegment(segment) {
			if (matrix) {
				segment._transformCoordinates(matrix, coords);
				curX = coords[0];
				curY = coords[1];
			} else {
				var point = segment._point;
				curX = point._x;
				curY = point._y;
			}
			if (first) {
				ctx.moveTo(curX, curY);
				first = false;
			} else {
				if (matrix) {
					inX = coords[2];
					inY = coords[3];
				} else {
					var handle = segment._handleIn;
					inX = curX + handle._x;
					inY = curY + handle._y;
				}
				if (inX === curX && inY === curY
						&& outX === prevX && outY === prevY) {
					ctx.lineTo(curX, curY);
				} else {
					ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
				}
			}
			prevX = curX;
			prevY = curY;
			if (matrix) {
				outX = coords[4];
				outY = coords[5];
			} else {
				var handle = segment._handleOut;
				outX = prevX + handle._x;
				outY = prevY + handle._y;
			}
		}

		for (var i = 0; i < length; i++)
			drawSegment(segments[i]);
		if (path._closed && length > 0)
			drawSegment(segments[0]);
	}

	return {
		_draw: function(ctx, param, viewMatrix, strokeMatrix) {
			var dontStart = param.dontStart,
				dontPaint = param.dontFinish || param.clip,
				style = this.getStyle(),
				hasFill = style.hasFill(),
				hasStroke = style.hasStroke(),
				dashArray = style.getDashArray(),
				dashLength = !paper.support.nativeDash && hasStroke
						&& dashArray && dashArray.length;

			if (!dontStart)
				ctx.beginPath();

			if (hasFill || hasStroke && !dashLength || dontPaint) {
				drawSegments(ctx, this, strokeMatrix);
				if (this._closed)
					ctx.closePath();
			}

			function getOffset(i) {
				return dashArray[((i % dashLength) + dashLength) % dashLength];
			}

			if (!dontPaint && (hasFill || hasStroke)) {
				this._setStyles(ctx, param, viewMatrix);
				if (hasFill) {
					ctx.fill(style.getFillRule());
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (hasStroke) {
					if (dashLength) {
						if (!dontStart)
							ctx.beginPath();
						var flattener = new PathFlattener(this, 0.25, 32, false,
								strokeMatrix),
							length = flattener.length,
							from = -style.getDashOffset(), to,
							i = 0;
						while (from > 0) {
							from -= getOffset(i--) + getOffset(i--);
						}
						while (from < length) {
							to = from + getOffset(i++);
							if (from > 0 || to > 0)
								flattener.drawPart(ctx,
										Math.max(from, 0), Math.max(to, 0));
							from = to + getOffset(i++);
						}
					}
					ctx.stroke();
				}
			}
		},

		_drawSelected: function(ctx, matrix) {
			ctx.beginPath();
			drawSegments(ctx, this, matrix);
			ctx.stroke();
			drawHandles(ctx, this._segments, matrix, paper.settings.handleSize);
		}
	};
},
new function() {
	function getCurrentSegment(that) {
		var segments = that._segments;
		if (!segments.length)
			throw new Error('Use a moveTo() command first');
		return segments[segments.length - 1];
	}

	return {
		moveTo: function() {
			var segments = this._segments;
			if (segments.length === 1)
				this.removeSegment(0);
			if (!segments.length)
				this._add([ new Segment(Point.read(arguments)) ]);
		},

		moveBy: function() {
			throw new Error('moveBy() is unsupported on Path items.');
		},

		lineTo: function() {
			this._add([ new Segment(Point.read(arguments)) ]);
		},

		cubicCurveTo: function() {
			var args = arguments,
				handle1 = Point.read(args),
				handle2 = Point.read(args),
				to = Point.read(args),
				current = getCurrentSegment(this);
			current.setHandleOut(handle1.subtract(current._point));
			this._add([ new Segment(to, handle2.subtract(to)) ]);
		},

		quadraticCurveTo: function() {
			var args = arguments,
				handle = Point.read(args),
				to = Point.read(args),
				current = getCurrentSegment(this)._point;
			this.cubicCurveTo(
				handle.add(current.subtract(handle).multiply(1 / 3)),
				handle.add(to.subtract(handle).multiply(1 / 3)),
				to
			);
		},

		curveTo: function() {
			var args = arguments,
				through = Point.read(args),
				to = Point.read(args),
				t = Base.pick(Base.read(args), 0.5),
				t1 = 1 - t,
				current = getCurrentSegment(this)._point,
				handle = through.subtract(current.multiply(t1 * t1))
					.subtract(to.multiply(t * t)).divide(2 * t * t1);
			if (handle.isNaN())
				throw new Error(
					'Cannot put a curve through points with parameter = ' + t);
			this.quadraticCurveTo(handle, to);
		},

		arcTo: function() {
			var args = arguments,
				abs = Math.abs,
				sqrt = Math.sqrt,
				current = getCurrentSegment(this),
				from = current._point,
				to = Point.read(args),
				through,
				peek = Base.peek(args),
				clockwise = Base.pick(peek, true),
				center, extent, vector, matrix;
			if (typeof clockwise === 'boolean') {
				var middle = from.add(to).divide(2),
				through = middle.add(middle.subtract(from).rotate(
						clockwise ? -90 : 90));
			} else if (Base.remain(args) <= 2) {
				through = to;
				to = Point.read(args);
			} else if (!from.equals(to)) {
				var radius = Size.read(args),
					isZero = Numerical.isZero;
				if (isZero(radius.width) || isZero(radius.height))
					return this.lineTo(to);
				var rotation = Base.read(args),
					clockwise = !!Base.read(args),
					large = !!Base.read(args),
					middle = from.add(to).divide(2),
					pt = from.subtract(middle).rotate(-rotation),
					x = pt.x,
					y = pt.y,
					rx = abs(radius.width),
					ry = abs(radius.height),
					rxSq = rx * rx,
					rySq = ry * ry,
					xSq = x * x,
					ySq = y * y;
				var factor = sqrt(xSq / rxSq + ySq / rySq);
				if (factor > 1) {
					rx *= factor;
					ry *= factor;
					rxSq = rx * rx;
					rySq = ry * ry;
				}
				factor = (rxSq * rySq - rxSq * ySq - rySq * xSq) /
						(rxSq * ySq + rySq * xSq);
				if (abs(factor) < 1e-12)
					factor = 0;
				if (factor < 0)
					throw new Error(
							'Cannot create an arc with the given arguments');
				center = new Point(rx * y / ry, -ry * x / rx)
						.multiply((large === clockwise ? -1 : 1) * sqrt(factor))
						.rotate(rotation).add(middle);
				matrix = new Matrix().translate(center).rotate(rotation)
						.scale(rx, ry);
				vector = matrix._inverseTransform(from);
				extent = vector.getDirectedAngle(matrix._inverseTransform(to));
				if (!clockwise && extent > 0)
					extent -= 360;
				else if (clockwise && extent < 0)
					extent += 360;
			}
			if (through) {
				var l1 = new Line(from.add(through).divide(2),
							through.subtract(from).rotate(90), true),
					l2 = new Line(through.add(to).divide(2),
							to.subtract(through).rotate(90), true),
					line = new Line(from, to),
					throughSide = line.getSide(through);
				center = l1.intersect(l2, true);
				if (!center) {
					if (!throughSide)
						return this.lineTo(to);
					throw new Error(
							'Cannot create an arc with the given arguments');
				}
				vector = from.subtract(center);
				extent = vector.getDirectedAngle(to.subtract(center));
				var centerSide = line.getSide(center, true);
				if (centerSide === 0) {
					extent = throughSide * abs(extent);
				} else if (throughSide === centerSide) {
					extent += extent < 0 ? 360 : -360;
				}
			}
			if (extent) {
				var epsilon = 1e-7,
					ext = abs(extent),
					count = ext >= 360 ? 4 : Math.ceil((ext - epsilon) / 90),
					inc = extent / count,
					half = inc * Math.PI / 360,
					z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)),
					segments = [];
				for (var i = 0; i <= count; i++) {
					var pt = to,
						out = null;
					if (i < count) {
						out = vector.rotate(90).multiply(z);
						if (matrix) {
							pt = matrix._transformPoint(vector);
							out = matrix._transformPoint(vector.add(out))
									.subtract(pt);
						} else {
							pt = center.add(vector);
						}
					}
					if (!i) {
						current.setHandleOut(out);
					} else {
						var _in = vector.rotate(-90).multiply(z);
						if (matrix) {
							_in = matrix._transformPoint(vector.add(_in))
									.subtract(pt);
						}
						segments.push(new Segment(pt, _in, out));
					}
					vector = vector.rotate(inc);
				}
				this._add(segments);
			}
		},

		lineBy: function() {
			var to = Point.read(arguments),
				current = getCurrentSegment(this)._point;
			this.lineTo(current.add(to));
		},

		curveBy: function() {
			var args = arguments,
				through = Point.read(args),
				to = Point.read(args),
				parameter = Base.read(args),
				current = getCurrentSegment(this)._point;
			this.curveTo(current.add(through), current.add(to), parameter);
		},

		cubicCurveBy: function() {
			var args = arguments,
				handle1 = Point.read(args),
				handle2 = Point.read(args),
				to = Point.read(args),
				current = getCurrentSegment(this)._point;
			this.cubicCurveTo(current.add(handle1), current.add(handle2),
					current.add(to));
		},

		quadraticCurveBy: function() {
			var args = arguments,
				handle = Point.read(args),
				to = Point.read(args),
				current = getCurrentSegment(this)._point;
			this.quadraticCurveTo(current.add(handle), current.add(to));
		},

		arcBy: function() {
			var args = arguments,
				current = getCurrentSegment(this)._point,
				point = current.add(Point.read(args)),
				clockwise = Base.pick(Base.peek(args), true);
			if (typeof clockwise === 'boolean') {
				this.arcTo(point, clockwise);
			} else {
				this.arcTo(point, current.add(Point.read(args)));
			}
		},

		closePath: function(tolerance) {
			this.setClosed(true);
			this.join(this, tolerance);
		}
	};
}, {

	_getBounds: function(matrix, options) {
		var method = options.handle
				? 'getHandleBounds'
				: options.stroke
				? 'getStrokeBounds'
				: 'getBounds';
		return Path[method](this._segments, this._closed, this, matrix, options);
	},

statics: {
	getBounds: function(segments, closed, path, matrix, options, strokePadding) {
		var first = segments[0];
		if (!first)
			return new Rectangle();
		var coords = new Array(6),
			prevCoords = first._transformCoordinates(matrix, new Array(6)),
			min = prevCoords.slice(0, 2),
			max = min.slice(),
			roots = new Array(2);

		function processSegment(segment) {
			segment._transformCoordinates(matrix, coords);
			for (var i = 0; i < 2; i++) {
				Curve._addBounds(
					prevCoords[i],
					prevCoords[i + 4],
					coords[i + 2],
					coords[i],
					i, strokePadding ? strokePadding[i] : 0, min, max, roots);
			}
			var tmp = prevCoords;
			prevCoords = coords;
			coords = tmp;
		}

		for (var i = 1, l = segments.length; i < l; i++)
			processSegment(segments[i]);
		if (closed)
			processSegment(first);
		return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
	},

	getStrokeBounds: function(segments, closed, path, matrix, options) {
		var style = path.getStyle(),
			stroke = style.hasStroke(),
			strokeWidth = style.getStrokeWidth(),
			strokeMatrix = stroke && path._getStrokeMatrix(matrix, options),
			strokePadding = stroke && Path._getStrokePadding(strokeWidth,
				strokeMatrix),
			bounds = Path.getBounds(segments, closed, path, matrix, options,
				strokePadding);
		if (!stroke)
			return bounds;
		var strokeRadius = strokeWidth / 2,
			join = style.getStrokeJoin(),
			cap = style.getStrokeCap(),
			miterLimit = style.getMiterLimit(),
			joinBounds = new Rectangle(new Size(strokePadding));

		function addPoint(point) {
			bounds = bounds.include(point);
		}

		function addRound(segment) {
			bounds = bounds.unite(
					joinBounds.setCenter(segment._point.transform(matrix)));
		}

		function addJoin(segment, join) {
			if (join === 'round' || segment.isSmooth()) {
				addRound(segment);
			} else {
				Path._addBevelJoin(segment, join, strokeRadius, miterLimit,
						matrix, strokeMatrix, addPoint);
			}
		}

		function addCap(segment, cap) {
			if (cap === 'round') {
				addRound(segment);
			} else {
				Path._addSquareCap(segment, cap, strokeRadius, matrix,
						strokeMatrix, addPoint);
			}
		}

		var length = segments.length - (closed ? 0 : 1);
		if (length > 0) {
			for (var i = 1; i < length; i++) {
				addJoin(segments[i], join);
			}
			if (closed) {
				addJoin(segments[0], join);
			} else {
				addCap(segments[0], cap);
				addCap(segments[segments.length - 1], cap);
			}
		}
		return bounds;
	},

	_getStrokePadding: function(radius, matrix) {
		if (!matrix)
			return [radius, radius];
		var hor = new Point(radius, 0).transform(matrix),
			ver = new Point(0, radius).transform(matrix),
			phi = hor.getAngleInRadians(),
			a = hor.getLength(),
			b = ver.getLength();
		var sin = Math.sin(phi),
			cos = Math.cos(phi),
			tan = Math.tan(phi),
			tx = Math.atan2(b * tan, a),
			ty = Math.atan2(b, tan * a);
		return [Math.abs(a * Math.cos(tx) * cos + b * Math.sin(tx) * sin),
				Math.abs(b * Math.sin(ty) * cos + a * Math.cos(ty) * sin)];
	},

	_addBevelJoin: function(segment, join, radius, miterLimit, matrix,
			strokeMatrix, addPoint, isArea) {
		var curve2 = segment.getCurve(),
			curve1 = curve2.getPrevious(),
			point = curve2.getPoint1().transform(matrix),
			normal1 = curve1.getNormalAtTime(1).multiply(radius)
				.transform(strokeMatrix),
			normal2 = curve2.getNormalAtTime(0).multiply(radius)
				.transform(strokeMatrix),
				angle = normal1.getDirectedAngle(normal2);
		if (angle < 0 || angle >= 180) {
			normal1 = normal1.negate();
			normal2 = normal2.negate();
		}
		if (isArea)
			addPoint(point);
		addPoint(point.add(normal1));
		if (join === 'miter') {
			var corner = new Line(point.add(normal1),
					new Point(-normal1.y, normal1.x), true
				).intersect(new Line(point.add(normal2),
					new Point(-normal2.y, normal2.x), true
				), true);
			if (corner && point.getDistance(corner) <= miterLimit * radius) {
				addPoint(corner);
			}
		}
		addPoint(point.add(normal2));
	},

	_addSquareCap: function(segment, cap, radius, matrix, strokeMatrix,
			addPoint, isArea) {
		var point = segment._point.transform(matrix),
			loc = segment.getLocation(),
			normal = loc.getNormal()
					.multiply(loc.getTime() === 0 ? radius : -radius)
					.transform(strokeMatrix);
		if (cap === 'square') {
			if (isArea) {
				addPoint(point.subtract(normal));
				addPoint(point.add(normal));
			}
			point = point.add(normal.rotate(-90));
		}
		addPoint(point.add(normal));
		addPoint(point.subtract(normal));
	},

	getHandleBounds: function(segments, closed, path, matrix, options) {
		var style = path.getStyle(),
			stroke = options.stroke && style.hasStroke(),
			strokePadding,
			joinPadding;
		if (stroke) {
			var strokeMatrix = path._getStrokeMatrix(matrix, options),
				strokeRadius = style.getStrokeWidth() / 2,
				joinRadius = strokeRadius;
			if (style.getStrokeJoin() === 'miter')
				joinRadius = strokeRadius * style.getMiterLimit();
			if (style.getStrokeCap() === 'square')
				joinRadius = Math.max(joinRadius, strokeRadius * Math.SQRT2);
			strokePadding = Path._getStrokePadding(strokeRadius, strokeMatrix);
			joinPadding = Path._getStrokePadding(joinRadius, strokeMatrix);
		}
		var coords = new Array(6),
			x1 = Infinity,
			x2 = -x1,
			y1 = x1,
			y2 = x2;
		for (var i = 0, l = segments.length; i < l; i++) {
			var segment = segments[i];
			segment._transformCoordinates(matrix, coords);
			for (var j = 0; j < 6; j += 2) {
				var padding = !j ? joinPadding : strokePadding,
					paddingX = padding ? padding[0] : 0,
					paddingY = padding ? padding[1] : 0,
					x = coords[j],
					y = coords[j + 1],
					xn = x - paddingX,
					xx = x + paddingX,
					yn = y - paddingY,
					yx = y + paddingY;
				if (xn < x1) x1 = xn;
				if (xx > x2) x2 = xx;
				if (yn < y1) y1 = yn;
				if (yx > y2) y2 = yx;
			}
		}
		return new Rectangle(x1, y1, x2 - x1, y2 - y1);
	}
}});

Path.inject({ statics: new function() {

	var kappa = 0.5522847498307936,
		ellipseSegments = [
			new Segment([-1, 0], [0, kappa ], [0, -kappa]),
			new Segment([0, -1], [-kappa, 0], [kappa, 0 ]),
			new Segment([1, 0], [0, -kappa], [0, kappa ]),
			new Segment([0, 1], [kappa, 0 ], [-kappa, 0])
		];

	function createPath(segments, closed, args) {
		var props = Base.getNamed(args),
			path = new Path(props && props.insert == false && Item.NO_INSERT);
		path._add(segments);
		path._closed = closed;
		return path.set(props, { insert: true });
	}

	function createEllipse(center, radius, args) {
		var segments = new Array(4);
		for (var i = 0; i < 4; i++) {
			var segment = ellipseSegments[i];
			segments[i] = new Segment(
				segment._point.multiply(radius).add(center),
				segment._handleIn.multiply(radius),
				segment._handleOut.multiply(radius)
			);
		}
		return createPath(segments, true, args);
	}

	return {
		Line: function() {
			var args = arguments;
			return createPath([
				new Segment(Point.readNamed(args, 'from')),
				new Segment(Point.readNamed(args, 'to'))
			], false, args);
		},

		Circle: function() {
			var args = arguments,
				center = Point.readNamed(args, 'center'),
				radius = Base.readNamed(args, 'radius');
			return createEllipse(center, new Size(radius), args);
		},

		Rectangle: function() {
			var args = arguments,
				rect = Rectangle.readNamed(args, 'rectangle'),
				radius = Size.readNamed(args, 'radius', 0,
						{ readNull: true }),
				bl = rect.getBottomLeft(true),
				tl = rect.getTopLeft(true),
				tr = rect.getTopRight(true),
				br = rect.getBottomRight(true),
				segments;
			if (!radius || radius.isZero()) {
				segments = [
					new Segment(bl),
					new Segment(tl),
					new Segment(tr),
					new Segment(br)
				];
			} else {
				radius = Size.min(radius, rect.getSize(true).divide(2));
				var rx = radius.width,
					ry = radius.height,
					hx = rx * kappa,
					hy = ry * kappa;
				segments = [
					new Segment(bl.add(rx, 0), null, [-hx, 0]),
					new Segment(bl.subtract(0, ry), [0, hy]),
					new Segment(tl.add(0, ry), null, [0, -hy]),
					new Segment(tl.add(rx, 0), [-hx, 0], null),
					new Segment(tr.subtract(rx, 0), null, [hx, 0]),
					new Segment(tr.add(0, ry), [0, -hy], null),
					new Segment(br.subtract(0, ry), null, [0, hy]),
					new Segment(br.subtract(rx, 0), [hx, 0])
				];
			}
			return createPath(segments, true, args);
		},

		RoundRectangle: '#Rectangle',

		Ellipse: function() {
			var args = arguments,
				ellipse = Shape._readEllipse(args);
			return createEllipse(ellipse.center, ellipse.radius, args);
		},

		Oval: '#Ellipse',

		Arc: function() {
			var args = arguments,
				from = Point.readNamed(args, 'from'),
				through = Point.readNamed(args, 'through'),
				to = Point.readNamed(args, 'to'),
				props = Base.getNamed(args),
				path = new Path(props && props.insert == false
						&& Item.NO_INSERT);
			path.moveTo(from);
			path.arcTo(through, to);
			return path.set(props);
		},

		RegularPolygon: function() {
			var args = arguments,
				center = Point.readNamed(args, 'center'),
				sides = Base.readNamed(args, 'sides'),
				radius = Base.readNamed(args, 'radius'),
				step = 360 / sides,
				three = sides % 3 === 0,
				vector = new Point(0, three ? -radius : radius),
				offset = three ? -1 : 0.5,
				segments = new Array(sides);
			for (var i = 0; i < sides; i++)
				segments[i] = new Segment(center.add(
					vector.rotate((i + offset) * step)));
			return createPath(segments, true, args);
		},

		Star: function() {
			var args = arguments,
				center = Point.readNamed(args, 'center'),
				points = Base.readNamed(args, 'points') * 2,
				radius1 = Base.readNamed(args, 'radius1'),
				radius2 = Base.readNamed(args, 'radius2'),
				step = 360 / points,
				vector = new Point(0, -1),
				segments = new Array(points);
			for (var i = 0; i < points; i++)
				segments[i] = new Segment(center.add(vector.rotate(step * i)
						.multiply(i % 2 ? radius2 : radius1)));
			return createPath(segments, true, args);
		}
	};
}});

var CompoundPath = PathItem.extend({
	_class: 'CompoundPath',
	_serializeFields: {
		children: []
	},
	beans: true,

	initialize: function CompoundPath(arg) {
		this._children = [];
		this._namedChildren = {};
		if (!this._initialize(arg)) {
			if (typeof arg === 'string') {
				this.setPathData(arg);
			} else {
				this.addChildren(Array.isArray(arg) ? arg : arguments);
			}
		}
	},

	insertChildren: function insertChildren(index, items) {
		var list = items,
			first = list[0];
		if (first && typeof first[0] === 'number')
			list = [list];
		for (var i = items.length - 1; i >= 0; i--) {
			var item = list[i];
			if (list === items && !(item instanceof Path))
				list = Base.slice(list);
			if (Array.isArray(item)) {
				list[i] = new Path({ segments: item, insert: false });
			} else if (item instanceof CompoundPath) {
				list.splice.apply(list, [i, 1].concat(item.removeChildren()));
				item.remove();
			}
		}
		return insertChildren.base.call(this, index, list);
	},

	reduce: function reduce(options) {
		var children = this._children;
		for (var i = children.length - 1; i >= 0; i--) {
			var path = children[i].reduce(options);
			if (path.isEmpty())
				path.remove();
		}
		if (!children.length) {
			var path = new Path(Item.NO_INSERT);
			path.copyAttributes(this);
			path.insertAbove(this);
			this.remove();
			return path;
		}
		return reduce.base.call(this);
	},

	isClosed: function() {
		var children = this._children;
		for (var i = 0, l = children.length; i < l; i++) {
			if (!children[i]._closed)
				return false;
		}
		return true;
	},

	setClosed: function(closed) {
		var children = this._children;
		for (var i = 0, l = children.length; i < l; i++) {
			children[i].setClosed(closed);
		}
	},

	getFirstSegment: function() {
		var first = this.getFirstChild();
		return first && first.getFirstSegment();
	},

	getLastSegment: function() {
		var last = this.getLastChild();
		return last && last.getLastSegment();
	},

	getCurves: function() {
		var children = this._children,
			curves = [];
		for (var i = 0, l = children.length; i < l; i++) {
			Base.push(curves, children[i].getCurves());
		}
		return curves;
	},

	getFirstCurve: function() {
		var first = this.getFirstChild();
		return first && first.getFirstCurve();
	},

	getLastCurve: function() {
		var last = this.getLastChild();
		return last && last.getLastCurve();
	},

	getArea: function() {
		var children = this._children,
			area = 0;
		for (var i = 0, l = children.length; i < l; i++)
			area += children[i].getArea();
		return area;
	},

	getLength: function() {
		var children = this._children,
			length = 0;
		for (var i = 0, l = children.length; i < l; i++)
			length += children[i].getLength();
		return length;
	},

	getPathData: function(_matrix, _precision) {
		var children = this._children,
			paths = [];
		for (var i = 0, l = children.length; i < l; i++) {
			var child = children[i],
				mx = child._matrix;
			paths.push(child.getPathData(_matrix && !mx.isIdentity()
					? _matrix.appended(mx) : _matrix, _precision));
		}
		return paths.join('');
	},

	_hitTestChildren: function _hitTestChildren(point, options, viewMatrix) {
		return _hitTestChildren.base.call(this, point,
				options.class === Path || options.type === 'path' ? options
					: Base.set({}, options, { fill: false }),
				viewMatrix);
	},

	_draw: function(ctx, param, viewMatrix, strokeMatrix) {
		var children = this._children;
		if (!children.length)
			return;

		param = param.extend({ dontStart: true, dontFinish: true });
		ctx.beginPath();
		for (var i = 0, l = children.length; i < l; i++)
			children[i].draw(ctx, param, strokeMatrix);

		if (!param.clip) {
			this._setStyles(ctx, param, viewMatrix);
			var style = this._style;
			if (style.hasFill()) {
				ctx.fill(style.getFillRule());
				ctx.shadowColor = 'rgba(0,0,0,0)';
			}
			if (style.hasStroke())
				ctx.stroke();
		}
	},

	_drawSelected: function(ctx, matrix, selectionItems) {
		var children = this._children;
		for (var i = 0, l = children.length; i < l; i++) {
			var child = children[i],
				mx = child._matrix;
			if (!selectionItems[child._id]) {
				child._drawSelected(ctx, mx.isIdentity() ? matrix
						: matrix.appended(mx));
			}
		}
	}
},
new function() {
	function getCurrentPath(that, check) {
		var children = that._children;
		if (check && !children.length)
			throw new Error('Use a moveTo() command first');
		return children[children.length - 1];
	}

	return Base.each(['lineTo', 'cubicCurveTo', 'quadraticCurveTo', 'curveTo',
			'arcTo', 'lineBy', 'cubicCurveBy', 'quadraticCurveBy', 'curveBy',
			'arcBy'],
		function(key) {
			this[key] = function() {
				var path = getCurrentPath(this, true);
				path[key].apply(path, arguments);
			};
		}, {
			moveTo: function() {
				var current = getCurrentPath(this),
					path = current && current.isEmpty() ? current
							: new Path(Item.NO_INSERT);
				if (path !== current)
					this.addChild(path);
				path.moveTo.apply(path, arguments);
			},

			moveBy: function() {
				var current = getCurrentPath(this, true),
					last = current && current.getLastSegment(),
					point = Point.read(arguments);
				this.moveTo(last ? point.add(last._point) : point);
			},

			closePath: function(tolerance) {
				getCurrentPath(this, true).closePath(tolerance);
			}
		}
	);
}, Base.each(['reverse', 'flatten', 'simplify', 'smooth'], function(key) {
	this[key] = function(param) {
		var children = this._children,
			res;
		for (var i = 0, l = children.length; i < l; i++) {
			res = children[i][key](param) || res;
		}
		return res;
	};
}, {}));

PathItem.inject(new function() {
	var min = Math.min,
		max = Math.max,
		abs = Math.abs,
		operators = {
			unite:     { '1': true, '2': true },
			intersect: { '2': true },
			subtract:  { '1': true },
			exclude:   { '1': true, '-1': true }
		};

	function getPaths(path) {
		return path._children || [path];
	}

	function preparePath(path, resolve) {
		var res = path
			.clone(false)
			.reduce({ simplify: true })
			.transform(null, true, true);
		if (resolve) {
			var paths = getPaths(res);
			for (var i = 0, l = paths.length; i < l; i++) {
				var path = paths[i];
				if (!path._closed && !path.isEmpty()) {
					path.closePath(1e-12);
					path.getFirstSegment().setHandleIn(0, 0);
					path.getLastSegment().setHandleOut(0, 0);
				}
			}
			res = res
				.resolveCrossings()
				.reorient(res.getFillRule() === 'nonzero', true);
		}
		return res;
	}

	function createResult(paths, simplify, path1, path2, options) {
		var result = new CompoundPath(Item.NO_INSERT);
		result.addChildren(paths, true);
		result = result.reduce({ simplify: simplify });
		if (!(options && options.insert == false)) {
			result.insertAbove(path2 && path1.isSibling(path2)
					&& path1.getIndex() < path2.getIndex() ? path2 : path1);
		}
		result.copyAttributes(path1, true);
		return result;
	}

	function filterIntersection(inter) {
		return inter.hasOverlap() || inter.isCrossing();
	}

	function traceBoolean(path1, path2, operation, options) {
		if (options && (options.trace == false || options.stroke) &&
				/^(subtract|intersect)$/.test(operation))
			return splitBoolean(path1, path2, operation);
		var _path1 = preparePath(path1, true),
			_path2 = path2 && path1 !== path2 && preparePath(path2, true),
			operator = operators[operation];
		operator[operation] = true;
		if (_path2 && (operator.subtract || operator.exclude)
				^ (_path2.isClockwise() ^ _path1.isClockwise()))
			_path2.reverse();
		var crossings = divideLocations(CurveLocation.expand(
				_path1.getIntersections(_path2, filterIntersection))),
			paths1 = getPaths(_path1),
			paths2 = _path2 && getPaths(_path2),
			segments = [],
			curves = [],
			paths;

		function collectPaths(paths) {
			for (var i = 0, l = paths.length; i < l; i++) {
				var path = paths[i];
				Base.push(segments, path._segments);
				Base.push(curves, path.getCurves());
				path._overlapsOnly = true;
			}
		}

		function getCurves(indices) {
			var list = [];
			for (var i = 0, l = indices && indices.length; i < l; i++) {
				list.push(curves[indices[i]]);
			}
			return list;
		}

		if (crossings.length) {
			collectPaths(paths1);
			if (paths2)
				collectPaths(paths2);

			var curvesValues = new Array(curves.length);
			for (var i = 0, l = curves.length; i < l; i++) {
				curvesValues[i] = curves[i].getValues();
			}
			var curveCollisions = CollisionDetection.findCurveBoundsCollisions(
					curvesValues, curvesValues, 0, true);
			var curveCollisionsMap = {};
			for (var i = 0; i < curves.length; i++) {
				var curve = curves[i],
					id = curve._path._id,
					map = curveCollisionsMap[id] = curveCollisionsMap[id] || {};
				map[curve.getIndex()] = {
					hor: getCurves(curveCollisions[i].hor),
					ver: getCurves(curveCollisions[i].ver)
				};
			}

			for (var i = 0, l = crossings.length; i < l; i++) {
				propagateWinding(crossings[i]._segment, _path1, _path2,
						curveCollisionsMap, operator);
			}
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i],
					inter = segment._intersection;
				if (!segment._winding) {
					propagateWinding(segment, _path1, _path2,
							curveCollisionsMap, operator);
				}
				if (!(inter && inter._overlap))
					segment._path._overlapsOnly = false;
			}
			paths = tracePaths(segments, operator);
		} else {
			paths = reorientPaths(
					paths2 ? paths1.concat(paths2) : paths1.slice(),
					function(w) {
						return !!operator[w];
					});
		}
		return createResult(paths, true, path1, path2, options);
	}

	function splitBoolean(path1, path2, operation) {
		var _path1 = preparePath(path1),
			_path2 = preparePath(path2),
			crossings = _path1.getIntersections(_path2, filterIntersection),
			subtract = operation === 'subtract',
			divide = operation === 'divide',
			added = {},
			paths = [];

		function addPath(path) {
			if (!added[path._id] && (divide ||
					_path2.contains(path.getPointAt(path.getLength() / 2))
						^ subtract)) {
				paths.unshift(path);
				return added[path._id] = true;
			}
		}

		for (var i = crossings.length - 1; i >= 0; i--) {
			var path = crossings[i].split();
			if (path) {
				if (addPath(path))
					path.getFirstSegment().setHandleIn(0, 0);
				_path1.getLastSegment().setHandleOut(0, 0);
			}
		}
		addPath(_path1);
		return createResult(paths, false, path1, path2);
	}

	function linkIntersections(from, to) {
		var prev = from;
		while (prev) {
			if (prev === to)
				return;
			prev = prev._previous;
		}
		while (from._next && from._next !== to)
			from = from._next;
		if (!from._next) {
			while (to._previous)
				to = to._previous;
			from._next = to;
			to._previous = from;
		}
	}

	function clearCurveHandles(curves) {
		for (var i = curves.length - 1; i >= 0; i--)
			curves[i].clearHandles();
	}

	function reorientPaths(paths, isInside, clockwise) {
		var length = paths && paths.length;
		if (length) {
			var lookup = Base.each(paths, function (path, i) {
					this[path._id] = {
						container: null,
						winding: path.isClockwise() ? 1 : -1,
						index: i
					};
				}, {}),
				sorted = paths.slice().sort(function (a, b) {
					return abs(b.getArea()) - abs(a.getArea());
				}),
				first = sorted[0];
			var collisions = CollisionDetection.findItemBoundsCollisions(sorted,
					null, Numerical.GEOMETRIC_EPSILON);
			if (clockwise == null)
				clockwise = first.isClockwise();
			for (var i = 0; i < length; i++) {
				var path1 = sorted[i],
					entry1 = lookup[path1._id],
					containerWinding = 0,
					indices = collisions[i];
				if (indices) {
					var point = null;
					for (var j = indices.length - 1; j >= 0; j--) {
						if (indices[j] < i) {
							point = point || path1.getInteriorPoint();
							var path2 = sorted[indices[j]];
							if (path2.contains(point)) {
								var entry2 = lookup[path2._id];
								containerWinding = entry2.winding;
								entry1.winding += containerWinding;
								entry1.container = entry2.exclude
									? entry2.container : path2;
								break;
							}
						}
					}
				}
				if (isInside(entry1.winding) === isInside(containerWinding)) {
					entry1.exclude = true;
					paths[entry1.index] = null;
				} else {
					var container = entry1.container;
					path1.setClockwise(
							container ? !container.isClockwise() : clockwise);
				}
			}
		}
		return paths;
	}

	function divideLocations(locations, include, clearLater) {
		var results = include && [],
			tMin = 1e-8,
			tMax = 1 - tMin,
			clearHandles = false,
			clearCurves = clearLater || [],
			clearLookup = clearLater && {},
			renormalizeLocs,
			prevCurve,
			prevTime;

		function getId(curve) {
			return curve._path._id + '.' + curve._segment1._index;
		}

		for (var i = (clearLater && clearLater.length) - 1; i >= 0; i--) {
			var curve = clearLater[i];
			if (curve._path)
				clearLookup[getId(curve)] = true;
		}

		for (var i = locations.length - 1; i >= 0; i--) {
			var loc = locations[i],
				time = loc._time,
				origTime = time,
				exclude = include && !include(loc),
				curve = loc._curve,
				segment;
			if (curve) {
				if (curve !== prevCurve) {
					clearHandles = !curve.hasHandles()
							|| clearLookup && clearLookup[getId(curve)];
					renormalizeLocs = [];
					prevTime = null;
					prevCurve = curve;
				} else if (prevTime >= tMin) {
					time /= prevTime;
				}
			}
			if (exclude) {
				if (renormalizeLocs)
					renormalizeLocs.push(loc);
				continue;
			} else if (include) {
				results.unshift(loc);
			}
			prevTime = origTime;
			if (time < tMin) {
				segment = curve._segment1;
			} else if (time > tMax) {
				segment = curve._segment2;
			} else {
				var newCurve = curve.divideAtTime(time, true);
				if (clearHandles)
					clearCurves.push(curve, newCurve);
				segment = newCurve._segment1;
				for (var j = renormalizeLocs.length - 1; j >= 0; j--) {
					var l = renormalizeLocs[j];
					l._time = (l._time - time) / (1 - time);
				}
			}
			loc._setSegment(segment);
			var inter = segment._intersection,
				dest = loc._intersection;
			if (inter) {
				linkIntersections(inter, dest);
				var other = inter;
				while (other) {
					linkIntersections(other._intersection, inter);
					other = other._next;
				}
			} else {
				segment._intersection = dest;
			}
		}
		if (!clearLater)
			clearCurveHandles(clearCurves);
		return results || locations;
	}

	function getWinding(point, curves, dir, closed, dontFlip) {
		var curvesList = Array.isArray(curves)
			? curves
			: curves[dir ? 'hor' : 'ver'];
		var ia = dir ? 1 : 0,
			io = ia ^ 1,
			pv = [point.x, point.y],
			pa = pv[ia],
			po = pv[io],
			windingEpsilon = 1e-9,
			qualityEpsilon = 1e-6,
			paL = pa - windingEpsilon,
			paR = pa + windingEpsilon,
			windingL = 0,
			windingR = 0,
			pathWindingL = 0,
			pathWindingR = 0,
			onPath = false,
			onAnyPath = false,
			quality = 1,
			roots = [],
			vPrev,
			vClose;

		function addWinding(v) {
			var o0 = v[io + 0],
				o3 = v[io + 6];
			if (po < min(o0, o3) || po > max(o0, o3)) {
				return;
			}
			var a0 = v[ia + 0],
				a1 = v[ia + 2],
				a2 = v[ia + 4],
				a3 = v[ia + 6];
			if (o0 === o3) {
				if (a0 < paR && a3 > paL || a3 < paR && a0 > paL) {
					onPath = true;
				}
				return;
			}
			var t =   po === o0 ? 0
					: po === o3 ? 1
					: paL > max(a0, a1, a2, a3) || paR < min(a0, a1, a2, a3)
					? 1
					: Curve.solveCubic(v, io, po, roots, 0, 1) > 0
						? roots[0]
						: 1,
				a =   t === 0 ? a0
					: t === 1 ? a3
					: Curve.getPoint(v, t)[dir ? 'y' : 'x'],
				winding = o0 > o3 ? 1 : -1,
				windingPrev = vPrev[io] > vPrev[io + 6] ? 1 : -1,
				a3Prev = vPrev[ia + 6];
			if (po !== o0) {
				if (a < paL) {
					pathWindingL += winding;
				} else if (a > paR) {
					pathWindingR += winding;
				} else {
					onPath = true;
				}
				if (a > pa - qualityEpsilon && a < pa + qualityEpsilon)
					quality /= 2;
			} else {
				if (winding !== windingPrev) {
					if (a0 < paL) {
						pathWindingL += winding;
					} else if (a0 > paR) {
						pathWindingR += winding;
					}
				} else if (a0 != a3Prev) {
					if (a3Prev < paR && a > paR) {
						pathWindingR += winding;
						onPath = true;
					} else if (a3Prev > paL && a < paL) {
						pathWindingL += winding;
						onPath = true;
					}
				}
				quality /= 4;
			}
			vPrev = v;
			return !dontFlip && a > paL && a < paR
					&& Curve.getTangent(v, t)[dir ? 'x' : 'y'] === 0
					&& getWinding(point, curves, !dir, closed, true);
		}

		function handleCurve(v) {
			var o0 = v[io + 0],
				o1 = v[io + 2],
				o2 = v[io + 4],
				o3 = v[io + 6];
			if (po <= max(o0, o1, o2, o3) && po >= min(o0, o1, o2, o3)) {
				var a0 = v[ia + 0],
					a1 = v[ia + 2],
					a2 = v[ia + 4],
					a3 = v[ia + 6],
					monoCurves = paL > max(a0, a1, a2, a3) ||
								 paR < min(a0, a1, a2, a3)
							? [v] : Curve.getMonoCurves(v, dir),
					res;
				for (var i = 0, l = monoCurves.length; i < l; i++) {
					if (res = addWinding(monoCurves[i]))
						return res;
				}
			}
		}

		for (var i = 0, l = curvesList.length; i < l; i++) {
			var curve = curvesList[i],
				path = curve._path,
				v = curve.getValues(),
				res;
			if (!i || curvesList[i - 1]._path !== path) {
				vPrev = null;
				if (!path._closed) {
					vClose = Curve.getValues(
							path.getLastCurve().getSegment2(),
							curve.getSegment1(),
							null, !closed);
					if (vClose[io] !== vClose[io + 6]) {
						vPrev = vClose;
					}
				}

				if (!vPrev) {
					vPrev = v;
					var prev = path.getLastCurve();
					while (prev && prev !== curve) {
						var v2 = prev.getValues();
						if (v2[io] !== v2[io + 6]) {
							vPrev = v2;
							break;
						}
						prev = prev.getPrevious();
					}
				}
			}

			if (res = handleCurve(v))
				return res;

			if (i + 1 === l || curvesList[i + 1]._path !== path) {
				if (vClose && (res = handleCurve(vClose)))
					return res;
				if (onPath && !pathWindingL && !pathWindingR) {
					pathWindingL = pathWindingR = path.isClockwise(closed) ^ dir
							? 1 : -1;
				}
				windingL += pathWindingL;
				windingR += pathWindingR;
				pathWindingL = pathWindingR = 0;
				if (onPath) {
					onAnyPath = true;
					onPath = false;
				}
				vClose = null;
			}
		}
		windingL = abs(windingL);
		windingR = abs(windingR);
		return {
			winding: max(windingL, windingR),
			windingL: windingL,
			windingR: windingR,
			quality: quality,
			onPath: onAnyPath
		};
	}

	function propagateWinding(segment, path1, path2, curveCollisionsMap,
			operator) {
		var chain = [],
			start = segment,
			totalLength = 0,
			winding;
		do {
			var curve = segment.getCurve();
			if (curve) {
				var length = curve.getLength();
				chain.push({ segment: segment, curve: curve, length: length });
				totalLength += length;
			}
			segment = segment.getNext();
		} while (segment && !segment._intersection && segment !== start);
		var offsets = [0.5, 0.25, 0.75],
			winding = { winding: 0, quality: -1 },
			tMin = 1e-3,
			tMax = 1 - tMin;
		for (var i = 0; i < offsets.length && winding.quality < 0.5; i++) {
			var length = totalLength * offsets[i];
			for (var j = 0, l = chain.length; j < l; j++) {
				var entry = chain[j],
					curveLength = entry.length;
				if (length <= curveLength) {
					var curve = entry.curve,
						path = curve._path,
						parent = path._parent,
						operand = parent instanceof CompoundPath ? parent : path,
						t = Numerical.clamp(curve.getTimeAt(length), tMin, tMax),
						pt = curve.getPointAtTime(t),
						dir = abs(curve.getTangentAtTime(t).y) < Math.SQRT1_2;
					var wind = null;
					if (operator.subtract && path2) {
						var otherPath = operand === path1 ? path2 : path1,
							pathWinding = otherPath._getWinding(pt, dir, true);
						if (operand === path1 && pathWinding.winding ||
							operand === path2 && !pathWinding.winding) {
							if (pathWinding.quality < 1) {
								continue;
							} else {
								wind = { winding: 0, quality: 1 };
							}
						}
					}
					wind =  wind || getWinding(
							pt, curveCollisionsMap[path._id][curve.getIndex()],
							dir, true);
					if (wind.quality > winding.quality)
						winding = wind;
					break;
				}
				length -= curveLength;
			}
		}
		for (var j = chain.length - 1; j >= 0; j--) {
			chain[j].segment._winding = winding;
		}
	}

	function tracePaths(segments, operator) {
		var paths = [],
			starts;

		function isValid(seg) {
			var winding;
			return !!(seg && !seg._visited && (!operator
					|| operator[(winding = seg._winding || {}).winding]
						&& !(operator.unite && winding.winding === 2
							&& winding.windingL && winding.windingR)));
		}

		function isStart(seg) {
			if (seg) {
				for (var i = 0, l = starts.length; i < l; i++) {
					if (seg === starts[i])
						return true;
				}
			}
			return false;
		}

		function visitPath(path) {
			var segments = path._segments;
			for (var i = 0, l = segments.length; i < l; i++) {
				segments[i]._visited = true;
			}
		}

		function getCrossingSegments(segment, collectStarts) {
			var inter = segment._intersection,
				start = inter,
				crossings = [];
			if (collectStarts)
				starts = [segment];

			function collect(inter, end) {
				while (inter && inter !== end) {
					var other = inter._segment,
						path = other && other._path;
					if (path) {
						var next = other.getNext() || path.getFirstSegment(),
							nextInter = next._intersection;
						if (other !== segment && (isStart(other)
							|| isStart(next)
							|| next && (isValid(other) && (isValid(next)
								|| nextInter && isValid(nextInter._segment))))
						) {
							crossings.push(other);
						}
						if (collectStarts)
							starts.push(other);
					}
					inter = inter._next;
				}
			}

			if (inter) {
				collect(inter);
				while (inter && inter._previous)
					inter = inter._previous;
				collect(inter, start);
			}
			return crossings;
		}

		segments.sort(function(seg1, seg2) {
			var inter1 = seg1._intersection,
				inter2 = seg2._intersection,
				over1 = !!(inter1 && inter1._overlap),
				over2 = !!(inter2 && inter2._overlap),
				path1 = seg1._path,
				path2 = seg2._path;
			return over1 ^ over2
					? over1 ? 1 : -1
					: !inter1 ^ !inter2
						? inter1 ? 1 : -1
						: path1 !== path2
							? path1._id - path2._id
							: seg1._index - seg2._index;
		});

		for (var i = 0, l = segments.length; i < l; i++) {
			var seg = segments[i],
				valid = isValid(seg),
				path = null,
				finished = false,
				closed = true,
				branches = [],
				branch,
				visited,
				handleIn;
			if (valid && seg._path._overlapsOnly) {
				var path1 = seg._path,
					path2 = seg._intersection._segment._path;
				if (path1.compare(path2)) {
					if (path1.getArea())
						paths.push(path1.clone(false));
					visitPath(path1);
					visitPath(path2);
					valid = false;
				}
			}
			while (valid) {
				var first = !path,
					crossings = getCrossingSegments(seg, first),
					other = crossings.shift(),
					finished = !first && (isStart(seg) || isStart(other)),
					cross = !finished && other;
				if (first) {
					path = new Path(Item.NO_INSERT);
					branch = null;
				}
				if (finished) {
					if (seg.isFirst() || seg.isLast())
						closed = seg._path._closed;
					seg._visited = true;
					break;
				}
				if (cross && branch) {
					branches.push(branch);
					branch = null;
				}
				if (!branch) {
					if (cross)
						crossings.push(seg);
					branch = {
						start: path._segments.length,
						crossings: crossings,
						visited: visited = [],
						handleIn: handleIn
					};
				}
				if (cross)
					seg = other;
				if (!isValid(seg)) {
					path.removeSegments(branch.start);
					for (var j = 0, k = visited.length; j < k; j++) {
						visited[j]._visited = false;
					}
					visited.length = 0;
					do {
						seg = branch && branch.crossings.shift();
						if (!seg || !seg._path) {
							seg = null;
							branch = branches.pop();
							if (branch) {
								visited = branch.visited;
								handleIn = branch.handleIn;
							}
						}
					} while (branch && !isValid(seg));
					if (!seg)
						break;
				}
				var next = seg.getNext();
				path.add(new Segment(seg._point, handleIn,
						next && seg._handleOut));
				seg._visited = true;
				visited.push(seg);
				seg = next || seg._path.getFirstSegment();
				handleIn = next && next._handleIn;
			}
			if (finished) {
				if (closed) {
					path.getFirstSegment().setHandleIn(handleIn);
					path.setClosed(closed);
				}
				if (path.getArea() !== 0) {
					paths.push(path);
				}
			}
		}
		return paths;
	}

	return {
		_getWinding: function(point, dir, closed) {
			return getWinding(point, this.getCurves(), dir, closed);
		},

		unite: function(path, options) {
			return traceBoolean(this, path, 'unite', options);
		},

		intersect: function(path, options) {
			return traceBoolean(this, path, 'intersect', options);
		},

		subtract: function(path, options) {
			return traceBoolean(this, path, 'subtract', options);
		},

		exclude: function(path, options) {
			return traceBoolean(this, path, 'exclude', options);
		},

		divide: function(path, options) {
			return options && (options.trace == false || options.stroke)
					? splitBoolean(this, path, 'divide')
					: createResult([
						this.subtract(path, options),
						this.intersect(path, options)
					], true, this, path, options);
		},

		resolveCrossings: function() {
			var children = this._children,
				paths = children || [this];

			function hasOverlap(seg, path) {
				var inter = seg && seg._intersection;
				return inter && inter._overlap && inter._path === path;
			}

			var hasOverlaps = false,
				hasCrossings = false,
				intersections = this.getIntersections(null, function(inter) {
					return inter.hasOverlap() && (hasOverlaps = true) ||
							inter.isCrossing() && (hasCrossings = true);
				}),
				clearCurves = hasOverlaps && hasCrossings && [];
			intersections = CurveLocation.expand(intersections);
			if (hasOverlaps) {
				var overlaps = divideLocations(intersections, function(inter) {
					return inter.hasOverlap();
				}, clearCurves);
				for (var i = overlaps.length - 1; i >= 0; i--) {
					var overlap = overlaps[i],
						path = overlap._path,
						seg = overlap._segment,
						prev = seg.getPrevious(),
						next = seg.getNext();
					if (hasOverlap(prev, path) && hasOverlap(next, path)) {
						seg.remove();
						prev._handleOut._set(0, 0);
						next._handleIn._set(0, 0);
						if (prev !== seg && !prev.getCurve().hasLength()) {
							next._handleIn.set(prev._handleIn);
							prev.remove();
						}
					}
				}
			}
			if (hasCrossings) {
				divideLocations(intersections, hasOverlaps && function(inter) {
					var curve1 = inter.getCurve(),
						seg1 = inter.getSegment(),
						other = inter._intersection,
						curve2 = other._curve,
						seg2 = other._segment;
					if (curve1 && curve2 && curve1._path && curve2._path)
						return true;
					if (seg1)
						seg1._intersection = null;
					if (seg2)
						seg2._intersection = null;
				}, clearCurves);
				if (clearCurves)
					clearCurveHandles(clearCurves);
				paths = tracePaths(Base.each(paths, function(path) {
					Base.push(this, path._segments);
				}, []));
			}
			var length = paths.length,
				item;
			if (length > 1 && children) {
				if (paths !== children)
					this.setChildren(paths);
				item = this;
			} else if (length === 1 && !children) {
				if (paths[0] !== this)
					this.setSegments(paths[0].removeSegments());
				item = this;
			}
			if (!item) {
				item = new CompoundPath(Item.NO_INSERT);
				item.addChildren(paths);
				item = item.reduce();
				item.copyAttributes(this);
				this.replaceWith(item);
			}
			return item;
		},

		reorient: function(nonZero, clockwise) {
			var children = this._children;
			if (children && children.length) {
				this.setChildren(reorientPaths(this.removeChildren(),
						function(w) {
							return !!(nonZero ? w : w & 1);
						},
						clockwise));
			} else if (clockwise !== undefined) {
				this.setClockwise(clockwise);
			}
			return this;
		},

		getInteriorPoint: function() {
			var bounds = this.getBounds(),
				point = bounds.getCenter(true);
			if (!this.contains(point)) {
				var curves = this.getCurves(),
					y = point.y,
					intercepts = [],
					roots = [];
				for (var i = 0, l = curves.length; i < l; i++) {
					var v = curves[i].getValues(),
						o0 = v[1],
						o1 = v[3],
						o2 = v[5],
						o3 = v[7];
					if (y >= min(o0, o1, o2, o3) && y <= max(o0, o1, o2, o3)) {
						var monoCurves = Curve.getMonoCurves(v);
						for (var j = 0, m = monoCurves.length; j < m; j++) {
							var mv = monoCurves[j],
								mo0 = mv[1],
								mo3 = mv[7];
							if ((mo0 !== mo3) &&
								(y >= mo0 && y <= mo3 || y >= mo3 && y <= mo0)){
								var x = y === mo0 ? mv[0]
									: y === mo3 ? mv[6]
									: Curve.solveCubic(mv, 1, y, roots, 0, 1)
										=== 1
										? Curve.getPoint(mv, roots[0]).x
										: (mv[0] + mv[6]) / 2;
								intercepts.push(x);
							}
						}
					}
				}
				if (intercepts.length > 1) {
					intercepts.sort(function(a, b) { return a - b; });
					point.x = (intercepts[0] + intercepts[1]) / 2;
				}
			}
			return point;
		}
	};
});

var PathFlattener = Base.extend({
	_class: 'PathFlattener',

	initialize: function(path, flatness, maxRecursion, ignoreStraight, matrix) {
		var curves = [],
			parts = [],
			length = 0,
			minSpan = 1 / (maxRecursion || 32),
			segments = path._segments,
			segment1 = segments[0],
			segment2;

		function addCurve(segment1, segment2) {
			var curve = Curve.getValues(segment1, segment2, matrix);
			curves.push(curve);
			computeParts(curve, segment1._index, 0, 1);
		}

		function computeParts(curve, index, t1, t2) {
			if ((t2 - t1) > minSpan
					&& !(ignoreStraight && Curve.isStraight(curve))
					&& !Curve.isFlatEnough(curve, flatness || 0.25)) {
				var halves = Curve.subdivide(curve, 0.5),
					tMid = (t1 + t2) / 2;
				computeParts(halves[0], index, t1, tMid);
				computeParts(halves[1], index, tMid, t2);
			} else {
				var dx = curve[6] - curve[0],
					dy = curve[7] - curve[1],
					dist = Math.sqrt(dx * dx + dy * dy);
				if (dist > 0) {
					length += dist;
					parts.push({
						offset: length,
						curve: curve,
						index: index,
						time: t2,
					});
				}
			}
		}

		for (var i = 1, l = segments.length; i < l; i++) {
			segment2 = segments[i];
			addCurve(segment1, segment2);
			segment1 = segment2;
		}
		if (path._closed)
			addCurve(segment2 || segment1, segments[0]);
		this.curves = curves;
		this.parts = parts;
		this.length = length;
		this.index = 0;
	},

	_get: function(offset) {
		var parts = this.parts,
			length = parts.length,
			start,
			i, j = this.index;
		for (;;) {
			i = j;
			if (!j || parts[--j].offset < offset)
				break;
		}
		for (; i < length; i++) {
			var part = parts[i];
			if (part.offset >= offset) {
				this.index = i;
				var prev = parts[i - 1],
					prevTime = prev && prev.index === part.index ? prev.time : 0,
					prevOffset = prev ? prev.offset : 0;
				return {
					index: part.index,
					time: prevTime + (part.time - prevTime)
						* (offset - prevOffset) / (part.offset - prevOffset)
				};
			}
		}
		return {
			index: parts[length - 1].index,
			time: 1
		};
	},

	drawPart: function(ctx, from, to) {
		var start = this._get(from),
			end = this._get(to);
		for (var i = start.index, l = end.index; i <= l; i++) {
			var curve = Curve.getPart(this.curves[i],
					i === start.index ? start.time : 0,
					i === end.index ? end.time : 1);
			if (i === start.index)
				ctx.moveTo(curve[0], curve[1]);
			ctx.bezierCurveTo.apply(ctx, curve.slice(2));
		}
	}
}, Base.each(Curve._evaluateMethods,
	function(name) {
		this[name + 'At'] = function(offset) {
			var param = this._get(offset);
			return Curve[name](this.curves[param.index], param.time);
		};
	}, {})
);

var PathFitter = Base.extend({
	initialize: function(path) {
		var points = this.points = [],
			segments = path._segments,
			closed = path._closed;
		for (var i = 0, prev, l = segments.length; i < l; i++) {
			var point = segments[i].point;
			if (!prev || !prev.equals(point)) {
				points.push(prev = point.clone());
			}
		}
		if (closed) {
			points.unshift(points[points.length - 1]);
			points.push(points[1]);
		}
		this.closed = closed;
	},

	fit: function(error) {
		var points = this.points,
			length = points.length,
			segments = null;
		if (length > 0) {
			segments = [new Segment(points[0])];
			if (length > 1) {
				this.fitCubic(segments, error, 0, length - 1,
						points[1].subtract(points[0]),
						points[length - 2].subtract(points[length - 1]));
				if (this.closed) {
					segments.shift();
					segments.pop();
				}
			}
		}
		return segments;
	},

	fitCubic: function(segments, error, first, last, tan1, tan2) {
		var points = this.points;
		if (last - first === 1) {
			var pt1 = points[first],
				pt2 = points[last],
				dist = pt1.getDistance(pt2) / 3;
			this.addCurve(segments, [pt1, pt1.add(tan1.normalize(dist)),
					pt2.add(tan2.normalize(dist)), pt2]);
			return;
		}
		var uPrime = this.chordLengthParameterize(first, last),
			maxError = Math.max(error, error * error),
			split,
			parametersInOrder = true;
		for (var i = 0; i <= 4; i++) {
			var curve = this.generateBezier(first, last, uPrime, tan1, tan2);
			var max = this.findMaxError(first, last, curve, uPrime);
			if (max.error < error && parametersInOrder) {
				this.addCurve(segments, curve);
				return;
			}
			split = max.index;
			if (max.error >= maxError)
				break;
			parametersInOrder = this.reparameterize(first, last, uPrime, curve);
			maxError = max.error;
		}
		var tanCenter = points[split - 1].subtract(points[split + 1]);
		this.fitCubic(segments, error, first, split, tan1, tanCenter);
		this.fitCubic(segments, error, split, last, tanCenter.negate(), tan2);
	},

	addCurve: function(segments, curve) {
		var prev = segments[segments.length - 1];
		prev.setHandleOut(curve[1].subtract(curve[0]));
		segments.push(new Segment(curve[3], curve[2].subtract(curve[3])));
	},

	generateBezier: function(first, last, uPrime, tan1, tan2) {
		var epsilon = 1e-12,
			abs = Math.abs,
			points = this.points,
			pt1 = points[first],
			pt2 = points[last],
			C = [[0, 0], [0, 0]],
			X = [0, 0];

		for (var i = 0, l = last - first + 1; i < l; i++) {
			var u = uPrime[i],
				t = 1 - u,
				b = 3 * u * t,
				b0 = t * t * t,
				b1 = b * t,
				b2 = b * u,
				b3 = u * u * u,
				a1 = tan1.normalize(b1),
				a2 = tan2.normalize(b2),
				tmp = points[first + i]
					.subtract(pt1.multiply(b0 + b1))
					.subtract(pt2.multiply(b2 + b3));
			C[0][0] += a1.dot(a1);
			C[0][1] += a1.dot(a2);
			C[1][0] = C[0][1];
			C[1][1] += a2.dot(a2);
			X[0] += a1.dot(tmp);
			X[1] += a2.dot(tmp);
		}

		var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
			alpha1,
			alpha2;
		if (abs(detC0C1) > epsilon) {
			var detC0X = C[0][0] * X[1]    - C[1][0] * X[0],
				detXC1 = X[0]    * C[1][1] - X[1]    * C[0][1];
			alpha1 = detXC1 / detC0C1;
			alpha2 = detC0X / detC0C1;
		} else {
			var c0 = C[0][0] + C[0][1],
				c1 = C[1][0] + C[1][1];
			alpha1 = alpha2 = abs(c0) > epsilon ? X[0] / c0
							: abs(c1) > epsilon ? X[1] / c1
							: 0;
		}

		var segLength = pt2.getDistance(pt1),
			eps = epsilon * segLength,
			handle1,
			handle2;
		if (alpha1 < eps || alpha2 < eps) {
			alpha1 = alpha2 = segLength / 3;
		} else {
			var line = pt2.subtract(pt1);
			handle1 = tan1.normalize(alpha1);
			handle2 = tan2.normalize(alpha2);
			if (handle1.dot(line) - handle2.dot(line) > segLength * segLength) {
				alpha1 = alpha2 = segLength / 3;
				handle1 = handle2 = null;
			}
		}

		return [pt1,
				pt1.add(handle1 || tan1.normalize(alpha1)),
				pt2.add(handle2 || tan2.normalize(alpha2)),
				pt2];
	},

	reparameterize: function(first, last, u, curve) {
		for (var i = first; i <= last; i++) {
			u[i - first] = this.findRoot(curve, this.points[i], u[i - first]);
		}
		for (var i = 1, l = u.length; i < l; i++) {
			if (u[i] <= u[i - 1])
				return false;
		}
		return true;
	},

	findRoot: function(curve, point, u) {
		var curve1 = [],
			curve2 = [];
		for (var i = 0; i <= 2; i++) {
			curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
		}
		for (var i = 0; i <= 1; i++) {
			curve2[i] = curve1[i + 1].subtract(curve1[i]).multiply(2);
		}
		var pt = this.evaluate(3, curve, u),
			pt1 = this.evaluate(2, curve1, u),
			pt2 = this.evaluate(1, curve2, u),
			diff = pt.subtract(point),
			df = pt1.dot(pt1) + diff.dot(pt2);
		return Numerical.isMachineZero(df) ? u : u - diff.dot(pt1) / df;
	},

	evaluate: function(degree, curve, t) {
		var tmp = curve.slice();
		for (var i = 1; i <= degree; i++) {
			for (var j = 0; j <= degree - i; j++) {
				tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
			}
		}
		return tmp[0];
	},

	chordLengthParameterize: function(first, last) {
		var u = [0];
		for (var i = first + 1; i <= last; i++) {
			u[i - first] = u[i - first - 1]
					+ this.points[i].getDistance(this.points[i - 1]);
		}
		for (var i = 1, m = last - first; i <= m; i++) {
			u[i] /= u[m];
		}
		return u;
	},

	findMaxError: function(first, last, curve, u) {
		var index = Math.floor((last - first + 1) / 2),
			maxDist = 0;
		for (var i = first + 1; i < last; i++) {
			var P = this.evaluate(3, curve, u[i - first]);
			var v = P.subtract(this.points[i]);
			var dist = v.x * v.x + v.y * v.y;
			if (dist >= maxDist) {
				maxDist = dist;
				index = i;
			}
		}
		return {
			error: maxDist,
			index: index
		};
	}
});

var TextItem = Item.extend({
	_class: 'TextItem',
	_applyMatrix: false,
	_canApplyMatrix: false,
	_serializeFields: {
		content: null
	},
	_boundsOptions: { stroke: false, handle: false },

	initialize: function TextItem(arg) {
		this._content = '';
		this._lines = [];
		var hasProps = arg && Base.isPlainObject(arg)
				&& arg.x === undefined && arg.y === undefined;
		this._initialize(hasProps && arg, !hasProps && Point.read(arguments));
	},

	_equals: function(item) {
		return this._content === item._content;
	},

	copyContent: function(source) {
		this.setContent(source._content);
	},

	getContent: function() {
		return this._content;
	},

	setContent: function(content) {
		this._content = '' + content;
		this._lines = this._content.split(/\r\n|\n|\r/mg);
		this._changed(521);
	},

	isEmpty: function() {
		return !this._content;
	},

	getCharacterStyle: '#getStyle',
	setCharacterStyle: '#setStyle',

	getParagraphStyle: '#getStyle',
	setParagraphStyle: '#setStyle'
});

var PointText = TextItem.extend({
	_class: 'PointText',

	initialize: function PointText() {
		TextItem.apply(this, arguments);
	},

	getPoint: function() {
		var point = this._matrix.getTranslation();
		return new LinkedPoint(point.x, point.y, this, 'setPoint');
	},

	setPoint: function() {
		var point = Point.read(arguments);
		this.translate(point.subtract(this._matrix.getTranslation()));
	},

	_draw: function(ctx, param, viewMatrix) {
		if (!this._content)
			return;
		this._setStyles(ctx, param, viewMatrix);
		var lines = this._lines,
			style = this._style,
			hasFill = style.hasFill(),
			hasStroke = style.hasStroke(),
			leading = style.getLeading(),
			shadowColor = ctx.shadowColor;
		ctx.font = style.getFontStyle();
		ctx.textAlign = style.getJustification();
		for (var i = 0, l = lines.length; i < l; i++) {
			ctx.shadowColor = shadowColor;
			var line = lines[i];
			if (hasFill) {
				ctx.fillText(line, 0, 0);
				ctx.shadowColor = 'rgba(0,0,0,0)';
			}
			if (hasStroke)
				ctx.strokeText(line, 0, 0);
			ctx.translate(0, leading);
		}
	},

	_getBounds: function(matrix, options) {
		var style = this._style,
			lines = this._lines,
			numLines = lines.length,
			justification = style.getJustification(),
			leading = style.getLeading(),
			width = this.getView().getTextWidth(style.getFontStyle(), lines),
			x = 0;
		if (justification !== 'left')
			x -= width / (justification === 'center' ? 2: 1);
		var rect = new Rectangle(x,
					numLines ? - 0.75 * leading : 0,
					width, numLines * leading);
		return matrix ? matrix._transformBounds(rect, rect) : rect;
	}
});

var Color = Base.extend(new function() {
	var types = {
		gray: ['gray'],
		rgb: ['red', 'green', 'blue'],
		hsb: ['hue', 'saturation', 'brightness'],
		hsl: ['hue', 'saturation', 'lightness'],
		gradient: ['gradient', 'origin', 'destination', 'highlight']
	};

	var componentParsers = {},
		namedColors = {
			transparent: [0, 0, 0, 0]
		},
		colorCtx;

	function fromCSS(string) {
		var match = string.match(
				/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i
			) || string.match(
				/^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i
			),
			type = 'rgb',
			components;
		if (match) {
			var amount = match[4] ? 4 : 3;
			components = new Array(amount);
			for (var i = 0; i < amount; i++) {
				var value = match[i + 1];
				components[i] = parseInt(value.length == 1
						? value + value : value, 16) / 255;
			}
		} else if (match = string.match(/^(rgb|hsl)a?\((.*)\)$/)) {
			type = match[1];
			components = match[2].trim().split(/[,\s]+/g);
			var isHSL = type === 'hsl';
			for (var i = 0, l = Math.min(components.length, 4); i < l; i++) {
				var component = components[i];
				var value = parseFloat(component);
				if (isHSL) {
					if (i === 0) {
						var unit = component.match(/([a-z]*)$/)[1];
						value *= ({
							turn: 360,
							rad: 180 / Math.PI,
							grad: 0.9
						}[unit] || 1);
					} else if (i < 3) {
						value /= 100;
					}
				} else if (i < 3) {
					value /= /%$/.test(component) ? 100 : 255;
				}
				components[i] = value;
			}
		} else {
			var color = namedColors[string];
			if (!color) {
				if (window) {
					if (!colorCtx) {
						colorCtx = CanvasProvider.getContext(1, 1);
						colorCtx.globalCompositeOperation = 'copy';
					}
					colorCtx.fillStyle = 'rgba(0,0,0,0)';
					colorCtx.fillStyle = string;
					colorCtx.fillRect(0, 0, 1, 1);
					var data = colorCtx.getImageData(0, 0, 1, 1).data;
					color = namedColors[string] = [
						data[0] / 255,
						data[1] / 255,
						data[2] / 255
					];
				} else {
					color = [0, 0, 0];
				}
			}
			components = color.slice();
		}
		return [type, components];
	}

	var hsbIndices = [
		[0, 3, 1],
		[2, 0, 1],
		[1, 0, 3],
		[1, 2, 0],
		[3, 1, 0],
		[0, 1, 2]
	];

	var converters = {
		'rgb-hsb': function(r, g, b) {
			var max = Math.max(r, g, b),
				min = Math.min(r, g, b),
				delta = max - min,
				h = delta === 0 ? 0
					:   ( max == r ? (g - b) / delta + (g < b ? 6 : 0)
						: max == g ? (b - r) / delta + 2
						:            (r - g) / delta + 4) * 60;
			return [h, max === 0 ? 0 : delta / max, max];
		},

		'hsb-rgb': function(h, s, b) {
			h = (((h / 60) % 6) + 6) % 6;
			var i = Math.floor(h),
				f = h - i,
				i = hsbIndices[i],
				v = [
					b,
					b * (1 - s),
					b * (1 - s * f),
					b * (1 - s * (1 - f))
				];
			return [v[i[0]], v[i[1]], v[i[2]]];
		},

		'rgb-hsl': function(r, g, b) {
			var max = Math.max(r, g, b),
				min = Math.min(r, g, b),
				delta = max - min,
				achromatic = delta === 0,
				h = achromatic ? 0
					:   ( max == r ? (g - b) / delta + (g < b ? 6 : 0)
						: max == g ? (b - r) / delta + 2
						:            (r - g) / delta + 4) * 60,
				l = (max + min) / 2,
				s = achromatic ? 0 : l < 0.5
						? delta / (max + min)
						: delta / (2 - max - min);
			return [h, s, l];
		},

		'hsl-rgb': function(h, s, l) {
			h = (((h / 360) % 1) + 1) % 1;
			if (s === 0)
				return [l, l, l];
			var t3s = [ h + 1 / 3, h, h - 1 / 3 ],
				t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
				t1 = 2 * l - t2,
				c = [];
			for (var i = 0; i < 3; i++) {
				var t3 = t3s[i];
				if (t3 < 0) t3 += 1;
				if (t3 > 1) t3 -= 1;
				c[i] = 6 * t3 < 1
					? t1 + (t2 - t1) * 6 * t3
					: 2 * t3 < 1
						? t2
						: 3 * t3 < 2
							? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
							: t1;
			}
			return c;
		},

		'rgb-gray': function(r, g, b) {
			return [r * 0.2989 + g * 0.587 + b * 0.114];
		},

		'gray-rgb': function(g) {
			return [g, g, g];
		},

		'gray-hsb': function(g) {
			return [0, 0, g];
		},

		'gray-hsl': function(g) {
			return [0, 0, g];
		},

		'gradient-rgb': function() {
			return [];
		},

		'rgb-gradient': function() {
			return [];
		}

	};

	return Base.each(types, function(properties, type) {
		componentParsers[type] = [];
		Base.each(properties, function(name, index) {
			var part = Base.capitalize(name),
				hasOverlap = /^(hue|saturation)$/.test(name),
				parser = componentParsers[type][index] = type === 'gradient'
					? name === 'gradient'
						? function(value) {
							var current = this._components[0];
							value = Gradient.read(
								Array.isArray(value)
									? value
									: arguments, 0, { readNull: true }
							);
							if (current !== value) {
								if (current)
									current._removeOwner(this);
								if (value)
									value._addOwner(this);
							}
							return value;
						}
						: function() {
							return Point.read(arguments, 0, {
									readNull: name === 'highlight',
									clone: true
							});
						}
					: function(value) {
						return value == null || isNaN(value) ? 0 : +value;
					};
			this['get' + part] = function() {
				return this._type === type
					|| hasOverlap && /^hs[bl]$/.test(this._type)
						? this._components[index]
						: this._convert(type)[index];
			};

			this['set' + part] = function(value) {
				if (this._type !== type
						&& !(hasOverlap && /^hs[bl]$/.test(this._type))) {
					this._components = this._convert(type);
					this._properties = types[type];
					this._type = type;
				}
				this._components[index] = parser.call(this, value);
				this._changed();
			};
		}, this);
	}, {
		_class: 'Color',
		_readIndex: true,

		initialize: function Color(arg) {
			var args = arguments,
				reading = this.__read,
				read = 0,
				type,
				components,
				alpha,
				values;
			if (Array.isArray(arg)) {
				args = arg;
				arg = args[0];
			}
			var argType = arg != null && typeof arg;
			if (argType === 'string' && arg in types) {
				type = arg;
				arg = args[1];
				if (Array.isArray(arg)) {
					components = arg;
					alpha = args[2];
				} else {
					if (reading)
						read = 1;
					args = Base.slice(args, 1);
					argType = typeof arg;
				}
			}
			if (!components) {
				values = argType === 'number'
						? args
						: argType === 'object' && arg.length != null
							? arg
							: null;
				if (values) {
					if (!type)
						type = values.length >= 3
								? 'rgb'
								: 'gray';
					var length = types[type].length;
					alpha = values[length];
					if (reading) {
						read += values === arguments
							? length + (alpha != null ? 1 : 0)
							: 1;
					}
					if (values.length > length)
						values = Base.slice(values, 0, length);
				} else if (argType === 'string') {
					var converted = fromCSS(arg);
					type = converted[0];
					components = converted[1];
					if (components.length === 4) {
						alpha = components[3];
						components.length--;
					}
				} else if (argType === 'object') {
					if (arg.constructor === Color) {
						type = arg._type;
						components = arg._components.slice();
						alpha = arg._alpha;
						if (type === 'gradient') {
							for (var i = 1, l = components.length; i < l; i++) {
								var point = components[i];
								if (point)
									components[i] = point.clone();
							}
						}
					} else if (arg.constructor === Gradient) {
						type = 'gradient';
						values = args;
					} else {
						type = 'hue' in arg
							? 'lightness' in arg
								? 'hsl'
								: 'hsb'
							: 'gradient' in arg || 'stops' in arg
									|| 'radial' in arg
								? 'gradient'
								: 'gray' in arg
									? 'gray'
									: 'rgb';
						var properties = types[type],
							parsers = componentParsers[type];
						this._components = components = [];
						for (var i = 0, l = properties.length; i < l; i++) {
							var value = arg[properties[i]];
							if (value == null && !i && type === 'gradient'
									&& 'stops' in arg) {
								value = {
									stops: arg.stops,
									radial: arg.radial
								};
							}
							value = parsers[i].call(this, value);
							if (value != null)
								components[i] = value;
						}
						alpha = arg.alpha;
					}
				}
				if (reading && type)
					read = 1;
			}
			this._type = type || 'rgb';
			if (!components) {
				this._components = components = [];
				var parsers = componentParsers[this._type];
				for (var i = 0, l = parsers.length; i < l; i++) {
					var value = parsers[i].call(this, values && values[i]);
					if (value != null)
						components[i] = value;
				}
			}
			this._components = components;
			this._properties = types[this._type];
			this._alpha = alpha;
			if (reading)
				this.__read = read;
			return this;
		},

		set: '#initialize',

		_serialize: function(options, dictionary) {
			var components = this.getComponents();
			return Base.serialize(
					/^(gray|rgb)$/.test(this._type)
						? components
						: [this._type].concat(components),
					options, true, dictionary);
		},

		_changed: function() {
			this._canvasStyle = null;
			if (this._owner) {
				if (this._setter) {
					this._owner[this._setter](this);
				} else {
					this._owner._changed(129);
				}
			}
		},

		_convert: function(type) {
			var converter;
			return this._type === type
					? this._components.slice()
					: (converter = converters[this._type + '-' + type])
						? converter.apply(this, this._components)
						: converters['rgb-' + type].apply(this,
							converters[this._type + '-rgb'].apply(this,
								this._components));
		},

		convert: function(type) {
			return new Color(type, this._convert(type), this._alpha);
		},

		getType: function() {
			return this._type;
		},

		setType: function(type) {
			this._components = this._convert(type);
			this._properties = types[type];
			this._type = type;
		},

		getComponents: function() {
			var components = this._components.slice();
			if (this._alpha != null)
				components.push(this._alpha);
			return components;
		},

		getAlpha: function() {
			return this._alpha != null ? this._alpha : 1;
		},

		setAlpha: function(alpha) {
			this._alpha = alpha == null ? null : Math.min(Math.max(alpha, 0), 1);
			this._changed();
		},

		hasAlpha: function() {
			return this._alpha != null;
		},

		equals: function(color) {
			var col = Base.isPlainValue(color, true)
					? Color.read(arguments)
					: color;
			return col === this || col && this._class === col._class
					&& this._type === col._type
					&& this.getAlpha() === col.getAlpha()
					&& Base.equals(this._components, col._components)
					|| false;
		},

		toString: function() {
			var properties = this._properties,
				parts = [],
				isGradient = this._type === 'gradient',
				f = Formatter.instance;
			for (var i = 0, l = properties.length; i < l; i++) {
				var value = this._components[i];
				if (value != null)
					parts.push(properties[i] + ': '
							+ (isGradient ? value : f.number(value)));
			}
			if (this._alpha != null)
				parts.push('alpha: ' + f.number(this._alpha));
			return '{ ' + parts.join(', ') + ' }';
		},

		toCSS: function(hex) {
			var components = this._convert('rgb'),
				alpha = hex || this._alpha == null ? 1 : this._alpha;
			function convert(val) {
				return Math.round((val < 0 ? 0 : val > 1 ? 1 : val) * 255);
			}
			components = [
				convert(components[0]),
				convert(components[1]),
				convert(components[2])
			];
			if (alpha < 1)
				components.push(alpha < 0 ? 0 : alpha);
			return hex
					? '#' + ((1 << 24) + (components[0] << 16)
						+ (components[1] << 8)
						+ components[2]).toString(16).slice(1)
					: (components.length == 4 ? 'rgba(' : 'rgb(')
						+ components.join(',') + ')';
		},

		toCanvasStyle: function(ctx, matrix) {
			if (this._canvasStyle)
				return this._canvasStyle;
			if (this._type !== 'gradient')
				return this._canvasStyle = this.toCSS();
			var components = this._components,
				gradient = components[0],
				stops = gradient._stops,
				origin = components[1],
				destination = components[2],
				highlight = components[3],
				inverse = matrix && matrix.inverted(),
				canvasGradient;
			if (inverse) {
				origin = inverse._transformPoint(origin);
				destination = inverse._transformPoint(destination);
				if (highlight)
					highlight = inverse._transformPoint(highlight);
			}
			if (gradient._radial) {
				var radius = destination.getDistance(origin);
				if (highlight) {
					var vector = highlight.subtract(origin);
					if (vector.getLength() > radius)
						highlight = origin.add(vector.normalize(radius - 0.1));
				}
				var start = highlight || origin;
				canvasGradient = ctx.createRadialGradient(start.x, start.y,
						0, origin.x, origin.y, radius);
			} else {
				canvasGradient = ctx.createLinearGradient(origin.x, origin.y,
						destination.x, destination.y);
			}
			for (var i = 0, l = stops.length; i < l; i++) {
				var stop = stops[i],
					offset = stop._offset;
				canvasGradient.addColorStop(
						offset == null ? i / (l - 1) : offset,
						stop._color.toCanvasStyle());
			}
			return this._canvasStyle = canvasGradient;
		},

		transform: function(matrix) {
			if (this._type === 'gradient') {
				var components = this._components;
				for (var i = 1, l = components.length; i < l; i++) {
					var point = components[i];
					matrix._transformPoint(point, point, true);
				}
				this._changed();
			}
		},

		statics: {
			_types: types,

			random: function() {
				var random = Math.random;
				return new Color(random(), random(), random());
			},

			_setOwner: function(color, owner, setter) {
				if (color) {
					if (color._owner && owner && color._owner !== owner) {
						color = color.clone();
					}
					if (!color._owner ^ !owner) {
						color._owner = owner || null;
						color._setter = setter || null;
					}
				}
				return color;
			}
		}
	});
},
new function() {
	var operators = {
		add: function(a, b) {
			return a + b;
		},

		subtract: function(a, b) {
			return a - b;
		},

		multiply: function(a, b) {
			return a * b;
		},

		divide: function(a, b) {
			return a / b;
		}
	};

	return Base.each(operators, function(operator, name) {
		this[name] = function(color) {
			color = Color.read(arguments);
			var type = this._type,
				components1 = this._components,
				components2 = color._convert(type);
			for (var i = 0, l = components1.length; i < l; i++)
				components2[i] = operator(components1[i], components2[i]);
			return new Color(type, components2,
					this._alpha != null
							? operator(this._alpha, color.getAlpha())
							: null);
		};
	}, {
	});
});

var Gradient = Base.extend({
	_class: 'Gradient',

	initialize: function Gradient(stops, radial) {
		this._id = UID.get();
		if (stops && Base.isPlainObject(stops)) {
			this.set(stops);
			stops = radial = null;
		}
		if (this._stops == null) {
			this.setStops(stops || ['white', 'black']);
		}
		if (this._radial == null) {
			this.setRadial(typeof radial === 'string' && radial === 'radial'
					|| radial || false);
		}
	},

	_serialize: function(options, dictionary) {
		return dictionary.add(this, function() {
			return Base.serialize([this._stops, this._radial],
					options, true, dictionary);
		});
	},

	_changed: function() {
		for (var i = 0, l = this._owners && this._owners.length; i < l; i++) {
			this._owners[i]._changed();
		}
	},

	_addOwner: function(color) {
		if (!this._owners)
			this._owners = [];
		this._owners.push(color);
	},

	_removeOwner: function(color) {
		var index = this._owners ? this._owners.indexOf(color) : -1;
		if (index != -1) {
			this._owners.splice(index, 1);
			if (!this._owners.length)
				this._owners = undefined;
		}
	},

	clone: function() {
		var stops = [];
		for (var i = 0, l = this._stops.length; i < l; i++) {
			stops[i] = this._stops[i].clone();
		}
		return new Gradient(stops, this._radial);
	},

	getStops: function() {
		return this._stops;
	},

	setStops: function(stops) {
		if (stops.length < 2) {
			throw new Error(
					'Gradient stop list needs to contain at least two stops.');
		}
		var _stops = this._stops;
		if (_stops) {
			for (var i = 0, l = _stops.length; i < l; i++)
				_stops[i]._owner = undefined;
		}
		_stops = this._stops = GradientStop.readList(stops, 0, { clone: true });
		for (var i = 0, l = _stops.length; i < l; i++)
			_stops[i]._owner = this;
		this._changed();
	},

	getRadial: function() {
		return this._radial;
	},

	setRadial: function(radial) {
		this._radial = radial;
		this._changed();
	},

	equals: function(gradient) {
		if (gradient === this)
			return true;
		if (gradient && this._class === gradient._class) {
			var stops1 = this._stops,
				stops2 = gradient._stops,
				length = stops1.length;
			if (length === stops2.length) {
				for (var i = 0; i < length; i++) {
					if (!stops1[i].equals(stops2[i]))
						return false;
				}
				return true;
			}
		}
		return false;
	}
});

var GradientStop = Base.extend({
	_class: 'GradientStop',

	initialize: function GradientStop(arg0, arg1) {
		var color = arg0,
			offset = arg1;
		if (typeof arg0 === 'object' && arg1 === undefined) {
			if (Array.isArray(arg0) && typeof arg0[0] !== 'number') {
				color = arg0[0];
				offset = arg0[1];
			} else if ('color' in arg0 || 'offset' in arg0
					|| 'rampPoint' in arg0) {
				color = arg0.color;
				offset = arg0.offset || arg0.rampPoint || 0;
			}
		}
		this.setColor(color);
		this.setOffset(offset);
	},

	clone: function() {
		return new GradientStop(this._color.clone(), this._offset);
	},

	_serialize: function(options, dictionary) {
		var color = this._color,
			offset = this._offset;
		return Base.serialize(offset == null ? [color] : [color, offset],
				options, true, dictionary);
	},

	_changed: function() {
		if (this._owner)
			this._owner._changed(129);
	},

	getOffset: function() {
		return this._offset;
	},

	setOffset: function(offset) {
		this._offset = offset;
		this._changed();
	},

	getRampPoint: '#getOffset',
	setRampPoint: '#setOffset',

	getColor: function() {
		return this._color;
	},

	setColor: function() {
		Color._setOwner(this._color, null);
		this._color = Color._setOwner(Color.read(arguments, 0), this,
				'setColor');
		this._changed();
	},

	equals: function(stop) {
		return stop === this || stop && this._class === stop._class
				&& this._color.equals(stop._color)
				&& this._offset == stop._offset
				|| false;
	}
});

var Style = Base.extend(new function() {
	var itemDefaults = {
		fillColor: null,
		fillRule: 'nonzero',
		strokeColor: null,
		strokeWidth: 1,
		strokeCap: 'butt',
		strokeJoin: 'miter',
		strokeScaling: true,
		miterLimit: 10,
		dashOffset: 0,
		dashArray: [],
		shadowColor: null,
		shadowBlur: 0,
		shadowOffset: new Point(),
		selectedColor: null
	},
	groupDefaults = Base.set({}, itemDefaults, {
		fontFamily: 'sans-serif',
		fontWeight: 'normal',
		fontSize: 12,
		leading: null,
		justification: 'left'
	}),
	textDefaults = Base.set({}, groupDefaults, {
		fillColor: new Color()
	}),
	flags = {
		strokeWidth: 193,
		strokeCap: 193,
		strokeJoin: 193,
		strokeScaling: 201,
		miterLimit: 193,
		fontFamily: 9,
		fontWeight: 9,
		fontSize: 9,
		font: 9,
		leading: 9,
		justification: 9
	},
	item = {
		beans: true
	},
	fields = {
		_class: 'Style',
		beans: true,

		initialize: function Style(style, _owner, _project) {
			this._values = {};
			this._owner = _owner;
			this._project = _owner && _owner._project || _project
					|| paper.project;
			this._defaults = !_owner || _owner instanceof Group ? groupDefaults
					: _owner instanceof TextItem ? textDefaults
					: itemDefaults;
			if (style)
				this.set(style);
		}
	};

	Base.each(groupDefaults, function(value, key) {
		var isColor = /Color$/.test(key),
			isPoint = key === 'shadowOffset',
			part = Base.capitalize(key),
			flag = flags[key],
			set = 'set' + part,
			get = 'get' + part;

		fields[set] = function(value) {
			var owner = this._owner,
				children = owner && owner._children,
				applyToChildren = children && children.length > 0
					&& !(owner instanceof CompoundPath);
			if (applyToChildren) {
				for (var i = 0, l = children.length; i < l; i++)
					children[i]._style[set](value);
			}
			if ((key === 'selectedColor' || !applyToChildren)
					&& key in this._defaults) {
				var old = this._values[key];
				if (old !== value) {
					if (isColor) {
						if (old) {
							Color._setOwner(old, null);
							old._canvasStyle = null;
						}
						if (value && value.constructor === Color) {
							value = Color._setOwner(value, owner,
									applyToChildren && set);
						}
					}
					this._values[key] = value;
					if (owner)
						owner._changed(flag || 129);
				}
			}
		};

		fields[get] = function(_dontMerge) {
			var owner = this._owner,
				children = owner && owner._children,
				applyToChildren = children && children.length > 0
					&& !(owner instanceof CompoundPath),
				value;
			if (applyToChildren && !_dontMerge) {
				for (var i = 0, l = children.length; i < l; i++) {
					var childValue = children[i]._style[get]();
					if (!i) {
						value = childValue;
					} else if (!Base.equals(value, childValue)) {
						return undefined;
					}
				}
			} else if (key in this._defaults) {
				var value = this._values[key];
				if (value === undefined) {
					value = this._defaults[key];
					if (value && value.clone) {
						value = value.clone();
					}
				} else {
					var ctor = isColor ? Color : isPoint ? Point : null;
					if (ctor && !(value && value.constructor === ctor)) {
						this._values[key] = value = ctor.read([value], 0,
								{ readNull: true, clone: true });
					}
				}
			}
			if (value && isColor) {
				value = Color._setOwner(value, owner, applyToChildren && set);
			}
			return value;
		};

		item[get] = function(_dontMerge) {
			return this._style[get](_dontMerge);
		};

		item[set] = function(value) {
			this._style[set](value);
		};
	});

	Base.each({
		Font: 'FontFamily',
		WindingRule: 'FillRule'
	}, function(value, key) {
		var get = 'get' + key,
			set = 'set' + key;
		fields[get] = item[get] = '#get' + value;
		fields[set] = item[set] = '#set' + value;
	});

	Item.inject(item);
	return fields;
}, {
	set: function(style) {
		var isStyle = style instanceof Style,
			values = isStyle ? style._values : style;
		if (values) {
			for (var key in values) {
				if (key in this._defaults) {
					var value = values[key];
					this[key] = value && isStyle && value.clone
							? value.clone() : value;
				}
			}
		}
	},

	equals: function(style) {
		function compare(style1, style2, secondary) {
			var values1 = style1._values,
				values2 = style2._values,
				defaults2 = style2._defaults;
			for (var key in values1) {
				var value1 = values1[key],
					value2 = values2[key];
				if (!(secondary && key in values2) && !Base.equals(value1,
						value2 === undefined ? defaults2[key] : value2))
					return false;
			}
			return true;
		}

		return style === this || style && this._class === style._class
				&& compare(this, style)
				&& compare(style, this, true)
				|| false;
	},

	_dispose: function() {
		var color;
		color = this.getFillColor();
		if (color) color._canvasStyle = null;
		color = this.getStrokeColor();
		if (color) color._canvasStyle = null;
		color = this.getShadowColor();
		if (color) color._canvasStyle = null;
	},

	hasFill: function() {
		var color = this.getFillColor();
		return !!color && color.alpha > 0;
	},

	hasStroke: function() {
		var color = this.getStrokeColor();
		return !!color && color.alpha > 0 && this.getStrokeWidth() > 0;
	},

	hasShadow: function() {
		var color = this.getShadowColor();
		return !!color && color.alpha > 0 && (this.getShadowBlur() > 0
				|| !this.getShadowOffset().isZero());
	},

	getView: function() {
		return this._project._view;
	},

	getFontStyle: function() {
		var fontSize = this.getFontSize();
		return this.getFontWeight()
				+ ' ' + fontSize + (/[a-z]/i.test(fontSize + '') ? ' ' : 'px ')
				+ this.getFontFamily();
	},

	getFont: '#getFontFamily',
	setFont: '#setFontFamily',

	getLeading: function getLeading() {
		var leading = getLeading.base.call(this),
			fontSize = this.getFontSize();
		if (/pt|em|%|px/.test(fontSize))
			fontSize = this.getView().getPixelSize(fontSize);
		return leading != null ? leading : fontSize * 1.2;
	}

});

var DomElement = new function() {
	function handlePrefix(el, name, set, value) {
		var prefixes = ['', 'webkit', 'moz', 'Moz', 'ms', 'o'],
			suffix = name[0].toUpperCase() + name.substring(1);
		for (var i = 0; i < 6; i++) {
			var prefix = prefixes[i],
				key = prefix ? prefix + suffix : name;
			if (key in el) {
				if (set) {
					el[key] = value;
				} else {
					return el[key];
				}
				break;
			}
		}
	}

	return {
		getStyles: function(el) {
			var doc = el && el.nodeType !== 9 ? el.ownerDocument : el,
				view = doc && doc.defaultView;
			return view && view.getComputedStyle(el, '');
		},

		getBounds: function(el, viewport) {
			var doc = el.ownerDocument,
				body = doc.body,
				html = doc.documentElement,
				rect;
			try {
				rect = el.getBoundingClientRect();
			} catch (e) {
				rect = { left: 0, top: 0, width: 0, height: 0 };
			}
			var x = rect.left - (html.clientLeft || body.clientLeft || 0),
				y = rect.top - (html.clientTop || body.clientTop || 0);
			if (!viewport) {
				var view = doc.defaultView;
				x += view.pageXOffset || html.scrollLeft || body.scrollLeft;
				y += view.pageYOffset || html.scrollTop || body.scrollTop;
			}
			return new Rectangle(x, y, rect.width, rect.height);
		},

		getViewportBounds: function(el) {
			var doc = el.ownerDocument,
				view = doc.defaultView,
				html = doc.documentElement;
			return new Rectangle(0, 0,
				view.innerWidth || html.clientWidth,
				view.innerHeight || html.clientHeight
			);
		},

		getOffset: function(el, viewport) {
			return DomElement.getBounds(el, viewport).getPoint();
		},

		getSize: function(el) {
			return DomElement.getBounds(el, true).getSize();
		},

		isInvisible: function(el) {
			return DomElement.getSize(el).equals(new Size(0, 0));
		},

		isInView: function(el) {
			return !DomElement.isInvisible(el)
					&& DomElement.getViewportBounds(el).intersects(
						DomElement.getBounds(el, true));
		},

		isInserted: function(el) {
			return document.body.contains(el);
		},

		getPrefixed: function(el, name) {
			return el && handlePrefix(el, name);
		},

		setPrefixed: function(el, name, value) {
			if (typeof name === 'object') {
				for (var key in name)
					handlePrefix(el, key, true, name[key]);
			} else {
				handlePrefix(el, name, true, value);
			}
		}
	};
};

var DomEvent = {
	add: function(el, events) {
		if (el) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++) {
					var name = parts[i];
					var options = (
						el === document
						&& (name === 'touchstart' || name === 'touchmove')
					) ? { passive: false } : false;
					el.addEventListener(name, func, options);
				}
			}
		}
	},

	remove: function(el, events) {
		if (el) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++)
					el.removeEventListener(parts[i], func, false);
			}
		}
	},

	getPoint: function(event) {
		var pos = event.targetTouches
				? event.targetTouches.length
					? event.targetTouches[0]
					: event.changedTouches[0]
				: event;
		return new Point(
			pos.pageX || pos.clientX + document.documentElement.scrollLeft,
			pos.pageY || pos.clientY + document.documentElement.scrollTop
		);
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	getRelatedTarget: function(event) {
		return event.relatedTarget || event.toElement;
	},

	getOffset: function(event, target) {
		return DomEvent.getPoint(event).subtract(DomElement.getOffset(
				target || DomEvent.getTarget(event)));
	}
};

DomEvent.requestAnimationFrame = new function() {
	var nativeRequest = DomElement.getPrefixed(window, 'requestAnimationFrame'),
		requested = false,
		callbacks = [],
		timer;

	function handleCallbacks() {
		var functions = callbacks;
		callbacks = [];
		for (var i = 0, l = functions.length; i < l; i++)
			functions[i]();
		requested = nativeRequest && callbacks.length;
		if (requested)
			nativeRequest(handleCallbacks);
	}

	return function(callback) {
		callbacks.push(callback);
		if (nativeRequest) {
			if (!requested) {
				nativeRequest(handleCallbacks);
				requested = true;
			}
		} else if (!timer) {
			timer = setInterval(handleCallbacks, 1000 / 60);
		}
	};
};

var View = Base.extend(Emitter, {
	_class: 'View',

	initialize: function View(project, element) {

		function getSize(name) {
			return element[name] || parseInt(element.getAttribute(name), 10);
		}

		function getCanvasSize() {
			var size = DomElement.getSize(element);
			return size.isNaN() || size.isZero()
					? new Size(getSize('width'), getSize('height'))
					: size;
		}

		var size;
		if (window && element) {
			this._id = element.getAttribute('id');
			if (this._id == null)
				element.setAttribute('id', this._id = 'paper-view-' + View._id++);
			DomEvent.add(element, this._viewEvents);
			var none = 'none';
			DomElement.setPrefixed(element.style, {
				userDrag: none,
				userSelect: none,
				touchCallout: none,
				contentZooming: none,
				tapHighlightColor: 'rgba(0,0,0,0)'
			});

			if (PaperScope.hasAttribute(element, 'resize')) {
				var that = this;
				DomEvent.add(window, this._windowEvents = {
					resize: function() {
						that.setViewSize(getCanvasSize());
					}
				});
			}

			size = getCanvasSize();

			if (PaperScope.hasAttribute(element, 'stats')
					&& typeof Stats !== 'undefined') {
				this._stats = new Stats();
				var stats = this._stats.domElement,
					style = stats.style,
					offset = DomElement.getOffset(element);
				style.position = 'absolute';
				style.left = offset.x + 'px';
				style.top = offset.y + 'px';
				document.body.appendChild(stats);
			}
		} else {
			size = new Size(element);
			element = null;
		}
		this._project = project;
		this._scope = project._scope;
		this._element = element;
		if (!this._pixelRatio)
			this._pixelRatio = window && window.devicePixelRatio || 1;
		this._setElementSize(size.width, size.height);
		this._viewSize = size;
		View._views.push(this);
		View._viewsById[this._id] = this;
		(this._matrix = new Matrix())._owner = this;
		if (!View._focused)
			View._focused = this;
		this._frameItems = {};
		this._frameItemCount = 0;
		this._itemEvents = { native: {}, virtual: {} };
		this._autoUpdate = !paper.agent.node;
		this._needsUpdate = false;
	},

	remove: function() {
		if (!this._project)
			return false;
		if (View._focused === this)
			View._focused = null;
		View._views.splice(View._views.indexOf(this), 1);
		delete View._viewsById[this._id];
		var project = this._project;
		if (project._view === this)
			project._view = null;
		DomEvent.remove(this._element, this._viewEvents);
		DomEvent.remove(window, this._windowEvents);
		this._element = this._project = null;
		this.off('frame');
		this._animate = false;
		this._frameItems = {};
		return true;
	},

	_events: Base.each(
		Item._itemHandlers.concat(['onResize', 'onKeyDown', 'onKeyUp']),
		function(name) {
			this[name] = {};
		}, {
			onFrame: {
				install: function() {
					this.play();
				},

				uninstall: function() {
					this.pause();
				}
			}
		}
	),

	_animate: false,
	_time: 0,
	_count: 0,

	getAutoUpdate: function() {
		return this._autoUpdate;
	},

	setAutoUpdate: function(autoUpdate) {
		this._autoUpdate = autoUpdate;
		if (autoUpdate)
			this.requestUpdate();
	},

	update: function() {
	},

	draw: function() {
		this.update();
	},

	requestUpdate: function() {
		if (!this._requested) {
			var that = this;
			DomEvent.requestAnimationFrame(function() {
				that._requested = false;
				if (that._animate) {
					that.requestUpdate();
					var element = that._element;
					if ((!DomElement.getPrefixed(document, 'hidden')
							|| PaperScope.getAttribute(element, 'keepalive')
								=== 'true') && DomElement.isInView(element)) {
						that._handleFrame();
					}
				}
				if (that._autoUpdate)
					that.update();
			});
			this._requested = true;
		}
	},

	play: function() {
		this._animate = true;
		this.requestUpdate();
	},

	pause: function() {
		this._animate = false;
	},

	_handleFrame: function() {
		paper = this._scope;
		var now = Date.now() / 1000,
			delta = this._last ? now - this._last : 0;
		this._last = now;
		this.emit('frame', new Base({
			delta: delta,
			time: this._time += delta,
			count: this._count++
		}));
		if (this._stats)
			this._stats.update();
	},

	_animateItem: function(item, animate) {
		var items = this._frameItems;
		if (animate) {
			items[item._id] = {
				item: item,
				time: 0,
				count: 0
			};
			if (++this._frameItemCount === 1)
				this.on('frame', this._handleFrameItems);
		} else {
			delete items[item._id];
			if (--this._frameItemCount === 0) {
				this.off('frame', this._handleFrameItems);
			}
		}
	},

	_handleFrameItems: function(event) {
		for (var i in this._frameItems) {
			var entry = this._frameItems[i];
			entry.item.emit('frame', new Base(event, {
				time: entry.time += event.delta,
				count: entry.count++
			}));
		}
	},

	_changed: function() {
		this._project._changed(4097);
		this._bounds = this._decomposed = undefined;
	},

	getElement: function() {
		return this._element;
	},

	getPixelRatio: function() {
		return this._pixelRatio;
	},

	getResolution: function() {
		return this._pixelRatio * 72;
	},

	getViewSize: function() {
		var size = this._viewSize;
		return new LinkedSize(size.width, size.height, this, 'setViewSize');
	},

	setViewSize: function() {
		var size = Size.read(arguments),
			delta = size.subtract(this._viewSize);
		if (delta.isZero())
			return;
		this._setElementSize(size.width, size.height);
		this._viewSize.set(size);
		this._changed();
		this.emit('resize', { size: size, delta: delta });
		if (this._autoUpdate) {
			this.update();
		}
	},

	_setElementSize: function(width, height) {
		var element = this._element;
		if (element) {
			if (element.width !== width)
				element.width = width;
			if (element.height !== height)
				element.height = height;
		}
	},

	getBounds: function() {
		if (!this._bounds)
			this._bounds = this._matrix.inverted()._transformBounds(
					new Rectangle(new Point(), this._viewSize));
		return this._bounds;
	},

	getSize: function() {
		return this.getBounds().getSize();
	},

	isVisible: function() {
		return DomElement.isInView(this._element);
	},

	isInserted: function() {
		return DomElement.isInserted(this._element);
	},

	getPixelSize: function(size) {
		var element = this._element,
			pixels;
		if (element) {
			var parent = element.parentNode,
				temp = document.createElement('div');
			temp.style.fontSize = size;
			parent.appendChild(temp);
			pixels = parseFloat(DomElement.getStyles(temp).fontSize);
			parent.removeChild(temp);
		} else {
			pixels = parseFloat(pixels);
		}
		return pixels;
	},

	getTextWidth: function(font, lines) {
		return 0;
	}
}, Base.each(['rotate', 'scale', 'shear', 'skew'], function(key) {
	var rotate = key === 'rotate';
	this[key] = function() {
		var args = arguments,
			value = (rotate ? Base : Point).read(args),
			center = Point.read(args, 0, { readNull: true });
		return this.transform(new Matrix()[key](value,
				center || this.getCenter(true)));
	};
}, {
	_decompose: function() {
		return this._decomposed || (this._decomposed = this._matrix.decompose());
	},

	translate: function() {
		var mx = new Matrix();
		return this.transform(mx.translate.apply(mx, arguments));
	},

	getCenter: function() {
		return this.getBounds().getCenter();
	},

	setCenter: function() {
		var center = Point.read(arguments);
		this.translate(this.getCenter().subtract(center));
	},

	getZoom: function() {
		var scaling = this._decompose().scaling;
		return (scaling.x + scaling.y) / 2;
	},

	setZoom: function(zoom) {
		this.transform(new Matrix().scale(zoom / this.getZoom(),
			this.getCenter()));
	},

	getRotation: function() {
		return this._decompose().rotation;
	},

	setRotation: function(rotation) {
		var current = this.getRotation();
		if (current != null && rotation != null) {
			this.rotate(rotation - current);
		}
	},

	getScaling: function() {
		var scaling = this._decompose().scaling;
		return new LinkedPoint(scaling.x, scaling.y, this, 'setScaling');
	},

	setScaling: function() {
		var current = this.getScaling(),
			scaling = Point.read(arguments, 0, { clone: true, readNull: true });
		if (current && scaling) {
			this.scale(scaling.x / current.x, scaling.y / current.y);
		}
	},

	getMatrix: function() {
		return this._matrix;
	},

	setMatrix: function() {
		var matrix = this._matrix;
		matrix.set.apply(matrix, arguments);
	},

	transform: function(matrix) {
		this._matrix.append(matrix);
	},

	scrollBy: function() {
		this.translate(Point.read(arguments).negate());
	}
}), {

	projectToView: function() {
		return this._matrix._transformPoint(Point.read(arguments));
	},

	viewToProject: function() {
		return this._matrix._inverseTransform(Point.read(arguments));
	},

	getEventPoint: function(event) {
		return this.viewToProject(DomEvent.getOffset(event, this._element));
	},

}, {
	statics: {
		_views: [],
		_viewsById: {},
		_id: 0,

		create: function(project, element) {
			if (document && typeof element === 'string')
				element = document.getElementById(element);
			var ctor = window ? CanvasView : View;
			return new ctor(project, element);
		}
	}
},
new function() {
	if (!window)
		return;
	var prevFocus,
		tempFocus,
		dragging = false,
		mouseDown = false;

	function getView(event) {
		var target = DomEvent.getTarget(event);
		return target.getAttribute && View._viewsById[
				target.getAttribute('id')];
	}

	function updateFocus() {
		var view = View._focused;
		if (!view || !view.isVisible()) {
			for (var i = 0, l = View._views.length; i < l; i++) {
				if ((view = View._views[i]).isVisible()) {
					View._focused = tempFocus = view;
					break;
				}
			}
		}
	}

	function handleMouseMove(view, event, point) {
		view._handleMouseEvent('mousemove', event, point);
	}

	var navigator = window.navigator,
		mousedown, mousemove, mouseup;
	if (navigator.pointerEnabled || navigator.msPointerEnabled) {
		mousedown = 'pointerdown MSPointerDown';
		mousemove = 'pointermove MSPointerMove';
		mouseup = 'pointerup pointercancel MSPointerUp MSPointerCancel';
	} else {
		mousedown = 'touchstart';
		mousemove = 'touchmove';
		mouseup = 'touchend touchcancel';
		if (!('ontouchstart' in window && navigator.userAgent.match(
				/mobile|tablet|ip(ad|hone|od)|android|silk/i))) {
			mousedown += ' mousedown';
			mousemove += ' mousemove';
			mouseup += ' mouseup';
		}
	}

	var viewEvents = {},
		docEvents = {
			mouseout: function(event) {
				var view = View._focused,
					target = DomEvent.getRelatedTarget(event);
				if (view && (!target || target.nodeName === 'HTML')) {
					var offset = DomEvent.getOffset(event, view._element),
						x = offset.x,
						abs = Math.abs,
						ax = abs(x),
						max = 1 << 25,
						diff = ax - max;
					offset.x = abs(diff) < ax ? diff * (x < 0 ? -1 : 1) : x;
					handleMouseMove(view, event, view.viewToProject(offset));
				}
			},

			scroll: updateFocus
		};

	viewEvents[mousedown] = function(event) {
		var view = View._focused = getView(event);
		if (!dragging) {
			dragging = true;
			view._handleMouseEvent('mousedown', event);
		}
	};

	docEvents[mousemove] = function(event) {
		var view = View._focused;
		if (!mouseDown) {
			var target = getView(event);
			if (target) {
				if (view !== target) {
					if (view)
						handleMouseMove(view, event);
					if (!prevFocus)
						prevFocus = view;
					view = View._focused = tempFocus = target;
				}
			} else if (tempFocus && tempFocus === view) {
				if (prevFocus && !prevFocus.isInserted())
					prevFocus = null;
				view = View._focused = prevFocus;
				prevFocus = null;
				updateFocus();
			}
		}
		if (view)
			handleMouseMove(view, event);
	};

	docEvents[mousedown] = function() {
		mouseDown = true;
	};

	docEvents[mouseup] = function(event) {
		var view = View._focused;
		if (view && dragging)
			view._handleMouseEvent('mouseup', event);
		mouseDown = dragging = false;
	};

	DomEvent.add(document, docEvents);

	DomEvent.add(window, {
		load: updateFocus
	});

	var called = false,
		prevented = false,
		fallbacks = {
			doubleclick: 'click',
			mousedrag: 'mousemove'
		},
		wasInView = false,
		overView,
		downPoint,
		lastPoint,
		downItem,
		overItem,
		dragItem,
		clickItem,
		clickTime,
		dblClick;

	function emitMouseEvent(obj, target, type, event, point, prevPoint,
			stopItem) {
		var stopped = false,
			mouseEvent;

		function emit(obj, type) {
			if (obj.responds(type)) {
				if (!mouseEvent) {
					mouseEvent = new MouseEvent(type, event, point,
							target || obj,
							prevPoint ? point.subtract(prevPoint) : null);
				}
				if (obj.emit(type, mouseEvent)) {
					called = true;
					if (mouseEvent.prevented)
						prevented = true;
					if (mouseEvent.stopped)
						return stopped = true;
				}
			} else {
				var fallback = fallbacks[type];
				if (fallback)
					return emit(obj, fallback);
			}
		}

		while (obj && obj !== stopItem) {
			if (emit(obj, type))
				break;
			obj = obj._parent;
		}
		return stopped;
	}

	function emitMouseEvents(view, hitItem, type, event, point, prevPoint) {
		view._project.removeOn(type);
		prevented = called = false;
		return (dragItem && emitMouseEvent(dragItem, null, type, event,
					point, prevPoint)
			|| hitItem && hitItem !== dragItem
				&& !hitItem.isDescendant(dragItem)
				&& emitMouseEvent(hitItem, null, type === 'mousedrag' ?
					'mousemove' : type, event, point, prevPoint, dragItem)
			|| emitMouseEvent(view, dragItem || hitItem || view, type, event,
					point, prevPoint));
	}

	var itemEventsMap = {
		mousedown: {
			mousedown: 1,
			mousedrag: 1,
			click: 1,
			doubleclick: 1
		},
		mouseup: {
			mouseup: 1,
			mousedrag: 1,
			click: 1,
			doubleclick: 1
		},
		mousemove: {
			mousedrag: 1,
			mousemove: 1,
			mouseenter: 1,
			mouseleave: 1
		}
	};

	return {
		_viewEvents: viewEvents,

		_handleMouseEvent: function(type, event, point) {
			var itemEvents = this._itemEvents,
				hitItems = itemEvents.native[type],
				nativeMove = type === 'mousemove',
				tool = this._scope.tool,
				view = this;

			function responds(type) {
				return itemEvents.virtual[type] || view.responds(type)
						|| tool && tool.responds(type);
			}

			if (nativeMove && dragging && responds('mousedrag'))
				type = 'mousedrag';
			if (!point)
				point = this.getEventPoint(event);

			var inView = this.getBounds().contains(point),
				hit = hitItems && inView && view._project.hitTest(point, {
					tolerance: 0,
					fill: true,
					stroke: true
				}),
				hitItem = hit && hit.item || null,
				handle = false,
				mouse = {};
			mouse[type.substr(5)] = true;

			if (hitItems && hitItem !== overItem) {
				if (overItem) {
					emitMouseEvent(overItem, null, 'mouseleave', event, point);
				}
				if (hitItem) {
					emitMouseEvent(hitItem, null, 'mouseenter', event, point);
				}
				overItem = hitItem;
			}
			if (wasInView ^ inView) {
				emitMouseEvent(this, null, inView ? 'mouseenter' : 'mouseleave',
						event, point);
				overView = inView ? this : null;
				handle = true;
			}
			if ((inView || mouse.drag) && !point.equals(lastPoint)) {
				emitMouseEvents(this, hitItem, nativeMove ? type : 'mousemove',
						event, point, lastPoint);
				handle = true;
			}
			wasInView = inView;
			if (mouse.down && inView || mouse.up && downPoint) {
				emitMouseEvents(this, hitItem, type, event, point, downPoint);
				if (mouse.down) {
					dblClick = hitItem === clickItem
						&& (Date.now() - clickTime < 300);
					downItem = clickItem = hitItem;
					if (!prevented && hitItem) {
						var item = hitItem;
						while (item && !item.responds('mousedrag'))
							item = item._parent;
						if (item)
							dragItem = hitItem;
					}
					downPoint = point;
				} else if (mouse.up) {
					if (!prevented && hitItem === downItem) {
						clickTime = Date.now();
						emitMouseEvents(this, hitItem, dblClick ? 'doubleclick'
								: 'click', event, point, downPoint);
						dblClick = false;
					}
					downItem = dragItem = null;
				}
				wasInView = false;
				handle = true;
			}
			lastPoint = point;
			if (handle && tool) {
				called = tool._handleMouseEvent(type, event, point, mouse)
					|| called;
			}

			if (
				event.cancelable !== false
				&& (called && !mouse.move || mouse.down && responds('mouseup'))
			) {
				event.preventDefault();
			}
		},

		_handleKeyEvent: function(type, event, key, character) {
			var scope = this._scope,
				tool = scope.tool,
				keyEvent;

			function emit(obj) {
				if (obj.responds(type)) {
					paper = scope;
					obj.emit(type, keyEvent = keyEvent
							|| new KeyEvent(type, event, key, character));
				}
			}

			if (this.isVisible()) {
				emit(this);
				if (tool && tool.responds(type))
					emit(tool);
			}
		},

		_countItemEvent: function(type, sign) {
			var itemEvents = this._itemEvents,
				native = itemEvents.native,
				virtual = itemEvents.virtual;
			for (var key in itemEventsMap) {
				native[key] = (native[key] || 0)
						+ (itemEventsMap[key][type] || 0) * sign;
			}
			virtual[type] = (virtual[type] || 0) + sign;
		},

		statics: {
			updateFocus: updateFocus,

			_resetState: function() {
				dragging = mouseDown = called = wasInView = false;
				prevFocus = tempFocus = overView = downPoint = lastPoint =
					downItem = overItem = dragItem = clickItem = clickTime =
					dblClick = null;
			}
		}
	};
});

var CanvasView = View.extend({
	_class: 'CanvasView',

	initialize: function CanvasView(project, canvas) {
		if (!(canvas instanceof window.HTMLCanvasElement)) {
			var size = Size.read(arguments, 1);
			if (size.isZero())
				throw new Error(
						'Cannot create CanvasView with the provided argument: '
						+ Base.slice(arguments, 1));
			canvas = CanvasProvider.getCanvas(size);
		}
		var ctx = this._context = canvas.getContext('2d');
		ctx.save();
		this._pixelRatio = 1;
		if (!/^off|false$/.test(PaperScope.getAttribute(canvas, 'hidpi'))) {
			var deviceRatio = window.devicePixelRatio || 1,
				backingStoreRatio = DomElement.getPrefixed(ctx,
						'backingStorePixelRatio') || 1;
			this._pixelRatio = deviceRatio / backingStoreRatio;
		}
		View.call(this, project, canvas);
		this._needsUpdate = true;
	},

	remove: function remove() {
		this._context.restore();
		return remove.base.call(this);
	},

	_setElementSize: function _setElementSize(width, height) {
		var pixelRatio = this._pixelRatio;
		_setElementSize.base.call(this, width * pixelRatio, height * pixelRatio);
		if (pixelRatio !== 1) {
			var element = this._element,
				ctx = this._context;
			if (!PaperScope.hasAttribute(element, 'resize')) {
				var style = element.style;
				style.width = width + 'px';
				style.height = height + 'px';
			}
			ctx.restore();
			ctx.save();
			ctx.scale(pixelRatio, pixelRatio);
		}
	},

	getContext: function() {
		return this._context;
	},

	getPixelSize: function getPixelSize(size) {
		var agent = paper.agent,
			pixels;
		if (agent && agent.firefox) {
			pixels = getPixelSize.base.call(this, size);
		} else {
			var ctx = this._context,
				prevFont = ctx.font;
			ctx.font = size + ' serif';
			pixels = parseFloat(ctx.font);
			ctx.font = prevFont;
		}
		return pixels;
	},

	getTextWidth: function(font, lines) {
		var ctx = this._context,
			prevFont = ctx.font,
			width = 0;
		ctx.font = font;
		for (var i = 0, l = lines.length; i < l; i++)
			width = Math.max(width, ctx.measureText(lines[i]).width);
		ctx.font = prevFont;
		return width;
	},

	update: function() {
		if (!this._needsUpdate)
			return false;
		var project = this._project,
			ctx = this._context,
			size = this._viewSize;
		ctx.clearRect(0, 0, size.width + 1, size.height + 1);
		if (project)
			project.draw(ctx, this._matrix, this._pixelRatio);
		this._needsUpdate = false;
		return true;
	}
});

var Event = Base.extend({
	_class: 'Event',

	initialize: function Event(event) {
		this.event = event;
		this.type = event && event.type;
	},

	prevented: false,
	stopped: false,

	preventDefault: function() {
		this.prevented = true;
		this.event.preventDefault();
	},

	stopPropagation: function() {
		this.stopped = true;
		this.event.stopPropagation();
	},

	stop: function() {
		this.stopPropagation();
		this.preventDefault();
	},

	getTimeStamp: function() {
		return this.event.timeStamp;
	},

	getModifiers: function() {
		return Key.modifiers;
	}
});

var KeyEvent = Event.extend({
	_class: 'KeyEvent',

	initialize: function KeyEvent(type, event, key, character) {
		this.type = type;
		this.event = event;
		this.key = key;
		this.character = character;
	},

	toString: function() {
		return "{ type: '" + this.type
				+ "', key: '" + this.key
				+ "', character: '" + this.character
				+ "', modifiers: " + this.getModifiers()
				+ " }";
	}
});

var Key = new function() {
	var keyLookup = {
			'\t': 'tab',
			' ': 'space',
			'\b': 'backspace',
			'\x7f': 'delete',
			'Spacebar': 'space',
			'Del': 'delete',
			'Win': 'meta',
			'Esc': 'escape'
		},

		charLookup = {
			'tab': '\t',
			'space': ' ',
			'enter': '\r'
		},

		keyMap = {},
		charMap = {},
		metaFixMap,
		downKey,

		modifiers = new Base({
			shift: false,
			control: false,
			alt: false,
			meta: false,
			capsLock: false,
			space: false
		}).inject({
			option: {
				get: function() {
					return this.alt;
				}
			},

			command: {
				get: function() {
					var agent = paper && paper.agent;
					return agent && agent.mac ? this.meta : this.control;
				}
			}
		});

	function getKey(event) {
		var key = event.key || event.keyIdentifier;
		key = /^U\+/.test(key)
				? String.fromCharCode(parseInt(key.substr(2), 16))
				: /^Arrow[A-Z]/.test(key) ? key.substr(5)
				: key === 'Unidentified'  || key === undefined
					? String.fromCharCode(event.keyCode)
					: key;
		return keyLookup[key] ||
				(key.length > 1 ? Base.hyphenate(key) : key.toLowerCase());
	}

	function handleKey(down, key, character, event) {
		var type = down ? 'keydown' : 'keyup',
			view = View._focused,
			name;
		keyMap[key] = down;
		if (down) {
			charMap[key] = character;
		} else {
			delete charMap[key];
		}
		if (key.length > 1 && (name = Base.camelize(key)) in modifiers) {
			modifiers[name] = down;
			var agent = paper && paper.agent;
			if (name === 'meta' && agent && agent.mac) {
				if (down) {
					metaFixMap = {};
				} else {
					for (var k in metaFixMap) {
						if (k in charMap)
							handleKey(false, k, metaFixMap[k], event);
					}
					metaFixMap = null;
				}
			}
		} else if (down && metaFixMap) {
			metaFixMap[key] = character;
		}
		if (view) {
			view._handleKeyEvent(down ? 'keydown' : 'keyup', event, key,
					character);
		}
	}

	DomEvent.add(document, {
		keydown: function(event) {
			var key = getKey(event),
				agent = paper && paper.agent;
			if (key.length > 1 || agent && (agent.chrome && (event.altKey
						|| agent.mac && event.metaKey
						|| !agent.mac && event.ctrlKey))) {
				handleKey(true, key,
						charLookup[key] || (key.length > 1 ? '' : key), event);
			} else {
				downKey = key;
			}
		},

		keypress: function(event) {
			if (downKey) {
				var key = getKey(event),
					code = event.charCode,
					character = code >= 32 ? String.fromCharCode(code)
						: key.length > 1 ? '' : key;
				if (key !== downKey) {
					key = character.toLowerCase();
				}
				handleKey(true, key, character, event);
				downKey = null;
			}
		},

		keyup: function(event) {
			var key = getKey(event);
			if (key in charMap)
				handleKey(false, key, charMap[key], event);
		}
	});

	DomEvent.add(window, {
		blur: function(event) {
			for (var key in charMap)
				handleKey(false, key, charMap[key], event);
		}
	});

	return {
		modifiers: modifiers,

		isDown: function(key) {
			return !!keyMap[key];
		}
	};
};

var MouseEvent = Event.extend({
	_class: 'MouseEvent',

	initialize: function MouseEvent(type, event, point, target, delta) {
		this.type = type;
		this.event = event;
		this.point = point;
		this.target = target;
		this.delta = delta;
	},

	toString: function() {
		return "{ type: '" + this.type
				+ "', point: " + this.point
				+ ', target: ' + this.target
				+ (this.delta ? ', delta: ' + this.delta : '')
				+ ', modifiers: ' + this.getModifiers()
				+ ' }';
	}
});

var ToolEvent = Event.extend({
	_class: 'ToolEvent',
	_item: null,

	initialize: function ToolEvent(tool, type, event) {
		this.tool = tool;
		this.type = type;
		this.event = event;
	},

	_choosePoint: function(point, toolPoint) {
		return point ? point : toolPoint ? toolPoint.clone() : null;
	},

	getPoint: function() {
		return this._choosePoint(this._point, this.tool._point);
	},

	setPoint: function(point) {
		this._point = point;
	},

	getLastPoint: function() {
		return this._choosePoint(this._lastPoint, this.tool._lastPoint);
	},

	setLastPoint: function(lastPoint) {
		this._lastPoint = lastPoint;
	},

	getDownPoint: function() {
		return this._choosePoint(this._downPoint, this.tool._downPoint);
	},

	setDownPoint: function(downPoint) {
		this._downPoint = downPoint;
	},

	getMiddlePoint: function() {
		if (!this._middlePoint && this.tool._lastPoint) {
			return this.tool._point.add(this.tool._lastPoint).divide(2);
		}
		return this._middlePoint;
	},

	setMiddlePoint: function(middlePoint) {
		this._middlePoint = middlePoint;
	},

	getDelta: function() {
		return !this._delta && this.tool._lastPoint
				? this.tool._point.subtract(this.tool._lastPoint)
				: this._delta;
	},

	setDelta: function(delta) {
		this._delta = delta;
	},

	getCount: function() {
		return this.tool[/^mouse(down|up)$/.test(this.type)
				? '_downCount' : '_moveCount'];
	},

	setCount: function(count) {
		this.tool[/^mouse(down|up)$/.test(this.type) ? 'downCount' : 'count']
			= count;
	},

	getItem: function() {
		if (!this._item) {
			var result = this.tool._scope.project.hitTest(this.getPoint());
			if (result) {
				var item = result.item,
					parent = item._parent;
				while (/^(Group|CompoundPath)$/.test(parent._class)) {
					item = parent;
					parent = parent._parent;
				}
				this._item = item;
			}
		}
		return this._item;
	},

	setItem: function(item) {
		this._item = item;
	},

	toString: function() {
		return '{ type: ' + this.type
				+ ', point: ' + this.getPoint()
				+ ', count: ' + this.getCount()
				+ ', modifiers: ' + this.getModifiers()
				+ ' }';
	}
});

var Tool = PaperScopeItem.extend({
	_class: 'Tool',
	_list: 'tools',
	_reference: 'tool',
	_events: ['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onMouseMove',
			'onActivate', 'onDeactivate', 'onEditOptions', 'onKeyDown',
			'onKeyUp'],

	initialize: function Tool(props) {
		PaperScopeItem.call(this);
		this._moveCount = -1;
		this._downCount = -1;
		this.set(props);
	},

	getMinDistance: function() {
		return this._minDistance;
	},

	setMinDistance: function(minDistance) {
		this._minDistance = minDistance;
		if (minDistance != null && this._maxDistance != null
				&& minDistance > this._maxDistance) {
			this._maxDistance = minDistance;
		}
	},

	getMaxDistance: function() {
		return this._maxDistance;
	},

	setMaxDistance: function(maxDistance) {
		this._maxDistance = maxDistance;
		if (this._minDistance != null && maxDistance != null
				&& maxDistance < this._minDistance) {
			this._minDistance = maxDistance;
		}
	},

	getFixedDistance: function() {
		return this._minDistance == this._maxDistance
			? this._minDistance : null;
	},

	setFixedDistance: function(distance) {
		this._minDistance = this._maxDistance = distance;
	},

	_handleMouseEvent: function(type, event, point, mouse) {
		paper = this._scope;
		if (mouse.drag && !this.responds(type))
			type = 'mousemove';
		var move = mouse.move || mouse.drag,
			responds = this.responds(type),
			minDistance = this.minDistance,
			maxDistance = this.maxDistance,
			called = false,
			tool = this;
		function update(minDistance, maxDistance) {
			var pt = point,
				toolPoint = move ? tool._point : (tool._downPoint || pt);
			if (move) {
				if (tool._moveCount >= 0 && pt.equals(toolPoint)) {
					return false;
				}
				if (toolPoint && (minDistance != null || maxDistance != null)) {
					var vector = pt.subtract(toolPoint),
						distance = vector.getLength();
					if (distance < (minDistance || 0))
						return false;
					if (maxDistance) {
						pt = toolPoint.add(vector.normalize(
								Math.min(distance, maxDistance)));
					}
				}
				tool._moveCount++;
			}
			tool._point = pt;
			tool._lastPoint = toolPoint || pt;
			if (mouse.down) {
				tool._moveCount = -1;
				tool._downPoint = pt;
				tool._downCount++;
			}
			return true;
		}

		function emit() {
			if (responds) {
				called = tool.emit(type, new ToolEvent(tool, type, event))
						|| called;
			}
		}

		if (mouse.down) {
			update();
			emit();
		} else if (mouse.up) {
			update(null, maxDistance);
			emit();
		} else if (responds) {
			while (update(minDistance, maxDistance))
				emit();
		}
		return called;
	}

});

var Tween = Base.extend(Emitter, {
	_class: 'Tween',

	statics: {
		easings: {
			linear: function(t) {
				return t;
			},

			easeInQuad: function(t) {
				return t * t;
			},

			easeOutQuad: function(t) {
				return t * (2 - t);
			},

			easeInOutQuad: function(t) {
				return t < 0.5
					? 2 * t * t
					: -1 + 2 * (2 - t) * t;
			},

			easeInCubic: function(t) {
				return t * t * t;
			},

			easeOutCubic: function(t) {
				return --t * t * t + 1;
			},

			easeInOutCubic: function(t) {
				return t < 0.5
					? 4 * t * t * t
					: (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
			},

			easeInQuart: function(t) {
				return t * t * t * t;
			},

			easeOutQuart: function(t) {
				return 1 - (--t) * t * t * t;
			},

			easeInOutQuart: function(t) {
				return t < 0.5
					? 8 * t * t * t * t
					: 1 - 8 * (--t) * t * t * t;
			},

			easeInQuint: function(t) {
				return t * t * t * t * t;
			},

			easeOutQuint: function(t) {
				return 1 + --t * t * t * t * t;
			},

			easeInOutQuint: function(t) {
				return t < 0.5
					? 16 * t * t * t * t * t
					: 1 + 16 * (--t) * t * t * t * t;
			}
		}
	},

	initialize: function Tween(object, from, to, duration, easing, start) {
		this.object = object;
		var type = typeof easing;
		var isFunction = type === 'function';
		this.type = isFunction
			? type
			: type === 'string'
				? easing
				: 'linear';
		this.easing = isFunction ? easing : Tween.easings[this.type];
		this.duration = duration;
		this.running = false;

		this._then = null;
		this._startTime = null;
		var state = from || to;
		this._keys = state ? Object.keys(state) : [];
		this._parsedKeys = this._parseKeys(this._keys);
		this._from = state && this._getState(from);
		this._to = state && this._getState(to);
		if (start !== false) {
			this.start();
		}
	},

	then: function(then) {
		this._then = then;
		return this;
	},

	start: function() {
		this._startTime = null;
		this.running = true;
		return this;
	},

	stop: function() {
		this.running = false;
		return this;
	},

	update: function(progress) {
		if (this.running) {
			if (progress >= 1) {
				progress = 1;
				this.running = false;
			}

			var factor = this.easing(progress),
				keys = this._keys,
				getValue = function(value) {
					return typeof value === 'function'
						? value(factor, progress)
						: value;
				};
			for (var i = 0, l = keys && keys.length; i < l; i++) {
				var key = keys[i],
					from = getValue(this._from[key]),
					to = getValue(this._to[key]),
					value = (from && to && from.__add && to.__add)
						? to.__subtract(from).__multiply(factor).__add(from)
						: ((to - from) * factor) + from;
				this._setProperty(this._parsedKeys[key], value);
			}

			if (this.responds('update')) {
				this.emit('update', new Base({
					progress: progress,
					factor: factor
				}));
			}
			if (!this.running && this._then) {
				this._then(this.object);
			}
		}
		return this;
	},

	_events: {
		onUpdate: {}
	},

	_handleFrame: function(time) {
		var startTime = this._startTime,
			progress = startTime
				? (time - startTime) / this.duration
				: 0;
		if (!startTime) {
			this._startTime = time;
		}
		this.update(progress);
	},

	_getState: function(state) {
		var keys = this._keys,
			result = {};
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i],
				path = this._parsedKeys[key],
				current = this._getProperty(path),
				value;
			if (state) {
				var resolved = this._resolveValue(current, state[key]);
				this._setProperty(path, resolved);
				value = this._getProperty(path);
				value = value && value.clone ? value.clone() : value;
				this._setProperty(path, current);
			} else {
				value = current && current.clone ? current.clone() : current;
			}
			result[key] = value;
		}
		return result;
	},

	_resolveValue: function(current, value) {
		if (value) {
			if (Array.isArray(value) && value.length === 2) {
				var operator = value[0];
				return (
					operator &&
					operator.match &&
					operator.match(/^[+\-\*\/]=/)
				)
					? this._calculate(current, operator[0], value[1])
					: value;
			} else if (typeof value === 'string') {
				var match = value.match(/^[+\-*/]=(.*)/);
				if (match) {
					var parsed = JSON.parse(match[1].replace(
						/(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
						'"$2": '
					));
					return this._calculate(current, value[0], parsed);
				}
			}
		}
		return value;
	},

	_calculate: function(left, operator, right) {
		return paper.PaperScript.calculateBinary(left, operator, right);
	},

	_parseKeys: function(keys) {
		var parsed = {};
		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i],
				path = key
					.replace(/\.([^.]*)/g, '/$1')
					.replace(/\[['"]?([^'"\]]*)['"]?\]/g, '/$1');
			parsed[key] = path.split('/');
		}
		return parsed;
	},

	_getProperty: function(path, offset) {
		var obj = this.object;
		for (var i = 0, l = path.length - (offset || 0); i < l && obj; i++) {
			obj = obj[path[i]];
		}
		return obj;
	},

	_setProperty: function(path, value) {
		var dest = this._getProperty(path, 1);
		if (dest) {
			dest[path[path.length - 1]] = value;
		}
	}
});

var Http = {
	request: function(options) {
		var xhr = new self.XMLHttpRequest();
		xhr.open((options.method || 'get').toUpperCase(), options.url,
				Base.pick(options.async, true));
		if (options.mimeType)
			xhr.overrideMimeType(options.mimeType);
		xhr.onload = function() {
			var status = xhr.status;
			if (status === 0 || status === 200) {
				if (options.onLoad) {
					options.onLoad.call(xhr, xhr.responseText);
				}
			} else {
				xhr.onerror();
			}
		};
		xhr.onerror = function() {
			var status = xhr.status,
				message = 'Could not load "' + options.url + '" (Status: '
						+ status + ')';
			if (options.onError) {
				options.onError(message, status);
			} else {
				throw new Error(message);
			}
		};
		return xhr.send(null);
	}
};

var CanvasProvider = Base.exports.CanvasProvider = {
	canvases: [],

	getCanvas: function(width, height) {
		if (!window)
			return null;
		var canvas,
			clear = true;
		if (typeof width === 'object') {
			height = width.height;
			width = width.width;
		}
		if (this.canvases.length) {
			canvas = this.canvases.pop();
		} else {
			canvas = document.createElement('canvas');
			clear = false;
		}
		var ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Canvas ' + canvas +
					' is unable to provide a 2D context.');
		}
		if (canvas.width === width && canvas.height === height) {
			if (clear)
				ctx.clearRect(0, 0, width + 1, height + 1);
		} else {
			canvas.width = width;
			canvas.height = height;
		}
		ctx.save();
		return canvas;
	},

	getContext: function(width, height) {
		var canvas = this.getCanvas(width, height);
		return canvas ? canvas.getContext('2d') : null;
	},

	release: function(obj) {
		var canvas = obj && obj.canvas ? obj.canvas : obj;
		if (canvas && canvas.getContext) {
			canvas.getContext('2d').restore();
			this.canvases.push(canvas);
		}
	}
};

var BlendMode = new function() {
	var min = Math.min,
		max = Math.max,
		abs = Math.abs,
		sr, sg, sb, sa,
		br, bg, bb, ba,
		dr, dg, db;

	function getLum(r, g, b) {
		return 0.2989 * r + 0.587 * g + 0.114 * b;
	}

	function setLum(r, g, b, l) {
		var d = l - getLum(r, g, b);
		dr = r + d;
		dg = g + d;
		db = b + d;
		var l = getLum(dr, dg, db),
			mn = min(dr, dg, db),
			mx = max(dr, dg, db);
		if (mn < 0) {
			var lmn = l - mn;
			dr = l + (dr - l) * l / lmn;
			dg = l + (dg - l) * l / lmn;
			db = l + (db - l) * l / lmn;
		}
		if (mx > 255) {
			var ln = 255 - l,
				mxl = mx - l;
			dr = l + (dr - l) * ln / mxl;
			dg = l + (dg - l) * ln / mxl;
			db = l + (db - l) * ln / mxl;
		}
	}

	function getSat(r, g, b) {
		return max(r, g, b) - min(r, g, b);
	}

	function setSat(r, g, b, s) {
		var col = [r, g, b],
			mx = max(r, g, b),
			mn = min(r, g, b),
			md;
		mn = mn === r ? 0 : mn === g ? 1 : 2;
		mx = mx === r ? 0 : mx === g ? 1 : 2;
		md = min(mn, mx) === 0 ? max(mn, mx) === 1 ? 2 : 1 : 0;
		if (col[mx] > col[mn]) {
			col[md] = (col[md] - col[mn]) * s / (col[mx] - col[mn]);
			col[mx] = s;
		} else {
			col[md] = col[mx] = 0;
		}
		col[mn] = 0;
		dr = col[0];
		dg = col[1];
		db = col[2];
	}

	var modes = {
		multiply: function() {
			dr = br * sr / 255;
			dg = bg * sg / 255;
			db = bb * sb / 255;
		},

		screen: function() {
			dr = br + sr - (br * sr / 255);
			dg = bg + sg - (bg * sg / 255);
			db = bb + sb - (bb * sb / 255);
		},

		overlay: function() {
			dr = br < 128 ? 2 * br * sr / 255 : 255 - 2 * (255 - br) * (255 - sr) / 255;
			dg = bg < 128 ? 2 * bg * sg / 255 : 255 - 2 * (255 - bg) * (255 - sg) / 255;
			db = bb < 128 ? 2 * bb * sb / 255 : 255 - 2 * (255 - bb) * (255 - sb) / 255;
		},

		'soft-light': function() {
			var t = sr * br / 255;
			dr = t + br * (255 - (255 - br) * (255 - sr) / 255 - t) / 255;
			t = sg * bg / 255;
			dg = t + bg * (255 - (255 - bg) * (255 - sg) / 255 - t) / 255;
			t = sb * bb / 255;
			db = t + bb * (255 - (255 - bb) * (255 - sb) / 255 - t) / 255;
		},

		'hard-light': function() {
			dr = sr < 128 ? 2 * sr * br / 255 : 255 - 2 * (255 - sr) * (255 - br) / 255;
			dg = sg < 128 ? 2 * sg * bg / 255 : 255 - 2 * (255 - sg) * (255 - bg) / 255;
			db = sb < 128 ? 2 * sb * bb / 255 : 255 - 2 * (255 - sb) * (255 - bb) / 255;
		},

		'color-dodge': function() {
			dr = br === 0 ? 0 : sr === 255 ? 255 : min(255, 255 * br / (255 - sr));
			dg = bg === 0 ? 0 : sg === 255 ? 255 : min(255, 255 * bg / (255 - sg));
			db = bb === 0 ? 0 : sb === 255 ? 255 : min(255, 255 * bb / (255 - sb));
		},

		'color-burn': function() {
			dr = br === 255 ? 255 : sr === 0 ? 0 : max(0, 255 - (255 - br) * 255 / sr);
			dg = bg === 255 ? 255 : sg === 0 ? 0 : max(0, 255 - (255 - bg) * 255 / sg);
			db = bb === 255 ? 255 : sb === 0 ? 0 : max(0, 255 - (255 - bb) * 255 / sb);
		},

		darken: function() {
			dr = br < sr ? br : sr;
			dg = bg < sg ? bg : sg;
			db = bb < sb ? bb : sb;
		},

		lighten: function() {
			dr = br > sr ? br : sr;
			dg = bg > sg ? bg : sg;
			db = bb > sb ? bb : sb;
		},

		difference: function() {
			dr = br - sr;
			if (dr < 0)
				dr = -dr;
			dg = bg - sg;
			if (dg < 0)
				dg = -dg;
			db = bb - sb;
			if (db < 0)
				db = -db;
		},

		exclusion: function() {
			dr = br + sr * (255 - br - br) / 255;
			dg = bg + sg * (255 - bg - bg) / 255;
			db = bb + sb * (255 - bb - bb) / 255;
		},

		hue: function() {
			setSat(sr, sg, sb, getSat(br, bg, bb));
			setLum(dr, dg, db, getLum(br, bg, bb));
		},

		saturation: function() {
			setSat(br, bg, bb, getSat(sr, sg, sb));
			setLum(dr, dg, db, getLum(br, bg, bb));
		},

		luminosity: function() {
			setLum(br, bg, bb, getLum(sr, sg, sb));
		},

		color: function() {
			setLum(sr, sg, sb, getLum(br, bg, bb));
		},

		add: function() {
			dr = min(br + sr, 255);
			dg = min(bg + sg, 255);
			db = min(bb + sb, 255);
		},

		subtract: function() {
			dr = max(br - sr, 0);
			dg = max(bg - sg, 0);
			db = max(bb - sb, 0);
		},

		average: function() {
			dr = (br + sr) / 2;
			dg = (bg + sg) / 2;
			db = (bb + sb) / 2;
		},

		negation: function() {
			dr = 255 - abs(255 - sr - br);
			dg = 255 - abs(255 - sg - bg);
			db = 255 - abs(255 - sb - bb);
		}
	};

	var nativeModes = this.nativeModes = Base.each([
		'source-over', 'source-in', 'source-out', 'source-atop',
		'destination-over', 'destination-in', 'destination-out',
		'destination-atop', 'lighter', 'darker', 'copy', 'xor'
	], function(mode) {
		this[mode] = true;
	}, {});

	var ctx = CanvasProvider.getContext(1, 1);
	if (ctx) {
		Base.each(modes, function(func, mode) {
			var darken = mode === 'darken',
				ok = false;
			ctx.save();
			try {
				ctx.fillStyle = darken ? '#300' : '#a00';
				ctx.fillRect(0, 0, 1, 1);
				ctx.globalCompositeOperation = mode;
				if (ctx.globalCompositeOperation === mode) {
					ctx.fillStyle = darken ? '#a00' : '#300';
					ctx.fillRect(0, 0, 1, 1);
					ok = ctx.getImageData(0, 0, 1, 1).data[0] !== darken
							? 170 : 51;
				}
			} catch (e) {}
			ctx.restore();
			nativeModes[mode] = ok;
		});
		CanvasProvider.release(ctx);
	}

	this.process = function(mode, srcContext, dstContext, alpha, offset) {
		var srcCanvas = srcContext.canvas,
			normal = mode === 'normal';
		if (normal || nativeModes[mode]) {
			dstContext.save();
			dstContext.setTransform(1, 0, 0, 1, 0, 0);
			dstContext.globalAlpha = alpha;
			if (!normal)
				dstContext.globalCompositeOperation = mode;
			dstContext.drawImage(srcCanvas, offset.x, offset.y);
			dstContext.restore();
		} else {
			var process = modes[mode];
			if (!process)
				return;
			var dstData = dstContext.getImageData(offset.x, offset.y,
					srcCanvas.width, srcCanvas.height),
				dst = dstData.data,
				src = srcContext.getImageData(0, 0,
					srcCanvas.width, srcCanvas.height).data;
			for (var i = 0, l = dst.length; i < l; i += 4) {
				sr = src[i];
				br = dst[i];
				sg = src[i + 1];
				bg = dst[i + 1];
				sb = src[i + 2];
				bb = dst[i + 2];
				sa = src[i + 3];
				ba = dst[i + 3];
				process();
				var a1 = sa * alpha / 255,
					a2 = 1 - a1;
				dst[i] = a1 * dr + a2 * br;
				dst[i + 1] = a1 * dg + a2 * bg;
				dst[i + 2] = a1 * db + a2 * bb;
				dst[i + 3] = sa * alpha + a2 * ba;
			}
			dstContext.putImageData(dstData, offset.x, offset.y);
		}
	};
};

var SvgElement = new function() {
	var svg = 'http://www.w3.org/2000/svg',
		xmlns = 'http://www.w3.org/2000/xmlns',
		xlink = 'http://www.w3.org/1999/xlink',
		attributeNamespace = {
			href: xlink,
			xlink: xmlns,
			xmlns: xmlns + '/',
			'xmlns:xlink': xmlns + '/'
		};

	function create(tag, attributes, formatter) {
		return set(document.createElementNS(svg, tag), attributes, formatter);
	}

	function get(node, name) {
		var namespace = attributeNamespace[name],
			value = namespace
				? node.getAttributeNS(namespace, name)
				: node.getAttribute(name);
		return value === 'null' ? null : value;
	}

	function set(node, attributes, formatter) {
		for (var name in attributes) {
			var value = attributes[name],
				namespace = attributeNamespace[name];
			if (typeof value === 'number' && formatter)
				value = formatter.number(value);
			if (namespace) {
				node.setAttributeNS(namespace, name, value);
			} else {
				node.setAttribute(name, value);
			}
		}
		return node;
	}

	return {
		svg: svg,
		xmlns: xmlns,
		xlink: xlink,

		create: create,
		get: get,
		set: set
	};
};

var SvgStyles = Base.each({
	fillColor: ['fill', 'color'],
	fillRule: ['fill-rule', 'string'],
	strokeColor: ['stroke', 'color'],
	strokeWidth: ['stroke-width', 'number'],
	strokeCap: ['stroke-linecap', 'string'],
	strokeJoin: ['stroke-linejoin', 'string'],
	strokeScaling: ['vector-effect', 'lookup', {
		true: 'none',
		false: 'non-scaling-stroke'
	}, function(item, value) {
		return !value
				&& (item instanceof PathItem
					|| item instanceof Shape
					|| item instanceof TextItem);
	}],
	miterLimit: ['stroke-miterlimit', 'number'],
	dashArray: ['stroke-dasharray', 'array'],
	dashOffset: ['stroke-dashoffset', 'number'],
	fontFamily: ['font-family', 'string'],
	fontWeight: ['font-weight', 'string'],
	fontSize: ['font-size', 'number'],
	justification: ['text-anchor', 'lookup', {
		left: 'start',
		center: 'middle',
		right: 'end'
	}],
	opacity: ['opacity', 'number'],
	blendMode: ['mix-blend-mode', 'style']
}, function(entry, key) {
	var part = Base.capitalize(key),
		lookup = entry[2];
	this[key] = {
		type: entry[1],
		property: key,
		attribute: entry[0],
		toSVG: lookup,
		fromSVG: lookup && Base.each(lookup, function(value, name) {
			this[value] = name;
		}, {}),
		exportFilter: entry[3],
		get: 'get' + part,
		set: 'set' + part
	};
}, {});

new function() {
	var formatter;

	function getTransform(matrix, coordinates, center) {
		var attrs = new Base(),
			trans = matrix.getTranslation();
		if (coordinates) {
			var point;
			if (matrix.isInvertible()) {
				matrix = matrix._shiftless();
				point = matrix._inverseTransform(trans);
				trans = null;
			} else {
				point = new Point();
			}
			attrs[center ? 'cx' : 'x'] = point.x;
			attrs[center ? 'cy' : 'y'] = point.y;
		}
		if (!matrix.isIdentity()) {
			var decomposed = matrix.decompose();
			if (decomposed) {
				var parts = [],
					angle = decomposed.rotation,
					scale = decomposed.scaling,
					skew = decomposed.skewing;
				if (trans && !trans.isZero())
					parts.push('translate(' + formatter.point(trans) + ')');
				if (angle)
					parts.push('rotate(' + formatter.number(angle) + ')');
				if (!Numerical.isZero(scale.x - 1)
						|| !Numerical.isZero(scale.y - 1))
					parts.push('scale(' + formatter.point(scale) +')');
				if (skew.x)
					parts.push('skewX(' + formatter.number(skew.x) + ')');
				if (skew.y)
					parts.push('skewY(' + formatter.number(skew.y) + ')');
				attrs.transform = parts.join(' ');
			} else {
				attrs.transform = 'matrix(' + matrix.getValues().join(',') + ')';
			}
		}
		return attrs;
	}

	function exportGroup(item, options) {
		var attrs = getTransform(item._matrix),
			children = item._children;
		var node = SvgElement.create('g', attrs, formatter);
		for (var i = 0, l = children.length; i < l; i++) {
			var child = children[i];
			var childNode = exportSVG(child, options);
			if (childNode) {
				if (child.isClipMask()) {
					var clip = SvgElement.create('clipPath');
					clip.appendChild(childNode);
					setDefinition(child, clip, 'clip');
					SvgElement.set(node, {
						'clip-path': 'url(#' + clip.id + ')'
					});
				} else {
					node.appendChild(childNode);
				}
			}
		}
		return node;
	}

	function exportRaster(item, options) {
		var attrs = getTransform(item._matrix, true),
			size = item.getSize(),
			image = item.getImage();
		attrs.x -= size.width / 2;
		attrs.y -= size.height / 2;
		attrs.width = size.width;
		attrs.height = size.height;
		attrs.href = options.embedImages == false && image && image.src
				|| item.toDataURL();
		return SvgElement.create('image', attrs, formatter);
	}

	function exportPath(item, options) {
		var matchShapes = options.matchShapes;
		if (matchShapes) {
			var shape = item.toShape(false);
			if (shape)
				return exportShape(shape, options);
		}
		var segments = item._segments,
			length = segments.length,
			type,
			attrs = getTransform(item._matrix);
		if (matchShapes && length >= 2 && !item.hasHandles()) {
			if (length > 2) {
				type = item._closed ? 'polygon' : 'polyline';
				var parts = [];
				for (var i = 0; i < length; i++) {
					parts.push(formatter.point(segments[i]._point));
				}
				attrs.points = parts.join(' ');
			} else {
				type = 'line';
				var start = segments[0]._point,
					end = segments[1]._point;
				attrs.set({
					x1: start.x,
					y1: start.y,
					x2: end.x,
					y2: end.y
				});
			}
		} else {
			type = 'path';
			attrs.d = item.getPathData(null, options.precision);
		}
		return SvgElement.create(type, attrs, formatter);
	}

	function exportShape(item) {
		var type = item._type,
			radius = item._radius,
			attrs = getTransform(item._matrix, true, type !== 'rectangle');
		if (type === 'rectangle') {
			type = 'rect';
			var size = item._size,
				width = size.width,
				height = size.height;
			attrs.x -= width / 2;
			attrs.y -= height / 2;
			attrs.width = width;
			attrs.height = height;
			if (radius.isZero())
				radius = null;
		}
		if (radius) {
			if (type === 'circle') {
				attrs.r = radius;
			} else {
				attrs.rx = radius.width;
				attrs.ry = radius.height;
			}
		}
		return SvgElement.create(type, attrs, formatter);
	}

	function exportCompoundPath(item, options) {
		var attrs = getTransform(item._matrix);
		var data = item.getPathData(null, options.precision);
		if (data)
			attrs.d = data;
		return SvgElement.create('path', attrs, formatter);
	}

	function exportSymbolItem(item, options) {
		var attrs = getTransform(item._matrix, true),
			definition = item._definition,
			node = getDefinition(definition, 'symbol'),
			definitionItem = definition._item,
			bounds = definitionItem.getStrokeBounds();
		if (!node) {
			node = SvgElement.create('symbol', {
				viewBox: formatter.rectangle(bounds)
			});
			node.appendChild(exportSVG(definitionItem, options));
			setDefinition(definition, node, 'symbol');
		}
		attrs.href = '#' + node.id;
		attrs.x += bounds.x;
		attrs.y += bounds.y;
		attrs.width = bounds.width;
		attrs.height = bounds.height;
		attrs.overflow = 'visible';
		return SvgElement.create('use', attrs, formatter);
	}

	function exportGradient(color) {
		var gradientNode = getDefinition(color, 'color');
		if (!gradientNode) {
			var gradient = color.getGradient(),
				radial = gradient._radial,
				origin = color.getOrigin(),
				destination = color.getDestination(),
				attrs;
			if (radial) {
				attrs = {
					cx: origin.x,
					cy: origin.y,
					r: origin.getDistance(destination)
				};
				var highlight = color.getHighlight();
				if (highlight) {
					attrs.fx = highlight.x;
					attrs.fy = highlight.y;
				}
			} else {
				attrs = {
					x1: origin.x,
					y1: origin.y,
					x2: destination.x,
					y2: destination.y
				};
			}
			attrs.gradientUnits = 'userSpaceOnUse';
			gradientNode = SvgElement.create((radial ? 'radial' : 'linear')
					+ 'Gradient', attrs, formatter);
			var stops = gradient._stops;
			for (var i = 0, l = stops.length; i < l; i++) {
				var stop = stops[i],
					stopColor = stop._color,
					alpha = stopColor.getAlpha(),
					offset = stop._offset;
				attrs = {
					offset: offset == null ? i / (l - 1) : offset
				};
				if (stopColor)
					attrs['stop-color'] = stopColor.toCSS(true);
				if (alpha < 1)
					attrs['stop-opacity'] = alpha;
				gradientNode.appendChild(
						SvgElement.create('stop', attrs, formatter));
			}
			setDefinition(color, gradientNode, 'color');
		}
		return 'url(#' + gradientNode.id + ')';
	}

	function exportText(item) {
		var node = SvgElement.create('text', getTransform(item._matrix, true),
				formatter);
		node.textContent = item._content;
		return node;
	}

	var exporters = {
		Group: exportGroup,
		Layer: exportGroup,
		Raster: exportRaster,
		Path: exportPath,
		Shape: exportShape,
		CompoundPath: exportCompoundPath,
		SymbolItem: exportSymbolItem,
		PointText: exportText
	};

	function applyStyle(item, node, isRoot) {
		var attrs = {},
			parent = !isRoot && item.getParent(),
			style = [];

		if (item._name != null)
			attrs.id = item._name;

		Base.each(SvgStyles, function(entry) {
			var get = entry.get,
				type = entry.type,
				value = item[get]();
			if (entry.exportFilter
					? entry.exportFilter(item, value)
					: !parent || !Base.equals(parent[get](), value)) {
				if (type === 'color' && value != null) {
					var alpha = value.getAlpha();
					if (alpha < 1)
						attrs[entry.attribute + '-opacity'] = alpha;
				}
				if (type === 'style') {
					style.push(entry.attribute + ': ' + value);
				} else {
					attrs[entry.attribute] = value == null ? 'none'
							: type === 'color' ? value.gradient
								? exportGradient(value, item)
								: value.toCSS(true)
							: type === 'array' ? value.join(',')
							: type === 'lookup' ? entry.toSVG[value]
							: value;
				}
			}
		});

		if (style.length)
			attrs.style = style.join(';');

		if (attrs.opacity === 1)
			delete attrs.opacity;

		if (!item._visible)
			attrs.visibility = 'hidden';

		return SvgElement.set(node, attrs, formatter);
	}

	var definitions;
	function getDefinition(item, type) {
		if (!definitions)
			definitions = { ids: {}, svgs: {} };
		return item && definitions.svgs[type + '-'
				+ (item._id || item.__id || (item.__id = UID.get('svg')))];
	}

	function setDefinition(item, node, type) {
		if (!definitions)
			getDefinition();
		var typeId = definitions.ids[type] = (definitions.ids[type] || 0) + 1;
		node.id = type + '-' + typeId;
		definitions.svgs[type + '-' + (item._id || item.__id)] = node;
	}

	function exportDefinitions(node, options) {
		var svg = node,
			defs = null;
		if (definitions) {
			svg = node.nodeName.toLowerCase() === 'svg' && node;
			for (var i in definitions.svgs) {
				if (!defs) {
					if (!svg) {
						svg = SvgElement.create('svg');
						svg.appendChild(node);
					}
					defs = svg.insertBefore(SvgElement.create('defs'),
							svg.firstChild);
				}
				defs.appendChild(definitions.svgs[i]);
			}
			definitions = null;
		}
		return options.asString
				? new self.XMLSerializer().serializeToString(svg)
				: svg;
	}

	function exportSVG(item, options, isRoot) {
		var exporter = exporters[item._class],
			node = exporter && exporter(item, options);
		if (node) {
			var onExport = options.onExport;
			if (onExport)
				node = onExport(item, node, options) || node;
			var data = JSON.stringify(item._data);
			if (data && data !== '{}' && data !== 'null')
				node.setAttribute('data-paper-data', data);
		}
		return node && applyStyle(item, node, isRoot);
	}

	function setOptions(options) {
		if (!options)
			options = {};
		formatter = new Formatter(options.precision);
		return options;
	}

	Item.inject({
		exportSVG: function(options) {
			options = setOptions(options);
			return exportDefinitions(exportSVG(this, options, true), options);
		}
	});

	Project.inject({
		exportSVG: function(options) {
			options = setOptions(options);
			var children = this._children,
				view = this.getView(),
				bounds = Base.pick(options.bounds, 'view'),
				mx = options.matrix || bounds === 'view' && view._matrix,
				matrix = mx && Matrix.read([mx]),
				rect = bounds === 'view'
					? new Rectangle([0, 0], view.getViewSize())
					: bounds === 'content'
						? Item._getBounds(children, matrix, { stroke: true })
							.rect
						: Rectangle.read([bounds], 0, { readNull: true }),
				attrs = {
					version: '1.1',
					xmlns: SvgElement.svg,
					'xmlns:xlink': SvgElement.xlink,
				};
			if (rect) {
				attrs.width = rect.width;
				attrs.height = rect.height;
				if (rect.x || rect.x === 0 || rect.y || rect.y === 0)
					attrs.viewBox = formatter.rectangle(rect);
			}
			var node = SvgElement.create('svg', attrs, formatter),
				parent = node;
			if (matrix && !matrix.isIdentity()) {
				parent = node.appendChild(SvgElement.create('g',
						getTransform(matrix), formatter));
			}
			for (var i = 0, l = children.length; i < l; i++) {
				parent.appendChild(exportSVG(children[i], options, true));
			}
			return exportDefinitions(node, options);
		}
	});
};

new function() {

	var definitions = {},
		rootSize;

	function getValue(node, name, isString, allowNull, allowPercent,
			defaultValue) {
		var value = SvgElement.get(node, name) || defaultValue,
			res = value == null
				? allowNull
					? null
					: isString ? '' : 0
				: isString
					? value
					: parseFloat(value);
		return /%\s*$/.test(value)
			? (res / 100) * (allowPercent ? 1
				: rootSize[/x|^width/.test(name) ? 'width' : 'height'])
			: res;
	}

	function getPoint(node, x, y, allowNull, allowPercent, defaultX, defaultY) {
		x = getValue(node, x || 'x', false, allowNull, allowPercent, defaultX);
		y = getValue(node, y || 'y', false, allowNull, allowPercent, defaultY);
		return allowNull && (x == null || y == null) ? null
				: new Point(x, y);
	}

	function getSize(node, w, h, allowNull, allowPercent) {
		w = getValue(node, w || 'width', false, allowNull, allowPercent);
		h = getValue(node, h || 'height', false, allowNull, allowPercent);
		return allowNull && (w == null || h == null) ? null
				: new Size(w, h);
	}

	function convertValue(value, type, lookup) {
		return value === 'none' ? null
				: type === 'number' ? parseFloat(value)
				: type === 'array' ?
					value ? value.split(/[\s,]+/g).map(parseFloat) : []
				: type === 'color' ? getDefinition(value) || value
				: type === 'lookup' ? lookup[value]
				: value;
	}

	function importGroup(node, type, options, isRoot) {
		var nodes = node.childNodes,
			isClip = type === 'clippath',
			isDefs = type === 'defs',
			item = new Group(),
			project = item._project,
			currentStyle = project._currentStyle,
			children = [];
		if (!isClip && !isDefs) {
			item = applyAttributes(item, node, isRoot);
			project._currentStyle = item._style.clone();
		}
		if (isRoot) {
			var defs = node.querySelectorAll('defs');
			for (var i = 0, l = defs.length; i < l; i++) {
				importNode(defs[i], options, false);
			}
		}
		for (var i = 0, l = nodes.length; i < l; i++) {
			var childNode = nodes[i],
				child;
			if (childNode.nodeType === 1
					&& !/^defs$/i.test(childNode.nodeName)
					&& (child = importNode(childNode, options, false))
					&& !(child instanceof SymbolDefinition))
				children.push(child);
		}
		item.addChildren(children);
		if (isClip)
			item = applyAttributes(item.reduce(), node, isRoot);
		project._currentStyle = currentStyle;
		if (isClip || isDefs) {
			item.remove();
			item = null;
		}
		return item;
	}

	function importPoly(node, type) {
		var coords = node.getAttribute('points').match(
					/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),
			points = [];
		for (var i = 0, l = coords.length; i < l; i += 2)
			points.push(new Point(
					parseFloat(coords[i]),
					parseFloat(coords[i + 1])));
		var path = new Path(points);
		if (type === 'polygon')
			path.closePath();
		return path;
	}

	function importPath(node) {
		return PathItem.create(node.getAttribute('d'));
	}

	function importGradient(node, type) {
		var id = (getValue(node, 'href', true) || '').substring(1),
			radial = type === 'radialgradient',
			gradient;
		if (id) {
			gradient = definitions[id].getGradient();
			if (gradient._radial ^ radial) {
				gradient = gradient.clone();
				gradient._radial = radial;
			}
		} else {
			var nodes = node.childNodes,
				stops = [];
			for (var i = 0, l = nodes.length; i < l; i++) {
				var child = nodes[i];
				if (child.nodeType === 1)
					stops.push(applyAttributes(new GradientStop(), child));
			}
			gradient = new Gradient(stops, radial);
		}
		var origin, destination, highlight,
			scaleToBounds = getValue(node, 'gradientUnits', true) !==
				'userSpaceOnUse';
		if (radial) {
			origin = getPoint(node, 'cx', 'cy', false, scaleToBounds,
				'50%', '50%');
			destination = origin.add(
				getValue(node, 'r', false, false, scaleToBounds, '50%'), 0);
			highlight = getPoint(node, 'fx', 'fy', true, scaleToBounds);
		} else {
			origin = getPoint(node, 'x1', 'y1', false, scaleToBounds,
				'0%', '0%');
			destination = getPoint(node, 'x2', 'y2', false, scaleToBounds,
				'100%', '0%');
		}
		var color = applyAttributes(
				new Color(gradient, origin, destination, highlight), node);
		color._scaleToBounds = scaleToBounds;
		return null;
	}

	var importers = {
		'#document': function (node, type, options, isRoot) {
			var nodes = node.childNodes;
			for (var i = 0, l = nodes.length; i < l; i++) {
				var child = nodes[i];
				if (child.nodeType === 1)
					return importNode(child, options, isRoot);
			}
		},
		g: importGroup,
		svg: importGroup,
		clippath: importGroup,
		polygon: importPoly,
		polyline: importPoly,
		path: importPath,
		lineargradient: importGradient,
		radialgradient: importGradient,

		image: function (node) {
			var raster = new Raster(getValue(node, 'href', true));
			raster.on('load', function() {
				var size = getSize(node);
				this.setSize(size);
				var center = getPoint(node).add(size.divide(2));
				this._matrix.append(new Matrix().translate(center));
			});
			return raster;
		},

		symbol: function(node, type, options, isRoot) {
			return new SymbolDefinition(
					importGroup(node, type, options, isRoot), true);
		},

		defs: importGroup,

		use: function(node) {
			var id = (getValue(node, 'href', true) || '').substring(1),
				definition = definitions[id],
				point = getPoint(node);
			return definition
					? definition instanceof SymbolDefinition
						? definition.place(point)
						: definition.clone().translate(point)
					: null;
		},

		circle: function(node) {
			return new Shape.Circle(
					getPoint(node, 'cx', 'cy'),
					getValue(node, 'r'));
		},

		ellipse: function(node) {
			return new Shape.Ellipse({
				center: getPoint(node, 'cx', 'cy'),
				radius: getSize(node, 'rx', 'ry')
			});
		},

		rect: function(node) {
			return new Shape.Rectangle(new Rectangle(
						getPoint(node),
						getSize(node)
					), getSize(node, 'rx', 'ry'));
			},

		line: function(node) {
			return new Path.Line(
					getPoint(node, 'x1', 'y1'),
					getPoint(node, 'x2', 'y2'));
		},

		text: function(node) {
			var text = new PointText(getPoint(node).add(
					getPoint(node, 'dx', 'dy')));
			text.setContent(node.textContent.trim() || '');
			return text;
		},

		switch: importGroup
	};

	function applyTransform(item, value, name, node) {
		if (item.transform) {
			var transforms = (node.getAttribute(name) || '').split(/\)\s*/g),
				matrix = new Matrix();
			for (var i = 0, l = transforms.length; i < l; i++) {
				var transform = transforms[i];
				if (!transform)
					break;
				var parts = transform.split(/\(\s*/),
					command = parts[0],
					v = parts[1].split(/[\s,]+/g);
				for (var j = 0, m = v.length; j < m; j++)
					v[j] = parseFloat(v[j]);
				switch (command) {
				case 'matrix':
					matrix.append(
							new Matrix(v[0], v[1], v[2], v[3], v[4], v[5]));
					break;
				case 'rotate':
					matrix.rotate(v[0], v[1] || 0, v[2] || 0);
					break;
				case 'translate':
					matrix.translate(v[0], v[1] || 0);
					break;
				case 'scale':
					matrix.scale(v);
					break;
				case 'skewX':
					matrix.skew(v[0], 0);
					break;
				case 'skewY':
					matrix.skew(0, v[0]);
					break;
				}
			}
			item.transform(matrix);
		}
	}

	function applyOpacity(item, value, name) {
		var key = name === 'fill-opacity' ? 'getFillColor' : 'getStrokeColor',
			color = item[key] && item[key]();
		if (color)
			color.setAlpha(parseFloat(value));
	}

	var attributes = Base.set(Base.each(SvgStyles, function(entry) {
		this[entry.attribute] = function(item, value) {
			if (item[entry.set]) {
				item[entry.set](convertValue(value, entry.type, entry.fromSVG));
				if (entry.type === 'color') {
					var color = item[entry.get]();
					if (color) {
						if (color._scaleToBounds) {
							var bounds = item.getBounds();
							color.transform(new Matrix()
								.translate(bounds.getPoint())
								.scale(bounds.getSize()));
						}
					}
				}
			}
		};
	}, {}), {
		id: function(item, value) {
			definitions[value] = item;
			if (item.setName)
				item.setName(value);
		},

		'clip-path': function(item, value) {
			var clip = getDefinition(value);
			if (clip) {
				clip = clip.clone();
				clip.setClipMask(true);
				if (item instanceof Group) {
					item.insertChild(0, clip);
				} else {
					return new Group(clip, item);
				}
			}
		},

		gradientTransform: applyTransform,
		transform: applyTransform,

		'fill-opacity': applyOpacity,
		'stroke-opacity': applyOpacity,

		visibility: function(item, value) {
			if (item.setVisible)
				item.setVisible(value === 'visible');
		},

		display: function(item, value) {
			if (item.setVisible)
				item.setVisible(value !== null);
		},

		'stop-color': function(item, value) {
			if (item.setColor)
				item.setColor(value);
		},

		'stop-opacity': function(item, value) {
			if (item._color)
				item._color.setAlpha(parseFloat(value));
		},

		offset: function(item, value) {
			if (item.setOffset) {
				var percent = value.match(/(.*)%$/);
				item.setOffset(percent ? percent[1] / 100 : parseFloat(value));
			}
		},

		viewBox: function(item, value, name, node, styles) {
			var rect = new Rectangle(convertValue(value, 'array')),
				size = getSize(node, null, null, true),
				group,
				matrix;
			if (item instanceof Group) {
				var scale = size ? size.divide(rect.getSize()) : 1,
				matrix = new Matrix().scale(scale)
						.translate(rect.getPoint().negate());
				group = item;
			} else if (item instanceof SymbolDefinition) {
				if (size)
					rect.setSize(size);
				group = item._item;
			}
			if (group)  {
				if (getAttribute(node, 'overflow', styles) !== 'visible') {
					var clip = new Shape.Rectangle(rect);
					clip.setClipMask(true);
					group.addChild(clip);
				}
				if (matrix)
					group.transform(matrix);
			}
		}
	});

	function getAttribute(node, name, styles) {
		var attr = node.attributes[name],
			value = attr && attr.value;
		if (!value && node.style) {
			var style = Base.camelize(name);
			value = node.style[style];
			if (!value && styles.node[style] !== styles.parent[style])
				value = styles.node[style];
		}
		return !value ? undefined
				: value === 'none' ? null
				: value;
	}

	function applyAttributes(item, node, isRoot) {
		var parent = node.parentNode,
			styles = {
				node: DomElement.getStyles(node) || {},
				parent: !isRoot && !/^defs$/i.test(parent.tagName)
						&& DomElement.getStyles(parent) || {}
			};
		Base.each(attributes, function(apply, name) {
			var value = getAttribute(node, name, styles);
			item = value !== undefined
					&& apply(item, value, name, node, styles) || item;
		});
		return item;
	}

	function getDefinition(value) {
		var match = value && value.match(/\((?:["'#]*)([^"')]+)/),
			name = match && match[1],
			res = name && definitions[window
					? name.replace(window.location.href.split('#')[0] + '#', '')
					: name];
		if (res && res._scaleToBounds) {
			res = res.clone();
			res._scaleToBounds = true;
		}
		return res;
	}

	function importNode(node, options, isRoot) {
		var type = node.nodeName.toLowerCase(),
			isElement = type !== '#document',
			body = document.body,
			container,
			parent,
			next;
		if (isRoot && isElement) {
			rootSize = paper.getView().getSize();
			rootSize = getSize(node, null, null, true) || rootSize;
			container = SvgElement.create('svg', {
				style: 'stroke-width: 1px; stroke-miterlimit: 10'
			});
			parent = node.parentNode;
			next = node.nextSibling;
			container.appendChild(node);
			body.appendChild(container);
		}
		var settings = paper.settings,
			applyMatrix = settings.applyMatrix,
			insertItems = settings.insertItems;
		settings.applyMatrix = false;
		settings.insertItems = false;
		var importer = importers[type],
			item = importer && importer(node, type, options, isRoot) || null;
		settings.insertItems = insertItems;
		settings.applyMatrix = applyMatrix;
		if (item) {
			if (isElement && !(item instanceof Group))
				item = applyAttributes(item, node, isRoot);
			var onImport = options.onImport,
				data = isElement && node.getAttribute('data-paper-data');
			if (onImport)
				item = onImport(node, item, options) || item;
			if (options.expandShapes && item instanceof Shape) {
				item.remove();
				item = item.toPath();
			}
			if (data)
				item._data = JSON.parse(data);
		}
		if (container) {
			body.removeChild(container);
			if (parent) {
				if (next) {
					parent.insertBefore(node, next);
				} else {
					parent.appendChild(node);
				}
			}
		}
		if (isRoot) {
			definitions = {};
			if (item && Base.pick(options.applyMatrix, applyMatrix))
				item.matrix.apply(true, true);
		}
		return item;
	}

	function importSVG(source, options, owner) {
		if (!source)
			return null;
		options = typeof options === 'function' ? { onLoad: options }
				: options || {};
		var scope = paper,
			item = null;

		function onLoad(svg) {
			try {
				var node = typeof svg === 'object'
					? svg
					: new self.DOMParser().parseFromString(
						svg.trim(),
						'image/svg+xml'
					);
				if (!node.nodeName) {
					node = null;
					throw new Error('Unsupported SVG source: ' + source);
				}
				paper = scope;
				item = importNode(node, options, true);
				if (!options || options.insert !== false) {
					owner._insertItem(undefined, item);
				}
				var onLoad = options.onLoad;
				if (onLoad)
					onLoad(item, svg);
			} catch (e) {
				onError(e);
			}
		}

		function onError(message, status) {
			var onError = options.onError;
			if (onError) {
				onError(message, status);
			} else {
				throw new Error(message);
			}
		}

		if (typeof source === 'string' && !/^[\s\S]*</.test(source)) {
			var node = document.getElementById(source);
			if (node) {
				onLoad(node);
			} else {
				Http.request({
					url: source,
					async: true,
					onLoad: onLoad,
					onError: onError
				});
			}
		} else if (typeof File !== 'undefined' && source instanceof File) {
			var reader = new FileReader();
			reader.onload = function() {
				onLoad(reader.result);
			};
			reader.onerror = function() {
				onError(reader.error);
			};
			return reader.readAsText(source);
		} else {
			onLoad(source);
		}

		return item;
	}

	Item.inject({
		importSVG: function(node, options) {
			return importSVG(node, options, this);
		}
	});

	Project.inject({
		importSVG: function(node, options) {
			this.activate();
			return importSVG(node, options, this);
		}
	});
};

var paper = new (PaperScope.inject(Base.exports, {
	Base: Base,
	Numerical: Numerical,
	Key: Key,
	DomEvent: DomEvent,
	DomElement: DomElement,
	document: document,
	window: window,
	Symbol: SymbolDefinition,
	PlacedSymbol: SymbolItem
}))();

if (paper.agent.node) {
	require('./node/extend.js')(paper);
}

if (typeof define === 'function' && define.amd) {
	define('paper', paper);
} else if (typeof module === 'object' && module) {
	module.exports = paper;
}

return paper;
}.call(this, typeof self === 'object' ? self : null);

!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).barba=n()}(this,(function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function n(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}function r(){return(r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t}).apply(this,arguments)}function e(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,n){return(o=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function u(t,n,r){return(u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,r){var e=[null];e.push.apply(e,n);var i=new(Function.bind.apply(t,e));return r&&o(i,r.prototype),i}).apply(null,arguments)}function f(t){var n="function"==typeof Map?new Map:void 0;return(f=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,r)}function r(){return u(t,arguments,i(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),o(r,t)})(t)}function s(t,n){try{var r=t()}catch(t){return n(t)}return r&&r.then?r.then(void 0,n):r}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var c,a="2.9.7",h=function(){};!function(t){t[t.off=0]="off",t[t.error=1]="error",t[t.warning=2]="warning",t[t.info=3]="info",t[t.debug=4]="debug"}(c||(c={}));var v=c.off,l=function(){function t(t){this.t=t}t.getLevel=function(){return v},t.setLevel=function(t){return v=c[t]};var n=t.prototype;return n.error=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.error,c.error,n)},n.warn=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.warn,c.warning,n)},n.info=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.info,c.info,n)},n.debug=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.log,c.debug,n)},n.i=function(n,r,e){r<=t.getLevel()&&n.apply(console,["["+this.t+"] "].concat(e))},t}(),d=O,m=E,p=g,w=x,b=T,y="/",P=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function g(t,n){for(var r,e=[],i=0,o=0,u="",f=n&&n.delimiter||y,s=n&&n.whitelist||void 0,c=!1;null!==(r=P.exec(t));){var a=r[0],h=r[1],v=r.index;if(u+=t.slice(o,v),o=v+a.length,h)u+=h[1],c=!0;else{var l="",d=r[2],m=r[3],p=r[4],w=r[5];if(!c&&u.length){var b=u.length-1,g=u[b];(!s||s.indexOf(g)>-1)&&(l=g,u=u.slice(0,b))}u&&(e.push(u),u="",c=!1);var E=m||p,x=l||f;e.push({name:d||i++,prefix:l,delimiter:x,optional:"?"===w||"*"===w,repeat:"+"===w||"*"===w,pattern:E?A(E):"[^"+k(x===f?x:x+f)+"]+?"})}}return(u||o<t.length)&&e.push(u+t.substr(o)),e}function E(t,n){return function(r,e){var i=t.exec(r);if(!i)return!1;for(var o=i[0],u=i.index,f={},s=e&&e.decode||decodeURIComponent,c=1;c<i.length;c++)if(void 0!==i[c]){var a=n[c-1];f[a.name]=a.repeat?i[c].split(a.delimiter).map((function(t){return s(t,a)})):s(i[c],a)}return{path:o,index:u,params:f}}}function x(t,n){for(var r=new Array(t.length),e=0;e<t.length;e++)"object"==typeof t[e]&&(r[e]=new RegExp("^(?:"+t[e].pattern+")$",R(n)));return function(n,e){for(var i="",o=e&&e.encode||encodeURIComponent,u=!e||!1!==e.validate,f=0;f<t.length;f++){var s=t[f];if("string"!=typeof s){var c,a=n?n[s.name]:void 0;if(Array.isArray(a)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but got array');if(0===a.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var h=0;h<a.length;h++){if(c=o(a[h],s),u&&!r[f].test(c))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'"');i+=(0===h?s.prefix:s.delimiter)+c}}else if("string"!=typeof a&&"number"!=typeof a&&"boolean"!=typeof a){if(!s.optional)throw new TypeError('Expected "'+s.name+'" to be '+(s.repeat?"an array":"a string"))}else{if(c=o(String(a),s),u&&!r[f].test(c))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but got "'+c+'"');i+=s.prefix+c}}else i+=s}return i}}function k(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function A(t){return t.replace(/([=!:$/()])/g,"\\$1")}function R(t){return t&&t.sensitive?"":"i"}function T(t,n,r){for(var e=(r=r||{}).strict,i=!1!==r.start,o=!1!==r.end,u=r.delimiter||y,f=[].concat(r.endsWith||[]).map(k).concat("$").join("|"),s=i?"^":"",c=0;c<t.length;c++){var a=t[c];if("string"==typeof a)s+=k(a);else{var h=a.repeat?"(?:"+a.pattern+")(?:"+k(a.delimiter)+"(?:"+a.pattern+"))*":a.pattern;n&&n.push(a),s+=a.optional?a.prefix?"(?:"+k(a.prefix)+"("+h+"))?":"("+h+")?":k(a.prefix)+"("+h+")"}}if(o)e||(s+="(?:"+k(u)+")?"),s+="$"===f?"$":"(?="+f+")";else{var v=t[t.length-1],l="string"==typeof v?v[v.length-1]===u:void 0===v;e||(s+="(?:"+k(u)+"(?="+f+"))?"),l||(s+="(?="+k(u)+"|"+f+")")}return new RegExp(s,R(r))}function O(t,n,r){return t instanceof RegExp?function(t,n){if(!n)return t;var r=t.source.match(/\((?!\?)/g);if(r)for(var e=0;e<r.length;e++)n.push({name:e,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return t}(t,n):Array.isArray(t)?function(t,n,r){for(var e=[],i=0;i<t.length;i++)e.push(O(t[i],n,r).source);return new RegExp("(?:"+e.join("|")+")",R(r))}(t,n,r):function(t,n,r){return T(g(t,r),n,r)}(t,n,r)}d.match=function(t,n){var r=[];return E(O(t,r,n),r)},d.regexpToFunction=m,d.parse=p,d.compile=function(t,n){return x(g(t,n),n)},d.tokensToFunction=w,d.tokensToRegExp=b;var S={container:"container",history:"history",namespace:"namespace",prefix:"data-barba",prevent:"prevent",wrapper:"wrapper"},j=new(function(){function t(){this.o=S,this.u=new DOMParser}var n=t.prototype;return n.toString=function(t){return t.outerHTML},n.toDocument=function(t){return this.u.parseFromString(t,"text/html")},n.toElement=function(t){var n=document.createElement("div");return n.innerHTML=t,n},n.getHtml=function(t){return void 0===t&&(t=document),this.toString(t.documentElement)},n.getWrapper=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.wrapper+'"]')},n.getContainer=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.container+'"]')},n.removeContainer=function(t){document.body.contains(t)&&t.parentNode.removeChild(t)},n.addContainer=function(t,n){var r=this.getContainer();r?this.s(t,r):n.appendChild(t)},n.getNamespace=function(t){void 0===t&&(t=document);var n=t.querySelector("["+this.o.prefix+"-"+this.o.namespace+"]");return n?n.getAttribute(this.o.prefix+"-"+this.o.namespace):null},n.getHref=function(t){if(t.tagName&&"a"===t.tagName.toLowerCase()){if("string"==typeof t.href)return t.href;var n=t.getAttribute("href")||t.getAttribute("xlink:href");if(n)return this.resolveUrl(n.baseVal||n)}return null},n.resolveUrl=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var e=n.length;if(0===e)throw new Error("resolveUrl requires at least one argument; got none.");var i=document.createElement("base");if(i.href=arguments[0],1===e)return i.href;var o=document.getElementsByTagName("head")[0];o.insertBefore(i,o.firstChild);for(var u,f=document.createElement("a"),s=1;s<e;s++)f.href=arguments[s],i.href=u=f.href;return o.removeChild(i),u},n.s=function(t,n){n.parentNode.insertBefore(t,n.nextSibling)},t}()),M=new(function(){function t(){this.h=[],this.v=-1}var e=t.prototype;return e.init=function(t,n){this.l="barba";var r={ns:n,scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(r),this.v=0;var e={from:this.l,index:0,states:[].concat(this.h)};window.history&&window.history.replaceState(e,"",t)},e.change=function(t,n,r){if(r&&r.state){var e=r.state,i=e.index;n=this.m(this.v-i),this.replace(e.states),this.v=i}else this.add(t,n);return n},e.add=function(t,n){var r=this.size,e=this.p(n),i={ns:"tmp",scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(i),this.v=r;var o={from:this.l,index:r,states:[].concat(this.h)};switch(e){case"push":window.history&&window.history.pushState(o,"",t);break;case"replace":window.history&&window.history.replaceState(o,"",t)}},e.update=function(t,n){var e=n||this.v,i=r({},this.get(e),{},t);this.set(e,i)},e.remove=function(t){t?this.h.splice(t,1):this.h.pop(),this.v--},e.clear=function(){this.h=[],this.v=-1},e.replace=function(t){this.h=t},e.get=function(t){return this.h[t]},e.set=function(t,n){return this.h[t]=n},e.p=function(t){var n="push",r=t,e=S.prefix+"-"+S.history;return r.hasAttribute&&r.hasAttribute(e)&&(n=r.getAttribute(e)),n},e.m=function(t){return Math.abs(t)>1?t>0?"forward":"back":0===t?"popstate":t>0?"back":"forward"},n(t,[{key:"current",get:function(){return this.h[this.v]}},{key:"state",get:function(){return this.h[this.h.length-1]}},{key:"previous",get:function(){return this.v<1?null:this.h[this.v-1]}},{key:"size",get:function(){return this.h.length}}]),t}()),L=function(t,n){try{var r=function(){if(!n.next.html)return Promise.resolve(t).then((function(t){var r=n.next;if(t){var e=j.toElement(t);r.namespace=j.getNamespace(e),r.container=j.getContainer(e),r.html=t,M.update({ns:r.namespace});var i=j.toDocument(t);document.title=i.title}}))}();return Promise.resolve(r&&r.then?r.then((function(){})):void 0)}catch(t){return Promise.reject(t)}},$=d,_={__proto__:null,update:L,nextTick:function(){return new Promise((function(t){window.requestAnimationFrame(t)}))},pathToRegexp:$},q=function(){return window.location.origin},B=function(t){return void 0===t&&(t=window.location.href),U(t).port},U=function(t){var n,r=t.match(/:\d+/);if(null===r)/^http/.test(t)&&(n=80),/^https/.test(t)&&(n=443);else{var e=r[0].substring(1);n=parseInt(e,10)}var i,o=t.replace(q(),""),u={},f=o.indexOf("#");f>=0&&(i=o.slice(f+1),o=o.slice(0,f));var s=o.indexOf("?");return s>=0&&(u=D(o.slice(s+1)),o=o.slice(0,s)),{hash:i,path:o,port:n,query:u}},D=function(t){return t.split("&").reduce((function(t,n){var r=n.split("=");return t[r[0]]=r[1],t}),{})},F=function(t){return void 0===t&&(t=window.location.href),t.replace(/(\/#.*|\/|#.*)$/,"")},H={__proto__:null,getHref:function(){return window.location.href},getOrigin:q,getPort:B,getPath:function(t){return void 0===t&&(t=window.location.href),U(t).path},parse:U,parseQuery:D,clean:F};function I(t,n,r){return void 0===n&&(n=2e3),new Promise((function(e,i){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState===XMLHttpRequest.DONE)if(200===o.status)e(o.responseText);else if(o.status){var n={status:o.status,statusText:o.statusText};r(t,n),i(n)}},o.ontimeout=function(){var e=new Error("Timeout error ["+n+"]");r(t,e),i(e)},o.onerror=function(){var n=new Error("Fetch error");r(t,n),i(n)},o.open("GET",t),o.timeout=n,o.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml"),o.setRequestHeader("x-barba","yes"),o.send()}))}var C=function(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then};function N(t,n){return void 0===n&&(n={}),function(){for(var r=arguments.length,e=new Array(r),i=0;i<r;i++)e[i]=arguments[i];var o=!1,u=new Promise((function(r,i){n.async=function(){return o=!0,function(t,n){t?i(t):r(n)}};var u=t.apply(n,e);o||(C(u)?u.then(r,i):r(u))}));return u}}var X=new(function(t){function n(){var n;return(n=t.call(this)||this).logger=new l("@barba/core"),n.all=["ready","page","reset","currentAdded","currentRemoved","nextAdded","nextRemoved","beforeOnce","once","afterOnce","before","beforeLeave","leave","afterLeave","beforeEnter","enter","afterEnter","after"],n.registered=new Map,n.init(),n}e(n,t);var r=n.prototype;return r.init=function(){var t=this;this.registered.clear(),this.all.forEach((function(n){t[n]||(t[n]=function(r,e){t.registered.has(n)||t.registered.set(n,new Set),t.registered.get(n).add({ctx:e||{},fn:r})})}))},r.do=function(t){for(var n=this,r=arguments.length,e=new Array(r>1?r-1:0),i=1;i<r;i++)e[i-1]=arguments[i];if(this.registered.has(t)){var o=Promise.resolve();return this.registered.get(t).forEach((function(t){o=o.then((function(){return N(t.fn,t.ctx).apply(void 0,e)}))})),o.catch((function(r){n.logger.debug("Hook error ["+t+"]"),n.logger.error(r)}))}return Promise.resolve()},r.clear=function(){var t=this;this.all.forEach((function(n){delete t[n]})),this.init()},r.help=function(){this.logger.info("Available hooks: "+this.all.join(","));var t=[];this.registered.forEach((function(n,r){return t.push(r)})),this.logger.info("Registered hooks: "+t.join(","))},n}(h)),z=function(){function t(t){if(this.P=[],"boolean"==typeof t)this.g=t;else{var n=Array.isArray(t)?t:[t];this.P=n.map((function(t){return $(t)}))}}return t.prototype.checkHref=function(t){if("boolean"==typeof this.g)return this.g;var n=U(t).path;return this.P.some((function(t){return null!==t.exec(n)}))},t}(),G=function(t){function n(n){var r;return(r=t.call(this,n)||this).k=new Map,r}e(n,t);var i=n.prototype;return i.set=function(t,n,r){return this.k.set(t,{action:r,request:n}),{action:r,request:n}},i.get=function(t){return this.k.get(t)},i.getRequest=function(t){return this.k.get(t).request},i.getAction=function(t){return this.k.get(t).action},i.has=function(t){return!this.checkHref(t)&&this.k.has(t)},i.delete=function(t){return this.k.delete(t)},i.update=function(t,n){var e=r({},this.k.get(t),{},n);return this.k.set(t,e),e},n}(z),Q=function(){return!window.history.pushState},W=function(t){return!t.el||!t.href},J=function(t){var n=t.event;return n.which>1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey},K=function(t){var n=t.el;return n.hasAttribute("target")&&"_blank"===n.target},V=function(t){var n=t.el;return void 0!==n.protocol&&window.location.protocol!==n.protocol||void 0!==n.hostname&&window.location.hostname!==n.hostname},Y=function(t){var n=t.el;return void 0!==n.port&&B()!==B(n.href)},Z=function(t){var n=t.el;return n.getAttribute&&"string"==typeof n.getAttribute("download")},tt=function(t){return t.el.hasAttribute(S.prefix+"-"+S.prevent)},nt=function(t){return Boolean(t.el.closest("["+S.prefix+"-"+S.prevent+'="all"]'))},rt=function(t){var n=t.href;return F(n)===F()&&B(n)===B()},et=function(t){function n(n){var r;return(r=t.call(this,n)||this).suite=[],r.tests=new Map,r.init(),r}e(n,t);var r=n.prototype;return r.init=function(){this.add("pushState",Q),this.add("exists",W),this.add("newTab",J),this.add("blank",K),this.add("corsDomain",V),this.add("corsPort",Y),this.add("download",Z),this.add("preventSelf",tt),this.add("preventAll",nt),this.add("sameUrl",rt,!1)},r.add=function(t,n,r){void 0===r&&(r=!0),this.tests.set(t,n),r&&this.suite.push(t)},r.run=function(t,n,r,e){return this.tests.get(t)({el:n,event:r,href:e})},r.checkLink=function(t,n,r){var e=this;return this.suite.some((function(i){return e.run(i,t,n,r)}))},n}(z),it=function(t){function n(r,e){var i;void 0===e&&(e="Barba error");for(var o=arguments.length,u=new Array(o>2?o-2:0),f=2;f<o;f++)u[f-2]=arguments[f];return(i=t.call.apply(t,[this].concat(u))||this).error=r,i.label=e,Error.captureStackTrace&&Error.captureStackTrace(function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(i),n),i.name="BarbaError",i}return e(n,t),n}(f(Error)),ot=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.all=[],this.page=[],this.once=[],this.A=[{name:"namespace",type:"strings"},{name:"custom",type:"function"}],t&&(this.all=this.all.concat(t)),this.update()}var n=t.prototype;return n.add=function(t,n){switch(t){case"rule":this.A.splice(n.position||0,0,n.value);break;case"transition":default:this.all.push(n)}this.update()},n.resolve=function(t,n){var r=this;void 0===n&&(n={});var e=n.once?this.once:this.page;e=e.filter(n.self?function(t){return t.name&&"self"===t.name}:function(t){return!t.name||"self"!==t.name});var i=new Map,o=e.find((function(e){var o=!0,u={};return!(!n.self||"self"!==e.name)||(r.A.reverse().forEach((function(n){o&&(o=r.R(e,n,t,u),e.from&&e.to&&(o=r.R(e,n,t,u,"from")&&r.R(e,n,t,u,"to")),e.from&&!e.to&&(o=r.R(e,n,t,u,"from")),!e.from&&e.to&&(o=r.R(e,n,t,u,"to")))})),i.set(e,u),o)})),u=i.get(o),f=[];if(f.push(n.once?"once":"page"),n.self&&f.push("self"),u){var s,c=[o];Object.keys(u).length>0&&c.push(u),(s=this.logger).info.apply(s,["Transition found ["+f.join(",")+"]"].concat(c))}else this.logger.info("No transition found ["+f.join(",")+"]");return o},n.update=function(){var t=this;this.all=this.all.map((function(n){return t.T(n)})).sort((function(t,n){return t.priority-n.priority})).reverse().map((function(t){return delete t.priority,t})),this.page=this.all.filter((function(t){return void 0!==t.leave||void 0!==t.enter})),this.once=this.all.filter((function(t){return void 0!==t.once}))},n.R=function(t,n,r,e,i){var o=!0,u=!1,f=t,s=n.name,c=s,a=s,h=s,v=i?f[i]:f,l="to"===i?r.next:r.current;if(i?v&&v[s]:v[s]){switch(n.type){case"strings":default:var d=Array.isArray(v[c])?v[c]:[v[c]];l[c]&&-1!==d.indexOf(l[c])&&(u=!0),-1===d.indexOf(l[c])&&(o=!1);break;case"object":var m=Array.isArray(v[a])?v[a]:[v[a]];l[a]?(l[a].name&&-1!==m.indexOf(l[a].name)&&(u=!0),-1===m.indexOf(l[a].name)&&(o=!1)):o=!1;break;case"function":v[h](r)?u=!0:o=!1}u&&(i?(e[i]=e[i]||{},e[i][s]=f[i][s]):e[s]=f[s])}return o},n.O=function(t,n,r){var e=0;return(t[n]||t.from&&t.from[n]||t.to&&t.to[n])&&(e+=Math.pow(10,r),t.from&&t.from[n]&&(e+=1),t.to&&t.to[n]&&(e+=2)),e},n.T=function(t){var n=this;t.priority=0;var r=0;return this.A.forEach((function(e,i){r+=n.O(t,e.name,i+1)})),t.priority=r,t},t}(),ut=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.S=!1,this.store=new ot(t)}var r=t.prototype;return r.get=function(t,n){return this.store.resolve(t,n)},r.doOnce=function(t){var n=t.data,r=t.transition;try{var e=function(){i.S=!1},i=this,o=r||{};i.S=!0;var u=s((function(){return Promise.resolve(i.j("beforeOnce",n,o)).then((function(){return Promise.resolve(i.once(n,o)).then((function(){return Promise.resolve(i.j("afterOnce",n,o)).then((function(){}))}))}))}),(function(t){i.S=!1,i.logger.debug("Transition error [before/after/once]"),i.logger.error(t)}));return Promise.resolve(u&&u.then?u.then(e):e())}catch(t){return Promise.reject(t)}},r.doPage=function(t){var n=t.data,r=t.transition,e=t.page,i=t.wrapper;try{var o=function(t){if(u)return t;f.S=!1},u=!1,f=this,c=r||{},a=!0===c.sync||!1;f.S=!0;var h=s((function(){function t(){return Promise.resolve(f.j("before",n,c)).then((function(){var t=!1;function r(r){return t?r:Promise.resolve(f.remove(n)).then((function(){return Promise.resolve(f.j("after",n,c)).then((function(){}))}))}var o=function(){if(a)return s((function(){return Promise.resolve(f.add(n,i)).then((function(){return Promise.resolve(f.j("beforeLeave",n,c)).then((function(){return Promise.resolve(f.j("beforeEnter",n,c)).then((function(){return Promise.resolve(Promise.all([f.leave(n,c),f.enter(n,c)])).then((function(){return Promise.resolve(f.j("afterLeave",n,c)).then((function(){return Promise.resolve(f.j("afterEnter",n,c)).then((function(){}))}))}))}))}))}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [sync]")}));var r=function(r){return t?r:s((function(){var t=function(){if(!1!==o)return Promise.resolve(f.add(n,i)).then((function(){return Promise.resolve(f.j("beforeEnter",n,c)).then((function(){return Promise.resolve(f.enter(n,c,o)).then((function(){return Promise.resolve(f.j("afterEnter",n,c)).then((function(){}))}))}))}))}();if(t&&t.then)return t.then((function(){}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [before/after/enter]")}))},o=!1,u=s((function(){return Promise.resolve(f.j("beforeLeave",n,c)).then((function(){return Promise.resolve(Promise.all([f.leave(n,c),L(e,n)]).then((function(t){return t[0]}))).then((function(t){return o=t,Promise.resolve(f.j("afterLeave",n,c)).then((function(){}))}))}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [before/after/leave]")}));return u&&u.then?u.then(r):r(u)}();return o&&o.then?o.then(r):r(o)}))}var r=function(){if(a)return Promise.resolve(L(e,n)).then((function(){}))}();return r&&r.then?r.then(t):t()}),(function(t){if(f.S=!1,t.name&&"BarbaError"===t.name)throw f.logger.debug(t.label),f.logger.error(t.error),t;throw f.logger.debug("Transition error [page]"),f.logger.error(t),t}));return Promise.resolve(h&&h.then?h.then(o):o(h))}catch(t){return Promise.reject(t)}},r.once=function(t,n){try{return Promise.resolve(X.do("once",t,n)).then((function(){return n.once?N(n.once,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.leave=function(t,n){try{return Promise.resolve(X.do("leave",t,n)).then((function(){return n.leave?N(n.leave,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.enter=function(t,n,r){try{return Promise.resolve(X.do("enter",t,n)).then((function(){return n.enter?N(n.enter,n)(t,r):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.add=function(t,n){try{return j.addContainer(t.next.container,n),X.do("nextAdded",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.remove=function(t){try{return j.removeContainer(t.current.container),X.do("currentRemoved",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.M=function(t){return t.message?!/Timeout error|Fetch error/.test(t.message):!t.status},r.j=function(t,n,r){try{return Promise.resolve(X.do(t,n,r)).then((function(){return r[t]?N(r[t],r)(n):Promise.resolve()}))}catch(t){return Promise.reject(t)}},n(t,[{key:"isRunning",get:function(){return this.S},set:function(t){this.S=t}},{key:"hasOnce",get:function(){return this.store.once.length>0}},{key:"hasSelf",get:function(){return this.store.all.some((function(t){return"self"===t.name}))}},{key:"shouldWait",get:function(){return this.store.all.some((function(t){return t.to&&!t.to.route||t.sync}))}}]),t}(),ft=function(){function t(t){var n=this;this.names=["beforeLeave","afterLeave","beforeEnter","afterEnter"],this.byNamespace=new Map,0!==t.length&&(t.forEach((function(t){n.byNamespace.set(t.namespace,t)})),this.names.forEach((function(t){X[t](n.L(t))})))}return t.prototype.L=function(t){var n=this;return function(r){var e=t.match(/enter/i)?r.next:r.current,i=n.byNamespace.get(e.namespace);return i&&i[t]?N(i[t],i)(r):Promise.resolve()}},t}();Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var n=this;do{if(n.matches(t))return n;n=n.parentElement||n.parentNode}while(null!==n&&1===n.nodeType);return null});var st={container:null,html:"",namespace:"",url:{hash:"",href:"",path:"",port:null,query:{}}};return new(function(){function t(){this.version=a,this.schemaPage=st,this.Logger=l,this.logger=new l("@barba/core"),this.plugins=[],this.hooks=X,this.dom=j,this.helpers=_,this.history=M,this.request=I,this.url=H}var e=t.prototype;return e.use=function(t,n){var r=this.plugins;r.indexOf(t)>-1?this.logger.warn("Plugin ["+t.name+"] already installed."):"function"==typeof t.install?(t.install(this,n),r.push(t)):this.logger.warn("Plugin ["+t.name+'] has no "install" method.')},e.init=function(t){var n=void 0===t?{}:t,e=n.transitions,i=void 0===e?[]:e,o=n.views,u=void 0===o?[]:o,f=n.schema,s=void 0===f?S:f,c=n.requestError,a=n.timeout,h=void 0===a?2e3:a,v=n.cacheIgnore,d=void 0!==v&&v,m=n.prefetchIgnore,p=void 0!==m&&m,w=n.preventRunning,b=void 0!==w&&w,y=n.prevent,P=void 0===y?null:y,g=n.debug,E=n.logLevel;if(l.setLevel(!0===(void 0!==g&&g)?"debug":void 0===E?"off":E),this.logger.info(this.version),Object.keys(s).forEach((function(t){S[t]&&(S[t]=s[t])})),this.$=c,this.timeout=h,this.cacheIgnore=d,this.prefetchIgnore=p,this.preventRunning=b,this._=this.dom.getWrapper(),!this._)throw new Error("[@barba/core] No Barba wrapper found");this._.setAttribute("aria-live","polite"),this.q();var x=this.data.current;if(!x.container)throw new Error("[@barba/core] No Barba container found");if(this.cache=new G(d),this.prevent=new et(p),this.transitions=new ut(i),this.views=new ft(u),null!==P){if("function"!=typeof P)throw new Error("[@barba/core] Prevent should be a function");this.prevent.add("preventCustom",P)}this.history.init(x.url.href,x.namespace),this.B=this.B.bind(this),this.U=this.U.bind(this),this.D=this.D.bind(this),this.F(),this.plugins.forEach((function(t){return t.init()}));var k=this.data;k.trigger="barba",k.next=k.current,k.current=r({},this.schemaPage),this.hooks.do("ready",k),this.once(k),this.q()},e.destroy=function(){this.q(),this.H(),this.history.clear(),this.hooks.clear(),this.plugins=[]},e.force=function(t){window.location.assign(t)},e.go=function(t,n,r){var e;if(void 0===n&&(n="barba"),this.transitions.isRunning)this.force(t);else if(!(e="popstate"===n?this.history.current&&this.url.getPath(this.history.current.url)===this.url.getPath(t):this.prevent.run("sameUrl",null,null,t))||this.transitions.hasSelf)return n=this.history.change(t,n,r),r&&(r.stopPropagation(),r.preventDefault()),this.page(t,n,e)},e.once=function(t){try{var n=this;return Promise.resolve(n.hooks.do("beforeEnter",t)).then((function(){function r(){return Promise.resolve(n.hooks.do("afterEnter",t)).then((function(){}))}var e=function(){if(n.transitions.hasOnce){var r=n.transitions.get(t,{once:!0});return Promise.resolve(n.transitions.doOnce({transition:r,data:t})).then((function(){}))}}();return e&&e.then?e.then(r):r()}))}catch(t){return Promise.reject(t)}},e.page=function(t,n,e){try{var i=function(){var t=o.data;return Promise.resolve(o.hooks.do("page",t)).then((function(){var n=s((function(){var n=o.transitions.get(t,{once:!1,self:e});return Promise.resolve(o.transitions.doPage({data:t,page:u,transition:n,wrapper:o._})).then((function(){o.q()}))}),(function(){0===l.getLevel()&&o.force(t.current.url.href)}));if(n&&n.then)return n.then((function(){}))}))},o=this;o.data.next.url=r({href:t},o.url.parse(t)),o.data.trigger=n;var u=o.cache.has(t)?o.cache.update(t,{action:"click"}).request:o.cache.set(t,o.request(t,o.timeout,o.onRequestError.bind(o,n)),"click").request,f=function(){if(o.transitions.shouldWait)return Promise.resolve(L(u,o.data)).then((function(){}))}();return Promise.resolve(f&&f.then?f.then(i):i())}catch(t){return Promise.reject(t)}},e.onRequestError=function(t){this.transitions.isRunning=!1;for(var n=arguments.length,r=new Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];var i=r[0],o=r[1],u=this.cache.getAction(i);return this.cache.delete(i),!(this.$&&!1===this.$(t,u,i,o)||("click"===u&&this.force(i),1))},e.prefetch=function(t){var n=this;this.cache.has(t)||this.cache.set(t,this.request(t,this.timeout,this.onRequestError.bind(this,"barba")).catch((function(t){n.logger.error(t)})),"prefetch")},e.F=function(){!0!==this.prefetchIgnore&&(document.addEventListener("mouseover",this.B),document.addEventListener("touchstart",this.B)),document.addEventListener("click",this.U),window.addEventListener("popstate",this.D)},e.H=function(){!0!==this.prefetchIgnore&&(document.removeEventListener("mouseover",this.B),document.removeEventListener("touchstart",this.B)),document.removeEventListener("click",this.U),window.removeEventListener("popstate",this.D)},e.B=function(t){var n=this,r=this.I(t);if(r){var e=this.dom.getHref(r);this.prevent.checkHref(e)||this.cache.has(e)||this.cache.set(e,this.request(e,this.timeout,this.onRequestError.bind(this,r)).catch((function(t){n.logger.error(t)})),"enter")}},e.U=function(t){var n=this.I(t);if(n)return this.transitions.isRunning&&this.preventRunning?(t.preventDefault(),void t.stopPropagation()):void this.go(this.dom.getHref(n),n,t)},e.D=function(t){this.go(this.url.getHref(),"popstate",t)},e.I=function(t){for(var n=t.target;n&&!this.dom.getHref(n);)n=n.parentNode;if(n&&!this.prevent.checkLink(n,t,this.dom.getHref(n)))return n},e.q=function(){var t=this.url.getHref(),n={container:this.dom.getContainer(),html:this.dom.getHtml(),namespace:this.dom.getNamespace(),url:r({href:t},this.url.parse(t))};this.C={current:n,next:r({},this.schemaPage),trigger:void 0},this.hooks.do("reset",this.data)},n(t,[{key:"data",get:function(){return this.C}},{key:"wrapper",get:function(){return this._}}]),t}())}));
//# sourceMappingURL=barba.umd.js.map

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  /*!
   * GSAP 3.5.1
   * https://greensock.com
   *
   * @license Copyright 2008-2020, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
      _defaults = {
    duration: .5,
    overwrite: false,
    delay: 0
  },
      _bigNum = 1e8,
      _tinyNum = 1 / _bigNum,
      _2PI = Math.PI * 2,
      _HALF_PI = _2PI / 4,
      _gsID = 0,
      _sqrt = Math.sqrt,
      _cos = Math.cos,
      _sin = Math.sin,
      _isString = function _isString(value) {
    return typeof value === "string";
  },
      _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
      _isNumber = function _isNumber(value) {
    return typeof value === "number";
  },
      _isUndefined = function _isUndefined(value) {
    return typeof value === "undefined";
  },
      _isObject = function _isObject(value) {
    return typeof value === "object";
  },
      _isNotFalse = function _isNotFalse(value) {
    return value !== false;
  },
      _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
      _isFuncOrString = function _isFuncOrString(value) {
    return _isFunction(value) || _isString(value);
  },
      _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
      _isArray = Array.isArray,
      _strictNumExp = /(?:-?\.?\d|\.)+/gi,
      _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
      _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      _complexStringNumExp = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
      _relExp = /[+-]=-?[\.\d]+/,
      _delimitedValueExp = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
      _globalTimeline,
      _win,
      _coreInitted,
      _doc,
      _globals = {},
      _installScope = {},
      _coreReady,
      _install = function _install(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  },
      _missingPlugin = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  },
      _warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
  },
      _addGlobal = function _addGlobal(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  },
      _emptyFunc = function _emptyFunc() {
    return 0;
  },
      _reservedProps = {},
      _lazyTweens = [],
      _lazyLookup = {},
      _lastRenderedFrame,
      _plugins = {},
      _effects = {},
      _nextGCFrame = 30,
      _harnessPlugins = [],
      _callbackNames = "",
      _harness = function _harness(targets) {
    var target = targets[0],
        harnessPlugin,
        i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);

    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;

      while (i-- && !_harnessPlugins[i].targetTest(target)) {}

      harnessPlugin = _harnessPlugins[i];
    }

    i = targets.length;

    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }

    return targets;
  },
      _getCache = function _getCache(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  },
      _getProperty = function _getProperty(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  },
      _forEachName = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  },
      _round = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
  },
      _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    var l = toFind.length,
        i = 0;

    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

    return i < l;
  },
      _parseVars = function _parseVars(params, type, parent) {
    var isLegacy = _isNumber(params[1]),
        varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
        vars = params[varsIndex],
        irVars;

    isLegacy && (vars.duration = params[1]);
    vars.parent = parent;

    if (type) {
      irVars = vars;

      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }

      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }

    return vars;
  },
      _lazyRender = function _lazyRender() {
    var l = _lazyTweens.length,
        a = _lazyTweens.slice(0),
        i,
        tween;

    _lazyLookup = {};
    _lazyTweens.length = 0;

    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  },
      _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    _lazyTweens.length && _lazyRender();
    animation.render(time, suppressEvents, force);
    _lazyTweens.length && _lazyRender();
  },
      _numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  },
      _passThrough = function _passThrough(p) {
    return p;
  },
      _setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || (obj[p] = defaults[p]);
    }

    return obj;
  },
      _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
    }
  },
      _merge = function _merge(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }

    return base;
  },
      _mergeDeep = function _mergeDeep(base, toMerge) {
    for (var p in toMerge) {
      base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p];
    }

    return base;
  },
      _copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {},
        p;

    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }

    return copy;
  },
      _inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || _globalTimeline,
        func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }

    return vars;
  },
      _arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length,
        match = i === a2.length;

    while (match && i-- && a1[i] === a2[i]) {}

    return i < 0;
  },
      _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = parent[lastProp],
        t;

    if (sortBy) {
      t = child[sortBy];

      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }

    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }

    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }

    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  },
      _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = child._prev,
        next = child._next;

    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }

    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }

    child._next = child._prev = child.parent = null;
  },
      _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
  },
      _uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;

      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }

    return animation;
  },
      _recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;

    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }

    return animation;
  },
      _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
  },
      _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  },
      _animationCycle = function _animationCycle(tTime, cycleDuration) {
    return (tTime /= cycleDuration) && ~~tTime === tTime ? ~~tTime - 1 : ~~tTime;
  },
      _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  },
      _setEnd = function _setEnd(animation) {
    return animation._end = _round(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  },
      _alignPlayhead = function _alignPlayhead(animation, totalTime) {
    var parent = animation._dp;

    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _round(animation._dp._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

      _setEnd(animation);

      parent._dirty || _uncache(parent, animation);
    }

    return animation;
  },
      _postAddChecks = function _postAddChecks(timeline, child) {
    var t;

    if (child._time || child._initted && !child._dur) {
      t = _parentToChildTotalTime(timeline.rawTime(), child);

      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }

    if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
      if (timeline._dur < timeline.duration()) {
        t = timeline;

        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }

      timeline._zTime = -_tinyNum;
    }
  },
      _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _round(position + child._delay);
    child._end = _round(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

    _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

    timeline._recent = child;
    skipChecks || _postAddChecks(timeline, child);
    return timeline;
  },
      _scrollTrigger = function _scrollTrigger(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  },
      _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
    _initTween(tween, totalTime);

    if (!tween._initted) {
      return 1;
    }

    if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);

      tween._lazy = [totalTime, suppressEvents];
      return 1;
    }
  },
      _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio,
        ratio = totalTime < 0 || !totalTime && prevRatio && !tween._start && tween._zTime > _tinyNum && !tween._dp._lock || (tween._ts < 0 || tween._dp._ts < 0) && tween.data !== "isFromStart" && tween.data !== "isStart" ? 0 : 1,
        repeatDelay = tween._rDelay,
        tTime = 0,
        pt,
        iteration,
        prevIteration;

    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      prevIteration = _animationCycle(tween._tTime, repeatDelay);

      if (iteration !== prevIteration) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }

    if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
        return;
      }

      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      suppressEvents || _callback(tween, "onStart");
      pt = tween._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);

        if (!suppressEvents) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  },
      _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;

    if (time > prevTime) {
      child = animation._first;

      while (child && child._start <= time) {
        if (!child._dur && child.data === "isPause" && child._start > prevTime) {
          return child;
        }

        child = child._next;
      }
    } else {
      child = animation._last;

      while (child && child._start >= time) {
        if (!child._dur && child.data === "isPause" && child._start < prevTime) {
          return child;
        }

        child = child._prev;
      }
    }
  },
      _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat,
        dur = _round(duration) || 0,
        totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _round(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  },
      _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  },
      _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc
  },
      _parsePosition = function _parsePosition(animation, position) {
    var labels = animation.labels,
        recent = animation._recent || _zeroPosition,
        clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
        i,
        offset;

    if (_isString(position) && (isNaN(position) || position in labels)) {
      i = position.charAt(0);

      if (i === "<" || i === ">") {
        return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
      }

      i = position.indexOf("=");

      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }

      offset = +(position.charAt(i - 1) + position.substr(i + 1));
      return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
    }

    return position == null ? clippedDuration : +position;
  },
      _conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
  },
      _clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
  },
      getUnit = function getUnit(value) {
    return (value = (value + "").substr((parseFloat(value) + "").length)) && isNaN(value) ? value : "";
  },
      clamp = function clamp(min, max, value) {
    return _conditionalReturn(value, function (v) {
      return _clamp(min, max, v);
    });
  },
      _slice = [].slice,
      _isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  },
      _flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }

    return ar.forEach(function (value) {
      var _accumulator;

      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  },
      toArray = function toArray(value, leaveStrings) {
    return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  },
      shuffle = function shuffle(a) {
    return a.sort(function () {
      return .5 - Math.random();
    });
  },
      distribute = function distribute(v) {
    if (_isFunction(v)) {
      return v;
    }

    var vars = _isObject(v) ? v : {
      each: v
    },
        ease = _parseEase(vars.ease),
        from = vars.from || 0,
        base = parseFloat(vars.base) || 0,
        cache = {},
        isDecimal = from > 0 && from < 1,
        ratios = isNaN(from) || isDecimal,
        axis = vars.axis,
        ratioX = from,
        ratioY = from;

    if (_isString(from)) {
      ratioX = ratioY = {
        center: .5,
        edges: .5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }

    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrapAt;

      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

        if (!wrapAt) {
          max = -_bigNum;

          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

          wrapAt--;
        }

        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
        originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;

        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }

        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }

      l = (distances[i] - distances.min) / distances.max || 0;
      return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  },
      _roundModifier = function _roundModifier(v) {
    var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1;
    return function (raw) {
      return Math.floor(Math.round(parseFloat(raw) / v) * v * p) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  },
      snap = function snap(snapTo, value) {
    var isArray = _isArray(snapTo),
        radius,
        is2D;

    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;

      if (snapTo.values) {
        snapTo = toArray(snapTo.values);

        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }

    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function (raw) {
      var x = parseFloat(is2D ? raw.x : raw),
          y = parseFloat(is2D ? raw.y : 0),
          min = _bigNum,
          closest = 0,
          i = snapTo.length,
          dx,
          dy;

      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }

        if (dx < min) {
          min = dx;
          closest = i;
        }
      }

      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  },
      random = function random(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min + Math.random() * (max - min)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  },
      pipe = function pipe() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }

    return function (value) {
      return functions.reduce(function (v, f) {
        return f(v);
      }, value);
    };
  },
      unitize = function unitize(func, unit) {
    return function (value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  },
      normalize = function normalize(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  },
      _wrapArray = function _wrapArray(a, wrapper, value) {
    return _conditionalReturn(value, function (index) {
      return a[~~wrapper(index)];
    });
  },
      wrap = function wrap(min, max, value) {
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
      return (range + (value - min) % range) % range + min;
    });
  },
      wrapYoyo = function wrapYoyo(min, max, value) {
    var range = max - min,
        total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
      value = (total + (value - min) % total) % total || 0;
      return min + (value > range ? total - value : value);
    });
  },
      _replaceRandom = function _replaceRandom(value) {
    var prev = 0,
        s = "",
        i,
        nums,
        end,
        isArray;

    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }

    return s + value.substr(prev, value.length - prev);
  },
      mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin,
        outRange = outMax - outMin;
    return _conditionalReturn(value, function (value) {
      return outMin + ((value - inMin) / inRange * outRange || 0);
    });
  },
      interpolate = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function (p) {
      return (1 - p) * start + p * end;
    };

    if (!func) {
      var isString = _isString(start),
          master = {},
          p,
          i,
          interpolators,
          l,
          il;

      progress === true && (mutate = 1) && (progress = null);

      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;

        for (i = 1; i < l; i++) {
          interpolators.push(interpolate(start[i - 1], start[i]));
        }

        l--;

        func = function func(p) {
          p *= l;
          var i = Math.min(il, ~~p);
          return interpolators[i](p - i);
        };

        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }

      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }

        func = function func(p) {
          return _renderPropTweens(p, master) || (isString ? start.p : start);
        };
      }
    }

    return _conditionalReturn(progress, func);
  },
      _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    var labels = timeline.labels,
        min = _bigNum,
        p,
        distance,
        label;

    for (p in labels) {
      distance = labels[p] - fromTime;

      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }

    return label;
  },
      _callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars,
        callback = v[type],
        params,
        scope;

    if (!callback) {
      return;
    }

    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    return params ? callback.apply(scope, params) : callback.call(scope);
  },
      _interrupt = function _interrupt(animation) {
    _removeFromParent(animation);

    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  },
      _quickTween,
      _createPlugin = function _createPlugin(config) {
    config = !config.name && config["default"] || config;

    var name = config.name,
        isFunc = _isFunction(config),
        Plugin = name && !isFunc && config.init ? function () {
      this._props = [];
    } : config,
        instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    },
        statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };

    _wake();

    if (config !== Plugin) {
      if (_plugins[name]) {
        return;
      }

      _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics));

      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics)));

      _plugins[Plugin.prop = name] = Plugin;

      if (config.targetTest) {
        _harnessPlugins.push(Plugin);

        _reservedProps[name] = 1;
      }

      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
    }

    _addGlobal(name, Plugin);

    config.register && config.register(gsap, Plugin, PropTween);
  },
      _255 = 255,
      _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  },
      _hue = function _hue(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
  },
      splitColor = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
        r,
        g,
        b,
        h,
        s,
        l,
        max,
        min,
        d,
        wasHSL;

    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }

      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length === 4) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b;
        }

        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);

        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= .5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }

      a = a.map(Number);
    }

    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }

      a[0] = ~~(h + .5);
      a[1] = ~~(s * 100 + .5);
      a[2] = ~~(l * 100 + .5);
    }

    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  },
      _colorOrderData = function _colorOrderData(v) {
    var values = [],
        c = [],
        i = -1;
    v.split(_colorExp).forEach(function (v) {
      var a = v.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  },
      _formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "",
        colors = (s + result).match(_colorExp),
        type = toHSL ? "hsla(" : "rgba(",
        i = 0,
        c,
        shell,
        d,
        l;

    if (!colors) {
      return s;
    }

    colors = colors.map(function (color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });

    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;

      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;

        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }

    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }

    return result + shell[l];
  },
      _colorExp = function () {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
        p;

    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }

    return new RegExp(s + ")", "gi");
  }(),
      _hslExp = /hsl[a]?\(/,
      _colorStringFilter = function _colorStringFilter(a) {
    var combined = a.join(" "),
        toHSL;
    _colorExp.lastIndex = 0;

    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  },
      _tickerActive,
      _ticker = function () {
    var _getTime = Date.now,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _startTime = _getTime(),
        _lastUpdate = _startTime,
        _gap = 1000 / 240,
        _nextTime = _gap,
        _listeners = [],
        _id,
        _req,
        _raf,
        _self,
        _delta,
        _i,
        _tick = function _tick(v) {
      var elapsed = _getTime() - _lastUpdate,
          manual = v === true,
          overlap,
          dispatch,
          time,
          frame;

      elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;

      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1000;
        _self.time = time = time / 1000;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }

      manual || (_id = _req(_tick));

      if (dispatch) {
        for (_i = 0; _i < _listeners.length; _i++) {
          _listeners[_i](time, _delta, frame, v);
        }
      }
    };

    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1000 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

            _raf = _win.requestAnimationFrame;
          }

          _id && _self.sleep();

          _req = _raf || function (f) {
            return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
          };

          _tickerActive = 1;

          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || 1 / _tinyNum;
        _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
      },
      fps: function fps(_fps) {
        _gap = 1000 / (_fps || 240);
        _nextTime = _self.time * 1000 + _gap;
      },
      add: function add(callback) {
        _listeners.indexOf(callback) < 0 && _listeners.push(callback);

        _wake();
      },
      remove: function remove(callback) {
        var i;
        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners
    };
    return _self;
  }(),
      _wake = function _wake() {
    return !_tickerActive && _ticker.wake();
  },
      _easeMap = {},
      _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
      _quotesExp = /["']/g,
      _parseObjectInString = function _parseObjectInString(value) {
    var obj = {},
        split = value.substr(1, value.length - 3).split(":"),
        key = split[0],
        i = 1,
        l = split.length,
        index,
        val,
        parsedVal;

    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }

    return obj;
  },
      _valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1,
        close = value.indexOf(")"),
        nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  },
      _configEaseFromString = function _configEaseFromString(name) {
    var split = (name + "").split("("),
        ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  },
      _invertEase = function _invertEase(ease) {
    return function (p) {
      return 1 - ease(1 - p);
    };
  },
      _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first,
        ease;

    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }

      child = child._next;
    }
  },
      _parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  },
      _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
      };
    }

    if (easeInOut === void 0) {
      easeInOut = function easeInOut(p) {
        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }

    var ease = {
      easeIn: easeIn,
      easeOut: easeOut,
      easeInOut: easeInOut
    },
        lowercaseName;

    _forEachName(names, function (name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });

    return ease;
  },
      _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function (p) {
      return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
    };
  },
      _configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1,
        p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
        p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
        easeOut = function easeOut(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    p2 = _2PI / p2;

    ease.config = function (amplitude, period) {
      return _configElastic(type, amplitude, period);
    };

    return ease;
  },
      _configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }

    var easeOut = function easeOut(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    ease.config = function (overshoot) {
      return _configBack(type, overshoot);
    };

    return ease;
  };

  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
    var power = i < 5 ? i + 1 : i;

    _insertEase(name + ",Power" + (power - 1), i ? function (p) {
      return Math.pow(p, power);
    } : function (p) {
      return p;
    }, function (p) {
      return 1 - Math.pow(1 - p, power);
    }, function (p) {
      return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });

  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

  (function (n, c) {
    var n1 = 1 / c,
        n2 = 2 * n1,
        n3 = 2.5 * n1,
        easeOut = function easeOut(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
    };

    _insertEase("Bounce", function (p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);

  _insertEase("Expo", function (p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });

  _insertEase("Circ", function (p) {
    return -(_sqrt(1 - p * p) - 1);
  });

  _insertEase("Sine", function (p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });

  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }

      var p1 = 1 / steps,
          p2 = steps + (immediateStart ? 0 : 1),
          p3 = immediateStart ? 1 : 0,
          max = 1 - _tinyNum;
      return function (p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];

  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
    return _callbackNames += name + "," + name + "Params,";
  });

  var GSCache = function GSCache(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = function () {
    function Animation(vars, time) {
      var parent = vars.parent || _globalTimeline;
      this.vars = vars;
      this._delay = +vars.delay || 0;

      if (this._repeat = vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }

      this._ts = 1;

      _setDuration(this, +vars.duration, 1, 1);

      this.data = vars.data;
      _tickerActive || _ticker.wake();
      parent && _addToTimeline(parent, this, time || time === 0 ? time : parent._time, 1);
      vars.reversed && this.reverse();
      vars.paused && this.paused(true);
    }

    var _proto = Animation.prototype;

    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }

      return this._delay;
    };

    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };

    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }

      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };

    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();

      if (!arguments.length) {
        return this._tTime;
      }

      var parent = this._dp;

      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);

        while (parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }

          parent = parent.parent;
        }

        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }

      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);

        _lazySafeRender(this, _totalTime, suppressEvents);
      }

      return this;
    };

    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % this._dur || (value ? this._dur : 0), suppressEvents) : this._time;
    };

    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };

    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };

    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;

      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };

    _proto.timeScale = function timeScale(value) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }

      if (this._rts === value) {
        return this;
      }

      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      return _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
    };

    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }

      if (this._ps !== value) {
        this._ps = value;

        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();

          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && (this._tTime -= _tinyNum) && Math.abs(this._zTime) !== _tinyNum);
        }
      }

      return this;
    };

    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }

      return this._start;
    };

    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
    };

    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };

    _proto.globalTime = function globalTime(rawTime) {
      var animation = this,
          time = arguments.length ? rawTime : animation.rawTime();

      while (animation) {
        time = animation._start + time / (animation._ts || 1);
        animation = animation._dp;
      }

      return time;
    };

    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value;
        return _onUpdateTotalDuration(this);
      }

      return this._repeat;
    };

    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        this._rDelay = value;
        return _onUpdateTotalDuration(this);
      }

      return this._rDelay;
    };

    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }

      return this._yoyo;
    };

    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };

    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };

    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };

    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };

    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };

    _proto.resume = function resume() {
      return this.paused(false);
    };

    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }

      return this._rts < 0;
    };

    _proto.invalidate = function invalidate() {
      this._initted = 0;
      this._zTime = -_tinyNum;
      return this;
    };

    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp,
          start = this._start,
          rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };

    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;

      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }

        return this;
      }

      return vars[type];
    };

    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function (resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
            _resolve = function _resolve() {
          var _then = self.then;
          self.then = null;
          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };

        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };

    _proto.kill = function kill() {
      _interrupt(this);
    };

    return Animation;
  }();

  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });

  var Timeline = function (_Animation) {
    _inheritsLoose(Timeline, _Animation);

    function Timeline(vars, time) {
      var _this;

      if (vars === void 0) {
        vars = {};
      }

      _this = _Animation.call(this, vars, time) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _this.parent && _postAddChecks(_this.parent, _assertThisInitialized(_this));
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }

    var _proto2 = Timeline.prototype;

    _proto2.to = function to(targets, vars, position) {
      new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
      return this;
    };

    _proto2.from = function from(targets, vars, position) {
      new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
      return this;
    };

    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
      return this;
    };

    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };

    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
    };

    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };

    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._dirty ? this.totalDuration() : this._tDur,
          dur = this._dur,
          tTime = this !== _globalTimeline && totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
          crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
          time,
          child,
          next,
          iteration,
          cycleDuration,
          prevPaused,
          pauseTween,
          timeScale,
          prevStart,
          prevIteration,
          yoyo,
          isYoyo;

      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }

        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;

        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }

        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          time = _round(tTime % cycleDuration);

          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration);

          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }

          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1,
                doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : dur;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _round(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

            if (prevTime !== this._time || prevPaused !== !this._ts) {
              return this;
            }

            dur = this._dur;
            tDur = this._tDur;

            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -0.0001;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }

            this._lock = 0;

            if (!this._ts && !prevPaused) {
              return this;
            }

            _propagateYoyoEase(this, isYoyo);
          }
        }

        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }

        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;

        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
        }

        !prevTime && time && !suppressEvents && _callback(this, "onStart");

        if (time >= prevTime && totalTime >= 0) {
          child = this._first;

          while (child) {
            next = child._next;

            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }

            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;

          while (child) {
            next = child._prev;

            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }

            child = next;
          }
        }

        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

          if (this._ts) {
            this._start = prevStart;

            _setEnd(this);

            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
          (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto2.add = function add(child, position) {
      var _this2 = this;

      if (!_isNumber(position)) {
        position = _parsePosition(this, position);
      }

      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function (obj) {
            return _this2.add(obj, position);
          });
          return this;
        }

        if (_isString(child)) {
          return this.addLabel(child, position);
        }

        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }

      return this !== child ? _addToTimeline(this, child, position) : this;
    };

    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }

      if (tweens === void 0) {
        tweens = true;
      }

      if (timelines === void 0) {
        timelines = true;
      }

      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }

      var a = [],
          child = this._first;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }

        child = child._next;
      }

      return a;
    };

    _proto2.getById = function getById(id) {
      var animations = this.getChildren(1, 1, 1),
          i = animations.length;

      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };

    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }

      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }

      _removeLinkedListItem(this, child);

      if (child === this._recent) {
        this._recent = this._last;
      }

      return _uncache(this);
    };

    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }

      this._forcing = 1;

      if (!this._dp && this._ts) {
        this._start = _round(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }

      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

      this._forcing = 0;
      return this;
    };

    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };

    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };

    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };

    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);

      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }

        child = child._next;
      }
    };

    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive),
          i = tweens.length;

      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }

      return this;
    };

    _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
      var a = [],
          parsedTargets = toArray(targets),
          child = this._first,
          isGlobalTime = _isNumber(onlyActive),
          children;

      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }

        child = child._next;
      }

      return a;
    };

    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};

      var tl = this,
          endTime = _parsePosition(tl, position),
          _vars = vars,
          startAt = _vars.startAt,
          _onStart = _vars.onStart,
          onStartParams = _vars.onStartParams,
          tween = Tween.to(tl, _setDefaults(vars, {
        ease: "none",
        lazy: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          var duration = vars.duration || Math.abs((endTime - tl._time) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }));

      return tween;
    };

    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };

    _proto2.recent = function recent() {
      return this._recent;
    };

    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };

    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };

    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };

    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }

      var child = this._first,
          labels = this.labels,
          p;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }

        child = child._next;
      }

      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }

      return _uncache(this);
    };

    _proto2.invalidate = function invalidate() {
      var child = this._first;
      this._lock = 0;

      while (child) {
        child.invalidate();
        child = child._next;
      }

      return _Animation.prototype.invalidate.call(this);
    };

    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }

      var child = this._first,
          next;

      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }

      this._time = this._tTime = this._pTime = 0;
      includeLabels && (this.labels = {});
      return _uncache(this);
    };

    _proto2.totalDuration = function totalDuration(value) {
      var max = 0,
          self = this,
          child = self._last,
          prevStart = _bigNum,
          prev,
          start,
          parent;

      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }

      if (self._dirty) {
        parent = self.parent;

        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;

          if (start > prevStart && self._sort && child._ts && !self._lock) {
            self._lock = 1;
            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }

          if (start < 0 && child._ts) {
            max -= start;

            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }

            self.shiftChildren(-start, false, -1e999);
            prevStart = 0;
          }

          child._end > max && child._ts && (max = child._end);
          child = prev;
        }

        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

        self._dirty = 0;
      }

      return self._tDur;
    };

    Timeline.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

        _lastRenderedFrame = _ticker.frame;
      }

      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }

          child || _ticker.sleep();
        }
      }
    };

    return Timeline;
  }(Animation);

  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });

  var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
        index = 0,
        matchIndex = 0,
        result,
        startNums,
        color,
        endNum,
        chunk,
        startNum,
        hasRandom,
        a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";

    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }

    startNums = start.match(_complexStringNumExp) || [];

    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }

      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          s: startNum,
          c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;

    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }

    this._pt = pt;
    return pt;
  },
      _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop],
        parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
        setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
        pt;

    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }

      if (end.charAt(1) === "=") {
        end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
      }
    }

    if (parsedStart !== end) {
      if (!isNaN(parsedStart * end)) {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }

      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  },
      _processVars = function _processVars(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }

    var copy = {},
        p;

    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }

    return copy;
  },
      _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;

    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;

        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }

    return plugin;
  },
      _overwritingTween,
      _initTween = function _initTween(tween, time) {
    var vars = tween.vars,
        ease = vars.ease,
        startAt = vars.startAt,
        immediateRender = vars.immediateRender,
        lazy = vars.lazy,
        onUpdate = vars.onUpdate,
        onUpdateParams = vars.onUpdateParams,
        callbackScope = vars.callbackScope,
        runBackwards = vars.runBackwards,
        yoyoEase = vars.yoyoEase,
        keyframes = vars.keyframes,
        autoRevert = vars.autoRevert,
        dur = tween._dur,
        prevStartAt = tween._startAt,
        targets = tween._targets,
        parent = tween.parent,
        fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
        autoOverwrite = tween._overwrite === "auto",
        tl = tween.timeline,
        cleanVars,
        i,
        p,
        pt,
        target,
        hasPriority,
        gsData,
        harness,
        plugin,
        ptLookup,
        index,
        harnessVars,
        overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }

    if (!tl) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      prevStartAt && prevStartAt.render(-1, true).kill();

      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent: parent,
          immediateRender: true,
          lazy: _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate,
          onUpdateParams: onUpdateParams,
          callbackScope: callbackScope,
          stagger: 0
        }, startAt)));

        if (immediateRender) {
          if (time > 0) {
            autoRevert || (tween._startAt = 0);
          } else if (dur && !(time < 0 && prevStartAt)) {
            time && (tween._zTime = time);
            return;
          }
        }
      } else if (runBackwards && dur) {
        if (prevStartAt) {
          !autoRevert && (tween._startAt = 0);
        } else {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            lazy: immediateRender && _isNotFalse(lazy),
            immediateRender: immediateRender,
            stagger: 0,
            parent: parent
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);

          _removeFromParent(tween._startAt = Tween.set(targets, p));

          if (!immediateRender) {
            _initTween(tween._startAt, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }

      tween._pt = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;

      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);

        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

          plugin._props.forEach(function (name) {
            ptLookup[name] = pt;
          });

          plugin.priority && (hasPriority = 1);
        }

        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }

        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;

          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(0));

          overwritten = !tween.parent;
          _overwritingTween = 0;
        }

        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }

      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }

    tween._from = !tl && !!vars.runBackwards;
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
  },
      _addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0,
        propertyAliases = harness && harness.aliases,
        copy,
        p,
        i,
        aliases;

    if (!propertyAliases) {
      return vars;
    }

    copy = _merge({}, vars);

    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;

        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }

    return copy;
  },
      _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  },
      _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
      _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");

  var Tween = function (_Animation2) {
    _inheritsLoose(Tween, _Animation2);

    function Tween(targets, vars, time, skipInherit) {
      var _this3;

      if (typeof vars === "number") {
        time.duration = vars;
        vars = time;
        time = null;
      }

      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars), time) || this;
      var _this3$vars = _this3.vars,
          duration = _this3$vars.duration,
          delay = _this3$vars.delay,
          immediateRender = _this3$vars.immediateRender,
          stagger = _this3$vars.stagger,
          overwrite = _this3$vars.overwrite,
          keyframes = _this3$vars.keyframes,
          defaults = _this3$vars.defaults,
          scrollTrigger = _this3$vars.scrollTrigger,
          yoyoEase = _this3$vars.yoyoEase,
          parent = _this3.parent,
          parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
          tl,
          i,
          copy,
          l,
          p,
          curTarget,
          staggerFunc,
          staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;

      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults || {}
        });
        tl.kill();
        tl.parent = _assertThisInitialized(_this3);

        if (keyframes) {
          _setDefaults(tl.vars.defaults, {
            ease: "none"
          });

          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
        } else {
          l = parsedTargets.length;
          staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }

          for (i = 0; i < l; i++) {
            copy = {};

            for (p in vars) {
              if (_staggerPropsToSkip.indexOf(p) < 0) {
                copy[p] = vars[p];
              }
            }

            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }

            tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
          }

          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        }

        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }

      if (overwrite === true) {
        _overwritingTween = _assertThisInitialized(_this3);

        _globalTimeline.killTweensOf(parsedTargets);

        _overwritingTween = 0;
      }

      parent && _postAddChecks(parent, _assertThisInitialized(_this3));

      if (immediateRender || !duration && !keyframes && _this3._start === _round(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;

        _this3.render(Math.max(0, -delay));
      }

      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }

    var _proto3 = Tween.prototype;

    _proto3.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._tDur,
          dur = this._dur,
          tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
          time,
          pt,
          iteration,
          cycleDuration,
          prevIteration,
          isYoyo,
          ratio,
          timeline,
          yoyoEase;

      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || this._startAt && this._zTime < 0 !== totalTime < 0) {
        time = tTime;
        timeline = this.timeline;

        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          time = _round(tTime % cycleDuration);

          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          isYoyo = this._yoyo && iteration & 1;

          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);

          if (time === prevTime && !force && this._initted) {
            return this;
          }

          if (iteration !== prevIteration) {
            timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo);

            if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
              this._lock = force = 1;
              this.render(_round(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }

        if (!this._initted) {
          if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
            this._tTime = 0;
            return this;
          }

          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._tTime = tTime;
        this._time = time;

        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }

        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }

        time && !prevTime && !suppressEvents && _callback(this, "onStart");
        pt = this._pt;

        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }

        timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

        if (this._onUpdate && !suppressEvents) {
          totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force);

          _callback(this, "onUpdate");
        }

        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto3.targets = function targets() {
      return this._targets;
    };

    _proto3.invalidate = function invalidate() {
      this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate();
      return _Animation2.prototype.invalidate.call(this);
    };

    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }

      if (!targets && (!vars || vars === "all")) {
        this._lazy = 0;

        if (this.parent) {
          return _interrupt(this);
        }
      }

      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }

      var parsedTargets = this._targets,
          killingTargets = targets ? toArray(targets) : parsedTargets,
          propTweenLookup = this._ptLookup,
          firstPT = this._pt,
          overwrittenProps,
          curLookup,
          curOverwriteProps,
          props,
          p,
          pt,
          i;

      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }

      overwrittenProps = this._op = this._op || [];

      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};

          _forEachName(vars, function (name) {
            return p[name] = 1;
          });

          vars = p;
        }

        vars = _addAliasesToVars(parsedTargets, vars);
      }

      i = parsedTargets.length;

      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];

          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }

          for (p in props) {
            pt = curLookup && curLookup[p];

            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }

              delete curLookup[p];
            }

            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }

      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };

    Tween.to = function to(targets, vars) {
      return new Tween(targets, vars, arguments[2]);
    };

    Tween.from = function from(targets, vars) {
      return new Tween(targets, _parseVars(arguments, 1));
    };

    Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay: delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };

    Tween.fromTo = function fromTo(targets, fromVars, toVars) {
      return new Tween(targets, _parseVars(arguments, 2));
    };

    Tween.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween(targets, vars);
    };

    Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };

    return Tween;
  }(Animation);

  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });

  _forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
    Tween[name] = function () {
      var tl = new Timeline(),
          params = _slice.call(arguments, 0);

      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });

  var _setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
  },
      _setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
  },
      _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
  },
      _setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
  },
      _getSetter = function _getSetter(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  },
      _renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000, data);
  },
      _renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  },
      _renderComplexString = function _renderComplexString(ratio, data) {
    var pt = data._pt,
        s = "";

    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s;
        pt = pt._next;
      }

      s += data.c;
    }

    data.set(data.t, data.p, s, data);
  },
      _renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  },
      _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt,
        next;

    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  },
      _killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt,
        hasNonDependentRemaining,
        next;

    while (pt) {
      next = pt._next;

      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }

      pt = next;
    }

    return !hasNonDependentRemaining;
  },
      _setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  },
      _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt,
        next,
        pt2,
        first,
        last;

    while (pt) {
      next = pt._next;
      pt2 = first;

      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }

      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }

      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }

      pt = next;
    }

    parent._pt = first;
  };

  var PropTween = function () {
    function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;

      if (next) {
        next._prev = this;
      }
    }

    var _proto4 = PropTween.prototype;

    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };

    return PropTween;
  }();

  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
    return _reservedProps[name] = 1;
  });

  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.forEach(function (config) {
        return _createPlugin(config);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);

      var getter = _getCache(target || {}).get,
          format = unit ? _passThrough : _numericIfPossible;

      unit === "native" && (unit = "");
      return !target ? target : !property ? function (property, unit, uncache) {
        return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);

      if (target.length > 1) {
        var setters = target.map(function (t) {
          return gsap.quickSetter(t, property, unit);
        }),
            l = setters.length;
        return function (value) {
          var i = l;

          while (i--) {
            setters[i](value);
          }
        };
      }

      target = target[0] || {};

      var Plugin = _plugins[property],
          cache = _getCache(target),
          p = cache.harness && (cache.harness.aliases || {})[property] || property,
          setter = Plugin ? function (value) {
        var p = new Plugin();
        _quickTween._pt = 0;
        p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p.render(1, p);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);

      return Plugin ? setter : function (value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref) {
      var name = _ref.name,
          effect = _ref.effect,
          plugins = _ref.plugins,
          defaults = _ref.defaults,
          extendTimeline = _ref.extendTimeline;
      (plugins || "").split(",").forEach(function (pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });

      _effects[name] = function (targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
      };

      if (extendTimeline) {
        Timeline.prototype[name] = function (targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }

      var tl = new Timeline(vars),
          child,
          next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

      _globalTimeline.remove(tl);

      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;

      while (child) {
        next = child._next;

        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }

        child = next;
      }

      _addToTimeline(_globalTimeline, tl, 0);

      return tl;
    },
    utils: {
      wrap: wrap,
      wrapYoyo: wrapYoyo,
      distribute: distribute,
      random: random,
      snap: snap,
      normalize: normalize,
      getUnit: getUnit,
      clamp: clamp,
      splitColor: splitColor,
      toArray: toArray,
      mapRange: mapRange,
      pipe: pipe,
      unitize: unitize,
      interpolate: interpolate,
      shuffle: shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween: PropTween,
      globals: _addGlobal,
      Tween: Tween,
      Timeline: Timeline,
      Animation: Animation,
      getCache: _getCache,
      _removeLinkedListItem: _removeLinkedListItem
    }
  };

  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
    return _gsap[name] = Tween[name];
  });

  _ticker.add(Timeline.updateRoot);

  _quickTween = _gsap.to({}, {
    duration: 0
  });

  var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;

    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }

    return pt;
  },
      _addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets,
        p,
        i,
        pt;

    for (p in modifiers) {
      i = targets.length;

      while (i--) {
        pt = tween._ptLookup[i][p];

        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }

          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  },
      _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
      name: name,
      rawVars: 1,
      init: function init(target, vars, tween) {
        tween._onInit = function (tween) {
          var temp, p;

          if (_isString(vars)) {
            temp = {};

            _forEachName(vars, function (name) {
              return temp[name] = 1;
            });

            vars = temp;
          }

          if (modifier) {
            temp = {};

            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }

            vars = temp;
          }

          _addModifiers(tween, vars);
        };
      }
    };
  };

  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt;

      for (p in vars) {
        pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
        pt && (pt.op = p);

        this._props.push(p);
      }
    }
  }, {
    name: "endArray",
    init: function init(target, value) {
      var i = value.length;

      while (i--) {
        this.add(target, i, target[i] || 0, value[i]);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.5.1";
  _coreReady = 1;

  if (_windowExists()) {
    _wake();
  }

  var Power0 = _easeMap.Power0,
      Power1 = _easeMap.Power1,
      Power2 = _easeMap.Power2,
      Power3 = _easeMap.Power3,
      Power4 = _easeMap.Power4,
      Linear = _easeMap.Linear,
      Quad = _easeMap.Quad,
      Cubic = _easeMap.Cubic,
      Quart = _easeMap.Quart,
      Quint = _easeMap.Quint,
      Strong = _easeMap.Strong,
      Elastic = _easeMap.Elastic,
      Back = _easeMap.Back,
      SteppedEase = _easeMap.SteppedEase,
      Bounce = _easeMap.Bounce,
      Sine = _easeMap.Sine,
      Expo = _easeMap.Expo,
      Circ = _easeMap.Circ;

  var _win$1,
      _doc$1,
      _docElement,
      _pluginInitted,
      _tempDiv,
      _tempDivStyler,
      _recentSetterPlugin,
      _windowExists$1 = function _windowExists() {
    return typeof window !== "undefined";
  },
      _transformProps = {},
      _RAD2DEG = 180 / Math.PI,
      _DEG2RAD = Math.PI / 180,
      _atan2 = Math.atan2,
      _bigNum$1 = 1e8,
      _capsExp = /([A-Z])/g,
      _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
      _complexExp = /[\s,\(]\S/,
      _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
      _renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
  },
      _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
  },
      _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  },
      _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  },
      _setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
  },
      _setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
  },
      _setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
  },
      _setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  },
      _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  },
      _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  },
      _transformProp = "transform",
      _transformOriginProp = _transformProp + "Origin",
      _supports3D,
      _createElement = function _createElement(type, ns) {
    var e = _doc$1.createElementNS ? _doc$1.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$1.createElement(type);
    return e.style ? e : _doc$1.createElement(type);
  },
      _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || "";
  },
      _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
      _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || _tempDiv,
        s = e.style,
        i = 5;

    if (property in s && !preferPrefix) {
      return property;
    }

    property = property.charAt(0).toUpperCase() + property.substr(1);

    while (i-- && !(_prefixes[i] + property in s)) {}

    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  },
      _initCore = function _initCore() {
    if (_windowExists$1() && window.document) {
      _win$1 = window;
      _doc$1 = _win$1.document;
      _docElement = _doc$1.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _pluginInitted = 1;
    }
  },
      _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;

    _docElement.appendChild(svg);

    svg.appendChild(this);
    this.style.display = "block";

    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox;
        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }

    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }

    _docElement.removeChild(svg);

    this.style.cssText = oldCSS;
    return bbox;
  },
      _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;

    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  },
      _getBBox = function _getBBox(target) {
    var bounds;

    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }

    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  },
      _isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
      _removeProperty = function _removeProperty(target, property) {
    if (property) {
      var style = target.style;

      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }

      if (style.removeProperty) {
        if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }

        style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  },
      _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;

    plugin._props.push(property);

    return pt;
  },
      _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  },
      _convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0,
        curUnit = (value + "").trim().substr((curValue + "").length) || "px",
        style = _tempDiv.style,
        horizontal = _horizontalExp.test(property),
        isRootSVG = target.tagName.toLowerCase() === "svg",
        measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
        amount = 100,
        toPixels = unit === "px",
        toPercent = unit === "%",
        px,
        parent,
        cache,
        isSVG;

    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }

    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);

    if (toPercent && (_transformProps[property] || ~property.indexOf("adius"))) {
      return _round(curValue / (isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty]) * amount);
    }

    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }

    if (!parent || parent === _doc$1 || !parent.appendChild) {
      parent = _doc$1.body;
    }

    cache = parent._gsap;

    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
      return _round(curValue / cache.width * amount);
    } else {
      (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static");
      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";

      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }

    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  },
      _get = function _get(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();

    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];

      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }

    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];

      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }

    return unit && !~(value + "").indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  },
      _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1),
          s = p && _getComputedProperty(target, p, 1);

      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }

    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
        index = 0,
        matchIndex = 0,
        a,
        result,
        startValues,
        startNum,
        color,
        startValue,
        endValue,
        endNum,
        chunk,
        endUnit,
        startUnit,
        relative,
        endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";

    if (end === "auto") {
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      target.style[prop] = start;
    }

    a = [start, end];

    _colorStringFilter(a);

    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];

    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);

        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }

        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

          if (relative) {
            endValue = endValue.substr(2);
          }

          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;

          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;

            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }

          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }

          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            s: startNum,
            c: relative ? relative * endNum : endNum - startNum,
            m: color && color < 4 ? Math.round : 0
          };
        }
      }

      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }

    if (_relExp.test(end)) {
      pt.e = 0;
    }

    this._pt = pt;
    return pt;
  },
      _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
      _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "),
        x = split[0],
        y = split[1] || "50%";

    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }

    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  },
      _renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t,
          style = target.style,
          props = data.u,
          cache = target._gsap,
          prop,
          clearTransforms,
          i;

      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;

        while (--i > -1) {
          prop = props[i];

          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }

          _removeProperty(target, prop);
        }
      }

      if (clearTransforms) {
        _removeProperty(target, _transformProp);

        if (cache) {
          cache.svg && target.removeAttribute("transform");

          _parseTransform(target, 1);

          cache.uncache = 1;
        }
      }
    }
  },
      _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;

        plugin._props.push(property);

        return 1;
      }
    }
  },
      _identity2DMatrix = [1, 0, 0, 1, 0, 0],
      _rotationalProperties = {},
      _isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  },
      _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = _getComputedProperty(target, _transformProp);

    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  },
      _getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || _getCache(target),
        style = target.style,
        matrix = _getComputedTransformMatrixAsArray(target),
        parent,
        nextSibling,
        temp,
        addedToDOM;

    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;

      if (!parent || !target.offsetParent) {
        addedToDOM = 1;
        nextSibling = target.nextSibling;

        _docElement.appendChild(target);
      }

      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");

      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }

    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  },
      _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap,
        matrix = matrixArray || _getMatrix(target, true),
        xOriginOld = cache.xOrigin || 0,
        yOriginOld = cache.yOrigin || 0,
        xOffsetOld = cache.xOffset || 0,
        yOffsetOld = cache.yOffset || 0,
        a = matrix[0],
        b = matrix[1],
        c = matrix[2],
        d = matrix[3],
        tx = matrix[4],
        ty = matrix[5],
        originSplit = origin.split(" "),
        xOrigin = parseFloat(originSplit[0]) || 0,
        yOrigin = parseFloat(originSplit[1]) || 0,
        bounds,
        determinant,
        x,
        y;

    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }

    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }

    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";

    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }

    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  },
      _parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new GSCache(target);

    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }

    var style = target.style,
        invertedScaleX = cache.scaleX < 0,
        px = "px",
        deg = "deg",
        origin = _getComputedProperty(target, _transformOriginProp) || "0",
        x,
        y,
        z,
        scaleX,
        scaleY,
        rotation,
        rotationX,
        rotationY,
        skewX,
        skewY,
        perspective,
        xOrigin,
        yOrigin,
        matrix,
        angle,
        cos,
        sin,
        a,
        b,
        c,
        d,
        a12,
        a22,
        t1,
        t2,
        t3,
        a13,
        a23,
        a33,
        a42,
        a43,
        a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    matrix = _getMatrix(target, cache.svg);

    if (cache.svg) {
      t1 = !cache.uncache && target.getAttribute("data-svg-origin");

      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }

    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;

    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];

      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.cos(skewX * _DEG2RAD));

        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }

        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        }

        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }

        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }

        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }

      if (cache.svg) {
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }

    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }

    cache.x = ((cache.xPercent = x && Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0) ? 0 : x) + px;
    cache.y = ((cache.yPercent = y && Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0) ? 0 : y) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;

    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }

    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  },
      _firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  },
      _addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  },
      _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;

    _renderCSSTransforms(ratio, cache);
  },
      _zeroDeg = "0deg",
      _zeroPx = "0px",
      _endParenthesis = ") ",
      _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this,
        xPercent = _ref.xPercent,
        yPercent = _ref.yPercent,
        x = _ref.x,
        y = _ref.y,
        z = _ref.z,
        rotation = _ref.rotation,
        rotationY = _ref.rotationY,
        rotationX = _ref.rotationX,
        skewX = _ref.skewX,
        skewY = _ref.skewY,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        transformPerspective = _ref.transformPerspective,
        force3D = _ref.force3D,
        target = _ref.target,
        zOrigin = _ref.zOrigin,
        transforms = "",
        use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;

    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD,
          a13 = Math.sin(angle),
          a33 = Math.cos(angle),
          cos;

      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }

    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }

    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }

    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }

    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }

    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }

    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }

    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }

    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }

    target.style[_transformProp] = transforms || "translate(0, 0)";
  },
      _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this,
        xPercent = _ref2.xPercent,
        yPercent = _ref2.yPercent,
        x = _ref2.x,
        y = _ref2.y,
        rotation = _ref2.rotation,
        skewX = _ref2.skewX,
        skewY = _ref2.skewY,
        scaleX = _ref2.scaleX,
        scaleY = _ref2.scaleY,
        target = _ref2.target,
        xOrigin = _ref2.xOrigin,
        yOrigin = _ref2.yOrigin,
        xOffset = _ref2.xOffset,
        yOffset = _ref2.yOffset,
        forceCSS = _ref2.forceCSS,
        tx = parseFloat(x),
        ty = parseFloat(y),
        a11,
        a21,
        a12,
        a22,
        temp;

    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);

    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }

    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;

      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;

        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }

      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }

    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }

    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }

    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }

    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);

    if (forceCSS) {
      target.style[_transformProp] = temp;
    }
  },
      _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
    var cap = 360,
        isString = _isString(endValue),
        endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
        change = relative ? endNum * relative : endNum - startNum,
        finalValue = startNum + change + "deg",
        direction,
        pt;

    if (isString) {
      direction = endValue.split("_")[1];

      if (direction === "short") {
        change %= cap;

        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }

      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum$1) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum$1) % cap - ~~(change / cap) * cap;
      }
    }

    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";

    plugin._props.push(property);

    return pt;
  },
      _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    var style = _tempDivStyler.style,
        startCache = target._gsap,
        exclude = "perspective,force3D,transformOrigin,svgOrigin",
        endCache,
        p,
        startValue,
        endValue,
        startNum,
        endNum,
        startUnit,
        endUnit;
    style.cssText = getComputedStyle(target).cssText + ";position:absolute;display:block;";
    style[_transformProp] = transforms;

    _doc$1.body.appendChild(_tempDivStyler);

    endCache = _parseTransform(_tempDivStyler, 1);

    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];

      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, startCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;

        plugin._props.push(p);
      }
    }

    _doc$1.body.removeChild(_tempDivStyler);
  };

  _forEachName("padding,margin,Width,Radius", function (name, index) {
    var t = "Top",
        r = "Right",
        b = "Bottom",
        l = "Left",
        props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
      return index < 2 ? name + side : "border" + side + name;
    });

    _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
      var a, vars;

      if (arguments.length < 4) {
        a = props.map(function (prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }

      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function (prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });

  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init(target, vars, tween, index, targets) {
      var props = this._props,
          style = target.style,
          startValue,
          endValue,
          endNum,
          startNum,
          type,
          specialProp,
          p,
          startUnit,
          endUnit,
          relative,
          isTransformRelated,
          transformPropTween,
          cache,
          smooth,
          hasPriority;
      _pluginInitted || _initCore();

      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }

        endValue = vars[p];

        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }

        type = typeof endValue;
        specialProp = _specialProps[p];

        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }

        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }

        if (specialProp) {
          if (specialProp(this, target, p, endValue, tween)) {
            hasPriority = 1;
          }
        } else if (p.substr(0, 2) === "--") {
          this.add(style, "setProperty", getComputedStyle(target).getPropertyValue(p) + "", endValue + "", index, targets, 0, 0, p);
        } else if (type !== "undefined") {
          startValue = _get(target, p);
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

          if (relative) {
            endValue = endValue.substr(2);
          }

          endNum = parseFloat(endValue);

          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }

              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }

            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }

          isTransformRelated = p in _transformProps;

          if (isTransformRelated) {
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform || _parseTransform(target);
              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
              transformPropTween.dep = 1;
            }

            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, relative ? relative * endNum : endNum - cache.scaleY);
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              endValue = _convertKeywordsToPercentages(endValue);

              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }

              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);

              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);

              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }

          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, endUnit === "px" && vars.autoRound !== false && !isTransformRelated ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;

            if (startUnit !== endUnit) {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, target[p], endValue, index, targets);
            } else {
              _missingPlugin(p, endValue);

              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, endValue);
          }

          props.push(p);
        }
      }

      hasPriority && _sortPropTweensByPriority(this);
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty: _removeProperty,
      _getMatrix: _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;

  (function (positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
      _transformProps[name] = 1;
    });

    _forEachName(rotation, function (name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });

    _propertyAliases[all[13]] = positionAndScale + "," + rotation;

    _forEachName(aliases, function (name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
    _config.units[name] = "px";
  });

  gsap.registerPlugin(CSSPlugin);

  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
      TweenMaxWithCSS = gsapWithCSS.core.Tween;

  exports.Back = Back;
  exports.Bounce = Bounce;
  exports.CSSPlugin = CSSPlugin;
  exports.Circ = Circ;
  exports.Cubic = Cubic;
  exports.Elastic = Elastic;
  exports.Expo = Expo;
  exports.Linear = Linear;
  exports.Power0 = Power0;
  exports.Power1 = Power1;
  exports.Power2 = Power2;
  exports.Power3 = Power3;
  exports.Power4 = Power4;
  exports.Quad = Quad;
  exports.Quart = Quart;
  exports.Quint = Quint;
  exports.Sine = Sine;
  exports.SteppedEase = SteppedEase;
  exports.Strong = Strong;
  exports.TimelineLite = Timeline;
  exports.TimelineMax = Timeline;
  exports.TweenLite = Tween;
  exports.TweenMax = TweenMaxWithCSS;
  exports.default = gsapWithCSS;
  exports.gsap = gsapWithCSS;

  if (typeof(window) === 'undefined' || window !== exports) {Object.defineProperty(exports, '__esModule', { value: true });} else {delete window.default;}

})));

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Splitting = factory());
}(this, (function () { 'use strict';

var root = document;
var createText = root.createTextNode.bind(root);

/**
 * # setProperty
 * Apply a CSS var
 * @param el{HTMLElement} 
 * @param varName {string} 
 * @param value {string|number}  
 */
function setProperty(el, varName, value) {
    el.style.setProperty(varName, value);
} 

/**
 * 
 * @param {Node} el 
 * @param {Node} child 
 */
function appendChild(el, child) {
  return el.appendChild(child);
}

function createElement(parent, key, text, whitespace) {
  var el = root.createElement('span');
  key && (el.className = key); 
  if (text) { 
      !whitespace && el.setAttribute("data-" + key, text);
      el.textContent = text; 
  }
  return (parent && appendChild(parent, el)) || el;
}

function getData(el, key) {
  return el.getAttribute("data-" + key)
}

/**
 * 
 * @param e {import('../types').Target} 
 * @param parent {HTMLElement}
 * @returns {HTMLElement[]}
 */
function $(e, parent) {
    return !e || e.length == 0
        ? // null or empty string returns empty array
          []
        : e.nodeName
            ? // a single element is wrapped in an array
              [e]
            : // selector and NodeList are converted to Element[]
              [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e));
}

/**
 * Creates and fills an array with the value provided
 * @template {T}
 * @param {number} len
 * @param {() => T} valueProvider
 * @return {T}
 */
function Array2D(len) {
    var a = [];
    for (; len--; ) {
        a[len] = [];
    }
    return a;
}

function each(items, fn) {
    items && items.some(fn);
}

function selectFrom(obj) {
    return function (key) {
        return obj[key];
    }
}

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param element {HTMLElement}
 * @param key {string}
 * @param items {HTMLElement[] | HTMLElement[][]}
 */
function index(element, key, items) {
    var prefix = '--' + key;
    var cssVar = prefix + "-index";

    each(items, function (items, i) {
        if (Array.isArray(items)) {
            each(items, function(item) {
                setProperty(item, cssVar, i);
            });
        } else {
            setProperty(items, cssVar, i);
        }
    });

    setProperty(element, prefix + "-total", items.length);
}

/**
 * @type {Record<string, import('./types').ISplittingPlugin>}
 */
var plugins = {};

/**
 * @param by {string}
 * @param parent {string}
 * @param deps {string[]}
 * @return {string[]}
 */
function resolvePlugins(by, parent, deps) {
    // skip if already visited this dependency
    var index = deps.indexOf(by);
    if (index == -1) {
        // if new to dependency array, add to the beginning
        deps.unshift(by);

        // recursively call this function for all dependencies
        each(plugins[by].depends, function(p) {
            resolvePlugins(p, by, deps);
        });
    } else {
        // if this dependency was added already move to the left of
        // the parent dependency so it gets loaded in order
        var indexOfParent = deps.indexOf(parent);
        deps.splice(index, 1);
        deps.splice(indexOfParent, 0, by);
    }
    return deps;
}

/**
 * Internal utility for creating plugins... essentially to reduce
 * the size of the library
 * @param {string} by 
 * @param {string} key 
 * @param {string[]} depends 
 * @param {Function} split 
 * @returns {import('./types').ISplittingPlugin}
 */
function createPlugin(by, depends, key, split) {
    return {
        by: by,
        depends: depends,
        key: key,
        split: split
    }
}

/**
 *
 * @param by {string}
 * @returns {import('./types').ISplittingPlugin[]}
 */
function resolve(by) {
    return resolvePlugins(by, 0, []).map(selectFrom(plugins));
}

/**
 * Adds a new plugin to splitting
 * @param opts {import('./types').ISplittingPlugin}
 */
function add(opts) {
    plugins[opts.by] = opts;
}

/**
 * # Splitting.split
 * Split an element's textContent into individual elements
 * @param el {Node} Element to split
 * @param key {string}
 * @param splitOn {string}
 * @param includeSpace {boolean}
 * @returns {HTMLElement[]}
 */
function splitText(el, key, splitOn, includePrevious, preserveWhitespace) {
    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    var elements = [];
    var F = document.createDocumentFragment();

    if (includePrevious) {
        elements.push(el.previousSibling);
    }

    var allElements = [];
    $(el.childNodes).some(function(next) {
        if (next.tagName && !next.hasChildNodes()) {
            // keep elements without child nodes (no text and no children)
            allElements.push(next);
            return;
        }
        // Recursively run through child nodes
        if (next.childNodes && next.childNodes.length) {
            allElements.push(next);
            elements.push.apply(elements, splitText(next, key, splitOn, includePrevious, preserveWhitespace));
            return;
        }

        // Get the text to split, trimming out the whitespace
        /** @type {string} */
        var wholeText = next.wholeText || '';
        var contents = wholeText.trim();

        // If there's no text left after trimming whitespace, continue the loop
        if (contents.length) {
            // insert leading space if there was one
            if (wholeText[0] === ' ') {
                allElements.push(createText(' '));
            }
            // Concatenate the split text children back into the full array
            each(contents.split(splitOn), function(splitText, i) {
                if (i && preserveWhitespace) {
                    allElements.push(createElement(F, "whitespace", " ", preserveWhitespace));
                }
                var splitEl = createElement(F, key, splitText);
                elements.push(splitEl);
                allElements.push(splitEl);
            }); 
            // insert trailing space if there was one
            if (wholeText[wholeText.length - 1] === ' ') {
                allElements.push(createText(' '));
            }
        }
    });

    each(allElements, function(el) {
        appendChild(F, el);
    });

    // Clear out the existing element
    el.innerHTML = "";
    appendChild(el, F);
    return elements;
}

/** an empty value */
var _ = 0;

function copy(dest, src) {
    for (var k in src) {
        dest[k] = src[k];
    }
    return dest;
}

var WORDS = 'words';

var wordPlugin = createPlugin(
    /*by: */ WORDS,
    /*depends: */ _,
    /*key: */ 'word', 
    /*split: */ function(el) {
        return splitText(el, 'word', /\s+/, 0, 1)
    }
);

var CHARS = "chars";

var charPlugin = createPlugin(
    /*by: */ CHARS,
    /*depends: */ [WORDS],
    /*key: */ "char", 
    /*split: */ function(el, options, ctx) {
        var results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
        });

        return results;
    }
);

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
function Splitting (opts) {
  opts = opts || {};
  var key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = el['🍌'];  
    if (!opts.force && ctx) {
      return ctx;
    }

    ctx = el['🍌'] = { el: el };
    var items = resolve(opts.by || getData(el, 'splitting') || CHARS);
    var opts2 = copy({}, opts);
    each(items, function(plugin) {
      if (plugin.split) {
        var pluginBy = plugin.by;
        var key2 = (key ? '-' + key : '') + plugin.key;
        var results = plugin.split(el, opts2, ctx);
        key2 && index(el, key2, results);
        ctx[pluginBy] = results;
        el.classList.add(pluginBy);
      } 
    });

    el.classList.add('splitting');
    return ctx;
  })
}

/**
 * # Splitting.html
 * 
 * @param opts {import('./types').ISplittingOptions}
 */
function html(opts) {
  opts = opts || {};
  var parent = opts.target =  createElement();
  parent.innerHTML = opts.content;
  Splitting(opts);
  return parent.outerHTML
}

Splitting.html = html;
Splitting.add = add;

function detectGrid(el, options, side) {
    var items = $(options.matching || el.children, el);
    var c = {};

    each(items, function(w) {
        var val = Math.round(w[side]);
        (c[val] || (c[val] = [])).push(w);
    });

    return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
}

function byNumber(a, b) {
    return a - b;
}

var linePlugin = createPlugin(
    /*by: */ 'lines',
    /*depends: */ [WORDS],
    /*key: */ 'line',
    /*split: */ function(el, options, ctx) {
      return detectGrid(el, { matching: ctx[WORDS] }, 'offsetTop')
    }
);

var itemPlugin = createPlugin(
    /*by: */ 'items',
    /*depends: */ _,
    /*key: */ 'item', 
    /*split: */ function(el, options) {
        return $(options.matching || el.children, el)
    }
);

var rowPlugin = createPlugin(
    /*by: */ 'rows',
    /*depends: */ _,
    /*key: */ 'row', 
    /*split: */ function(el, options) {
        return detectGrid(el, options, "offsetTop");
    }
);

var columnPlugin = createPlugin(
    /*by: */ 'cols',
    /*depends: */ _,
    /*key: */ "col", 
    /*split: */ function(el, options) {
        return detectGrid(el, options, "offsetLeft");
    }
);

var gridPlugin = createPlugin(
    /*by: */ 'grid',
    /*depends: */ ['rows', 'cols']
);

var LAYOUT = "layout";

var layoutPlugin = createPlugin(
    /*by: */ LAYOUT,
    /*depends: */ _,
    /*key: */ _,
    /*split: */ function(el, opts) {
        // detect and set options
        var rows =  opts.rows = +(opts.rows || getData(el, 'rows') || 1);
        var columns = opts.columns = +(opts.columns || getData(el, 'columns') || 1);

        // Seek out the first <img> if the value is true 
        opts.image = opts.image || getData(el, 'image') || el.currentSrc || el.src;
        if (opts.image) {
            var img = $("img", el)[0];
            opts.image = img && (img.currentSrc || img.src);
        }

        // add optional image to background
        if (opts.image) {
            setProperty(el, "background-image", "url(" + opts.image + ")");
        }

        var totalCells = rows * columns;
        var elements = [];

        var container = createElement(_, "cell-grid");
        while (totalCells--) {
            // Create a span
            var cell = createElement(container, "cell");
            createElement(cell, "cell-inner");
            elements.push(cell);
        }

        // Append elements back into the parent
        appendChild(el, container);

        return elements;
    }
);

var cellRowPlugin = createPlugin(
    /*by: */ "cellRows",
    /*depends: */ [LAYOUT],
    /*key: */ "row",
    /*split: */ function(el, opts, ctx) {
        var rowCount = opts.rows;
        var result = Array2D(rowCount);

        each(ctx[LAYOUT], function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell);
        });

        return result;
    }
);

var cellColumnPlugin = createPlugin(
    /*by: */ "cellColumns",
    /*depends: */ [LAYOUT],
    /*key: */ "col",
    /*split: */ function(el, opts, ctx) {
        var columnCount = opts.columns;
        var result = Array2D(columnCount);

        each(ctx[LAYOUT], function(cell, i) {
            result[i % columnCount].push(cell);
        });

        return result;
    }
);

var cellPlugin = createPlugin(
    /*by: */ "cells",
    /*depends: */ ['cellRows', 'cellColumns'],
    /*key: */ "cell", 
    /*split: */ function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx[LAYOUT];
    }
);

// install plugins
// word/char plugins
add(wordPlugin);
add(charPlugin);
add(linePlugin);
// grid plugins
add(itemPlugin);
add(rowPlugin);
add(columnPlugin);
add(gridPlugin);
// cell-layout plugins
add(layoutPlugin);
add(cellRowPlugin);
add(cellColumnPlugin);
add(cellPlugin);

return Splitting;

})));

/*!
 * CustomEase 3.6.0
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,function(e){"use strict";function m(e){return Math.round(1e5*e)/1e5||0}var b=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,w=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,Y=Math.PI/180,k=Math.sin,B=Math.cos,F=Math.abs,J=Math.sqrt;function arcToSegment(e,t,n,s,a,r,i,o,h){if(e!==o||t!==h){n=F(n),s=F(s);var u=a%360*Y,f=B(u),c=k(u),l=Math.PI,g=2*l,x=(e-o)/2,d=(t-h)/2,m=f*x+c*d,p=-c*x+f*d,y=m*m,M=p*p,v=y/(n*n)+M/(s*s);1<v&&(n=J(v)*n,s=J(v)*s);var C=n*n,E=s*s,b=(C*E-C*M-E*y)/(C*M+E*y);b<0&&(b=0);var w=(r===i?-1:1)*J(b),P=n*p/s*w,S=-s*m/n*w,N=f*P-c*S+(e+o)/2,D=c*P+f*S+(t+h)/2,T=(m-P)/n,V=(p-S)/s,_=(-m-P)/n,q=(-p-S)/s,A=T*T+V*V,R=(V<0?-1:1)*Math.acos(T/J(A)),G=(T*q-V*_<0?-1:1)*Math.acos((T*_+V*q)/J(A*(_*_+q*q)));isNaN(G)&&(G=l),!i&&0<G?G-=g:i&&G<0&&(G+=g),R%=g,G%=g;var L,O=Math.ceil(F(G)/(g/4)),j=[],z=G/O,I=4/3*k(z/2)/(1+B(z/2)),H=f*n,Q=c*n,Z=c*-s,U=f*s;for(L=0;L<O;L++)m=B(a=R+L*z),p=k(a),T=B(a+=z),V=k(a),j.push(m-I*p,p+I*m,T+I*V,V-I*T,T,V);for(L=0;L<j.length;L+=2)m=j[L],p=j[L+1],j[L]=m*H+p*Z+N,j[L+1]=m*Q+p*U+D;return j[L-2]=o,j[L-1]=h,j}}function stringToRawPath(e){function db(e,t,n,s){f=(n-e)/3,c=(s-t)/3,o.push(e+f,t+c,n-f,s-c,n,s)}var t,n,s,a,r,i,o,h,u,f,c,l,g,x,d,m=(e+"").replace(w,function(e){var t=+e;return t<1e-4&&-1e-4<t?0:t}).match(b)||[],p=[],y=0,M=0,v=m.length,C=0,E="ERROR: malformed path: "+e;if(!e||!isNaN(m[0])||isNaN(m[1]))return console.log(E),p;for(t=0;t<v;t++)if(g=r,isNaN(m[t])?i=(r=m[t].toUpperCase())!==m[t]:t--,s=+m[t+1],a=+m[t+2],i&&(s+=y,a+=M),t||(h=s,u=a),"M"===r)o&&(o.length<8?--p.length:C+=o.length),y=h=s,M=u=a,o=[s,a],p.push(o),t+=2,r="L";else if("C"===r)i||(y=M=0),(o=o||[0,0]).push(s,a,y+1*m[t+3],M+1*m[t+4],y+=1*m[t+5],M+=1*m[t+6]),t+=6;else if("S"===r)f=y,c=M,"C"!==g&&"S"!==g||(f+=y-o[o.length-4],c+=M-o[o.length-3]),i||(y=M=0),o.push(f,c,s,a,y+=1*m[t+3],M+=1*m[t+4]),t+=4;else if("Q"===r)f=y+2/3*(s-y),c=M+2/3*(a-M),i||(y=M=0),y+=1*m[t+3],M+=1*m[t+4],o.push(f,c,y+2/3*(s-y),M+2/3*(a-M),y,M),t+=4;else if("T"===r)f=y-o[o.length-4],c=M-o[o.length-3],o.push(y+f,M+c,s+2/3*(y+1.5*f-s),a+2/3*(M+1.5*c-a),y=s,M=a),t+=2;else if("H"===r)db(y,M,y=s,M),t+=1;else if("V"===r)db(y,M,y,M=s+(i?M-y:0)),t+=1;else if("L"===r||"Z"===r)"Z"===r&&(s=h,a=u,o.closed=!0),("L"===r||.5<F(y-s)||.5<F(M-a))&&(db(y,M,s,a),"L"===r&&(t+=2)),y=s,M=a;else if("A"===r){if(x=m[t+4],d=m[t+5],f=m[t+6],c=m[t+7],n=7,1<x.length&&(x.length<3?(c=f,f=d,n--):(c=d,f=x.substr(2),n-=2),d=x.charAt(1),x=x.charAt(0)),l=arcToSegment(y,M,+m[t+1],+m[t+2],+m[t+3],+x,+d,(i?y:0)+1*f,(i?M:0)+1*c),t+=n,l)for(n=0;n<l.length;n++)o.push(l[n]);y=o[o.length-2],M=o[o.length-1]}else console.log(E);return(t=o.length)<6?(p.pop(),t=0):o[0]===o[t-2]&&o[1]===o[t-1]&&(o.closed=!0),p.totalPoints=C+t,p}function p(){return M||"undefined"!=typeof window&&(M=window.gsap)&&M.registerPlugin&&M}function q(){(M=p())?(M.registerEase("_CE",n.create),a=1):console.warn("Please gsap.registerPlugin(CustomEase)")}function s(e){return~~(1e3*e+(e<0?-.5:.5))/1e3}function x(e,t,n,s,a,r,i,o,h,u,f){var c,l=(e+n)/2,g=(t+s)/2,d=(n+a)/2,m=(s+r)/2,p=(a+i)/2,y=(r+o)/2,M=(l+d)/2,v=(g+m)/2,C=(d+p)/2,E=(m+y)/2,b=(M+C)/2,w=(v+E)/2,P=i-e,S=o-t,N=Math.abs((n-i)*S-(s-o)*P),D=Math.abs((a-i)*S-(r-o)*P);return u||(u=[{x:e,y:t},{x:i,y:o}],f=1),u.splice(f||u.length-1,0,{x:b,y:w}),h*(P*P+S*S)<(N+D)*(N+D)&&(c=u.length,x(e,t,l,g,M,v,b,w,h,u,f),x(b,w,C,E,p,y,i,o,h,u,f+1+(u.length-c))),u}var M,a,t,y=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,v=/[cLlsSaAhHvVtTqQ]/g,n=((t=CustomEase.prototype).setData=function setData(e,t){t=t||{};var n,s,a,r,i,o,h,u,f,c=(e=e||"0,0,1,1").match(y),l=1,g=[],d=[],m=t.precision||1,p=m<=1;if(this.data=e,(v.test(e)||~e.indexOf("M")&&e.indexOf("C")<0)&&(c=stringToRawPath(e)[0]),4===(n=c.length))c.unshift(0,0),c.push(1,1),n=8;else if((n-2)%6)throw"Invalid CustomEase";for(0==+c[0]&&1==+c[n-2]||function _normalize(e,t,n){n||0===n||(n=Math.max(+e[e.length-1],+e[1]));var s,a=-1*e[0],r=-n,i=e.length,o=1/(+e[i-2]+a),h=-t||(Math.abs(e[i-1]-e[1])<.01*(e[i-2]-e[0])?function _findMinimum(e){var t,n=e.length,s=1e20;for(t=1;t<n;t+=6)+e[t]<s&&(s=+e[t]);return s}(e)+r:+e[i-1]+r);for(h=h?1/h:-o,s=0;s<i;s+=2)e[s]=(+e[s]+a)*o,e[s+1]=(+e[s+1]+r)*h}(c,t.height,t.originY),this.segment=c,r=2;r<n;r+=6)s={x:+c[r-2],y:+c[r-1]},a={x:+c[r+4],y:+c[r+5]},g.push(s,a),x(s.x,s.y,+c[r],+c[r+1],+c[r+2],+c[r+3],a.x,a.y,1/(2e5*m),g,g.length-1);for(n=g.length,r=0;r<n;r++)h=g[r],u=g[r-1]||h,(h.x>u.x||u.y!==h.y&&u.x===h.x||h===u)&&h.x<=1?(u.cx=h.x-u.x,u.cy=h.y-u.y,u.n=h,u.nx=h.x,p&&1<r&&2<Math.abs(u.cy/u.cx-g[r-2].cy/g[r-2].cx)&&(p=0),u.cx<l&&(u.cx?l=u.cx:(u.cx=.001,r===n-1&&(u.x-=.001,l=Math.min(l,.001),p=0)))):(g.splice(r--,1),n--);if(i=1/(n=1/l+1|0),h=g[o=0],p){for(r=0;r<n;r++)f=r*i,h.nx<f&&(h=g[++o]),s=h.y+(f-h.x)/h.cx*h.cy,d[r]={x:f,cx:i,y:s,cy:0,nx:9},r&&(d[r-1].cy=s-d[r-1].y);d[n-1].cy=g[g.length-1].y-s}else{for(r=0;r<n;r++)h.nx<r*i&&(h=g[++o]),d[r]=h;o<g.length-1&&(d[r-1]=g[g.length-2])}return this.ease=function(e){var t=d[e*n|0]||d[n-1];return t.nx<e&&(t=t.n),t.y+(e-t.x)/t.cx*t.cy},(this.ease.custom=this).id&&M.registerEase(this.id,this.ease),this},t.getSVGData=function getSVGData(e){return CustomEase.getSVGData(this,e)},CustomEase.create=function create(e,t,n){return new CustomEase(e,t,n).ease},CustomEase.register=function register(e){M=e,q()},CustomEase.get=function get(e){return M.parseEase(e)},CustomEase.getSVGData=function getSVGData(e,t){var n,a,r,i,o,h,u,f,c,l,g=(t=t||{}).width||100,x=t.height||100,d=t.x||0,p=(t.y||0)+x,y=M.utils.toArray(t.path)[0];if(t.invert&&(x=-x,p=0),"string"==typeof e&&(e=M.parseEase(e)),e.custom&&(e=e.custom),e instanceof CustomEase)n=function rawPathToString(e){!function _isNumber(e){return"number"==typeof e}(e[0])||(e=[e]);var t,n,s,a,r="",i=e.length;for(n=0;n<i;n++){for(a=e[n],r+="M"+m(a[0])+","+m(a[1])+" C",t=a.length,s=2;s<t;s++)r+=m(a[s++])+","+m(a[s++])+" "+m(a[s++])+","+m(a[s++])+" "+m(a[s++])+","+m(a[s])+" ";a.closed&&(r+="z")}return r}(function transformRawPath(e,t,n,s,a,r,i){for(var o,h,u,f,c,l=e.length;-1<--l;)for(h=(o=e[l]).length,u=0;u<h;u+=2)f=o[u],c=o[u+1],o[u]=f*t+c*s+r,o[u+1]=f*n+c*a+i;return e._dirty=1,e}([e.segment],g,0,0,-x,d,p));else{for(n=[d,p],i=1/(u=Math.max(5,200*(t.precision||1))),f=5/(u+=2),c=s(d+i*g),a=((l=s(p+e(i)*-x))-p)/(c-d),r=2;r<u;r++)o=s(d+r*i*g),h=s(p+e(r*i)*-x),(Math.abs((h-l)/(o-c)-a)>f||r===u-1)&&(n.push(c,l),a=(h-l)/(o-c)),c=o,l=h;n="M"+n.join(",")}return y&&y.setAttribute("d",n),n},CustomEase);function CustomEase(e,t,n){a||q(),this.id=e,this.setData(t,n)}p()&&M.registerPlugin(n),n.version="3.6.0",e.CustomEase=n,e.default=n;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


//include '' from '';

//LET ME USE THE $ FOR JQUERY
window.$ = window.jQuery = jQuery;

//Ok, now let's get it.
console.log('YEEHAW! Welcome to bones.js');

//Init splitting js
let splitting = new Splitting(); 

//Run mobile check and if on mobile, add mobile class to HTML tag.
let mounted = false;
mobilecheck = () => {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

let mobileDetected = mobilecheck(); 

if(mobileDetected == true){
    $("html").addClass("mobile");
};

//Initialize lazyloading.
let blazy = new Blazy({
    offset: 1000
});

//Add device agent specific classes.
let deviceAgent = navigator.userAgent.toLowerCase();

if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
    $("html").addClass("ios");
    $("html").addClass("mobile");
}
if (navigator.userAgent.search("MSIE") >= 0) {
    $("html").addClass("ie");
}
else if (navigator.userAgent.search("Chrome") >= 0) {
    $("html").addClass("chrome");
}
else if (navigator.userAgent.search("Firefox") >= 0) {
    $("html").addClass("firefox");
}
else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    $("html").addClass("safari");
}
else if (navigator.userAgent.search("Opera") >= 0) {
    $("html").addClass("opera");
}

// Detect request animation frame
let scroll = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function(callback){ window.setTimeout(callback, 1000/60) };


// ANIMATION SCROLL HANDLER - request animation frame
let windowHeight = $(window).height();
let lastPosition = -1; // storing last scroll position which updates on throttled scroll listener - nothing takes place before it is changed
// let slideUps; I dont think we need this
let scrollArray = [];

function getScrollModules()
{
    scrollArray = []; // reset array
    scrollElems = $('[data-animation-effect]'); // find new modules

    // Setup array of elements and starting Y positions
    scrollElems.each(function(i)
    {
        let ele = $(scrollElems)[i];
        let height = $(ele).height();

        scrollArray.push({ // no longer looking for value every time on scroll
            ele: ele,
            startY: $(ele).offset().top,
            height: height,
            type: $(ele).attr('data-animation-effect'),
            trigger : $(ele).attr('data-animation-trigger'),
            breakpointHit : false
        });
    });
}

function animationWizard(timestamp)
{
    getScrollModules();

    /*
     * Easing Functions - inspired from http://gizma.com/easing/
     * only considering the t value for the range [0, 1] => [0, 1]
     */
    EasingFunctions = {
        // no easing, no acceleration
        linear: t => t,
        // accelerating from zero velocity
        easeInQuad: t => t*t,
        // decelerating to zero velocity
        easeOutQuad: t => t*(2-t),
        // acceleration until halfway, then deceleration
        easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
        // accelerating from zero velocity
        easeInCubic: t => t*t*t,
        // decelerating to zero velocity
        easeOutCubic: t => (--t)*t*t+1,
        // acceleration until halfway, then deceleration
        easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
        // accelerating from zero velocity
        easeInQuart: t => t*t*t*t,
        // decelerating to zero velocity
        easeOutQuart: t => 1-(--t)*t*t*t,
        // acceleration until halfway, then deceleration
        easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
        // accelerating from zero velocity
        easeInQuint: t => t*t*t*t*t,
        // decelerating to zero velocity
        easeOutQuint: t => 1+(--t)*t*t*t*t,
        // acceleration until halfway, then deceleration
        easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
    }

    function isElementInViewport(ele)
    {
        let offset = mobileDetected ? .35 : .35;
        let topViewport = window.pageYOffset;
        let bottomViewport = topViewport + windowHeight;
        let positionData = {inViewport: false, vertPosPercent: 0};
        let vertPosPercent = (bottomViewport - ele.startY) / (windowHeight * offset);
        let vertParallaxPercent = ((bottomViewport - ele.startY) / (windowHeight + ele.height));

        if(vertPosPercent < 0) vertPosPercent = 0;
        if(vertPosPercent > 1) vertPosPercent = 1;

        if(vertParallaxPercent < 0) vertParallaxPercent = 0;
        if(vertParallaxPercent > 1) vertParallaxPercent = 1;

        positionData.vertPosPercent = vertPosPercent;
        positionData.vertParallaxPercent = vertParallaxPercent;

        if(vertPosPercent >= 0 || vertPosPercent <= 1) positionData.inViewport = true;

        return positionData;
    }

    function elementHitBreakpoint(ele)
    {
        let topViewport = window.pageYOffset;
        let bottomViewport = topViewport + windowHeight;

        if($('body').hasClass('home')){
            return ((ele.startY - bottomViewport) < 0);
        } else {
            return ((ele.startY - (bottomViewport - (windowHeight * 0.1))) < 0);
        }
    }

    function loop()
    {
        // Avoid calculations if not needed
        if (lastPosition == window.pageYOffset && !$('body').hasClass('home')) // check position
        {
            //console.log('stop loop');
            scroll(loop);
            return false; // stops loop after firing once
        }

        lastPosition = window.pageYOffset; //update position

        // Loop through the elements so we can choose to animate or not
        for(let i = 0; i < scrollArray.length; i++)
        {
            let ele = scrollArray[i];
            let positionData = isElementInViewport(ele);
            let vertPosPercent = positionData.vertPosPercent;
            let vertParallaxPercent = positionData.vertParallaxPercent;
            let animationType = ele.trigger;
            let breakpointHit = ele.breakpointHit;

            if (animationType === 'breakpoint' && !breakpointHit) {
                let breakpoint = elementHitBreakpoint(ele);

                if (breakpoint) {
                    // Set breakpoint flag so we know this has animated already
                    ele.breakpointHit = true;
                    $(ele.ele).addClass('active');
                }
            } else if (animationType === 'scroll') {
                if(positionData.inViewport)
                {
                    let easedPercent = EasingFunctions.easeInOutQuad(vertPosPercent);
                    let easedParallaxPercent = EasingFunctions.easeOutQuad(vertParallaxPercent);

                    // All modules only fade in on mobile
                    if(mobileDetected)
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent
                        });

                        continue;
                    }

                    if(ele.type == 'parallax')
                    {
                        $(ele.ele).css({
                            transform: 'translateY(' + (50 - (50 * easedParallaxPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'lateralParallax')
                    {
                        $(ele.ele).css({
                            transform: 'translateX(' + (100 - (100 * easedParallaxPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'slideLeft')
                    {
                        $(ele.ele).css({
                            transform: 'translateX(-' + (0 + (25 * vertPosPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'slideRight')
                    {
                        $(ele.ele).css({
                            transform: 'translateX(' + (150 + (25 * vertPosPercent)) + '%)'
                        });
                    }

                    if(ele.type == 'moduleSlideUp')
                    {
                        $(ele.ele).css({
                            transform: 'scale('+ (.85 + (0.15 * vertPosPercent)) +')',
                            opacity: vertPosPercent
                        });
                    }

                    if(ele.type == 'splitSlideUp'){
                        let chars = $(ele.ele).find('.char');

                        for(let i = 0; i <= chars.length; i++){
                            setTimeout(function(){
                                $(chars[i]).css({
                                    transform: 'translate3d(0,' + (100 - (easedPercent * 100)) + '%, 0)'
                                });
                            }, 20 * i);
                        }
                    }

                    if(ele.type == 'moduleFadeIn')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent
                        });
                    }

                    if(ele.type == 'moduleSlideFromLeft')
                    {
                        let easedPercent = EasingFunctions.easeInQuad(vertPosPercent);
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d('+ (-100 + (easedPercent * 100)) +'%,0,0)'
                        })
                    }

                    if(ele.type == 'moduleSlideFromRight')
                    {
                        let easedPercent = EasingFunctions.easeInQuad(vertPosPercent);
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d('+ (100 - (easedPercent * 100)) +'%,0,0)'
                        })
                    }

                    if(ele.type == 'moduleSlideFromTop')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d(0,'+ (-100 + (easedPercent * 100)) +'%, 0)'
                        })
                    }

                    if(ele.type == 'moduleSlideFromBottom')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d(0,' + (100 - (easedPercent * 100)) + '%, 0)'
                        })
                    }

                    if(ele.type == 'moduleDriftUp')
                    {
                        $(ele.ele).css({
                            opacity: vertPosPercent,
                            transform: 'translate3d(0,' + (50 - (easedPercent * 50)) + '%, 0)'
                        })
                    }
                }
            }
        }

        scroll( loop );
    }

    // Call the loop for the first time
    loop();
};
let myHandler = scroll(animationWizard);

//HERO H1 ANIMATION CALL 
function animateHomeHeroHeader(){
    let heroHeader = $('.hero h1.title');
    heroHeader.css({'opacity' : '1'});

    if($(heroHeader).hasClass('breakpoint-animate')){
        let words = $(heroHeader).find('.word');

        // desktop
        if(window.innerWidth >= '768'){
            gsap.to('.primary-hero-curve', {duration: .8, opacity: 1, delay: 0, ease: "power4.inOut"}); 
            gsap.to('.home-hero .image-container', {duration: 1.5, opacity: 1, delay: .5, translateY: 0, ease: "expo.out"}); 

            setTimeout(function(){
                for(let i = 0; i <= words.length; i++){
                    setTimeout(function(){
                        let word = words[i];
                        $(word).addClass('active');
                    }, 80 * i); 
                }

                gsap.to('.home-hero .copy', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .btns-wrapper', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .logos.desktop', {duration: 1.2, opacity: 1, delay: .7, ease: "power4.inOut"});
                gsap.to('.home-hero .tag', {duration: .7, translateX: 0, delay: .7, ease: "power2.inOut"});
            }, 700);
        } else {
            gsap.to('.primary-hero-curve', {duration: .8, opacity: 1, delay: 0, ease: "pwer4.inOut"}); 
            gsap.to('.home-hero .image-container', {duration: 1.5, opacity: 1, delay: .5, translateY: 0, ease: "expo.out"});
                
            setTimeout(function(){
                for(let i = 0; i <= words.length; i++){
                    setTimeout(function(){
                        let word = words[i];
                        $(word).addClass('active');
                    }, 80 * i);
                }

                gsap.to('.home-hero .btn.mobile-waitlist', {duration: 1.2, opacity: 1, delay: .7, translateY: 0, ease: "power4.inOut"});
                gsap.to('.home-hero .logos.mobile', {duration: 1.2, opacity: 1, delay: .7, translateY: 0, ease: "power4.inOut"});
                gsap.to('.home-hero .copy', {duration: 1.2, opacity: 1, delay: .7, translateY: 0, ease: "power4.inOut"});
                gsap.to('.home-hero .tag', {duration: .7, translateX: 0, delay: .7, ease: "power2.inOut"});
            }, 700);
        }
    }
}

if($('.home-hero')){
    setTimeout(function(){
        animateHomeHeroHeader();
    }, 0);
}

//SECONDARY HERO ANIMATION CALLS
function animateSecondaryHero(){
    let heroHeader = $('.hero h1.secondary-title');
    heroHeader.css({'opacity' : '1'});
    
    if($(heroHeader).hasClass('breakpoint-animate')){
        let words = $(heroHeader).find('.word');

        for(let i = 0; i <= words.length; i++){
            setTimeout(function(){
                let word = words[i];
                $(word).addClass('active');
            }, 75 * i);
        }

        gsap.to('.secondary.hero p.subtitle', {duration: 1.2, opacity: 1, delay: .6, translateY: 0, ease: "expo.out"});
        gsap.to('.secondary.hero .share-bar-wrapper', {duration: 1.2, opacity: 1, delay: .6, translateY: 0, ease: "expo.out"});
    }
}

if($('.hero.secondary')){
    animateSecondaryHero();
}

//BLOG POST HERO ANIMATION CALL
function animateArticleHero(){
    let heroHeader = $('.hero h1');

    if($(heroHeader).hasClass('breakpoint-animate')){
        let words = $(heroHeader).find('.word');

        for(let i = 0; i <= words.length; i++){
            setTimeout(function(){
                let word = words[i];
                $(word).addClass('active');
            }, 75 * i);
        }

        gsap.to('.hero .share-bar-wrapper', {duration: 1.2, opacity: 1, delay: .6, translateY: 0, ease: "expo.out"});
        
        if($('.post-content .featured-img')){
            gsap.to('.featured-img', {duration: 1.2, opacity: 1, delay: .8, translateY: 0, ease: "expo.out"});
        }

        gsap.to('.post-content .copy', {duration: 1.2, opacity: 1, delay: 1, translateY: 0, ease: "expo.out"});
    }
}

if($('.hero.article').length){
    animateArticleHero();
}

//CHALLENGES SINGLE HERO ANIMATION 
function animateChallengesHero(){
    let heroHeader = $('.hero h1');

    if($(heroHeader).hasClass('breakpoint-animate')){
        let words = $(heroHeader).find('.word');

        for(let i = 0; i <= words.length; i++){
            setTimeout(function(){
                let word = words[i];
                $(word).addClass('active');
            }, 75 * i);
        }

        gsap.to('.hero .share-bar-wrapper', {duration: 1.2, opacity: 1, delay: .6, translateY: 0, ease: "expo.out"});
    }    
}

if($('.challenges-page .hero').length){
    animateChallengesHero();
}

//Navigational control.
navToggle = () => {
    $('#header').toggleClass('nav-active');
    $('.hamburger-control svg').toggleClass('active');
    $('#nav-pane').toggleClass('active');
    $('.nav').toggleClass('active');
    $('.hero-img').toggleClass('mobile-nav-active');
    $('.nav-drawer-asset').toggleClass('active');

    if($('.hamburger-control').attr('aria-expanded') == 'false'){
        $(".hamburger-control").attr("aria-expanded","true");
    } else {
        $(".hamburger-control").attr("aria-expanded","false");
    }

    if(!$('body').hasClass('mobile-nav-active')){
        $('body').toggleClass('mobile-nav-active');
    } else {
        setTimeout(function(){
            $('body').toggleClass('mobile-nav-active');
        }, 450);
    }
}

$('.mobile-controls').on('click', function(){
    navToggle();
});

navClose = () => {
    if($('#nav-pane').hasClass('active')){
        $('#header').removeClass('nav-active');
        $('.hamburger-control svg').toggleClass('active');
        $('#nav-pane').removeClass('active');
        $('.nav').removeClass('active');
        $('body').removeClass('mobile-nav-active');
        $('.hero-img').removeClass('mobile-nav-active');
        $(".hamburger-control").attr("aria-expanded","false");
    }
}


//Nav appears on scroll up.
let scrollThrottle = 250,
throttled = false,
lastScrollY = 0,
scrollDirection = 0,
ticking = false;

navScroll = () =>
{
let scrollY = (window.scrollY < 0) ? 0 : window.scrollY;
let diff = lastScrollY - scrollY;

scrollDirection = diff / Math.abs(diff);
lastScrollY = scrollY;

requestTick(scrollY);
}

requestTick = (scrollY) =>
{

if(!ticking)
{
    scroll(function(){navAnimate(scrollY), stickyLogo(scrollY)});

    ticking = true;
}
}

//STICKY LOGO ON SCROLL WITH BANNER

stickyLogo = (scrollY) =>
{
    if(document.getElementById('promo-banner')){
        let screenWidth = $(document).width();
        let bannerHeight = $('#promo-banner').outerHeight();

        if(screenWidth >= '992'){ 
            if(scrollY >= bannerHeight){
                    $('.sticky-logo').addClass('sticky');
            } else {
                $('.sticky-logo').removeClass('sticky');
            }
        }
    }
}

if(document.getElementById('promo-banner')){
    let screenWidth = $(document).width();

    if(screenWidth >= '992'){ 
        $('.sticky-logo').removeClass('sticky');
    }
}

navAnimate = (scrollY) =>
{
if(!$(document.body).hasClass('mobile-nav-active'))
{
    if(scrollY === 0)
    {
        if($('header').hasClass('scrollVisible'))
        {
            $('#header').removeClass('scrollVisible readyOut');
        }
    }
    else
    {
        if(scrollDirection > 0)
        {
            if(!$('#header').hasClass('scrollVisible'))
            {
                $('#header').removeClass('readyOut').addClass('readyIn');

                setTimeout(function()
                {
                    $('#header').addClass('scrollVisible');
                    $('#header').removeClass('readyIn');
                }, 0);
            }
        }
        else
        {
            if($('#header').hasClass('scrollVisible'))
            {
                $('#header').addClass('readyOut');

                setTimeout(function()
                {
                    $('#header').removeClass('scrollVisible'); 
                }, 300);
            }

        }
    }

    ticking = false;
}
}

window.addEventListener('scroll', navScroll, false);



//Scroll to top btn in footer.
if(document.getElementById('scroll-to-top-btn')){
    $('#scroll-to-top-btn').on('click', function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
}

//Barba page transition functions. 
verticalTransition = (data, dir) => {

    if(dir === 'up'){
        let tl = gsap.timeline({onComplete: () => {
            $(data.current.container).css({'opacity' : '0'});
        }});

        $('#footer').css({'opacity' : '0'});
        tl.to('#animation-pane-vertical', {duration: .8, scaleY: 1, transformOrigin: 'bottom', ease: Power2.easeInOut });
        tl.to('#animation-pane-asset', {duration: .2, opacity: 1, delay: 0, ease: Power2.easeIn});

    }

    if(dir === 'down'){
        let tl = gsap.timeline({onComplete: () => {
            $('#footer').css({'opacity' : '1'});
        }});

        //move pane to top of viewport
        tl.to('#animation-pane-asset', {duration: .2, opacity: 0, delay: 1, ease: Power2.easeIn});
        tl.to('#animation-pane-vertical', {duration: .4, scaleY: 0, transformOrigin: 'top', delay: .2, ease: Power2.easeInOut});
    }
}

//BLOG LOAD MORE
function blogLoadMore() {
    let pageCounter = 1;
    let button = $('#more_posts'),
        data = {
            'action': 'get_blog_posts', //defined in functions file, don't need to include wp_ajax part
            'pageCounter' : pageCounter
        };

    $.ajax({
        url : loadmore_params.ajaxurl, // AJAX handler
        data : data,
        dataType: 'json',
        type : 'POST',
        beforeSend : function ( xhr ) {
            $('#more_posts').addClass('active');
        },
        success : function( data ){
            if( data ) {
                let totalPosts = data.total;

                $('.grid.article .row').append(data.html);
                $('#more_posts').removeClass('active');

                let postCount = $('.card.article').length;

                if ( postCount == totalPosts ){
                    button.remove(); // if out of posts, remove the button
                }
            } else {
                button.remove();
            }
            pageCounter++;
        }
    });
}

//if we are on the blog grid page and button exists
if(document.getElementById('more_posts')){
    $('#more_posts').on('click', function(e){
        e.preventDefault();
        blogLoadMore();
    });
}


//FORM SUCCESS TRANSITION ANIMATION
function formSuccessTransition(){
    var tl = gsap.timeline();

    //slide pane up
    tl.to('#form-success-pane', {duration: .7, scaleY: 1, transformOrigin: 'bottom', ease: Power2.easeIn});
    //scroll up!
    $("html, body").animate({ scrollTop: 0 }, "slow");
    //fade in inner matter
    tl.to('#form-success-pane .inner h1', {duration: .5, opacity: 1, delay: .3, ease: Power2.easeIn});
    tl.to('#form-success-pane .inner .btn', {duration: .5, opacity: 1, ease: Power2.easeIn});
    tl.to('#form-success-pane .inner .logo', {duration: .5, opacity: 1, ease: Power2.easeIn});
}

// SCROLL TO ANCHOR FUNC
function scrollToAnchor(e){
    let scrollTo = $(e.target).attr('data-scrollTo');
    if(scrollTo){
        let scrollTarget = $(scrollTo);
        console.log(scrollTarget);
        let offsetTop = $(scrollTarget).offset().top;
        let adjustedOffset = offsetTop - 50;

        $("html, body").animate({ scrollTop: adjustedOffset }, 1000, 'linear');
    }
}


// WAITLIST MODAL FUNCTION
let headerBtn = $('#header .header-waitlist-btn');

$(headerBtn).on('click', function(e){
    e.preventDefault();
    let waitlist = document.getElementById('waitList');

    //if there is a form on this page scroll to it
    if(waitlist){
        scrollToAnchor(e);
    } else {
        $("#waitlistModal").modal();
    }
});

//NAV PANE MODAL FUNCTION 
let paneBtn = $('#nav-pane .pane-waitlist-btn')

$(paneBtn).on('click', function(e){
    let waitlist = document.getElementById('waitList');
    e.preventDefault();
    navClose();

    //if there is a form on this page scroll to it
    if(waitlist){
        scrollToAnchor(e);
    } else {
        $("#waitlistModal").modal();
    }
});

//HERO WAITLIST BTN FUNCTION
let heroBtn = $('.desktop-waitlist.btn');

$(heroBtn).on('click', function(e){
    let waitlist = document.getElementById('waitList');
    e.preventDefault();

    if(waitlist){
        scrollToAnchor(e);
    } else {
        $("#waitlistModal").modal();
    }
});


//
//
// FUNCTIONS THAT REQUIRE RE-INIT WITH BARBA
//
//

// FORM - CHANGE BODY TO SUCCESS MESSAGE ON SUCCESSFUL SUBMIT
class formSubmit {
    constructor() {
        if(document.formSubmitCallback){
            document.removeEventListener('wpcf7mailsent', document.formSubmitCallback);
        }

        if($(document.body).hasClass('page-id-224')){
            document.formSubmitCallback = this.formSubmit.bind(this);
            document.addEventListener('wpcf7mailsent', document.formSubmitCallback);
        }
    }

    formSubmit(){
        formSuccessTransition();
    }
}
new formSubmit;