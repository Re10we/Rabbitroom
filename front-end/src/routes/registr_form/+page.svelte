<script>
  import { Label, Input, Button } from "flowbite-svelte";
  import {
    EnvelopeSolid,
    LockSolid,
    UserCircleSolid,
  } from "flowbite-svelte-icons";

  let name = 'temp1';
  let email='temp1';
  let password = 'temp1';

  async function registrationClick() {
  const res = await fetch('http://localhost:3000/auth/create',
   {
      mode: 'no-cors',
			method: 'POST',
			body: JSON.stringify({
				name,
        email,
        password
			})
		});
	
		const json = await res.json();
    console.log(json);
  }
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Your Username</Label>
    <Input id="email" type="text" placeholder="your_username">
      <UserCircleSolid
        slot="left"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
      />
    </Input>
  </div>

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
    <Label for="input-group-1" class="block mb-2">Create password</Label>
    <Input id="password" type="password">
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
  </div>

  <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Confirm password</Label>
    <Input id="password" type="password">
      <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
  </div>
  <div>
    <Button on:click={registrationClick} href="/">Sign up</Button>
  </div>
</main>

<style>
</style>
