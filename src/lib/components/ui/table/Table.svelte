<script lang="ts">
  let className: string = ""
  export { className as class }
</script>

<div class="relative w-full overflow-auto">
  <table class="w-full caption-bottom text-sm {className}">
    <slot />
  </table>
</div>