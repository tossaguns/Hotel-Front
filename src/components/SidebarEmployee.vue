<template>
    <div
    @click="$emit('navigate', to, keyName)"
    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-gray-600 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
    :class="[
      activeMenu === keyName ? 'bg-gray-800 text-white drop-shadow-lg' : '',
      isCollapsed ? 'justify-center' : 'px-3'
    ]"
  >
    <img :src="icon" alt="icon" class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" :class="isCollapsed ? '' : 'mr-3'" />
    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">{{ label }}</p>
  </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarItem',
    props: {
      to: String,
      icon: String,
      label: String,
      keyName: String,
      isCollapsed: Boolean,
      activeMenu: String
    },
    methods: {
      handleClick() {
        this.$emit('click', this.to, this.keyName)
      }
    }
  }
  </script>
  
  <style scoped>
  /* Optional: scoped styles for icon or text */
  </style>
  