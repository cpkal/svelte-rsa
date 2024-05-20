<script>
  import { onMount } from 'svelte';
  import { encoder, decoder, generateKeys } from '$lib/rsa';

  onMount(() => {
    console.log('Welcome to the RSA page!');
  });

  let decryptKey;
  let encryptKey;

  const handleGenerateKeys = (event) => {
    event.preventDefault();
    const { e, d } = generateKeys();
    encryptKey = e;
    decryptKey = d;
  }

  const handleSubmitEncryptForm = async (event) => {
    event.preventDefault();
    const file = event.target.encrypt.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {

      const startTime = performance.now();
      const encrypted = encoder(event.target.result, encryptKey);
      const endTime = performance.now();
      
      console.log('Encryption time:', endTime - startTime, 'ms')

      //save encrypted to file text
      const blob = new Blob([encrypted], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'encrypted_message.txt';
      link.click();
    };
  };

  const handleSubmitDecryptForm = async (event) => {
    event.preventDefault();
    const file = event.target.decrypt.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {

      const startTime = performance.now();
      const decrypted = decoder(event.target.result.split(","), decryptKey);
      const endTime = performance.now();

      console.log('Decryption time:', endTime - startTime, 'ms')
    
      const blob = new Blob([decrypted], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'decrypted_message.txt';
      link.click();
    };
  };
</script>

<div class="container">
  <div>
    <h1>Generate Public Key and Private Key</h1>
    <div class="flex">
      <div class="grow-1">
        <p class="text-bold">Public Key</p>
        <textarea bind:value={encryptKey} style="margin-right: 5px;" />
      </div>
      <div class="grow-1">
        <p class="text-bold">Private Key</p>
        <textarea bind:value={decryptKey} style="margin-left: 5px;" />
      </div>
    </div>
    <button on:click={handleGenerateKeys} class="btn-styled float-right">Generate</button>
  </div>
  <hr class="margin-big">
  <div class="flex">
    <form on:submit={handleSubmitEncryptForm} style="margin-right: 5px;">
      <div>
        <h1>RSA Encryption</h1>
        <p class="text-bold">Public Key</p>
        <textarea bind:value={encryptKey} name="public_key" />
        <input type="file" id="file" name="encrypt" accept=".txt" required />
        <button type="submit" class="btn-styled">Encrypt</button>
      </div>
    </form>
    <form on:submit={handleSubmitDecryptForm} class="margin-left: 5px;">
      <div>
        <h1>RSA Decryption</h1>
        <p class="text-bold">Private Key</p>
        <textarea bind:value={decryptKey} name="private_key" />
        <input type="file" id="file" name="decrypt" accept=".txt" required />
        <button type="submit" class="btn-styled">Decrypt</button>
      </div>
    </form>
  </div>
</div>

<style>
  .flex {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .grow-1 {
    flex-grow: 1;
  }
  .container {
    width: 80%;
    margin: 0 auto;
  }
  .text-bold {
    font-weight: bold;
  }
  textarea {
    /* remove default style textarea */
    resize: none;
    width: 100%;
    height: 100px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  p {
    margin: 0;
  }
  .btn-styled {
    border-radius: 5px;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .btn-styled:hover {
    background-color: #45a049;
  }
  /* add style to h1 */
  h1 {
    font-size: 1.5em;
    margin: 0;
  }
  .margin-big {
    margin: 20px 0;
  }
</style>

