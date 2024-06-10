<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj">
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>
        <div
          v-if="companyInfo.companyName"
          class="text-right leading-tight hidden sm:block shadow p-2 rounded-lg"
        >
          <p class="font-semibold">{{ companyInfo.companyName }}</p>
        </div>
        <vs-spacer></vs-spacer>
        <div class="the-navbar__user-meta flex items-center">
         
        </div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <feather-icon
            icon="BellIcon"
            class="cursor-pointer mt-0 sm:mr-6 mr-0"
            :badge="getUnreadNotifications.length"
          ></feather-icon>
          <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown">
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">{{ getUnreadNotifications.length }} New</h3>
              <p class="opacity-75"> Notifications</p>
            </div>

            <VuePerfectScrollbar
              ref="mainSidebarPs"
              class="scroll-area--nofications-dropdown p-0 mb-10"
              :settings="settings"
            >
        <ul class="bordered-items">
        <li v-for="ntf in getUnreadNotifications" :key="ntf.index" class="flex justify-between px-4 py-4 notification cursor-pointer">
              <div class="flex items-start" @click="onNotificationClicked(ntf)">
                <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>
                <div class="mx-2">
                  <span class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span>
                  <small>{{ ntf.msg }}</small>
                </div>
              </div>
              <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
        </li>
        </ul>
            </VuePerfectScrollbar>
            <div
              class="checkout-footer fixed bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
            >
              <span>View All Notifications</span>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>


        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <span class="cursor-pointer flex i18n-locale">
            <img
              class="h-4 w-5"
              :src="require(`@/assets/images/flags/${$i18n.locale}.png`)"
              :alt="$i18n.locale"
            />
            <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
          </span>
          <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
            <vs-dropdown-item @click="updateLocale('en')">
              <img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English
            </vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('am')">
              <img class="h-4 w-5 mr-1" src="@/assets/images/flags/am.png" alt="am" /> &nbsp;Amharic
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        <vs-dropdown vs-custom-content vs-trigger-hover class="cursor-pointer">
          <feather-icon
            icon="ShoppingCartIcon"
            class="cursor-pointer ml-4 mr-6 mt-1"
            :badge="cartItems.length"
          ></feather-icon>
          <vs-dropdown-menu
            class="cart-dropdown vx-navbar-dropdown"
            :class="{'dropdown-custom': cartItems.length}"
          >
            <template v-if="cartItems.length">
              <div class="notification-header text-center p-2 bg-primary text-white">
                <h3
                  class="text-white"
                  v-if="cartItems.length == 1"
                >{{ cartItems.length }} {{$t('Item')}}</h3>
                <h3 class="text-white" v-else>{{ cartItems.length }} {{$t('Items')}}</h3>
                <p class="opacity-75">{{$t('inYourCart')}}</p>
              </div>

              <VuePerfectScrollbar
                ref="mainSidebarPs"
                class="scroll-area--cart-items-dropdowm p-0 mb-10"
                :settings="settings"
              >
                <ul class="bordered-items">
                  <li
                    v-for="item in cartItems"
                    :key="item.inventoryId"
                    class="vx-row no-gutter cart-item cursor-pointer"
                  >
                    <div
                      class="vx-col w-1/5 item-img-container h-24 bg-white flex items-center justify-center"
                    >
                     
                      <img
                        v-if="item.inventoryImage"
                        :src="(`${$domain}/inventory-item-images/${item.inventoryImage}`)"
                        :alt="item.inventoryBrandName"
                        class="cart-dropdown-item-img p-4"
                      />
                      <img
                        v-if="!item.inventoryImage"
                        :src="require(`@/assets/images/inventory-item-images/no_image.png`)"
                        :alt="item.inventoryBrandName"
                        class="cart-dropdown-item-img p-4"
                      />
                    </div>

                    <div
                      class="vx-col w-4/5 pr-4 pl-2 py-4 flex flex-col justify-center"
                      @click="$router.push('/pages/orders/checkout')"
                    >
                      <span
                        class="font-medium block cart-item-title truncate"
                      >{{ item.inventoryGenericName }} {{item.dosageForm != null ? item.dosageForm : ""}} {{+item.strength != null ? item.strength : "" }}</span>
                      <small class="truncate mb-2">{{ item.description }}</small>
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium">
                          {{ item.quantity }}
                          <small>x</small>
                          {{ item.sellPrice }} Birr
                        </span>
                        <feather-icon
                          icon="XIcon"
                          svgClasses="h-4 w-4 cursor-pointer text-white"
                          class="hover:text-white bg-danger p-1 rounded-lg"
                          @click.stop="removeItemFromCart(item)"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </VuePerfectScrollbar>
              <div
                class="checkout-footer fixed bottom-0 rounded-b-lg text-primary font-semibold w-full p-2 text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
                @click="$router.push('/pages/orders/checkout')"
              >
                <span class="flex items-center justify-center">
                  <feather-icon icon="ShoppingCartIcon" svgClasses="h-4 w-4"></feather-icon>
                  <span class="ml-2">{{$t('Checkout')}}</span>
                </span>
              </div>
            </template>

            <template v-else>
              <p class="p-4">Your Cart Is Empty.</p>
            </template>
          </vs-dropdown-menu>
        </vs-dropdown>
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ profileInfo.firstName }} {{ profileInfo.lastName }}</p>
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3">
              <img
                v-if="profileInfo.profilePicture"
                key="localImg"
                :src="(`${$domain}/profiles/${profileInfo.profilePicture}`)"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
              <img
                v-if="!profileInfo.profilePicture"
                key="localImg"
                :src="require(`@/assets/images/profiles//CnDoEPXVInjLaSTWgvVYaYOrd0UJGz.png`)"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/pages/userProfile')"
                >
                  <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                  <span class="ml-2">Profile</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/pages/orders/wish-list')"
                >
                  <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
                  <span class="ml-2">Wish List</span>
                </li>

                <vs-divider class="m-1"></vs-divider>

                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                  <span class="ml-2">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import VxAutoSuggest from "@/components/vx-auto-suggest/VxAutoSuggest.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import draggable from "vuedraggable";
import { stringify } from "querystring";
import { eventBus } from "../../main";

import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      received_messages: [],
      allNotifications: [],
      profileInfo: [],
      companyInfo: [],
      companyId: "",
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: "",
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 1,
          title: "New Order Recieved",
          msg: "You got new order of goods.",
          icon: "PackageIcon",
          time: this.randomDate({ sec: 40 }),
          category: "success"
        },
        {
          index: 2,
          title: "New Order Recieved 2",
          msg: "You got new order of goods.",
          icon: "PackageIcon",
          time: this.randomDate({ sec: 40 }),
          category: "success"
        },
        {
          index: 3,
          title: "New Order Recieved 3",
          msg: "You got new order of goods.",
          icon: "PackageIcon",
          time: this.randomDate({ sec: 6006440 }),
          category: "success"
        },
      ],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false,
      userInfo: {}
    };
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown)
        this.showBookmarkPagesDropdown = false;
    }
  },
  updated() {
  },
  computed: {
    getUnreadNotifications(){
      return this.allNotifications.filter(notification=>!notification.seen).map(notification=>{
        notification.msg = notification.message;
        const sentDateTime = new Date(notification.sentDateTime);
        const sentDateTimeInSeconds = Math.floor(sentDateTime.getTime() / 1000);
        notification.icon = localStorage.getItem('userId')==="Finance"? "PackageIcon": "InfoIcon";
        notification.time = this.randomDate({ sec: (Date.now()/1000) - sentDateTimeInSeconds });
        notification.category = "success";
        return notification;
        });
    },
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    classObj() {
      if (this.sidebarWidth == "default") return "navbar-default";
      else if (this.sidebarWidth == "reduced") return "navbar-reduced";
      else if (this.sidebarWidth) return "navbar-full";
    },

    getCurrentLocaleData() {
      if (localStorage.getItem("locale") == null) {
        const locale = this.$i18n.locale;
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      } else {
        const locale = localStorage.getItem("locale");
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      }
    },

    data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    starredPages() {
      return this.$store.state.starredPages;
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10);
      },
      set(list) {
        this.$store.dispatch("arrangeStarredPagesLimited", list);
      }
    },
    starredPagesMore: {
      get() {
        return this.starredPages.slice(10);
      },
      set(list) {
        this.$store.dispatch("arrangeStarredPagesMore", list);
      }
    },

    
    cartItems() {
      return this.$store.state.eCommerce.cartItems.slice().reverse();
    }

  },
  methods: {
        send() {
            console.log("Send message:" + this.send_message);
            if (this.stompClient && this.stompClient.connected) {
              const msg = { name: "Ashu" };
              this.stompClient.send("/app/hello", JSON.stringify(msg), {});
            }
          },
          connect() {
            this.socket = new SockJS("http://localhost:8081/gs-guide-websocket");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
              {},
              frame => {
                this.connected = true;
                // this.send();
                console.log(frame);
                this.stompClient.subscribe("/topic/greetings", tick => {
                this.received_messages.push(JSON.parse(tick.body));  
                this.allNotifications = this.received_messages[0]
                });
              },
              error => {
                console.log(error);
                this.connected = false;
              }
            );
          },










    onNotificationClicked(notification) {
      this.markNotificationAsSeen(notification);
      this.$router.push({path: notification.detailLink});
    },
    updateLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
      this.$store.dispatch("locale/changeLocale", locale);
      // alert(this.$i18n.locale)
    },
    showSidebar() {
      this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
    },
    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch("updateStarredPage", {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? " sec ago" : "just now");
      }

      return "Just Now";
    },
    logout() {
      this.$store.dispatch("eCommerce/clearCart");
      this.$router.push("/pages/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.removeItem("userStatus");
      localStorage.removeItem("companyName");
      localStorage.removeItem("cartItems");
      this.$store.state.eCommerce.wishList.length = 0;
    },
    outside: function() {
      this.showBookmarkPagesDropdown = false;
    },

    // CART DROPDOWN
    removeItemFromCart(item) {
      this.$store.dispatch("eCommerce/toggleItemInCart", item);
      var cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const index = cartItems.findIndex(i => i.inventoryId == item.inventoryId);
      if (index < 0) {
        cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    },

    // Method for creating dummy notification time
    randomDate({ hr, min, sec }) {
      let date = new Date();

      if (hr) date.setHours(date.getHours() - hr);
      if (min) date.setMinutes(date.getMinutes() - min);
      if (sec) date.setSeconds(date.getSeconds() - sec);

      return date;
    },
    getUserInfo() {
      var userId = localStorage.getItem("userId");
      this.$http.get(`/accounts/${userId}`).then(response => {
        this.profileInfo = response.data;
      });
    },
    markNotificationAsSeen(notification){
    this.$http.get(`/user-notifications/seen/${notification.userNotificationsId}`).then(response => {
      // this.fetchUserNotifications();
    }).catch(err=>{
    });
    },
    fetchUserNotifications() {
      var userId = localStorage.getItem("userId");
      setInterval(() => {
        this.$http.get(`/user-notifications/receiver/${userId}`).then(response => {
          this.allNotifications = response.data;
        }).catch(err=>{
        });
      }, 5000);
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  created() {
    this.connect();
    eventBus.$on("fireFetchUser", () => {
      this.getUserInfo();
    });
    const userId = localStorage.getItem("userId");
    const thisIns = this;
    this.$http
      .get("/accounts/" + userId)
      .then(function(response) {
        thisIns.profileInfo = response.data;
        thisIns.companyId = response.data.companyId;
        thisIns.userInfo = response.data;
        thisIns.$http
          .get("/company/" + thisIns.companyId)
          .then(function(response) {
            thisIns.companyInfo = response.data;
            localStorage.setItem(
              "companyName",
              thisIns.companyInfo.companyName
            );
            //console.log(thisIns.companyInfo);
          });
      })
      .catch(() => {
        // this.$router.push("/pages/login");
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('userId');
        this.$router.push("/pages/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
      });

    //  this.fetchUserNotifications();

  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable
  }
};
</script>
