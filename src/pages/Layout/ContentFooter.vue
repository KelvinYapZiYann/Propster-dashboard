<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <!-- <li class="nav-item">
          <a href="javascript:void(0)" class="nav-link">
            Creative Tim
          </a>
        </li> -->
        <li class="nav-item">
          <a href="https://propster.io/about-us" target="_blank" rel="noopener" class="nav-link">
            <i class="fas fa-address-card"></i> {{$t('footer.aboutUs')}}
          </a>
        </li>
        <li class="nav-item">
          <a href="https://propster.io/collaboration" target="_blank" rel="noopener" class="nav-link">
            <i class="fas fa-phone"></i> {{$t('footer.contactUs')}}
          </a>
        </li>
        <li class="nav-item">
          <a href="https://www.facebook.com/Propster.io" target="_blank" rel="noopener" class="nav-link">
            <i class="fab fa-facebook-f"></i> {{$t('footer.facebook')}}
          </a>
        </li>
      </ul>
      <copyright-ink></copyright-ink>
    </div>
  </footer>
</template>
<script>
import CopyrightInk from "@/components/CopyrightInk";
export default {
  components: {
    CopyrightInk
  }
};
</script>
<style></style>
