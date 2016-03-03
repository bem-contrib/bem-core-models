({
    shouldDeps: [
        {
            block: 'functions',
            elems: ['throttle', 'debounce']
        },
        { elem: 'core' },
        {
            elem: 'field',
            mods: {
                type: [
                    'inner-events-storage',
                    'id',
                    'string',
                    'number',
                    'boolean',
                    'model',
                    'array',
                    'collection'
                ]
            }
        }
    ]
});
