/**
 * @module i-bem__dom_init
 */

modules.define('i-bem__dom_init', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(
        /**
         * Initializes blocks on a fragment of the DOM tree
         * @exports
         * @param {jQuery} [ctx=scope] Root DOM node
         * @returns {jQuery} ctx Initialization context
         */
        function(ctx) {
            // var nodes = $('.i-model');
            //
            // console.log('before init');
            //
            // if (nodes.length) nodes.bem('i-model');
            //
            // console.log('after init');

            return BEMDOM.init(ctx);
        });
});
