<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { usePayphone } from '../composables/usePayphone'

const props = defineProps<{
  amount: number
  amountWithoutTax: number
  title: string
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'payment-initiated', clientTxId: string): void
}>()

const { generateClientTransactionId, renderWidget } = usePayphone()

onMounted(() => {
  loadPayphoneSDK()
})

function loadPayphoneSDK() {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.css'
  document.head.appendChild(link)

  const script = document.createElement('script')
  script.src = 'https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.js'
  script.type = 'module'
  script.onload = () => {
    initWidget()
  }
  document.head.appendChild(script)
}

function initWidget() {
  if (!props.visible) return

  const clientTxId = generateClientTransactionId()
  emit('payment-initiated', clientTxId)

  renderWidget(
    'pp-button',
    props.amount,
    props.amountWithoutTax,
    clientTxId,
    props.title,
  )
}

watch(() => props.visible, (val) => {
  if (val) {
    setTimeout(initWidget, 300)
  }
})
</script>

<template>
  <div v-if="visible" class="payphone-checkout">
    <div id="pp-button"></div>
  </div>
</template>

<style scoped lang="scss">
.payphone-checkout {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}
</style>
