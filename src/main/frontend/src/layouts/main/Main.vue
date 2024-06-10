<template>
  <div class="layout--main" :class="[navbarClasses, footerClasses, { 'app-page': isAppPage }]">
    <the-customizer @updateNavbar="updateNavbar" @updateNavbarColor="updateNavbarColor" :navbarType="navbarType"
      :navbarColor="navbarColor" :footerType="footerType" @updateFooter="updateFooter"
      :routerTransition="routerTransition" @updateRouterTransition="updateRouterTransition" v-if="!disableCustomizer"
      :hideScrollToTop="hideScrollToTop" @toggleHideScrollToTop="toggleHideScrollToTop" />
    <vx-sidebar v-if="userType == 'Customer'" :sidebarItems="sidebarItemsForcustomerOnly"
      :logo="require('@/assets/images/logo/logo.png')" title="" parent=".layout--main" />
    <vx-sidebar v-if="userType == 'Logistics'" :sidebarItems="sidebarItemsForLogistics"
      :logo="require('@/assets/images/logo/logo.png')" title="" parent=".layout--main" />
    <vx-sidebar v-if="userType == 'Finance'" :sidebarItems="sidebarItemsForFinance"
      :logo="require('@/assets/images/logo/logo.png')" title="" parent=".layout--main" />
    <vx-sidebar v-if="userType == 'CustomerAdmin'" :sidebarItems="sidebarItemsForCustomerAdmin"
      :logo="require('@/assets/images/logo/logo.png')" title="" parent=".layout--main" />
    <vx-sidebar v-if="userType == 'CustomerSeller'" :sidebarItems="sidebarItemsForCustomerSeller"
      :logo="require('@/assets/images/logo/logo.png')" title="" parent=".layout--main" />
    <vx-sidebar v-if="userType == 'Admin'" :sidebarItems="sidebarItems || sidebarItemsForCustomerAdmin"
      :logo="require('@/assets/images/logo/logo.png')" title="" parent=".layout--main" />
    <div id="content-area" :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]">
      <div id="content-overlay"></div>
      <div class="content-wrapper">
        <the-navbar :navbarColor="navbarColor"
          :class="[{ 'text-white': isNavbarDark && !isThemeDark }, { 'text-base': !isNavbarDark && isThemeDark }]" />
        <div class="router-view">
          <div class="router-content" :class="{ 'mt-0': navbarType == 'hidden' }">
            <transition :name="routerTransition">
            </transition>
            <div class="content-area__content">
              <back-to-top bottom="5%" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg" />
              </back-to-top>
              <transition :name="routerTransition" mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle"></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import VxSidebar from '@/layouts/components/vx-sidebar/VxSidebar.vue';
import TheCustomizer from "../components/customizer/TheCustomizer.vue";
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '../components/TheFooter.vue';
import themeConfig from '@/../themeConfig.js';
import sidebarItems from "@/layouts/components/vx-sidebar/sidebarItems.js";
import sidebarItemsForcustomerOnly from "@/layouts/components/vx-sidebar/sidebarItemsForcustomerOnly.js";
import sidebarItemsForFinance from "@/layouts/components/vx-sidebar/sidebarItemsForFinance.js";
import sidebarItemsForLogistics from "@/layouts/components/vx-sidebar/sidebarItemsForLogistics.js";
import sidebarItemsForCustomerAdmin from "@/layouts/components/vx-sidebar/sidebarItemsForCustomerAdmin.js";
import sidebarItemsForCustomerSeller from "@/layouts/components/vx-sidebar/sidebarItemsForCustomerSeller.js";

import BackToTop from 'vue-backtotop'
const VxTour = () => import('@/components/VxTour.vue')
export default {
  data() {
    return {
      userType: "",
      navbarType: themeConfig.navbarType || 'floating',
      navbarColor: themeConfig.navbarColor || '#fff',
      footerType: themeConfig.footerType || 'static',
      routerTransition: themeConfig.routerTransition || 'none',
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      sidebarItems: sidebarItems,
      sidebarItemsForcustomerOnly: sidebarItemsForcustomerOnly,
      sidebarItemsForFinance: sidebarItemsForFinance,
      sidebarItemsForLogistics: sidebarItemsForLogistics,
      sidebarItemsForCustomerAdmin: sidebarItemsForCustomerAdmin,
      sidebarItemsForCustomerSeller: sidebarItemsForCustomerSeller,
      disableCustomizer: themeConfig.disableCustomizer,
      windowWidth: window.innerWidth, //width of windows
      hideScrollToTop: themeConfig.hideScrollToTop,
      disableThemeTour: themeConfig.disableThemeTour
    }
  },
  watch: {
    '$route'() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      if (this.navbarColor == "#fff" && val) {
        this.updateNavbarColor("#10163a")
      } else {
        this.updateNavbarColor("#fff")
      }
    },
  },
  computed: {
    isAppPage() {
      if (this.$route.path.includes('/apps/')) return true
      else return false
    },
    isThemeDark() { return this.$store.state.theme == 'dark' },
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if (this.sidebarWidth == "default") return "content-area-default"
      else if (this.sidebarWidth == "reduced") return "content-area-reduced"
      else if (this.sidebarWidth) return "content-area-full"
    },
    navbarClasses() {
      return {
        'navbar-hidden': this.navbarType == 'hidden',
        'navbar-sticky': this.navbarType == 'sticky',
        'navbar-static': this.navbarType == 'static',
        'navbar-floating': this.navbarType == 'floating',
      }
    },
    footerClasses() {
      return {
        'footer-hidden': this.footerType == 'hidden',
        'footer-sticky': this.footerType == 'sticky',
        'footer-static': this.footerType == 'static',
      }
    },
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      if (val == 'static') this.updateNavbarColor("#fff")
      this.navbarType = val;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == "#fff") this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    updateFooter(val) {
      this.footerType = val;
    },
    updateRouterTransition(val) {
      this.routerTransition = val;
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)
        this.$store.dispatch('updateSidebarWidth', 'no-sidebar')
        this.disableThemeTour = true;
      }
      else if (this.windowWidth < 1200) {
        this.$store.dispatch('updateSidebarWidth', 'reduced')
      }
      else {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true)
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val;
    }
  },
  components: {
    VxSidebar,
    TheNavbar,
    TheFooter,
    TheCustomizer,
    BackToTop,
    VxTour
  },
  created() {
    const userType = localStorage.getItem('userType');
    this.userType = userType;
    this.setSidebarWidth();
    if (this.navbarColor == "#fff" && this.isThemeDark) {
      this.updateNavbarColor("#10163a")
    } else {
      this.updateNavbarColor(this.navbarColor)
    }

  }
}
</script>
