<script setup lang="ts">
import NavHeader from '../components/NavHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import StorySection from '../components/StorySection.vue'
import SolutionGrid from '../components/SolutionGrid.vue'
import NumbersSection from '../components/NumbersSection.vue'
import RecipeGrid from '../components/RecipeGrid.vue'
import MythsSection from '../components/MythsSection.vue'
import AuthoritySection from '../components/AuthoritySection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import PricingSection from '../components/PricingSection.vue'
import FaqSection from '../components/FaqSection.vue'
import GuaranteeSection from '../components/GuaranteeSection.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<template>
  <div class="landing">
    <NavHeader />
    <main>
      <HeroSection />
      <StorySection />
      <SolutionGrid />
      <NumbersSection />
      <RecipeGrid />
      <AuthoritySection />
      <MythsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <GuaranteeSection />
    </main>
    <FooterSection />
  </div>
</template>

<style scoped lang="scss">
.landing {
  flex: 1;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
