({
    mustDeps: [
        {
            block: 'i-bem-dom'
        }
    ],
    shouldDeps: [
        'lodash',
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
                    'models-list',
                    'collection'
                ]
            }
        }
    ]
});
