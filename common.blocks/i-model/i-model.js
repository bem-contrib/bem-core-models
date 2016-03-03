modules.define('i-model', ['i-bem__dom', 'model'], function(provide, BEMDOM, MODEL) {

/**
 * @class i-model
 */
provide(BEMDOM.decl('i-model', {

    onSetMod: {
        js: {
            inited: function() {
                var data = MODEL.modelsData,
                    modelsParams = this.params.data,
                    storeData = function storeData(modelParams) {
                        var modelData = data[modelParams.name] || (data[modelParams.name] = {});

                        modelData[MODEL.buildPath(modelParams)] = modelParams.data;
                    };

                if (Array.isArray(modelsParams)) {
                    modelsParams.forEach(storeData);
                } else {
                    storeData(modelsParams);
                }
            }
        }
    }

}))

});
