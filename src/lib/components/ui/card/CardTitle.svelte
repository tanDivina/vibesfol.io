<script lang="ts">
  let className: string = ""
  export { className as class }
</script>

<h3 class="text-2xl font-semibold leading-none tracking-tight {className}">
  <slot />
</h3>