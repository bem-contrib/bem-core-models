/**
 * @module i-bem-dom__init
 */

modules.define('i-bem-dom__init', ['i-bem-dom', 'jquery', 'bem-model'], function (provide, bemDom, $, BemModel) {

    provide(
        /**
         * Initializes blocks on a fragment of the DOM tree
         * @exports
         * @param {jQuery} [ctx=scope] Root DOM node
         * @returns {jQuery} ctx Initialization context
         */
        function (ctx) {
            var nodes = $('.model');

            if (nodes.length) nodes.bem(BemModel);

            return bemDom.init(ctx);
        });
});
