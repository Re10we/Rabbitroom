<script>
  import { Label, Input, Button } from "flowbite-svelte";
  import { EnvelopeSolid, LockSolid } from "flowbite-svelte-icons";
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Your Email</Label>
    <Input id="email" type="email" placeholder="name@flowbite.com">
      <EnvelopeSolid
        slot="left"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
      />
    </Input>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Your Password</Label>
    <Input id="password" type="password">
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
  </div>

  <div>
    <Button href="/">Sign in</Button>
    <Button
      href="/registr_form"
      class="bg-transparent hover:bg-transparent text-black">Sign up</Button
    >
  </div>
</main>

<style>
</style>
