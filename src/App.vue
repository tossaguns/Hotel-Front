<template>
  <div id="app" class="itim-regular">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Itim&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@400;700&display=swap");

.itim-regular {
  font-family: "Itim", cursive;
  font-weight: 400;
  font-style: normal;
}

.prompt-regular {
  font-family: "Prompt", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
