{#if project.url}
  <a
    href={project.url}
    on:click={() => handleProjectClick(project.id, "visit_link")}
    target="_blank"
    rel="noopener noreferrer"
    class="btn btn-sm btn-primary"
  >
    View Project
  </a>
{/if}
