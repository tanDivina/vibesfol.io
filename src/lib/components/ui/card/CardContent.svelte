<script lang="ts">
  let className: string = ""
  export { className as class }
</script>

<div class="p-6 pt-0 {className}">
  <slot />
</div>
