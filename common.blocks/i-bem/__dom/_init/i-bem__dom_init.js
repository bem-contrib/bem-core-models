/**
 * @module i-bem__dom_init
 */

modules.define('i-bem__dom_init', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(
        /**
         * Initializes blocks on a fragment of the DOM tree
         * @exports
         * @param {jquery} [ctx=scope] Root DOM node
         * @returns {jquery} ctx Initialization context
         */
        function(ctx) {
            var nodes = $('.model');

            if (nodes.length) nodes.bem('model');

            return BEMDOM.init(ctx);
        });
});
