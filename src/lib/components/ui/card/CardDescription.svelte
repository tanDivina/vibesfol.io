<script lang="ts">
  let className: string = ""
  export { className as class }
</script>

<p class="text-sm text-muted-foreground {className}">
  <slot />
</p>