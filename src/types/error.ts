export interface HttpErrorType extends Error {
  status?: number
  code?: string
}

export class HttpError extends Error implements HttpErrorType {
  status?: number
  code?: string

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

interface NotFoundErrorType extends HttpErrorType {
  status: 404
}

interface ValidationErrorType extends HttpErrorType {
  status: 400
}

interface PayloadErrorType extends HttpErrorType {
  status: 422
}

interface InternalErrorType extends HttpErrorType {
  status: 500
}

interface AuthErrorType extends HttpErrorType {
  status: 401
}

export class NotFoundError extends HttpError implements NotFoundErrorType {
  status: 404

  constructor(message: string, code: string) {
    super(message, 404, code)
    this.status = 404
  }
}

export class ValidationError extends HttpError implements ValidationErrorType {
  status: 400

  constructor(message: string, code: string) {
    super(message, 400, code)
    this.status = 400
  }
}

export class PayloadError extends HttpError implements PayloadErrorType {
  status: 422

  constructor(message: string, code: string) {
    super(message, 422, code)
    this.status = 422
  }
}

export class InternalError extends HttpError implements InternalErrorType {
  status: 500

  constructor(message: string, code: string) {
    super(message, 500, code)
    this.status = 500
  }
}

export class AuthError extends HttpError implements AuthErrorType {
  status: 401

  constructor(message: string, code: string) {
    super(message, 401, code)
    this.status = 401
  }
}

export type AppError = { error: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAppError = (error: any): error is AppError => {
  return !!error && error.error !== undefined
}
