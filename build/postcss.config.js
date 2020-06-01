module.exports = {
    plugins: [
        require('autoprefixer')({
            'browsers': ['> 1%', 'last 4 versions', 'cover 99.5%']
        }),
        // require('mqpacker'),
        require('cssnano')({
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ]
};