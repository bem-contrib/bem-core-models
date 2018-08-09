// the block replaces all the inner `i-model` blocks
// with the new one with all the collected `modelsParams`
block('i-model-aggregator').replace()(function() {
    this._modelAggregatorData = [];

    applyNext({ _modelAggregation: true });

    return {
        block: 'i-model',
        modelsParams: this._modelAggregatorData
    };
});
