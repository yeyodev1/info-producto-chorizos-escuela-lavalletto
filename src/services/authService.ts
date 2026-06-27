import APIBase from './httpBase'

interface LoginResponse {
  token: string
  user: {
    email: string
    transactionId: number
    clientTransactionId: string
  }
}

interface MeResponse {
  email: string
  transactionId: number
  clientTransactionId: string
}

interface PaymentItem {
  transactionId: number
  clientTransactionId: string
  amount: number
  currency: string
  transactionStatus: string
  date: string
}

interface ForgotPasswordResponse {
  message: string
}

interface ResetPasswordResponse {
  message: string
}

class AuthService extends APIBase {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>('auth/login', { email, password })
    return response.data
  }

  async me(): Promise<MeResponse> {
    const response = await this.get<MeResponse>('auth/me')
    return response.data
  }

  async getMyPayments(): Promise<PaymentItem[]> {
    const response = await this.get<PaymentItem[]>('auth/payments')
    return response.data
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const response = await this.post<ForgotPasswordResponse>('auth/forgot-password', { email })
    return response.data
  }

  async resetPassword(token: string, password: string): Promise<ResetPasswordResponse> {
    const response = await this.post<ResetPasswordResponse>('auth/reset-password', { token, password })
    return response.data
  }
}

export const authService = new AuthService()
