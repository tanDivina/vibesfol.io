<div class="flex gap-2">
  <button type="button" class="btn btn-sm btn-primary" on:click={() => openForm(project)}>Edit</button>
  <button type="button" class="btn btn-sm btn-error" on:click={() => deleteProject(project.id)}>Delete</button>
</div>