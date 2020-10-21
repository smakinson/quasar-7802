<template>
  <!-- For consistent basic style on form inputs -->
  <q-input
    standout hide-bottom-space
    v-bind="$attrs"
    v-on="$listeners"
    input-class="text-center"
  ><slot/></q-input>
</template>

<script>
export default {
  name: 'FormInput'
}
</script>
