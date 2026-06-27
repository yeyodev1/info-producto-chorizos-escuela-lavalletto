export function usePayphone() {
  const token = 'KtdM2NOf-tCfNaX7y7KIk4iGVDzNBUSgx_bUuSuEK0dKHFu2kW1UN1-OB4uO6Asm453IpI779mLKzC-FYRvLgwkt0bAv4KW6TYwDJu_r1Yb4V7wkjJ4IQyJwZlGA0MDqVcQatkxFJx-JUhSldDdqpvJyl04fmh_ws6IyZfW7Fb3CEXGVGUdTolC2Rzj_dUTb3hobD6zBNq9NzQKtJUarZQGDaSg7gHenqdr-OR82cxujz41T3yHehppiSambnETxgGaOQm97NrjyP4_NMPK3bVcWbm2_EyD6jHtBlTuKsdrs7m-M9iuqVY5X76Vr3-MzpzsCqsXa1bL4hTL8smq6yMrpT4c'
  const storeId = '6868f5f8-7e6e-4717-a859-fbfd685e8add'

  function generateClientTransactionId(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    return `TX-${timestamp}-${random}`
  }

  function renderWidget(
    containerId: string,
    amount: number,
    amountWithoutTax: number,
    clientTransactionId: string,
    reference: string,
  ) {
    const { PPaymentButtonBox } = window as unknown as Record<string, unknown>
    if (!PPaymentButtonBox) {
      console.error('Payphone SDK not loaded')
      return
    }

    const ppb = new (PPaymentButtonBox as new (config: Record<string, unknown>) => { render: (id: string) => void })({
      token,
      clientTransactionId,
      amount,
      amountWithoutTax,
      amountWithTax: 0,
      tax: 0,
      currency: 'USD',
      storeId,
      reference,
      lang: 'es',
      defaultMethod: 'card',
      timeZone: -5,
    })

    ppb.render(containerId)
  }

  return {
    token,
    storeId,
    generateClientTransactionId,
    renderWidget,
  }
}
