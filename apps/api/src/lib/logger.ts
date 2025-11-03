/**
 * Logger estruturado
 * Substitui console.log/error por logging estruturado
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(context && { context })
    }

    return JSON.stringify(logEntry)
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const formatted = this.formatMessage(level, message, context)
    
    switch (level) {
      case 'error':
        console.error(formatted)
        break
      case 'warn':
        console.warn(formatted)
        break
      case 'debug':
        if (process.env.NODE_ENV === 'development') {
          console.debug(formatted)
        }
        break
      default:
        console.log(formatted)
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = error instanceof Error 
      ? { 
          ...context, 
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack
          }
        }
      : { ...context, error }

    this.log('error', typeof error === 'string' ? error : 'An error occurred', errorContext)
  }
}

export const logger = new Logger()

