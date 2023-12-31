import {
    LeveledLogMethod,
    Logger,
    addColors,
    createLogger,
    format,
    transports,
} from 'winston'

const config = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    colors: {
        error: 'bold red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'grey',
    },
}

addColors(config.colors)

export const logger = createLogger({
    // minimal level that will be recorded
    level: 'silly',
    levels: config.levels,
    format: format.combine(
        format.label({ label: '[ErasmusConnect]' }),
        format.splat(),
        format.json(),
        format.timestamp({
            format: 'YYYY-mm-dd HH:mm:ss',
        })
    ),
    transports: [
        // new transports.File({
        //     level: 'error',
        //     filename: 'logs/live-chat-error.log',
        //     format: format.combine(
        //         format.timestamp({
        //             format: 'HH:mm:ss',
        //         })
        //     ),
        // }),
        new transports.Console({
            format: format.combine(
                format((info) => ({
                    ...info,
                    level: info.level.toUpperCase(),
                }))(),
                format.colorize({ all: true }),
                format.simple(),
                format.printf(
                    (info) =>
                        `${('[' + info.level + ']').padEnd(25, ' ')} ${
                            info.message
                        }`
                )
            ),
        }),
    ],
}) as Logger & Record<keyof (typeof config)['levels'], LeveledLogMethod>
