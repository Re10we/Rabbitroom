<script>
  import { Button } from "flowbite-svelte";
  import "../app.postcss";
  import { onMount } from "svelte";

  let loginingUser = false;

  onMount(() => {
    const access_token = localStorage.getItem("access_token");

    if (access_token != null) {
      loginingUser = true;
    }
  });
</script>

<main>
  <div class="relative h-screen">
    <div class="absolute top-[50%] left-[50%] -ml-28 -mt-28">
      <Button href="/course">Sign in course</Button>
      <Button>Create course</Button>
    </div>
  </div>
</main>
