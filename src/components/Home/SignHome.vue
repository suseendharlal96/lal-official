<template>
  <v-container>
    <h2>Vue-Js</h2>
    <p>Just a simple application</p>
    <h2 style="color: blue">Successfully signed-in!</h2>
  </v-container>
</template>

<script>
export default {
  created() {
    let voices = speechSynthesis.getVoices();
    console.log(voices);
    let utterance = new SpeechSynthesisUtterance("Sign in successfull");
    utterance.voice = voices[1];
    speechSynthesis.speak(utterance);
  }
};
</script>
 <style>
</style>
