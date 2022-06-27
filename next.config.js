const path = require("path");
const fs = require("fs");
const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "api.config.json"), "utf8")
);

module.exports = {
    env: {
        img_url: config.url,
        base_url: config.url,
        api_url: config.url + config.api_path,
        production: process.env.NODE_ENV === "production",
        is_nextjs: true,
    },
    images: {
        domains: [config.domain],
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            loader: "@svgr/webpack",
            options: {
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeViewBox: false,
                                },
                            },
                        },
                    ],
                },
                exclude: ["/node_modules/", "/src/stories"]
            },
        });

        // транспилируем react-hook-form, ибо он отдает себя как esm модуль
        config.module.rules.push({
            test: /react-hook-form[\/\\].*\.js|jsx$/,
            use: [options.defaultLoaders.babel],
        });
        return config;
    },
};
