import APIBase from './httpBase'

interface ConfirmResponse {
  success: boolean
  transactionId: number
  statusCode: number
  transactionStatus: string
  amount: number
  currency: string
  authorizationCode: string
  cardBrand: string
  credentials?: {
    email: string
    password: string
  }
}

class PayphoneService extends APIBase {
  async confirmPayment(id: number, clientTxId: string): Promise<ConfirmResponse> {
    const response = await this.post<ConfirmResponse>('payphone/confirm', {
      id,
      clientTxId,
    })
    return response.data
  }
}

export const payphoneService = new PayphoneService()
