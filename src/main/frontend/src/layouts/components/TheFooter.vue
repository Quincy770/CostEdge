<template functional>
  <div>
    <footer class="mx-auto the-footer flex-wrap justify-between" :class="classes">
      <span class="md:flex hidden items-center"></span>
      <div class="vx-col mx-auto mt-4">
        <span id="footer">
          <a
            class="text-center"
            href=""
          >COPYRIGHT@2024 Cost Edge</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  }
};
</script>
<style scoped>
#footer {
  text-align: center;
}
</style>
