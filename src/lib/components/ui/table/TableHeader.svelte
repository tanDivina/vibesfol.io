<script lang="ts">
  let className: string = ""
  export { className as class }
</script>

<thead class="[&_tr]:border-b {className}">
  <slot />
</thead>