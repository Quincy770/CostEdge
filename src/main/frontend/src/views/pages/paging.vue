<template>
      <div id="dropdown">
        <vs-dropdown vs-custom-content vs-trigger-click>
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"><p>Page Limit</p></span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item>
              <span @click="pageLimit(15)">15</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="pageLimit(25)">25</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="pageLimit(50)">50</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="pageLimit(75)">75</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        </div>
</template>
<script>
import router from "@/router";
export default {
  props:{
      method:{type:Function}
  },
  data() {
    return {
      limit: 30,
    };
  },

  methods: {
    pageLimit: function(limit) {
      this.limit = limit;
    },
   
},
mounted(){
 this.method(this.limit);
}
}
</script>
<style  scoped>
#dropdown {
  width: 300px;
}
</style>